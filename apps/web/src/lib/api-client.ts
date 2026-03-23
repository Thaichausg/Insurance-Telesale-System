/**
 * Production-Ready API Client with 401 Global Interception
 */

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

interface RequestOptions extends RequestInit {
  params?: Record<string, string>;
}

export const apiClient = async <T>(endpoint: string, options: RequestOptions = {}): Promise<T> => {
  const { params, headers, ...rest } = options;
  
  const url = new URL(`${BASE_URL}${endpoint}`);
  if (params) {
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
  }

  const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
  
  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...headers,
  };

  const response = await fetch(url.toString(), {
    ...rest,
    headers: defaultHeaders,
  });

  if (response.status === 401) {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
      document.cookie = 'auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      window.location.href = '/login';
    }
    throw new Error('Unauthorized');
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `API Error: ${response.status}`);
  }

  return response.json();
};

export const api = {
  get: <T>(endpoint: string, params?: Record<string, string>) => 
    apiClient<T>(endpoint, { method: 'GET', params }),
    
  post: <T>(endpoint: string, data: any) => 
    apiClient<T>(endpoint, { method: 'POST', body: JSON.stringify(data) }),
    
  put: <T>(endpoint: string, data: any) => 
    apiClient<T>(endpoint, { method: 'PUT', body: JSON.stringify(data) }),
    
  patch: <T>(endpoint: string, data: any) => 
    apiClient<T>(endpoint, { method: 'PATCH', body: JSON.stringify(data) }),
    
  delete: <T>(endpoint: string) => 
    apiClient<T>(endpoint, { method: 'DELETE' }),
};
