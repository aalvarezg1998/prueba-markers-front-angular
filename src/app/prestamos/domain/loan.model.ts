export enum LoanStatus {
    PENDING = 'PENDING',
    APPROVED = 'APPROVED',
    REJECTED = 'REJECTED'
}

export interface Loan {
    id: number;
    amount: number;
    term: number;
    status: LoanStatus;
    userId: number;
}

export interface LoanRequest {
    amount: number;
    term: number;
}
