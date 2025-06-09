
import { apiClient } from '@/lib/api-client';
import { users } from '@/constants/endpoints';
import { User, UpdateUserRequest } from '../types/user.types';

class UserService {
  async getProfile(): Promise<User> {
    const response = await apiClient.get<User>(users.profile());
    return response.data;
  }

  async updateProfile(data: UpdateUserRequest): Promise<User> {
    const response = await apiClient.put<User>(users.profile(), data);
    return response.data;
  }
}

export const userService = new UserService();
