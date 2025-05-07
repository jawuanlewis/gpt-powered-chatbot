import express, { RequestHandler } from 'express';
import chatController from '../controllers/chatController.js';

const router = express.Router();

router.get('/history', chatController.getChatHistory as RequestHandler);
router.post('/prompt', chatController.handlePrompt as RequestHandler);

export default router;
