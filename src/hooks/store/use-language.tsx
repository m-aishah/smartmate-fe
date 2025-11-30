import { createContext, useContext, useState } from "react";

// Define the available languages
export type Language = "en" | "tr" | "ar";

// Define the shape of the translations
export interface Translations {
  // Navigation and common elements
  greeting: string;
  title: string;
  description: string;
  getStarted: string;
  overview: string;
  settings: string;
  profile: string;
  logout: string;
  lectures: string;
  chats: string;
  analytics: string;
  dashboard: string;
  theme: string;
  language: string;
  dark: string;
  light: string;
  system: string;
  english: string;
  turkish: string;
  arabic: string;
  welcome: string;
  welcomeBack: string;
  hereWhatHappening: string;
  name: string;
  userName: string;
  userEmail: string;
  userRole: string;
  userSince: string;
  userLastLogin: string;
  tasks: string;
  deadlines: string;
  upcoming: string;
  performance: string;
  recordings: string;
  whatDoYouWantToLearn: string;
  typeAMessage: string;
  startConversation: string;
  noChats: string;
  startNewChat: string;
  startFirstChat: string;
  newChat: string;

  // Dashboard
  welcomeMessage: string;
  upcomingDeadlines: string;
  recentLectures: string;
  quoteOfTheDay: string;
  todayTasks: string;
  quote: string;
  yourProgress: string;

  // Lectures
  uploadLecture: string;
  recordLecture: string;
  connectTeams: string;
  searchLectures: string;
  filterBy: string;
  sortBy: string;
  allSubjects: string;
  search: string;
  noLecturesFound: string;
  noMatchingLectures: string;
  noLecturesYet: string;
  uploadFirstLecture: string;
  chat: string;
  summary: string;
  addLecture: string;
  uploadAudio: string;
  uploadAudioDescription: string;
  recordLectureDescription: string;
  connectTeamsDescription: string;

  // Chats
  yourChats: string;
  askQuestion: string;
  noChatsYet: string;
  startNewChatMessage: string;
  askSmartMate: string;
  newChatDescription: string;
  askAboutLectures: string;
  summarizeLecture: string;
  keyConcepts: string;

  // Teams integration
  missingInformation: string;
  pleaseProvideUrlAndTitle: string;
  invalidTeamsLink: string;
  pleaseProvideValidTeamsLink: string;
  pleaseEnterValidTeamsLink: string;
  connectedToTeams: string;
  teamsLectureIsBeingRecorded: string;
  connectingToTeams: string;
  pleaseWait: string;
  connectTeamsLecture: string;
  connectTeamsMeeting: string;
  teamsLinkDescription: string;
  microsoftTeamsLink: string;
  connectionSuccessful: string;
  teamsLectureConnected: string;
  connecting: string;
  connect: string;

  // Recording
  recordingStarted: string;
  nowRecordingYourLecture: string;
  microphoneError: string;
  unableToAccessMicrophone: string;
  recordingComplete: string;
  recordingStopped: string;
  pleaseRecordAndProvideTitle: string;
  lectureRecorded: string;
  lectureSuccessfullySaved: string;
  recording: string;
  startRecording: string;
  stopRecording: string;

  // Upload
  invalidFileType: string;
  pleaseSelectAudio: string;
  pleaseProvideFileAndTitle: string;
  uploadSuccessful: string;
  lectureUploaded: string;
  dragAndDropAudio: string;
  or: string;
  browseFiles: string;
  uploading: string;
  upload: string;

  // Common form elements
  lectureTitle: string;
  enterLectureTitle: string;
  lectureDescription: string;
  enterLectureDescription: string;
  cancel: string;
  save: string;
  saving: string;

  // Help
  help: string;
  helpTopics: string;
  contactSupport: string;

  // Profile
  accountSettings: string;
  personalInfo: string;

  // Analytics
  analyticsDescription: string;
  totalLectures: string;
  avgScore: string;
  totalTime: string;
  activeDays: string;
  weeklyEngagement: string;
  weeklyEngagementDescription: string;
  timeSpent: string;
  timeSpentDescription: string;
  lectureBreakdown: string;
  lectureBreakdownDescription: string;
  performanceBySubject: string;
  fromLastWeek: string;

  // Additional translations
  files: string;
  calendar: string;
  attachments: string;
  browse: string;
  dragFilesToAttach: string;

  // Auth translations
  createAccount: string;
  enterCredentials: string;
  enterDetails: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  forgotPassword: string;
  loggingIn: string;
  creatingAccount: string;
  logIn: string;
  signUp: string;
  dontHaveAccount: string;
  alreadyHaveAccount: string;
  accountCreatedSuccessfully: string;
  welcomeToSmartMate: string;
  loginSuccessful: string;
  validationError: string;
  pleaseFillAllFields: string;
  error: string;

  // Help page translations
  smartMateHelpCenter: string;
  helpCenterDescription: string;
  aboutSmartMate: string;
  aboutSmartMateDescription: string;
  builtWithPassion: string;
  graduationProject: string;
  createdBy: string;
  computerScienceGraduate: string;
  projectType: string;
  finalYearProject: string;
  missionStatement: string;
  missionStatementText: string;
  aiPoweredLearning: string;
  studentCenteredDesign: string;
  academicExcellence: string;
  frequentlyAskedQuestions: string;
  faqDescription: string;
  contactSupportDescription: string;
  emailSupport: string;
  orUseChat: string;
  iNeedHelp: string;
  toConnectSupport: string;
  supportHours: string;
  supportHoursTime: string;
  smartMateFeatures: string;
  featuresDescription: string;
  learningTools: string;
  aiPoweredChatAssistant: string;
  lectureUploadManagement: string;
  interactiveFlashcardGeneration: string;
  automatedQuizCreation: string;
  smartMaterialOrganization: string;
  studyFeatures: string;
  contextualAttachmentSelection: string;
  markdownCodeSupport: string;
  downloadableResponses: string;
  crossPlatformAccessibility: string;
  realTimeCollaboration: string;

  // FAQ questions and answers
  howToUploadLecture: string;
  howToUploadLectureAnswer: string;
  howChatAssistantWorks: string;
  howChatAssistantWorksAnswer: string;
  canSearchTopics: string;
  canSearchTopicsAnswer: string;
  howToFavoriteLecture: string;
  howToFavoriteLectureAnswer: string;
  canShareLectures: string;
  canShareLecturesAnswer: string;
  howToCreateFlashcardsQuizzes: string;
  howToCreateFlashcardsQuizzesAnswer: string;
  canSelectMaterials: string;
  canSelectMaterialsAnswer: string;

  // Task management translations
  addNewTask: string;
  taskAdded: string;
  hasBeenAddedToTasks: string;
  taskCompleted: string;
  hasBeenCompleted: string;
  taskReopened: string;
  hasBeenReopened: string;
  taskDeleted: string;
  hasBeenRemoved: string;
  taskUpdated: string;
  taskHasBeenUpdated: string;
  tasksDownloaded: string;
  tasksDownloadedDescription: string;
  due: string;
  taskUpdateFailed: string;
  taskAddFailed: string;
  taskDeleteFailed: string;
  noTasksYet: string;

  // Deadline translations
  deadlineAdded: string;
  hasBeenAdded: string;
  deadlineAddFailed: string;
  deadlineUpdated: string;
  hasBeenUpdated: string;
  deadlineUpdateFailed: string;
  deadlineDeleted: string;
  deadlineDeleteFailed: string;
  confirmDelete: string;
  addDeadline: string;
  deadlineTitle: string;
  course: string;
  courseName: string;
  dueDate: string;
  add: string;
  noDeadlinesYet: string;
  editDeadline: string;
  daysLeft: string;

