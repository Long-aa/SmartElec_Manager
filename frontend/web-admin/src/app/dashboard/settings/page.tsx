'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Settings, 
  User, 
  Lock, 
  Bell, 
  Globe, 
  Shield, 
  Database, 
  ChevronRight,
  Camera,
  Mail,
  Smartphone,
  CreditCard,
  History,
  Terminal,
  LogOut,
  Moon,
  Sun,
  Laptop,
  CheckCircle2,
  AlertTriangle,
  Eye,
  EyeOff,
  Plus,
  Trash2,
  ExternalLink,
  Cpu,
  Monitor,
  Zap,
  RefreshCcw,
  Key,
  Share2
} from 'lucide-react';

const settingTabs = [
  { id: 'account', label: 'Hồ sơ & Tài khoản', icon: User },
  { id: 'general', label: 'Cấu hình hệ thống', icon: Settings },
  { id: 'notifications', label: 'Thông báo', icon: Bell },
  { id: 'security', label: 'Phân quyền & Bảo mật', icon: Shield },
  { id: 'integrations', label: 'Kết nối & API', icon: Terminal }
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = React.useState('account');

  return (
    <div className="flex h-full -m-8">
      {/* Settings Navigation Sidebar */}
      <div className="w-80 bg-[#030712] border-r border-white/5 p-8 flex flex-col gap-10">
         <div className="space-y-1 px-4">
            <h1 className="text-3xl font-bold text-white tracking-tight">Cài đặt</h1>
            <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest leading-relaxed">Quản lý tài khoản và cấu hình hệ thống SmartElec.</p>
         </div>

         <nav className="space-y-2 flex-1">
            {settingTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all relative group ${
                  activeTab === tab.id ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                {activeTab === tab.id && (
                  <motion.div layoutId="setting-nav-glow" className="absolute inset-0 bg-cyan-500/5 blur-xl rounded-2xl" />
                )}
                <tab.icon size={18} className={`${activeTab === tab.id ? 'text-cyan-400' : 'text-slate-600 group-hover:text-slate-300'}`} />
                <span className="text-xs font-bold tracking-wide">{tab.label}</span>
                {activeTab === tab.id && <div className="absolute right-4 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,1)]" />}
              </button>
            ))}
         </nav>

         <button className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-slate-500 text-[10px] font-bold uppercase tracking-widest hover:text-red-500 hover:bg-red-500/10 hover:border-red-500/20 transition-all flex items-center justify-center gap-3">
            <LogOut size={16} /> Đăng xuất phiên làm việc
         </button>
      </div>

      {/* Settings Content Area */}
      <div className="flex-1 overflow-y-auto bg-[#030712] p-12 space-y-12 custom-scrollbar">
         <AnimatePresence mode="wait">
            <motion.div
               key={activeTab}
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, x: -20 }}
               transition={{ duration: 0.3 }}
            >
               {activeTab === 'account' && <AccountSettings />}
               {activeTab === 'general' && <GeneralSettings />}
               {activeTab === 'notifications' && <NotificationSettings />}
               {activeTab === 'security' && <SecuritySettings />}
               {activeTab === 'integrations' && <IntegrationSettings />}
            </motion.div>
         </AnimatePresence>
      </div>
    </div>
  );
}

