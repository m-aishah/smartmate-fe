
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ENV } from './env';
import { withRetry } from './retry';

const API_BASE_URL = ENV.API_BASE_URL;

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
        // Add ngrok header to bypass warning page
        'ngrok-skip-browser-warning': 'true',
      },
      timeout: 60000,
    });

    this.setupInterceptors();
  }

  private isTokenValid(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const now = Math.floor(Date.now() / 1000);
      return payload.exp && payload.exp > now;
    } catch {
      return false;
    }
  }

  private getValidToken(): string | null {
    const token = localStorage.getItem('creds');
    if (token && this.isTokenValid(token)) {
      return token;
    }
    // Clean up invalid token
    if (token) {
      localStorage.removeItem('creds');
    }
    return null;
  }

  private setupInterceptors() {
    // Request interceptor to add auth token
    this.client.interceptors.request.use(
      (config) => {
        const token = this.getValidToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        // Ensure ngrok header is always present
        config.headers['ngrok-skip-browser-warning'] = 'true';
        
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => {
        // Handle 204 No Content responses
        if (response.status === 204) {
          return {
            ...response,
            data: response.data || {}
          };
        }
        
        return response;
      },
      (error) => {
        // Handle authentication errors
        if (error.response?.status === 401) {
          localStorage.removeItem('creds');
          // Only redirect if not already on auth pages
          if (!window.location.pathname.includes('/login') && 
              !window.location.pathname.includes('/signup')) {
            window.location.href = '/login';
          }
        }
        
        // Enhanced timeout error handling
        if (error.code === 'ECONNABORTED') {
          console.error('Request timed out - this might be due to large file uploads or slow network');
        }
        
        return Promise.reject(error);
      }
    );
  }

  private async requestWithRetry<T>(
    requestFn: () => Promise<AxiosResponse<T>>,
    config?: { retries?: number; retryDelay?: number }
  ): Promise<AxiosResponse<T>> {
    const { retries = 3, retryDelay = 1000 } = config || {};
    
    return withRetry(requestFn, {
      maxAttempts: retries,
      delay: retryDelay,
      onRetry: (attempt, error) => {
        console.warn(`API request failed (attempt ${attempt}):`, error.message);
      },
    });
  }

  public async get<T>(
    url: string, 
    config?: AxiosRequestConfig & { retries?: number; retryDelay?: number }
  ): Promise<AxiosResponse<T>> {
    const { retries, retryDelay, ...axiosConfig } = config || {};
    return this.requestWithRetry(
      () => this.client.get(url, axiosConfig),
      { retries, retryDelay }
    );
  }

  public async post<T>(
    url: string, 
    data?: any, 
    config?: AxiosRequestConfig & { retries?: number; retryDelay?: number }
  ): Promise<AxiosResponse<T>> {
    const { retries, retryDelay, ...axiosConfig } = config || {};
    
    // Auto-detect file uploads and increase timeout significantly
    if (data instanceof FormData) {
      // Check if it's an audio file by looking at form data entries
      let hasAudioFile = false;
      for (const [key, value] of data.entries()) {
        if (value instanceof File && value.type.startsWith('audio/')) {
          hasAudioFile = true;
          break;
        }
      }
      
      // Set timeout based on file type - 10 minutes for audio, 2 minutes for other files
      axiosConfig.timeout = hasAudioFile ? 600000 : 120000;
    }
    
    return this.requestWithRetry(
      () => this.client.post(url, data, axiosConfig),
      { retries, retryDelay }
    );
  }

  public async put<T>(
    url: string, 
    data?: any, 
    config?: AxiosRequestConfig & { retries?: number; retryDelay?: number }
  ): Promise<AxiosResponse<T>> {
    const { retries, retryDelay, ...axiosConfig } = config || {};
    return this.requestWithRetry(
      () => this.client.put(url, data, axiosConfig),
      { retries, retryDelay }
    );
  }

  public async delete<T>(
    url: string, 
    config?: AxiosRequestConfig & { retries?: number; retryDelay?: number }
  ): Promise<AxiosResponse<T>> {
    const { retries, retryDelay, ...axiosConfig } = config || {};
    return this.requestWithRetry(
      () => this.client.delete(url, axiosConfig),
      { retries, retryDelay }
    );
  }
}

export const apiClient = new ApiClient();