  // Quiz translations
  quizzes: string;
  createNewQuiz: string;
  studyFlashcards: string;
  practiceMode: string;
  takeQuiz: string;
  noQuizzesYet: string;
  createFirstQuiz: string;
  flashcards: string;
  createdFlashcards: string;
  studyFlashcardsDescription: string;
  practiceFlashcards: string;
  yourQuizzes: string;
  startLearning: string;
  study: string;
  practice: string;
  takeAQuiz: string;
  startQuiz: string;
  quizName: string;
  difficulty: string;
  questions: string;

  // Missing Quizzes page translations
  studyTools: string;
  studyToolsDescription: string;
  createNew: string;
  loadingStudyMaterials: string;
  failedToLoadStudyMaterials: string;
  flashcardsDescription: string;
  noFlashcardsYet: string;
  quizzesDescription: string;

  // Navigation section headers
  coreFunctions: string;

  // Missing translations that were causing errors
  somethingWentWrong: string;
  loading: string;
  back: string;
  noDescription: string;
}

// English translations
const en: Translations = {
  // Navigation and common elements
  greeting: "Hello",
  title: "SmartMate AI",
  description: "Your personal academic assistant",
  getStarted: "Get Started",
  overview: "Overview",
  settings: "Settings",
  profile: "Profile",
  logout: "Logout",
  lectures: "Lectures",
  chats: "Chats",
  analytics: "Analytics",
  dashboard: "Dashboard",
  theme: "Theme",
  language: "Language",
  dark: "Dark",
  light: "Light",
  system: "System",
  english: "English",
  turkish: "Turkish",
  arabic: "Arabic",
  welcome: "Welcome to SmartMate",
  welcomeBack: "Welcome back",
  hereWhatHappening: "Here's what's happening",
  name: "Name",
  userName: "User Name",
  userEmail: "Email",
  userRole: "Student",
  userSince: "User since",
  userLastLogin: "Last login",
  tasks: "Tasks",
  deadlines: "Deadlines",
  upcoming: "Upcoming",
  performance: "Performance",
  recordings: "Recordings",
  whatDoYouWantToLearn: "What do you want to learn today?",
  typeAMessage: "Type a message...",
  startConversation: "Start a conversation with SmartMate",
  noChats: "No chats yet",
  startNewChat: "Start a new chat to begin learning",
  startFirstChat: "Start your first chat",
  newChat: "New Chat",

  // Dashboard
  welcomeMessage: "Track your progress and continue learning",
  upcomingDeadlines: "Upcoming Deadlines",
  recentLectures: "Recent Lectures",
  quoteOfTheDay: "Quote of the Day",
  todayTasks: "Today's Tasks",
  quote: "Quote of the Day",
  yourProgress: "Your Progress",

  // Lectures
  uploadLecture: "Upload Lecture",
  recordLecture: "Record Lecture",
  connectTeams: "Connect to Teams",
  searchLectures: "Search lectures...",
  filterBy: "Filter by",
  sortBy: "Sort by",
  allSubjects: "All Subjects",
  search: "Search",
  noLecturesFound: "No Lectures Found",
  noMatchingLectures:
    "No matching lectures were found. Try another search term.",
  noLecturesYet:
    "You haven't uploaded any lectures yet. Start by uploading your first lecture.",
  uploadFirstLecture: "Upload First Lecture",
  chat: "Chat",
  summary: "Summary",
  addLecture: "Add Lecture",
  uploadAudio: "Upload Audio or Transcript",
  uploadAudioDescription:
    "Upload an audio recording or transcript of your lecture",
  recordLectureDescription: "Record a lecture directly using your microphone",
  connectTeamsDescription: "Connect to a Microsoft Teams meeting",

  yourChats: "Your Chats",
  askQuestion: "Ask a question...",
  noChatsYet: "No Chats Yet",
  startNewChatMessage:
    "Start a new chat by asking a question about your lectures",
  askSmartMate: "Ask SmartMate",
  newChatDescription:
    "Your AI study assistant that helps you learn from your lectures",
  askAboutLectures: "Ask about your lectures...",
  summarizeLecture: "Summarize Lecture",
  keyConcepts: "Key Concepts",

  missingInformation: "Missing Information",
  pleaseProvideUrlAndTitle: "Please provide both a Teams URL and lecture title",
  invalidTeamsLink: "Invalid Teams Link",
  pleaseProvideValidTeamsLink: "Please provide a valid Microsoft Teams link",
  pleaseEnterValidTeamsLink: "Please enter a valid Microsoft Teams link",
  connectedToTeams: "Connected to Teams",
  teamsLectureIsBeingRecorded: "Your Teams lecture is being recorded",
  connectingToTeams: "Connecting to Teams...",
  pleaseWait: "Please wait while we establish the connection",
  connectTeamsLecture: "Connect Teams Lecture",
  connectTeamsMeeting: "Connect Teams Meeting",
  teamsLinkDescription:
    "Paste a Microsoft Teams meeting link to connect and record the lecture",
  microsoftTeamsLink: "Microsoft Teams Link",
  connectionSuccessful: "Connection Successful",
  teamsLectureConnected: "Teams lecture connected successfully",
  connecting: "Connecting...",
  connect: "Connect",

  recordingStarted: "Recording Started",
  nowRecordingYourLecture: "Now recording your lecture",
  microphoneError: "Microphone Error",
  unableToAccessMicrophone:
    "Unable to access microphone. Please check permissions.",
  recordingComplete: "Recording Complete",
  recordingStopped: "Recording has been stopped",
  pleaseRecordAndProvideTitle: "Please record audio and provide a title",
  lectureRecorded: "Lecture Recorded",
  lectureSuccessfullySaved: "Your lecture has been successfully saved",
  recording: "Recording",
  startRecording: "Start Recording",
  stopRecording: "Stop Recording",

  invalidFileType: "Invalid File Type",
  pleaseSelectAudio: "Please select an audio file",
  pleaseProvideFileAndTitle: "Please provide both a file and title",
  uploadSuccessful: "Upload Successful",
  lectureUploaded: "Your lecture has been uploaded",
  dragAndDropAudio: "Drag and drop audio files",
  or: "or",
  browseFiles: "Browse Files",
  uploading: "Uploading...",
  upload: "Upload",

  lectureTitle: "Lecture Title",
  enterLectureTitle: "Enter a title for this lecture",
  lectureDescription: "Lecture Description",
  enterLectureDescription: "Enter a description (optional)",
  cancel: "Cancel",
  save: "Save",
  saving: "Saving...",

  help: "Help",
  helpTopics: "Help Topics",
  contactSupport: "Contact Support",

  accountSettings: "Account Settings",
  personalInfo: "Personal Information",

  analyticsDescription: "Track your learning metrics and academic performance",
  totalLectures: "Total Lectures",
  avgScore: "Average Score",
  totalTime: "Study Time",
  activeDays: "Active Days",
  weeklyEngagement: "Weekly Engagement",
  weeklyEngagementDescription: "Your learning activities over the past 7 days",
  timeSpent: "Time Spent by Subject",
  timeSpentDescription: "Distribution of hours across different subjects",
  lectureBreakdown: "Lecture Categories",
  lectureBreakdownDescription: "Breakdown of lectures by field of study",
  performanceBySubject: "Performance by Subject",
  fromLastWeek: "from last week",

  files: "Files",
  calendar: "Calendar",
  attachments: "Attachments",
  browse: "Browse Files",
  dragFilesToAttach: "Drag and drop files to attach",

  createAccount: "Create an account",
  enterCredentials: "Enter your credentials to access your account",
  enterDetails: "Enter your details to create your SmartMate account",
  firstName: "First Name",
  lastName: "Last Name",
  email: "Email",
  password: "Password",
  forgotPassword: "Forgot password?",
  loggingIn: "Logging in...",
  creatingAccount: "Creating account...",
  logIn: "Log in",
  signUp: "Sign up",
  dontHaveAccount: "Don't have an account?",
  alreadyHaveAccount: "Already have an account?",
  accountCreatedSuccessfully: "Account created successfully",
  welcomeToSmartMate: "Welcome to SmartMate!",
  loginSuccessful: "Login successful",
  validationError: "Validation Error",
  pleaseFillAllFields: "Please fill in all fields",
  error: "Error",

  smartMateHelpCenter: "SmartMate Help Center",
  helpCenterDescription:
    "Everything you need to know about your AI academic companion",
  aboutSmartMate: "About SmartMate",
  aboutSmartMateDescription:
    "Your intelligent academic companion for university success",
  builtWithPassion: "Built with Passion",
  graduationProject: "A graduation project dedicated to student success",
  createdBy: "Created by",
  computerScienceGraduate: "Computer Science Graduate",
  projectType: "Project Type",
  finalYearProject: "Final Year Graduation Project",
  missionStatement: "Mission Statement",
  missionStatementText:
    "SmartMate was developed to bridge the gap between traditional learning methods and modern AI technology. Our goal is to empower university students with intelligent tools that enhance comprehension, streamline study processes, and foster academic excellence through personalized learning experiences.",
  aiPoweredLearning: "AI-Powered Learning",
  studentCenteredDesign: "Student-Centered Design",
  academicExcellence: "Academic Excellence",
  frequentlyAskedQuestions: "Frequently Asked Questions",
  faqDescription:
    "Find answers to common questions and learn how to get the most out of SmartMate.",
  contactSupportDescription:
    "Can't find what you're looking for? Our support team is here to help.",
  emailSupport: "Email us at",
  orUseChat: "or use the chat assistant and type",
  iNeedHelp: "I need help",
  toConnectSupport: "to connect with our support team.",
  supportHours: "Support hours",
  supportHoursTime: "Monday - Friday, 9:00 AM - 5:00 PM",
  smartMateFeatures: "SmartMate Features",
  featuresDescription: "Discover all the powerful tools at your disposal",
  learningTools: "Learning Tools",
  aiPoweredChatAssistant: "AI-powered chat assistant",
  lectureUploadManagement: "Lecture upload and management",
  interactiveFlashcardGeneration: "Interactive flashcard generation",
  automatedQuizCreation: "Automated quiz creation",
  smartMaterialOrganization: "Smart material organization",
  studyFeatures: "Study Features",
  contextualAttachmentSelection: "Contextual attachment selection",
  markdownCodeSupport: "Markdown and code support",
  downloadableResponses: "Downloadable responses",
  crossPlatformAccessibility: "Cross-platform accessibility",
  realTimeCollaboration: "Real-time collaboration tools",

  howToUploadLecture: "How can I upload a lecture?",
  howToUploadLectureAnswer:
    "You can upload a lecture by going to the Lectures page and clicking the 'Upload Lecture' button. You can either paste a Microsoft Teams link or record directly through SmartMate.",
  howChatAssistantWorks: "How does the chat assistant work?",
  howChatAssistantWorksAnswer:
    "SmartMate's chat assistant uses AI to analyze your lecture content and answer questions related to your course materials. Simply ask a question, and SmartMate will search through your lectures to provide accurate responses.",
  canSearchTopics: "Can I search for specific topics within lectures?",
  canSearchTopicsAnswer:
    "Yes! Use the search bar on the Lectures page to find specific topics across all your recorded lectures. You can also use filters to narrow down results by course, date, or duration.",
  howToFavoriteLecture: "How do I mark a lecture as favorite?",
  howToFavoriteLectureAnswer:
    "To mark a lecture as favorite, click the star icon on any lecture card. Favorite lectures can be quickly accessed for future reference.",
  canShareLectures: "Can I share lectures with classmates?",
  canShareLecturesAnswer:
    "Currently, lecture sharing is not supported. This feature is planned for a future update.",
  howToCreateFlashcardsQuizzes: "How do I create flashcards and quizzes?",
  howToCreateFlashcardsQuizzesAnswer:
    "Navigate to the Quizzes page and click 'Create New'. You can generate both flashcards and quizzes from your lecture content with custom instructions.",
  canSelectMaterials: "Can I select specific materials for chat context?",
  canSelectMaterialsAnswer:
    "Yes! In the chat interface, click the attachments button to select courses, materials, assignments, and formulas that will provide context for your AI conversations.",

  addNewTask: "Add new task...",
  taskAdded: "Task added",
  hasBeenAddedToTasks: "has been added to your tasks",
  taskCompleted: "Task completed!",
  hasBeenCompleted: "has been marked as complete",
  taskReopened: "Task reopened",
  hasBeenReopened: "has been reopened",
  taskDeleted: "Task deleted",
  hasBeenRemoved: "has been removed",
  taskUpdated: "Task updated",
  taskHasBeenUpdated: "Task has been successfully updated",
  tasksDownloaded: "Tasks downloaded",
  tasksDownloadedDescription: "Your tasks have been downloaded successfully",
  due: "Due",
  taskUpdateFailed: "Task update failed. Please try again.",
  taskAddFailed: "Failed to add task. Please try again.",
  taskDeleteFailed: "Failed to delete task. Please try again.",
  noTasksYet: "No tasks yet. Add your first task to get started.",

  deadlineAdded: "Deadline added",
  hasBeenAdded: "has been added",
  deadlineAddFailed: "Failed to add deadline. Please try again.",
  deadlineUpdated: "Deadline updated",
  hasBeenUpdated: "has been updated",
  deadlineUpdateFailed: "Failed to update deadline. Please try again.",
  deadlineDeleted: "Deadline deleted",
  deadlineDeleteFailed: "Failed to delete deadline. Please try again.",
  confirmDelete: "Are you sure you want to delete this deadline?",
  addDeadline: "Add Deadline",
  deadlineTitle: "Deadline Title",
  course: "Course",
  courseName: "Course Name",
  dueDate: "Due Date",
  add: "Add",
  noDeadlinesYet: "No deadlines yet. Add your first deadline to get started.",
  editDeadline: "Edit Deadline",
  daysLeft: "Days Left",

  quizzes: "Quizzes",
  createNewQuiz: "Create New Quiz",
  studyFlashcards: "Study Flashcards",
  practiceMode: "Practice Mode",
  takeQuiz: "Take Quiz",
  noQuizzesYet: "No Quizzes Yet",
  createFirstQuiz: "Create Your First Quiz",
  flashcards: "Flashcards",
  createdFlashcards: "Created Flashcards",
  studyFlashcardsDescription: "Review and study your flashcards",
  practiceFlashcards: "Practice Flashcards",
  yourQuizzes: "Your Quizzes",
  startLearning: "Start Learning",
  study: "Study",
  practice: "Practice",
  takeAQuiz: "Take a Quiz",
  startQuiz: "Start Quiz",
  quizName: "Quiz Name",
  difficulty: "Difficulty",
  questions: "Questions",

  // Missing Quizzes page translations
  studyTools: "Study Tools",
  studyToolsDescription:
    "Create and practice with flashcards and quizzes to enhance your learning",
  createNew: "Create New",
  loadingStudyMaterials: "Loading study materials...",
  failedToLoadStudyMaterials:
    "Failed to load study materials. Please try again.",
  flashcardsDescription:
    "Interactive study cards to help you memorize and understand key concepts",
  noFlashcardsYet:
    "No flashcards created yet. Start by creating your first flashcard set.",
  quizzesDescription:
    "Test your knowledge with interactive quizzes based on your lecture content",

  // Navigation section headers
  coreFunctions: "Core Functions",

  // Adding the missing translations
  somethingWentWrong: "Something went wrong",
  loading: "Loading",
  back: "Back",
  noDescription: "No description",
};

