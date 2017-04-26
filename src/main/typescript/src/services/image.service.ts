import {Injectable} from "@angular/core";
import {Http, RequestOptions, Headers} from "@angular/http";
import "rxjs/add/operator/map";
import {Observable} from "rxjs/Observable";
import {environment} from "../environments/environment";
import {ImageJson} from "../entities/ImageJson";

@Injectable()
export class ImageService {

  constructor(private http: Http) {

  }

  loadImage(imageUrl: string): Observable<string> {
    return this.http.get(imageUrl)
      .map(response => response.json()['content']);
  }

  createImage(base64Image: string) {
    let image: ImageJson = new ImageJson();
    image.content = base64Image;

    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});

    return this.http.post(environment.backendUrl + "images", JSON.stringify(image), options);
  }

}
