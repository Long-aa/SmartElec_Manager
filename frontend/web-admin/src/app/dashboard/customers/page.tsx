'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Search, 
  Filter, 
  Plus, 
  MoreVertical, 
  ChevronRight,
  Briefcase,
  Layers,
  CheckCircle2,
  AlertTriangle,
  Zap,
  TrendingUp,
  Download,
  Phone,
  Mail,
  MapPin,
  Clock,
  PieChart,
  LayoutGrid,
  Settings,
  Building2,
  DollarSign,
  Cpu,
  Monitor,
  Calendar,
  Box,
  Activity,
  ArrowUpRight,
  User
} from 'lucide-react';

const tabs = [
  { id: 'list', label: 'Danh sách khách hàng' },
  { id: 'devices', label: 'Thiết bị bàn giao' },
  { id: 'projects', label: 'Quản lý dự án' }
];

export default function CustomersPage() {
  const [activeTab, setActiveTab] = React.useState('list');
  const [isAdding, setIsAdding] = React.useState(false);

  return (
    <div className="space-y-6 relative z-10 pb-10">
      {/* Header & Breadcrumbs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
           <div className="flex items-center gap-2 text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-2">
              <span>Dashboard</span>
              <ChevronRight size={12} />
              <span className="text-cyan-500">Khách hàng</span>
           </div>
           <h1 className="text-4xl font-bold text-white tracking-tight">
             {activeTab === 'list' && 'Quản lý khách hàng'}
             {activeTab === 'devices' && 'Thiết bị bàn giao'}
             {activeTab === 'projects' && 'Quản lý dự án'}
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
          <button 
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-[11px] font-bold shadow-xl shadow-cyan-500/20 hover:scale-105 transition-all"
          >
            <Plus size={18} /> 
            {activeTab === 'projects' ? 'Tạo dự án mới' : 'Thêm khách hàng'}
          </button>
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
            <AddCustomerForm onCancel={() => setIsAdding(false)} />
          ) : (
            <>
              {activeTab === 'list' && <CustomerListTab />}
              {activeTab === 'devices' && <CustomerDevicesTab />}
              {activeTab === 'projects' && <CustomerProjectsTab />}
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// --- TAB: CUSTOMER LIST ---
function CustomerListTab() {
  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-6">
        <StatBox title="TỔNG KHÁCH HÀNG" value="1,248" sub="+12% tháng này" color="cyan" icon={Users} />
        <StatBox title="KH DOANH NGHIỆP" value="892" sub="Chiếm 71.5% tổng số" color="purple" icon={Building2} />
        <StatBox title="DỰ ÁN ĐANG TRIỂN KHAI" value="45" sub="Đang theo đúng tiến độ" color="blue" icon={Briefcase} />
        <StatBox title="DOANH THU BẢO TRÌ" value="đ4.2B" sub="+5.2% YoY" color="green" icon={DollarSign} />
      </div>

      {/* Table Area */}
      <div className="space-y-6">
         {/* Filter Chips */}
         <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {['Đang hoạt động (850)', 'Khách VIP (120)', 'Hợp đồng bảo trì (450)', 'Dự án mới (45)', 'Ngừng hợp tác (8)'].map((chip, i) => (
              <button key={i} className={`px-5 py-2 rounded-xl text-[10px] font-bold border transition-all whitespace-nowrap ${i === 0 ? 'bg-cyan-500/10 border-cyan-500/50 text-cyan-400' : 'bg-white/5 border-white/5 text-slate-500 hover:text-white'}`}>
                <div className="flex items-center gap-2">
                   {i === 0 && <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />}
                   {chip}
                </div>
              </button>
            ))}
         </div>

         <div className="glass-card rounded-[40px] overflow-hidden border-white/5 bg-[#0a0f1e]/40">
            <div className="overflow-x-auto">
               <table className="w-full text-left">
                  <thead>
                     <tr className="text-[10px] text-slate-700 font-bold uppercase tracking-[0.2em] border-b border-white/5">
                        <th className="px-10 py-8">KHÁCH HÀNG</th>
                        <th className="px-6 py-8">LIÊN HỆ</th>
                        <th className="px-6 py-8 text-center">DỰ ÁN</th>
                        <th className="px-6 py-8 text-center">THIẾT BỊ</th>
                        <th className="px-6 py-8">TRẠNG THÁI</th>
                        <th className="px-10 py-8 text-right">THAO TÁC</th>
                     </tr>
                  </thead>
                  <tbody className="text-[11px] text-white">
                     {[
                       { name: 'TechCorp Heavy Industries', id: 'CUST-00124', pic: 'Nguyễn Văn A', email: 'nva@techcorp.vn', phone: '090 123 4567', projects: 3, devices: '1,245', status: 'ĐANG HOẠT ĐỘNG', color: 'cyan' },
                       { name: 'EcoEnergy Solutions VN', id: 'CUST-00289', pic: 'Trần Thị B', email: 'tranb@ecoenergy.com', phone: '098 765 4321', projects: 12, devices: '8,902', status: 'ĐANG HOẠT ĐỘNG', color: 'cyan', vip: true },
                       { name: 'MegaMall Complex', id: 'CUST-00401', pic: 'Lê Hoàng C', email: 'lhc@megamall.vn', phone: '091 234 5678', projects: 1, devices: '450', status: 'DỰ ÁN MỚI', color: 'slate' },
                     ].map((row, i) => (
                       <tr key={i} className="group border-b border-white/[0.02] hover:bg-white/[0.04] transition-all">
                          <td className="px-10 py-8">
                             <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-slate-800 border border-white/5 flex items-center justify-center font-bold text-slate-500 overflow-hidden">
                                   {row.name.charAt(0)}
                                </div>
                                <div className="space-y-1">
                                   <div className="font-bold flex items-center gap-2 group-hover:text-cyan-400 transition-colors">
                                      {row.name}
                                      {row.vip && <span className="px-2 py-0.5 rounded-md bg-purple-500/10 text-purple-400 text-[8px] border border-purple-500/20">VIP</span>}
                                   </div>
                                   <div className="text-[9px] text-slate-600 font-bold tracking-widest uppercase">{row.id}</div>
                                </div>
                             </div>
                          </td>
                          <td className="px-6 py-8">
                             <div className="space-y-1">
                                <div className="font-bold text-slate-300">{row.pic}</div>
                                <div className="text-slate-600 flex items-center gap-2"><Mail size={10} /> {row.email}</div>
                                <div className="text-slate-600 flex items-center gap-2"><Phone size={10} /> {row.phone}</div>
                             </div>
                          </td>
                          <td className="px-6 py-8 text-center font-bold text-lg text-slate-400">{row.projects}</td>
                          <td className="px-6 py-8 text-center font-bold text-lg text-slate-400">{row.devices}</td>
                          <td className="px-6 py-8">
                             <span className={`px-4 py-1.5 rounded-lg text-[9px] font-bold ${row.color === 'cyan' ? 'bg-cyan-500/5 text-cyan-400 border border-cyan-500/20' : 'bg-white/5 text-slate-500 border border-white/10'}`}>
                                {row.status}
                             </span>
                          </td>
                          <td className="px-10 py-8 text-right">
                             <button className="p-2 rounded-lg hover:bg-white/5 text-slate-700 hover:text-white transition-all"><MoreVertical size={16} /></button>
                          </td>
                       </tr>
                     ))}
                  </tbody>
               </table>
            </div>
            <div className="p-10 flex items-center justify-between border-t border-white/5">
               <div className="text-[10px] text-slate-700 font-bold uppercase tracking-widest">Hiển thị 1-10 trong 1,248</div>
               <div className="flex gap-2">
                  <button className="w-10 h-10 rounded-xl bg-white/5 text-slate-700 flex items-center justify-center"><ChevronRight size={18} className="rotate-180" /></button>
                  <button className="w-10 h-10 rounded-xl bg-cyan-500 text-white font-bold text-xs">1</button>
                  <button className="w-10 h-10 rounded-xl bg-white/5 text-slate-700 font-bold text-xs">2</button>
                  <button className="w-10 h-10 rounded-xl bg-white/5 text-slate-700 font-bold text-xs">3</button>
                  <span className="px-2 text-slate-700 self-center">...</span>
                  <button className="w-10 h-10 rounded-xl bg-white/5 text-slate-700 flex items-center justify-center"><ChevronRight size={18} /></button>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}

// --- TAB: DEVICES TAB ---
function CustomerDevicesTab() {
  return (
    <div className="space-y-8">
       {/* Stats Grid */}
       <div className="grid grid-cols-4 gap-6">
          <StatBox title="TỔNG THIẾT BỊ" value="1,248" sub="Đã bàn giao cho 42 dự án" color="cyan" icon={Box} />
          <StatBox title="ĐANG HOẠT ĐỘNG" value="1,102" sub="88% uptime" color="green" icon={CheckCircle2} progress={88} />
          <StatBox title="BẢO TRÌ / OFFLINE" value="134" sub="Lịch định kỳ: 86 | Offline: 48" color="purple" icon={Settings} />
          <StatBox title="CÓ LỖI" value="12" sub="Cần can thiệp khẩn cấp" color="red" icon={AlertTriangle} />
       </div>

       <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2 glass-card p-10 rounded-[40px] border-white/5 bg-[#0a0f1e]/40 space-y-8">
             <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white tracking-tight">Danh sách thiết bị</h3>
                <button className="text-[10px] text-slate-500 font-bold uppercase tracking-widest flex items-center gap-2 hover:text-white transition-all">
                   <Download size={14} /> Xuất báo cáo
                </button>
             </div>
             <div className="overflow-x-auto">
                <table className="w-full text-left">
                   <thead>
                      <tr className="text-[9px] text-slate-700 font-bold uppercase tracking-widest border-b border-white/5">
                         <th className="px-4 py-6">Thiết bị / Serial</th>
                         <th className="px-4 py-6">Dự án / Khách hàng</th>
                         <th className="px-4 py-6">Trạng thái</th>
                         <th className="px-4 py-6">Bảo hành</th>
                         <th className="px-4 py-6 text-right">Hành động</th>
                      </tr>
                   </thead>
                   <tbody className="text-[10px] text-white">
                      {[
                        { sn: 'SE-MTR-001A', name: 'Smart Meter Pro V2', client: 'KCN VSIP Bắc Ninh', group: 'Tập đoàn Alpha', status: 'Realtime', color: 'cyan', warranty: 'Còn 18 tháng' },
                        { sn: 'SE-INV-204X', name: 'Solar Inverter 50kW', client: 'Nhà máy Điện mặt trời QNgai', group: 'Green Energy JSC', status: 'Lỗi biến áp', color: 'red', warranty: 'Còn 2 tháng', alert: true },
                        { sn: 'SE-CTRL-099B', name: 'Master Controller Unit', client: 'Tòa nhà VP Hạng A - Q1', group: 'BĐS Sao Mai', status: 'Bảo trì', color: 'purple', warranty: 'Hết hạn' },
                      ].map((dev, i) => (
                        <tr key={i} className="border-b border-white/[0.02] hover:bg-white/[0.02] transition-all">
                           <td className="px-4 py-6">
                              <div className="flex items-center gap-3">
                                 <div className={`w-1.5 h-1.5 rounded-full ${dev.color === 'cyan' ? 'bg-cyan-500' : dev.color === 'red' ? 'bg-red-500' : 'bg-purple-500'}`} />
                                 <div>
                                    <div className="font-bold text-cyan-400 font-mono tracking-tight">{dev.sn}</div>
                                    <div className="text-slate-500">{dev.name}</div>
                                 </div>
                              </div>
                           </td>
                           <td className="px-4 py-6">
                              <div className="font-bold text-slate-300">{dev.client}</div>
                              <div className="text-slate-600 font-medium">{dev.group}</div>
                           </td>
                           <td className="px-4 py-6">
                              <div className={`px-3 py-1.5 rounded-lg text-[9px] font-bold inline-flex items-center gap-2 ${dev.color === 'cyan' ? 'bg-cyan-500/5 text-cyan-400 border border-cyan-400/20' : dev.color === 'red' ? 'bg-red-500/5 text-red-400 border border-red-400/20' : 'bg-purple-500/5 text-purple-400 border border-purple-400/20'}`}>
                                 {dev.color === 'cyan' ? <Activity size={12} /> : dev.color === 'red' ? <AlertTriangle size={12} /> : <Settings size={12} />}
                                 {dev.status}
                              </div>
                           </td>
                           <td className="px-4 py-6">
                              <div className="space-y-1">
                                 <div className="text-slate-400">{dev.warranty}</div>
                                 {dev.warranty.includes('tháng') && <div className="h-1 w-12 bg-white/5 rounded-full overflow-hidden"><div className={`h-full ${dev.color === 'red' ? 'bg-red-500' : 'bg-cyan-500'}`} style={{ width: '40%' }} /></div>}
                              </div>
                           </td>
                           <td className="px-4 py-6 text-right">
                              <button className="p-2 rounded-lg bg-white/5 text-slate-600 hover:text-white transition-all"><MoreVertical size={14} /></button>
                           </td>
                        </tr>
                      ))}
                   </tbody>
                </table>
             </div>
          </div>

          <div className="space-y-8">
             <div className="glass-card p-10 rounded-[40px] border-white/5 space-y-8">
                <div className="flex items-center gap-3 text-white font-bold">
                   <Zap size={20} className="text-purple-400" />
                   AI Dự báo rủi ro
                </div>
                <div className="space-y-6">
                   {[
                     { sn: 'SE-INV-204X', risk: '92%', desc: 'Dự đoán hỏng tụ điện trong vòng 48h dựa trên mẫu nhiệt độ.', color: 'red' },
                     { sn: 'SE-MTR-881B', risk: '65%', desc: 'Suy giảm hiệu suất truyền dẫn tín hiệu (Signal decay).', color: 'purple' },
                   ].map((risk, i) => (
                     <div key={i} className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 space-y-4">
                        <div className="flex justify-between items-center">
                           <span className="text-xs font-bold text-white">{risk.sn}</span>
                           <span className={`text-[11px] font-bold ${risk.color === 'red' ? 'text-red-500' : 'text-purple-400'}`}>{risk.risk} Risk</span>
                        </div>
                        <p className="text-[10px] text-slate-500 leading-relaxed font-medium">{risk.desc}</p>
                        {risk.color === 'red' && <button className="w-full py-2.5 rounded-xl bg-red-500 text-white text-[9px] font-bold shadow-lg shadow-red-500/20">Tạo lệnh kiểm tra</button>}
                     </div>
                   ))}
                </div>
             </div>

             <div className="glass-card p-10 rounded-[40px] border-white/5 space-y-10 text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8">
                   <LayoutGrid size={32} className="text-cyan-500/10" />
                </div>
                <div className="flex flex-col items-center gap-6">
                   <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest">Sức khỏe hệ thống</h3>
                   <div className="relative w-40 h-40">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                         <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="6" className="text-white/[0.02]" />
                         <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8" strokeDasharray="282.7" strokeDashoffset={282.7 * (1 - 0.92)} className="text-cyan-500 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]" />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                         <div className="text-4xl font-bold text-white">92<span className="text-lg">%</span></div>
                         <div className="text-[10px] text-cyan-400 font-bold uppercase">Tốt</div>
                      </div>
                   </div>
                   <div className="grid grid-cols-2 gap-8 w-full pt-4">
                      <div className="space-y-1">
                         <div className="text-[9px] text-slate-600 font-bold">UPTIME MTB.</div>
                         <div className="text-sm font-bold text-white">99.8%</div>
                      </div>
                      <div className="space-y-1">
                         <div className="text-[9px] text-slate-600 font-bold">TUỔI THỌ TB</div>
                         <div className="text-sm font-bold text-white">3.2 Năm</div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
       </div>
    </div>
  );
}

// --- TAB: PROJECTS TAB ---
function CustomerProjectsTab() {
  return (
    <div className="grid grid-cols-3 gap-8">
       <div className="col-span-2 space-y-10">
          {/* Quick Filters */}
          <div className="flex items-center justify-between">
             <div className="flex gap-3">
                {['Tất cả', 'Đang triển khai', 'Tạm dừng', 'Hoàn thành', 'Khẩn cấp'].map((f, i) => (
                  <button key={i} className={`px-4 py-2 rounded-xl text-[10px] font-bold border transition-all ${i === 1 ? 'bg-cyan-500 text-white border-cyan-500 shadow-lg shadow-cyan-500/20' : 'bg-white/5 border-white/5 text-slate-500 hover:text-white'}`}>
                    {f}
                  </button>
                ))}
             </div>
             <div className="flex gap-4">
                <div className="text-center">
                   <div className="text-xl font-bold text-white">24</div>
                   <div className="text-[9px] text-slate-600 font-bold uppercase">TỔNG DỰ ÁN</div>
                </div>
                <div className="text-center px-6 border-x border-white/5">
                   <div className="text-xl font-bold text-cyan-400">12</div>
                   <div className="text-[9px] text-slate-600 font-bold uppercase">ĐANG TRIỂN KHAI</div>
                </div>
                <div className="text-center">
                   <div className="text-xl font-bold text-red-500">4</div>
                   <div className="text-[9px] text-slate-600 font-bold uppercase">QUÁ HẠN</div>
                </div>
             </div>
          </div>

          <div className="space-y-8">
             <h3 className="text-2xl font-bold text-white tracking-tight">Dự án trọng điểm</h3>
             {[
               { id: 'PRJ-2023-089', title: 'Nâng cấp Trạm Biến Áp KCN Sóng Thần', client: 'Vinamilk Corp.', pm: 'Nguyễn Văn A', active: '45/120', time: '3 tháng (Còn 45 ngày)', deadline: '15/11/2023', progress: 65, color: 'purple' },
               { id: 'PRJ-2023-042', title: 'Bảo trì Hệ thống Sensor Kho Lạnh', client: 'Mega Market', pm: 'Phạm Thị B', active: '10/10', time: '1 tuần', deadline: 'Hôm nay', progress: 85, color: 'orange', urgent: true },
             ].map((prj, i) => (
               <div key={i} className="glass-card p-10 rounded-[48px] border-white/5 space-y-10 group hover:bg-white/[0.04] transition-all relative overflow-hidden">
                  <div className="flex justify-between items-start">
                     <div className="flex gap-3">
                        <span className="px-3 py-1 rounded-lg bg-white/5 text-[9px] font-bold text-slate-600">{prj.id}</span>
                        <span className={`px-3 py-1 rounded-lg text-[9px] font-bold flex items-center gap-2 ${prj.urgent ? 'bg-red-500/10 text-red-500 border border-red-500/20' : 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'}`}>
                           <div className={`w-1 h-1 rounded-full ${prj.urgent ? 'bg-red-500' : 'bg-cyan-500'}`} />
                           {prj.urgent ? 'Khẩn cấp' : 'Đang triển khai'}
                        </span>
                     </div>
                     <div className="text-right">
                        <div className="text-[10px] text-slate-700 font-bold uppercase tracking-widest">DEADLINE</div>
                        <div className={`text-sm font-bold ${prj.urgent ? 'text-red-500' : 'text-slate-300'}`}>{prj.deadline}</div>
                     </div>
                  </div>

                  <div className="space-y-2">
                     <h4 className="text-3xl font-bold text-white group-hover:text-cyan-400 transition-colors tracking-tight">{prj.title}</h4>
                     <p className="text-slate-500 font-bold text-sm flex items-center gap-2"><Building2 size={14} /> {prj.client}</p>
                  </div>

                  <div className="grid grid-cols-3 gap-10">
                     <div className="space-y-1">
                        <div className="text-[10px] text-slate-700 font-bold uppercase">Quản lý dự án</div>
                        <div className="flex items-center gap-3">
                           <div className="w-8 h-8 rounded-full bg-slate-800 border border-white/10" />
                           <span className="text-xs font-bold text-white">{prj.pm}</span>
                        </div>
                     </div>
                     <div className="space-y-1">
                        <div className="text-[10px] text-slate-700 font-bold uppercase">Thiết bị</div>
                        <div className="text-sm font-bold text-white">{prj.active} <span className="text-slate-600 font-medium">active</span></div>
                     </div>
                     <div className="space-y-1">
                        <div className="text-[10px] text-slate-700 font-bold uppercase">Thời gian triển khai</div>
                        <div className="text-sm font-bold text-white">{prj.time}</div>
                     </div>
                  </div>

                  <div className="space-y-4">
                     <div className="flex justify-between text-lg font-bold">
                        <span className="text-white">{prj.progress}%</span>
                     </div>
                     <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: `${prj.progress}%` }} className={`h-full bg-gradient-to-r ${prj.color === 'purple' ? 'from-purple-500 to-cyan-500 shadow-[0_0_15px_rgba(168,85,247,0.4)]' : 'from-orange-500 to-red-500 shadow-[0_0_15px_rgba(249,115,22,0.4)]'}`} />
                     </div>
                  </div>
               </div>
             ))}
          </div>
       </div>

       <div className="space-y-10">
          <div className="glass-card p-10 rounded-[48px] border-white/5 space-y-10">
             <div className="flex items-center gap-3 text-white font-bold">
                <Activity size={20} className="text-cyan-400" />
                Timeline Dự án
             </div>
             <div className="space-y-12 relative px-4">
                <div className="absolute top-2 bottom-2 left-6 w-px bg-white/5" />
                {[
                  { time: 'Hôm nay, 09:00', task: 'Review thiết kế trạm KCN Sóng Thần', active: true },
                  { time: 'Ngày mai, 14:00', task: 'Nghiệm thu lô sensor nhiệt độ' },
                  { time: '20/10/2023', task: 'Triển khai lắp đặt Giai đoạn 1' },
                ].map((ev, i) => (
                  <div key={i} className="flex gap-10 relative">
                     <div className={`w-4 h-4 rounded-full border-4 border-[#030712] relative z-10 ${ev.active ? 'bg-cyan-500 shadow-[0_0_10px_rgba(34,211,238,0.5)]' : 'bg-slate-700'}`} />
                     <div className="space-y-1">
                        <div className={`text-[10px] font-bold uppercase ${ev.active ? 'text-cyan-400' : 'text-slate-600'}`}>{ev.time}</div>
                        <p className={`text-xs font-medium leading-relaxed ${ev.active ? 'text-white' : 'text-slate-500'}`}>{ev.task}</p>
                     </div>
                  </div>
                ))}
             </div>
          </div>

          <div className="glass-card p-10 rounded-[48px] border-white/5 space-y-10">
             <div className="flex items-center gap-3 text-white font-bold">
                <DollarSign size={20} className="text-purple-400" />
                Budget Usage
             </div>
             <div className="flex flex-col items-center gap-6">
                <div className="relative w-40 h-40">
                   <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="6" className="text-white/[0.02]" />
                      <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8" strokeDasharray="282.7" strokeDashoffset={282.7 * (1 - 0.75)} className="text-purple-500 drop-shadow-[0_0_10px_rgba(168,85,247,0.4)]" />
                   </svg>
                   <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <div className="text-3xl font-bold text-white">75<span className="text-sm">%</span></div>
                      <div className="text-[9px] text-slate-600 font-bold uppercase">Đã dùng</div>
                   </div>
                </div>
                <div className="grid grid-cols-2 gap-4 w-full">
                   <div className="text-center">
                      <div className="text-[10px] text-slate-700 font-bold uppercase">Tổng: 1.2B VND</div>
                   </div>
                   <div className="text-center border-l border-white/5">
                      <div className="text-[10px] text-purple-400 font-bold uppercase">Còn: 300M VND</div>
                   </div>
                </div>
             </div>
          </div>
       </div>
    </div>
  );
}

