import { useState } from 'react';
import { CustomerData } from '@/types/customer';

interface Props {
  onSubmit: (data: CustomerData) => Promise<void>;
  isLoading: boolean;
}

export default function ScoreAnalysisForm({ onSubmit, isLoading }: Props) {
  const [formData, setFormData] = useState<CustomerData>({
    age: 0,
    annual_salary: 0,
    num_accounts: 0,
    loan_interest: 0,
    num_loans: 0,
    days_overdue: 0,
    num_late_payments: 0,
    total_debt: 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  setFormData(prev => ({
    ...prev,
    [name]: 
      ['annual_salary', 'loan_interest', 'total_debt'].includes(name)
        ? parseFloat(value)
        : parseInt(value, 10)
  }));
};

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Credit Score Analysis</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            value={formData.age || ''}
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
            value={formData.annual_salary || ''}
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
            value={formData.num_accounts || ''}
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
            value={formData.loan_interest || ''}
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

      <div className="mt-8">
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-3 px-4 text-white font-medium rounded-md ${
            isLoading
              ? 'bg-blue-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
          }`}
        >
          {isLoading ? 'Analyzing...' : 'Analyze Credit Score'}
        </button>
      </div>
    </form>
  );
}