import apiClient from './axios';
import { Department } from '../types';



export const departmentApi = {
  // Get all departments - FIXED ENDPOINT
  getAll: async (): Promise<Department[]> => {
    const response = await apiClient.get<Department[]>('/departments/'); // Remove /api
    return response.data;
  },

  // Get department by ID - FIXED ENDPOINT
  getById: async (id: number): Promise<Department> => {
    const response = await apiClient.get<Department>(`/departments/${id}`); // Remove /api
    return response.data;
  },

  // Create department - FIXED ENDPOINT
  create: async (data: Omit<Department, 'id'>): Promise<Department> => {
    const response = await apiClient.post<Department>('/departments/', data); // Remove /api
    return response.data;
  },

  // Update department - FIXED ENDPOINT
  update: async (id: number, data: Partial<Department>): Promise<Department> => {
    const response = await apiClient.put<Department>(`/departments/${id}`, data); // Remove /api
    return response.data;
  },

  // Delete department - FIXED ENDPOINT
  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/departments/${id}`); // Remove /api
  }
};
