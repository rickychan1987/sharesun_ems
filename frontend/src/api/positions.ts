import apiClient from './axios';
import { Position } from '../types';

export const positionApi = {
  getAll: async (): Promise<Position[]> => {
    const response = await apiClient.get<Position[]>('/positions/');
    return response.data;
  },

  getById: async (id: number): Promise<Position> => {
    const response = await apiClient.get<Position>(`/positions/${id}`);
    return response.data;
  },

  create: async (data: Omit<Position, 'id'>): Promise<Position> => {
    const response = await apiClient.post<Position>('/positions/', data);
    return response.data;
  },

  update: async (id: number, data: Partial<Position>): Promise<Position> => {
    const response = await apiClient.put<Position>(`/positions/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/positions/${id}`);
  },
};
