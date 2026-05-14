'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, 
  Search, 
  Filter, 
  Download, 
  Plus, 
  MoreVertical, 
  ChevronRight,
  Calendar,
  Layers,
  CheckCircle2,
  Clock,
  Briefcase,
  Share2,
  Eye,
  Trash2,
  ArrowUpRight,
  HardDrive,
  Bell,
  Activity,
  FileSpreadsheet,
  FileCode,
  AlertCircle
} from 'lucide-react';

export default function ReportsPage() {
  return (
    <div className="space-y-8 relative z-10 pb-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
           <div className="flex items-center gap-2 text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-2">
              <span>Hệ thống</span>
              <ChevronRight size={12} />
              <span className="text-blue-500">Báo cáo & Tài liệu</span>
           </div>
           <h1 className="text-4xl font-bold text-white tracking-tight leading-none">Kho lưu trữ Báo cáo</h1>
           <p className="text-slate-500 text-sm mt-2 font-medium">Quản lý và truy xuất kho báo cáo hệ thống chi tiết theo dự án.</p>
        </div>
        
        <div className="flex items-center gap-4">
           <div className="relative group">
              <div className="absolute inset-0 bg-blue-500/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <button className="relative flex items-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[11px] font-bold shadow-xl shadow-blue-500/20 hover:scale-105 transition-all">
                 <Plus size={18} /> Tạo báo cáo tùy chỉnh
              </button>
           </div>
        </div>
      </div>

      {/* Overview Metrics */}
      <div className="grid grid-cols-4 gap-8">
         <ReportStatBox title="TỔNG SỐ BÁO CÁO" value="482" sub="Tất cả các định dạng" color="blue" icon={FileText} />
         <ReportStatBox title="BÁO CÁO MỚI (24H)" value="12" sub="+3 so với hôm qua" color="cyan" icon={Bell} />
         <ReportStatBox title="DUNG LƯỢNG LƯU TRỮ" value="4.2" unit="GB" sub="Đã dùng 65%" color="purple" icon={HardDrive} />
         <ReportStatBox title="CẦN PHÊ DUYỆT" value="08" sub="Báo cáo kỹ thuật" color="orange" icon={AlertCircle} />
      </div>

      <div className="grid grid-cols-4 gap-8">
         {/* Main Reports Area */}
         <div className="col-span-3 space-y-8">
            {/* Filter Bar */}
            <div className="glass-card p-6 rounded-[32px] border-white/5 bg-[#0a0f1e]/60 flex flex-wrap items-center gap-6">
               <div className="flex-1 min-w-[300px] relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                  <input type="text" placeholder="Tìm kiếm theo tên báo cáo, mã số hoặc nội dung..." className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-xs text-white focus:outline-none focus:border-blue-500/50" />
               </div>
               
               <div className="flex items-center gap-4">
                  <select className="bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-[11px] font-bold text-slate-400 appearance-none focus:outline-none focus:border-blue-500/50 min-w-[200px]">
                     <option>Lọc theo Dự án: Tất cả</option>
                     <option>KCN Sóng Thần - Vinamilk</option>
                     <option>Nhà máy Điện mặt trời QNgai</option>
                     <option>Tòa nhà VP Hạng A - Q1</option>
                  </select>
                  
                  <div className="flex gap-2">
                     {['Tất cả', 'Năng lượng', 'Bảo trì', 'AI'].map((f, i) => (
                        <button key={i} className={`px-5 py-3 rounded-xl text-[10px] font-bold border transition-all ${i === 0 ? 'bg-blue-500 text-white border-blue-500 shadow-lg shadow-blue-500/20' : 'bg-white/5 border-white/5 text-slate-500 hover:text-white'}`}>
                           {f}
                        </button>
                     ))}
                  </div>
               </div>
            </div>

            {/* Reports Table */}
            <div className="glass-card rounded-[48px] overflow-hidden border-white/5 bg-[#0a0f1e]/40">
               <div className="overflow-x-auto">
                  <table className="w-full text-left">
                     <thead>
                        <tr className="text-[10px] text-slate-700 font-bold uppercase tracking-[0.2em] border-b border-white/5">
                           <th className="px-10 py-8">MÃ / TÊN BÁO CÁO</th>
                           <th className="px-6 py-8">DỰ ÁN LIÊN QUAN</th>
                           <th className="px-6 py-8 text-center">LOẠI</th>
                           <th className="px-6 py-8 text-center">ĐỊNH DẠNG</th>
                           <th className="px-6 py-8">TRẠNG THÁI</th>
                           <th className="px-10 py-8 text-right">THAO TÁC</th>
                        </tr>
                     </thead>
                     <tbody className="text-[11px] text-white">
                        {[
                          { id: 'REP-8901', name: 'Phân tích tiêu thụ - Tháng 10/2023', project: 'KCN Sóng Thần', type: 'Năng lượng', format: 'PDF', date: '01/11/2023', status: 'ĐÃ KÝ', color: 'blue' },
                          { id: 'REP-8905', name: 'Nhật ký bảo trì trạm biến áp T-12', project: 'Tòa nhà VP Hạng A', type: 'Bảo trì', format: 'XLSX', date: '28/10/2023', status: 'CHỜ DUYỆT', color: 'orange' },
                          { id: 'REP-8912', name: 'Dự báo rủi ro AI - Quý 4/2023', project: 'Hệ thống Sensor Kho lạnh', type: 'AI Insights', format: 'PDF', date: '25/10/2023', status: 'ĐÃ KÝ', color: 'purple' },
                          { id: 'REP-8920', name: 'Báo cáo Carbon Footprint Q3', project: 'Green Energy JSC', type: 'Môi trường', format: 'PDF', date: '15/10/2023', status: 'NHÁP', color: 'slate' },
                          { id: 'REP-8924', name: 'Dữ liệu thô Sensor nhiệt độ', project: 'Nhà máy QNgai', type: 'Kỹ thuật', format: 'CSV', date: '12/10/2023', status: 'ĐÃ KÝ', color: 'cyan' },
                        ].map((rep, i) => (
                          <tr key={i} className="group border-b border-white/[0.02] hover:bg-white/[0.04] transition-all">
                             <td className="px-10 py-8">
                                <div className="space-y-1">
                                   <div className="text-[9px] text-blue-500 font-bold uppercase tracking-widest">{rep.id}</div>
                                   <div className="font-bold group-hover:text-blue-400 transition-colors leading-relaxed max-w-[220px]">{rep.name}</div>
                                   <div className="text-[9px] text-slate-700 font-medium">Khởi tạo: {rep.date}</div>
                                </div>
                             </td>
                             <td className="px-6 py-8 text-slate-300 font-bold">
                                <div className="flex items-center gap-2">
                                   <Briefcase size={14} className="text-slate-700" />
                                   {rep.project}
                                </div>
                             </td>
                             <td className="px-6 py-8 text-center">
                                <span className="px-3 py-1 rounded-lg bg-white/5 text-[9px] font-bold text-slate-500 uppercase tracking-widest border border-white/5">{rep.type}</span>
                             </td>
                             <td className="px-6 py-8 text-center">
                                <div className="flex flex-col items-center gap-1">
                                   {rep.format === 'PDF' && <FileText size={18} className="text-red-500" />}
                                   {rep.format === 'XLSX' && <FileSpreadsheet size={18} className="text-green-500" />}
                                   {rep.format === 'CSV' && <FileCode size={18} className="text-cyan-500" />}
                                   <span className="text-[8px] text-slate-700 font-bold">{rep.format}</span>
                                </div>
                             </td>
                             <td className="px-6 py-8">
                                <span className={`px-4 py-1.5 rounded-lg text-[9px] font-bold ${rep.status === 'ĐÃ KÝ' ? 'bg-blue-500/10 text-blue-500 border border-blue-500/20' : rep.status === 'CHỜ DUYỆT' ? 'bg-orange-500/10 text-orange-500 border border-orange-500/20' : 'bg-white/5 text-slate-500 border border-white/10'}`}>
                                   {rep.status}
                                </span>
                             </td>
                             <td className="px-10 py-8 text-right">
                                <div className="flex items-center justify-end gap-2 opacity-40 group-hover:opacity-100 transition-all">
                                   <button className="p-2.5 rounded-xl bg-white/5 text-slate-500 hover:text-blue-400 transition-all" title="Xem nhanh"><Eye size={16} /></button>
                                   <button className="p-2.5 rounded-xl bg-white/5 text-slate-500 hover:text-green-400 transition-all" title="Tải về"><Download size={16} /></button>
                                   <button className="p-2.5 rounded-xl bg-white/5 text-slate-500 hover:text-white transition-all" title="Chia sẻ"><Share2 size={16} /></button>
                                </div>
                             </td>
                          </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
               <div className="p-10 flex items-center justify-between border-t border-white/5 bg-white/[0.01]">
                  <div className="text-[10px] text-slate-700 font-bold uppercase tracking-widest">Hiển thị 1-10 trong 482 báo cáo</div>
                  <div className="flex gap-2">
                     <button className="w-10 h-10 rounded-xl bg-white/5 text-slate-700 flex items-center justify-center"><ChevronRight size={18} className="rotate-180" /></button>
                     <button className="w-10 h-10 rounded-xl bg-blue-600 text-white font-bold text-xs">1</button>
                     <button className="w-10 h-10 rounded-xl bg-white/5 text-slate-700 font-bold text-xs">2</button>
                     <button className="w-10 h-10 rounded-xl bg-white/5 text-slate-700 flex items-center justify-center"><ChevronRight size={18} /></button>
                  </div>
               </div>
            </div>
         </div>

         {/* Sidebar Panel */}
         <div className="space-y-8">
            <div className="glass-card p-10 rounded-[48px] border-white/5 space-y-10 relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-8 opacity-10"><Clock size={32} /></div>
               <h3 className="text-xl font-bold text-white tracking-tight">Gần đây</h3>
               <div className="space-y-8">
                  {[
                    { name: 'Phân tích ROI Dự án...', time: '10 phút trước', color: 'blue' },
                    { name: 'Nhật ký bảo trì T-12', time: '2 giờ trước', color: 'orange' },
                    { name: 'Carbon Report Q3', time: 'Hôm qua', color: 'slate' },
                  ].map((act, i) => (
                    <div key={i} className="flex gap-4 group/item cursor-pointer">
                       <div className={`w-1.5 h-1.5 rounded-full mt-1.5 ${act.color === 'blue' ? 'bg-blue-500' : act.color === 'orange' ? 'bg-orange-500' : 'bg-slate-700'}`} />
                       <div className="space-y-1">
                          <div className="text-xs font-bold text-slate-300 group-hover/item:text-blue-400 transition-colors">{act.name}</div>
                          <div className="text-[9px] text-slate-600 font-bold uppercase">{act.time}</div>
                       </div>
                    </div>
                  ))}
               </div>
            </div>

            <div className="glass-card p-10 rounded-[48px] border-white/5 space-y-10">
               <div className="flex items-center gap-3 text-white font-bold">
                  <Activity size={20} className="text-blue-400" />
                  Báo cáo Tự động
               </div>
               <div className="space-y-6">
                  {[
                    { title: 'Tiêu thụ hàng ngày', schedule: '08:00 AM Daily', active: true },
                    { title: 'Audit bảo trì tuần', schedule: '06:00 PM Sunday' },
                  ].map((sched, i) => (
                    <div key={i} className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 space-y-3 group hover:bg-white/5 transition-all">
                       <div className="flex justify-between items-center">
                          <span className="text-xs font-bold text-white">{sched.title}</span>
                          <div className={`w-8 h-4 rounded-full relative transition-all ${sched.active ? 'bg-blue-600' : 'bg-slate-800'}`}>
                             <div className={`absolute top-1 w-2 h-2 rounded-full bg-white transition-all ${sched.active ? 'right-1' : 'left-1'}`} />
                          </div>
                       </div>
                       <div className="text-[10px] text-slate-600 font-medium flex items-center gap-2"><Clock size={10} /> {sched.schedule}</div>
                    </div>
                  ))}
               </div>
               <button className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-white text-[10px] font-bold hover:bg-white/10 transition-all uppercase tracking-widest">
                  Quản lý lịch gửi
               </button>
            </div>
         </div>
      </div>
    </div>
  );
}

function ReportStatBox({ title, value, unit, sub, color, icon: Icon }: any) {
  const colors: any = {
    blue: 'text-blue-400 bg-blue-500/10 border-blue-500/20 shadow-blue-500/5',
    cyan: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20 shadow-cyan-500/5',
    purple: 'text-purple-400 bg-purple-500/10 border-purple-500/20 shadow-purple-500/5',
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
             <div className="text-5xl font-bold text-white tracking-tighter group-hover:text-blue-400 transition-colors">{value}</div>
             {unit && <div className="text-xl text-slate-600 font-medium">{unit}</div>}
          </div>
       </div>
       <div className="pt-6 border-t border-white/[0.03] flex items-center gap-2">
          <span className={`text-[11px] font-bold text-slate-600`}>
             {sub}
          </span>
       </div>
    </div>
  );
}
