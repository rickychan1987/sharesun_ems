import { create } from 'zustand';
import { User } from '../types';

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: localStorage.getItem('access_token'),
  isLoading: false,
  
  setUser: (user) => set({ user }),
  
  setToken: (token) => {
    if (token) {
      localStorage.setItem('access_token', token);
      console.log('Token saved to localStorage');
    } else {
      localStorage.removeItem('access_token');
      console.log('Token removed from localStorage');
    }
    set({ token });
  },
  
  setLoading: (loading) => set({ isLoading: loading }),
  
  logout: () => {
    localStorage.removeItem('access_token');
    set({ user: null, token: null, isLoading: false });
  },
  
  isAuthenticated: () => {
    const state = get();
    return !!state.token && !!state.user;
  },
}));
