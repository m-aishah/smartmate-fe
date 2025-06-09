
// Environment Configuration with Security Validation

const getEnvVar = (key: string, defaultValue?: string): string => {
  const value = import.meta.env[key] || defaultValue;
  if (!value && !defaultValue) {
    console.warn(`Environment variable ${key} is not defined`);
  }
  return value || '';
};

// Validate URL format
const validateApiUrl = (url: string): string => {
  if (!url) return '';
  
  try {
    new URL(url);
    return url.endsWith('/') ? url.slice(0, -1) : url;
  } catch {
    console.warn('Invalid API URL format provided');
    return '';
  }
};

export const ENV = {
  API_BASE_URL: validateApiUrl(
    getEnvVar('VITE_API_BASE_URL', 'https://57ef-93-182-72-72.ngrok-free.app')
  ),
  IS_DEVELOPMENT: import.meta.env.DEV,
  IS_PRODUCTION: import.meta.env.PROD,
} as const;

// Production environment validation
if (ENV.IS_PRODUCTION && !import.meta.env.VITE_API_BASE_URL) {
  console.error(
    'VITE_API_BASE_URL must be set in production environment. ' +
    'Please set it in your hosting platform environment variables.'
  );
}
