import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { User } from 'firebase/auth';
import { auth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from '@/lib/firebase';

interface AuthError {
  code: string;
  message: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAdmin: boolean;
  error: string | null;
  isInitialized: boolean;
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

const formatAuthError = (error: unknown): string => {
  if (error instanceof Error) {
    const message = error.message;
    // Firebase Auth エラーコードに基づいた日本語メッセージ
    if (message.includes('user-not-found')) {
      return 'ユーザーが見つかりませんでした';
    }
    if (message.includes('wrong-password')) {
      return 'パスワードが間違っています';
    }
    if (message.includes('invalid-email')) {
      return '無効なメールアドレスです';
    }
    if (message.includes('too-many-requests')) {
      return 'しばらく時間をおいてから再度お試しください';
    }
    return message;
  }
  return '認証エラーが発生しました';
};

export const useAuthStore = create<AuthStore>((set, get) => ({
  // 初期状態
  user: null,
  isLoading: true,
  isAdmin: false,
  error: null,
  isInitialized: false,

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
      const errorMessage = formatAuthError(error);
      set({ 
        user: null,
        isAdmin: false,
        isLoading: false,
        error: errorMessage
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
        error: null,
        isInitialized: false
      });
    } catch (error) {
      console.error('Logout error:', error);
      const errorMessage = formatAuthError(error);
      set({ 
        isLoading: false,
        error: errorMessage
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
      try {
        if (user) {
          const idTokenResult = await user.getIdTokenResult();
          const isAdmin = !!idTokenResult.claims.admin;
          set({ 
            user,
            isAdmin,
            isLoading: false,
            isInitialized: true,
            error: null
          });
        } else {
          set({ 
            user: null,
            isAdmin: false,
            isLoading: false,
            isInitialized: true,
            error: null
          });
        }
      } catch (error) {
        console.error('Error during auth state change:', error);
        const errorMessage = formatAuthError(error);
        set({ 
          user: null,
          isAdmin: false,
          isLoading: false,
          isInitialized: true,
          error: errorMessage
        });
      }
    });

    // cleanup function を返す
    return unsubscribe;
  },
}));