// --- TAB: ACCOUNT ---
function AccountSettings() {
  return (
    <div className="max-w-4xl space-y-12">
       <div className="flex items-center gap-10">
          <div className="relative group">
             <div className="w-32 h-32 rounded-[40px] bg-slate-800 border-4 border-white/5 overflow-hidden group-hover:border-cyan-500/50 transition-all">
                <img src="https://ui-avatars.com/api/?name=Admin+SmartElec&background=0a0f1e&color=fff&size=200" alt="Avatar" className="w-full h-full object-cover" />
             </div>
             <button className="absolute -bottom-2 -right-2 p-3 rounded-2xl bg-cyan-500 text-slate-900 shadow-xl shadow-cyan-500/30 hover:scale-110 transition-all">
                <Camera size={18} />
             </button>
          </div>
          <div className="space-y-2">
             <h2 className="text-3xl font-bold text-white tracking-tight">Admin SmartElec</h2>
             <div className="flex items-center gap-4">
                <span className="px-3 py-1 rounded-lg bg-cyan-500/10 text-cyan-400 text-[10px] font-bold border border-cyan-500/20 uppercase tracking-widest">Administrator</span>
                <span className="text-slate-600 text-[11px] font-medium flex items-center gap-2"><Globe size={12} /> Zone Alpha - TP. Hồ Chí Minh</span>
             </div>
          </div>
       </div>

       <div className="glass-card p-10 rounded-[48px] border-white/5 space-y-10">
          <div className="flex items-center gap-3 text-white font-bold">
             <User size={20} className="text-cyan-400" /> Thông tin cá nhân
          </div>
          <div className="grid grid-cols-2 gap-10">
             <div className="space-y-3">
                <label className="text-[10px] text-slate-500 font-bold uppercase tracking-widest ml-1">Họ và tên</label>
                <input type="text" defaultValue="Admin SmartElec" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-cyan-500/50" />
             </div>
             <div className="space-y-3">
                <label className="text-[10px] text-slate-500 font-bold uppercase tracking-widest ml-1">Email liên hệ</label>
                <input type="email" defaultValue="admin@smartelec.vn" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white" />
             </div>
             <div className="space-y-3">
                <label className="text-[10px] text-slate-500 font-bold uppercase tracking-widest ml-1">Số điện thoại</label>
                <input type="text" defaultValue="+84 901 234 567" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white" />
             </div>
             <div className="space-y-3">
                <label className="text-[10px] text-slate-500 font-bold uppercase tracking-widest ml-1">Chức vụ</label>
                <input type="text" defaultValue="Quản trị viên cấp cao" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white" />
             </div>
          </div>
          <div className="pt-6 border-t border-white/5 flex justify-end">
             <button className="px-8 py-4 rounded-2xl bg-cyan-500 text-slate-900 font-bold text-xs shadow-xl shadow-cyan-500/20 hover:scale-105 transition-all">Lưu thay đổi hồ sơ</button>
          </div>
       </div>

       <div className="glass-card p-10 rounded-[48px] border-white/5 space-y-10">
          <div className="flex items-center gap-3 text-white font-bold">
             <Lock size={20} className="text-purple-400" /> Thay đổi mật khẩu
          </div>
          <div className="grid grid-cols-3 gap-8">
             <div className="space-y-3">
                <label className="text-[10px] text-slate-500 font-bold uppercase tracking-widest ml-1">Mật khẩu hiện tại</label>
                <div className="relative">
                   <input type="password" placeholder="••••••••" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white" />
                   <button className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 hover:text-white"><Eye size={18} /></button>
                </div>
             </div>
             <div className="space-y-3">
                <label className="text-[10px] text-slate-500 font-bold uppercase tracking-widest ml-1">Mật khẩu mới</label>
                <input type="password" placeholder="••••••••" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white" />
             </div>
             <div className="space-y-3">
                <label className="text-[10px] text-slate-500 font-bold uppercase tracking-widest ml-1">Xác nhận mật khẩu</label>
                <input type="password" placeholder="••••••••" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white" />
             </div>
          </div>
          <div className="pt-6 border-t border-white/5 flex justify-between items-center">
             <p className="text-[10px] text-slate-600 font-medium italic">Yêu cầu ít nhất 12 ký tự, bao gồm chữ hoa và ký tự đặc biệt.</p>
             <button className="px-8 py-4 rounded-2xl border border-purple-500/30 text-purple-400 font-bold text-xs hover:bg-purple-500/10 transition-all">Cập nhật mật khẩu</button>
          </div>
       </div>
    </div>
  );
}