// Turkish translations
const tr: Translations = {
  // Navigation and common elements
  greeting: "Merhaba",
  title: "SmartMate AI",
  description: "Kişisel akademik asistanınız",
  getStarted: "Başla",
  overview: "Genel Bakış",
  settings: "Ayarlar",
  profile: "Profil",
  logout: "Çıkış",
  lectures: "Dersler",
  chats: "Sohbetler",
  analytics: "Analiz",
  dashboard: "Ana Panel",
  theme: "Tema",
  language: "Dil",
  dark: "Koyu",
  light: "Açık",
  system: "Sistem",
  english: "İngilizce",
  turkish: "Türkçe",
  arabic: "Arapça",
  welcome: "SmartMate'e Hoş Geldiniz",
  welcomeBack: "Tekrar hoş geldiniz",
  hereWhatHappening: "İşte neler oluyor",
  name: "İsim",
  userName: "Kullanıcı Adı",
  userEmail: "E-posta",
  userRole: "Öğrenci",
  userSince: "Kullanıcı olma tarihi",
  userLastLogin: "Son giriş",
  tasks: "Görevler",
  deadlines: "Son Tarihler",
  upcoming: "Yaklaşan",
  performance: "Performans",
  recordings: "Kayıtlar",
  whatDoYouWantToLearn: "Bugün ne öğrenmek istiyorsun?",
  typeAMessage: "Bir mesaj yazın...",
  startConversation: "SmartMate ile sohbet başlatın",
  noChats: "Henüz sohbet yok",
  startNewChat: "Öğrenmeye başlamak için yeni bir sohbet başlatın",
  startFirstChat: "İlk sohbetinizi başlatın",
  newChat: "Yeni Sohbet",

  welcomeMessage: "İlerlemenizi takip edin ve öğrenmeye devam edin",
  upcomingDeadlines: "Yaklaşan Son Tarihler",
  recentLectures: "Son Dersler",
  quoteOfTheDay: "Günün Sözü",
  todayTasks: "Bugünün Görevleri",
  quote: "Günün Sözü",
  yourProgress: "İlerlemeniz",

  // Lectures
  uploadLecture: "Ders Yükle",
  recordLecture: "Ders Kaydet",
  connectTeams: "Teams'e Bağlan",
  searchLectures: "Ders ara...",
  filterBy: "Filtrele",
  sortBy: "Sırala",
  allSubjects: "Tüm Konular",
  search: "Ara",
  noLecturesFound: "Ders Bulunamadı",
  noMatchingLectures:
    "Eşleşen ders bulunamadı. Başka bir arama terimi deneyin.",
  noLecturesYet:
    "Henüz hiç ders yüklemediniz. İlk dersinizi yükleyerek başlayın.",
  uploadFirstLecture: "İlk Dersi Yükle",
  chat: "Sohbet",
  summary: "Özet",
  addLecture: "Ders Ekle",
  uploadAudio: "Ses Kaydı veya Transkript Yükle",
  uploadAudioDescription: "Dersinizin ses kaydını veya transkriptini yükleyin",
  recordLectureDescription: "Mikrofonunuzu kullanarak doğrudan ders kaydedin",
  connectTeamsDescription: "Microsoft Teams toplantısına bağlanın",

  yourChats: "Sohbetleriniz",
  askQuestion: "Soru sorun...",
  noChatsYet: "Henüz Sohbet Yok",
  startNewChatMessage:
    "Dersleriniz hakkında soru sorarak yeni bir sohbet başlatın",
  askSmartMate: "SmartMate'e Sor",
  newChatDescription:
    "Derslerinizden öğrenmenize yardımcı olan AI çalışma asistanınız",
  askAboutLectures: "Dersleriniz hakkında sorun...",
  summarizeLecture: "Dersi Özetle",
  keyConcepts: "Anahtar Kavramlar",

  missingInformation: "Eksik Bilgi",
  pleaseProvideUrlAndTitle:
    "Lütfen hem Teams URL'si hem de ders başlığı sağlayın",
  invalidTeamsLink: "Geçersiz Teams Bağlantısı",
  pleaseProvideValidTeamsLink:
    "Lütfen geçerli bir Microsoft Teams bağlantısı sağlayın",
  pleaseEnterValidTeamsLink:
    "Lütfen geçerli bir Microsoft Teams bağlantısı girin",
  connectedToTeams: "Teams'e Bağlandı",
  teamsLectureIsBeingRecorded: "Teams dersiniz kaydediliyor",
  connectingToTeams: "Teams'e bağlanıyor...",
  pleaseWait: "Bağlantı kurulurken lütfen bekleyin",
  connectTeamsLecture: "Teams Dersi Bağla",
  connectTeamsMeeting: "Teams Toplantısı Bağla",
  teamsLinkDescription:
    "Dersi bağlamak ve kaydetmek için Microsoft Teams toplantı bağlantısını yapıştırın",
  microsoftTeamsLink: "Microsoft Teams Bağlantısı",
  connectionSuccessful: "Bağlantı Başarılı",
  teamsLectureConnected: "Teams dersi başarıyla bağlandı",
  connecting: "Bağlanıyor...",
  connect: "Bağlan",

  recordingStarted: "Kayıt Başladı",
  nowRecordingYourLecture: "Dersiniz şimdi kaydediliyor",
  microphoneError: "Mikrofon Hatası",
  unableToAccessMicrophone:
    "Mikrofona erişilemiyor. Lütfen izinleri kontrol edin.",
  recordingComplete: "Kayıt Tamamlandı",
  recordingStopped: "Kayıt durduruldu",
  pleaseRecordAndProvideTitle: "Lütfen ses kaydedin ve başlık sağlayın",
  lectureRecorded: "Ders Kaydedildi",
  lectureSuccessfullySaved: "Dersiniz başarıyla kaydedildi",
  recording: "Kaydediliyor",
  startRecording: "Kaydı Başlat",
  stopRecording: "Kaydı Durdur",

  invalidFileType: "Geçersiz Dosya Türü",
  pleaseSelectAudio: "Lütfen bir ses dosyası seçin",
  pleaseProvideFileAndTitle: "Lütfen hem dosya hem de başlık sağlayın",
  uploadSuccessful: "Yükleme Başarılı",
  lectureUploaded: "Dersiniz yüklendi",
  dragAndDropAudio: "Ses dosyalarını sürükle ve bırak",
  or: "veya",
  browseFiles: "Dosya Gözat",
  uploading: "Yükleniyor...",
  upload: "Yükle",

  lectureTitle: "Ders Başlığı",
  enterLectureTitle: "Bu ders için başlık girin",
  lectureDescription: "Ders Açıklaması",
  enterLectureDescription: "Açıklama girin (isteğe bağlı)",
  cancel: "İptal",
  save: "Kaydet",
  saving: "Kaydediliyor...",

  help: "Yardım",
  helpTopics: "Yardım Konuları",
  contactSupport: "Destek ile İletişim",

  accountSettings: "Hesap Ayarları",
  personalInfo: "Kişisel Bilgiler",

  analyticsDescription:
    "Öğrenme metriklerinizi ve akademik performansınızı takip edin",
  totalLectures: "Toplam Ders",
  avgScore: "Ortalama Puan",
  totalTime: "Çalışma Süresi",
  activeDays: "Aktif Günler",
  weeklyEngagement: "Haftalık Katılım",
  weeklyEngagementDescription: "Son 7 gündeki öğrenme aktiviteleriniz",
  timeSpent: "Konulara Göre Harcanan Zaman",
  timeSpentDescription: "Farklı konulara ayrılan saatlerin dağılımı",
  lectureBreakdown: "Ders Kategorileri",
  lectureBreakdownDescription: "Çalışma alanına göre ders dağılımı",
  performanceBySubject: "Konuya Göre Performans",
  fromLastWeek: "geçen haftadan",

  files: "Dosyalar",
  calendar: "Takvim",
  attachments: "Ekler",
  browse: "Dosya Gözat",
  dragFilesToAttach: "Eklemek için dosyaları sürükle ve bırak",

  createAccount: "Hesap oluştur",
  enterCredentials: "Hesabınıza erişmek için kimlik bilgilerinizi girin",
  enterDetails: "SmartMate hesabınızı oluşturmak için bilgilerinizi girin",
  firstName: "Ad",
  lastName: "Soyad",
  email: "E-posta",
  password: "Şifre",
  forgotPassword: "Şifremi unuttum?",
  loggingIn: "Giriş yapılıyor...",
  creatingAccount: "Hesap oluşturuluyor...",
  logIn: "Giriş yap",
  signUp: "Üye ol",
  dontHaveAccount: "Hesabınız yok mu?",
  alreadyHaveAccount: "Zaten hesabınız var mı?",
  accountCreatedSuccessfully: "Hesap başarıyla oluşturuldu",
  welcomeToSmartMate: "SmartMate'e hoş geldiniz!",
  loginSuccessful: "Giriş başarılı",
  validationError: "Doğrulama Hatası",
  pleaseFillAllFields: "Lütfen tüm alanları doldurun",
  error: "Hata",

  smartMateHelpCenter: "SmartMate Yardım Merkezi",
  helpCenterDescription:
    "AI akademik arkadaşınız hakkında bilmeniz gereken her şey",
  aboutSmartMate: "SmartMate Hakkında",
  aboutSmartMateDescription:
    "Üniversite başarısı için akıllı akademik arkadaşınız",
  builtWithPassion: "Tutkuyla İnşa Edildi",
  graduationProject: "Öğrenci başarısına adanmış bir mezuniyet projesi",
  createdBy: "Tarafından Oluşturuldu",
  computerScienceGraduate: "Bilgisayar Bilimleri Mezunu",
  projectType: "Proje Türü",
  finalYearProject: "Son Sınıf Mezuniyet Projesi",
  missionStatement: "Misyon Beyanı",
  missionStatementText:
    "SmartMate, geleneksel öğrenme yöntemleri ile modern AI teknolojisi arasındaki boşluğu doldurmak için geliştirildi. Amacımız, üniversite öğrencilerini anlayışı artıran, çalışma süreçlerini kolaylaştıran ve kişiselleştirilmiş öğrenme deneyimleri aracılığıyla akademik mükemmelliği teşvik eden akıllı araçlarla güçlendirmektir.",
  aiPoweredLearning: "AI Destekli Öğrenme",
  studentCenteredDesign: "Öğrenci Odaklı Tasarım",
  academicExcellence: "Akademik Mükemmellik",
  frequentlyAskedQuestions: "Sıkça Sorulan Sorular",
  faqDescription:
    "Yaygın sorulara yanıtlar bulun ve SmartMate'ten en iyi şekilde nasıl yararlanacağınızı öğrenin.",
  contactSupportDescription:
    "Aradığınızı bulamıyor musunuz? Destek ekibimiz yardımcı olmak için burada.",
  emailSupport: "Bize e-posta gönderin",
  orUseChat: "veya sohbet asistanını kullanın ve yazın",
  iNeedHelp: "Yardıma ihtiyacım var",
  toConnectSupport: "destek ekibimizle bağlantı kurmak için.",
  supportHours: "Destek saatleri",
  supportHoursTime: "Pazartesi - Cuma, 09:00 - 17:00",
  smartMateFeatures: "SmartMate Özellikleri",
  featuresDescription: "Emrinizde olan tüm güçlü araçları keşfedin",
  learningTools: "Öğrenme Araçları",
  aiPoweredChatAssistant: "AI destekli sohbet asistanı",
  lectureUploadManagement: "Ders yükleme ve yönetimi",
  interactiveFlashcardGeneration: "Etkileşimli flashcard oluşturma",
  automatedQuizCreation: "Otomatik quiz oluşturma",
  smartMaterialOrganization: "Akıllı materyal organizasyonu",
  studyFeatures: "Çalışma Özellikleri",
  contextualAttachmentSelection: "Bağlamsal ek seçimi",
  markdownCodeSupport: "Markdown ve kod desteği",
  downloadableResponses: "İndirilebilir yanıtlar",
  crossPlatformAccessibility: "Platformlar arası erişilebilirlik",
  realTimeCollaboration: "Gerçek zamanlı işbirliği araçları",

  howToUploadLecture: "Nasıl ders yükleyebilirim?",
  howToUploadLectureAnswer:
    "Dersler sayfasına giderek ve 'Ders Yükle' düğmesine tıklayarak ders yükleyebilirsiniz. Microsoft Teams bağlantısı yapıştırabilir veya SmartMate aracılığıyla doğrudan kayıt yapabilirsiniz.",
  howChatAssistantWorks: "Sohbet asistanı nasıl çalışır?",
  howChatAssistantWorksAnswer:
    "SmartMate'in sohbet asistanı, ders içeriğinizi analiz etmek ve ders materyallerinizle ilgili soruları yanıtlamak için AI kullanır. Sadece bir soru sorun ve SmartMate doğru yanıtlar sağlamak için derslerinizi tarayacaktır.",
  canSearchTopics: "Dersler içinde belirli konuları arayabilir miyim?",
  canSearchTopicsAnswer:
    "Evet! Kayıtlı derslerinizin tamamında belirli konuları bulmak için Dersler sayfasındaki arama çubuğunu kullanın. Ayrıca sonuçları kurs, tarih veya süreye göre daraltmak için filtreleri kullanabilirsiniz.",
  howToFavoriteLecture: "Bir dersi nasıl favorilere eklerim?",
  howToFavoriteLectureAnswer:
    "Bir dersi favorilere eklemek için herhangi bir ders kartındaki yıldız simgesine tıklayın. Favori dersler gelecekteki referanslar için hızlıca erişilebilir.",
  canShareLectures: "Dersleri sınıf arkadaşlarımla paylaşabilir miyim?",
  canShareLecturesAnswer:
    "Şu anda ders paylaşımı desteklenmiyor. Bu özellik gelecekteki bir güncellemede planlanıyor.",
  howToCreateFlashcardsQuizzes: "Flashcard ve quiz nasıl oluştururum?",
  howToCreateFlashcardsQuizzesAnswer:
    "Quizler sayfasına gidin ve 'Yeni Oluştur'a tıklayın. Ders içeriğinizden özel talimatlarla hem flashcard hem de quiz oluşturabilirsiniz.",
  canSelectMaterials:
    "Sohbet bağlamı için belirli materyalleri seçebilir miyim?",
  canSelectMaterialsAnswer:
    "Evet! Sohbet arayüzünde, AI konuşmalarınız için bağlam sağlayacak kurslar, materyaller, ödevler ve formülleri seçmek için ekler düğmesine tıklayın.",

  addNewTask: "Yeni görev ekle...",
  taskAdded: "Görev eklendi",
  hasBeenAddedToTasks: "görevlerinize eklendi",
  taskCompleted: "Görev tamamlandı!",
  hasBeenCompleted: "tamamlandı olarak işaretlendi",
  taskReopened: "Görev yeniden açıldı",
  hasBeenReopened: "yeniden açıldı",
  taskDeleted: "Görev silindi",
  hasBeenRemoved: "kaldırıldı",
  taskUpdated: "Görev güncellendi",
  taskHasBeenUpdated: "Görev başarıyla güncellendi",
  tasksDownloaded: "Görevler indirildi",
  tasksDownloadedDescription: "Görevleriniz başarıyla indirildi",
  due: "Bitiş",
  taskUpdateFailed: "Görev güncellemesi başarısız. Lütfen tekrar deneyin.",
  taskAddFailed: "Görev eklenemedi. Lütfen tekrar deneyin.",
  taskDeleteFailed: "Görev silinemedi. Lütfen tekrar deneyin.",
  noTasksYet: "Henüz görev yok. Başlamak için ilk görevinizi ekleyin.",

  deadlineAdded: "Son tarih eklendi",
  hasBeenAdded: "eklenmiştir",
  deadlineAddFailed: "Son tarih eklenemedi. Lütfen tekrar deneyin.",
  deadlineUpdated: "Son tarih güncellendi",
  hasBeenUpdated: "güncellenmiştir",
  deadlineUpdateFailed: "Son tarih güncellenemedi. Lütfen tekrar deneyin.",
  deadlineDeleted: "Son tarih silindi",
  deadlineDeleteFailed: "Son tarih silinemedi. Lütfen tekrar deneyin.",
  confirmDelete: "Bu son tarihi silmek istediğinizden emin misiniz?",
  addDeadline: "Son Tarih Ekle",
  deadlineTitle: "Son Tarih Başlığı",
  course: "Kurs",
  courseName: "Kurs Adı",
  dueDate: "Son Tarih",
  add: "Ekle",
  noDeadlinesYet:
    "Henüz son tarih yok. Başlamak için ilk son tarihinizi ekleyin.",
  editDeadline: "Son Tarihi Düzenle",
  daysLeft: "Kalan Günler",

  quizzes: "Quizler",
  createNewQuiz: "Yeni Quiz Oluştur",
  studyFlashcards: "Flashcard Çalış",
  practiceMode: "Pratik Modu",
  takeQuiz: "Quiz Çöz",
  noQuizzesYet: "Henüz Quiz Yok",
  createFirstQuiz: "İlk Quizinizi Oluşturun",
  flashcards: "Flashcardlar",
  createdFlashcards: "Oluşturulan Flashcardlar",
  studyFlashcardsDescription: "Flashcardlarınızı gözden geçirin ve çalışın",
  practiceFlashcards: "Flashcard Pratiği",
  yourQuizzes: "Quizleriniz",
  startLearning: "Öğrenmeye Başla",
  study: "Çalış",
  practice: "Pratik",
  takeAQuiz: "Quiz Çöz",
  startQuiz: "Quiz Başlat",
  quizName: "Quiz Adı",
  difficulty: "Zorluk",
  questions: "Sorular",

  // Missing Quizzes page translations
  studyTools: "Çalışma Araçları",
  studyToolsDescription:
    "Öğreniminizi geliştirmek için flashcard ve quiz oluşturun ve pratik yapın",
  createNew: "Yeni Oluştur",
  loadingStudyMaterials: "Çalışma materyalleri yükleniyor...",
  failedToLoadStudyMaterials:
    "Çalışma materyalleri yüklenemedi. Lütfen tekrar deneyin.",
  flashcardsDescription:
    "Anahtar kavramları ezberlemek ve anlamak için etkileşimli çalışma kartları",
  noFlashcardsYet:
    "Henüz flashcard oluşturulmamış. İlk flashcard setinizi oluşturarak başlayın.",
  quizzesDescription:
    "Ders içeriğinize dayalı etkileşimli quizlerle bilginizi test edin",

  // Navigation section headers
  coreFunctions: "Temel İşlevler",

  // Adding the missing translations for Turkish
  somethingWentWrong: "Bir şeyler ters gitti",
  loading: "Yükleniyor",
  back: "Geri",
  noDescription: "Açıklama yok",
};

