import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export interface MediaEntry {
  url?: string;
  title?: string;
  description?: string;
  mediaType?: string;
  updatedAt?: string;
  storagePath?: string;
  projectId?: string;
  slotNumber?: string;
  extra?: any;
}

interface AuthContextType {
  isAdmin: boolean;
  isCheckingAuth: boolean;
  token: string | null;
  savedMedia: Record<string, string>;
  savedMetadata: Record<string, MediaEntry>;
  login: (password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  uploadImageFile: (
    file: File | Blob,
    key: string,
    meta?: {
      title?: string;
      description?: string;
      projectId?: string;
      slotNumber?: string;
      mediaType?: 'image' | 'video';
      onProgress?: (percent: number) => void;
    }
  ) => Promise<{ success: boolean; url?: string; error?: string }>;
  saveProjectMedia: (
    projectId: string,
    slotNumber: string,
    mediaUrl?: string,
    mediaType?: string,
    meta?: { title?: string; description?: string; extra?: any }
  ) => Promise<{ success: boolean; error?: string }>;
  saveReelData: (
    reelId: string,
    data: { title?: string; description?: string; thumbnailUrl?: string; videoUrl?: string }
  ) => Promise<{ success: boolean; error?: string }>;
  removeProjectMedia: (
    projectId: string,
    slotNumber: string
  ) => Promise<{ success: boolean; error?: string }>;
  isOwnerModalOpen: boolean;
  setIsOwnerModalOpen: (open: boolean) => void;
  isImageUploadModalOpen: boolean;
  setIsImageUploadModalOpen: (open: boolean) => void;
  selectedUploadSlotKey: string | null;
  openImageUploadForSlot: (slotKey?: string) => void;
  refreshMedia: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState<boolean>(true);
  const [token, setToken] = useState<string | null>(null);
  const [savedMedia, setSavedMedia] = useState<Record<string, string>>({});
  const [savedMetadata, setSavedMetadata] = useState<Record<string, MediaEntry>>({});
  const [isOwnerModalOpen, setIsOwnerModalOpen] = useState<boolean>(false);
  const [isImageUploadModalOpen, setIsImageUploadModalOpen] = useState<boolean>(false);
  const [selectedUploadSlotKey, setSelectedUploadSlotKey] = useState<string | null>(null);

  const openImageUploadForSlot = useCallback((slotKey?: string) => {
    setSelectedUploadSlotKey(slotKey || null);
    setIsImageUploadModalOpen(true);
  }, []);

  // Fetch media from server local storage
  const refreshMedia = useCallback(async () => {
    try {
      const res = await fetch('/api/media');
      if (res.ok) {
        const data = await res.json();
        if (data.media) {
          const map: Record<string, string> = {};
          const metaMap: Record<string, MediaEntry> = {};
          Object.entries(data.media).forEach(([key, val]: [string, any]) => {
            if (val) {
              metaMap[key] = val;
              if (val.url) {
                map[key] = val.url;
              }
            }
          });
          setSavedMedia(map);
          setSavedMetadata(metaMap);
        }
      }
    } catch (err) {
      console.warn('Could not fetch local media store:', err);
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
    setIsImageUploadModalOpen(false);
  };

  /**
   * Upload image file as base64 data URL to local server media store
   */
  const uploadImageFile = async (
    file: File | Blob,
    key: string,
    meta?: {
      title?: string;
      description?: string;
      projectId?: string;
      slotNumber?: string;
      mediaType?: 'image' | 'video';
      onProgress?: (percent: number) => void;
    }
  ): Promise<{ success: boolean; url?: string; error?: string }> => {
    if (!isAdmin) {
      return { success: false, error: 'Unauthorized: Owner login is required to upload images.' };
    }

    try {
      const dataUrl = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      meta?.onProgress?.(100);

      // Update local state
      setSavedMedia(prev => ({ ...prev, [key]: dataUrl }));
      setSavedMetadata(prev => ({
        ...prev,
        [key]: {
          url: dataUrl,
          title: meta?.title,
          description: meta?.description,
          projectId: meta?.projectId,
          slotNumber: meta?.slotNumber,
          mediaType: meta?.mediaType || (file.type.startsWith('video/') ? 'video' : 'image'),
          updatedAt: new Date().toISOString()
        }
      }));

      // Keep server synchronized
      if (token) {
        const parts = key.split('_');
        const pId = meta?.projectId || (parts.length > 1 ? parts.slice(0, -1).join('_') : key);
        const sNum = meta?.slotNumber || (parts.length > 1 ? parts[parts.length - 1] : 'main');

        await fetch('/api/admin/media', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            projectId: pId,
            slotNumber: sNum,
            mediaUrl: dataUrl,
            mediaType: meta?.mediaType || 'image',
            title: meta?.title,
            description: meta?.description
          })
        });
      }

      return { success: true, url: dataUrl };
    } catch (err: any) {
      console.error('Error during image upload:', err);
      return { success: false, error: err.message || 'Image upload failed' };
    }
  };

