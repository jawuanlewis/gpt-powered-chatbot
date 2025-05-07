import { Request, Response } from 'express';
import { Message } from '../types/chat.js';
import openai from '../config/open-ai.js';

const chatController = {
  getChatHistory: async (req: Request, res: Response) => {
    try {
      // const chats = [
      //   {
      //     id: 1,
      //     title: 'Chat 1',
      //     messages: [
      //       { id: 1, role: 'user', content: 'Hello' },
      //       { id: 2, role: 'assistant', content: 'Hello! How can I help you?' },
      //       { id: 3, role: 'user', content: 'What is the capital of Arizona?' },
      //       {
      //         id: 4,
      //         role: 'assistant',
      //         content: 'The capital of Arizona is Phoenix.',
      //       },
      //     ],
      //   },
      //   {
      //     id: 2,
      //     title: 'Chat 2',
      //     messages: [
      //       { id: 1, role: 'user', content: 'Wassup' },
      //       {
      //         id: 2,
      //         role: 'assistant',
      //         content: 'Wassup! Do you have any questions for me?',
      //       },
      //       { id: 3, role: 'user', content: 'What is the US population?' },
      //       {
      //         id: 4,
      //         role: 'assistant',
      //         content:
      //           'The population of the United States is about 340 million.',
      //       },
      //       {
      //         id: 5,
      //         role: 'user',
      //         content: 'Cool, what is the Antarctica population?',
      //       },
      //       {
      //         id: 6,
      //         role: 'assistant',
      //         content:
      //           'Nice one! Antarctica has no permanent human population, but the population fluctuates seasonally with researchers and scientists, reaching around 5,000 people during the summer months and dropping to approximately 1,000 during winter.',
      //       },
      //     ],
      //   },
      // ];
      res.json({ chatHistory: req.session.chats || [] });
    } catch (error) {
      console.error('(Server) Error getting chat history:', error);
      res.status(500).json({ error: 'Failed to get chat history' });
    }
  },

  handlePrompt: async (req: Request, res: Response) => {
    try {
      const { chat, prompt } = req.body;
      let chats = req.session.chats || [];
      let chatIndex;

      // Add user's prompt to chat history accordingly
      if (chat === null) {
        // Null signifies a new chat
        chatIndex = chats.length;
        chats.push({
          id: chatIndex,
          title: `Chat ${chatIndex + 1}`,
          messages: [{ id: 0, role: 'user', content: prompt }],
        });
      } else {
        chatIndex = chats.findIndex((c) => c.id === chat.id);
        if (chatIndex === -1) {
          return res.status(404).json({
            error: '(Server) handlePrompt: Chat not found in session',
          });
        }
        chats[chatIndex].messages.push({
          id: chats[chatIndex].messages.length,
          role: 'user',
          content: prompt,
        });
      }

      const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: chats[chatIndex].messages.map((msg: Message) => ({
          role: msg.role as 'user' | 'assistant',
          content: msg.content,
        })),
      });

      const completionText = completion.choices[0].message.content;
      if (!completionText) {
        throw new Error('(Server) No response from the OpenAI model');
      }

      chats[chatIndex].messages.push({
        id: chats[chatIndex].messages.length,
        role: 'assistant',
        content: completionText,
      });

      req.session.chats = chats;
      res.json({ chat: chats[chatIndex] });
    } catch (error) {
      console.error('(Server) Error handling user prompt:', error);
    }
  },
};

export default chatController;
