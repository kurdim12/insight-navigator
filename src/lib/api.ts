/**
 * API Client for DevSEO Backend
 * Handles all HTTP requests to the backend API
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export interface ApiError {
  detail: string;
  status_code: number;
}

/**
 * Generic API fetch wrapper with error handling
 */
async function fetchApi<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error: ApiError = await response.json().catch(() => ({
        detail: response.statusText,
        status_code: response.status,
      }));
      throw new Error(error.detail || `HTTP ${response.status}: ${response.statusText}`);
    }

    // Handle 204 No Content
    if (response.status === 204) {
      return {} as T;
    }

    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('An unexpected error occurred');
  }
}

/**
 * API client with standard HTTP methods
 */
export const api = {
  get: <T>(endpoint: string) => fetchApi<T>(endpoint, { method: 'GET' }),

  post: <T>(endpoint: string, data?: unknown) =>
    fetchApi<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    }),

  put: <T>(endpoint: string, data?: unknown) =>
    fetchApi<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    }),

  delete: <T>(endpoint: string) =>
    fetchApi<T>(endpoint, { method: 'DELETE' }),
};

/**
 * Health check endpoint
 */
export async function checkHealth() {
  return api.get<{ status: string; timestamp: string; version: string }>('/health');
}

// Import types
import type {
  Website,
  Scan,
  ScanReport,
  ContentOptimizeResult,
} from './types';

/**
 * Website API endpoints
 */
export const websiteApi = {
  list: () => api.get<Website[]>('/api/v1/websites'),

  get: (id: string) => api.get<Website>(`/api/v1/websites/${id}`),

  create: (data: { url: string }) =>
    api.post<Website>('/api/v1/websites', data),

  update: (id: string, data: { url: string }) =>
    api.put<Website>(`/api/v1/websites/${id}`, data),

  delete: (id: string) =>
    api.delete<{ message: string }>(`/api/v1/websites/${id}`),

  verify: (id: string, method: 'dns' | 'meta_tag' | 'file') =>
    api.post<{ verified: boolean; message: string; instructions?: string }>(
      `/api/v1/websites/${id}/verify`,
      { method }
    ),
};

/**
 * Scan API endpoints
 */
export const scanApi = {
  list: (websiteId?: string) => {
    const query = websiteId ? `?website_id=${websiteId}` : '';
    return api.get<Scan[]>(`/api/v1/crawls${query}`);
  },

  get: (id: string) => api.get<ScanReport>(`/api/v1/crawls/${id}`),

  start: (websiteId: string, maxPages = 100) =>
    api.post<{ id: string; status: string; message: string }>(
      '/api/v1/crawls',
      { website_id: websiteId, max_pages: maxPages }
    ),

  getPages: (id: string) =>
    api.get<any[]>(`/api/v1/crawls/${id}/pages`),
};

/**
 * Content Optimizer API
 */
export const contentApi = {
  optimize: (data: { text?: string; url?: string; target_keyword?: string }) =>
    api.post<ContentOptimizeResult>('/api/v1/content/optimize', data),
};
