import express from 'express';
import chatController from '../controllers/chatController.js';

const router = express.Router();

router.post('/history', chatController.getChatHistory);
router.post('/prompt', chatController.sendPrompt);

export default router;
