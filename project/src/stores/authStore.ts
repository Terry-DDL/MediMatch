import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase';
import type { User } from '@/types';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  initializeAuth: () => void;
}

// Helper function to convert Firebase user to our User type
const convertFirebaseUser = (firebaseUser: FirebaseUser): User => ({
  id: firebaseUser.uid,
  email: firebaseUser.email || '',
  name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User',
  photoURL: firebaseUser.photoURL || undefined,
});

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: true,

      // Email/Password Login
      login: async (email: string, password: string) => {
        try {
          const userCredential = await signInWithEmailAndPassword(auth, email, password);
          const user = convertFirebaseUser(userCredential.user);
          const token = await userCredential.user.getIdToken();
          
          set({
            user,
            token,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error: any) {
          console.error('Login error:', error);
          throw new Error(error.message || 'Login failed');
        }
      },

      // Google Login
      loginWithGoogle: async () => {
        try {
          const result = await signInWithPopup(auth, googleProvider);
          const user = convertFirebaseUser(result.user);
          const token = await result.user.getIdToken();
          
          set({
            user,
            token,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error: any) {
          console.error('Google login error:', error);
          throw new Error(error.message || 'Google login failed');
        }
      },

      // Email/Password Registration
      register: async (email: string, password: string) => {
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          const user = convertFirebaseUser(userCredential.user);
          const token = await userCredential.user.getIdToken();
          
          set({
            user,
            token,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error: any) {
          console.error('Registration error:', error);
          throw new Error(error.message || 'Registration failed');
        }
      },

      // Logout
      logout: async () => {
        try {
          await signOut(auth);
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
          });
        } catch (error: any) {
          console.error('Logout error:', error);
          throw new Error(error.message || 'Logout failed');
        }
      },

      // Initialize auth state listener
      initializeAuth: () => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
          if (firebaseUser) {
            const user = convertFirebaseUser(firebaseUser);
            const token = await firebaseUser.getIdToken();
            
            set({
              user,
              token,
              isAuthenticated: true,
              isLoading: false,
            });
          } else {
            set({
              user: null,
              token: null,
              isAuthenticated: false,
              isLoading: false,
            });
          }
        });

        // Return unsubscribe function for cleanup
        return unsubscribe;
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        // Don't persist isLoading state
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);