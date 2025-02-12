import openai from './config/open-ai.js';
import readlineSync from 'readline-sync';
import colors from 'colors';

async function main() {
  console.log(colors.bold.green('Welcome to the Chatbot Program!'));
  console.log(colors.bold.green('You can start chatting with the bot.'));
  console.log(colors.bold.yellow('Type "exit" to end the chat.'));

  const chatHistory = [];

  while (true) {
    const userInput = readlineSync.question(colors.yellow('\nYou: '));

    try {
      // Retrieve chat history, and add latest user input
      const messages = chatHistory.map(([role, content]) => ({
        role,
        content,
      }));
      messages.push({ role: 'user', content: userInput });

      const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: messages,
      });

      const completionText = completion.choices[0].message.content;
      console.log(colors.green('Bot: ') + completionText);

      if (userInput.toLowerCase() === 'exit') {
        return;
      }

      chatHistory.push(['user', userInput]);
      chatHistory.push(['assistant', completionText]);
    } catch (error) {
      console.error(colors.red(error));
    }
  }
}

main();
