import openai from './config/open-ai.js';
import readlineSync from 'readline-sync';
import colors from 'colors';

type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

type ChatHistory = [string, string][];

async function main(): Promise<void> {
  console.log(colors.bold.green('Welcome to the Chatbot Program!'));
  console.log(colors.bold.green('You can start chatting with the bot.'));
  console.log(colors.bold.yellow('Type "exit" to end the chat.'));

  const chatHistory: ChatHistory = [];

  while (true) {
    const userInput = readlineSync.question(colors.yellow('\nYou: '));

    try {
      // Retrieve chat history, and add latest user input
      const messages: ChatMessage[] = chatHistory.map(([role, content]) => ({
        role: role as 'user' | 'assistant',
        content,
      }));
      messages.push({ role: 'user', content: userInput });

      const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages,
      });

      const completionText = completion.choices[0].message.content;
      if (!completionText) {
        throw new Error('No response from the model');
      }

      console.log(colors.green('Bot: ') + completionText);

      if (userInput.toLowerCase() === 'exit') {
        return;
      }

      chatHistory.push(['user', userInput]);
      chatHistory.push(['assistant', completionText]);
    } catch (error) {
      console.error(
        colors.red(error instanceof Error ? error.message : String(error))
      );
    }
  }
}

main();
