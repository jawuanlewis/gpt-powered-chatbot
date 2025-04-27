import express from 'express';
import chatController from '../controllers/chatController.js';

const router = express.Router();

router.get('/history', chatController.getChatHistory);
router.post('/prompt', chatController.handlePrompt);

export default router;
