// ============================================
// Product Controller - التحكم في المنتجات
// ============================================
// يتعامل مع جميع العمليات الخاصة بالمنتجات (قراءة، إضافة، حذف)

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// الحصول على المسار الحالي للملف (ضروري في ESM)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// مسار ملف بيانات المنتجات
const productsPath = path.join(__dirname, '../data/products.json');

// دالة مساعدة لقراءة البيانات من الملف
const readProducts = () => {
  const data = fs.readFileSync(productsPath, 'utf-8');
  return JSON.parse(data);
};

// دالة مساعدة لكتابة البيانات في الملف
const writeProducts = (products) => {
  fs.writeFileSync(productsPath, JSON.stringify(products, null, 2), 'utf-8');
};

// GET /api/products - جلب جميع المنتجات
export const getAllProducts = (req, res) => {
  try {
    const products = readProducts();
    res.json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: 'خطأ في قراءة المنتجات' });
  }
};

// GET /api/products/:id - جلب منتج واحد حسب المعرف
export const getProductById = (req, res) => {
  try {
    const products = readProducts();
    const product = products.find((p) => p.id === Number(req.params.id));
    if (!product) {
      return res.status(404).json({ success: false, message: 'المنتج غير موجود' });
    }
    res.json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: 'خطأ في قراءة المنتج' });
  }
};

// POST /api/products - إضافة منتج جديد
export const createProduct = (req, res) => {
  try {
    const products = readProducts();
    const newProduct = {
      id: products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1,
      ...req.body,
      inStock: req.body.inStock ?? true,
    };
    products.push(newProduct);
    writeProducts(products);
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: 'خطأ في إضافة المنتج' });
  }
};

// DELETE /api/products/:id - حذف منتج
export const deleteProduct = (req, res) => {
  try {
    const products = readProducts();
    const index = products.findIndex((p) => p.id === Number(req.params.id));
    if (index === -1) {
      return res.status(404).json({ success: false, message: 'المنتج غير موجود' });
    }
    const deleted = products.splice(index, 1);
    writeProducts(products);
    res.json({ success: true, data: deleted[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: 'خطأ في حذف المنتج' });
  }
};
