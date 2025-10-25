import apiClient from './axios';
import { Department } from '../types';

export const departmentApi = {
  getAll: async (): Promise<Department[]> => {
    const response = await apiClient.get<Department[]>('/departments/');
    return response.data;
  },

  getById: async (id: number): Promise<Department> => {
    const response = await apiClient.get<Department>(`/departments/${id}`);
    return response.data;
  },

  create: async (data: Omit<Department, 'id'>): Promise<Department> => {
    const response = await apiClient.post<Department>('/departments/', data);
    return response.data;
  },

  update: async (id: number, data: Partial<Department>): Promise<Department> => {
    const response = await apiClient.put<Department>(`/departments/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/departments/${id}`);
  },
};
