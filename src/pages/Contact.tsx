import { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import { createMessage } from '../services/api';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError('');
    setSuccess(false);
    try {
      await createMessage(form);
      setSuccess(true);
      setForm({ name: '', email: '', message: '' });
    } catch {
      setError('تأكد من تشغيل الخادم (npm run server)');
    } finally {
      setSending(false);
    }
  };

  return (
    <div>
      <section className="bg-gradient-to-br from-primary-800 to-primary-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">تواصل معنا</h1>
          <p className="text-primary-100 text-lg max-w-2xl mx-auto">
            نحن هنا لمساعدتك. أرسل لنا رسالتك وسنرد عليك في أقرب وقت.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-gray-50 rounded-xl p-6 text-center">
              <Phone className="w-8 h-8 text-primary-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-1">اتصل بنا</h3>
              <p className="text-gray-600 text-sm">+963 933 123 456</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 text-center">
              <Mail className="w-8 h-8 text-primary-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-1">البريد الإلكتروني</h3>
              <p className="text-gray-600 text-sm">info@modernwatchsyria.com</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 text-center">
              <MapPin className="w-8 h-8 text-primary-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-1">العنوان</h3>
              <p className="text-gray-600 text-sm">دمشق، سوريا</p>
            </div>
          </div>

          <div className="max-w-2xl mx-auto">
            {success && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-6 py-4 rounded-xl mb-6 flex items-center gap-3">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">تم إرسال رسالتك بنجاح! شكراً لتواصلك معنا.</span>
              </div>
            )}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl mb-6">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit} className="bg-gray-50 rounded-xl p-8 space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  الاسم الكامل
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
                  placeholder="أدخل اسمك"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  البريد الإلكتروني
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
                  placeholder="example@email.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  الرسالة
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white resize-none"
                  placeholder="اكتب رسالتك هنا..."
                />
              </div>
              <button
                type="submit"
                disabled={sending}
                className="w-full inline-flex items-center justify-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                {sending ? 'جاري الإرسال...' : 'إرسال الرسالة'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
