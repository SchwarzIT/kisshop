import {Component, Input} from "@angular/core";
import {Article} from "../../../entities/Article";
import {CartService} from "../../../services/cart.service";

@Component({
  selector: "app-articleList",
  templateUrl: "articleList.component.html",
  styleUrls: ['articleList.component.scss']
})
export class ArticleListComponent {

  @Input("articles") articles: Article[] = [];
  @Input("maxArticles") maxArticles: number = 0;
  @Input("headline") headline: string = "Artikelliste";

  constructor(private cartService: CartService) {

  }

  addArticleToCart(article: Article) {
    this.cartService.addArticle(article);
  }

  removeArticleFromCart(article: Article) {
    this.cartService.removeArticle(article);
  }

  increaseArticleNumber(pArticle: Article) {
    this.cartService.addExistingArticle(pArticle);
  }

  decreaseArticleNumber(pArticle: Article) {
    this.cartService.removeExistingArticle(pArticle);
  }

}
