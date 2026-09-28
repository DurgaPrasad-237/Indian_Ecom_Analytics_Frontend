import axios from 'axios';

/**
 * Centralized Axios instance for all FastAPI requests.
 *
 * The backend base URL is injected via the VITE_API_BASE_URL environment
 * variable (see .env.example) — never hardcode localhost or any backend
 * host elsewhere in the app. No API keys or secrets belong in this file
 * or anywhere in the frontend; those must stay server-side in FastAPI.
 */
const BASE_URL = import.meta.env.VITE_API_BASE_URL;


if (!BASE_URL && import.meta.env.DEV) {
  // eslint-disable-next-line no-console
  console.warn(
    '[api] VITE_API_BASE_URL is not set. Create a .env file from .env.example and point it at your FastAPI backend.'
  );
}

export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: Number(import.meta.env.VITE_API_TIMEOUT_MS) || 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Normalizes any Axios/network error into a small, predictable shape that
 * UI components can render directly in an ErrorState without needing to
 * know anything about Axios internals.
 */
export function toApiError(error) {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      return {
        message:
          error.response.data?.message ||
          error.response.data?.detail ||
          `Request failed with status ${error.response.status}.`,
        status: error.response.status,
      };
    }
    if (error.request) {
      return {
        message: 'Unable to reach the analytics server. Check that the API is running and reachable.',
        status: null,
      };
    }
  }
  return {
    message: error?.message || 'An unexpected error occurred.',
    status: null,
  };
}

apiClient.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(toApiError(error))
);

export default apiClient;
