import { Request, Response } from 'express';
import { nanoid } from 'nanoid';
import { IMessage } from '../types/chat.js';
import Chat from '../models/Chat.js';
import openai from '../config/open-ai.js';

const chatController = {
  getChatHistory: async (req: Request, res: Response) => {
    try {
      const userId = req.sessionID;
      const chats = await Chat.find({ userId }).sort({ updatedAt: -1 }); // optional sort
      return res.json({ chatHistory: chats });
    } catch (error) {
      console.error('(Server) Error getting chat history:', error);
      return res.status(500).json({ error: 'Failed to get chat history.' });
    }
  },

  handlePrompt: async (req: Request, res: Response) => {
    try {
      const { chat, prompt } = req.body;
      const userId = req.sessionID;

      if (!prompt || typeof prompt !== 'string') {
        return res
          .status(400)
          .json({ error: '(Server) Prompt is required and must be a string.' });
      }

      let chatDoc;
      const newMessage: IMessage = {
        id: nanoid(),
        role: 'user',
        content: prompt,
      };

      if (!chat || !chat.id) {
        /*** Create new chat ***/
        chatDoc = await Chat.create({
          id: nanoid(),
          userId,
          title: `Chat ${Date.now()}`,
          messages: [newMessage],
        });
      } else {
        /*** Update existing chat ***/
        chatDoc = await Chat.findOne({ id: chat.id, userId });

        if (!chatDoc) {
          return res
            .status(404)
            .json({ error: '(Server) Chat not found for this session.' });
        }

        chatDoc.messages.push(newMessage);
      }

      /*** Generate assistant response ***/
      const messagesForAssistant = chatDoc.messages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      }));

      const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: messagesForAssistant,
      });

      const completionText = completion.choices[0].message.content;
      if (!completionText) {
        throw new Error('(Server) No response from the model.');
      }

      /*** Add assistant's message ***/
      const assistantMessage: IMessage = {
        id: nanoid(),
        role: 'assistant',
        content: completionText,
      };

      chatDoc.messages.push(assistantMessage);
      await chatDoc.save();

      return res.json({ chat: chatDoc });
    } catch (error) {
      console.error('(Server) Error handling user prompt:', error);
      return res.status(500).json({ error: 'Failed to process user prompt.' });
    }
  },
};

export default chatController;
