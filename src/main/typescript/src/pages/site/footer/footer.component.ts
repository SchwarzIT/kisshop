import {Component, OnInit} from "@angular/core";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  values: any;

  constructor() {

    this.values = [
      {icon: "delivery-in-progress.svg", text: "Schnelle Lieferung"},
      {icon: "vegetables.svg", text: "Aus unserer Region"},
      {icon: "heart.svg", text: "Wir lieben Kaufland"},
      {icon: "chat_2.svg", text: "24/7 Support"}
    ];

  }

  ngOnInit() {

  }

}
