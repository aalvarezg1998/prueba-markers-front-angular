import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoanService } from '../../application/loan.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loan-request',
  templateUrl: './loan-request.component.html',
  styleUrls: ['./loan-request.component.css']
})
export class LoanRequestComponent {
  loanForm: FormGroup;
  isSubmitting = false;
  termOptions = [6, 12, 18, 24, 36, 48];

  constructor(
    private fb: FormBuilder,
    private loanService: LoanService,
    private router: Router
  ) {
    this.loanForm = this.fb.group({
      amount: [null, [Validators.required, Validators.min(1)]],
      term: [null, [Validators.required, Validators.min(1)]]
    });
  }

  selectTerm(term: number) {
    this.loanForm.patchValue({ term });
  }

  calculateMonthlyPayment(): number {
    const amount = this.loanForm.get('amount')?.value || 0;
    const term = this.loanForm.get('term')?.value || 1;
    
    // Simple calculation (amount / term) - replace with actual interest calculation if needed
    const interestRate = 0.05; // 5% annual interest
    const monthlyRate = interestRate / 12;
    const payment = (amount * monthlyRate * Math.pow(1 + monthlyRate, term)) / 
                    (Math.pow(1 + monthlyRate, term) - 1);
    
    return isNaN(payment) ? 0 : payment;
  }

  onSubmit() {
    if (this.loanForm.valid) {
      this.isSubmitting = true;
      
      // Simulate network delay
      setTimeout(() => {
        this.loanService.requestLoan(this.loanForm.value).subscribe({
          next: () => {
            alert('✅ Solicitud enviada exitosamente');
            this.router.navigate(['/loans']);
            this.isSubmitting = false;
          },
          error: () => {
            alert('❌ Error al solicitar el préstamo');
            this.isSubmitting = false;
          }
        });
      }, 800);
    }
  }
}
