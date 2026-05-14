'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart3, 
  Search, 
  Filter, 
  Download, 
  TrendingUp, 
  TrendingDown, 
  Zap, 
  DollarSign, 
  Leaf, 
  Activity, 
  ChevronRight,
  Calendar,
  PieChart,
  LineChart,
  Layers,
  ArrowUpRight,
  FileText,
  Clock,
  MapPin,
  Cpu,
  Share2,
  Box,
  LayoutGrid
} from 'lucide-react';

const tabs = [
  { id: 'consumption', label: 'Tiêu thụ năng lượng' },
  { id: 'cost', label: 'Chi phí & Hiệu quả' },
  { id: 'assets', label: 'Phân tích thiết bị' }
];

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = React.useState('consumption');

  return (
    <div className="space-y-8 relative z-10 pb-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
           <div className="flex items-center gap-2 text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-2">
              <span>Hệ thống</span>
              <ChevronRight size={12} />
              <span className="text-purple-500">Phân tích & Báo cáo</span>
           </div>
           <h1 className="text-4xl font-bold text-white tracking-tight">
             {activeTab === 'consumption' && 'Phân tích Tiêu thụ Năng lượng'}
             {activeTab === 'cost' && 'Quản lý Chi phí & Hiệu quả'}
             {activeTab === 'assets' && 'Hiệu suất Thiết bị & Tài sản'}
           </h1>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-1 flex gap-1 backdrop-blur-md">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2.5 rounded-xl text-[10px] font-bold transition-all relative ${
                  activeTab === tab.id ? 'text-white bg-white/10 shadow-xl' : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-[11px] font-bold shadow-xl shadow-purple-500/20 hover:scale-105 transition-all">
            <Download size={18} /> Xuất Báo Cáo
          </button>
        </div>
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
          {activeTab === 'consumption' && <ConsumptionTab />}
          {activeTab === 'cost' && <CostEfficiencyTab />}
          {activeTab === 'assets' && <AssetAnalyticsTab />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// --- TAB: CONSUMPTION ---
function ConsumptionTab() {
  return (
    <div className="space-y-8">
       {/* High-level KPI Cards */}
       <div className="grid grid-cols-4 gap-8">
          <AnalyticMetric title="TỔNG TIÊU THỤ" value="124,850" unit="kWh" sub="+5.2% vs tháng trước" color="purple" icon={Zap} trend="up" />
          <AnalyticMetric title="PHỤ TẢI ĐỈNH" value="842" unit="kW" sub="-2.4% vs tháng trước" color="cyan" icon={Activity} trend="down" />
          <AnalyticMetric title="HỆ SỐ CÔNG SUẤT" value="0.94" sub="Tối ưu hệ thống" color="green" icon={TrendingUp} />
          <AnalyticMetric title="CARBON FOOTPRINT" value="84.5" unit="Tons" sub="Giảm 12% so với 2022" color="orange" icon={Leaf} />
       </div>

       <div className="grid grid-cols-3 gap-8">
          {/* Main Consumption Chart */}
          <div className="col-span-2 glass-card p-12 rounded-[56px] border-white/5 bg-[#0a0f1e]/40 space-y-12 relative overflow-hidden group">
             <div className="flex justify-between items-center">
                <div className="space-y-2">
                   <h3 className="text-2xl font-bold text-white tracking-tight">Xu hướng tiêu thụ (30 ngày qua)</h3>
                   <p className="text-[10px] text-slate-600 font-bold uppercase tracking-[0.2em]">Phân tích chi tiết chuỗi thời gian</p>
                </div>
                <div className="flex gap-2 p-1 bg-white/5 rounded-xl">
                   {['D', 'W', 'M', 'Y'].map(f => (
                     <button key={f} className={`px-4 py-2 rounded-lg text-[10px] font-bold ${f === 'M' ? 'bg-white/10 text-white' : 'text-slate-500'}`}>{f}</button>
                   ))}
                </div>
             </div>
             
             {/* Chart Visual */}
             <div className="h-80 relative flex items-end px-4">
                <svg className="w-full h-full" viewBox="0 0 800 200" preserveAspectRatio="none">
                   <defs>
                      <linearGradient id="energy-grad" x1="0" y1="0" x2="0" y2="1">
                         <stop offset="0%" stopColor="#a855f7" stopOpacity="0.3" />
                         <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
                      </linearGradient>
                   </defs>
                   <path d="M0,180 Q100,160 200,120 T400,100 T600,140 T800,40" fill="url(#energy-grad)" />
                   <path d="M0,180 Q100,160 200,120 T400,100 T600,140 T800,40" fill="none" stroke="#a855f7" strokeWidth="4" className="drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]" />
                   <circle cx="800" cy="40" r="6" fill="#a855f7" />
                </svg>
             </div>
             <div className="flex justify-between text-[10px] text-slate-700 font-bold uppercase px-4 border-t border-white/[0.03] pt-8">
                <span>01 Oct</span><span>10 Oct</span><span>20 Oct</span><span>30 Oct</span>
             </div>
          </div>

          {/* Efficiency Gauge Section */}
          <div className="glass-card p-12 rounded-[56px] border-white/5 space-y-12 text-center relative overflow-hidden">
             <div className="absolute top-0 right-0 p-8">
                <PieChart size={32} className="text-purple-500/10" />
             </div>
             <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest">Hiệu suất vận hành (PF)</h3>
             
             <div className="relative w-48 h-48 mx-auto">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                   <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="6" className="text-white/[0.02]" />
                   <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8" strokeDasharray="282.7" strokeDashoffset={282.7 * (1 - 0.94)} className="text-purple-500 drop-shadow-[0_0_12px_rgba(168,85,247,0.6)]" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                   <div className="text-5xl font-bold text-white tracking-tighter">0.94</div>
                   <div className="text-[10px] text-purple-400 font-bold uppercase tracking-widest mt-1">Excellent</div>
                </div>
             </div>

             <div className="space-y-8 pt-4">
                <div className="flex justify-between items-center text-[10px] font-bold">
                   <span className="text-slate-600 uppercase">Load Balance</span>
                   <span className="text-white">92%</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                   <div className="h-full bg-cyan-500 shadow-[0_0_8px_rgba(34,211,238,0.5)]" style={{ width: '92%' }} />
                </div>
                <p className="text-[10px] text-slate-500 leading-relaxed italic">Hệ thống đang hoạt động trong ngưỡng tối ưu nhất.</p>
             </div>
          </div>
       </div>
    </div>
  );
}

// --- TAB: COST & EFFICIENCY ---
function CostEfficiencyTab() {
  return (
    <div className="grid grid-cols-3 gap-8">
       <div className="col-span-2 space-y-8">
          <div className="glass-card p-12 rounded-[56px] border-white/5 bg-gradient-to-br from-green-500/[0.03] to-transparent space-y-12">
             <div className="flex justify-between items-center">
                <div className="flex items-center gap-4 text-white font-bold">
                   <div className="w-12 h-12 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-400">
                      <DollarSign size={24} />
                   </div>
                   <h3 className="text-2xl tracking-tight">Ước tính Chi phí & Tiết kiệm</h3>
                </div>
                <div className="text-right">
                   <div className="text-[10px] text-slate-600 font-bold uppercase">Tổng ngân sách tháng</div>
                   <div className="text-2xl font-bold text-white">đ2.4B VND</div>
                </div>
             </div>

             <div className="grid grid-cols-2 gap-12 pt-4">
                <div className="p-10 rounded-[40px] bg-white/[0.02] border border-white/5 space-y-6">
                   <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Tiết kiệm dự kiến</div>
                   <div className="text-5xl font-bold text-green-400 tracking-tighter">đ142M</div>
                   <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500" style={{ width: '65%' }} />
                   </div>
                   <p className="text-[10px] text-slate-600 leading-relaxed font-medium">Nhờ tối ưu hóa phụ tải đỉnh trong giờ cao điểm.</p>
                </div>
                <div className="p-10 rounded-[40px] bg-white/[0.02] border border-white/5 space-y-6">
                   <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">ROI (Hồi vốn)</div>
                   <div className="text-5xl font-bold text-white tracking-tighter">1.8 <span className="text-xl text-slate-600">Năm</span></div>
                   <div className="flex items-center gap-2 text-green-400 text-[10px] font-bold">
                      <TrendingDown size={14} /> -0.2 Năm <span className="text-slate-700 ml-1">so với dự kiến ban đầu</span>
                   </div>
                </div>
             </div>
          </div>

          <div className="glass-card p-12 rounded-[56px] border-white/5 space-y-10">
             <h3 className="text-xl font-bold text-white tracking-tight">Phân tích tổn thất (Loss Analytics)</h3>
             <div className="space-y-8">
                {[
                  { label: 'Tổn thất truyền tải', val: 12, cost: 'đ24M', color: 'orange' },
                  { label: 'Tổn thất thiết bị cũ', val: 8, cost: 'đ16M', color: 'red' },
                  { label: 'Không cân bằng pha', val: 4, cost: 'đ8M', color: 'purple' },
                ].map((loss, i) => (
                  <div key={i} className="flex items-center justify-between group">
                     <div className="space-y-2 flex-1 max-w-[200px]">
                        <div className="text-xs font-bold text-white group-hover:text-cyan-400 transition-colors">{loss.label}</div>
                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                           <div className={`h-full bg-${loss.color}-500 shadow-[0_0_10px_rgba(249,115,22,0.4)]`} style={{ width: `${loss.val * 5}%` }} />
                        </div>
                     </div>
                     <div className="text-right">
                        <div className="text-lg font-bold text-white">{loss.val}%</div>
                        <div className="text-[9px] text-slate-600 font-bold uppercase tracking-widest">Thiệt hại: {loss.cost}</div>
                     </div>
                  </div>
                ))}
             </div>
          </div>
       </div>

       <div className="space-y-8">
          <div className="glass-card p-10 rounded-[48px] border-white/5 space-y-10 text-center">
             <div className="inline-flex p-5 rounded-[28px] bg-cyan-500/10 text-cyan-400">
                <BarChart3 size={32} />
             </div>
             <div className="space-y-2">
                <h4 className="text-sm font-bold text-slate-500 uppercase tracking-widest">Cấu trúc chi phí</h4>
                <div className="text-3xl font-bold text-white tracking-tight">Biểu phí Bậc 5</div>
                <p className="text-[10px] text-slate-600 leading-relaxed px-6 italic">Hệ thống đang chịu mức phí cao nhất do tiêu thụ tập trung vào giờ cao điểm.</p>
             </div>
             <button className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-cyan-400 text-[10px] font-bold hover:bg-white/10 transition-all uppercase tracking-widest">Xem chi tiết biểu phí</button>
          </div>

          <div className="glass-card p-10 rounded-[48px] border-white/5 space-y-10">
             <div className="flex items-center gap-3 text-white font-bold">
                <ArrowUpRight size={20} className="text-purple-400" />
                Đề xuất tối ưu
             </div>
             <div className="space-y-6">
                {[
                  { title: 'Chuyển giờ vận hành Máy nén', impact: 'Tiết kiệm 15%', color: 'purple' },
                  { title: 'Bảo trì hệ thống tản nhiệt', impact: 'Giảm 8% tổn thất', color: 'cyan' },
                ].map((rec, i) => (
                  <div key={i} className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 space-y-2 group hover:bg-white/5 transition-all cursor-pointer">
                     <div className="text-xs font-bold text-white group-hover:text-purple-400">{rec.title}</div>
                     <div className="text-[10px] font-bold text-green-400 uppercase tracking-widest">{rec.impact}</div>
                  </div>
                ))}
             </div>
          </div>
       </div>
    </div>
  );
}

// --- TAB: ASSET ANALYTICS ---
function AssetAnalyticsTab() {
  return (
    <div className="space-y-8">
       <div className="flex items-center justify-between">
          <div className="space-y-2">
             <h2 className="text-3xl font-bold text-white tracking-tight">So sánh Hiệu suất Thiết bị</h2>
             <p className="text-slate-500 text-sm">Phân tích tiêu thụ trên từng đơn vị tài sản.</p>
          </div>
          <div className="flex gap-4">
             <select className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-[11px] font-bold text-slate-400 appearance-none focus:outline-none">
                <option>Lọc theo Khu vực: Tất cả</option>
             </select>
             <select className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-[11px] font-bold text-slate-400 appearance-none focus:outline-none">
                <option>Xếp hạng: Tiêu thụ cao nhất</option>
             </select>
          </div>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {[
            { name: 'Hệ thống Điều hòa Trung tâm', zone: 'Khu vực Văn phòng', id: 'HVAC-01', usage: '42,500', share: 34, color: 'purple' },
            { name: 'Dây chuyền Sản xuất A1', zone: 'Xưởng Sản xuất chính', id: 'LINE-A1', usage: '38,200', share: 31, color: 'cyan' },
            { name: 'Hệ thống Chiếu sáng ngoài trời', zone: 'Khuôn viên & Bãi xe', id: 'LIGHT-EXT', usage: '12,400', share: 10, color: 'orange' },
          ].map((asset, i) => (
            <div key={i} className="glass-card p-10 rounded-[48px] border-white/5 space-y-8 group hover:bg-white/[0.04] transition-all relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-3xl rounded-full -mr-16 -mt-16" />
               <div className="flex justify-between items-start">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border-2 ${asset.color === 'purple' ? 'bg-purple-500/10 border-purple-500/20 text-purple-400' : asset.color === 'cyan' ? 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400' : 'bg-orange-500/10 border-orange-500/20 text-orange-400'}`}>
                     <Cpu size={28} />
                  </div>
                  <div className="text-right">
                     <div className="text-[9px] text-slate-700 font-bold uppercase tracking-widest">SHARE</div>
                     <div className="text-2xl font-bold text-white">{asset.share}%</div>
                  </div>
               </div>
               <div className="space-y-1">
                  <h4 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">{asset.name}</h4>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest flex items-center gap-2"><MapPin size={10} /> {asset.zone}</p>
               </div>
               <div className="p-6 rounded-3xl bg-[#030712] border border-white/5 space-y-4">
                  <div className="flex justify-between items-end">
                     <div className="text-[10px] text-slate-600 font-bold uppercase">Tiêu thụ tháng</div>
                     <div className="text-2xl font-bold text-white">{asset.usage} <span className="text-[11px] text-slate-600 font-medium">kWh</span></div>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                     <div className={`h-full ${asset.color === 'purple' ? 'bg-purple-500' : asset.color === 'cyan' ? 'bg-cyan-500' : 'bg-orange-500'}`} style={{ width: `${asset.share * 2}%` }} />
                  </div>
               </div>
               <button className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-white text-[10px] font-bold hover:bg-white/10 transition-all uppercase tracking-widest">Phân tích chi tiết</button>
            </div>
          ))}
       </div>
    </div>
  );
}

// --- SHARED COMPONENT: ANALYTIC METRIC ---
function AnalyticMetric({ title, value, unit, sub, color, icon: Icon, trend }: any) {
  const colors: any = {
    purple: 'text-purple-400 bg-purple-500/10 border-purple-500/20 shadow-purple-500/5',
    cyan: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20 shadow-cyan-500/5',
    green: 'text-green-400 bg-green-500/10 border-green-500/20 shadow-green-500/5',
    orange: 'text-orange-400 bg-orange-500/10 border-orange-500/20 shadow-orange-500/5',
  };

  return (
    <div className="glass-card p-10 rounded-[48px] space-y-8 flex flex-col justify-between border-white/5 transition-all hover:border-white/10 relative overflow-hidden group">
       <div className="absolute top-0 right-0 p-8">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${colors[color]}`}>
             <Icon size={24} />
          </div>
       </div>
       <div className="space-y-4">
          <div className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em]">{title}</div>
          <div className="flex items-baseline gap-2">
             <div className="text-5xl font-bold text-white tracking-tighter group-hover:text-cyan-400 transition-colors">{value}</div>
             {unit && <div className="text-xl text-slate-600 font-medium">{unit}</div>}
          </div>
       </div>
       <div className="pt-6 border-t border-white/[0.03] flex items-center gap-2">
          {trend === 'up' && <TrendingUp size={14} className="text-red-400" />}
          {trend === 'down' && <TrendingDown size={14} className="text-green-400" />}
          <span className={`text-[11px] font-bold ${trend === 'up' ? 'text-red-400' : trend === 'down' ? 'text-green-400' : 'text-slate-600'}`}>
             {sub}
          </span>
       </div>
    </div>
  );
}
