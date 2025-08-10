# Jawuan's GPT

## 📚 Table of Contents

- [Project Overview](#-project-overview)
- [Live Demo](#-live-demo)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation](#%EF%B8%8F-installation)
- [Development](#%EF%B8%8F-development)
- [Usage](#%EF%B8%8F-usage)
- [Next Steps](#-next-steps)

## 🧠 Project Overview

A custom-built AI assistant powered by OpenAI models, featuring session-persistent chat history, sleek UI, and full-stack MERN architecture.

## 🚀 Live Demo

- Application live here: [Jawuan's GPT](https://gpt.jawuanlewis.dev)
- Initial designs available here: [Figma Designs](https://www.figma.com/design/7L2M9WD2Lmsjke14rtwscX/Chatbot?node-id=0-1&t=gsJwMsjE6Q6RSxH0-1)

## ✨ Features

**AI-Powered Conversations**

- Powered by OpenAI's GPT-4 API
- Natural language understanding and generation
- Context-aware responses
- Support for complex queries and discussions

**Chat Management**

- Create and manage multiple chat sessions
- Rename and organize conversations
- Sidebar navigation between chats

**Modern User Interface**

- Clean, intuitive design
- Real-time message streaming
- Smooth animations and transitions

**Developer Experience**

- Full TypeScript support
- Hot reloading in development
- Comprehensive project structure
- Code formatting and linting

## 💻 Tech Stack

- **Frontend:** React (Vite), TypeScript, CSS
- **Backend:** Node.js, Express.js, OpenAI API
- **Database:** MongoDB (with Mongoose)
- **Testing/Deployment:** Docker, GitHub Actions, Vercel, Heroku

## 📁 Project Structure

```bash
gpt-powered-chatbot/
├── .github/
│   ├── workflows/        # Testing & deployment
│
├── client/               # Frontend
│   ├── src/
│   │   ├── assets/         # Fonts, icons, etc.
│   │   ├── components/     # Reusable UI components
│   │   ├── services/       # API calls & services
│   │   ├── styles/         # Component styles
│   │   ├── types/          # TypeScript type definitions
│   │   ├── utils/          # Helper functions
│   │   ├── App.tsx         # Root component
│   │   └── main.tsx        # Entry point
│   ├── index.html
│   ├── vite.config.ts
│   └── package.json
│
├── server/               # Backend
│   ├── config/             # Environment and DB config
│   ├── controllers/        # Request handler logic
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   ├── types/              # Shared backend types
│   └── app.ts              # Entry point for Express app
│
├── .gitignore
├── Dockerfile
└── package.json          # Root package config
```

## ⚙️ Installation

### Prerequisites

- [Node.js](https://nodejs.org/en/download) (v20 or higher)
- [OpenAI API Key](https://platform.openai.com/docs/quickstart)

### Local Setup

1. Clone this repository and navigate to the project directory:

```bash
git clone https://github.com/jawuanlewis/gpt-powered-chatbot.git
cd gpt-powered-chatbot
```

2. Install server dependencies:

```bash
npm install
```

3. Install client dependencies:

```bash
cd client
npm install
cd ..
```

4. Create a `.env` file in the root directory and add your OpenAI API key:

```bash
OPENAI_API_KEY=your-api-key
```

## 🛠️ Development

### Running the Application

You can run the client and server concurrently in development mode:

```bash
npm run dev
```

Or run them separately:

```bash
# Run server only
npm run dev:server

# Run client only
npm run dev:client
```

### Building for Production

To build both client and server:

```bash
npm run build
```

Or build them separately:

```bash
# Build server only
npm run build:server

# Build client only
npm run build:client
```

### Running in Production

After building, start the application:

```bash
npm start
```

### Code Quality

Format your code:

```bash
npm run format
```

Check code formatting:

```bash
npm run lint
```

## ▶️ Usage

Once the application is running, you can:

1. Navigate to `http://localhost:5173` in your browser (if running locally).
2. Start a conversation by typing your message in the input box.
3. Press "Enter" or click the send button to receive a response from the assistant.
4. View existing conversations which will be displayed in the sidebar menu.
5. Use the sidebar to switch between or rename chat sessions.
6. Interact freely — the assistant is powered by the OpenAI GPT-4 API for high-quality responses.

## 🔮 Next Steps

- Add user authentication
- Chat export or download
- Add customization support & menu options
- Continuous visual improvements
