import { useEffect, useState } from 'react';
import { Package, MessageSquare, Trash2, AlertCircle, Tag } from 'lucide-react';
import { getProducts, getMessages, deleteProduct, Product, Message } from '../services/api';

export default function Admin() {
  const [products, setProducts] = useState<Product[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleting, setDeleting] = useState<number | null>(null);

  useEffect(() => {
    setLoading(true);
    setError('');
    Promise.all([getProducts(), getMessages()])
      .then(([productsData, messagesData]) => {
        setProducts(productsData);
        setMessages(messagesData);
      })
      .catch(() => setError('تأكد من تشغيل الخادم (npm run server)'))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('هل أنت متأكد من حذف هذا المنتج؟')) return;
    setDeleting(id);
    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch {
      alert('خطأ في حذف المنتج');
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div>
      <section className="bg-gradient-to-br from-gray-800 to-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">لوحة الإدارة</h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            صفحة بسيطة لعرض إحصائيات المتجر وإدارة المنتجات والرسائل
          </p>
        </div>
      </section>

      <section className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl mb-6 flex items-center gap-3">
            <AlertCircle className="w-5 h-5" />
            <span>{error}</span>
          </div>
        )}

        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block w-10 h-10 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
          </div>
        ) : (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-sm p-6 flex items-center gap-4 border border-gray-100">
                <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center">
                  <Package className="w-7 h-7 text-blue-600" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">عدد المنتجات</p>
                  <p className="text-3xl font-bold text-gray-900">{products.length}</p>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6 flex items-center gap-4 border border-gray-100">
                <div className="w-14 h-14 rounded-full bg-amber-50 flex items-center justify-center">
                  <Tag className="w-7 h-7 text-amber-600" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">عدد التصنيفات</p>
                  <p className="text-3xl font-bold text-gray-900">{new Set(products.map((p) => p.category)).size}</p>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6 flex items-center gap-4 border border-gray-100">
                <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center">
                  <MessageSquare className="w-7 h-7 text-emerald-600" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">عدد الرسائل</p>
                  <p className="text-3xl font-bold text-gray-900">{messages.length}</p>
                </div>
              </div>
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-bold text-gray-900">إدارة المنتجات</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 text-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-right font-semibold">المعرف</th>
                      <th className="px-6 py-3 text-right font-semibold">الاسم</th>
                      <th className="px-6 py-3 text-right font-semibold">التصنيف</th>
                      <th className="px-6 py-3 text-right font-semibold">السعر</th>
                      <th className="px-6 py-3 text-right font-semibold">التوفر</th>
                      <th className="px-6 py-3 text-right font-semibold">العمليات</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {products.map((product) => (
                      <tr key={product.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-gray-500">{product.id}</td>
                        <td className="px-6 py-4 font-medium text-gray-900">{product.name}</td>
                        <td className="px-6 py-4">
                          <span className="text-xs font-medium bg-primary-50 text-primary-600 px-2 py-1 rounded">
                            {product.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-700">{product.price.toLocaleString()} ل.س</td>
                        <td className="px-6 py-4">
                          <span
                            className={`text-xs font-medium px-2 py-1 rounded ${
                              product.inStock
                                ? 'bg-green-50 text-green-600'
                                : 'bg-red-50 text-red-600'
                            }`}
                          >
                            {product.inStock ? 'متوفر' : 'غير متوفر'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => handleDelete(product.id)}
                            disabled={deleting === product.id}
                            className="text-red-500 hover:text-red-700 transition-colors disabled:opacity-50"
                            title="حذف المنتج"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {products.length === 0 && (
                      <tr>
                        <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                          لا توجد منتجات
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Messages Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-bold text-gray-900">آخر الرسائل المستلمة</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 text-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-right font-semibold">المعرف</th>
                      <th className="px-6 py-3 text-right font-semibold">الاسم</th>
                      <th className="px-6 py-3 text-right font-semibold">البريد</th>
                      <th className="px-6 py-3 text-right font-semibold">الرسالة</th>
                      <th className="px-6 py-3 text-right font-semibold">التاريخ</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {messages.map((msg) => (
                      <tr key={msg.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-gray-500">{msg.id}</td>
                        <td className="px-6 py-4 font-medium text-gray-900">{msg.name}</td>
                        <td className="px-6 py-4 text-gray-600">{msg.email}</td>
                        <td className="px-6 py-4 text-gray-700 max-w-xs truncate">{msg.message}</td>
                        <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                          {new Date(msg.createdAt).toLocaleString('ar-SY')}
                        </td>
                      </tr>
                    ))}
                    {messages.length === 0 && (
                      <tr>
                        <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                          لا توجد رسائل
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </section>
    </div>
  );
}
