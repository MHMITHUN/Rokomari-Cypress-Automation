
# 🛍️ Cypress E2E Automation: Rokomari Purchase Flow

![Cypress](https://img.shields.io/badge/Cypress-13.x-darkgreen.svg?logo=cypress)
![Test Status](https://img.shields.io/badge/Tests-1_Passed-brightgreen.svg)
![Report](https://img.shields.io/badge/Report-Mochawesome-blue.svg)
![Design](https://img.shields.io/badge/Design-Page_Object_Model-blueviolet.svg)

This repository contains a robust **End-to-End (E2E)** test automation framework for the [Rokomari.com](https://www.rokomari.com/) e-commerce website.  
It uses a **data-driven** approach — reading a list of books from a `books.csv` file and automatically performing search, add-to-cart, and cart verification for each book.

The framework is built with **Resilience** in mind to handle real-world cases like random popups, third-party errors, and asynchronous loading delays.

---

## 📊 Test Report & Artifacts

The framework automatically generates a **Mochawesome HTML report** after every test run.

### 📈 Mochawesome Report Example
A sample report from a successful test run (Duration: 636 seconds / 10.6 minutes):

![Mochawesome Report]()

### 🎥 Test Execution Demo
*(You can replace this with your own GIF or test recording)*

![Test Execution]()

![Test Execution]()

---

## ✨ Core Features

- **📁 Data-Driven Testing**  
  Reads the list of books from `cypress/fixtures/books.csv` using the `papaparse` library and runs the test for each entry.

- **🏗️ Page Object Model (POM)**  
  Implements the POM design pattern to keep code modular and maintainable.  
  Each page has its own class (BasePage, SearchPage, CartPage) for better scalability.

- **🧠 Resilience Engineering**
  - **Automatic Exception Handling:** Ignores irrelevant third-party JS errors using `Cypress.on("uncaught:exception", ...)`.
  - **Dynamic Popup Smasher:** Automatically detects and closes marketing/subscription popups.
  - **Safe Verification:** If a book is not found, it logs and skips instead of failing the entire suite.
  - **CI/CD Friendly Navigation:** Custom headers and `failOnStatusCode: false` prevent 403 Forbidden errors in automated pipelines.

---

## 🚀 Getting Started

### 🧩 Prerequisites

Before running the project, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18+)
- [npm](https://www.npmjs.com/) (comes with Node.js)

---

### 🛠️ Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/rokomari-cypress-automation.git
   

2. Navigate into the project directory:

   ```bash
   cd rokomari-cypress-automation
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

   *(This installs Cypress, PapaParse, Mochawesome, and other dependencies.)*

---

## 🧪 Running the Tests

You can run tests in either **GUI (interactive)** or **headless (report)** mode.

### 🧭 GUI Mode (For Development)

This will open the Cypress Test Runner window where you can watch the tests in real-time:

```bash
npm run cypress:open
```

### ⚙️ Headless Mode (For CI/CD or Report Generation)

Runs all tests in the background and automatically generates a **Mochawesome HTML Report**:

```bash
npm test
```

The report will be generated at:

```
cypress/reports/index.html
```

---

## 🏛️ Framework Design Rationale

### 🔹 Why Use Page Object Model (POM)?

The **Page Object Model (POM)** separates **test logic** from **UI interaction logic**.
Each page (e.g., `SearchPage`) defines selectors and functions (`searchBook()`), so if Rokomari.com updates its UI, you only need to update one file — not every test.

---

### 🔹 Approach to Test Resilience

Rokomari.com is a live, dynamic site — it can trigger popups, throw third-party errors, or have out-of-stock books.
This framework expects and manages those gracefully.

**Key Techniques:**

1. **Exception Ignoring:**

   ```js
   Cypress.on("uncaught:exception", (err, runnable) => false);
   ```

   Prevents unnecessary test failures.

2. **Popup Handling:**
   A global method `closeAnyPopup()` detects and closes any visible popups.

3. **Conditional Verification:**
   If a searched book isn’t found, the test logs it and skips cart verification instead of failing.

---

## 📁 Project Structure

```
rokomari-automation/
│
├── cypress/
│   ├── e2e/
│   │   └── tests/
│   │       └── rokomariDataDriven.cy.js     # 🗃️ Main Data-Driven Test Spec
│   │
│   ├── fixtures/
│   │   └── books.csv                        # 📚 CSV file containing book list
│   │
│   ├── pages/
│   │   ├── BasePage.js                      # 🏠 BasePage (Navigation, Popups, Error Handling)
│   │   ├── SearchPage.js                    # 🔍 Search Page Object
│   │   └── CartPage.js                      # 🛒 Cart Page Object
│   │
│   ├── reports/
│   │   └── index.html                       # 📊 Mochawesome HTML Report
│   │
│   └── support/
│       ├── e2e.js
│       └── commands.js
│
├── cypress.config.js                         # ⚙️ Cypress configuration
└── package.json                              # 📦 Dependencies & Scripts
```

---

## ⚙️ Example package.json Scripts

Make sure these scripts are defined in your **package.json**:

```json
"scripts": {
  "cypress:open": "cypress open",
  "test": "cypress run --reporter mochawesome"
}
```

---

## 🧩 Example Test Flow

1. Load the `books.csv` file.
2. For each book:

   * Visit Rokomari.com
   * Search for the book title
   * If found → Add to cart
   * Verify the cart contents
   * If not found → Log and skip to next

---

## 🧠 Summary

This Cypress framework represents **production-grade E2E testing** for modern web applications — combining **data-driven automation**, **resilience**, and **maintainability**.

**Highlights:**

* 🧩 Modular Page Object Model
* 🧱 Resilient Popup & Error Handling
* 🔄 Data-Driven Book Search
* 📊 Mochawesome Reporting
* ⚙️ CI/CD Ready Integration

---

## 👨‍💻 Author

**Md Mahamudul Hasan**
📧 [mhmmithun1@gmail.com](mailto:mhmmithun1@gmail.com)
🏫 Bangladesh University of Business and Technology (BUBT)

---

**License:** MIT
**Repository:** [Rokomari Cypress Automation](https://github.com/MHMITHUN/Rokomari-Cypress-Automation)

```

---

✅ **This version includes everything:**
- Your real `npm run cypress:open` and `npm test` commands  
- Full explanations and structure  
- Ready for direct use in GitHub README.md or documentation page
```
