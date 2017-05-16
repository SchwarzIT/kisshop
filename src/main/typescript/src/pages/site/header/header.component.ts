import {Component, Input} from "@angular/core";
import {CartService} from "../../../services/cart.service";

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss']
})
export class HeaderComponent {

  cartService: CartService;

  @Input("showCart") showCart: boolean = true;
  @Input("showNavigation") showNavigation: boolean = true;
  @Input("headerImage") headerImage: string = "/assets/img/headerImage.jpg";

  constructor(pCartService: CartService) {
    this.cartService = pCartService;
  }

}
