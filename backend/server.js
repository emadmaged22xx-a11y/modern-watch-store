// ============================================
// Main Server - الخادم الرئيسي
// ============================================
// نقطة البداية للخادم الخلفي (Backend)
// يستمع على المنفذ 5000 ويوفر REST API للواجهة الأمامية

import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import productRoutes from './routes/productRoutes.js';
import contactRoutes from './routes/contactRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;

// تفعيل CORS للسماح للواجهة الأمامية بالتواصل مع الخادم
app.use(cors({ origin: '*' }));

// تفعيل معالجة JSON في الطلبات
app.use(express.json());

// ============================================
// Routes - المسارات
// ============================================
app.use('/api/products', productRoutes);
app.use('/api/contact', contactRoutes);

// صفحة رئيسية للـ API
app.get('/api', (req, res) => {
  res.json({
    message: 'مرحباً بك في API متجر الساعات الحديثة',
    endpoints: {
      products: '/api/products',
      contact: '/api/contact',
    },
  });
});

// ============================================
// Start Server - تشغيل الخادم
// ============================================
app.listen(PORT, () => {
  console.log(`✅ الخادم يعمل على: http://localhost:${PORT}`);
  console.log(`📦 API المنتجات: http://localhost:${PORT}/api/products`);
  console.log(`📧 API التواصل: http://localhost:${PORT}/api/contact`);
});