// --- TAB: GENERAL ---
function GeneralSettings() {
  return (
    <div className="max-w-4xl space-y-10">
       <div className="glass-card p-12 rounded-[56px] border-white/5 space-y-12">
          <div className="flex items-center gap-4 text-white font-bold">
             <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                <Globe size={24} />
             </div>
             <h3 className="text-2xl tracking-tight">Cấu hình Hệ thống & Vùng</h3>
          </div>

          <div className="space-y-10">
             <SettingItem title="Ngôn ngữ hiển thị" desc="Ngôn ngữ chính sử dụng trong toàn bộ dashboard." icon={Globe}>
                <select className="bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-[11px] font-bold text-white appearance-none focus:outline-none focus:border-cyan-500/50 min-w-[180px]">
                   <option>Tiếng Việt (VN)</option>
                   <option>English (US)</option>
                </select>
             </SettingItem>

             <SettingItem title="Chế độ giao diện" desc="Tùy chỉnh giao diện sáng/tối hoặc theo hệ thống." icon={Moon}>
                <div className="flex p-1 bg-white/5 rounded-xl border border-white/5">
                   <button className="p-3 rounded-lg bg-white/10 text-white shadow-xl"><Moon size={16} /></button>
                   <button className="p-3 rounded-lg text-slate-600 hover:text-slate-400"><Sun size={16} /></button>
                   <button className="p-3 rounded-lg text-slate-600 hover:text-slate-400"><Laptop size={16} /></button>
                </div>
             </SettingItem>

             <SettingItem title="Đơn vị tiền tệ" desc="Sử dụng cho các báo cáo chi phí và ROI." icon={CreditCard}>
                <select className="bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-[11px] font-bold text-white min-w-[180px]">
                   <option>VND (đ)</option>
                   <option>USD ($)</option>
                </select>
             </SettingItem>

             <SettingItem title="Đơn vị năng lượng" desc="Đơn vị đo lường tiêu chuẩn cho thiết bị." icon={Zap}>
                <div className="flex gap-4">
                   <label className="flex items-center gap-3 cursor-pointer group">
                      <div className="w-5 h-5 rounded-full border-2 border-cyan-500 flex items-center justify-center p-1">
                         <div className="w-full h-full rounded-full bg-cyan-500" />
                      </div>
                      <span className="text-xs font-bold text-white group-hover:text-cyan-400 transition-colors">kWh</span>
                   </label>
                   <label className="flex items-center gap-3 cursor-pointer group opacity-40">
                      <div className="w-5 h-5 rounded-full border-2 border-white/10" />
                      <span className="text-xs font-bold text-slate-500 group-hover:text-white transition-colors">MWh</span>
                   </label>
                </div>
             </SettingItem>
          </div>
       </div>

       <div className="glass-card p-12 rounded-[56px] border-white/5 space-y-10">
          <div className="flex items-center justify-between">
             <div className="space-y-1">
                <h3 className="text-xl font-bold text-white tracking-tight">Dữ liệu & Đồng bộ</h3>
                <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">Tần suất làm mới dữ liệu từ thiết bị IoT.</p>
             </div>
             <button className="flex items-center gap-3 px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-[10px] font-bold text-slate-400 hover:text-white transition-all">
                <RefreshCcw size={14} /> Buộc đồng bộ lại
             </button>
          </div>
          <div className="space-y-6">
             <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-slate-300">Tần suất Real-time</span>
                <span className="text-cyan-400">10 giây / lần</span>
             </div>
             <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-cyan-500" style={{ width: '30%' }} />
             </div>
          </div>
       </div>
    </div>
  );
}