  /**
   * Save media URL to state and server
   */
  const saveProjectMedia = async (
    projectId: string,
    slotNumber: string,
    mediaUrl?: string,
    mediaType = 'image',
    meta?: { title?: string; description?: string; extra?: any }
  ): Promise<{ success: boolean; error?: string }> => {
    if (!isAdmin) {
      return { success: false, error: 'Unauthorized. Owner login required.' };
    }

    const key = `${projectId}_${slotNumber}`;

    try {
      if (mediaUrl) {
        setSavedMedia(prev => ({ ...prev, [key]: mediaUrl }));
      }
      setSavedMetadata(prev => ({
        ...prev,
        [key]: {
          ...prev[key],
          ...(mediaUrl ? { url: mediaUrl } : {}),
          ...(meta?.title !== undefined ? { title: meta.title } : {}),
          ...(meta?.description !== undefined ? { description: meta.description } : {}),
          projectId,
          slotNumber,
          mediaType: mediaType || 'image',
          updatedAt: new Date().toISOString()
        }
      }));

      if (token) {
        await fetch('/api/admin/media', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            projectId,
            slotNumber,
            mediaUrl,
            mediaType,
            title: meta?.title,
            description: meta?.description,
            extra: meta?.extra
          })
        });
      }

      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Error saving media' };
    }
  };

  const saveReelData = async (
    reelId: string,
    data: { title?: string; description?: string; thumbnailUrl?: string; videoUrl?: string }
  ): Promise<{ success: boolean; error?: string }> => {
    if (!isAdmin) {
      return { success: false, error: 'Unauthorized. Owner login required.' };
    }

    try {
      if (data.thumbnailUrl) {
        await saveProjectMedia(reelId, 'thumb', data.thumbnailUrl, 'image');
      }
      if (data.videoUrl) {
        await saveProjectMedia(reelId, 'video', data.videoUrl, 'video');
      }
      if (data.title !== undefined || data.description !== undefined) {
        await saveProjectMedia(reelId, 'meta', undefined, 'meta', {
          title: data.title,
          description: data.description
        });
      }

      await refreshMedia();
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Failed to save reel changes' };
    }
  };

  const removeProjectMedia = async (
    projectId: string,
    slotNumber: string
  ): Promise<{ success: boolean; error?: string }> => {
    if (!isAdmin) {
      return { success: false, error: 'Unauthorized. Owner login required.' };
    }

    const key = `${projectId}_${slotNumber}`;

    try {
      setSavedMedia(prev => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
      setSavedMetadata(prev => {
        const next = { ...prev };
        delete next[key];
        return next;
      });

      if (token) {
        await fetch('/api/admin/media', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ projectId, slotNumber })
        });
      }

      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Error removing media' };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAdmin,
        isCheckingAuth,
        token,
        savedMedia,
        savedMetadata,
        login,
        logout,
        uploadImageFile,
        saveProjectMedia,
        saveReelData,
        removeProjectMedia,
        isOwnerModalOpen,
        setIsOwnerModalOpen,
        isImageUploadModalOpen,
        setIsImageUploadModalOpen,
        selectedUploadSlotKey,
        openImageUploadForSlot,
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

