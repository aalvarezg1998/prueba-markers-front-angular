import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Loan, LoanRequest } from '../domain/loan.model';

@Injectable({
  providedIn: 'root'
})
export class LoanService {
  private apiUrl = '/api/loans';

  constructor(private http: HttpClient) {}

  requestLoan(request: LoanRequest): Observable<Loan> {
    return this.http.post<Loan>(this.apiUrl, request);
  }

  getMyLoans(): Observable<Loan[]> {
    return this.http.get<Loan[]>(`${this.apiUrl}/my-loans`);
  }

  getAllLoans(): Observable<Loan[]> {
    return this.http.get<Loan[]>(this.apiUrl);
  }

  approveLoan(id: number): Observable<Loan> {
    return this.http.put<Loan>(`${this.apiUrl}/${id}/approve`, {});
  }

  rejectLoan(id: number): Observable<Loan> {
    return this.http.put<Loan>(`${this.apiUrl}/${id}/reject`, {});
  }
}
