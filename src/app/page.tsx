'use client';

import { useState } from 'react';
import Image from 'next/image'
import ScoreAnalysisForm from '@/components/ScoreAnalysisForm';
import { CustomerData, ScoreResponse } from '@/types/customer';
import { analyzeScore } from '@/services/api';
import styles from './page.module.css'

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ScoreResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: CustomerData) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await analyzeScore(data);
      setResult(response);
    } catch (err) {
      setError('Failed to analyze credit score. Please try again.');
      console.error('Error analyzing score:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const getScoreColor = (score: string) => {
    switch (score.toLowerCase()) {
      case 'alto':
        return 'text-green-600';
      case 'regular':
        return 'text-yellow-600';
      case 'baixo':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Credit Score Analyzer
        </h1>

        <ScoreAnalysisForm onSubmit={handleSubmit} isLoading={isLoading} />

        {error && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {result && (
          <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Analysis Result</h2>
            <div className="flex items-center justify-center">
              <div className={`text-4xl font-bold ${getScoreColor(result.credit_score)}`}>
                {result.credit_score}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
