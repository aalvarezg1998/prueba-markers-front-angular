import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoanService } from '../../application/loan.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loan-request',
  template: `
    <div class="container">
      <h2>Solicitar Préstamo</h2>
      <form [formGroup]="loanForm" (ngSubmit)="onSubmit()">
        <div>
          <label>Monto</label>
          <input formControlName="amount" type="number" />
        </div>
        <div>
          <label>Plazo (Meses)</label>
          <input formControlName="term" type="number" />
        </div>
        <button type="submit" [disabled]="loanForm.invalid">Solicitar</button>
      </form>
    </div>
  `,
  styles: [`
    .container { max-width: 500px; margin: 20px auto; padding: 20px; border: 1px solid #eee; }
    div { margin-bottom: 15px; }
    label { display: block; margin-bottom: 5px; font-weight: bold; }
    input { width: 100%; padding: 8px; }
    button { padding: 10px 20px; background: #28a745; color: white; border: none; cursor: pointer; }
    button:disabled { background: #ccc; }
  `]
})
export class LoanRequestComponent {
  loanForm: FormGroup;

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

  onSubmit() {
    if (this.loanForm.valid) {
      this.loanService.requestLoan(this.loanForm.value).subscribe({
        next: () => {
          alert('Solicitud enviada exitosamente');
          this.router.navigate(['/loans']);
        },
        error: () => alert('Error al solicitar el préstamo')
      });
    }
  }
}
