# 🌐 Rokomari.com E2E (Cypress + XPath + POM + CSV + Mochawesome)

Professional Cypress project for **Rokomari.com** using:
- **Page Object Model** (`SearchPage`, `CartPage`, `BasePage`)
- **XPath selectors** (as provided)
- **CSV data-driven** execution
- **Popup/exception resilience**
- **Mochawesome** HTML reporting

---

## ⚙️ Prerequisites
- Node.js >= 16, npm >= 8

## 🛠️ Install
```bash
npm install
```

## ▶️ Run (headed)
```bash
npm run cypress:open
```

## 🏎️ Run (headless) + Report
```bash
npm run test:report
```
Open report: `cypress/reports/index.html`

---

## 📁 Structure
```
cypress/
  e2e/tests/rokomariDataDriven.cy.js  # CSV → Search → Hover Add → Cart Verify
  pages/
    BasePage.js                       # visit + popup + exception helper
    SearchPage.js                     # XPath search + hover add
    CartPage.js                       # open cart + verify title/amount
  fixtures/books.csv                  # test data (add more rows)
  support/e2e.js                      # reporter + cypress-xpath + global exception
cypress.config.js                     # baseUrl + reporter config
package.json                          # scripts/devDependencies
```

---

## 🧪 Flow Covered
1) Visit home → dismiss popup (if any)
2) Read each book title from **CSV**
3) Search the title (XPath)
4) Hover on matched title → click **Added to Cart**
5) Open cart (XPath)
6) Verify matched title present
7) Verify payable amount > 0 (XPath)

---

## 🧠 Notes
- XPath powered by **cypress-xpath** (enabled in `support/e2e.js`).
- Non-critical site exceptions suppressed for **headless stability**.
- Add more rows in `cypress/fixtures/books.csv` to expand coverage.
- If DOM varies, adjust XPath inside relevant Page Object files only (POM).
