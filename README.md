# Cypress E2E Framework – Demo Web Shop

Automated end-to-end tests built with **Cypress + TypeScript** for [Demo Web Shop](https://demowebshop.tricentis.com).

---

## Overview

This project tests main user flows of an e-commerce site:

- User registration and login
- Product searching and filtering
- Adding items to the shopping cart
- Verifying prices and quantities

The framework follows a **Page Object Model (POM)** structure for modular and reusable test design.

---

## Project Structure

```
cypress/
├── e2e/
│   ├── auth/
│   │   └── register-login.spec.ts
│   └── product/
│       ├── product-search-and-filter.spec.ts
│       └── add-to-cart.spec.ts
│
├── pages/
│   ├── base/
│   │   └── base-page.ts
│   ├── home/
│   │   └── home-page.ts
│   ├── auth/
│   │   ├── login-page.ts
│   │   └── register-page.ts
│   ├── product/
│   │   ├── search-page.ts
│   │   └── product-details-page.ts
│   └── cart/
│       └── cart-page.ts
│
├── constants/
│   ├── urls/
│   │   └── app-urls.ts
│   └── texts/
│       ├── ui-texts/
│       │   └── global-ui-texts.ts
│       ├── messages/
│       │   ├── cart-messages.ts
│       │   ├── register-messages.ts
│       │   └── search-messages.ts
│       └── validation/
│           └── register-validations.ts
│
├── data/
│   ├── user-data-generator.ts
│   ├── product-data.ts
│   └── search-data.ts
│
├── types/
│   └── user-data.ts
│
└── support/
    ├── e2e.ts
    └── commands.ts
```

---

## Installation

Clone this repository and install dependencies:

```bash
git clone https://github.com/Stawowcz/SandP.git
cd SandP
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
