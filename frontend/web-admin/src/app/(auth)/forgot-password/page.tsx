'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft, RefreshCw } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="flex min-h-screen bg-[#030712] items-center justify-center p-6 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/5 blur-[120px] rounded-full pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-[440px] z-10"
      >
        <div className="glass-card p-10 rounded-2xl border-white/5 bg-white/[0.02] space-y-8 relative overflow-hidden">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-500 mb-2">
              <RefreshCw className={`w-8 h-8 ${!isSubmitted ? 'animate-spin-slow' : ''}`} />
            </div>
            <h2 className="text-3xl font-semibold text-white">Quên mật khẩu?</h2>
            <p className="text-slate-500 text-sm">
              {isSubmitted 
                ? 'Chúng tôi đã gửi liên kết khôi phục tới email của bạn.' 
                : 'Nhập email của bạn để nhận liên kết khôi phục mật khẩu.'}
            </p>
          </div>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">Địa chỉ Email</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 group-focus-within:text-cyan-500 transition-colors" />
                  <input 
                    type="email" 
                    placeholder="admin@nexus-ai.corp" 
                    className="w-full bg-transparent border border-white/10 rounded-lg py-3.5 pl-12 pr-4 text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all"
                    required
                  />
                </div>
              </div>

              <button type="submit" className="w-full py-4 px-4 rounded-xl font-bold text-white bg-gradient-to-r from-cyan-400 to-purple-600 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all flex items-center justify-center gap-2">
                  Gửi liên kết khôi phục
                  <span className="text-lg">→</span>
              </button>
            </form>
          ) : (
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-center text-sm"
            >
              Vui lòng kiểm tra hộp thư đến của bạn.
            </motion.div>
          )}

          <div className="pt-2 text-center">
            <Link 
              href="/login" 
              className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Quay lại Đăng nhập
            </Link>
          </div>
        </div>

        {/* Footer Branding */}
        <div className="mt-8 text-center">
          <div className="text-xl font-bold text-white tracking-tight">
            Nexus <span className="text-cyan-500">AI</span>
          </div>
          <p className="text-[10px] text-slate-600 uppercase tracking-[0.2em] mt-1 font-bold">Security Vault</p>
        </div>
      </motion.div>
    </div>
  );
}
