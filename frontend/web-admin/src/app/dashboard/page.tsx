'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, 
  Activity, 
  ShieldCheck, 
  AlertTriangle,
  Zap,
  Box,
  Server,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Cpu,
  Clock,
  ChevronRight,
  Monitor,
  Wrench,
  Search,
  Bell,
  HelpCircle,
  QrCode,
  Truck
} from 'lucide-react';

const tabs = [
  { id: 'overview', label: 'Dashboard tổng quan' },
  { id: 'technical', label: 'Dashboard kỹ thuật' },
  { id: 'inventory', label: 'Dashboard kho' }
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = React.useState('overview');

  return (
    <div className="space-y-6 relative z-10">
      {/* Page Header (Tabs) */}
      <div className="flex items-center gap-2 p-1 border rounded-2xl w-fit" style={{ backgroundColor: 'var(--bg-muted)', borderColor: 'var(--card-border)' }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-2 rounded-xl text-xs font-bold transition-all relative ${
              activeTab === tab.id ? 'bg-[var(--card-bg)] shadow-xl' : 'text-slate-500 hover:text-[var(--text-primary)]'
            }`}
            style={{ color: activeTab === tab.id ? 'var(--text-primary)' : 'inherit' }}
          >
            {tab.label}
            {activeTab === tab.id && (
              <motion.div 
                layoutId="activeTabGlow"
                className="absolute inset-0 rounded-xl border"
                style={{ borderColor: 'var(--card-border)' }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'overview' && <OverviewTab />}
          {activeTab === 'technical' && <TechnicalTab />}
          {activeTab === 'inventory' && <InventoryTab />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// --- TAB 1: OVERVIEW ---
function OverviewTab() {
  return (
    <div className="space-y-6">
      {/* Top Stats Row */}
      <div className="flex justify-between items-end gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>Tổng quan Hệ thống</h1>
          <p className="text-slate-500 text-sm">Cập nhật thời gian thực từ mạng lưới cảm biến toàn cầu.</p>
        </div>
        <div className="flex gap-4">
           <div className="backdrop-blur-xl border p-4 rounded-2xl w-48" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)' }}>
              <div className="text-[10px] text-slate-500 font-bold uppercase mb-1">CÔNG VIỆC ĐANG CHẠY</div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>12</span>
                <TrendingUp size={14} className="text-cyan-500" />
              </div>
           </div>
           <div className="backdrop-blur-xl border p-4 rounded-2xl w-48" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)' }}>
              <div className="text-[10px] text-slate-500 font-bold uppercase mb-1">ĐỘ KHẢ DỤNG</div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-purple-500">85%</span>
                <Zap size={14} className="text-purple-500" />
              </div>
           </div>
        </div>
      </div>

      {/* Grid Status & AI Predictions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Device Status Grid */}
        <div className="lg:col-span-2 glass-card p-6 rounded-[24px]">
           <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2 font-bold" style={{ color: 'var(--text-primary)' }}>
                 <Monitor size={18} className="text-cyan-500" />
                 Lưới Trạng Thái Thiết Bị
              </div>
              <button className="text-[10px] text-slate-500 font-bold hover:text-[var(--text-primary)] flex items-center gap-1 transition-all">
                Chi tiết <ChevronRight size={12} />
              </button>
           </div>
           <div className="grid grid-cols-4 gap-4">
              {[
                { name: 'NODE-01', v: '220V', t: '45°C', status: 'online' },
                { name: 'NODE-02', v: '218V', t: '78°C', status: 'warning' },
                { name: 'NODE-03', v: '221V', t: '42°C', status: 'online' },
                { name: 'NODE-04', v: '219V', t: '46°C', status: 'online' },
                { name: 'NODE-05', v: '-', t: '-', status: 'offline' },
              ].map((node, i) => (
                <div key={i} className="p-4 rounded-xl border relative group transition-all" style={{ backgroundColor: 'var(--bg-muted)', borderColor: 'var(--card-border)' }}>
                   <div className="flex justify-between items-center mb-3">
                      <span className="text-xs font-bold group-hover:text-cyan-500 transition-colors" style={{ color: 'var(--text-primary)' }}>{node.name}</span>
                      <div className={`w-1.5 h-1.5 rounded-full ${node.status === 'online' ? 'bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.5)]' : node.status === 'warning' ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]' : 'bg-slate-400'}`} />
                   </div>
                   <div className="space-y-1">
                      <div className="flex justify-between text-[10px]">
                         <span className="text-slate-500">Điện áp</span>
                         <span className="font-medium" style={{ color: 'var(--text-secondary)' }}>{node.v}</span>
                      </div>
                      <div className="flex justify-between text-[10px]">
                         <span className="text-slate-500">Nhiệt độ</span>
                         <span className={node.status === 'warning' ? 'text-red-500 font-bold' : ''} style={{ color: node.status !== 'warning' ? 'var(--text-secondary)' : '' }}>{node.t}</span>
                      </div>
                   </div>
                   {node.status === 'offline' && (
                     <div className="absolute inset-0 bg-slate-900/10 dark:bg-[#030712]/60 rounded-xl flex items-center justify-center">
                        <span className="text-[10px] text-slate-500 font-bold uppercase">Offline</span>
                     </div>
                   )}
                </div>
              ))}
           </div>
        </div>

        {/* AI Failure Prediction */}
        <div className="glass-card p-6 rounded-[24px] space-y-6">
           <div className="flex items-center gap-2 font-bold" style={{ color: 'var(--text-primary)' }}>
              <Zap size={18} className="text-purple-500" />
              Dự Đoán Lỗi AI
           </div>
           <div className="space-y-4">
              <div className="p-4 rounded-xl border space-y-3" style={{ backgroundColor: 'var(--bg-muted)', borderColor: 'var(--card-border)' }}>
                 <div className="flex justify-between items-start">
                    <div className="text-sm font-bold leading-tight" style={{ color: 'var(--text-primary)' }}>Tụ điện trạm biến <br/> áp C</div>
                    <div className="px-2 py-1 rounded bg-red-500/10 text-red-500 text-[8px] font-bold">92% Nguy cơ</div>
                 </div>
                 <p className="text-[10px] text-slate-500 leading-relaxed">Phân tích rung động cho thấy suy giảm cấu trúc. Đề xuất thay thế trong vòng 48h tới.</p>
                 <button className="w-full py-2 rounded-lg border text-[10px] font-bold text-slate-500 hover:text-[var(--text-primary)] flex items-center justify-center gap-2 transition-all" style={{ backgroundColor: 'var(--bg-muted)', borderColor: 'var(--card-border)' }}>
                    <Wrench size={12} /> Tạo Lệnh Sửa Chữa
                 </button>
              </div>
              <div className="p-4 rounded-xl border space-y-3" style={{ backgroundColor: 'var(--bg-muted)', borderColor: 'var(--card-border)' }}>
                 <div className="flex justify-between items-start">
                    <div className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>Cáp nối tủ điều khiển</div>
                    <div className="px-2 py-1 rounded bg-yellow-500/10 text-yellow-500 text-[8px] font-bold">45% Nguy cơ</div>
                 </div>
                 <p className="text-[10px] text-slate-500 leading-relaxed">Độ trễ tín hiệu nhẹ ghi nhận lúc 03:00. Khuyến nghị kiểm tra kết nối định kỳ.</p>
              </div>
           </div>
        </div>
      </div>

      {/* Maintenance Kanban View */}
      <div className="glass-card p-6 rounded-[24px]">
         <div className="flex items-center gap-2 text-white font-bold mb-6">
            <Box size={18} className="text-cyan-500" />
            Bảng Công Việc Bảo Trì
         </div>
         <div className="grid grid-cols-4 gap-6">
            {['CHỜ XỬ LÝ', 'ĐÃ GIAO', 'ĐANG SỬA CHỮA', 'ĐANG KIỂM TRA'].map((col, idx) => (
              <div key={idx} className="space-y-4">
                 <div className="text-[10px] text-slate-500 font-bold uppercase mb-4 flex items-center justify-between">
                    {col}
                    <span className="w-4 h-4 rounded bg-white/5 flex items-center justify-center text-slate-500 text-[8px]">1</span>
                 </div>
                 {idx === 0 && (
                   <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 space-y-3">
                      <div className="text-[8px] text-slate-500 font-bold">#WR-2041</div>
                      <p className="text-[11px] text-white font-medium">Kiểm tra nhiệt độ bất thường tại NODE-02</p>
                      <div className="flex justify-between items-center">
                        <div className="w-5 h-5 rounded-full bg-slate-700 flex items-center justify-center text-[8px]">?</div>
                      </div>
                   </div>
                 )}
                 {idx === 1 && (
                   <div className="p-4 rounded-xl bg-white/[0.03] border-l-2 border-cyan-500 space-y-3">
                      <div className="text-[8px] text-slate-500 font-bold">#WR-2038</div>
                      <p className="text-[11px] text-white font-medium">Thay thế cảm biến quang học Zone Alpha</p>
                      <div className="flex justify-between items-center">
                         <div className="w-5 h-5 rounded-full bg-cyan-500/20 overflow-hidden" />
                      </div>
                   </div>
                 )}
                 {idx === 2 && (
                   <div className="p-4 rounded-xl bg-white/[0.03] border-l-2 border-purple-500 space-y-3">
                      <div className="flex justify-between text-[8px]">
                        <span className="text-slate-500">#WR-2035</span>
                        <span className="text-white font-bold">45%</span>
                      </div>
                      <p className="text-[11px] text-white font-medium">Bảo trì lỗi biến áp chính TR-1</p>
                      <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                         <div className="h-full w-[45%] bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.5)]" />
                      </div>
                   </div>
                 )}
                 {idx === 3 && (
                   <div className="border-2 border-dashed border-white/5 rounded-xl h-24 flex items-center justify-center">
                      <span className="text-[8px] text-slate-600 font-bold uppercase">Kéo thả công việc</span>
                   </div>
                 )}
              </div>
            ))}
         </div>
      </div>

      {/* Real-time Logs View */}
      <div className="glass-card p-6 rounded-[24px]">
         <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-white font-bold text-xs">
               <Cpu size={14} className="text-slate-400" />
               LUỒNG LOG THỜI GIAN THỰC
            </div>
            <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold">
               <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
               LIVE
            </div>
         </div>
         <div className="font-mono text-[11px] space-y-1.5 overflow-hidden">
            {[
              { time: '14:02:45.001', tag: '[INFO]', msg: 'System ping normal across zone Alpha. Latency 12ms.', color: 'slate' },
              { time: '14:02:48.210', tag: '[CRIT]', msg: 'Temperature threshold exceeded at NODE-02. Current: 78°C. Max allowed: 75°C.', color: 'red' },
              { time: '14:02:48.500', tag: '[AI_SYS]', msg: 'Anomaly detected in cooling cycle profile for NODE-02. Generating alert.', color: 'purple' },
              { time: '14:03:01.000', tag: '[INFO]', msg: 'Routine diagnostic completed for TR-1. Status: In Repair (45%).', color: 'slate' },
              { time: '14:03:15.882', tag: '[INFO]', msg: 'Incoming data stream from Sector 7 stabilized.', color: 'slate' },
            ].map((log, i) => (
              <div key={i} className={`p-1.5 rounded flex gap-4 ${log.color === 'red' ? 'bg-red-500/10 border-l-2 border-red-500' : log.color === 'purple' ? 'bg-purple-500/10 border-l-2 border-purple-500' : 'hover:bg-white/5'}`}>
                 <span className="text-slate-600 shrink-0">{log.time}</span>
                 <span className={log.color === 'red' ? 'text-red-500 font-bold' : log.color === 'purple' ? 'text-purple-400 font-bold' : 'text-cyan-500 font-bold'}>{log.tag}</span>
                 <span className={log.color === 'red' ? 'text-red-400' : log.color === 'purple' ? 'text-purple-300' : 'text-slate-300'}>{log.msg}</span>
              </div>
            ))}
         </div>
      </div>
    </div>
  );
}

