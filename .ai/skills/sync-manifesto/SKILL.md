---
name: sync-manifesto
description: Ensure .manifesto exists and is in sync with the latest release of the agent-manifesto framework. Creates the directory if absent; replaces all local files if the local version differs from the latest GitHub release.
---

# sync-manifesto

`sync-manifesto` keeps the local `.manifesto/` directory aligned with the latest published release of the agent-manifesto framework. It is the only capability that modifies `.manifesto/`.

## When To Use

Run `sync-manifesto` at session start, or whenever `.manifesto/` may be stale. Also invoked as a prerequisite before any capability that reads from `.manifesto/` (e.g., `instruction-evaluator`) if the last sync time is unknown.

Do not skip this skill on the assumption that `.manifesto/` is current — version drift is silent and breaks instruction-system reviews.

## Mandatory Behavior

### 1. Ensure `.manifesto/` Exists

```bash
mkdir -p .manifesto
```

If the directory was just created it has no local version; proceed directly to step 3 (download).

### 2. Read The Local Version

Extract the `version` field from the YAML frontmatter of `.manifesto/MANIFEST.md`:

```bash
local_version=$(grep -m1 '^version:' .manifesto/MANIFEST.md 2>/dev/null | awk '{print $2}')
```

If `MANIFEST.md` does not exist or `local_version` is empty, treat as missing — proceed directly to step 3.

### 3. Fetch The Latest Release Version

```bash
latest_json=$(curl -fsSL "https://api.github.com/repos/AlexeyPlatkovsky/agent-manifesto/releases/latest")
latest_tag=$(echo "$latest_json" | grep -m1 '"tag_name"' | sed 's/.*"tag_name": *"\([^"]*\)".*/\1/')
latest_version=${latest_tag#v}
```

Strip a leading `v` from the tag so `v2.6.0` and `2.6.0` both normalize to `2.6.0`.

If `curl` fails (network unavailable), stop and report:

> sync-manifesto: could not reach GitHub releases API. Proceeding with local `.manifesto/` as-is.

Do not abort the parent pipeline — report and continue.

### 4. Compare Versions

```bash
if [ "$local_version" = "$latest_version" ]; then
  echo "sync-manifesto: .manifesto is current ($local_version). No update needed."
  exit 0
fi
```

If versions match, stop here. No files are modified.

### 5. Download And Replace

Versions differ (or local was missing). Execute the full replacement:

```bash
# Derive the zipball URL from the release JSON
zipball_url=$(echo "$latest_json" | grep -m1 '"zipball_url"' | sed 's/.*"zipball_url": *"\([^"]*\)".*/\1/')

# Download
curl -fsSL "$zipball_url" -o /tmp/manifesto-latest.zip

# Clear existing contents (preserve the directory itself)
rm -rf .manifesto/*

# Extract — GitHub zipballs unpack into a single top-level subdirectory
unzip -q /tmp/manifesto-latest.zip -d /tmp/manifesto-extract
extracted_dir=$(ls -d /tmp/manifesto-extract/*/ | head -1)

# Move all extracted files into .manifesto/
mv "$extracted_dir"* .manifesto/

# Clean up
rm -rf /tmp/manifesto-latest.zip /tmp/manifesto-extract

echo "sync-manifesto: updated .manifesto/ from $local_version to $latest_version."
```

### 6. Verify

Confirm the update succeeded:

```bash
updated_version=$(grep -m1 '^version:' .manifesto/MANIFEST.md 2>/dev/null | awk '{print $2}')
if [ "$updated_version" != "$latest_version" ]; then
  echo "sync-manifesto: WARNING — post-update version ($updated_version) does not match expected ($latest_version). Manual inspection required."
fi
```

## Output Contract

State exactly one outcome before the parent pipeline continues:

- **Current**: `local version X.Y.Z matches latest — no update needed`
- **Updated**: `updated .manifesto/ from X.Y.Z to A.B.C`
- **Created**: `created .manifesto/ and downloaded version A.B.C`
- **Skipped**: `network unavailable — proceeding with local .manifesto/ as-is`
- **Warning**: `post-update version mismatch — manual inspection required`