// --- TAB: NOTIFICATIONS ---
function NotificationSettings() {
  return (
    <div className="max-w-4xl space-y-10">
       <div className="glass-card p-12 rounded-[56px] border-white/5 space-y-12">
          <div className="flex items-center gap-4 text-white font-bold">
             <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-400">
                <Bell size={24} />
             </div>
             <h3 className="text-2xl tracking-tight">Cấu hình Thông báo</h3>
          </div>

          <div className="space-y-8">
             <ToggleItem title="Thông báo hệ thống (Web)" desc="Nhận cảnh báo trực tiếp trên trình duyệt khi có sự cố." active />
             <ToggleItem title="Email báo cáo hàng ngày" desc="Gửi tóm tắt tiêu thụ và hiệu suất qua email lúc 08:00 AM." active />
             <ToggleItem title="Cảnh báo thiết bị (SMS)" desc="Gửi tin nhắn khẩn cấp khi thiết bị ở mức NGUY CẤP." />
             <ToggleItem title="AI Insights Notification" desc="Thông báo khi AI phát hiện các xu hướng bất thường mới." active />
          </div>
       </div>

       <div className="glass-card p-10 rounded-[48px] bg-gradient-to-br from-indigo-600/10 to-transparent border border-white/5 flex flex-col items-center text-center gap-6">
          <div className="w-20 h-20 rounded-[28px] bg-indigo-600/20 flex items-center justify-center text-indigo-400 border border-indigo-600/30">
             <Shield size={36} />
          </div>
          <div className="space-y-2">
             <h4 className="text-lg font-bold text-white tracking-tight">Cấu hình mức độ cảnh báo</h4>
             <p className="text-[10px] text-slate-500 px-12 leading-relaxed">Chỉ nhận thông báo khi mức độ rủi ro vượt ngưỡng "Cảnh báo" (Trên 70%).</p>
          </div>
          <button className="px-8 py-3 rounded-2xl bg-white/5 text-slate-300 text-[10px] font-bold border border-white/10 hover:bg-white/10 transition-all">Tùy chỉnh Ngưỡng cảnh báo</button>
       </div>
    </div>
  );
}

// --- TAB: SECURITY ---
function SecuritySettings() {
  return (
    <div className="max-w-4xl space-y-10">
       <div className="grid grid-cols-2 gap-10">
          <div className="glass-card p-10 rounded-[48px] border-white/5 space-y-8">
             <div className="flex items-center gap-3 text-white font-bold">
                <Shield size={20} className="text-green-400" /> Bảo mật 2 lớp (2FA)
             </div>
             <p className="text-[11px] text-slate-500 leading-relaxed font-medium">Bảo vệ tài khoản của bạn bằng cách yêu cầu mã xác minh mỗi khi đăng nhập.</p>
             <div className="p-6 rounded-3xl bg-green-500/5 border border-green-500/20 flex items-center justify-between">
                <div className="flex items-center gap-3">
                   <CheckCircle2 size={20} className="text-green-400" />
                   <span className="text-xs font-bold text-white">Đang bật</span>
                </div>
                <button className="text-[10px] font-bold text-slate-600 hover:text-white uppercase tracking-widest transition-all">Cấu hình lại</button>
             </div>
          </div>

          <div className="glass-card p-10 rounded-[48px] border-white/5 space-y-8">
             <div className="flex items-center gap-3 text-white font-bold">
                <Monitor size={20} className="text-blue-400" /> IP Whitelist
             </div>
             <p className="text-[11px] text-slate-500 leading-relaxed font-medium">Giới hạn truy cập hệ thống từ các dải IP được chỉ định (Văn phòng/Trung tâm).</p>
             <button className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-white text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-3">
                <Plus size={16} /> Thêm dải IP mới
             </button>
          </div>
       </div>

       <div className="glass-card p-12 rounded-[56px] border-white/5 space-y-10">
          <div className="flex items-center justify-between">
             <div className="flex items-center gap-4 text-white font-bold">
                <History size={24} className="text-slate-400" />
                <h3 className="text-2xl tracking-tight">Nhật ký Hoạt động (Audit Log)</h3>
             </div>
             <button className="text-xs font-bold text-blue-400 hover:text-blue-300">Tải xuống nhật ký (.CSV)</button>
          </div>
          <div className="space-y-6">
             {[
               { act: 'Đăng nhập thành công', device: 'Chrome / macOS', ip: '118.69.12.XXX', time: '10 phút trước', color: 'green' },
               { act: 'Thay đổi cấu hình ngưỡng AI', device: 'Chrome / macOS', ip: '118.69.12.XXX', time: '2 giờ trước', color: 'purple' },
               { act: 'Cập nhật mật khẩu tài khoản', device: 'Edge / Windows 11', ip: '1.54.102.XXX', time: 'Hôm qua', color: 'orange' },
             ].map((log, i) => (
               <div key={i} className="flex items-center justify-between p-6 rounded-3xl bg-white/[0.02] border border-white/5 group hover:bg-white/[0.04] transition-all">
                  <div className="flex items-center gap-6">
                     <div className={`w-2 h-2 rounded-full ${log.color === 'green' ? 'bg-green-500' : log.color === 'purple' ? 'bg-purple-500' : 'bg-orange-500'}`} />
                     <div>
                        <div className="text-xs font-bold text-white group-hover:text-cyan-400 transition-colors">{log.act}</div>
                        <div className="text-[9px] text-slate-600 font-bold uppercase tracking-widest mt-0.5">{log.device} • {log.ip}</div>
                     </div>
                  </div>
                  <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{log.time}</div>
               </div>
             ))}
          </div>
       </div>
    </div>
  );
}

