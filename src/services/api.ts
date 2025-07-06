import axios from 'axios';
import { CustomerData, ScoreResponse } from '@/types/customer';

const api = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const analyzeScore = async (data: CustomerData): Promise<ScoreResponse> => {
  const response = await api.post<ScoreResponse>('/analyze', data);
  return response.data;
};

export const getAnalysisHistory = async (): Promise<ScoreResponse[]> => {
  const response = await api.get<{ analyses: ScoreResponse[] }>('/analyses');
  return response.data.analyses;
};