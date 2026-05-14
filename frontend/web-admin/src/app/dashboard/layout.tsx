'use client';

import React from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import { Bell, Search, Sun, Moon } from 'lucide-react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = React.useState('dark');

  React.useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <div className="flex h-screen overflow-hidden" style={{ backgroundColor: 'var(--background)' }}>
      <Sidebar />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Background Grid Decoration */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-20" 
             style={{ backgroundImage: theme === 'dark' ? 'radial-gradient(#22d3ee 0.5px, transparent 0.5px)' : 'radial-gradient(#64748b 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }} 
        />
        
        {/* Top Header */}
        <header className="h-16 border-b flex items-center justify-between px-8 backdrop-blur-md z-30" style={{ backgroundColor: 'var(--header-bg)', borderColor: 'var(--sidebar-border)' }}>
          <div className="relative w-96 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-cyan-500 transition-colors" />
            <input 
              type="text" 
              placeholder="Tìm kiếm thiết bị, khách hàng, phiếu sửa..." 
              className="w-full border rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-cyan-500/50 transition-all"
              style={{ backgroundColor: 'var(--input-bg)', borderColor: 'var(--input-border)', color: 'var(--text-primary)' }}
            />
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={toggleTheme}
              className="p-2.5 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-all relative group"
              style={{ color: 'var(--text-secondary)' }}
            >
              {theme === 'dark' ? <Sun className="w-5 h-5 text-orange-400" /> : <Moon className="w-5 h-5 text-blue-600" />}
            </button>

            <button className="relative p-2.5 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-all" style={{ color: 'var(--text-secondary)' }}>
              <Bell className="w-5 h-5" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2" style={{ borderColor: 'var(--background)' }} />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-8 scrollbar-hide">
          {children}
        </main>
      </div>
    </div>
  );
}
