/// <reference types="cypress" />
import { LoginPage } from "@pages/auth/login-page";
import { HomePage } from "@pages/home/home-page";
import { SearchPage } from "@pages/product/search-page";
import { SearchMessages } from "@constants/texts/messages/search-messages";
import { GlobalUiTexts } from "@constants/texts/ui-texts/global-ui-texts";
import { AppUrls } from "@constants/urls/app-urls";
import { SearchData } from "@data/search-data";

describe("Product Searching and Filtering", () => {
  const homePage = new HomePage();
  const searchPage = new SearchPage();
  const loginPage = new LoginPage();
  const email = Cypress.env("loginEmail");
  const password = Cypress.env("loginPassword");

  beforeEach(() => {
    loginPage.goToPage();
    loginPage.login(email, password);
  });

  it("searches for electronics and applies filters when no results are found", () => {
    homePage.searchFromHeader(SearchData.ELECTRONICS);

    cy.get("body").then(($body) => {
      const noResults = $body
        .find(searchPage.noResultsMessage)
        .text()
        .includes(SearchMessages.NO_RESULTS_FOUND);

      if (noResults) {
        searchPage.enableAdvancedSearch();
        searchPage.typeKeyword(SearchData.CAMERA);
        searchPage.selectCategory(GlobalUiTexts.CATEGORY_ELECTRONICS);
        searchPage.enableSubcategories();
        searchPage.selectManufacturer(GlobalUiTexts.MANUFACTURER_ALL);
        searchPage.setPriceRange(SearchData.PRICE_FROM, SearchData.PRICE_TO);
        searchPage.enableSearchInDescriptions();
        searchPage.clickSearch();

        cy.url().should("include", AppUrls.SEARCH);

        cy.get(searchPage.productItems)
          .should("exist")
          .and(($items) => expect($items.length).to.be.greaterThan(0));

        cy.get(searchPage.productTitles).each(($el) => {
          expect($el.text().toLowerCase()).to.match(/cam|camera|photo/);
        });

        cy.get(searchPage.productPrices).each(($price) => {
          const value = parseFloat($price.text().replace(/[^0-9.]/g, ""));
          if (!isNaN(value))
            expect(value).to.be.within(
              SearchData.PRICE_FROM,
              SearchData.PRICE_TO,
            );
        });
      } else {
        cy.get(searchPage.productItems)
          .should("exist")
          .and(($items) => expect($items.length).to.be.greaterThan(0));

        cy.get(searchPage.productTitles).each(($el) => {
          expect($el.text().toLowerCase()).to.contain(SearchData.ELECTRONICS);
        });
      }
    });
  });
});
