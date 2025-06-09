# SmartMate Frontend 🎓

> A smart academic assistant designed to help university students engage with, understand, and retain course material more effectively.

[![Built with React](https://img.shields.io/badge/Built%20with-React-61DAFB?logo=react)](https://reactjs.org/)
[![Styled with Tailwind](https://img.shields.io/badge/Styled%20with-Tailwind%20CSS-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Powered by Vite](https://img.shields.io/badge/Powered%20by-Vite-646CFF?logo=vite)](https://vitejs.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 📋 Table of Contents

- [Features](#-features)
- [Demo](#-demo)
- [Tech Stack](#️-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Environment Variables](#-environment-variables)
- [Available Scripts](#-available-scripts)
- [UI Design System](#️-ui-design-system)
- [API Integration](#-api-integration)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [Troubleshooting](#-troubleshooting)
- [License](#-license)

## ✨ Features

- 📚 **Smart Summarization** - Convert lecture audio and PDF materials into digestible summaries
- 🤖 **AI Chatbot** - Personalized academic assistance powered by LLM via OpenRouter
- ⏰ **Study Planner** - Intelligent reminders and progress tracking
- 📂 **Content Organization** - Structured course materials and personal notes management
- 🧠 **Adaptive Learning** - Personalized recommendations based on user behavior
- 📱 **Responsive Design** - Seamless experience across desktop and mobile devices

## 🎯 Demo

> **Live Demo:** [smartmate-demo.vercel.app](https://your-demo-link.com)

_Screenshots and demo GIFs would go here showing key features in action_

## 🛠️ Tech Stack

### Core Technologies

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **TypeScript** - Type safety (if applicable)

### Styling & UI

- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **Lucide React** - Beautiful, customizable icons
- **ShadCN UI** - High-quality component library

### State Management & Routing

- **React Router DOM** - Client-side routing
- **React Context/Zustand** - Global state management

### HTTP & API

- **Axios** - HTTP client for API requests
- **React Query/SWR** - Server state management (if applicable)

## 🚀 Getting Started

### Prerequisites

- **Node.js** >= 18.0.0
- **npm** >= 8.0.0 or **yarn** >= 1.22.0

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/m-aishah/smartmate-frontend.git
   cd smartmate-frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**

   Navigate to `http://localhost:5173`

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # Base UI components (buttons, inputs, etc.)
│   ├── layout/          # Layout components (header, sidebar, etc.)
│   └── features/        # Feature-specific components
├── pages/               # Route-level components
│   ├── Dashboard/       # Main dashboard
│   ├── Chat/           # AI chatbot interface
│   ├── Upload/         # File upload and processing
│   └── Planner/        # Study planning tools
├── services/           # API integration layer
│   ├── api.js          # Axios configuration
│   ├── chat.js         # Chat API calls
│   ├── summary.js      # Summary API calls
│   └── storage.js      # File storage operations
├── hooks/              # Custom React hooks
├── utils/              # Helper functions and utilities
├── constants/          # App constants and configuration
├── styles/             # Global styles and Tailwind config
├── assets/             # Static assets (images, icons, etc.)
├── App.jsx            # Main app component and routing
└── main.jsx           # React DOM entry point
```

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
# API Configuration
VITE_API_BASE_URL=https://your-backend-api.com/api
VITE_OPENROUTER_API_KEY=your-openrouter-api-key

# Optional: Analytics
VITE_GOOGLE_ANALYTICS_ID=your-ga-id

# Optional: Error Tracking
VITE_SENTRY_DSN=your-sentry-dsn
```

## 📝 Available Scripts

```bash
# Development
npm run dev          # Start dev server
npm run dev:host     # Start dev server with network access

# Building
npm run build        # Build for production
npm run preview      # Preview production build locally

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run format       # Format code with Prettier

# Testing (if configured)
npm run test         # Run tests
npm run test:watch   # Run tests in watch mode
```

## 🎨 UI Design System

### Color Palette

```css
/* Primary Colors */
--lavender: #E6E6FA
--teal: #20B2AA
--light-blue: #87CEEB

/* Neutral Colors */
--gray-50: #F9FAFB
--gray-100: #F3F4F6
--white: #FFFFFF
```

### Design Principles

- **Soft & Approachable** - Rounded corners (`rounded-2xl`), gentle shadows
- **Calming Aesthetic** - Pastel color scheme to reduce eye strain
- **Consistent Spacing** - 8px grid system
- **Accessible** - WCAG 2.1 AA compliant color contrasts
- **Responsive** - Mobile-first design approach

### Typography

- **Primary Font:** Inter (clean, readable)
- **Secondary Font:** Nunito (friendly, approachable)

## 🔌 API Integration

The frontend communicates with the SmartMate backend API for:

- **Authentication** - User login/registration
- **File Processing** - Upload and summarization of documents/audio
- **AI Chat** - Conversational AI interactions
- **User Data** - Progress tracking and preferences

### Example API Usage

```javascript
// services/chat.js
import api from "./api";

export const sendChatMessage = async (message, context) => {
  const response = await api.post("/chat", {
    message,
    context,
    userId: getCurrentUserId(),
  });
  return response.data;
};
```

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Netlify

1. Build the project: `npm run build`
2. Upload `dist` folder to Netlify
3. Configure environment variables

### Manual Deployment

```bash
# Build for production
npm run build

# The dist/ folder contains the built application
# Upload contents to your hosting provider
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and commit: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Code Style

- Use Prettier for code formatting
- Follow ESLint rules
- Write meaningful commit messages
- Add JSDoc comments for complex functions

## 🐛 Troubleshooting

### Common Issues

**Development server won't start**

```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Build fails**

- Check for TypeScript errors (if using TS)
- Ensure all environment variables are set
- Verify all imports are correct

**API calls failing**

- Verify `VITE_API_BASE_URL` is correct
- Check CORS configuration on backend
- Ensure API endpoints are accessible

### Getting Help

- 📧 Email: support@smartmate.com
- 💬 Discord: [SmartMate Community](https://discord.gg/smartmate)
- 🐛 Issues: [GitHub Issues](https://github.com/m-aishah/smartmate-frontend/issues)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Built with ❤️ to help students learn smarter, not harder.**

\*Made by [m-aishah](https://github.com/m-aishah).
