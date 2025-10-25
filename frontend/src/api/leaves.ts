import apiClient from './axios';
import { Leave } from '../types';

export const leaveApi = {
  getAll: async (): Promise<Leave[]> => {
    const response = await apiClient.get<Leave[]>('/leaves/');
    return response.data;
  },

  getById: async (id: number): Promise<Leave> => {
    const response = await apiClient.get<Leave>(`/leaves/${id}`);
    return response.data;
  },

  getByEmployee: async (employeeId: number): Promise<Leave[]> => {
    const response = await apiClient.get<Leave[]>(`/leaves/employee/${employeeId}`);
    return response.data;
  },

  create: async (data: Omit<Leave, 'id'>): Promise<Leave> => {
    const response = await apiClient.post<Leave>('/leaves/', data);
    return response.data;
  },

  update: async (id: number, data: Partial<Leave>): Promise<Leave> => {
    const response = await apiClient.put<Leave>(`/leaves/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/leaves/${id}`);
  },
};
