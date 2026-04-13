'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

export type NetworkStatus = 'online' | 'offline' | 'checking';

export interface UseNetworkReturn {
  isOnline: boolean;
  status: NetworkStatus;
  wasOffline: boolean;
  retryCount: number;
  resetRetry: () => void;
}

export function useNetwork(): UseNetworkReturn {
  const [isOnline, setIsOnline] = useState(true);
  const [status, setStatus] = useState<NetworkStatus>('checking');
  const [wasOffline, setWasOffline] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const retryTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleOnline = useCallback(() => {
    setIsOnline(true);
    setStatus('online');
    if (!wasOffline) {
      setWasOffline(true);
    }
  }, [wasOffline]);

  const handleOffline = useCallback(() => {
    setIsOnline(false);
    setStatus('offline');
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    setIsOnline(navigator.onLine);
    setStatus(navigator.onLine ? 'online' : 'offline');

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [handleOnline, handleOffline]);

  const resetRetry = useCallback(() => {
    setRetryCount(0);
  }, []);

  return {
    isOnline,
    status,
    wasOffline,
    retryCount,
    resetRetry,
  };
}

export interface RetryConfig {
  maxRetries?: number;
  retryDelay?: number;
  onRetry?: (attempt: number) => void;
}

export interface UseFetchWithRetryOptions extends RequestInit, RetryConfig {
  timeout?: number;
}

export interface UseFetchWithRetryReturn<T> {
  data: T | null;
  error: Error | null;
  isLoading: boolean;
  refetch: () => Promise<void>;
}

export function useFetchWithRetry<T>(
  url: string | null,
  options?: UseFetchWithRetryOptions
): UseFetchWithRetryReturn<T> {
  const {
    maxRetries = 3,
    retryDelay = 1000,
    onRetry,
    timeout = 10000,
    ...fetchOptions
  } = options || {};

  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchWithRetry = useCallback(async () => {
    if (!url) return;

    setIsLoading(true);
    setError(null);

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();

    let lastError: Error | null = null;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);

        const response = await fetch(url, {
          ...fetchOptions,
          signal: AbortSignal.any([
            abortControllerRef.current?.signal as AbortSignal,
            controller.signal,
          ]),
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const result = await response.json();
        setData(result);
        setIsLoading(false);
        return;
      } catch (err) {
        lastError = err instanceof Error ? err : new Error(String(err));

        if (err instanceof DOMException && err.name === 'AbortError') {
          setIsLoading(false);
          return;
        }

        if (attempt < maxRetries) {
          if (onRetry) {
            onRetry(attempt + 1);
          }
          await new Promise(resolve => setTimeout(resolve, retryDelay * (attempt + 1)));
        }
      }
    }

    setError(lastError);
    setIsLoading(false);
  }, [url, maxRetries, retryDelay, timeout, fetchOptions, onRetry]);

  useEffect(() => {
    fetchWithRetry();
  }, [url]);

  return {
    data,
    error,
    isLoading,
    refetch: fetchWithRetry,
  };
}

export function useCachedData<T>(key: string, fallback: T): {
  data: T;
  isStale: boolean;
  update: (newData: T) => void;
  clear: () => void;
} {
  const [cachedData, setCachedData] = useState<T>(fallback);
  const [isStale, setIsStale] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const stored = localStorage.getItem(`cache_${key}`);
      if (stored) {
        const parsed = JSON.parse(stored);
        setCachedData(parsed);
        setIsStale(true);
      }
    } catch {
      // Ignore storage errors
    }
  }, [key]);

  const update = useCallback((newData: T) => {
    setCachedData(newData);
    setIsStale(false);
    try {
      localStorage.setItem(`cache_${key}`, JSON.stringify(newData));
    } catch {
      // Ignore storage errors
    }
  }, [key]);

  const clear = useCallback(() => {
    setCachedData(fallback);
    setIsStale(false);
    try {
      localStorage.removeItem(`cache_${key}`);
    } catch {
      // Ignore storage errors
    }
  }, [key, fallback]);

  return { data: cachedData, isStale, update, clear };
}

interface OfflineFallbackProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  onlineFallback?: React.ReactNode;
}

export function OfflineProvider({ 
  children, 
  fallback,
  onlineFallback 
}: OfflineFallbackProps) {
  const { isOnline, wasOffline } = useNetwork();

  if (!isOnline) {
    if (fallback) {
      return <>{fallback}</>;
    }
    return (
      <div style={{
        padding: '16px',
        background: 'rgba(139, 115, 85, 0.1)',
        border: '1px solid rgba(139, 115, 85, 0.3)',
        borderRadius: '8px',
        textAlign: 'center',
        color: '#8B7355',
        fontSize: '13px',
      }}>
        <p style={{ margin: 0 }}>
          You appear to be offline. Some features may be limited.
        </p>
      </div>
    );
  }

  if (wasOffline && isOnline && onlineFallback) {
    return (
      <>
        {onlineFallback}
        {children}
      </>
    );
  }

  return <>{children}</>;
}