export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  userType?: string;
  createdAt: string;
  updatedAt: string;
  streak?: number;
  progress?: number;
  hoursStudied?: number;
  university?: string;
  yearOfStudy?: number;
}

export interface UpdateUserRequest {
  firstName?: string;
  lastName?: string;
  email?: string;
}