// Arabic translations
const ar: Translations = {
  // Navigation and common elements
  greeting: "مرحبا",
  title: "SmartMate AI",
  description: "مساعدك الأكاديمي الشخصي",
  getStarted: "ابدأ",
  overview: "نظرة عامة",
  settings: "الإعدادات",
  profile: "الملف الشخصي",
  logout: "تسجيل الخروج",
  lectures: "المحاضرات",
  chats: "المحادثات",
  analytics: "التحليلات",
  dashboard: "لوحة التحكم",
  theme: "السمة",
  language: "اللغة",
  dark: "مظلم",
  light: "فاتح",
  system: "النظام",
  english: "الإنجليزية",
  turkish: "التركية",
  arabic: "العربية",
  welcome: "مرحباً بك في SmartMate",
  welcomeBack: "مرحباً بعودتك",
  hereWhatHappening: "إليك ما يحدث",
  name: "الاسم",
  userName: "اسم المستخدم",
  userEmail: "البريد الإلكتروني",
  userRole: "طالب",
  userSince: "مستخدم منذ",
  userLastLogin: "آخر تسجيل دخول",
  tasks: "المهام",
  deadlines: "المواعيد النهائية",
  upcoming: "القادمة",
  performance: "الأداء",
  recordings: "التسجيلات",
  whatDoYouWantToLearn: "ماذا تريد أن تتعلم اليوم؟",
  typeAMessage: "اكتب رسالة...",
  startConversation: "ابدأ محادثة مع SmartMate",
  noChats: "لا توجد محادثات بعد",
  startNewChat: "ابدأ محادثة جديدة لبدء التعلم",
  startFirstChat: "ابدأ محادثتك الأولى",
  newChat: "محادثة جديدة",

  welcomeMessage: "تابع تقدمك واستمر في التعلم",
  upcomingDeadlines: "المواعيد النهائية القادمة",
  recentLectures: "المحاضرات الأخيرة",
  quoteOfTheDay: "اقتباس اليوم",
  todayTasks: "مهام اليوم",
  quote: "اقتباس اليوم",
  yourProgress: "تقدمك",

  // Lectures
  uploadLecture: "رفع محاضرة",
  recordLecture: "تسجيل محاضرة",
  connectTeams: "الاتصال بـ Teams",
  searchLectures: "البحث في المحاضرات...",
  filterBy: "تصفية حسب",
  sortBy: "ترتيب حسب",
  allSubjects: "جميع المواد",
  search: "بحث",
  noLecturesFound: "لم يتم العثور على محاضرات",
  noMatchingLectures: "لم يتم العثور على محاضرات مطابقة. جرب مصطلح بحث آخر.",
  noLecturesYet: "لم تقم برفع أي محاضرات بعد. ابدأ برفع محاضرتك الأولى.",
  uploadFirstLecture: "رفع المحاضرة الأولى",
  chat: "محادثة",
  summary: "ملخص",
  addLecture: "إضافة محاضرة",
  uploadAudio: "تحميل تسجيل صوتي أو نص المحاضرة",
  uploadAudioDescription: "قم بتحميل تسجيل صوتي أو نص مكتوب لمحاضرتك",
  recordLectureDescription: "تسجيل محاضرة مباشرة باستخدام الميكروفون",
  connectTeamsDescription: "الاتصال باجتماع Microsoft Teams",

  yourChats: "محادثاتك",
  askQuestion: "اطرح سؤالاً...",
  noChatsYet: "لا توجد محادثات بعد",
  startNewChatMessage: "ابدأ محادثة جديدة بطرح سؤال حول محاضراتك",
  askSmartMate: "اسأل SmartMate",
  newChatDescription:
    "مساعد الدراسة بالذكاء الاصطناعي الذي يساعدك على التعلم من محاضراتك",
  askAboutLectures: "اسأل عن محاضراتك...",
  summarizeLecture: "تلخيص المحاضرة",
  keyConcepts: "المفاهيم الأساسية",

  missingInformation: "معلومات مفقودة",
  pleaseProvideUrlAndTitle: "يرجى توفير كل من رابط Teams وعنوان المحاضرة",
  invalidTeamsLink: "رابط Teams غير صحيح",
  pleaseProvideValidTeamsLink: "يرجى توفير رابط Microsoft Teams صحيح",
  pleaseEnterValidTeamsLink: "يرجى إدخال رابط Microsoft Teams صحيح",
  connectedToTeams: "متصل بـ Teams",
  teamsLectureIsBeingRecorded: "يتم تسجيل محاضرة Teams الخاصة بك",
  connectingToTeams: "الاتصال بـ Teams...",
  pleaseWait: "يرجى الانتظار أثناء إنشاء الاتصال",
  connectTeamsLecture: "ربط محاضرة Teams",
  connectTeamsMeeting: "ربط اجتماع Teams",
  teamsLinkDescription:
    "الصق رابط اجتماع Microsoft Teams للاتصال وتسجيل المحاضرة",
  microsoftTeamsLink: "رابط Microsoft Teams",
  connectionSuccessful: "نجح الاتصال",
  teamsLectureConnected: "تم ربط محاضرة Teams بنجاح",
  connecting: "جاري الاتصال...",
  connect: "اتصال",

  recordingStarted: "بدأ التسجيل",
  nowRecordingYourLecture: "يتم الآن تسجيل محاضرتك",
  microphoneError: "خطأ في الميكروفون",
  unableToAccessMicrophone:
    "غير قادر على الوصول للميكروفون. يرجى التحقق من الأذونات.",
  recordingComplete: "اكتمل التسجيل",
  recordingStopped: "تم إيقاف التسجيل",
  pleaseRecordAndProvideTitle: "يرجى تسجيل الصوت وتوفير عنوان",
  lectureRecorded: "تم تسجيل المحاضرة",
  lectureSuccessfullySaved: "تم حفظ محاضرتك بنجاح",
  recording: "جاري التسجيل",
  startRecording: "بدء التسجيل",
  stopRecording: "إيقاف التسجيل",

  invalidFileType: "نوع ملف غير صحيح",
  pleaseSelectAudio: "يرجى تحديد ملف صوتي",
  pleaseProvideFileAndTitle: "يرجى توفير كل من الملف والعنوان",
  uploadSuccessful: "نجح الرفع",
  lectureUploaded: "تم رفع محاضرتك",
  dragAndDropAudio: "اسحب وأفلت ملفات الصوت",
  or: "أو",
  browseFiles: "تصفح الملفات",
  uploading: "جاري الرفع...",
  upload: "رفع",

  lectureTitle: "عنوان المحاضرة",
  enterLectureTitle: "أدخل عنواناً لهذه المحاضرة",
  lectureDescription: "وصف المحاضرة",
  enterLectureDescription: "أدخل وصفاً (اختياري)",
  cancel: "إلغاء",
  save: "حفظ",
  saving: "جاري الحفظ...",

  help: "مساعدة",
  helpTopics: "مواضيع المساعدة",
  contactSupport: "اتصل بالدعم",

  accountSettings: "إعدادات الحساب",
  personalInfo: "المعلومات الشخصية",

  analyticsDescription: "تتبع مقاييس التعلم والأداء الأكاديمي",
  totalLectures: "إجمالي المحاضرات",
  avgScore: "متوسط النقاط",
  totalTime: "وقت الدراسة",
  activeDays: "الأيام النشطة",
  weeklyEngagement: "المشاركة الأسبوعية",
  weeklyEngagementDescription: "أنشطة التعلم الخاصة بك خلال الـ 7 أيام الماضية",
  timeSpent: "الوقت المقضي حسب المادة",
  timeSpentDescription: "توزيع الساعات عبر المواد المختلفة",
  lectureBreakdown: "فئات المحاضرات",
  lectureBreakdownDescription: "تفصيل المحاضرات حسب مجال الدراسة",
  performanceBySubject: "الأداء حسب المادة",
  fromLastWeek: "من الأسبوع الماضي",

  files: "الملفات",
  calendar: "التقويم",
  attachments: "المرفقات",
  browse: "تصفح الملفات",
  dragFilesToAttach: "اسحب وأفلت الملفات للإرفاق",

  createAccount: "إنشاء حساب",
  enterCredentials: "أدخل بياناتك للوصول إلى حسابك",
  enterDetails: "أدخل تفاصيلك لإنشاء حساب SmartMate",
  firstName: "الاسم الأول",
  lastName: "الاسم الأخير",
  email: "البريد الإلكتروني",
  password: "كلمة المرور",
  forgotPassword: "نسيت كلمة المرور?",
  loggingIn: "جاري تسجيل الدخول...",
  creatingAccount: "جاري إنشاء الحساب...",
  logIn: "تسجيل الدخول",
  signUp: "إنشاء حساب",
  dontHaveAccount: "ليس لديك حساب؟",
  alreadyHaveAccount: "لديك حساب بالفعل؟",
  accountCreatedSuccessfully: "تم إنشاء الحساب بنجاح",
  welcomeToSmartMate: "مرحباً بك في SmartMate!",
  loginSuccessful: "نجح تسجيل الدخول",
  validationError: "خطأ في التحقق",
  pleaseFillAllFields: "يرجى ملء جميع الحقول",
  error: "خطأ",

  smartMateHelpCenter: "مركز مساعدة SmartMate",
  helpCenterDescription:
    "كل ما تحتاج لمعرفته عن مساعدك الأكاديمي بالذكاء الاصطناعي",
  aboutSmartMate: "حول SmartMate",
  aboutSmartMateDescription: "رفيقك الأكاديمي الذكي لنجاح الجامعة",
  builtWithPassion: "مُبني بشغف",
  graduationProject: "مشروع تخرج مخصص لنجاح الطلاب",
  createdBy: "أنشأ بواسطة",
  computerScienceGraduate: "خريج علوم الحاسوب",
  projectType: "نوع المشروع",
  finalYearProject: "مشروع تخرج السنة الأخيرة",
  missionStatement: "بيان المهمة",
  missionStatementText:
    "تم تطوير SmartMate لسد الفجوة بين طرق التعلم التقليدية وتكنولوجيا الذكاء الاصطناعي الحديثة. هدفنا هو تمكين طلاب الجامعات بأدوات ذكية تعزز الفهم وتبسط عمليات الدراسة وتعزز التميز الأكاديمي من خلال تجارب تعلم شخصية.",
  aiPoweredLearning: "التعلم المدعوم بالذكاء الاصطناعي",
  studentCenteredDesign: "تصميم محوره الطالب",
  academicExcellence: "التميز الأكاديمي",
  frequentlyAskedQuestions: "الأسئلة الشائعة",
  faqDescription:
    "اعثر على إجابات للأسئلة الشائعة وتعلم كيفية الاستفادة القصوى من SmartMate.",
  contactSupportDescription:
    "لا تجد ما تبحث عنه؟ فريق الدعم لدينا هنا للمساعدة.",
  emailSupport: "راسلنا على",
  orUseChat: "أو استخدم مساعد الدردشة واكتب",
  iNeedHelp: "أحتاج مساعدة",
  toConnectSupport: "للتواصل مع فريق الدعم لدينا.",
  supportHours: "ساعات الدعم",
  supportHoursTime: "الاثنين - الجمعة، 9:00 ص - 5:00 م",
  smartMateFeatures: "ميزات SmartMate",
  featuresDescription: "اكتشف جميع الأدوات القوية المتاحة لك",
  learningTools: "أدوات التعلم",
  aiPoweredChatAssistant: "مساعد دردشة مدعوم بالذكاء الاصطناعي",
  lectureUploadManagement: "رفع وإدارة المحاضرات",
  interactiveFlashcardGeneration: "إنشاء بطاقات تعليمية تفاعلية",
  automatedQuizCreation: "إنشاء اختبارات تلقائية",
  smartMaterialOrganization: "تنظيم ذكي للمواد",
  studyFeatures: "ميزات الدراسة",
  contextualAttachmentSelection: "اختيار المرفقات السياقية",
  markdownCodeSupport: "دعم Markdown والكود",
  downloadableResponses: "ردود قابلة للتحميل",
  crossPlatformAccessibility: "إمكانية الوصول عبر المنصات",
  realTimeCollaboration: "أدوات التعاون في الوقت الفعلي",

  howToUploadLecture: "كيف يمكنني رفع محاضرة؟",
  howToUploadLectureAnswer:
    "يمكنك رفع محاضرة بالانتقال إلى صفحة المحاضرات والنقر على زر 'رفع محاضرة'. يمكنك إما لصق رابط Microsoft Teams أو التسجيل مباشرة من خلال SmartMate.",
  howChatAssistantWorks: "كيف يعمل مساعد الدردشة؟",
  howChatAssistantWorksAnswer:
    "يستخدم مساعد الدردشة في SmartMate الذكاء الاصطناعي لتحليل محتوى محاضراتك والإجابة على الأسئلة المتعلقة بمواد دراستك. ما عليك سوى طرح سؤال، وسيبحث SmartMate في محاضراتك لتقديم إجابات دقيقة.",
  canSearchTopics: "هل يمكنني البحث عن مواضيع محددة في المحاضرات؟",
  canSearchTopicsAnswer:
    "نعم! استخدم شريط البحث في صفحة المحاضرات للعثور على مواضيع محددة عبر جميع محاضراتك المسجلة. يمكنك أيضًا استخدام المرشحات لتضييق النتائج حسب الدورة أو التاريخ أو المدة.",
  howToFavoriteLecture: "كيف أضع علامة على محاضرة كمفضلة؟",
  howToFavoriteLectureAnswer:
    "لوضع علامة على محاضرة كمفضلة، انقر على رمز النجمة في أي بطاقة محاضرة. يمكن الوصول إلى المحاضرات المفضلة بسرعة للرجوع إليها مستقبلاً.",
  canShareLectures: "هل يمكنني مشاركة المحاضرات مع زملاء الصف؟",
  canShareLecturesAnswer:
    "حاليًا، مشاركة المحاضرات غير مدعومة. هذه الميزة مخططة لتحديث مستقبلي.",
  howToCreateFlashcardsQuizzes: "كيف أنشئ بطاقات تعليمية واختبارات؟",
  howToCreateFlashcardsQuizzesAnswer:
    "انتقل إلى صفحة الاختبارات وانقر على 'إنشاء جديد'. يمكنك إنشاء بطاقات تعليمية واختبارات من محتوى محاضراتك مع تعليمات مخصصة.",
  canSelectMaterials: "هل يمكنني اختيار مواد محددة لسياق الدردشة؟",
  canSelectMaterialsAnswer:
    "نعم! في واجهة الدردشة، انقر على زر المرفقات لاختيار الدورات والمواد والواجبات والصيغ التي ستوفر سياقًا لمحادثاتك مع الذكاء الاصطناعي.",

  addNewTask: "إضافة مهمة جديدة...",
  taskAdded: "تمت إضافة المهمة",
  hasBeenAddedToTasks: "تمت إضافتها إلى مهامك",
  taskCompleted: "تمت المهمة!",
  hasBeenCompleted: "تم وضع علامة كمكتملة",
  taskReopened: "تم إعادة فتح المهمة",
  hasBeenReopened: "تم إعادة فتحها",
  taskDeleted: "تم حذف المهمة",
  hasBeenRemoved: "تم إزالتها",
  taskUpdated: "تم تحديث المهمة",
  taskHasBeenUpdated: "تم تحديث المهمة بنجاح",
  tasksDownloaded: "تم تحميل المهام",
  tasksDownloadedDescription: "تم تحميل مهامك بنجاح",
  due: "الاستحقاق",
  taskUpdateFailed: "فشل تحديث المهمة. يرجى المحاولة مرة أخرى.",
  taskAddFailed: "تعذر إضافة المهمة. يرجى المحاولة مرة أخرى.",
  taskDeleteFailed: "فشل حذف المهمة. يرجى المحاولة مرة أخرى.",
  noTasksYet: "لا توجد مهام بعد. أضف مهمتك الأولى للبدء.",

  deadlineAdded: "تم إضافة الموعد النهائي",
  hasBeenAdded: "تمت إضافته",
  deadlineAddFailed: "فشل إضافة الموعد النهائي. يرجى المحاولة مرة أخرى.",
  deadlineUpdated: "تم تحديث الموعد النهائي",
  hasBeenUpdated: "تمت تحديثه",
  deadlineUpdateFailed: "فشل تحديث الموعد النهائي. يرجى المحاولة مرة أخرى.",
  deadlineDeleted: "تم حذف الموعد النهائي",
  deadlineDeleteFailed: "فشل حذف الموعد النهائي. يرجى المحاولة مرة أخرى.",
  confirmDelete: "هل أنت متأكد أنك تريد حذف هذا الموعد النهائي؟",
  addDeadline: "إضافة موعد نهائي",
  deadlineTitle: "عنوان الموعد النهائي",
  course: "الدورة",
  courseName: "اسم الدورة",
  dueDate: "تاريخ الاستحقاق",
  add: "إضافة",
  noDeadlinesYet: "لا توجد مواعيد نهائية بعد. أضف موعدك النهائي الأول للبدء.",
  editDeadline: "تعديل الموعد النهائي",
  daysLeft: "الأيام المتبقية",

  quizzes: "الاختبارات",
  createNewQuiz: "إنشاء اختبار جديد",
  studyFlashcards: "دراسة البطاقات التعليمية",
  practiceMode: "وضع الممارسة",
  takeQuiz: "إجراء اختبار",
  noQuizzesYet: "لا توجد اختبارات بعد",
  createFirstQuiz: "أنشئ اختبارك الأول",
  flashcards: "البطاقات التعليمية",
  createdFlashcards: "البطاقات التعليمية المُنشأة",
  studyFlashcardsDescription: "راجع وادرس بطاقاتك التعليمية",
  practiceFlashcards: "ممارسة البطاقات التعليمية",
  yourQuizzes: "اختباراتك",
  startLearning: "ابدأ التعلم",
  study: "ادرس",
  practice: "مارس",
  takeAQuiz: "إجراء اختبار",
  startQuiz: "ابدأ الاختبار",
  quizName: "اسم الاختبار",
  difficulty: "الصعوبة",
  questions: "الأسئلة",

  // Missing Quizzes page translations
  studyTools: "أدوات الدراسة",
  studyToolsDescription:
    "أنشئ ومارس البطاقات التعليمية والاختبارات لتعزيز تعلمك",
  createNew: "إنشاء جديد",
  loadingStudyMaterials: "جاري تحميل مواد الدراسة...",
  failedToLoadStudyMaterials:
    "فشل في تحميل مواد الدراسة. يرجى المحاولة مرة أخرى.",
  flashcardsDescription:
    "بطاقات دراسة تفاعلية لمساعدتك على حفظ وفهم المفاهيم الأساسية",
  noFlashcardsYet:
    "لم يتم إنشاء بطاقات تعليمية بعد. ابدأ بإنشاء مجموعة البطاقات الأولى.",
  quizzesDescription:
    "اختبر معرفتك بالاختبارات التفاعلية المستندة إلى محتوى محاضراتك",

  // Navigation section headers
  coreFunctions: "الوظائف الأساسية",

  // Adding the missing translations for Arabic
  somethingWentWrong: "حدث خطأ ما",
  loading: "جاري التحميل",
  back: "العودة",
  noDescription: "لا يوجد وصف",
};

// Create the translations map
const translations: Record<Language, Translations> = {
  en,
  tr,
  ar,
};

// Define the context type
interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: keyof Translations) => string;
}

// Create the context
const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

// Create the provider
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  const t = (key: keyof Translations): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Create the hook
export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);

  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }

  return context;
}
