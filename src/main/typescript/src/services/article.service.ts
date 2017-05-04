import {Injectable} from "@angular/core";
import {Headers, Http, RequestOptions} from "@angular/http";
import {environment} from "../environments/environment";
import "rxjs/add/operator/map";
import "rxjs/add/operator/mergeMap";
import {Article} from "../entities/Article";
import {ImageService} from "./image.service";
import {ArticleJson} from "../entities/ArticleJson";
import {Observable} from "rxjs/Observable";

@Injectable()
export class ArticleService {

  private articles: Article[] = [];

  constructor(private http: Http, private imageService: ImageService) {

  }

  loadAllArticles(): Observable<Article[]> {
    return this.http.get(environment.backendUrl + "articles")
      .map(response => this.mapToInternalModelArray(response.json()._embedded.articles));
  }

  loadArticle(url: string): Observable<Article> {
    return this.http.get(url)
      .map(response => this.mapToInternalModel(response.json()));
  }

  createArticle(pArticle: Article) {
    let jsonArticle = ArticleService.mapToExternalModel(pArticle);

    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});

    return this.http.post(environment.backendUrl + "articles", JSON.stringify(jsonArticle), options);
  }

  updateArticle(pArticle: Article) {
    let jsonArticle = ArticleService.mapToExternalModel(pArticle);

    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});

    return this.http.put(pArticle.detailLink, JSON.stringify(jsonArticle), options);
  }

  removeArticle(pArticle: Article) {
    return this.http.delete(pArticle.detailLink);
  }

  private static mapToExternalModel(pArticle: Article): ArticleJson {
    let articleJson = new ArticleJson();

    articleJson.name = pArticle.name;
    articleJson.description = pArticle.description;
    articleJson.price = pArticle.price;
    articleJson.promotionPrice = pArticle.promotionPrice;
    articleJson.image = pArticle.image;

    return articleJson;
  }

  private mapToInternalModelArray(pJsonData: string): Article[] {
    let articles: Article[] = [];

    for (let article of pJsonData) {
      articles.push(this.mapToInternalModel(article));
    }

    return articles;
  }

  private mapToInternalModel(pArticle: any): Article {
    let article: Article = new Article();

    article.name = pArticle.name;
    article.description = pArticle.description;
    article.price = pArticle.price;
    article.promotionPrice = pArticle.promotionPrice;
    article.detailLink = pArticle._links.self.href;

    this.imageService.loadImage(pArticle._links.image.href).subscribe(
      (base64Image) => {
        article.image = base64Image;
      },
      (error) => {
        console.log(error);
      }
    );

    return article;
  }

}
