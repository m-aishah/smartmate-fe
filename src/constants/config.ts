
export const APP_CONFIG = {
  // Feature flags
  features: {
    enableAnalytics: true,
    enableQuizzes: true,
    enableMoodleIntegration: true,
    enableTeamsIntegration: true,
  },
  
  // Limits and defaults
  limits: {
    maxTasksPerUser: 50,
    maxLecturesPerUpload: 10,
    maxFileSizeMB: 100,
    maxQuizQuestions: 20,
  },
  
  // UI settings
  ui: {
    defaultLanguage: 'en',
    defaultTheme: 'system',
    animationDuration: 300,
    toastDuration: 3000,
  },
  
  // App metadata
  app: {
    name: 'SmartMate',
    version: '1.0.0',
    description: 'AI-powered learning companion',
  },
} as const;

export type AppConfig = typeof APP_CONFIG;
