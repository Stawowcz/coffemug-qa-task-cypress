/// <reference types="cypress" />
import { HomePage } from "@pages/home/home-page";
import { SearchPage } from "@pages/product/search-page";
import { ProductDetailsPage } from "@pages/product/product-details-page";
import { CartPage } from "@pages/cart/cart-page";
import { GlobalUiTexts } from "@constants/texts/ui-texts/global-ui-texts";
import { ProductData } from "@data/product-data";
import { CartMessages } from "@constants/texts/messages/cart-messages";

describe("Add to Cart - Smartphone Scenario", () => {
  const homePage = new HomePage();
  const searchPage = new SearchPage();
  const productDetailsPage = new ProductDetailsPage();
  const cartPage = new CartPage();

  beforeEach(() => {
    homePage.goToPage();
  });

  it("should add a smartphone to the shopping cart and verify it was added", () => {
    homePage.searchFromHeader(ProductData.SMARTPHONE.name);

    cy.get(searchPage.productItems)
      .should("exist")
      .and("have.length.greaterThan", 0);

    searchPage.openProductByName(ProductData.SMARTPHONE.name);

    productDetailsPage.addToCart();

    cy.get(productDetailsPage.successNotification)
      .should("be.visible")
      .and("contain.text", CartMessages.ADD_TO_CART_SUCCESS);

    cy.get(homePage.cartQty)
      .should("be.visible")
      .and("have.text", GlobalUiTexts.CART_QUANTITY_ONE);

    homePage.openCart();

    cy.get(cartPage.cartItemRow).should("exist");
    cy.get(cartPage.productName).should(
      "have.text",
      ProductData.SMARTPHONE.name,
    );

    cy.get(cartPage.cartItemRow).within(() => {
      cy.get(cartPage.unitPrice).should(
        "have.text",
        ProductData.SMARTPHONE.price,
      );
      cy.get(cartPage.qtyInput).should(
        "have.value",
        ProductData.SMARTPHONE.quantity,
      );
      cy.get(cartPage.subtotal).should(
        "have.text",
        ProductData.SMARTPHONE.subtotal,
      );
    });
  });
});
