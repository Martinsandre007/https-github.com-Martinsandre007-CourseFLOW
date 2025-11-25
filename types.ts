export enum ViewState {
  ONBOARDING = 'ONBOARDING',
  AUTH = 'AUTH',
  DASHBOARD = 'DASHBOARD',
  EXPLORE = 'EXPLORE',
  PROFILE = 'PROFILE',
  COURSE_DETAILS = 'COURSE_DETAILS'
}

export interface Course {
  id: string;
  title: string;
  instructor: string;
  progress: number; // 0-100
  totalLessons: number;
  completedLessons: number;
  thumbnail: string;
  category: string;
  rating?: number;
  reviewCount?: number;
  isFeatured?: boolean;
  duration?: string;
  level?: string;
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  isCompleted: boolean;
  isLocked: boolean;
}

export interface User {
  name: string;
  avatar: string;
  email: string;
  totalProgress: number;
  coursesCompleted: number;
  studyHours: number;
  achievements: number;
}