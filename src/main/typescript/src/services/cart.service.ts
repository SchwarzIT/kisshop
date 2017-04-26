import {Injectable} from "@angular/core";
import {Article} from "../entities/Article";

@Injectable()
export class CartService {

  cart: Article[] = [];
  totalPrice: number = 0;

  constructor() {

  }

  addArticle(article: Article) {
    article.isInCart = true;
    article.numberInCart++;

    this.totalPrice += parseFloat(article.price);

    this.cart.push(article);
  }

  addExistingArticle(pArticle: Article) {
    pArticle.numberInCart++;

    this.totalPrice += parseFloat(pArticle.price);
  }

  removeArticle(article: Article) {
    article.isInCart = false;

    let index = this.cart.indexOf(article, 0);
    if (index > -1) {
      this.cart.splice(index, 1);
    }
  }

  removeExistingArticle(pArticle: Article) {
    pArticle.numberInCart--;
    this.totalPrice -= parseFloat(pArticle.price);

    if (pArticle.numberInCart == 0) {
      this.removeArticle(pArticle);
    }
  }

  clearCart() {
    this.cart = [];
    this.totalPrice = 0;
  }

}
