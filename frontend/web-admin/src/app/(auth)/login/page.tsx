'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, LayoutGrid, Loader2 } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError('Thông tin đăng nhập không chính xác');
      } else {
        router.push('/dashboard');
      }
    } catch (err) {
      setError('Đã có lỗi xảy ra, vui lòng thử lại');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#030712] overflow-hidden">
      {/* Left Side: Information & Visuals */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-16 overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: 'url("/images/login-bg.png")' }}
        />
        <div className="absolute inset-0 z-10 bg-[#030712]/60 backdrop-blur-[2px]" />
        <div className="absolute inset-0 z-10 bg-gradient-to-tr from-[#030712] via-[#030712]/40 to-transparent" />
        
        {/* Content Top */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/5 border border-white/10 text-slate-300 text-[10px] font-bold tracking-[0.2em] mb-10">
             <div className="w-1.5 h-1.5 bg-white rounded-full" />
             NEXUS AI CORE
          </div>
          <h1 className="text-[52px] font-bold text-white leading-[1.1] mb-8 tracking-tight">
            Hệ thống Quản lý Năng <br />
            lượng Thông minh
          </h1>
          <p className="text-slate-400 text-lg max-w-md leading-relaxed font-medium">
            Trực quan hóa dữ liệu thời gian thực, dự báo tiêu thụ bằng AI và điều khiển tự động hóa cho hạ tầng năng lượng quy mô lớn.
          </p>
        </motion.div>

        {/* Browser Window Mockup */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="relative z-20 mt-12 w-[120%] -ml-12"
        >
          <div className="rounded-xl border border-white/10 bg-[#0a0f1e]/80 backdrop-blur-xl shadow-2xl overflow-hidden aspect-[16/10]">
            <div className="h-8 bg-white/5 border-b border-white/10 flex items-center px-4 gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
              <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
              <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
            </div>
            <div className="p-6 h-full bg-gradient-to-br from-transparent to-cyan-500/5 overflow-hidden">
                <div className="grid grid-cols-3 gap-4 h-full content-start">
                   {/* Top Stats */}
                   <div className="p-3 rounded-lg bg-white/5 border border-white/10 space-y-2">
                      <div className="flex justify-between items-start">
                        <div className="w-6 h-6 rounded bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                          <LayoutGrid size={12} />
                        </div>
                        <span className="text-[8px] text-slate-500 font-bold uppercase">Usage</span>
                      </div>
                      <div className="text-sm font-bold text-white">24.5 <span className="text-[10px] text-slate-500">kWh</span></div>
                      <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full w-2/3 bg-cyan-500" />
                      </div>
                   </div>

                   <div className="p-3 rounded-lg bg-white/5 border border-white/10 space-y-2">
                      <div className="flex justify-between items-start">
                        <div className="w-6 h-6 rounded bg-purple-500/20 flex items-center justify-center text-purple-400">
                           <div className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                        </div>
                        <span className="text-[8px] text-slate-500 font-bold uppercase">Active</span>
                      </div>
                      <div className="text-sm font-bold text-white">1,284 <span className="text-[10px] text-slate-500">Units</span></div>
                      <div className="flex gap-1">
                        {[1,2,3,4,5].map(i => <div key={i} className={`h-1 flex-1 rounded-full ${i < 4 ? 'bg-purple-500' : 'bg-white/10'}`} />)}
                      </div>
                   </div>

                   <div className="p-3 rounded-lg bg-white/5 border border-white/10 space-y-2">
                      <div className="flex justify-between items-start">
                        <div className="w-6 h-6 rounded bg-green-500/20 flex items-center justify-center text-green-400 text-[10px] font-bold">
                          AI
                        </div>
                        <span className="text-[8px] text-slate-500 font-bold uppercase">Status</span>
                      </div>
                      <div className="text-sm font-bold text-green-400">Normal</div>
                      <div className="text-[8px] text-slate-500 leading-tight">System stability: 99.8%</div>
                   </div>

                   {/* Main Chart Area */}
                   <div className="col-span-2 p-4 rounded-lg bg-white/5 border border-white/10 space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] text-slate-300 font-bold">Power Distribution (Real-time)</span>
                        <div className="flex gap-2">
                          <div className="w-2 h-2 rounded-full bg-cyan-500" />
                          <div className="w-2 h-2 rounded-full bg-purple-500" />
                        </div>
                      </div>
                      <div className="h-24 flex items-end gap-1.5">
                        {[40, 70, 45, 90, 65, 80, 50, 60, 85, 40, 75, 55, 95, 60].map((h, i) => (
                          <div 
                            key={i} 
                            style={{ height: `${h}%` }} 
                            className={`flex-1 rounded-t-sm transition-all duration-1000 ${i % 3 === 0 ? 'bg-purple-500/40' : 'bg-cyan-500/40'}`} 
                          />
                        ))}
                      </div>
                   </div>

                   {/* Right Side Info */}
                   <div className="p-4 rounded-lg bg-white/5 border border-white/10 space-y-3">
                      <div className="text-[10px] text-slate-300 font-bold">Anomalies Detected</div>
                      <div className="space-y-2">
                        {[1, 2, 3].map(i => (
                          <div key={i} className="flex items-center gap-2">
                            <div className={`w-1.5 h-1.5 rounded-full ${i === 1 ? 'bg-red-500' : 'bg-slate-700'}`} />
                            <div className="flex-1 h-1 bg-white/5 rounded-full" />
                          </div>
                        ))}
                      </div>
                      <div className="pt-2 border-t border-white/5">
                        <div className="text-[8px] text-slate-500">Last updated: 1 min ago</div>
                      </div>
                   </div>
                </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right Side: Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 bg-[#030712]">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-[440px] glass-card p-10 rounded-2xl border-white/5 bg-white/[0.02]"
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl font-semibold text-white mb-3">Đăng nhập hệ thống</h2>
            <p className="text-slate-500 text-sm">Truy cập bảng điều khiển hệ thống</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs text-center"
              >
                {error}
              </motion.div>
            )}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">Địa chỉ Email</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 group-focus-within:text-cyan-500 transition-colors" />
                <input 
                  name="email"
                  type="email" 
                  placeholder="admin@nexus.ai" 
                  className="w-full bg-transparent border border-white/10 rounded-lg py-3.5 pl-12 pr-4 text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">Mật khẩu</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 group-focus-within:text-cyan-500 transition-colors" />
                <input 
                  name="password"
                  type={showPassword ? 'text' : 'password'} 
                  placeholder="••••••••" 
                  className="w-full bg-transparent border border-white/10 rounded-lg py-3.5 pl-12 pr-12 text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all"
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer group">
                <div className="w-4 h-4 rounded border border-white/20 flex items-center justify-center group-hover:border-cyan-500/50 transition-colors">
                    <input type="checkbox" className="hidden" />
                    <div className="w-2 h-2 bg-cyan-500 rounded-sm opacity-0 group-hover:opacity-20 transition-opacity" />
                </div>
                <span className="text-sm text-slate-400">Ghi nhớ đăng nhập</span>
              </label>
              <Link href="/forgot-password" title="Quên mật khẩu?" className="text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors">
                Quên mật khẩu?
              </Link>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full py-4 px-4 rounded-xl font-bold text-white bg-gradient-to-r from-cyan-400 to-purple-600 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
            >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    Tiếp tục
                    <span className="text-lg">→</span>
                  </>
                )}
            </button>
          </form>

          <div className="relative my-10">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/5"></div>
            </div>
            <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-widest">
              <span className="bg-[#0b101f] px-4 text-slate-600">Hoặc</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-3 w-full py-3 px-4 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.08] transition-all text-xs font-bold text-slate-300">
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Google
            </button>
            <button className="flex items-center justify-center gap-3 w-full py-3 px-4 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.08] transition-all text-xs font-bold text-slate-300">
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                 <path fill="currentColor" d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zM24 11.4H12.6V0H24v11.4z" />
              </svg>
              Microsoft
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
