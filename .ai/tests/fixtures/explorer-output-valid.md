# Fixture: Valid EXPLORER OUTPUT

Represents a well-formed Stage 1 output for a products search spec. Use this fixture in behavioral scenarios that require a valid EXPLORER OUTPUT block without running Stage 1.

---

```
EXPLORER OUTPUT
───────────────
Spec: Searching for a non-existent product shows zero results on the Products page

Relevant files:
  pages/         pages/ProductsPage.ts
  components/    pages/components/ProductsCatalogComponent.ts, pages/components/BrandSidebarComponent.ts
  tests/         tests/ui/products.spec.ts
  assertions/    assertions/index.ts — assertCount, assertTextEquals, assertUrl, assertVisible
  fixtures/      framework/fixtures/app.fixture.ts

Reusable patterns:
  searchProducts: pages/ProductsPage.ts:24 — fills search input and clicks submit button
  catalog.title: pages/components/ProductsCatalogComponent.ts — locator for catalog heading text
  catalog.cards: pages/components/ProductsCatalogComponent.ts — locator collection for product cards
  existing search test: tests/ui/products.spec.ts:13 — assertUrl + assertTextEquals + assertCount pattern

Implementation risks:
  - Zero-result count depends on live site data; "xyznonexistent999" is assumed to return no matches but is not guaranteed

Recommended implementation path:
  1. Add new test to tests/ui/products.spec.ts — do not create a new spec file
  2. Call productsPage.searchProducts("xyznonexistent999")
  3. Assert URL matches /products?search=
  4. Assert catalog.title equals "Searched Products"
  5. Assert assertCount(productsPage.catalog.cards, 0)

Test strategy hints:
  - Tag @ui
  - Use framework/fixtures/app.fixture.ts
  - Use assertUrl, assertTextEquals, assertCount from assertions/index.ts
  - Keep test body linear — no conditional branching
```
