# 🛍️ Cypress E2E Automation: Rokomari Purchase Flow

![Cypress](https://img.shields.io/badge/Cypress-13.x-darkgreen.svg?logo=cypress)
![Test Status](https://img.shields.io/badge/Tests-1_Passed-brightgreen.svg)
![Report](https://img.shields.io/badge/Report-Mochawesome-blue.svg)
![Design](https://img.shields.io/badge/Design-Page_Object_Model-blueviolet.svg)

This repository contains a robust E2E (End-to-End) test automation framework for the [Rokomari.com](https://www.rokomari.com/) e-commerce website. The project utilizes a **data-driven** approach, reading a list of books from a `books.csv` file and then automatically performing search, add-to-cart, and cart verification for each book.

This framework is specifically designed with **Resilience** in mind, enabling it to handle real-world scenarios such as random popups, application errors, and asynchronous loading.

---

## 📊 Test Report & Artifacts

The framework automatically generates a detailed HTML report using `mochawesome`.

### Mochawesome Test Report

An output of a successful test run (Total duration: 636 seconds / 10.6 minutes).

![Mochawesome Report](https://i.imgur.com/L8aYx0K.png)

### Test Execution (GIF)

*(You can add a GIF or screenshot of your test run here)*

![Test Execution GIF](https://your-image-host.com/path/to/demo.gif)

---

## ✨ Core Features

* **Data-Driven Testing:** Tests are not hard-coded. The book list is read from `cypress/fixtures/books.csv` using the `papaparse` library, and the test loop is executed for each book.
* **Page Object Model (POM):** The POM design pattern is used to keep the code clean and maintainable. Separate classes are defined for each page (BasePage, SearchPage, CartPage).
* **Resilience Engineering:**
    * **Automatic Exception Handling:** `BasePage.js` uses `Cypress.on("uncaught:exception", ...)` to automatically ignore non-critical application errors (like third-party script errors), preventing test failures.
    * **Dynamic Popup Smasher:** The `closeAnyPopup()` function intelligently detects and closes any marketing or subscription popups if they become visible, ensuring the test flow is not interrupted.
    * **Safe Search & Verify:** The test only proceeds to cart verification if the book is successfully found and added to the cart by `SearchPage.js` (using the `this.bookFound` flag). If a book from the CSV is not found, the test logs it and skips to the next book instead of failing.
    * **CI/CD-Friendly Navigation:** The `visit()` method in `BasePage.js` uses custom headers and `failOnStatusCode: false` to help prevent 403 Forbidden errors caused by basic bot detection or CI/CD environments.

---

## 🚀 Getting Started

### Prerequisites

To run this project, you need the following software installed on your system:

* [Node.js](https://nodejs.org/) (v18 or newer)
* [npm](https://www.npmjs.com/) (typically included with Node.js)

### 1. Installation

1.  First, clone this repository:
    ```bash
    git clone [https://github.com/your-username/rokomari-cypress-automation.git](https://github.com/your-username/rokomari-cypress-automation.git)
    ```
2.  Navigate to the project directory:
    ```bash
    cd rokomari-cypress-automation
    ```
3.  Install the required npm packages:
    ```bash
    npm install
    ```
    *(This will install `cypress`, `papaparse`, and all other dev dependencies.)*

### 2. Running the Tests

**Headless Mode (Recommended for CI/CD):**

This command will run all tests in the terminal (headless mode) and generate a Mochawesome HTML report in the `cypress/reports/` folder.

```bash
npx cypress run


Interactive Mode (For Development):

Use this command to open the Cypress Test Runner and watch the tests execute live in a browser:
```bash
npx cypress open
```


🏛️ Framework Design Rationale
Why the Page Object Model (POM)?
The Page Object Model (POM) is a design pattern that enhances test automation by promoting reusability and maintainability.

In this project, the elements and actions for each page (e.g., SearchPage) are encapsulated within their own class (e.g., searchBook()). If Rokomari.com's UI changes a button selector in the future, we only need to update the method in the specific page class, not the entire test script. This keeps the test logic separate from the UI interaction logic.

Approach to Test Resilience
E-commerce sites are dynamic; they can feature sudden popups, fail on third-party analytics scripts, or have items go out of stock.

This framework is designed to expect failure and handle it intelligently. Its primary goal is to verify the business flow (like adding to cart), not to fail on non-critical JavaScript errors.

Three main strategies are used to achieve this resilience:

Exception Ignoring: Cypress.on("uncaught:exception") is used to ignore errors that are outside the test's core flow.

Popup Handling: A generic closeAnyPopup() method in BasePage checks for and closes popups after each navigation.

Conditional Verification: When testing with data from the CSV, if a book isn't found, the test doesn't fail. The SearchPage sets a bookFound flag, which the spec file uses to decide whether to run the cart verification steps or log and skip them.


📁 Project Structure

rokomari-automation/
│
├── cypress/
│   ├── e2e/
│   │   └── tests/
│   │       └── rokomariDataDriven.cy.js  # 🗃️ The main data-driven test spec
│   ├── fixtures/
│   │   └── books.csv                     # 📚 Test data source
│   ├── pages/
│   │   ├── BasePage.js                   # 🏠 Base Page (Popups, Navigation, Error Handling)
│   │   ├── CartPage.js                   # 🛒 Cart Page Object
│   │   └── SearchPage.js                 # 🔍 Search Page Object
│   ├── reports/
│   │   └── index.html                    # 📈 Mochawesome HTML report
│   └── support/
│       ├── e2e.js
│       └── commands.js
│
├── cypress.config.js                     # ⚙️ Cypress configuration
└── package.json                          # 📦 Project dependencies