import { NgModule } from '@angular/core';    
import { Routes, RouterModule } from '@angular/router';    
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ItementryComponent } from './components/itementry/itementry.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';

const appRoutes: Routes = [
  { path: 'login',      component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent},
  { path: 'item/:id', component: ItementryComponent },
  { path: 'signup',      component: SignupComponent },
  { path: '**', component: PagenotfoundComponent }
];  
@NgModule({    
  imports: [RouterModule.forRoot(appRoutes)],    
  exports: [RouterModule]    
})    
export class AppRoutingModule { } 