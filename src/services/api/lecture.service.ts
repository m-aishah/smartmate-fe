import { apiClient } from '@/lib/api-client';
import { lectures } from '@/constants/endpoints';
import { 
  Lecture, 
  CreateLectureRequest, 
  UpdateLectureRequest, 
  LectureUploadResponse,
  LectureProgressResponse,
  LecturesResponse,
  LectureResponse
} from '../types/lecture.types';

class LectureService {
  async getAllLectures(): Promise<Lecture[]> {
    try {
      console.log('Fetching lectures from:', lectures.getAll());
      const response = await apiClient.get<LecturesResponse>(lectures.getAll(), {
        // Add specific retry logic for ngrok issues
        retries: 5,
        retryDelay: 2000,
      });
      console.log('Lectures response:', response);
      console.log('Response status:', response.status);
      console.log('Response data:', response.data);
      
      // Handle different response formats
      if (response.status === 204) {
        console.log('No content returned, user has no lectures');
        return [];
      }
      
      // Handle both array and object responses
      if (Array.isArray(response.data)) {
        console.log('Response is array:', response.data);
        return response.data;
      }
      
      if (response.data && response.data.lectures) {
        console.log('Response has lectures property:', response.data.lectures);
        return response.data.lectures;
      }
      
      console.log('Unexpected response format, returning empty array');
      return [];
    } catch (error) {
      console.error('Error fetching lectures:', error);
      console.error('Error details:', error.response?.status, error.response?.data);
      
      // Check if we got HTML instead of JSON (ngrok warning page)
      if (error.response?.data && typeof error.response.data === 'string' && 
          error.response.data.includes('<!DOCTYPE html>')) {
        console.error('Received HTML response - likely ngrok warning page');
        throw new Error('Network configuration issue - please check your API endpoint');
      }
      
      throw error;
    }
  }

  async getLectureById(id: string): Promise<Lecture> {
    try {
      console.log('Fetching lecture by ID:', id);
      const response = await apiClient.get<LectureResponse>(lectures.getById(id));
      console.log('Single lecture response:', response.data);
      return response.data.lecture;
    } catch (error) {
      console.error('Error fetching lecture:', error);
      throw error;
    }
  }

  async createLecture(data: CreateLectureRequest): Promise<LectureUploadResponse> {
    try {
      console.log('Creating lecture with data:', data);
      const formData = new FormData();
      formData.append('courseCode', data.courseCode);
      formData.append('semester', data.semester);
      formData.append('yearOfStudy', data.yearOfStudy);
      formData.append('lectureType', data.lectureType);
      
      if (data.lectureType === 'audio' && data.lecture instanceof File) {
        console.log('Uploading audio file:', data.lecture.name, 'Size:', data.lecture.size);
        formData.append('lecture', data.lecture);
      } else if (data.lectureType === 'text' && typeof data.lecture === 'string') {
        console.log('Uploading text content, length:', data.lecture.length);
        formData.append('lecture', data.lecture);
      }

      // The timeout is now handled automatically in apiClient based on file type
      console.log('Making upload request...');
      const response = await apiClient.post<LectureUploadResponse>(lectures.create(), formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            console.log('Upload progress:', percentCompleted + '%');
          }
        },
      });
      
      console.log('Create lecture response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error creating lecture:', error);
      if (error.code === 'ECONNABORTED') {
        console.error('Upload timed out - file may be too large or network is slow');
        throw new Error('Upload timed out. The file may be too large or your connection is slow. Please try again or use a smaller file.');
      }
      throw error;
    }
  }

  async updateLecture(id: string, data: UpdateLectureRequest): Promise<Lecture> {
    try {
      const response = await apiClient.put<{ success: boolean; message: string; lecture: Lecture }>(
        lectures.update(id), 
        data
      );
      return response.data.lecture;
    } catch (error) {
      console.error('Error updating lecture:', error);
      throw error;
    }
  }

  async deleteLecture(id: string): Promise<void> {
    try {
      await apiClient.delete(lectures.delete(id));
    } catch (error) {
      console.error('Error deleting lecture:', error);
      throw error;
    }
  }

  async checkLectureProgress(taskId: string): Promise<LectureProgressResponse> {
    try {
      const response = await apiClient.get<LectureProgressResponse>(`/lectures/progress/${taskId}`);
      return response.data;
    } catch (error) {
      console.error('Error checking lecture progress:', error);
      throw error;
    }
  }
}

export const lectureService = new LectureService();
