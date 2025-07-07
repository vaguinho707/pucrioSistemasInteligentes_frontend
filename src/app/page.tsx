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
        <h1
          style={{
            fontSize: '2.7rem',
            fontWeight: 800,
            textAlign: 'center',
            color: '#2563eb',
            marginBottom: '2.5rem',
            letterSpacing: '-1.5px',
            textShadow: '0 2px 12px rgba(37,99,235,0.08)',
            lineHeight: 1.1,
          }}
        >
          Credit Score Analyzer
        </h1>

        <ScoreAnalysisForm onSubmit={handleSubmit} isLoading={isLoading} />

        {error && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {result && (
          <div style={{
            marginTop: '2.5rem',
            padding: '2rem',
            background: '#fff',
            borderRadius: '16px',
            boxShadow: '0 4px 24px 0 rgba(0,0,0,0.07)',
            textAlign: 'center',
            maxWidth: 480,
            marginLeft: 'auto',
            marginRight: 'auto',
          }}>
            <h2 style={{ fontSize: '1.7rem', fontWeight: 700, marginBottom: '1.5rem', color: '#2563eb' }}>Analysis Result</h2>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
              <span style={{
                fontSize: '2.5rem',
                fontWeight: 700,
                color:
                  result.credit_score.toLowerCase() === 'alto' ? '#16a34a' :
                  result.credit_score.toLowerCase() === 'regular' ? '#eab308' :
                  result.credit_score.toLowerCase() === 'baixo' ? '#dc2626' : '#222',
                letterSpacing: '-1px',
                padding: '0.5rem 1.5rem',
                borderRadius: '8px',
                boxShadow: '0 2px 8px 0 rgba(37,99,235,0.04)'
              }}>
                {result.credit_score}
              </span>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
