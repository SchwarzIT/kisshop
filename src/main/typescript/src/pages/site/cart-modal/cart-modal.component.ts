import {Component, Input, OnInit} from "@angular/core";
import {Article} from "../../../entities/Article";
import {CartService} from "../../../services/cart.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.component.html',
  styleUrls: ['./cart-modal.component.scss']
})
export class CartModalComponent implements OnInit {

  @Input("title") title: string = "";
  @Input("noArticlesMessage") message: string = "";
  articles: Article[] = [];

  constructor(private cartService: CartService, private router: Router) {

  }

  ngOnInit(): void {
    this.articles = this.cartService.cart;
  }

  confirm() {
    this.cartService.clearCart();
    this.router.navigate(['/order']);
  }

  increaseArticleNumber(pArticle: Article) {
    this.cartService.addExistingArticle(pArticle);
  }

  decreaseArticleNumber(pArticle: Article) {
    this.cartService.removeExistingArticle(pArticle);
  }

}
