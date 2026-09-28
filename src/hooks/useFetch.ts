import { useCallback, useEffect, useRef, useState } from 'react';

export interface ApiErrorShape {
  message: string;
  status: number | null;
}

export type FetchStatus = 'idle' | 'loading' | 'success' | 'error';

export interface UseFetchResult<T> {
  data: T | null;
  status: FetchStatus;
  error: ApiErrorShape | null;
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
}

/**
 * Wraps a single API call with standardized loading / error / success state.
 * Used by every page and chart so the app has one consistent data-fetching
 * pattern instead of ad hoc useEffect + useState per component.
 *
 * `deps` re-runs the fetch when any dependency changes (e.g. a dropdown filter).
 */
export function useFetch<T>(fetchFn: () => Promise<T>, deps: React.DependencyList = []): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [status, setStatus] = useState<FetchStatus>('idle');
  const [error, setError] = useState<ApiErrorShape | null>(null);
  const requestIdRef = useRef(0);

  const load = useCallback(() => {
    const requestId = ++requestIdRef.current;
    setStatus('loading');
    setError(null);

    fetchFn()
      .then((result) => {
        if (requestIdRef.current !== requestId) return; // stale response, ignore
        console.log('this is answer',result)
        setData(result);
        setStatus('success');
      })
      .catch((err: ApiErrorShape) => {
        if (requestIdRef.current !== requestId) return;
        setError(err?.message ? err : { message: 'Unable to load data.', status: null });
        setStatus('error');
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => {
    load();
  }, [load]);

  return {
    data,
    status,
    error,
    isLoading: status === 'loading' || status === 'idle',
    isError: status === 'error',
    refetch: load,
  };
}
