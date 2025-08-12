import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';

interface UseAuthOptions {
  redirectTo?: string;
  requireAdmin?: boolean;
}

export function useAuth(options: UseAuthOptions = {}) {
  const {
    redirectTo = '/admin/login',
    requireAdmin = false,
  } = options;

  const router = useRouter();
  const { user, isAdmin, isLoading, isInitialized, initialize } = useAuthStore();

  useEffect(() => {
    const unsubscribe = initialize();
    return unsubscribe;
  }, [initialize]);

  useEffect(() => {
    if (isInitialized && !isLoading) {
      if (!user) {
        router.push(redirectTo);
        return;
      }

      if (requireAdmin && !isAdmin) {
        router.push(redirectTo);
        return;
      }
    }
  }, [user, isAdmin, isLoading, isInitialized, router, redirectTo, requireAdmin]);

  return {
    user,
    isAdmin,
    isLoading: isLoading || !isInitialized,
    isAuthenticated: !!user,
    hasAdminAccess: !!user && isAdmin,
  };
}

export function useRequireAuth(redirectTo = '/admin/login') {
  return useAuth({ redirectTo, requireAdmin: false });
}

export function useRequireAdmin(redirectTo = '/admin/login') {
  return useAuth({ redirectTo, requireAdmin: true });
}
