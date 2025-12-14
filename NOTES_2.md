# NOTES

This document describes key decisions, assumptions, known limitations, and one thing intentionally not implemented for this Cypress + TypeScript E2E task against **Demo Web Shop** (https://demowebshop.tricentis.com).

---

## Key decisions

- **Page Object Model (POM)**  
  UI interactions are encapsulated in page classes (pages/*) to keep specs readable and to reduce selector duplication.

- **Deterministic selectors and actions**  
  Prefer stable CSS selectors and text-based selection for product titles over positional selectors (like `first()`), because product ordering can change.

- **`cy.session()` for authenticated suites**  
  Where tests require an authenticated user, login is cached via `cy.session()` to speed up execution and reduce repeated UI logins.

- **Test data separation**  
  Reusable strings and navigation values are organized into:
  - `constants/` (UI texts, messages, navigation, URLs)
  - `data/` (product data, coupons, generated user data)

- **Pre-test cleanup for isolation**  
  For cart-related tests, the cart is cleaned before each test to avoid cross-test coupling (e.g., previous items affecting quantities/totals).

---

## Assumptions

- The demo environment is publicly accessible and generally stable.
- Credentials used for login tests are provided via `cypress.env.json`.
- Product data used in assertions (name/price/slug) matches the current demo catalog.

---

## Known limitations

- The demo shop is not a controlled environment (data and UI can change), so tests avoid overly brittle assertions where possible.
- Some site behavior (e.g., coupons) is not documented, so tests focus on deterministic outcomes (e.g., invalid coupon message).

---

## One thing intentionally NOT implemented

### Dedicated “Remove item” action and valid coupon discount flow

I intentionally did not implement:

- a separate **Remove item** flow (e.g., remove checkbox/button), and  
- a **valid coupon** scenario that applies a real discount,

because:

- **Demo Web Shop UI limitation:** the cart does not provide a dedicated “Remove” control. The only supported way to remove an item is to set quantity to `0` and click **Update cart**. Because of that, I covered cart mutations via **quantity updates** (and used quantity `0` during cart cleanup), which effectively removes items while keeping tests deterministic.

- **Valid coupon not available / not reliable:** the demo site does not expose a stable, documented **valid** promo code. Relying on unknown or temporary coupons would make the test flaky and environment-dependent. Instead, I implemented **invalid coupon validation**, which is deterministic and verifies correct error handling.

If this were a real project, I would add a valid coupon test only when a stable, controlled test coupon exists (or is guaranteed by the test environment), and then validate:

- discounted totals,  
- clear UI feedback,  
- coupon persistence across refresh.

---
