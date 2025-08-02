import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@/types';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  upgradeToPlus: () => Promise<void>;
  applyPlus: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      login: async (email: string, password: string) => {
        // Mock login - replace with real API call
        if (email && password) {
          const mockUser: User = {
            id: '1',
            email,
            name: email.split('@')[0],
            plan: 'free',
          };
          const mockToken = 'mock-jwt-token-' + Date.now();
          
          set({
            user: mockUser,
            token: mockToken,
            isAuthenticated: true,
          });
        } else {
          throw new Error('Invalid credentials');
        }
      },
      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      },
      upgradeToPlus: async () => {
        try {
          const res = await fetch('/api/create-checkout-session', {
            method: 'POST',
          });
          const data = await res.json();
          if (data.url) {
            window.location.href = data.url;
          }
        } catch (err) {
          console.error('Upgrade failed', err);
        }
      },
      applyPlus: () => {
        set((state) => ({
          user: state.user ? { ...state.user, plan: 'plus' } : null,
        }));
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);