// --- TAB 2: TECHNICAL ---
function TechnicalTab() {
  return (
    <div className="space-y-6">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold text-white tracking-tight">Tổng quan hệ thống</h1>
          <div className="flex items-center gap-2 text-slate-500 mt-2 text-sm">
             <ShieldCheck size={16} className="text-cyan-500" />
             <span>87% thiết bị hoạt động bình thường</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs font-bold text-slate-300 flex items-center gap-2">
             <Clock size={14} /> Hôm nay, 24 Th10
          </div>
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold hover:bg-cyan-500/20 transition-all">
            <ArrowDownRight size={16} /> Xuất báo cáo
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Content Area */}
        <div className="lg:col-span-3 space-y-6">
           {/* Summary Stats Row */}
           <div className="grid grid-cols-4 gap-4">
              {[
                { label: 'Tổng thiết bị', val: '1,245', icon: Cpu },
                { label: 'Đang hoạt động', val: '1,080', icon: ShieldCheck, active: true },
                { label: 'Đang bảo trì', val: '42', icon: Wrench },
                { label: 'Cảnh báo nghiêm trọng', val: '3', icon: AlertTriangle, danger: true },
              ].map((s, i) => (
                <div key={i} className="glass-card p-6 rounded-2xl flex flex-col items-center text-center space-y-4">
                   <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.active ? 'bg-green-500/20 text-green-400' : s.danger ? 'bg-red-500/20 text-red-400' : 'bg-white/5 text-slate-400'}`}>
                      <s.icon size={20} />
                   </div>
                   <div className="space-y-1">
                      <div className="text-[10px] text-slate-500 font-bold uppercase">{s.label}</div>
                      <div className="text-2xl font-bold text-white">{s.val}</div>
                   </div>
                </div>
              ))}
           </div>

           {/* Real-time Activity Chart Mockup */}
           <div className="glass-card p-8 rounded-[32px] space-y-6">
              <div className="flex items-center justify-between">
                 <div>
                    <h3 className="text-xl font-bold text-white">Hoạt động thiết bị theo thời gian thực</h3>
                    <p className="text-xs text-slate-500 mt-1">Lưu lượng dữ liệu & tải năng lượng (kW)</p>
                 </div>
                 <div className="bg-white/5 p-1 rounded-lg flex gap-1">
                    {['1H', '24H', '7D'].map(t => (
                      <button key={t} className={`px-3 py-1 rounded-md text-[10px] font-bold ${t === '24H' ? 'bg-white/10 text-white' : 'text-slate-500 hover:text-slate-300'}`}>{t}</button>
                    ))}
                 </div>
              </div>
              <div className="h-64 relative mt-8">
                 {/* Simplified Wave Chart SVG */}
                 <svg className="w-full h-full" viewBox="0 0 800 200" preserveAspectRatio="none">
                    <path 
                      d="M0,150 Q50,120 100,140 T200,110 T300,130 T400,80 T500,100 T600,60 T700,90 T800,50 L800,200 L0,200 Z" 
                      fill="url(#gradient-cyan)" 
                      className="opacity-20"
                    />
                    <path 
                      d="M0,150 Q50,120 100,140 T200,110 T300,130 T400,80 T500,100 T600,60 T700,90 T800,50" 
                      fill="none" 
                      stroke="#22d3ee" 
                      strokeWidth="3" 
                      className="drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]"
                    />
                    <defs>
                      <linearGradient id="gradient-cyan" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#22d3ee" />
                        <stop offset="100%" stopColor="transparent" />
                      </linearGradient>
                    </defs>
                 </svg>
                 <div className="absolute inset-0 flex justify-between items-end pb-2 px-2 text-[10px] text-slate-600 font-mono">
                    <span>00:00</span><span>04:00</span><span>08:00</span><span>12:00</span><span>16:00</span><span>20:00</span><span>Hiện tại</span>
                 </div>
              </div>
           </div>

           {/* Maintenance Progress Section */}
           <div className="space-y-4">
              <div className="flex items-center justify-between">
                 <h3 className="text-xl font-bold text-white">Tiến độ bảo trì</h3>
                 <button className="text-xs text-slate-500 font-bold hover:text-white flex items-center gap-1">
                    Xem bảng chi tiết <ChevronRight size={14} />
                 </button>
              </div>
              <div className="grid grid-cols-3 gap-6">
                 <div className="space-y-3">
                    <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase px-2">
                       <div className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                       CHỜ XỬ LÝ (12)
                    </div>
                    <div className="glass-card p-4 rounded-2xl space-y-4 border-l-2 border-transparent hover:border-cyan-500 transition-all cursor-pointer">
                       <div className="text-[11px] font-bold text-white">Cập nhật firmware NODE-A2</div>
                       <div className="flex justify-between items-center">
                          <span className="px-2 py-0.5 rounded bg-white/5 text-[9px] text-slate-400">Thường</span>
                          <span className="text-[9px] text-slate-600 italic">Hôm nay</span>
                       </div>
                    </div>
                    <div className="glass-card p-4 rounded-2xl space-y-4">
                       <div className="text-[11px] font-bold text-white">Kiểm tra kết nối trạm 4</div>
                       <div className="flex justify-between items-center">
                          <span className="px-2 py-0.5 rounded bg-white/5 text-[9px] text-slate-400">Thường</span>
                          <span className="text-[9px] text-slate-600 italic">Ngày mai</span>
                       </div>
                    </div>
                 </div>
                 <div className="space-y-3">
                    <div className="flex items-center gap-2 text-[10px] font-bold text-cyan-500 uppercase px-2">
                       <div className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                       ĐANG TIẾN HÀNH (3)
                    </div>
                    <div className="glass-card p-4 rounded-2xl space-y-4 border-l-2 border-cyan-500">
                       <div className="text-[11px] font-bold text-white">Thay thế tụ điện trạm 02</div>
                       <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full w-2/3 bg-cyan-500" />
                       </div>
                       <div className="flex justify-between items-center">
                          <span className="px-2 py-0.5 rounded bg-orange-500/10 text-orange-400 text-[9px]">Cao</span>
                          <div className="w-5 h-5 rounded-full bg-slate-700" />
                       </div>
                    </div>
                 </div>
                 <div className="space-y-3">
                    <div className="flex items-center gap-2 text-[10px] font-bold text-purple-500 uppercase px-2">
                       <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                       HOÀN TẤT (28)
                    </div>
                    <div className="glass-card p-4 rounded-2xl space-y-4 opacity-50">
                       <div className="text-[11px] font-bold text-white">Bảo dưỡng định kỳ khu C</div>
                       <div className="flex items-center gap-2 text-[9px] text-green-500 font-bold">
                          <ShieldCheck size={12} /> Đã xong
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Sidebar - Right Side Information */}
        <div className="space-y-8">
           {/* AI Intelligence Section */}
           <div className="glass-card p-6 rounded-[32px] space-y-6">
              <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400">
                    <Zap size={18} />
                 </div>
                 <h3 className="text-xl font-bold text-white">Thông tin chi tiết từ AI</h3>
              </div>
              <div className="space-y-6">
                 {[
                   { title: 'Phát hiện bất thường', msg: 'Nhiệt độ Node B2 tăng đột biến 15% so với mô hình dự kiến trong 2 giờ qua.', type: 'alert', btn: 'KIỂM TRA NGAY' },
                   { title: 'Dự đoán hỏng hóc', msg: 'Bơm nước làm mát số 3 có xác suất hỏng 82% trong 5 ngày tới do rung chấn.', type: 'prediction', btn: 'LÊN LỊCH BẢO TRÌ' },
                   { title: 'Đề xuất tối ưu', msg: 'Giảm tải khu vực D vào giờ cao điểm có thể tiết kiệm 4.2% năng lượng.', type: 'opt' },
                 ].map((ai, i) => (
                   <div key={i} className="space-y-3">
                      <div className="flex items-center gap-2 text-white font-bold">
                         {ai.type === 'alert' ? <AlertTriangle size={16} className="text-red-500" /> : ai.type === 'prediction' ? <TrendingUp size={16} className="text-purple-400" /> : <ShieldCheck size={16} className="text-cyan-400" />}
                         <span className="text-xs uppercase tracking-tight">{ai.title}</span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-relaxed px-6">{ai.msg}</p>
                      {ai.btn && (
                        <div className="px-6">
                           <button className="text-[10px] font-bold text-orange-400 hover:text-orange-300 transition-colors underline decoration-dotted underline-offset-4">{ai.btn}</button>
                        </div>
                      )}
                   </div>
                 ))}
              </div>
           </div>

           {/* Quick Actions Section */}
           <div className="space-y-4">
              <h3 className="text-xl font-bold text-white pl-2">Thao tác nhanh</h3>
              <div className="grid grid-cols-2 gap-4">
                 <button className="glass-card p-6 rounded-2xl flex flex-col items-center justify-center gap-3 group hover:bg-white/5 transition-all">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-slate-400 group-hover:text-cyan-400 transition-colors">
                       <Plus size={20} />
                    </div>
                    <span className="text-[11px] font-bold text-slate-400 group-hover:text-white transition-colors">Thêm thiết bị</span>
                 </button>
                 <button className="glass-card p-6 rounded-2xl flex flex-col items-center justify-center gap-3 group hover:bg-white/5 transition-all">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-slate-400 group-hover:text-purple-400 transition-colors">
                       <QrCode size={20} />
                    </div>
                    <span className="text-[11px] font-bold text-slate-400 group-hover:text-white transition-colors">Quét mã QR</span>
                 </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}

// --- TAB 3: INVENTORY ---
function InventoryTab() {
  return (
    <div className="space-y-6">
      {/* Top Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold text-white tracking-tight">Tổng quan Kho linh kiện</h1>
          <p className="text-slate-500 mt-2 text-sm">Dữ liệu theo thời gian thực từ mạng lưới cảm biến kho.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-purple-500 text-white text-xs font-bold hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all">
            <Plus size={16} /> Nhập hàng mới
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Stats Row */}
        {[
          { label: 'TỔNG LINH KIỆN', val: '124,592', icon: Box, sub: '+2.4% tuần này', color: 'cyan' },
          { label: 'SẮP HẾT HÀNG', val: '14', icon: AlertTriangle, sub: 'Cần chú ý ngay', danger: true, color: 'red' },
          { label: 'ĐANG NHẬP', val: '3,200', icon: Truck, sub: 'Dự kiến trong 24h', color: 'purple' },
          { label: 'ĐANG XUẤT', val: '1,850', icon: ArrowDownRight, sub: 'Tiến độ 85%', color: 'blue' },
        ].map((s, i) => (
          <div key={i} className="glass-card p-6 rounded-[24px] space-y-4">
             <div className="flex justify-between items-start">
                <div className="space-y-1">
                   <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{s.label}</div>
                   <div className="text-3xl font-bold text-white tracking-tight">{s.val}</div>
                </div>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.danger ? 'bg-red-500/20 text-red-400 border border-red-500/20' : 'bg-white/5 text-slate-400'}`}>
                   <s.icon size={20} />
                </div>
             </div>
             <div className={`text-[10px] font-bold flex items-center gap-1 ${s.danger ? 'text-red-500' : 'text-slate-400'}`}>
                {s.danger ? '!' : <TrendingUp size={10} className="text-cyan-500" />} {s.sub}
             </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Inventory Movement Chart Card */}
        <div className="lg:col-span-2 glass-card p-8 rounded-[32px] space-y-8">
           <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">Biểu đồ lưu chuyển kho</h3>
              <div className="bg-white/5 p-1 rounded-lg flex gap-1">
                 {['Tuần', 'Tháng'].map(t => (
                   <button key={t} className={`px-4 py-1.5 rounded-md text-[10px] font-bold ${t === 'Tháng' ? 'bg-white/10 text-white' : 'text-slate-500 hover:text-slate-300'}`}>{t}</button>
                 ))}
              </div>
           </div>
           <div className="h-64 border-b border-l border-white/5 relative flex items-end">
              {/* Simulated Chart Bars/Area */}
              <div className="absolute inset-0 flex items-end justify-around px-4 gap-4">
                 {[40, 60, 35, 90, 65, 80, 50].map((h, i) => (
                   <div key={i} className="flex-1 flex flex-col gap-1 items-center max-w-[40px]">
                      <div style={{ height: `${h}%` }} className="w-full rounded-t-lg bg-gradient-to-t from-cyan-500/20 to-cyan-500 transition-all duration-700" />
                   </div>
                 ))}
              </div>
           </div>
           <div className="flex justify-center gap-6">
              <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-cyan-500" />
                 <span className="text-[10px] text-slate-400 font-bold uppercase">Nhập vào</span>
              </div>
              <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-purple-500" />
                 <span className="text-[10px] text-slate-400 font-bold uppercase">Xuất ra</span>
              </div>
           </div>
        </div>

        {/* Storage Status Card */}
        <div className="glass-card p-8 rounded-[32px] space-y-8">
           <h3 className="text-xl font-bold text-white">Trạng thái lưu trữ</h3>
           <div className="space-y-8">
              {[
                { label: 'Sẵn sàng (Available)', pct: 68, val: '84,722 đơn vị', color: 'bg-cyan-500 shadow-cyan-500/50' },
                { label: 'Đã đặt (Reserved)', pct: 27, val: '33,640 đơn vị', color: 'bg-purple-500 shadow-purple-500/50' },
                { label: 'Lỗi/Chờ duyệt (Defective)', pct: 5, val: '6,230 đơn vị', color: 'bg-orange-500 shadow-orange-500/50' },
              ].map((item, i) => (
                <div key={i} className="space-y-2">
                   <div className="flex justify-between text-xs font-bold">
                      <span className="text-slate-300">{item.label}</span>
                      <span className="text-white">{item.pct}%</span>
                   </div>
                   <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${item.pct}%` }}
                        transition={{ duration: 1.5, delay: i * 0.2 }}
                        className={`h-full ${item.color} shadow-lg`} 
                      />
                   </div>
                   <div className="text-right text-[10px] text-slate-500 font-bold">{item.val}</div>
                </div>
              ))}
           </div>
        </div>

        {/* AI Inventory Prediction Card */}
        <div className="glass-card p-6 rounded-[24px] space-y-6">
           <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-white font-bold">
                 <Zap size={18} className="text-purple-500" />
                 AI Dự đoán thiếu hụt
              </div>
              <span className="px-2 py-0.5 rounded-full bg-red-500/10 text-red-500 text-[10px] font-bold">14 Mục</span>
           </div>
           <div className="space-y-3">
              {[
                { name: 'IC-MCU-32BIT-ARM', msg: 'Dự kiến cạn kiệt trong 3 ngày', count: 45, unit: 'Tồn kho hiện tại' },
                { name: 'Cáp quang Multimode', msg: 'Tốc độ sử dụng tăng 24%', count: 12, unit: 'Cuộn còn lại' },
              ].map((item, i) => (
                <div key={i} className="p-4 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-between group hover:bg-white/[0.08] transition-all cursor-pointer">
                   <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-slate-400 group-hover:text-cyan-400 transition-colors">
                         <Cpu size={14} />
                      </div>
                      <div>
                         <div className="text-xs font-bold text-white">{item.name}</div>
                         <div className="text-[10px] text-slate-500">{item.msg}</div>
                      </div>
                   </div>
                   <div className="text-right">
                      <div className="text-sm font-bold text-white">{item.count}</div>
                      <div className="text-[8px] text-slate-600 font-bold uppercase">{item.unit}</div>
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* Suppliers Table Card */}
        <div className="lg:col-span-2 glass-card p-6 rounded-[24px] space-y-6">
           <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">Tổng quan Nhà cung cấp</h3>
              <button className="text-[10px] text-cyan-400 font-bold uppercase hover:underline">Xem tất cả</button>
           </div>
           <div className="overflow-hidden">
              <table className="w-full">
                 <thead className="text-[10px] text-slate-500 font-bold uppercase border-b border-white/5">
                    <tr>
                       <th className="text-left pb-4 font-bold">NHÀ CUNG CẤP</th>
                       <th className="text-left pb-4 font-bold">MÃ PO ĐANG CHỜ</th>
                       <th className="text-left pb-4 font-bold">ĐỘ TIN CẬY</th>
                       <th className="text-left pb-4 font-bold">TRẠNG THÁI</th>
                    </tr>
                 </thead>
                 <tbody className="text-xs text-white">
                    {[
                      { name: 'Global Tech Corp', po: 'PO-9432', rel: '98%', status: 'Đúng hạn' },
                      { name: 'Power Devices Ltd', po: 'PO-8821', rel: '94%', status: 'Trễ 2h' },
                    ].map((row, i) => (
                      <tr key={i} className="group border-b border-white/[0.02] hover:bg-white/[0.02] transition-all">
                         <td className="py-4 font-medium">{row.name}</td>
                         <td className="py-4 text-slate-400">{row.po}</td>
                         <td className="py-4 text-cyan-400 font-bold">{row.rel}</td>
                         <td className="py-4 font-bold">{row.status}</td>
                      </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </div>
      </div>
    </div>
  );
}
