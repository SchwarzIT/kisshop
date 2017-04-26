import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "../pages/site/home.component";
import {AdminComponent} from "../pages/admin/admin.component";
import {FormComponent} from "../pages/admin/form/form.component";
import {OrderConfirmationComponent} from "../pages/site/order-confirmation/order-confirmation.component";

export const ROUTE_CONFIG: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'admin',
    component: AdminComponent
  },
  {
    path: 'admin/edit',
    component: FormComponent
  },
  {
    path: 'admin/edit/:detailLink',
    component: FormComponent
  },
  {
    path: 'order',
    component: OrderConfirmationComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];
