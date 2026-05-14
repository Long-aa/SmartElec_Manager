'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Cpu, 
  Box, 
  Wrench, 
  Users, 
  Briefcase, 
  Zap, 
  BarChart3, 
  Settings,
  LogOut,
  ChevronLeft,
  Bell
} from 'lucide-react';
import { signOut } from 'next-auth/react';

const menuItems = [
  { group: 'Overview', items: [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
  ]},
  { group: 'Management', items: [
    { name: 'Devices', icon: Cpu, href: '/dashboard/devices' },
    { name: 'Inventory', icon: Box, href: '/dashboard/inventory' },
    { name: 'Maintenance', icon: Wrench, href: '/dashboard/maintenance', important: true },
    { name: 'Technicians', icon: Users, href: '/dashboard/technicians' },
    { name: 'Customers', icon: Briefcase, href: '/dashboard/customers' },
  ]},
  { group: 'Intelligence', items: [
    { name: 'AI Monitoring', icon: Zap, href: '/dashboard/ai-monitoring' },
    { name: 'Analytics', icon: BarChart3, href: '/dashboard/analytics' },
  ]},
  { group: 'System', items: [
    { name: 'Reports', icon: BarChart3, href: '/dashboard/reports' },
    { name: 'Settings', icon: Settings, href: '/dashboard/settings' },
  ]}
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  return (
    <aside 
      className={`relative h-screen transition-all duration-300 flex flex-col border-r ${isCollapsed ? 'w-20' : 'w-72'}`}
      style={{ backgroundColor: 'var(--sidebar-bg)', borderColor: 'var(--sidebar-border)' }}
    >
      {/* Logo */}
      <div className="p-6 flex items-center gap-3 border-b" style={{ borderColor: 'var(--sidebar-border)' }}>
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center shrink-0 shadow-lg shadow-cyan-500/20">
          <Zap className="text-white w-6 h-6" />
        </div>
        {!isCollapsed && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-bold text-xl tracking-tight"
            style={{ color: 'var(--text-primary)' }}
          >
            SmartElec
          </motion.div>
        )}
      </div>

      {/* Collapse Button */}
      <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-24 w-6 h-6 rounded-full border flex items-center justify-center transition-all z-50 shadow-xl"
        style={{ backgroundColor: 'var(--background)', borderColor: 'var(--sidebar-border)', color: 'var(--text-muted)' }}
      >
        <ChevronLeft className={`w-3.5 h-3.5 transition-transform ${isCollapsed ? 'rotate-180' : ''}`} />
      </button>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto px-4 py-8 space-y-10 scrollbar-hide">
        {menuItems.map((group, idx) => (
          <div key={idx} className="space-y-4">
            {!isCollapsed && (
              <h3 className="px-4 text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: 'var(--text-muted)' }}>
                {group.group}
              </h3>
            )}
            <div className="space-y-1.5">
              {group.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link 
                    key={item.name}
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all group relative ${
                      isActive 
                        ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/10' 
                        : 'text-slate-500 hover:bg-black/5 dark:hover:bg-white/5'
                    }`}
                  >
                    <item.icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-cyan-400' : 'group-hover:text-cyan-500'} transition-colors`} />
                    {!isCollapsed && (
                      <span className={`text-[13px] font-bold ${isActive ? 'text-cyan-400' : 'group-hover:text-slate-300'}`}>{item.name}</span>
                    )}
                    {item.important && !isCollapsed && (
                      <span className="ml-auto w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
                    )}
                    {isActive && (
                      <motion.div 
                        layoutId="sidebar-active"
                        className="absolute left-0 w-1 h-6 bg-cyan-500 rounded-r-full shadow-[0_0_12px_rgba(34,211,238,0.5)]"
                      />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-4 border-t space-y-2" style={{ borderColor: 'var(--sidebar-border)' }}>
        <button 
          onClick={() => signOut()}
          className={`flex items-center gap-3 px-4 py-3.5 w-full rounded-2xl text-slate-500 hover:bg-red-500/10 hover:text-red-400 transition-all ${isCollapsed ? 'justify-center' : ''}`}
        >
          <LogOut className="w-5 h-5" />
          {!isCollapsed && <span className="text-[13px] font-bold">Đăng xuất</span>}
        </button>
      </div>
    </aside>
  );
}
