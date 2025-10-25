import apiClient from './axios';
import { Payroll } from '../types';

export const payrollApi = {
  getAll: async (): Promise<Payroll[]> => {
    const response = await apiClient.get<Payroll[]>('/payrolls/');
    return response.data;
  },

  getById: async (id: number): Promise<Payroll> => {
    const response = await apiClient.get<Payroll>(`/payrolls/${id}`);
    return response.data;
  },

  getByEmployee: async (employeeId: number): Promise<Payroll[]> => {
    const response = await apiClient.get<Payroll[]>(`/payrolls/employee/${employeeId}`);
    return response.data;
  },

  create: async (data: Omit<Payroll, 'id'>): Promise<Payroll> => {
    const response = await apiClient.post<Payroll>('/payrolls/', data);
    return response.data;
  },

  update: async (id: number, data: Partial<Payroll>): Promise<Payroll> => {
    const response = await apiClient.put<Payroll>(`/payrolls/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/payrolls/${id}`);
  },
};
