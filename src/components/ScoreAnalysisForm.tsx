import { useState } from 'react';
import { CustomerData } from '@/types/customer';

interface Props {
  onSubmit: (data: CustomerData) => Promise<void>;
  isLoading: boolean;
}

export default function ScoreAnalysisForm({ onSubmit, isLoading }: Props) {
  type FormDataStrings = {
    age: string;
    annual_salary: string;
    num_accounts: string;
    loan_interest: string;
    num_loans: string;
    days_overdue: string;
    num_late_payments: string;
    total_debt: string;
  };

  const [formData, setFormData] = useState<FormDataStrings>({
    age: '',
    annual_salary: '',
    num_accounts: '',
    loan_interest: '',
    num_loans: '',
    days_overdue: '',
    num_late_payments: '',
    total_debt: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Convert string values to numbers for CustomerData
    const data: CustomerData = {
      age: Number(formData.age),
      annual_salary: Number(formData.annual_salary),
      num_accounts: Number(formData.num_accounts),
      loan_interest: Number(formData.loan_interest),
      num_loans: Number(formData.num_loans),
      days_overdue: Number(formData.days_overdue),
      num_late_payments: Number(formData.num_late_payments),
      total_debt: Number(formData.total_debt),
    };
    await onSubmit(data);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit} style={{ boxShadow: '0 4px 24px 0 rgba(0,0,0,0.07)', borderRadius: '16px', background: '#fff', padding: '2.5rem 2rem', margin: '2rem 0' }}>
      <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '2rem', color: '#2563eb', textAlign: 'center', letterSpacing: '-1px' }}>Credit Score Analysis</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', maxWidth: 600, margin: '0 auto' }}>
        <div>
          <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
            Age
          </label>
          <input
            type="number"
            id="age"
            name="age"
            min="18"
            max="100"
            required
            value={formData.age}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="annual_salary" className="block text-sm font-medium text-gray-700 mb-1">
            Annual Salary
          </label>
          <input
            type="number"
            id="annual_salary"
            name="annual_salary"
            min="0"
            step="0.01"
            required
            value={formData.annual_salary}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="num_accounts" className="block text-sm font-medium text-gray-700 mb-1">
            Number of Accounts
          </label>
          <input
            type="number"
            id="num_accounts"
            name="num_accounts"
            min="0"
            required
            value={formData.num_accounts}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="loan_interest" className="block text-sm font-medium text-gray-700 mb-1">
            Loan Interest Rate (%)
          </label>
          <input
            type="number"
            id="loan_interest"
            name="loan_interest"
            min="0"
            max="100"
            step="0.01"
            required
            value={formData.loan_interest}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="num_loans" className="block text-sm font-medium text-gray-700 mb-1">
            Number of Loans
          </label>
          <input
            type="number"
            id="num_loans"
            name="num_loans"
            min="0"
            required
            value={formData.num_loans}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="days_overdue" className="block text-sm font-medium text-gray-700 mb-1">
            Days Overdue
          </label>
          <input
            type="number"
            id="days_overdue"
            name="days_overdue"
            min="0"
            required
            value={formData.days_overdue}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="num_late_payments" className="block text-sm font-medium text-gray-700 mb-1">
            Number of Late Payments
          </label>
          <input
            type="number"
            id="num_late_payments"
            name="num_late_payments"
            min="0"
            required
            value={formData.num_late_payments}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="total_debt" className="block text-sm font-medium text-gray-700 mb-1">
            Total Debt
          </label>
          <input
            type="number"
            id="total_debt"
            name="total_debt"
            // min="0"
            step="0.01"
            required
            value={formData.total_debt}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div style={{ gridColumn: '1 / -1', marginTop: '2.5rem' }}>
        <button
          type="submit"
          disabled={isLoading}
          style={{
            width: '100%',
            padding: '1rem',
            fontSize: '1.1rem',
            fontWeight: 600,
            borderRadius: '8px',
            background: isLoading ? '#93c5fd' : '#2563eb',
            color: '#fff',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            boxShadow: '0 2px 8px 0 rgba(37,99,235,0.08)',
            border: 'none',
            transition: 'background 0.2s',
            opacity: isLoading ? 0.7 : 1
          }}
        >
          {isLoading ? 'Analyzing...' : 'Analyze Credit Score'}
        </button>
      </div>
    </form>
  );
}