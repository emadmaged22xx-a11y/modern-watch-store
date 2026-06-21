// ============================================
// Contact Routes - مسارات رسائل التواصل
// ============================================
import { Router } from 'express';
import { createMessage, getAllMessages } from '../controllers/contactController.js';

const router = Router();

router.post('/', createMessage);
router.get('/', getAllMessages);

export default router;
