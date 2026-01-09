import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/ui/login/login.component';
import { LoanListComponent } from './prestamos/ui/list/loan-list.component';
import { LoanRequestComponent } from './prestamos/ui/request/loan-request.component';
import { AuthGuard } from './shared/guards/auth.guard'; // Will create next

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: LoanListComponent, canActivate: [AuthGuard] }, // Simple dashboard = loan list for now
  { path: 'loans', component: LoanListComponent, canActivate: [AuthGuard] },
  { path: 'request-loan', component: LoanRequestComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
