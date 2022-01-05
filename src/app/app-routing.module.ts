import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component'

import { SubscriptionsComponent } from './components/subscriptions/subscriptions.component';
import { OnDemandComponent } from './components/on-demand/on-demand.component';
import { TokenChargeComponent } from './components/token-charge/token-charge.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'tokenCharge', component: TokenChargeComponent },
  { path: 'subscriptions', component: SubscriptionsComponent },
  { path: 'onDemand', component: OnDemandComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