// --- FORM: ADD CUSTOMER ---
function AddCustomerForm({ onCancel }: { onCancel: () => void }) {
  return (
    <div className="max-w-4xl mx-auto space-y-10">
       <div className="flex items-center gap-6">
          <button onClick={onCancel} className="p-3 rounded-2xl bg-white/5 text-slate-500 hover:text-white transition-all">
             <ChevronRight size={24} className="rotate-180" />
          </button>
          <h2 className="text-3xl font-bold text-white tracking-tight">Thêm khách hàng / Đối tác mới</h2>
       </div>

       <div className="grid grid-cols-3 gap-10">
          <div className="col-span-2 space-y-8">
             <div className="glass-card p-10 rounded-[40px] border-white/5 space-y-10">
                <div className="flex items-center gap-3 text-cyan-400 font-bold">
                   <Building2 size={24} />
                   Thông tin doanh nghiệp
                </div>
                <div className="grid grid-cols-2 gap-8">
                   <div className="col-span-2 space-y-2">
                      <label className="text-[10px] text-slate-500 font-bold uppercase tracking-widest ml-1">Tên công ty / Tổ chức</label>
                      <input type="text" placeholder="Ví dụ: Công ty Cổ phần Năng lượng Xanh" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-cyan-500/50" />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] text-slate-500 font-bold uppercase tracking-widest ml-1">Mã số thuế</label>
                      <input type="text" placeholder="0123456789" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-cyan-500/50" />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] text-slate-500 font-bold uppercase tracking-widest ml-1">Lĩnh vực hoạt động</label>
                      <select className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white appearance-none">
                         <option>Sản xuất công nghiệp</option>
                         <option>Bất động sản</option>
                         <option>Năng lượng tái tạo</option>
                      </select>
                   </div>
                   <div className="col-span-2 space-y-2">
                      <label className="text-[10px] text-slate-500 font-bold uppercase tracking-widest ml-1">Địa chỉ trụ sở</label>
                      <input type="text" placeholder="Nhập địa chỉ đầy đủ..." className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white" />
                   </div>
                </div>
             </div>

             <div className="glass-card p-10 rounded-[40px] border-white/5 space-y-10">
                <div className="flex items-center gap-3 text-purple-400 font-bold">
                   <User size={24} />
                   Người đại diện liên hệ
                </div>
                <div className="grid grid-cols-2 gap-8">
                   <div className="space-y-2">
                      <label className="text-[10px] text-slate-500 font-bold uppercase tracking-widest ml-1">Họ và tên PIC</label>
                      <input type="text" placeholder="Ví dụ: Nguyễn Văn A" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white" />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] text-slate-500 font-bold uppercase tracking-widest ml-1">Chức vụ</label>
                      <input type="text" placeholder="Ví dụ: Giám đốc Kỹ thuật" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white" />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] text-slate-500 font-bold uppercase tracking-widest ml-1">Email</label>
                      <input type="email" placeholder="email@company.vn" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white" />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] text-slate-500 font-bold uppercase tracking-widest ml-1">Số điện thoại</label>
                      <input type="text" placeholder="090 XXX XXXX" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white" />
                   </div>
                </div>
             </div>
          </div>

          <div className="space-y-8">
             <div className="glass-card p-10 rounded-[40px] border-white/5 text-center space-y-6">
                <div className="w-32 h-32 rounded-[32px] bg-white/[0.02] border-2 border-dashed border-white/10 flex items-center justify-center mx-auto group hover:border-cyan-500/50 cursor-pointer transition-all">
                   <Download size={32} className="text-slate-700 group-hover:text-cyan-500 transition-colors" />
                </div>
                <div className="space-y-1">
                   <h4 className="text-sm font-bold text-white tracking-tight">Logo doanh nghiệp</h4>
                   <p className="text-[10px] text-slate-600 leading-relaxed">Hỗ trợ định dạng PNG, SVG. Tối đa 2MB.</p>
                </div>
             </div>

             <div className="glass-card p-10 rounded-[40px] border-white/5 space-y-8">
                <h4 className="text-xs font-bold text-white uppercase tracking-widest">Phân loại khách hàng</h4>
                <div className="space-y-4">
                   {['Khách hàng VIP', 'Đối tác chiến lược', 'Hợp đồng bảo trì', 'Dự án ngắn hạn'].map((cat, i) => (
                     <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/5 group hover:bg-white/5 cursor-pointer transition-all">
                        <span className="text-[11px] font-bold text-slate-500 group-hover:text-white">{cat}</span>
                        <div className={`w-5 h-5 rounded-md border border-white/10 flex items-center justify-center ${i === 0 ? 'bg-cyan-500 border-cyan-500' : ''}`}>
                           {i === 0 && <CheckCircle2 size={12} className="text-white" />}
                        </div>
                     </div>
                   ))}
                </div>
             </div>

             <div className="flex gap-4">
                <button onClick={onCancel} className="flex-1 py-4 rounded-2xl border border-white/10 text-slate-400 text-[11px] font-bold hover:bg-white/5 transition-all">Hủy bỏ</button>
                <button className="flex-[2] py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-[11px] font-bold shadow-xl shadow-cyan-500/20 hover:scale-[1.05] transition-all">Lưu khách hàng</button>
             </div>
          </div>
       </div>
    </div>
  );
}

