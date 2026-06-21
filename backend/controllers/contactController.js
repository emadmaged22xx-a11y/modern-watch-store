// ============================================
// Contact Controller - التحكم في رسائل التواصل
// ============================================
// يتعامل مع إرسال وحفظ رسائل التواصل مع المتجر

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const messagesPath = path.join(__dirname, '../data/messages.json');

const readMessages = () => {
  const data = fs.readFileSync(messagesPath, 'utf-8');
  return JSON.parse(data);
};

const writeMessages = (messages) => {
  fs.writeFileSync(messagesPath, JSON.stringify(messages, null, 2), 'utf-8');
};

// POST /api/contact - إرسال رسالة جديدة
export const createMessage = (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'جميع الحقول مطلوبة' });
    }
    const messages = readMessages();
    const newMessage = {
      id: messages.length > 0 ? Math.max(...messages.map((m) => m.id)) + 1 : 1,
      name,
      email,
      message,
      createdAt: new Date().toISOString(),
    };
    messages.push(newMessage);
    writeMessages(messages);
    res.status(201).json({ success: true, data: newMessage });
  } catch (error) {
    res.status(500).json({ success: false, message: 'خطأ في حفظ الرسالة' });
  }
};

// GET /api/contact - جلب جميع الرسائل
export const getAllMessages = (req, res) => {
  try {
    const messages = readMessages();
    // ترتيب الرسائل من الأحدث إلى الأقدم
    messages.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    res.json({ success: true, data: messages });
  } catch (error) {
    res.status(500).json({ success: false, message: 'خطأ في قراءة الرسائل' });
  }
};
