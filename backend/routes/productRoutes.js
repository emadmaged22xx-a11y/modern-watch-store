// ============================================
// Product Routes - مسارات المنتجات
// ============================================
import { Router } from 'express';
import {
  getAllProducts,
  getProductById,
  createProduct,
  deleteProduct,
} from '../controllers/productController.js';

const router = Router();

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', createProduct);
router.delete('/:id', deleteProduct);

export default router;
