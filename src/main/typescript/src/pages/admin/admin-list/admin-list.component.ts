import {Component, OnInit} from "@angular/core";
import {Article} from "../../../entities/Article";
import {ArticleService} from "../../../services/article.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.scss']
})
export class AdminListComponent implements OnInit {

  articles: Article[] = [];
  searchArticle: any = [];

  constructor(private articleService: ArticleService, private router: Router) {
  }

  ngOnInit() {
    this.articleService.loadAllArticles().subscribe(
      (articles) => {
        this.articles = articles;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  addNewArticle() {
    this.router.navigate(["admin/edit/"]);
  }

  editArticle(pArticle: Article) {
    this.router.navigate(["admin/edit/", pArticle.detailLink]);
  }

  removeArticle(pArticle: Article) {
    if (confirm("Diesen Artikel löschen?")) {
      this.articleService.removeArticle(pArticle).subscribe(
        (response) => {
          window.location.reload();
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

}
