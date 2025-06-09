
import { apiClient } from '@/lib/api-client';
import { auth } from '@/constants/endpoints';
import { 
  LoginRequest, 
  RegisterRequest, 
  AuthResponse, 
  UserType, 
  PasswordRecoveryRequest, 
  UpdatePasswordRequest 
} from '../types/auth.types';
import parseJWTPayload from '@/utils/parse-jwt-payload';

class AuthService {
  private readonly TOKEN_KEY = 'creds';

  private isStrongPassword(password: string): boolean {
    // Minimum 8 characters, at least one letter, one number, and one special character
    const strongPasswordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return strongPasswordRegex.test(password);
  }

  private sanitizeEmail(email: string): string {
    return email.trim().toLowerCase();
  }

  private setSecureToken(token: string): void {
    try {
      // Validate token before storing
      const payload = parseJWTPayload(token);
      if (!payload || !payload.exp) {
        throw new Error('Invalid token format');
      }
      
      localStorage.setItem(this.TOKEN_KEY, token);
    } catch (error) {
      console.error('Failed to store authentication token');
      throw new Error('Authentication failed');
    }
  }

  private clearSecureToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    // Clear any other auth-related data
    localStorage.removeItem('user');
    sessionStorage.clear();
  }

  async register(data: RegisterRequest): Promise<AuthResponse> {
    // Input validation and sanitization
    const sanitizedData = {
      ...data,
      email: this.sanitizeEmail(data.email),
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),
    };

    // Password strength validation
    if (!this.isStrongPassword(data.password)) {
      throw new Error(
        'Password must be at least 8 characters long and contain at least one letter, one number, and one special character'
      );
    }

    const response = await apiClient.post<AuthResponse>(auth.register(), sanitizedData);
    
    if (response.data.accessToken) {
      this.setSecureToken(response.data.accessToken);
    }
    
    return response.data;
  }

  async login(data: LoginRequest): Promise<AuthResponse> {
    // Input sanitization
    const sanitizedData = {
      email: this.sanitizeEmail(data.email),
      password: data.password, // Don't trim passwords as they might have intentional spaces
    };

    const response = await apiClient.post<AuthResponse>(auth.login(), sanitizedData);
    
    if (response.data.accessToken) {
      this.setSecureToken(response.data.accessToken);
    }
    
    return response.data;
  }

  logout(): void {
    this.clearSecureToken();
  }

  isAuthenticated(): boolean {
    const accessToken = this.getAccessToken();
    if (!accessToken) return false;
    
    try {
      const parsedToken = parseJWTPayload(accessToken);
      if (!parsedToken || !parsedToken.exp) return false;
      
      const now = Math.floor(Date.now() / 1000);
      const isValid = parsedToken.exp >= now;
      
      // Clean up expired token
      if (!isValid) {
        this.clearSecureToken();
      }
      
      return isValid;
    } catch {
      this.clearSecureToken();
      return false;
    }
  }

  getAccessToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getAccessTokenPayload(): any {
    const accessToken = this.getAccessToken();
    if (accessToken && this.isAuthenticated()) {
      return parseJWTPayload(accessToken);
    }
    return null;
  }

  async getUserTypes(): Promise<UserType[]> {
    const response = await apiClient.get<UserType[]>(auth.userTypes());
    return response.data;
  }

  async requestPasswordRecovery(data: PasswordRecoveryRequest): Promise<void> {
    const sanitizedData = {
      email: this.sanitizeEmail(data.email),
    };
    await apiClient.post(auth.recoveryRequest(), sanitizedData);
  }

  async updatePassword(shortcode: string, data: UpdatePasswordRequest): Promise<void> {
    // Password strength validation
    if (!this.isStrongPassword(data.password)) {
      throw new Error(
        'Password must be at least 8 characters long and contain at least one letter, one number, and one special character'
      );
    }

    await apiClient.put(auth.updatePassword(shortcode), data);
  }
}

export const authService = new AuthService();
