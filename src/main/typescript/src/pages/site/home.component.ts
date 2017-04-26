import {Component, OnInit} from "@angular/core";
import {Article} from "../../entities/Article";
import {Information} from "../../entities/Information";
import {ArticleService} from "../../services/article.service";
import {CartService} from "../../services/cart.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  articles: Article[];
  i1: Information;
  i2: Information;

  constructor(private articleService: ArticleService, private cartService: CartService) {
    this.i1 = new Information("information1.png", "Bio – Von umweltbewusst bis gesund", "Bio-Produkte schmecken gut und schützen das Immunsystem. Die biologische Erzeugung steht im Einklang zur Natur und wird durch die Öko-Bauern verantwortungsvoll gelebt. Lernen Sie jetzt die Bio-Welt bei Kaufland kennen.");
    this.i2 = new Information("information2.png", "Aus der Region für Sie ausgewählt.", "Setzen Sie mit Ihrem Einkauf auf Produkte, die aus Ihrer näheren Umgebung stammen. Damit unterstützen Sie regionale Erzeuger und Lieferanten vor Ort und erhalten Frische und Qualität aus nächster Nähe. Ob Banane, Apfel oder Kiwi: jetzt zugreifen!");
  }

  ngOnInit(): void {
    this.articleService.loadAllArticles().subscribe(
      (articles) => {
        this.articles = articles;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  addArticleToCart(article: Article) {
    this.cartService.addArticle(article);
  }

  removeArticleFromCart(article: Article) {
    this.cartService.removeArticle(article);
  }

}
