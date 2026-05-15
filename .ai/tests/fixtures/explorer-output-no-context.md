# Fixture: EXPLORER OUTPUT — No Existing Context

Represents a Stage 1 output where no relevant pages, components, or tests exist for the target flow. Use this fixture in scenarios that test explorer behaviour when starting from scratch.

---

```
EXPLORER OUTPUT
───────────────
Spec: Contact Us page form submission displays a success alert

Relevant files:
  pages/         (none — no ContactUsPage found)
  components/    pages/components/SiteHeaderComponent.ts — navigation only; no contact link implemented
  tests/         (none — no existing contact page specs found)
  assertions/    assertions/index.ts — assertVisible, assertTextContains
  fixtures/      framework/fixtures/app.fixture.ts

Reusable patterns:
  SiteHeaderComponent: pages/components/SiteHeaderComponent.ts — header navigation component; contact Us link not yet present

Implementation risks:
  - No existing ContactUsPage — a new page object must be created before the test
  - Navigation path to Contact Us from the header is not implemented in SiteHeaderComponent
  - Live site may have anti-bot protection on form submission; verify manually before asserting success

Recommended implementation path:
  1. Create pages/ContactUsPage.ts extending xPage with path "/contact_us"
  2. Add locators: nameInput, emailInput, subjectInput, messageInput, submitButton, successMessage
  3. Add submitForm(name, email, subject, message) action method
  4. Write test in tests/ui/contact.spec.ts tagged @ui
  5. Assert successMessage is visible after submission

Test strategy hints:
  - Tag @ui
  - Use framework/fixtures/app.fixture.ts
  - Use assertVisible, assertTextContains from assertions/index.ts
```
