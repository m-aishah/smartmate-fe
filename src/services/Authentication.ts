
import { authService } from './api/auth.service';
import { LoginRequest, RegisterRequest } from './types/auth.types';

class Authentication {
  async register(data: RegisterRequest) {
    return authService.register(data);
  }

  async login(data: LoginRequest) {
    return authService.login(data);
  }

  logout() {
    return authService.logout();
  }

  isAuthenticated() {
    return authService.isAuthenticated();
  }

  getAccessToken() {
    return authService.getAccessToken();
  }

  getAccessTokenPayload() {
    return authService.getAccessTokenPayload();
  }
}

export default Authentication;
