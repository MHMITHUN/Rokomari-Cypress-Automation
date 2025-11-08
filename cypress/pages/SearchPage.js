import BasePage from './BasePage';

class SearchPage extends BasePage {
  bookFound = false; // 🔘 status flag

  searchBook(bookName) {
  cy.log(`🔍 Searching: ${bookName}`);
  
  // prevent unnecessary reloads
  cy.url().then(url => {
    if (!url.includes("rokomari.com")) {
      cy.visit("https://www.rokomari.com/");
    }
  });

  cy.xpath("//input[@id='js--search']", { timeout: 10000 })
    .should('be.visible')
    .clear()
    .type(bookName, { delay: 100 });

  cy.xpath("//i[@class='ion-ios-search-strong']")
    .first()
    .click({ force: true });

  cy.wait(4000);
}


  addToCartByHover(bookTitle) {
    cy.log(`🟢 Trying to add: ${bookTitle}`);
    cy.wait(3000);

    cy.document().then((doc) => {
      const cards = Array.from(doc.querySelectorAll("div[title]"));
      const match = cards.find((el) => el.title.includes(bookTitle));

      if (!match) {
        this.bookFound = false; // ❌ Not found
        cy.log(`⚠️ Book not found: ${bookTitle} — returning Home`);
        cy.xpath("//a[contains(text(),'হোম')]", { timeout: 8000 })
          .should('be.visible')
          .click({ force: true });
        cy.wait(2000);
        return;
      }

      this.bookFound = true; // ✅ Found
      cy.wrap(match)
        .scrollIntoView()
        .trigger('mouseover', { force: true });

      cy.wait(1000);

      cy.wrap(match)
        .find("button.book-wrapper-cart-btn.w-100.js--add-to-cart")
        .first()
        .should('exist')
        .click({ force: true });

      cy.log(`✅ Added to cart: ${bookTitle}`);
      cy.wait(1500);
    });
  }
}

export default SearchPage;
