import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.scss']
})
export class OrderConfirmationComponent implements OnInit {

  deliveryDate: any = new Date();

  constructor(private router: Router) {

  }

  ngOnInit() {
    this.deliveryDate.setDate(this.deliveryDate.getDate() + 1);
  }

  redirectToShop() {
    this.router.navigate(["/"]);
  }

}
