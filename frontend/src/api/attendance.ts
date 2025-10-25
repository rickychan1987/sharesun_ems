import apiClient from './axios';
import { Attendance } from '../types';

export const attendanceApi = {
  getAll: async (): Promise<Attendance[]> => {
    const response = await apiClient.get<Attendance[]>('/attendances/');
    return response.data;
  },

  getById: async (id: number): Promise<Attendance> => {
    const response = await apiClient.get<Attendance>(`/attendances/${id}`);
    return response.data;
  },

  getByEmployee: async (employeeId: number): Promise<Attendance[]> => {
    const response = await apiClient.get<Attendance[]>(`/attendances/employee/${employeeId}`);
    return response.data;
  },

  create: async (data: Omit<Attendance, 'id'>): Promise<Attendance> => {
    const response = await apiClient.post<Attendance>('/attendances/', data);
    return response.data;
  },

  update: async (id: number, data: Partial<Attendance>): Promise<Attendance> => {
    const response = await apiClient.put<Attendance>(`/attendances/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/attendances/${id}`);
  },
};
