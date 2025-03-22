# ChatGPT Chatbot

A command-line chatbot built with Node.js and TypeScript, powered by ChatGPT. Users can have ongoing conversations with the bot and ask general questions.

- The bot uses OpenAI's GPT-4o mini model
- Built with TypeScript for type safety and better development experience
- There are potential plans to expand this app by adding a proper interface and features

## Prerequisites

- [Node.js](https://nodejs.org/en/download) (v16 or higher recommended)
- [OpenAI API Key](https://platform.openai.com/docs/quickstart)

## Setup Instructions

1. Clone this repository and navigate to the project directory:

```bash
git clone <repository-url>
cd gpt-powered-chatbot
```

2. Create a `.env` file in the root directory and add your OpenAI API key:

```bash
OPENAI_API_KEY=your-api-key
```

3. Install dependencies:

```bash
npm install
```

## Running the Application

### Development Mode

For development with hot reloading:

```bash
npm run dev
```

To run TypeScript directly without compilation:

```bash
npm run dev:run
```

### Production Mode

1. Build the TypeScript files:

```bash
npm run build
```

2. Run the compiled application:

```bash
npm start
```

### Type Checking

To verify TypeScript compilation without generating files:

```bash
npm run type-check
```

## Usage

Once the application is running:

1. Type your message and press Enter to chat with the bot
2. The bot will maintain context of the conversation
3. Type "exit" to end the chat session

## Project Structure

```
gpt-powered-chatbot/
├── server/
│   ├── config/
│   │   └── open-ai.ts    # OpenAI configuration
│   └── index.ts          # Main application entry point
├── dist/                 # Compiled JavaScript files
├── package.json
├── tsconfig.json
└── .env
```

## Development

- The project uses TypeScript for type safety
- ES modules are used for imports/exports
- Prettier is configured for code formatting

## Future Plans

- Add a proper web interface
- Implement additional features and commands
- Add conversation history persistence
- Implement user authentication
