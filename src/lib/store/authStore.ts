import { create } from 'zustand';
import { User } from 'firebase/auth';
import { auth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from '@/lib/firebase';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAdmin: boolean;
  error: string | null;
}

interface AuthActions {
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAdminStatus: (user: User) => Promise<boolean>;
  initialize: () => void;
}

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>((set, get) => ({
  // 初期状態
  user: null,
  isLoading: true,
  isAdmin: false,
  error: null,

  // アクション
  setUser: (user) => {
    set({ user });
    if (user) {
      get().checkAdminStatus(user);
    } else {
      set({ isAdmin: false });
    }
  },

  setLoading: (isLoading) => set({ isLoading }),

  setError: (error) => set({ error }),

  login: async (email: string, password: string) => {
    try {
      set({ isLoading: true, error: null });
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // カスタムクレームをチェック
      const idTokenResult = await user.getIdTokenResult();
      const isAdmin = !!idTokenResult.claims.admin;
      
      if (!isAdmin) {
        await signOut(auth);
        throw new Error('管理者権限がありません');
      }

      set({ 
        user,
        isAdmin: true,
        isLoading: false,
        error: null 
      });
    } catch (error) {
      console.error('Login error:', error);
      set({ 
        user: null,
        isAdmin: false,
        isLoading: false,
        error: error instanceof Error ? error.message : 'ログインに失敗しました'
      });
      throw error;
    }
  },

  logout: async () => {
    try {
      set({ isLoading: true });
      await signOut(auth);
      set({ 
        user: null,
        isAdmin: false,
        isLoading: false,
        error: null 
      });
    } catch (error) {
      console.error('Logout error:', error);
      set({ 
        isLoading: false,
        error: error instanceof Error ? error.message : 'ログアウトに失敗しました'
      });
    }
  },

  checkAdminStatus: async (user: User) => {
    try {
      const idTokenResult = await user.getIdTokenResult();
      const isAdmin = !!idTokenResult.claims.admin;
      set({ isAdmin });
      return isAdmin;
    } catch (error) {
      console.error('Error checking admin status:', error);
      set({ isAdmin: false });
      return false;
    }
  },

  initialize: () => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const idTokenResult = await user.getIdTokenResult();
          const isAdmin = !!idTokenResult.claims.admin;
          set({ 
            user,
            isAdmin,
            isLoading: false 
          });
        } catch (error) {
          console.error('Error getting token:', error);
          set({ 
            user,
            isAdmin: false,
            isLoading: false 
          });
        }
      } else {
        set({ 
          user: null,
          isAdmin: false,
          isLoading: false 
        });
      }
    });

    // cleanup function を返す
    return unsubscribe;
  },
}));
