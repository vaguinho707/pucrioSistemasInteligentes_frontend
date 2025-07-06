export interface CustomerData {
  age: number;
  annual_salary: number;
  num_accounts: number;
  loan_interest: number;
  num_loans: number;
  days_overdue: number;
  num_late_payments: number;
  total_debt: number;
}

export interface ScoreResponse extends CustomerData {
  credit_score: 'Alto' | 'Regular' | 'Baixo';
  id: number;
  created_at: string;
}