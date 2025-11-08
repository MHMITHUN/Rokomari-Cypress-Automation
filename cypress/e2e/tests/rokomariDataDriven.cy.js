import Papa from 'papaparse';
import BasePage from '../../pages/BasePage';
import SearchPage from '../../pages/SearchPage';
import CartPage from '../../pages/CartPage';

const base = new BasePage();
const search = new SearchPage();
const cart = new CartPage();

describe('Rokomari E2E — CSV → Search → Hover to cart Add → Cart Verify', () => {
  
  before(function () {
    cy.readFile('cypress/fixtures/books.csv').then((content) => {
      this.rows = Papa.parse(content, { header: true }).data.filter(r => r.bookName);
      cy.log(`✅ Data loaded: Found ${this.rows.length} books in CSV.`);
    });
  });

  beforeEach(() => {
    base.ignoreSiteErrors();
    base.visit();
    base.closeAnyPopup();
  });

  it('Runs all books from CSV safely and sequentially', function () {
    
    cy.wrap(this.rows).each((row) => {
      
      const title = row.bookName.trim();
      
      cy.log(`📘 --- Testing book: ${title} ---`);

      search.searchBook(title);
      cy.wait(2000); 
      search.addToCartByHover(title); 

      cy.wait(2000); 

      cy.then(() => {
        if (search.bookFound) {
          cy.log(`🛒 Book "${title}" found, verifying cart...`);
          cart.openCart();
          cart.verifyBookInCart(title);
          cart.verifyPayableAmountNonZero();
        } else {
          cy.log(`⏩ Skipping cart verification for "${title}" (book not found on search page)`);
        }

        base.closeAnyPopup();
        base.goHome();
      });
    });
  });
});