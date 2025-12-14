import { BasePage } from "@pages/base/base-page";
import { reset } from "../../../node_modules/colors/safe.d";

export class ProductDetailsPage extends BasePage {
  private readonly addToCartButton = 'input[id^="add-to-cart-button"]';
  public readonly productPrice = ".product-price";
  public readonly productQuantity = ".qty-input";
  public readonly title = "h1";

  public readonly successNotification = ".bar-notification.success";

  public addToCart(): void {
    this.safeClick(this.addToCartButton);
  }
}
