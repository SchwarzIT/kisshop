import {Component, Input, OnInit} from "@angular/core";
import {Information} from "../../../entities/Information";

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent implements OnInit {

  @Input('information')
  info: Information;

  @Input("imageLeft")
  imageLeft: boolean = true;

  constructor() {

  }

  ngOnInit() {

  }

}
