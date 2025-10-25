import apiClient from './axios';
import { Announcement } from '../types';

export const announcementApi = {
  getAll: async (): Promise<Announcement[]> => {
    const response = await apiClient.get<Announcement[]>('/announcements/');
    return response.data;
  },

  getById: async (id: number): Promise<Announcement> => {
    const response = await apiClient.get<Announcement>(`/announcements/${id}`);
    return response.data;
  },

  create: async (data: Omit<Announcement, 'id' | 'created_at'>): Promise<Announcement> => {
    const response = await apiClient.post<Announcement>('/announcements/', data);
    return response.data;
  },

  update: async (id: number, data: Partial<Announcement>): Promise<Announcement> => {
    const response = await apiClient.put<Announcement>(`/announcements/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/announcements/${id}`);
  },
};
