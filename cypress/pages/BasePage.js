class BasePage {
  // ✅ Visit Rokomari safely (403 protection for CI/CD)
  visit(url = 'https://www.rokomari.com/') {
    cy.visit(url, {
      failOnStatusCode: false, // Prevent Cypress from failing on 403
      headers: {
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119 Safari/537.36",
        "accept-language": "en-US,en;q=0.9",
      },
    });
    cy.log("🌐 Visiting Rokomari homepage safely (CI-safe)");
  }
  ignoreSiteErrors() {
    Cypress.on("uncaught:exception", (err, runnable) => {
      cy.log("⚠️ Ignored application error:", err.message);
      return false;
    });
  }

  // ✅ Popup handler (auto closes if visible)
  closeAnyPopup() {
    cy.wait(2000);
    cy.get("body").then(($body) => {
      const popups = $body.find("button.js--popup-modal__close-btn");
      if (popups.length > 0) {
        cy.log(`⚠️ Found ${popups.length} popup close buttons — trying to close visible one`);

        const visiblePopup = Array.from(popups).find((btn) =>
          Cypress.$(btn).is(":visible")
        );

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

  // ✅ Go Home safely (prevents loops)
  goHome() {
    cy.url().then((url) => {
      if (url === "https://www.rokomari.com/") {
        cy.log("ℹ️ Already on homepage — skipping redundant visit");
        return;
      }

      cy.get("body").then(($body) => {
        if ($body.find("a:contains('হোম')").length > 0) {
          cy.xpath("//a[contains(text(),'হোম')]")
            .should("be.visible")
            .click({ force: true });
          cy.log("🏠 Returned to Home via ‘হোম’ link");
        } else {
          cy.log("⚠️ ‘হোম’ link not found — visiting homepage directly");
          cy.visit("https://www.rokomari.com/", {
            failOnStatusCode: false,
            headers: {
              "user-agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119 Safari/537.36",
              "accept-language": "en-US,en;q=0.9",
            },
          });
        }
      });
    });

    cy.wait(1500);
  }
}

export default BasePage;
