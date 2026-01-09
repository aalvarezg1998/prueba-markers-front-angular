import { Component, OnInit } from '@angular/core';
import { LoanService } from '../../application/loan.service';
import { Loan, LoanStatus } from '../../domain/loan.model';
import { AuthService } from '../../../auth/application/auth.service';

@Component({
  selector: 'app-loan-list',
  template: `
    <div class="container">
      <h2>Mis Préstamos / Gestión</h2>
      <button *ngIf="!isAdmin()" routerLink="/request-loan" class="btn-new">Nuevo Préstamo</button>
      
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Monto</th>
            <th>Plazo</th>
            <th>Estado</th>
            <th *ngIf="isAdmin()">Usuario ID</th>
            <th *ngIf="isAdmin()">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let loan of loans">
            <td>{{ loan.id }}</td>
            <td>{{ loan.amount | currency }}</td>
            <td>{{ loan.term }} meses</td>
            <td [ngClass]="loan.status.toLowerCase()">{{ loan.status }}</td>
            <td *ngIf="isAdmin()">{{ loan.userId }}</td>
            <td *ngIf="isAdmin()">
              <div *ngIf="loan.status === 'PENDING'">
                <button (click)="approve(loan.id)" class="btn-approve">Aprobar</button>
                <button (click)="reject(loan.id)" class="btn-reject">Rechazar</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [`
    .container { padding: 20px; }
    table { width: 100%; border-collapse: collapse; margin-top: 20px; }
    th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
    th { background-color: #f2f2f2; }
    .pending { color: orange; font-weight: bold; }
    .approved { color: green; font-weight: bold; }
    .rejected { color: red; font-weight: bold; }
    .btn-new { padding: 10px 20px; background: #007bff; color: white; border: none; margin-bottom: 20px; cursor: pointer;}
    .btn-approve { background: green; color: white; border: none; padding: 5px 10px; margin-right: 5px; cursor: pointer; }
    .btn-reject { background: red; color: white; border: none; padding: 5px 10px; cursor: pointer; }
  `]
})
export class LoanListComponent implements OnInit {
  loans: Loan[] = [];

  constructor(
    private loanService: LoanService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadLoans();
  }

  loadLoans() {
    if (this.isAdmin()) {
      this.loanService.getAllLoans().subscribe(data => this.loans = data);
    } else {
      this.loanService.getMyLoans().subscribe(data => this.loans = data);
    }
  }

  isAdmin(): boolean {
    return this.authService.hasRole('ADMIN');
  }

  approve(id: number) {
    this.loanService.approveLoan(id).subscribe(() => this.loadLoans());
  }

  reject(id: number) {
    this.loanService.rejectLoan(id).subscribe(() => this.loadLoans());
  }
}
