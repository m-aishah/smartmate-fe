const auth = {
  register: () => `/register`,
  login: () => `/login`,
  userTypes: () => `/user-types`,
  recoveryRequest: () => `/recovery-request`,
  updatePassword: (shortcode: string) => `/update-password/${shortcode}`,
};

const users = {
  getUserData: () => `/user`,
  profile: () => `/edit/user`,
};

const lectures = {
  getAll: () => `/lectures`,
  getById: (id: string) => `/lectures/${id}`,
  create: () => `/lectures`,
  update: (id: string) => `/lectures/${id}`,
  delete: (id: string) => `/lectures/${id}`,
};

const summaries = {
  getAll: () => `/summaries`,
  getById: (id: string) => `/summaries/${id}`,
  update: (id: string) => `/summaries/${id}`,
  delete: (id: string) => `/summaries/${id}`,
};

const chats = {
  getAll: () => `/chats`,
  getById: (id: string) => `/chat/${id}`,
  create: () => `/chat`,
  getSystemPrompt: (id: string) => `/system-prompt/${id}`,
};

const quotes = {
  getAll: () => `/quotes`,
};

const system = {
  healthcheck: () => `/healthcheck`,
};

// Future endpoints (commented out in your backend)
const quizzes = {
  getAll: () => `/quizzes`,
  getById: (id: string) => `/quizzes/${id}`,
  create: () => `/quizzes`,
  update: (id: string) => `/quizzes/${id}`,
  delete: (id: string) => `/quizzes/${id}`,
};

const flashcards = {
  getAll: () => `/flashcards`,
  getById: (id: string) => `/flashcards/${id}`,
  create: () => `/flashcards`,
  update: (id: string) => `/flashcards/${id}`,
  delete: (id: string) => `/flashcards/${id}`,
};

const analytics = {
  overview: () => `/analytics/overview`,
  performance: () => `/analytics/performance`,
  timeSpent: () => `/analytics/time-spent`,
  engagement: () => `/analytics/engagement`,
};

const tasks = {
  getAll: () => `/tasks`,
  postTasks: () => `/tasks`,
  putTasks: (id: string) => `/tasks/${id}`,
  deleteTasks: (id: string) => `/tasks/${id}`,
};

const deadlines = {
  getAll: () => `/deadlines`,
  postDeadlines: () => `/deadlines`,
  putDeadlines: (id: string) => `/deadlines/${id}`,
  deleteDeadlines: (id: string) => `/deadlines/${id}`,
};

export {
  auth,
  users,
  lectures,
  summaries,
  chats,
  quotes,
  system,
  quizzes,
  flashcards,
  analytics,
  tasks,
  deadlines,
};
