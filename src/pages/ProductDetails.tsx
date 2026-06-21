import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowRight, MapPin, Package, Tag } from 'lucide-react';
import { getProductById, Product } from '../services/api';

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError('');
    getProductById(Number(id))
      .then((data) => setProduct(data))
      .catch(() => setError('تأكد من تشغيل الخادم (npm run server)'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="inline-block w-10 h-10 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-8 rounded-xl inline-block">
          <p className="font-semibold mb-2">خطأ في تحميل المنتج</p>
          <p className="text-sm">{error || 'المنتج غير موجود'}</p>
          <Link
            to="/products"
            className="inline-block mt-4 text-primary-600 hover:text-primary-700 font-medium"
          >
            العودة للمنتجات
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link to="/" className="hover:text-primary-600">الرئيسية</Link>
        <span>/</span>
        <Link to="/products" className="hover:text-primary-600">المنتجات</Link>
        <span>/</span>
        <span className="text-gray-900 font-medium">{product.name}</span>
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="grid md:grid-cols-2 gap-0">
          {/* صورة المنتج */}
          <div className="h-80 md:h-auto bg-gray-100">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* معلومات المنتج */}
          <div className="p-8 md:p-10 flex flex-col">
            <span className="inline-block self-start text-sm font-medium text-primary-600 bg-primary-50 px-3 py-1 rounded-full mb-4">
              {product.category}
            </span>

            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>

            <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>

            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-2 text-gray-700">
                <MapPin className="w-5 h-5 text-primary-500" />
                <span className="font-medium">بلد المنشأ:</span>
                <span>{product.country}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <Package className="w-5 h-5 text-primary-500" />
                <span className="font-medium">حالة التوفر:</span>
                <span
                  className={`font-medium ${product.inStock ? 'text-green-600' : 'text-red-600'}`}
                >
                  {product.inStock ? 'متوفر في المخزن' : 'غير متوفر حالياً'}
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <Tag className="w-5 h-5 text-primary-500" />
                <span className="font-medium">التصنيف:</span>
                <span>{product.category}</span>
              </div>
            </div>

            <div className="mt-auto pt-6 border-t border-gray-100">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <span className="text-3xl font-bold text-primary-700">
                  {product.price.toLocaleString()} ر.س
                </span>
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 text-gray-500 hover:text-primary-600 font-medium transition-colors"
                >
                  <ArrowRight className="w-4 h-4" />
                  العودة للمنتجات
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
