import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface AuthState {
  isAuthenticated: boolean;
  verificationLevel: string | null;
  nullifierHash: string | null;
}

export function useAuth(checkInterval = 60000) {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    verificationLevel: null,
    nullifierHash: null
  });
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/check-auth', { credentials: 'include' });
      if (response.ok) {
        const data = await response.json();
        setAuthState({
          isAuthenticated: data.authenticated,
          verificationLevel: data.verification_level || null,
          nullifierHash: data.nullifier_hash || null
        });
      } else {
        setAuthState({
          isAuthenticated: false,
          verificationLevel: null,
          nullifierHash: null
        });
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setAuthState({
        isAuthenticated: false,
        verificationLevel: null,
        nullifierHash: null
      });
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      const response = await fetch('/api/logout', {
        method: 'POST',
        credentials: 'include'
      });
      if (response.ok) {
        setAuthState({
          isAuthenticated: false,
          verificationLevel: null,
          nullifierHash: null
        });
        router.push('/login'); // Redirect to login page after logout
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  useEffect(() => {
    checkAuth();
    const intervalId = setInterval(checkAuth, checkInterval);
    return () => clearInterval(intervalId);
  }, [checkInterval]);

  return { ...authState, isLoading, refreshAuth: checkAuth, logout };
}