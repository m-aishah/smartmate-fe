
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  userType?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateUserRequest {
  firstName?: string;
  lastName?: string;
  email?: string;
}
