import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

interface AuthContextType {
  isAdmin: boolean;
  isCheckingAuth: boolean;
  token: string | null;
  savedMedia: Record<string, string>;
  login: (password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  saveProjectMedia: (
    projectId: string,
    slotNumber: string,
    mediaUrl: string,
    mediaType?: string
  ) => Promise<{ success: boolean; error?: string }>;
  removeProjectMedia: (
    projectId: string,
    slotNumber: string
  ) => Promise<{ success: boolean; error?: string }>;
  isOwnerModalOpen: boolean;
  setIsOwnerModalOpen: (open: boolean) => void;
  refreshMedia: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState<boolean>(true);
  const [token, setToken] = useState<string | null>(null);
  const [savedMedia, setSavedMedia] = useState<Record<string, string>>({});
  const [isOwnerModalOpen, setIsOwnerModalOpen] = useState<boolean>(false);

  // Fetch public media from server so all visitors see the latest saved media
  const refreshMedia = useCallback(async () => {
    try {
      const res = await fetch('/api/media');
      if (res.ok) {
        const data = await res.json();
        if (data.media) {
          const map: Record<string, string> = {};
          Object.entries(data.media).forEach(([key, val]: [string, any]) => {
            if (val && val.url) {
              map[key] = val.url;
            }
          });
          setSavedMedia(map);
        }
      }
    } catch (err) {
      console.warn('Could not fetch server media, using fallback:', err);
    }
  }, []);

  // Initial verification of stored token
  useEffect(() => {
    const initAuth = async () => {
      try {
        const storedToken = localStorage.getItem('portfolio_owner_token');
        if (storedToken) {
          const res = await fetch('/api/auth/verify', {
            headers: {
              Authorization: `Bearer ${storedToken}`
            }
          });
          if (res.ok) {
            const data = await res.json();
            if (data.authenticated && data.role === 'owner') {
              setIsAdmin(true);
              setToken(storedToken);
            } else {
              localStorage.removeItem('portfolio_owner_token');
              setIsAdmin(false);
              setToken(null);
            }
          } else {
            localStorage.removeItem('portfolio_owner_token');
            setIsAdmin(false);
            setToken(null);
          }
        }
      } catch (err) {
        console.warn('Auth check error:', err);
        setIsAdmin(false);
        setToken(null);
      } finally {
        setIsCheckingAuth(false);
      }
    };

    initAuth();
    refreshMedia();
  }, [refreshMedia]);

  const login = async (password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });

      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem('portfolio_owner_token', data.token);
        setToken(data.token);
        setIsAdmin(true);
        setIsOwnerModalOpen(false);
        await refreshMedia();
        return { success: true };
      } else {
        return { success: false, error: data.error || 'Authentication failed' };
      }
    } catch (err: any) {
      return { success: false, error: err.message || 'Network error during login' };
    }
  };

  const logout = () => {
    localStorage.removeItem('portfolio_owner_token');
    setToken(null);
    setIsAdmin(false);
  };

  const saveProjectMedia = async (
    projectId: string,
    slotNumber: string,
    mediaUrl: string,
    mediaType = 'image'
  ): Promise<{ success: boolean; error?: string }> => {
    if (!token || !isAdmin) {
      return { success: false, error: 'Unauthorized. Owner login required.' };
    }

    try {
      const res = await fetch('/api/admin/media', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          projectId,
          slotNumber,
          mediaUrl,
          mediaType
        })
      });

      const data = await res.json();
      if (res.ok) {
        const key = `${projectId}_${slotNumber}`;
        setSavedMedia(prev => ({ ...prev, [key]: mediaUrl }));
        return { success: true };
      } else {
        if (res.status === 401) {
          logout();
        }
        return { success: false, error: data.error || 'Failed to save media on server' };
      }
    } catch (err: any) {
      return { success: false, error: err.message || 'Error communicating with server' };
    }
  };

  const removeProjectMedia = async (
    projectId: string,
    slotNumber: string
  ): Promise<{ success: boolean; error?: string }> => {
    if (!token || !isAdmin) {
      return { success: false, error: 'Unauthorized. Owner login required.' };
    }

    try {
      const res = await fetch('/api/admin/media', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ projectId, slotNumber })
      });

      const data = await res.json();
      if (res.ok) {
        const key = `${projectId}_${slotNumber}`;
        setSavedMedia(prev => {
          const next = { ...prev };
          delete next[key];
          return next;
        });
        return { success: true };
      } else {
        return { success: false, error: data.error || 'Failed to remove media' };
      }
    } catch (err: any) {
      return { success: false, error: err.message || 'Error communicating with server' };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAdmin,
        isCheckingAuth,
        token,
        savedMedia,
        login,
        logout,
        saveProjectMedia,
        removeProjectMedia,
        isOwnerModalOpen,
        setIsOwnerModalOpen,
        refreshMedia
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
