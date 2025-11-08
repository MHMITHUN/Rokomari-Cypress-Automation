import Papa from 'papaparse';
import BasePage from '../../pages/BasePage';
import SearchPage from '../../pages/SearchPage';
import CartPage from '../../pages/CartPage';

const base = new BasePage();
const search = new SearchPage();
const cart = new CartPage();

describe('Rokomari E2E — CSV → Search → Hover Add → Cart Verify', () => {
  beforeEach(() => {
    base.ignoreSiteErrors();
    base.visit();
    base.closeAnyPopup();
  });

  it('Runs all books from CSV safely and sequentially', () => {
    cy.readFile('cypress/fixtures/books.csv').then((content) => {
      const rows = Papa.parse(content, { header: true }).data.filter(r => r.bookName);

      cy.wrap(rows).each((row) => {
        const title = row.bookName.trim();
        cy.log(`📘 Testing book: ${title}`);

        search.searchBook(title);
        cy.wait(2000);
        search.addToCartByHover(title);

        cy.wait(2000);

        cy.then(() => {
          if (search.bookFound) {
            cart.openCart();
            cart.verifyBookInCart(title);
            cart.verifyPayableAmountNonZero();
          } else {
            cy.log(`⏩ Skipping cart verification for "${title}" (book not found)`);
          }

          base.closeAnyPopup();
          base.goHome();
        });
      });
    });
  });
});
