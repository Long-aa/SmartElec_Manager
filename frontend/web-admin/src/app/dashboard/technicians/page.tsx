'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Search, 
  Filter, 
  Plus, 
  MoreVertical, 
  Star, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  ChevronRight,
  Shield,
  Award,
  Zap,
  Phone,
  Mail,
  MapPin,
  Briefcase,
  TrendingUp,
  Activity,
  UserPlus,
  ArrowUpRight,
  PieChart,
  LayoutGrid,
  Settings,
  Camera
} from 'lucide-react';

const tabs = [
  { id: 'list', label: 'Danh sách kỹ thuật' },
  { id: 'performance', label: 'Hiệu suất & Thống kê' },
  { id: 'schedule', label: 'Lịch làm việc' }
];

export default function TechniciansPage() {
  const [activeTab, setActiveTab] = React.useState('list');
  const [isAdding, setIsAdding] = React.useState(false);

  return (
    <div className="space-y-6 relative z-10">
      {/* Header & Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
           <div className="flex items-center gap-2 text-slate-500 text-xs mb-2">
              <span>Đội ngũ</span>
              <ChevronRight size={12} />
              <span className="text-blue-500 font-medium">Kỹ thuật viên</span>
           </div>
           <h1 className="text-3xl font-bold text-white tracking-tight">
             {activeTab === 'list' && 'Quản lý đội ngũ Kỹ thuật'}
             {activeTab === 'performance' && 'Phân tích Hiệu suất'}
             {activeTab === 'schedule' && 'Lịch điều phối kỹ thuật'}
           </h1>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-1 flex gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-xl text-[10px] font-bold transition-all relative ${
                  activeTab === tab.id ? 'text-white bg-white/10 shadow-xl' : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          {activeTab === 'list' && (
            <button 
              onClick={() => setIsAdding(true)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-500 text-white text-xs font-bold hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all"
            >
              <UserPlus size={16} /> Thêm nhân sự
            </button>
          )}
        </div>
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab + (isAdding ? '-adding' : '')}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {isAdding ? (
            <AddTechnicianForm onCancel={() => setIsAdding(false)} />
          ) : (
            <>
              {activeTab === 'list' && <TechnicianListTab />}
              {activeTab === 'performance' && <PerformanceTab />}
              {activeTab === 'schedule' && <ScheduleTab />}
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// --- TAB: TECHNICIAN LIST ---
function TechnicianListTab() {
  const techs = [
    { name: 'Nguyễn Tiến Dũng', role: 'IoT Specialist', status: 'Online', rating: 4.9, tasks: 12, exp: '8 năm', color: 'blue' },
    { name: 'Lê Minh Hoàng', role: 'Electric Engineer', status: 'Busy', rating: 4.7, tasks: 8, exp: '5 năm', color: 'orange' },
    { name: 'Phạm Thanh Sơn', role: 'System Admin', status: 'Offline', rating: 4.8, tasks: 0, exp: '6 năm', color: 'slate' },
    { name: 'Trần Văn Mạnh', role: 'Maintenance Tech', status: 'Online', rating: 4.5, tasks: 15, exp: '3 năm', color: 'green' },
    { name: 'Hoàng Anh Tuấn', role: 'Hardware Expert', status: 'Online', rating: 5.0, tasks: 5, exp: '10 năm', color: 'blue' },
    { name: 'Đặng Quốc Huy', role: 'IoT Developer', status: 'Busy', rating: 4.6, tasks: 9, exp: '4 năm', color: 'purple' },
  ];

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-4 gap-6">
        <StatCard title="TỔNG NHÂN SỰ" value="24" icon={Users} color="blue" />
        <StatCard title="ĐANG TRỰC" value="18" icon={CheckCircle2} color="green" badge="75%" />
        <StatCard title="ĐANG LÀM VIỆC" value="12" icon={Clock} color="orange" />
        <StatCard title="ĐIỂM ĐÁNH GIÁ TB" value="4.8" icon={Star} color="yellow" />
      </div>

      {/* Filter Bar */}
      <div className="glass-card p-4 rounded-2xl flex items-center justify-between border-white/5">
         <div className="flex gap-4 flex-1 max-w-2xl">
            <div className="relative flex-1">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
               <input type="text" placeholder="Tìm kiếm kỹ thuật viên..." className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-12 pr-4 text-xs text-white focus:outline-none focus:border-blue-500/50" />
            </div>
            <select className="bg-white/5 border border-white/10 rounded-xl py-2 px-4 text-xs font-bold text-slate-400">
               <option>Chuyên môn: Tất cả</option>
            </select>
            <select className="bg-white/5 border border-white/10 rounded-xl py-2 px-4 text-xs font-bold text-slate-400">
               <option>Trạng thái: Tất cả</option>
            </select>
         </div>
         <div className="flex gap-2">
            <button className="p-2.5 rounded-xl bg-white/5 text-slate-400 hover:text-white transition-all"><LayoutGrid size={18} /></button>
            <button className="p-2.5 rounded-xl bg-white/5 text-slate-400 hover:text-white transition-all"><Settings size={18} /></button>
         </div>
      </div>

      {/* Grid of Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {techs.map((tech, i) => (
          <motion.div 
            key={i} 
            whileHover={{ y: -5 }}
            className="glass-card p-6 rounded-[32px] border-white/5 group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-3xl rounded-full -mr-16 -mt-16" />
            
            <div className="flex justify-between items-start mb-6">
               <div className="relative">
                  <div className="w-16 h-16 rounded-2xl bg-slate-800 border-2 border-white/10 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20" />
                    <div className="w-full h-full flex items-center justify-center text-slate-500">
                       <Users size={32} />
                    </div>
                  </div>
                  <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-[#030712] ${tech.status === 'Online' ? 'bg-green-500' : tech.status === 'Busy' ? 'bg-orange-500' : 'bg-slate-500'}`} />
               </div>
               <button className="p-2 rounded-lg hover:bg-white/5 text-slate-600 hover:text-white transition-all">
                  <MoreVertical size={16} />
               </button>
            </div>

            <div className="space-y-1 mb-6">
               <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">{tech.name}</h3>
               <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500 font-medium">{tech.role}</span>
                  <div className="w-1 h-1 rounded-full bg-slate-700" />
                  <span className="text-[10px] text-blue-500 font-bold uppercase tracking-wider">{tech.exp} kinh nghiệm</span>
               </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
               <div className="p-3 rounded-2xl bg-white/5 border border-white/5 space-y-1">
                  <div className="text-[9px] text-slate-600 font-bold uppercase">Điểm tin cậy</div>
                  <div className="flex items-center gap-1.5 text-sm font-bold text-white">
                     <Star size={14} className="text-yellow-500 fill-yellow-500" /> {tech.rating}
                  </div>
               </div>
               <div className="p-3 rounded-2xl bg-white/5 border border-white/5 space-y-1">
                  <div className="text-[9px] text-slate-600 font-bold uppercase">Công việc</div>
                  <div className="text-sm font-bold text-white">
                     {tech.tasks} <span className="text-[10px] text-slate-500 font-medium ml-1">đang nhận</span>
                  </div>
               </div>
            </div>

            <div className="flex gap-3">
               <button className="flex-1 py-2.5 rounded-xl bg-white/5 text-white text-[10px] font-bold border border-white/5 hover:bg-white/10 transition-all">
                  Nhắn tin
               </button>
               <button className="flex-1 py-2.5 rounded-xl bg-blue-500/20 text-blue-400 text-[10px] font-bold border border-blue-500/20 hover:bg-blue-500/30 transition-all">
                  Xem hồ sơ
               </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// --- FORM: ADD TECHNICIAN ---
function AddTechnicianForm({ onCancel }: { onCancel: () => void }) {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
       <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
             <button onClick={onCancel} className="p-2 rounded-xl bg-white/5 text-slate-500 hover:text-white">
                <ChevronRight size={20} className="rotate-180" />
             </button>
             <h2 className="text-2xl font-bold text-white">Thêm kỹ thuật viên mới</h2>
          </div>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
             <div className="glass-card p-10 rounded-[40px] space-y-10 border-white/5">
                <div className="flex items-center gap-3 text-blue-400 font-bold">
                   <Briefcase size={20} />
                   Thông tin cá nhân
                </div>
                <div className="grid grid-cols-2 gap-8">
                   <div className="col-span-2 space-y-2">
                      <label className="text-[10px] text-slate-500 font-bold uppercase tracking-widest ml-1">Họ và tên</label>
                      <input type="text" placeholder="Nhập tên đầy đủ..." className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-white focus:outline-none focus:border-blue-500/50" />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] text-slate-500 font-bold uppercase tracking-widest ml-1">Email công việc</label>
                      <input type="email" placeholder="example@smartelec.ai" className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-white focus:outline-none focus:border-blue-500/50" />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] text-slate-500 font-bold uppercase tracking-widest ml-1">Số điện thoại</label>
                      <input type="text" placeholder="+84 XXX XXX XXX" className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-white focus:outline-none focus:border-blue-500/50" />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] text-slate-500 font-bold uppercase tracking-widest ml-1">Vị trí chuyên môn</label>
                      <select className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-white appearance-none">
                         <option>IoT Specialist</option>
                         <option>Electric Engineer</option>
                         <option>System Admin</option>
                      </select>
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] text-slate-500 font-bold uppercase tracking-widest ml-1">Ngày bắt đầu</label>
                      <input type="date" className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-white" />
                   </div>
                </div>
             </div>

             <div className="glass-card p-10 rounded-[40px] space-y-10 border-white/5">
                <div className="flex items-center gap-3 text-blue-400 font-bold">
                   <Shield size={20} />
                   Cấp quyền hệ thống
                </div>
                <div className="space-y-6">
                   <div className="flex items-center justify-between p-6 rounded-2xl bg-white/[0.02] border border-white/5 group hover:bg-white/5 transition-all">
                      <div className="space-y-1">
                         <div className="text-sm font-bold text-white">Toàn quyền giám sát</div>
                         <div className="text-[10px] text-slate-500">Cho phép truy cập tất cả dashboard realtime</div>
                      </div>
                      <div className="w-12 h-6 bg-blue-500 rounded-full relative">
                         <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                      </div>
                   </div>
                   <div className="flex items-center justify-between p-6 rounded-2xl bg-white/[0.02] border border-white/5 group hover:bg-white/5 transition-all">
                      <div className="space-y-1">
                         <div className="text-sm font-bold text-white">Điều khiển từ xa</div>
                         <div className="text-[10px] text-slate-500">Cho phép thao tác đóng/ngắt thiết bị</div>
                      </div>
                      <div className="w-12 h-6 bg-slate-700 rounded-full relative">
                         <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full" />
                      </div>
                   </div>
                </div>
             </div>
          </div>

          <div className="space-y-8">
             <div className="glass-card p-8 rounded-[40px] flex flex-col items-center gap-6 text-center border-white/5">
                <div className="w-40 h-40 rounded-[40px] bg-slate-800 border-4 border-white/5 flex items-center justify-center relative overflow-hidden group cursor-pointer">
                   <Camera size={32} className="text-slate-600 group-hover:text-blue-500 transition-colors" />
                   <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="space-y-1">
                   <h3 className="text-lg font-bold text-white">Ảnh đại diện</h3>
                   <p className="text-[10px] text-slate-500 px-4 leading-relaxed">Tải ảnh chất lượng cao để hiển thị trên thẻ kỹ thuật viên</p>
                </div>
             </div>

             <div className="glass-card p-10 rounded-[40px] space-y-8 border-white/5">
                <h3 className="text-lg font-bold text-white flex items-center gap-3">
                   <Award size={20} className="text-yellow-500" /> Kỹ năng chính
                </h3>
                <div className="flex flex-wrap gap-2">
                   {['IoT Hardware', 'MQTT Protocol', 'Electric Logic', 'Python', 'Firmware', 'AutoCAD'].map(s => (
                     <div key={s} className="px-4 py-2 rounded-xl bg-white/5 border border-white/5 text-[10px] font-bold text-slate-400 hover:text-white hover:border-blue-500/30 transition-all cursor-pointer">
                        {s}
                     </div>
                   ))}
                   <button className="px-4 py-2 rounded-xl border border-dashed border-white/10 text-[10px] font-bold text-slate-600 hover:text-white transition-all">+ Thêm kỹ năng</button>
                </div>
             </div>

             <div className="flex gap-4">
                <button onClick={onCancel} className="flex-1 py-4 rounded-2xl border border-white/10 text-slate-400 text-xs font-bold hover:bg-white/5 transition-all">Hủy bỏ</button>
                <button className="flex-[2] py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-xs font-bold shadow-xl shadow-blue-500/20 hover:scale-[1.02] transition-all">
                   Lưu nhân sự
                </button>
             </div>
          </div>
       </div>
    </div>
  );
}

// --- TAB: PERFORMANCE ---
function PerformanceTab() {
  return (
    <div className="space-y-8">
       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 glass-card p-12 rounded-[48px] space-y-12 border-white/5 bg-[#0a0f1e]/40">
             <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-white font-bold">
                   <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400">
                      <TrendingUp size={24} />
                   </div>
                   <h3 className="text-2xl tracking-tight font-bold">Biểu đồ năng suất tháng</h3>
                </div>
                <div className="bg-white/5 p-1 rounded-xl flex gap-1">
                   <button className="px-5 py-2.5 rounded-lg bg-white/10 text-white text-[10px] font-bold shadow-xl">Theo Team</button>
                   <button className="px-5 py-2.5 rounded-lg text-slate-500 text-[10px] font-bold">Theo Cá nhân</button>
                </div>
             </div>
             
             {/* Chart Placeholder */}
             <div className="h-80 relative flex items-end justify-between px-4">
                {[45, 60, 40, 85, 70, 95, 80, 65, 55, 90, 75, 88].map((h, i) => (
                  <div key={i} className="w-[6%] flex flex-col items-center gap-4 group">
                     <div className="text-[9px] text-slate-700 font-bold opacity-0 group-hover:opacity-100 transition-opacity">{h}%</div>
                     <motion.div 
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={{ delay: i * 0.05 }}
                        className={`w-full rounded-t-xl relative overflow-hidden ${i === 5 ? 'bg-blue-500' : 'bg-white/5'}`}
                     >
                        {i === 5 && <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/20" />}
                     </motion.div>
                  </div>
                ))}
             </div>
             <div className="flex justify-between text-[10px] text-slate-700 font-bold uppercase tracking-widest px-4 border-t border-white/5 pt-6">
                <span>Tháng 1</span><span>Tháng 4</span><span>Tháng 8</span><span>Tháng 12</span>
             </div>
          </div>

          <div className="space-y-8">
             <div className="glass-card p-10 rounded-[48px] space-y-10 border-white/5 text-center">
                <div className="inline-flex p-4 rounded-[28px] bg-yellow-500/10 text-yellow-500 mb-2">
                   <Award size={32} />
                </div>
                <div className="space-y-2">
                   <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest">Kỹ thuật viên xuất sắc</h3>
                   <div className="text-3xl font-bold text-white">Hoàng Anh Tuấn</div>
                   <div className="text-xs text-blue-400 font-bold">98/100 Expert Score</div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-1">
                      <div className="text-[10px] text-slate-600 font-bold">HOÀN THÀNH</div>
                      <div className="text-xl font-bold text-white">124</div>
                   </div>
                   <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-1">
                      <div className="text-[10px] text-slate-600 font-bold">RATING</div>
                      <div className="text-xl font-bold text-white">5.0</div>
                   </div>
                </div>
             </div>

             <div className="glass-card p-10 rounded-[48px] space-y-10 border-white/5">
                <div className="flex items-center gap-3 text-white font-bold">
                   <PieChart size={20} className="text-purple-400" />
                   Tỷ lệ phản hồi
                </div>
                <div className="space-y-8">
                   {[
                     { label: 'Dưới 15 phút', val: 75, color: 'blue' },
                     { label: '15 - 30 phút', val: 20, color: 'purple' },
                     { label: 'Trên 30 phút', val: 5, color: 'slate' },
                   ].map(s => (
                     <div key={s.label} className="space-y-3">
                        <div className="flex justify-between text-[10px] font-bold">
                           <span className="text-slate-500 uppercase">{s.label}</span>
                           <span className="text-white">{s.val}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                           <div className={`h-full bg-${s.color}-500`} style={{ width: `${s.val}%` }} />
                        </div>
                     </div>
                   ))}
                </div>
             </div>
          </div>
       </div>
    </div>
  );
}

// --- TAB: SCHEDULE ---
function ScheduleTab() {
  const hours = ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00'];
  const dates = ['T2, 14', 'T3, 15', 'T4, 16', 'T5, 17', 'T6, 18', 'T7, 19', 'CN, 20'];

  return (
    <div className="space-y-8">
       <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-blue-400">
                <Calendar size={24} />
             </div>
             <h2 className="text-2xl font-bold text-white tracking-tight">Điều phối công việc Tuần 20</h2>
          </div>
          <div className="flex gap-3">
             <button className="p-3 rounded-2xl bg-white/5 text-slate-500 hover:text-white"><ChevronRight size={20} className="rotate-180" /></button>
             <button className="px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-white text-xs font-bold">Tháng 05, 2026</button>
             <button className="p-3 rounded-2xl bg-white/5 text-slate-500 hover:text-white"><ChevronRight size={20} /></button>
          </div>
       </div>

       <div className="glass-card rounded-[48px] border-white/5 overflow-hidden">
          <div className="grid grid-cols-8 border-b border-white/5">
             <div className="p-8 border-r border-white/5" />
             {dates.map((d, i) => (
               <div key={i} className={`p-8 text-center border-r border-white/5 last:border-0 ${i === 0 ? 'bg-blue-500/5' : ''}`}>
                  <div className={`text-xs font-bold ${i === 0 ? 'text-blue-400' : 'text-slate-500'}`}>{d}</div>
               </div>
             ))}
          </div>
          <div className="relative">
             {hours.map((h, i) => (
               <div key={i} className="grid grid-cols-8 border-b border-white/[0.02] last:border-0">
                  <div className="p-8 text-[10px] text-slate-700 font-bold border-r border-white/5 flex items-center justify-center">{h}</div>
                  {dates.map((_, j) => (
                    <div key={j} className="p-8 border-r border-white/[0.02] last:border-0 relative h-32">
                       {i === 1 && j === 0 && (
                         <div className="absolute inset-2 p-3 rounded-2xl bg-blue-500/20 border border-blue-500/30 space-y-1 cursor-pointer hover:bg-blue-500/30 transition-all z-10">
                            <div className="text-[9px] text-blue-400 font-bold uppercase">Bảo trì TX-902</div>
                            <div className="text-[10px] text-white font-medium">Tiến Dũng</div>
                         </div>
                       )}
                       {i === 3 && j === 0 && (
                         <div className="absolute inset-2 p-3 rounded-2xl bg-purple-500/20 border border-purple-500/30 space-y-1 cursor-pointer hover:bg-purple-500/30 transition-all z-10">
                            <div className="text-[9px] text-purple-400 font-bold uppercase">Lắp đặt Sensor</div>
                            <div className="text-[10px] text-white font-medium">Minh Hoàng</div>
                         </div>
                       )}
                    </div>
                  ))}
               </div>
             ))}
          </div>
       </div>
    </div>
  );
}

// --- SHARED COMPONENT: STAT CARD ---
function StatCard({ title, value, icon: Icon, color, badge }: any) {
  const colorMap: any = {
    blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    green: 'bg-green-500/10 text-green-400 border-green-500/20',
    orange: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    yellow: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    purple: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    slate: 'bg-white/5 text-slate-400 border-white/5',
  };

  return (
    <div className="glass-card p-8 rounded-[32px] space-y-6 flex flex-col justify-between border-white/5">
       <div className="flex justify-between items-start">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${colorMap[color]}`}>
             <Icon size={24} />
          </div>
          {badge && (
            <div className="px-3 py-1 rounded-full bg-green-500/10 text-green-500 text-[10px] font-bold">
               {badge}
            </div>
          )}
       </div>
       <div className="space-y-2">
          <div className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em]">{title}</div>
          <div className="text-4xl font-bold text-white tracking-tighter">{value}</div>
       </div>
    </div>
  );
}
