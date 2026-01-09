import { Component, OnInit } from '@angular/core';
import { LoanService } from '../../application/loan.service';
import { Loan, LoanStatus } from '../../domain/loan.model';
import { AuthService } from '../../../auth/application/auth.service';

@Component({
  selector: 'app-loan-list',
  templateUrl: './loan-list.component.html',
  styleUrls: ['./loan-list.component.css']
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

  getStatusIcon(status: string): string {
    const icons: { [key: string]: string } = {
      'PENDING': 'bx-time-five',
      'APPROVED': 'bx-check-circle',
      'REJECTED': 'bx-x-circle'
    };
    return icons[status] || 'bx-help-circle';
  }

  getStatusLabel(status: string): string {
    const labels: { [key: string]: string } = {
      'PENDING': 'Pendiente',
      'APPROVED': 'Aprobado',
      'REJECTED': 'Rechazado'
    };
    return labels[status] || status;
  }
}
