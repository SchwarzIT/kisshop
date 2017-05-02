import {Component, Input, OnInit} from "@angular/core";
import {CartService} from "../../../services/cart.service";
import {DialogService} from "ng2-bootstrap-modal";
import {CartModalComponent} from "../cart-modal/cart-modal.component";
import {Router} from "@angular/router";
@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss']
})
export class HeaderComponent {

  cartService: CartService;

  @Input("showCart")
  showCart: boolean = true;

  @Input("showNavigation")
  showNavigation: boolean = true;

  @Input("headerImage")
  headerImage: string = "/assets/img/headerImage.jpg";


  constructor(pCartService: CartService, private dialogService: DialogService, private router: Router) {
    this.cartService = pCartService;
  }

  showCartModal() {

    this.dialogService.addDialog(CartModalComponent, {
      title: 'Warenkorb',
      message: this.cartService.cart.length <= 0 ? 'Ihr Warenkorb ist leer' : '',
      articles: this.cartService.cart
    }).subscribe((isConfirmed) => {

      if (isConfirmed) {
        this.cartService.clearCart();

        this.router.navigate(['/order']);
      }

    });


  }

}
