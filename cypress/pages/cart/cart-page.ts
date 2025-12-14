import { AppUrls } from "@constants/urls/app-urls";
import { BasePage } from "@pages/base/base-page";

export class CartPage extends BasePage {
  public readonly cartItemRow = ".cart-item-row";
  public readonly productName = ".product-name";
  public readonly unitPrice = ".product-unit-price";
  public readonly qtyInput = ".qty-input";
  public readonly subtotal = ".product-subtotal";

  public goToPage(): void {
    super.goToPage(AppUrls.CART);
  }

  public updateQuantity(qty: number): void {
    this.safeType(this.qtyInput, String(qty));
  }
}
