
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  };
}

export interface UserType {
  id: string;
  name: string;
  description: string;
}

export interface PasswordRecoveryRequest {
  email: string;
}

export interface UpdatePasswordRequest {
  password: string;
  confirmPassword: string;
}