// --- TAB: INTEGRATIONS ---
function IntegrationSettings() {
  return (
    <div className="space-y-10">
       <div className="grid grid-cols-2 gap-10">
          {/* API Keys Card */}
          <div className="glass-card p-10 rounded-[48px] border-white/5 space-y-8 relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-8 opacity-10"><Terminal size={32} /></div>
             <div className="flex items-center gap-3 text-white font-bold">
                <Key size={20} className="text-purple-400" />
                Quản lý API Keys
             </div>
             <p className="text-[11px] text-slate-500 leading-relaxed font-medium">Sử dụng API Keys để kết nối SmartElec với các ứng dụng hoặc hệ thống quản lý của bạn.</p>
             <div className="space-y-4">
                <div className="p-5 rounded-3xl bg-[#030712] border border-white/5 flex items-center justify-between group/key">
                   <div className="space-y-1">
                      <div className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">LIVE KEY (PRODUCTION)</div>
                      <code className="text-xs text-slate-400 font-mono">sk_live_51MvWqZ...XXXX</code>
                   </div>
                   <button className="p-2.5 rounded-xl bg-white/5 text-slate-600 hover:text-purple-400 transition-all"><RefreshCcw size={16} /></button>
                </div>
             </div>
             <button className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-white text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-3">
                <Plus size={16} /> TẠO API KEY MỚI
             </button>
          </div>

          {/* Webhooks Card */}
          <div className="glass-card p-10 rounded-[48px] border-white/5 space-y-8 relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-8 opacity-10"><Share2 size={32} /></div>
             <div className="flex items-center gap-3 text-white font-bold">
                <Share2 size={20} className="text-blue-400" />
                Webhook Endpoints
             </div>
             <p className="text-[11px] text-slate-500 leading-relaxed font-medium">Nhận thông báo sự kiện (Alerts, Maintenance) trực tiếp đến hệ thống ERP/Slack của bạn.</p>
             <div className="p-8 rounded-[40px] bg-white/[0.02] border border-white/5 border-dashed flex flex-col items-center gap-4 text-center">
                <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-white/5 flex items-center justify-center text-slate-700">
                   <Share2 size={24} />
                </div>
                <p className="text-[10px] text-slate-600 px-10">Chưa có webhook nào được cấu hình cho phiên làm việc này.</p>
             </div>
             <button className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-white text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-3">
                <Plus size={16} /> THÊM ENDPOINT MỚI
             </button>
          </div>
       </div>

       {/* Industrial Integrations Large Card */}
       <div className="glass-card p-12 rounded-[56px] border-white/5 space-y-12">
          <div className="flex items-center justify-between">
             <div className="flex items-center gap-4 text-white font-bold">
                <Database size={24} className="text-slate-400" />
                <h3 className="text-2xl tracking-tight text-white">Tích hợp Hệ thống (SCADA / ERP)</h3>
             </div>
             <button className="text-xs font-bold text-blue-400 hover:text-blue-300">Quản lý kết nối trung tâm</button>
          </div>
          
          <div className="space-y-6">
             {[
               { name: 'Siemens WinCC SCADA', type: 'Industrial IoT Hub', status: 'Đang kết nối', time: '10 PHÚT TRƯỚC', color: 'cyan' },
               { name: 'SAP S/4HANA ERP', type: 'Enterprise Resource Planning', status: 'Mất kết nối', time: '2 GIỜ TRƯỚC', color: 'red' },
               { name: 'Microsoft Dynamics 365', type: 'Customer Relation Management', status: 'Bình thường', time: '1 NGÀY TRƯỚC', color: 'purple' },
             ].map((ext, i) => (
               <div key={i} className="flex items-center justify-between p-8 rounded-[36px] bg-white/[0.02] border border-white/5 group hover:bg-white/[0.04] transition-all">
                  <div className="flex items-center gap-8">
                     <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-white/5 border border-white/10 text-slate-500 group-hover:text-${ext.color}-400 transition-all`}>
                        {i === 0 ? <Cpu size={24} /> : i === 1 ? <Database size={24} /> : <Settings size={24} />}
                     </div>
                     <div className="space-y-1">
                        <div className="text-base font-bold text-white group-hover:text-cyan-400 transition-colors">{ext.name}</div>
                        <div className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">{ext.type}</div>
                     </div>
                  </div>
                  <div className="flex items-center gap-12">
                     <div className="text-right">
                        <div className={`text-[10px] font-bold uppercase tracking-widest ${ext.color === 'red' ? 'text-red-500' : 'text-cyan-400'}`}>{ext.status}</div>
                        <div className="text-[9px] text-slate-700 font-bold uppercase">{ext.time}</div>
                     </div>
                     <button className="p-3 rounded-2xl bg-white/5 text-slate-700 hover:text-white transition-all"><ChevronRight size={18} /></button>
                  </div>
               </div>
             ))}
          </div>
       </div>
    </div>
  );
}

// --- HELPER COMPONENTS ---
function SettingItem({ title, desc, icon: Icon, children }: any) {
  return (
    <div className="flex items-center justify-between group">
       <div className="flex items-center gap-6">
          <div className="w-10 h-10 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-center text-slate-600 group-hover:text-cyan-400 transition-all">
             <Icon size={18} />
          </div>
          <div className="space-y-1">
             <h4 className="text-sm font-bold text-white tracking-tight">{title}</h4>
             <p className="text-[10px] text-slate-600 font-medium leading-relaxed">{desc}</p>
          </div>
       </div>
       {children}
    </div>
  );
}

function ToggleItem({ title, desc, active }: any) {
  return (
    <div className="flex items-center justify-between p-8 rounded-[32px] bg-white/[0.02] border border-white/5 group hover:bg-white/[0.04] transition-all">
       <div className="space-y-1">
          <h4 className="text-sm font-bold text-white tracking-tight">{title}</h4>
          <p className="text-[10px] text-slate-600 font-medium leading-relaxed">{desc}</p>
       </div>
       <button className={`w-14 h-8 rounded-full relative transition-all ${active ? 'bg-cyan-500 shadow-[0_0_15px_rgba(34,211,238,0.4)]' : 'bg-slate-800'}`}>
          <div className={`absolute top-1.5 w-5 h-5 rounded-full bg-white transition-all shadow-md ${active ? 'right-1.5' : 'left-1.5'}`} />
       </button>
    </div>
  );
}
