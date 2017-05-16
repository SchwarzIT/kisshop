import {BrowserModule} from "@angular/platform-browser";
import {LOCALE_ID, NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";

import {AppComponent} from "./app.component";
import {ROUTE_CONFIG} from "./app.routes";
import {ArticleListComponent} from "../pages/site/articleList/articleList.component";
import {ArticleService} from "../services/article.service";
import {Ng2OrderModule} from "ng2-order-pipe";
import {ImageService} from "../services/image.service";
import {HeaderComponent} from "../pages/site/header/header.component";
import {FooterComponent} from "../pages/site/footer/footer.component";
import {CartService} from "../services/cart.service";
import {InformationComponent} from "../pages/site/information/information.component";
import {HomeComponent} from "../pages/site/home.component";
import {Ng2FilterPipeModule} from "ng2-filter-pipe";
import {AdminComponent} from "../pages/admin/admin.component";
import {AdminListComponent} from "../pages/admin/admin-list/admin-list.component";
import {FormComponent} from "../pages/admin/form/form.component";
import {RouterModule} from "@angular/router";
import {CartModalComponent} from "../pages/site/cart-modal/cart-modal.component";
import {OrderConfirmationComponent} from "../pages/site/order-confirmation/order-confirmation.component";
import {CookieModule} from "ngx-cookie";
import {CurrencyRoundPipe} from "../pipes/currency-round.pipe";

@NgModule({
  declarations: [
    AppComponent,
    ArticleListComponent,
    HeaderComponent,
    FooterComponent,
    InformationComponent,
    HomeComponent,
    AdminComponent,
    AdminListComponent,
    FormComponent,
    CartModalComponent,
    OrderConfirmationComponent,
    CurrencyRoundPipe
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(ROUTE_CONFIG),
    Ng2OrderModule,
    Ng2FilterPipeModule,
    FormsModule,
    ReactiveFormsModule,
    CookieModule.forRoot()
  ],
  providers: [
    ArticleService,
    ImageService,
    CartService,
    {provide: LOCALE_ID, useValue: "de-DE"}
  ],
  bootstrap: [AppComponent],
  entryComponents: [CartModalComponent]
})
export class AppModule {

}
