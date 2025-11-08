class BasePage {
  visit(url = 'https://www.rokomari.com/') {
    cy.visit(url);
  }

  ignoreSiteErrors() {
    Cypress.on('uncaught:exception', (err, runnable) => false);
  }

  // ✅ Popup handler (multiple popup-safe)
closeAnyPopup() {
  cy.wait(2000);
  cy.get('body').then(($body) => {
    const popups = $body.find("button.js--popup-modal__close-btn");

    if (popups.length > 0) {
      cy.log(`⚠️ Found ${popups.length} popup close buttons — trying to close visible one`);

      // ✅ Try to find visible popup manually
      const visiblePopup = Array.from(popups).find(btn => Cypress.$(btn).is(':visible'));

      if (visiblePopup) {
        cy.wrap(visiblePopup).click({ force: true });
        cy.wait(1000);
        cy.log("✅ Popup closed successfully");
      } else {
        cy.log("ℹ️ Popups found, but none visible yet — skipping safe");
      }
    } else {
      cy.log("ℹ️ No popup visible on page");
    }
  });
}


  // ✅ Go Home safely
  // ✅ Go Home safely (always works)
// ✅ Go Home safely (Cypress-compatible error handling)
goHome() {
  cy.wait(1000);

  cy.get('body').then(($body) => {
    // ✅ Step 1: Check if 'হোম' link exists
    if ($body.find("a:contains('হোম')").length > 0) {
      cy.xpath("//a[contains(text(),'হোম')]")
        .should('be.visible')
        .click({ force: true });
      cy.log("🏠 Navigated to Home via ‘হোম’ link successfully");
    } else {
      // ✅ Step 2: If not found, directly visit homepage
      cy.log("⚠️ ‘হোম’ link not found — visiting homepage directly");
      cy.visit("https://www.rokomari.com/");
    }
  });

  cy.wait(2000);
}


}

export default BasePage;
