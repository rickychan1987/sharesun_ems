import apiClient from './axios';
import { Position } from '../types';

export const positionApi = {
  // Get all positions - FIXED ENDPOINT
  getAll: async (): Promise<Position[]> => {
    const response = await apiClient.get<Position[]>('/positions/'); // Remove /api
    return response.data;
  },

  // Get position by ID - FIXED ENDPOINT
  getById: async (id: number): Promise<Position> => {
    const response = await apiClient.get<Position>(`/positions/${id}`); // Remove /api
    return response.data;
  },

  // Create position - FIXED ENDPOINT
  create: async (data: Omit<Position, 'id'>): Promise<Position> => {
    const response = await apiClient.post<Position>('/positions/', data); // Remove /api
    return response.data;
  },

  // Update position - FIXED ENDPOINT
  update: async (id: number, data: Partial<Position>): Promise<Position> => {
    const response = await apiClient.put<Position>(`/positions/${id}`, data); // Remove /api
    return response.data;
  },

  // Delete position - FIXED ENDPOINT
  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/positions/${id}`); // Remove /api
  }
};
