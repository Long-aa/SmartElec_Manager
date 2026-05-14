'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, 
  Search, 
  Filter, 
  Download, 
  Plus, 
  MoreVertical, 
  Cpu, 
  CheckCircle2, 
  AlertTriangle, 
  ChevronRight,
  TrendingUp,
  Activity,
  History,
  RotateCcw,
  Settings,
  PieChart,
  LayoutGrid,
  Shield,
  ZapOff,
  LineChart,
  BarChart3,
  MousePointer2,
  Bell,
  FileText,
  Workflow,
  MapPin
} from 'lucide-react';

const sidebarItems = [
  { id: 'insights', label: 'AI Insights', icon: Zap },
  { id: 'support', label: 'Technical Support', icon: History },
  { id: 'alerts', label: 'Alerts', icon: AlertTriangle },
  { id: 'reports', label: 'Reports', icon: FileText },
  { id: 'config', label: 'System Configuration', icon: Settings }
];

export default function AIMonitoringPage() {
  const [activeTab, setActiveTab] = React.useState('insights');

  return (
    <div className="flex h-full -m-8">
      {/* Left Navigation Sidebar */}
      <div className="w-72 bg-[#030712] border-r border-white/5 p-6 flex flex-col gap-10">
         <div className="flex flex-col items-center text-center gap-6 py-10 px-4 glass-card rounded-[40px] border-white/5 relative overflow-hidden group">
            <div className="absolute inset-0 bg-blue-500/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="w-20 h-20 rounded-[28px] bg-cyan-500/20 flex items-center justify-center text-cyan-400 border border-cyan-500/30 relative z-10">
               <Cpu size={36} />
            </div>
            <div className="space-y-1 relative z-10">
               <h2 className="text-xl font-bold text-white tracking-tight">Core Module</h2>
               <p className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest">AI Engine: Optimized</p>
            </div>
         </div>

         <nav className="space-y-2 flex-1">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all relative group ${
                  activeTab === item.id ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                {activeTab === item.id && (
                  <motion.div layoutId="nav-glow" className="absolute inset-0 bg-cyan-500/5 blur-xl rounded-2xl" />
                )}
                <item.icon size={20} className={`${activeTab === item.id ? 'text-cyan-400' : 'text-slate-600 group-hover:text-slate-300'}`} />
                <span className="text-xs font-bold tracking-wide">{item.label}</span>
                {activeTab === item.id && <div className="absolute right-4 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,1)]" />}
              </button>
            ))}
         </nav>

         <button className="w-full py-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-bold uppercase tracking-widest hover:bg-red-500/20 transition-all flex items-center justify-center gap-3">
            <ZapOff size={16} /> Emergency Shutdown
         </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto bg-[#030712] p-10 space-y-10 custom-scrollbar">
         {/* Top Header */}
         <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
               <h1 className="text-4xl font-bold text-white tracking-tight leading-none">AI Predictive Maintenance</h1>
               <p className="text-slate-500 text-sm font-medium">Phân tích dữ liệu cảm biến thời gian thực & Dự báo vòng đời thiết bị.</p>
            </div>
            <div className="flex gap-4">
               <button className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-white text-[11px] font-bold hover:bg-white/10 transition-all">
                  <Filter size={16} className="text-slate-500" /> Lọc Dữ Liệu
               </button>
               <button className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-cyan-500 text-slate-900 text-[11px] font-bold shadow-xl shadow-cyan-500/30 hover:scale-105 transition-all">
                  <Download size={16} /> Xuất Báo Cáo
               </button>
            </div>
         </div>

         {/* Metric Cards */}
         <div className="grid grid-cols-4 gap-8">
            <MonitorMetric title="ĐỘ TIN CẬY AI" value="94.2" unit="%" sub="+1.2%" color="cyan" icon={Shield} />
            <MonitorMetric title="THIẾT BỊ NGUY CƠ CAO" value="03" sub="/ 142 Total" color="red" icon={AlertTriangle} note="Yêu cầu kiểm tra ngay" />
            <MonitorMetric title="XÁC SUẤT LỖI HỆ THỐNG" value="12.5" unit="%" sub="-2.4%" color="purple" icon={PieChart} sparkline />
            <MonitorMetric title="DỰ BÁO MTBF" value="1,420" unit="Giờ" sub="Thời gian trung bình giữa các lần hỏng hóc." color="slate" icon={RotateCcw} />
         </div>

         {/* Middle Section: Chart & RCA */}
         <div className="grid grid-cols-3 gap-8">
            {/* Chart Section */}
            <div className="col-span-2 glass-card p-12 rounded-[56px] border-white/5 bg-[#0a0f1e]/40 space-y-10 relative overflow-hidden group">
               <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
               <div className="flex justify-between items-center relative z-10">
                  <div className="flex items-center gap-4 text-white font-bold">
                     <LineChart size={24} className="text-cyan-400" />
                     <h3 className="text-2xl tracking-tight">Xu Hướng Dự Báo Lỗi AI</h3>
                  </div>
                  <div className="flex gap-2 p-1 bg-white/5 rounded-xl border border-white/5">
                     {['24H', '7D', '30D'].map(f => (
                       <button key={f} className={`px-5 py-2 rounded-lg text-[10px] font-bold transition-all ${f === '24H' ? 'bg-white/10 text-white shadow-xl' : 'text-slate-500'}`}>{f}</button>
                     ))}
                  </div>
               </div>
               
               <div className="h-80 relative flex items-end px-10">
                  {/* Warning Threshold Line */}
                  <div className="absolute bottom-[80%] left-0 right-0 border-t border-red-500/30 border-dashed z-0 flex items-center justify-end pr-10">
                     <span className="text-[10px] text-red-500/60 font-bold uppercase tracking-widest mt-[-10px] bg-[#0a0f1e] px-2">Ngưỡng Cảnh Báo (80%)</span>
                  </div>
                  
                  <svg className="w-full h-full relative z-10" viewBox="0 0 800 200" preserveAspectRatio="none">
                     <defs>
                        <linearGradient id="chart-grad" x1="0" y1="0" x2="0" y2="1">
                           <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.4" />
                           <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
                        </linearGradient>
                     </defs>
                     <path d="M0,150 Q100,160 200,100 T400,120 T600,140 T800,20" fill="url(#chart-grad)" />
                     <path d="M0,150 Q100,160 200,100 T400,120 T600,140 T800,20" fill="none" stroke="#22d3ee" strokeWidth="6" className="drop-shadow-[0_0_15px_rgba(34,211,238,0.8)]" />
                     <circle cx="800" cy="20" r="10" fill="#f87171" className="animate-ping" />
                     <circle cx="800" cy="20" r="6" fill="#f87171" />
                  </svg>
               </div>
               <div className="flex justify-between text-[10px] text-slate-700 font-bold uppercase tracking-widest px-10 border-t border-white/[0.03] pt-8">
                  <span>0%</span><span>25%</span><span>50%</span><span>75%</span><span>100%</span>
               </div>
            </div>

            {/* RCA Panel */}
            <div className="glass-card p-10 rounded-[56px] border-white/5 space-y-10">
               <div className="flex items-center gap-4 text-white font-bold">
                  <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-400">
                     <Workflow size={24} />
                  </div>
                  <div>
                     <h3 className="text-xl tracking-tight">Phân Tích Căn Nguyên (RCA)</h3>
                     <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">AI Core phân tích chuỗi sự kiện bất thường.</p>
                  </div>
               </div>

               <div className="p-8 rounded-[40px] bg-red-500/10 border border-red-500/20 space-y-4 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-6 opacity-20"><Zap size={40} className="text-red-500" /></div>
                  <div className="flex items-center gap-3 text-red-500 font-bold text-[10px] uppercase tracking-widest">
                     <AlertTriangle size={14} /> PHÁT HIỆN BẤT THƯỜNG: BƠM CAO ÁP #04
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed font-medium">
                     Độ rung cơ học tăng 45% so với baseline trong 3 giờ qua, kèm theo nhiệt độ ổ trục tăng nhẹ.
                  </p>
               </div>

               <div className="space-y-8 px-2">
                  <div className="flex gap-6">
                     <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 font-bold text-sm shrink-0">1</div>
                     <div className="space-y-1 pt-1">
                        <div className="text-xs font-bold text-white">Gợi ý: Kiểm tra căn chỉnh trục</div>
                        <p className="text-[10px] text-slate-500 leading-relaxed">Dữ liệu phổ rung khớp 89% với mẫu lỗi lệch tâm trục (Misalignment).</p>
                     </div>
                  </div>
                  <div className="flex gap-6">
                     <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-500 font-bold text-sm shrink-0">2</div>
                     <div className="space-y-1 pt-1">
                        <div className="text-xs font-bold text-white">Hành động: Lên lịch bảo trì</div>
                        <p className="text-[10px] text-slate-500 leading-relaxed">Dự báo hỏng hóc nghiêm trọng trong 72 giờ tới nếu không can thiệp.</p>
                     </div>
                  </div>
               </div>

               <button className="w-full py-5 rounded-[28px] bg-white/5 border border-white/10 text-white font-bold text-xs hover:bg-purple-500/20 hover:border-purple-500/30 transition-all shadow-2xl">
                  Tạo Work Order Tự Động
               </button>
            </div>
         </div>

         {/* Bottom Section: Table & Heatmap */}
         <div className="grid grid-cols-3 gap-8">
            {/* Critical Devices Table */}
            <div className="col-span-2 glass-card p-12 rounded-[56px] border-white/5 bg-[#0a0f1e]/40 space-y-10">
               <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-white tracking-tight">Giám Sát Thiết Bị Cấp Thiết</h3>
                  <div className="relative w-80">
                     <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                     <input type="text" placeholder="Tìm ID thiết bị..." className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-xs text-white focus:outline-none focus:border-cyan-500/50" />
                  </div>
               </div>

               <div className="overflow-x-auto">
                  <table className="w-full text-left">
                     <thead>
                        <tr className="text-[10px] text-slate-700 font-bold uppercase tracking-[0.2em] border-b border-white/5">
                           <th className="px-6 py-6">THIẾT BỊ (ID)</th>
                           <th className="px-6 py-6">HEALTH SCORE</th>
                           <th className="px-6 py-6 text-center">XÁC SUẤT LỖI</th>
                           <th className="px-6 py-6 text-center">MỨC RỦI RO</th>
                           <th className="px-6 py-6">KHUYẾN NGHỊ AI</th>
                        </tr>
                     </thead>
                     <tbody className="text-[11px] text-white">
                        {[
                          { id: 'Bơm Ly Tâm #04', sn: 'PMP-04-HV', score: 42, prob: '87%', risk: 'NGUY CẤP', color: 'red', suggestion: 'Thay thế ổ trục ngay lập tức.' },
                          { id: 'Tuabin Khí #02', sn: 'TRB-02-GT', score: 68, prob: '45%', risk: 'CẢNH BÁO', color: 'purple', suggestion: 'Làm sạch bộ lọc không khí đầu vào.' },
                          { id: 'Máy Phát Điện #01', sn: 'GEN-01-MN', score: 95, prob: '2%', risk: 'BÌNH THƯỜNG', color: 'cyan', suggestion: 'Tiếp tục giám sát định kỳ.' },
                        ].map((dev, i) => (
                          <tr key={i} className="border-b border-white/[0.02] hover:bg-white/[0.03] transition-all">
                             <td className="px-6 py-8">
                                <div className="flex items-center gap-3">
                                   <div className={`w-2 h-2 rounded-full ${dev.color === 'red' ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]' : dev.color === 'purple' ? 'bg-purple-500' : 'bg-cyan-500'}`} />
                                   <div>
                                      <div className="font-bold text-white group-hover:text-cyan-400 transition-colors">{dev.id}</div>
                                      <div className="text-[9px] text-slate-600 font-bold uppercase">{dev.sn}</div>
                                   </div>
                                </div>
                             </td>
                             <td className="px-6 py-8">
                                <div className="space-y-2 max-w-[120px]">
                                   <div className="flex justify-between text-[9px] font-bold">
                                      <span className="text-slate-600">{dev.score}/100</span>
                                   </div>
                                   <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                      <div className={`h-full ${dev.color === 'red' ? 'bg-red-500' : dev.color === 'purple' ? 'bg-purple-500' : 'bg-cyan-500'}`} style={{ width: `${dev.score}%` }} />
                                   </div>
                                </div>
                             </td>
                             <td className="px-6 py-8 text-center font-bold text-lg text-slate-400">{dev.prob}</td>
                             <td className="px-6 py-8 text-center">
                                <span className={`px-4 py-1.5 rounded-lg text-[9px] font-bold tracking-widest ${dev.color === 'red' ? 'bg-red-500/10 text-red-500 border border-red-500/20' : dev.color === 'purple' ? 'bg-purple-500/10 text-purple-500 border border-purple-500/20' : 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'}`}>
                                   {dev.risk}
                                </span>
                             </td>
                             <td className="px-6 py-8 text-slate-400 font-medium italic">{dev.suggestion}</td>
                          </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </div>

            {/* Heatmap Section */}
            <div className="glass-card p-12 rounded-[56px] border-white/5 space-y-10">
               <div className="flex items-center gap-4 text-white font-bold">
                  <LayoutGrid size={24} className="text-slate-400" />
                  <div>
                     <h3 className="text-xl tracking-tight">Heatmap Kho Lỗi</h3>
                     <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">Mật độ cảnh báo theo cụm hệ thống (48h qua).</p>
                  </div>
               </div>

               <div className="grid grid-cols-4 gap-4 aspect-square">
                  {['BƠM', 'VAN', '', '', '', 'LỖ', '', '', '', 'QUẠT', '', '', '', '', '', ''].map((label, i) => (
                    <div 
                       key={i} 
                       className={`rounded-2xl flex items-center justify-center text-[10px] font-bold transition-all hover:scale-105 cursor-pointer ${
                         [0, 1, 5, 9].includes(i) ? 'bg-gradient-to-br border' : 'bg-white/[0.02] border border-white/5'
                       } ${
                         i === 0 ? 'from-red-500/40 to-red-500/10 border-red-500/20 text-red-400' :
                         i === 1 ? 'from-orange-500/30 to-orange-500/5 border-orange-500/20 text-orange-400' :
                         i === 5 ? 'from-purple-500/40 to-purple-500/10 border-purple-500/20 text-purple-400' :
                         i === 9 ? 'from-cyan-500/40 to-cyan-500/10 border-cyan-500/20 text-cyan-400' : ''
                       }`}
                    >
                       {label}
                    </div>
                  ))}
               </div>

               <div className="space-y-4">
                  <div className="flex justify-between text-[9px] font-bold uppercase text-slate-600 tracking-widest">
                     <span>Bình thường</span>
                     <span>Nguy hiểm</span>
                  </div>
                  <div className="h-2 w-full bg-gradient-to-r from-slate-800 via-purple-500/50 to-red-500 rounded-full shadow-inner" />
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}

// --- SHARED COMPONENT: MONITOR METRIC ---
function MonitorMetric({ title, value, unit, sub, color, icon: Icon, note, sparkline }: any) {
  const colors: any = {
    cyan: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
    red: 'text-red-400 bg-red-500/10 border-red-500/20',
    purple: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
    slate: 'text-slate-500 bg-white/5 border-white/10'
  };

  return (
    <div className={`glass-card p-10 rounded-[40px] space-y-6 flex flex-col justify-between border-white/5 transition-all hover:border-white/10 group ${color === 'red' ? 'bg-gradient-to-b from-red-500/[0.02] to-transparent' : ''}`}>
       <div className="flex justify-between items-start">
          <div className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] max-w-[100px] leading-relaxed">{title}</div>
          <div className={`w-12 h-12 rounded-[20px] flex items-center justify-center ${colors[color]}`}>
             <Icon size={24} />
          </div>
       </div>
       <div className="space-y-2">
          <div className="flex items-baseline gap-2">
             <div className="text-6xl font-bold text-white tracking-tighter group-hover:text-cyan-400 transition-colors">{value}</div>
             <div className="text-xl text-slate-600 font-medium">{unit}</div>
          </div>
          <div className="text-[11px] font-bold flex items-center gap-2">
             <span className={sub.includes('+') ? 'text-cyan-400' : sub.includes('-') ? 'text-purple-400' : 'text-slate-600'}>{sub}</span>
          </div>
          {note && (
            <div className="text-[9px] text-red-500 font-bold uppercase flex items-center gap-2 mt-2">
               <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" /> {note}
            </div>
          )}
          {sparkline && (
            <div className="h-10 flex items-end gap-1.5 pt-4">
               {[40, 60, 45, 80, 55, 70, 90].map((h, i) => (
                 <div key={i} className="flex-1 bg-purple-500/20 rounded-t-sm" style={{ height: `${h}%` }} />
               ))}
            </div>
          )}
       </div>
    </div>
  );
}
