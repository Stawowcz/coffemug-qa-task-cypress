# Cypress E2E Framework – Demo Web Shop

Automated end-to-end tests built with **Cypress + TypeScript** for [Demo Web Shop](https://demowebshop.tricentis.com).

---

## Overview

This project covers core e-commerce flows:

- User Registration + validation
- Login / session persistence / logout
- Product discovery:
  - Path A: Search + filters (with 0-results handling)
  - Path B: Browse category → subcategory → PDP
- Add to cart + cart mutations (quantity update)
- Coupon / discount (invalid coupon validation)

Architecture: **Page Object Model (POM)** + shared **utils** (e.g. cart cleanup) and optional **`cy.session`** login helper.

---

# Project Structure

```
├── cypress/
│   ├── e2e/
│   │   ├── auth/
│   │   │   └── register-login.spec.ts
│   │   ├── cart/
│   │   │   └── cart-coupon.spec.ts
│   │   └── product/
│   │       ├── add-to-cart.spec.ts
│   │       └── product-search-and-filter.spec.ts
│   │
│   ├── pages/
│   │   ├── base/
│   │   │   └── base-page.ts
│   │   ├── auth/
│   │   │   ├── login-page.ts
│   │   │   └── register-page.ts
│   │   ├── home/
│   │   │   └── home-page.ts
│   │   ├── product/
│   │   │   ├── product-listing-page.ts
│   │   │   └── product-details-page.ts
│   │   └── cart/
│   │       └── cart-page.ts
│   │
│   ├── constants/
│   │   ├── navigation/
│   │   │   ├── categories.ts
│   │   │   └── subcategories.ts
│   │   ├── urls/
│   │   │   └── app-urls.ts
│   │   └── texts/
│   │       ├── ui-texts/
│   │       │   └── global-ui-texts.ts
│   │       ├── messages/
│   │       │   ├── cart-messages.ts
│   │       │   ├── register-messages.ts
│   │       │   └── search-messages.ts
│   │       └── validation/
│   │           └── register-validations.ts
│   │
│   ├── data/
│   │   ├── coupon-data.ts
│   │   ├── product-data.ts
│   │   ├── search-data.ts
│   │   └── user-data-generator.ts
│   │
│   ├── utils/
│   │   └── cart-utils.ts
│   │
│   ├── support/
│   │   ├── auth-session.ts
│   │   ├── commands.ts
│   │   └── e2e.ts
│   │
│   └── types/
│       └── user-data.ts
│
├── cypress.config.ts
├── cypress.env.json        # not committed
├── package.json
└── tsconfig.json
```

---

## Installation

Clone this repository and install dependencies:

```bash
git clone https://github.com/Stawowcz/coffemug-qa-task-cypress.git
cd coffemug-qa-task-cypress
npm ci
```

---

## Environment Variables

Create a `cypress.env.json` file (not committed to repo):

```json
{
  "loginEmail": "example@test.com",
  "loginPassword": "example123!"
}
```

---

## Running Tests

### Headed mode:

```bash
npx cypress open
```

### Headless mode:

```bash
npx cypress run
```

### Run in specific browsers:

Run tests in specific browsers using npm scripts defined in `package.json`:

```bash
npm run test:chrome
npm run test:firefox
npm run test:edge
npm run test:headed
npm run test:spec
```

---

## CI Integration

GitHub Actions workflow automatically runs Cypress tests in **Chrome** and **Firefox** under the following conditions:

- On **push** to the `main` branch
- On **pull requests** targeting `main`
- On **manual trigger** via the GitHub Actions tab (`workflow_dispatch`)

### CI File Location

```
.github/workflows/cypress.yml
```

### Workflow Steps

- Installs dependencies using `npm ci`
- Runs Cypress tests in **headless mode**
- Executes tests sequentially in both browsers:
  - **Chrome (headless)**
  - **Firefox (headless)**
- Uploads Cypress videos and screenshots as workflow artifacts
- Reports test results directly in the **GitHub Actions** tab

---