// --- SHARED COMPONENT: STAT BOX ---
function StatBox({ title, value, sub, color, icon: Icon, progress }: any) {
  const colors: any = {
    cyan: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20 shadow-cyan-500/5',
    purple: 'text-purple-400 bg-purple-500/10 border-purple-500/20 shadow-purple-500/5',
    blue: 'text-blue-400 bg-blue-500/10 border-blue-500/20 shadow-blue-500/5',
    green: 'text-green-400 bg-green-500/10 border-green-500/20 shadow-green-500/5',
    red: 'text-red-400 bg-red-500/10 border-red-500/20 shadow-red-500/5',
  };

  return (
    <div className="glass-card p-10 rounded-[40px] space-y-8 flex flex-col justify-between border-white/5 transition-all hover:border-white/10 relative overflow-hidden group">
       <div className="absolute top-0 right-0 p-8">
          <Icon size={24} className="text-slate-800 group-hover:text-cyan-500/20 transition-all" />
       </div>
       <div className="space-y-4">
          <div className="text-[11px] text-slate-500 font-bold uppercase tracking-[0.2em]">{title}</div>
          <div className="flex items-baseline gap-2">
             <div className="text-5xl font-bold text-white tracking-tighter">{value}</div>
          </div>
       </div>
       <div className="space-y-4 pt-4 border-t border-white/[0.03]">
          <div className={`text-[10px] font-bold flex items-center gap-2 ${colors[color].split(' ')[0]}`}>
             {sub.includes('+') ? <TrendingUp size={14} /> : <div className="w-1.5 h-1.5 rounded-full bg-current" />}
             {sub}
          </div>
          {progress && (
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
               <div className={`h-full ${colors[color].split(' ')[1].replace('bg-', 'bg-')}`} style={{ width: `${progress}%` }} />
            </div>
          )}
       </div>
    </div>
  );
}
