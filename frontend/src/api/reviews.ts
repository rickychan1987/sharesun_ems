import apiClient from './axios';
import { Review } from '../types';

export const reviewApi = {
  getAll: async (): Promise<Review[]> => {
    const response = await apiClient.get<Review[]>('/reviews/');
    return response.data;
  },

  getById: async (id: number): Promise<Review> => {
    const response = await apiClient.get<Review>(`/reviews/${id}`);
    return response.data;
  },

  create: async (data: Omit<Review, 'id'>): Promise<Review> => {
    const response = await apiClient.post<Review>('/reviews/', data);
    return response.data;
  },

  update: async (id: number, data: Partial<Review>): Promise<Review> => {
    const response = await apiClient.put<Review>(`/reviews/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/reviews/${id}`);
  },
};
