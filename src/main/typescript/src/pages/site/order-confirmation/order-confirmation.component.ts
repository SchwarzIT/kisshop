import {Component, OnInit} from "@angular/core";

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.scss']
})
export class OrderConfirmationComponent implements OnInit {

  deliveryDate: any = new Date();

  constructor() {

  }

  ngOnInit() {
    this.deliveryDate.setDate(this.deliveryDate.getDate() + 2);
  }

}
