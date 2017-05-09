import {Component} from "@angular/core";
import {DialogComponent, DialogService} from "ng2-bootstrap-modal";
import {Article} from "../../../entities/Article";
import {CartService} from "../../../services/cart.service";

export interface ConfirmModel {
  title: string;
  articles: Article[];
}

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.component.html',
  styleUrls: ['./cart-modal.component.scss']
})
export class CartModalComponent extends DialogComponent<ConfirmModel, boolean> implements ConfirmModel {

  title: string = "";
  message: string = "Ihr Warenkorb ist leer";
  articles: Article[] = [];

  constructor(dialogService: DialogService, private cartService: CartService) {
    super(dialogService);
  }

  confirm() {
    this.result = true;
    this.close();
  }

  increaseArticleNumber(pArticle: Article) {
    this.cartService.addExistingArticle(pArticle);
  }

  decreaseArticleNumber(pArticle: Article) {
    this.cartService.removeExistingArticle(pArticle);
  }

}
