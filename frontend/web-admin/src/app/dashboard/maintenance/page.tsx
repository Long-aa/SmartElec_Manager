'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Wrench, 
  Search, 
  Filter, 
  Plus, 
  MoreVertical, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  ChevronRight,
  User,
  Zap,
  LayoutGrid,
  FileText,
  Activity,
  History,
  Workflow,
  ArrowRight,
  Shield,
  Camera,
  Cpu,
  Share2,
  Box,
  ClipboardList,
  MapPin,
  QrCode,
  Calendar,
  Download,
  RotateCcw,
  Settings,
  PieChart,
  Monitor,
  TrendingDown,
  TrendingUp
} from 'lucide-react';

const tabs = [
  { id: 'tickets', label: 'Danh sách phiếu' },
  { id: 'assignment', label: 'Phân công kỹ thuật' },
  { id: 'workflow', label: 'Luồng công việc (Workflow)' },
  { id: 'history', label: 'Lịch sử bảo trì' }
];

export default function MaintenancePage() {
  const [activeTab, setActiveTab] = React.useState('tickets');
  const [isCreating, setIsCreating] = React.useState(false);

  return (
    <div className="space-y-6 relative z-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
           <div className="flex items-center gap-2 text-slate-500 text-xs mb-2 uppercase tracking-widest font-bold">
              <span>Hệ thống</span>
              <ChevronRight size={12} />
              <span className="text-purple-500">Bảo trì & Sửa chữa</span>
           </div>
           <h1 className="text-4xl font-bold text-white tracking-tight leading-none">
             {activeTab === 'tickets' && 'Quản lý phiếu sửa chữa'}
             {activeTab === 'assignment' && 'Phân công kỹ thuật viên'}
             {activeTab === 'workflow' && 'Giám sát Workflow'}
             {activeTab === 'history' && 'Tra cứu lịch sử bảo trì'}
           </h1>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-1 flex gap-1 backdrop-blur-md">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2.5 rounded-xl text-[10px] font-bold transition-all relative whitespace-nowrap ${
                  activeTab === tab.id ? 'text-white bg-white/10 shadow-xl' : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          {activeTab === 'tickets' && (
            <button 
              onClick={() => setIsCreating(true)}
              className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-bold shadow-xl shadow-purple-500/20 hover:scale-105 transition-all"
            >
              <Plus size={18} /> Tạo phiếu sửa
            </button>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab + (isCreating ? '-create' : '')}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {isCreating ? (
            <CreateTicketForm onCancel={() => setIsCreating(false)} />
          ) : (
            <>
              {activeTab === 'tickets' && <TicketListTab />}
              {activeTab === 'assignment' && <AssignmentTab />}
              {activeTab === 'workflow' && <WorkflowTab />}
              {activeTab === 'history' && <MaintenanceHistoryTab />}
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// --- TAB: TICKET LIST ---
function TicketListTab() {
  return (
    <div className="space-y-8">
      {/* Summary Metrics */}
      <div className="grid grid-cols-4 gap-8">
        <MetricBox title="Tổng số phiếu" value="1,284" sub="+12%" color="purple" />
        <MetricBox title="Đang xử lý" value="43" sub="Active" color="blue" />
        <MetricBox title="Khẩn cấp" value="7" icon={AlertTriangle} color="red" />
        <MetricBox title="Hoàn thành (30 ngày)" value="892" icon={CheckCircle2} color="green" />
      </div>

      {/* Ticket Table */}
      <div className="glass-card rounded-[40px] overflow-hidden border-white/5 bg-[#0a0f1e]/40">
        <div className="p-10 flex items-center justify-between border-b border-white/5">
           <h3 className="text-2xl font-bold text-white tracking-tight">Danh sách phiếu yêu cầu</h3>
           <div className="flex gap-3">
              <div className="relative w-72">
                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                 <input type="text" placeholder="Tìm kiếm phiếu, thiết bị..." className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-[11px] text-white focus:outline-none" />
              </div>
              <button className="p-3 rounded-xl bg-white/5 text-slate-500 hover:text-white transition-all"><Filter size={20} /></button>
           </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] text-slate-600 font-bold uppercase tracking-[0.2em] border-b border-white/5">
                <th className="px-10 py-8">Mã phiếu</th>
                <th className="px-6 py-8">Thiết bị</th>
                <th className="px-6 py-8">Người yêu cầu</th>
                <th className="px-6 py-8">Ưu tiên</th>
                <th className="px-6 py-8">Tiến độ</th>
                <th className="px-6 py-8">Kỹ thuật viên</th>
                <th className="px-10 py-8 text-right">Deadline</th>
              </tr>
            </thead>
            <tbody className="text-[11px] text-white font-medium">
              {[
                { id: 'TK-2023-8901', asset: 'Turbine TR-4A', zone: 'Zone Alpha Sector 7', user: 'Nguyen Van A', prio: 'Cao', progress: 25, label: 'Chẩn đoán lỗi', tech: 'Tran B (Lead)', deadline: 'Hôm nay, 18:00', color: 'red' },
                { id: 'TK-2023-8895', asset: 'Biến áp trạm 2', zone: 'Zone Beta Central', user: 'System Auto', prio: 'Trung bình', progress: 60, label: 'Đang thay thế linh kiện', tech: 'Le Van C', deadline: '12/10/2023', color: 'blue' },
                { id: 'TK-2023-8842', asset: 'Cảm biến nhiệt SC-9', zone: 'Grid Node 44', user: 'Pham D', prio: 'Thấp', progress: 10, label: 'Chờ vật tư', tech: 'Chưa phân công', deadline: '15/10/2023', color: 'slate' },
              ].map((tk, i) => (
                <tr key={i} className="group border-b border-white/[0.02] hover:bg-white/[0.03] transition-all cursor-pointer">
                  <td className="px-10 py-8 text-purple-400 font-bold">{tk.id}</td>
                  <td className="px-6 py-8">
                     <div className="font-bold text-white group-hover:text-purple-400 transition-colors">{tk.asset}</div>
                     <div className="text-[9px] text-slate-600 font-bold mt-1 uppercase">{tk.zone}</div>
                  </td>
                  <td className="px-6 py-8 text-slate-400">{tk.user}</td>
                  <td className="px-6 py-8">
                     <span className={`px-3 py-1 rounded text-[9px] font-bold uppercase tracking-widest ${tk.color === 'red' ? 'bg-red-500/10 text-red-500 border border-red-500/20' : tk.color === 'blue' ? 'bg-blue-500/10 text-blue-500 border border-blue-500/20' : 'bg-white/5 text-slate-500 border border-white/10'}`}>
                        {tk.prio}
                     </span>
                  </td>
                  <td className="px-6 py-8">
                     <div className="space-y-2 max-w-[140px]">
                        <div className="flex justify-between text-[9px] font-bold uppercase">
                           <span className="text-slate-600">{tk.label}</span>
                           <span className="text-white">{tk.progress}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                           <motion.div initial={{ width: 0 }} animate={{ width: `${tk.progress}%` }} className={`h-full ${tk.color === 'red' ? 'bg-red-500' : tk.color === 'blue' ? 'bg-blue-400' : 'bg-slate-600'}`} />
                        </div>
                     </div>
                  </td>
                  <td className="px-6 py-8 text-slate-300 italic">{tk.tech}</td>
                  <td className={`px-10 py-8 text-right font-bold ${tk.deadline.includes('Hôm nay') ? 'text-orange-500' : 'text-slate-600'}`}>{tk.deadline}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-10 flex items-center justify-between border-t border-white/5">
           <div className="text-[10px] text-slate-700 font-bold uppercase tracking-widest">Hiển thị 1-3 trong 43 phiếu</div>
           <div className="flex gap-4">
              <button className="w-12 h-12 rounded-2xl bg-white/5 text-slate-600 hover:text-white transition-all flex items-center justify-center"><ChevronRight size={20} className="rotate-180" /></button>
              <button className="w-12 h-12 rounded-2xl bg-white/5 text-slate-600 hover:text-white transition-all flex items-center justify-center"><ChevronRight size={20} /></button>
           </div>
        </div>
      </div>
    </div>
  );
}

// --- TAB: ASSIGNMENT ---
function AssignmentTab() {
  return (
    <div className="space-y-8">
       {/* AI Recommendation Header */}
       <div className="p-8 rounded-[40px] bg-gradient-to-r from-purple-600/20 via-indigo-600/10 to-transparent border border-white/10 flex items-center justify-between shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 blur-[80px] -mr-32 -mt-32" />
          <div className="flex items-center gap-6 relative z-10">
             <div className="w-16 h-16 rounded-[24px] bg-purple-500 flex items-center justify-center shadow-lg shadow-purple-500/40 animate-pulse">
                <Zap size={32} className="text-white" />
             </div>
             <div className="space-y-1">
                <div className="text-[10px] text-purple-400 font-bold uppercase tracking-[0.2em]">AI Recommendation</div>
                <p className="text-lg text-white font-medium">
                   Phân công <span className="text-purple-400 font-bold">KTV. Sarah J.</span> cho <span className="text-cyan-400 font-bold">Sự cố Trạm Biến Áp B</span> (Độ phù hợp 98%).
                </p>
             </div>
          </div>
          <button className="px-8 py-3 rounded-2xl bg-purple-500 text-white text-[11px] font-bold shadow-xl shadow-purple-500/20 hover:scale-105 transition-all relative z-10">Áp dụng</button>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Unassigned Queue */}
          <div className="glass-card p-10 rounded-[48px] space-y-10 border-white/5">
             <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-white font-bold">
                   <LayoutGrid size={20} className="text-orange-500" />
                   Hàng đợi chờ phân công
                </div>
                <span className="px-3 py-1 rounded-lg bg-orange-500/10 text-orange-500 text-[10px] font-bold">5 Khẩn cấp</span>
             </div>
             <div className="space-y-6">
                {[
                  { id: 'T-8921', title: 'Rò rỉ dầu máy biến áp', zone: 'Sector 4, Sub C', labels: ['HV Cert Req', 'Est: 4h'], status: 'Critical' },
                  { id: 'T-8922', title: 'Lỗi truyền tin SCADA', zone: 'Node Alpha 12', labels: ['Software', 'Est: 1h'], status: 'Urgent' },
                ].map((task, i) => (
                  <div key={i} className="p-6 rounded-[32px] bg-white/[0.02] border border-white/5 space-y-4 group hover:bg-white/5 transition-all cursor-pointer">
                     <div className="flex justify-between items-start">
                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{task.id}</span>
                        <AlertTriangle size={14} className="text-orange-500" />
                     </div>
                     <div className="space-y-1">
                        <h4 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors">{task.title}</h4>
                        <div className="text-[10px] text-slate-500 flex items-center gap-2"><MapPin size={10} /> {task.zone}</div>
                     </div>
                     <div className="flex gap-2">
                        {task.labels.map(l => (
                          <span key={l} className="px-3 py-1 rounded-lg bg-white/5 text-[9px] font-bold text-slate-400">{l}</span>
                        ))}
                     </div>
                  </div>
                ))}
             </div>
          </div>

          {/* Technician Workload */}
          <div className="lg:col-span-2 glass-card p-10 rounded-[48px] space-y-10 border-white/5">
             <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-white font-bold">
                   <User size={20} className="text-cyan-500" />
                   Tải công việc Kỹ thuật viên
                </div>
                <div className="flex gap-2">
                   <button className="px-4 py-2 rounded-xl bg-cyan-500/10 text-cyan-400 text-[10px] font-bold">Zone Alpha</button>
                   <button className="px-4 py-2 rounded-xl bg-white/5 text-slate-500 text-[10px] font-bold">Zone Beta</button>
                </div>
             </div>
             
             <div className="space-y-10">
                {[
                  { name: 'Sarah J.', role: 'Senior HV Tech', zone: 'Zone A', workload: 85, task: 'Breaker Reset & Test', taskId: 'T-8804' },
                  { name: 'Michael K.', role: 'System Specialist', zone: 'Zone A', workload: 30, task: 'Calibration SCADA', taskId: 'T-8809' },
                ].map((ktv, i) => (
                  <div key={i} className="p-8 rounded-[40px] bg-white/[0.02] border border-white/5 space-y-8">
                     <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                           <div className="w-12 h-12 rounded-2xl bg-slate-800 border-2 border-white/10" />
                           <div>
                              <div className="text-lg font-bold text-white">{ktv.name}</div>
                              <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{ktv.role} • {ktv.zone}</div>
                           </div>
                        </div>
                        <div className="space-y-2 min-w-[200px]">
                           <div className="flex justify-between text-[9px] font-bold uppercase">
                              <span className="text-slate-600">Workload</span>
                              <span className={ktv.workload > 80 ? 'text-orange-500' : 'text-cyan-400'}>{ktv.workload}%</span>
                           </div>
                           <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                              <div className={`h-full ${ktv.workload > 80 ? 'bg-orange-500' : 'bg-cyan-500'}`} style={{ width: `${ktv.workload}%` }} />
                           </div>
                        </div>
                     </div>
                     <div className="p-6 rounded-[28px] bg-[#030712] border border-white/5 flex items-center justify-between group cursor-pointer hover:border-purple-500/30 transition-all">
                        <div className="space-y-1">
                           <div className="text-[9px] text-slate-600 font-bold uppercase">{ktv.taskId}</div>
                           <div className="text-sm font-bold text-white group-hover:text-purple-400 transition-colors">{ktv.task}</div>
                        </div>
                        <span className="px-3 py-1 rounded-lg bg-green-500/10 text-green-500 text-[9px] font-bold uppercase">In Progress</span>
                     </div>
                  </div>
                ))}
             </div>
          </div>
       </div>
    </div>
  );
}

// --- TAB: WORKFLOW ---
function WorkflowTab() {
  return (
    <div className="space-y-8">
       <div className="flex items-center justify-between">
          <div className="space-y-1">
             <div className="text-[10px] text-red-500 font-bold uppercase tracking-widest">URGENT • TKT-8924-X</div>
             <h2 className="text-4xl font-bold text-white tracking-tight">Xử lý lỗi máy phát Turbine 04</h2>
          </div>
          <div className="flex gap-3">
             <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-[10px] font-bold"><Share2 size={14} /> Phân công</button>
             <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-[10px] font-bold"><Activity size={14} /> Đổi trạng thái</button>
             <button className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 text-white text-[10px] font-bold shadow-xl shadow-purple-500/20"><Box size={14} /> Yêu cầu linh kiện</button>
          </div>
       </div>

       <div className="glass-card p-12 rounded-[56px] border-white/5 bg-[#0a0f1e]/40 h-[600px] relative overflow-hidden group">
          {/* Background Grid */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          
          {/* Workflow Nodes */}
          <div className="relative h-full w-full flex items-center justify-between px-20">
             <WorkflowNode label="Tiếp nhận" time="08:00 AM" done />
             <div className="flex-1 h-0.5 bg-cyan-500/40 relative">
                <div className="absolute inset-0 bg-cyan-500 shadow-[0_0_15px_rgba(34,211,238,0.5)] animate-pulse" />
             </div>
             <WorkflowNode label="Kiểm tra" time="08:45 AM" done />
             <div className="flex-1 h-0.5 bg-cyan-500/40 relative">
                <div className="absolute inset-0 bg-cyan-500 shadow-[0_0_15px_rgba(34,211,238,0.5)] animate-pulse" />
             </div>
             <WorkflowNode label="Chẩn đoán (AI)" time="In Progress" active />
             <div className="flex-1 h-0.5 bg-white/5" />
             <WorkflowNode label="Sửa chữa" time="Pending" />

             {/* AI Diagnostic Detail Box */}
             <div className="absolute bottom-40 right-1/4 translate-x-12 p-6 glass-card rounded-[32px] border-cyan-500/40 w-72 space-y-4 animate-float shadow-2xl">
                <div className="flex items-center gap-3">
                   <div className="w-8 h-8 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                      <Zap size={18} />
                   </div>
                   <div className="text-xs font-bold text-white">AI Diagnostics...</div>
                </div>
                <div className="space-y-2">
                   <div className="flex justify-between text-[9px] font-bold">
                      <span className="text-slate-500 uppercase">SLA Status</span>
                      <span className="text-cyan-400">65%</span>
                   </div>
                   <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-cyan-500" style={{ width: '65%' }} />
                   </div>
                </div>
             </div>
          </div>

          {/* Legend */}
          <div className="absolute bottom-10 right-10 p-6 glass-card rounded-2xl border-white/5 space-y-3">
             <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-2">Chú thích</div>
             <div className="flex items-center gap-3 text-[10px] font-bold text-white"><div className="w-2 h-2 rounded-full bg-cyan-500" /> Hoàn thành</div>
             <div className="flex items-center gap-3 text-[10px] font-bold text-white"><div className="w-2 h-2 rounded-full bg-blue-400" /> Đang xử lý</div>
             <div className="flex items-center gap-3 text-[10px] font-bold text-white"><div className="w-2 h-2 rounded-full bg-slate-700" /> Chờ thực hiện</div>
          </div>
       </div>
    </div>
  );
}

function WorkflowNode({ label, time, done, active }: any) {
  return (
    <div className={`flex flex-col items-center gap-4 relative z-10 transition-all duration-500 ${active ? 'scale-110' : ''}`}>
       <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border-2 transition-all ${done ? 'bg-cyan-500 border-cyan-400 text-white shadow-lg shadow-cyan-500/20' : active ? 'bg-[#0a0f1e] border-cyan-500 text-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.4)]' : 'bg-[#0a0f1e] border-white/10 text-slate-700'}`}>
          {done ? <CheckCircle2 size={24} /> : active ? <Zap size={24} className="animate-pulse" /> : <Clock size={24} />}
       </div>
       <div className="text-center">
          <div className={`text-xs font-bold ${active ? 'text-cyan-400' : 'text-white'}`}>{label}</div>
          <div className="text-[9px] text-slate-600 font-bold mt-1 uppercase">{time}</div>
       </div>
    </div>
  );
}

// --- TAB: HISTORY ---
function MaintenanceHistoryTab() {
  return (
    <div className="space-y-8 pb-10">
       {/* Header with Filters */}
       <div className="flex items-center justify-between">
          <p className="text-slate-500 text-sm">Phân tích hiệu suất và xu hướng khắc phục sự cố hệ thống.</p>
          <div className="flex gap-3">
             <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-[11px] font-bold">
                <Calendar size={14} className="text-slate-500" /> 30 Ngày qua
             </button>
             <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-[11px] font-bold">
                <Download size={14} className="text-slate-500" /> Xuất báo cáo
             </button>
          </div>
       </div>

       {/* Top Stats Row */}
       <div className="grid grid-cols-4 gap-6">
          <HistoryStatCard title="MTTR (TG PHỤC HỒI)" value="1.4" unit="h" sub="-12% so với tháng trước" color="cyan" icon={Clock} />
          <HistoryStatCard title="MTBF (TG GIỮA 2 LỖI)" value="342" unit="h" sub="+5% so với tháng trước" color="purple" icon={RotateCcw} />
          <HistoryStatCard title="CHI PHÍ BẢO TRÌ" value="$45" unit="k" sub="+8% so với tháng trước" color="orange" icon={FileText} />
          <HistoryStatCard title="TỔNG DOWNTIME" value="12" unit="h" sub="Ổn định" color="red" icon={Zap} />
       </div>

       <div className="grid grid-cols-3 gap-8">
          {/* Main Chart Section */}
          <div className="col-span-2 glass-card p-10 rounded-[40px] border-white/5 bg-[#0a0f1e]/40 space-y-8">
             <div className="flex justify-between items-center">
                <div className="space-y-1">
                   <h3 className="text-xl font-bold text-white tracking-tight">Xu hướng sửa chữa & Chi phí</h3>
                   <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">Phân tích tương quan 12 tháng qua</p>
                </div>
                <div className="flex items-center gap-6">
                   <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500">
                      <div className="w-2.5 h-2.5 rounded-full bg-cyan-500" /> Số ca sửa
                   </div>
                   <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500">
                      <div className="w-2.5 h-2.5 rounded-full bg-purple-500" /> Chi phí
                   </div>
                </div>
             </div>
             
             <div className="h-64 relative flex items-end">
                <svg className="w-full h-full" viewBox="0 0 800 200" preserveAspectRatio="none">
                   {/* Purple Dashed Line */}
                   <path d="M0,180 Q100,170 200,160 T400,150 T600,140 T800,130" fill="none" stroke="#a855f7" strokeWidth="2" strokeDasharray="4 4" opacity="0.6" />
                   {/* Cyan Solid Line */}
                   <path d="M0,150 Q100,140 200,100 T400,120 T600,80 T800,90" fill="none" stroke="#22d3ee" strokeWidth="3" className="drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
                </svg>
             </div>
             <div className="flex justify-between text-[10px] text-slate-700 font-bold uppercase px-2">
                <span>T1</span><span>T3</span><span>T5</span><span>T7</span><span>T9</span><span>T11</span>
             </div>
          </div>

          {/* AI Predictions Section */}
          <div className="glass-card p-10 rounded-[40px] border-white/5 space-y-8">
             <div className="flex items-center gap-3 text-white font-bold">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400">
                   <Settings size={20} />
                </div>
                <div>
                   <h3 className="text-lg tracking-tight">AI Dự đoán sự cố</h3>
                   <p className="text-[9px] text-slate-600 font-bold uppercase">Phân tích viễn trắc 24h qua</p>
                </div>
             </div>
             <div className="space-y-6">
                {[
                  { name: 'Trạm biến áp Z-01', issue: 'Quá tải nhiệt', prob: '87%', color: 'red' },
                  { name: 'Bơm làm mát B-04', issue: 'Lệch pha rung động', prob: '62%', color: 'orange' },
                  { name: 'Cáp ngầm Tuyến C', issue: 'Suy giảm cách điện', prob: '45%', color: 'blue' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                     <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-xl bg-${item.color}-500/10 flex items-center justify-center text-${item.color}-500`}>
                           <Zap size={16} />
                        </div>
                        <div className="space-y-0.5">
                           <div className="text-xs font-bold text-white">{item.name}</div>
                           <div className="text-[10px] text-slate-600">{item.issue}</div>
                        </div>
                     </div>
                     <div className="text-right">
                        <div className="text-lg font-bold text-white">{item.prob}</div>
                        <div className="text-[9px] text-slate-700 font-bold uppercase">Xác suất</div>
                     </div>
                  </div>
                ))}
             </div>
             <button className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-white text-[11px] font-bold hover:bg-white/10 transition-all uppercase tracking-widest">
                Xem chi tiết phân tích
             </button>
          </div>
       </div>

       <div className="grid grid-cols-2 gap-8">
          {/* Heatmap Section */}
          <div className="glass-card p-10 rounded-[40px] border-white/5 space-y-8">
             <div className="space-y-1">
                <h3 className="text-xl font-bold text-white tracking-tight">Heatmap Tần suất lỗi</h3>
                <p className="text-[10px] text-slate-600 font-bold uppercase">Phân bổ lỗi theo hệ thống con và ca làm việc</p>
             </div>
             <div className="grid grid-cols-4 gap-4">
                <div />
                {['Ca 1', 'Ca 2', 'Ca 3'].map(c => <div key={c} className="text-center text-[10px] text-slate-600 font-bold">{c}</div>)}
                {['Điện', 'Cơ khí', 'Thủy lực', 'Phần mềm'].map((cat, i) => (
                   <React.Fragment key={cat}>
                      <div className="text-[11px] text-slate-500 font-medium self-center">{cat}</div>
                      <div className={`h-12 rounded-xl ${i === 0 ? 'bg-[#f87171]/40 border border-[#f87171]/20' : i === 1 ? 'bg-cyan-500/30 border border-cyan-500/10' : i === 3 ? 'bg-purple-500/50 border border-purple-500/20' : 'bg-white/5'}`} />
                      <div className={`h-12 rounded-xl ${i === 1 ? 'bg-cyan-500/50 border border-cyan-500/20' : i === 3 ? 'bg-purple-500/30 border border-purple-500/10' : 'bg-white/5'}`} />
                      <div className={`h-12 rounded-xl ${i === 0 ? 'bg-[#fca5a5]/30 border border-[#fca5a5]/10' : i === 1 ? 'bg-slate-800' : 'bg-white/5'}`} />
                   </React.Fragment>
                ))}
             </div>
          </div>

          {/* Downtime Analysis Section */}
          <div className="glass-card p-10 rounded-[40px] border-white/5 space-y-8">
             <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white tracking-tight">Phân tích Nguyên nhân Downtime</h3>
                <PieChart size={20} className="text-slate-700" />
             </div>
             <div className="space-y-8">
                {[
                  { label: 'Lỗi phần cứng lõi', val: '45%', color: 'red' },
                  { label: 'Bảo trì định kỳ vượt giờ', val: '30%', color: 'orange' },
                  { label: 'Mất kết nối mạng', val: '15%', color: 'blue' },
                  { label: 'Khác', val: '10%', color: 'slate' },
                ].map((item, i) => (
                  <div key={i} className="space-y-3">
                     <div className="flex justify-between text-[11px] font-bold">
                        <span className="text-white">{item.label}</span>
                        <span className="text-slate-500">{item.val}</span>
                     </div>
                     <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                        <div className={`h-full ${item.color === 'red' ? 'bg-[#f87171] shadow-[0_0_10px_rgba(248,113,113,0.4)]' : item.color === 'orange' ? 'bg-orange-400' : item.color === 'blue' ? 'bg-blue-400' : 'bg-slate-600'}`} style={{ width: item.val }} />
                     </div>
                  </div>
                ))}
             </div>
          </div>
       </div>

       {/* Detailed Log Table */}
       <div className="glass-card rounded-[40px] overflow-hidden border-white/5">
          <div className="p-10 flex items-center justify-between border-b border-white/5">
             <h3 className="text-xl font-bold text-white tracking-tight">Nhật ký Bảo trì Chi tiết</h3>
             <button className="text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors">Xem tất cả</button>
          </div>
          <table className="w-full text-left">
             <thead>
                <tr className="text-[10px] text-slate-700 font-bold uppercase tracking-[0.2em] border-b border-white/5">
                   <th className="px-10 py-6">Mã phiếu</th>
                   <th className="px-6 py-6">Tài sản</th>
                   <th className="px-6 py-6">Ngày thực hiện</th>
                   <th className="px-6 py-6">Kỹ thuật viên</th>
                   <th className="px-6 py-6">Trạng thái</th>
                   <th className="px-10 py-6 text-right">Tác vụ</th>
                </tr>
             </thead>
             <tbody className="text-[11px] text-white">
                {[
                  { id: '#WO-2023-0891', asset: 'Máy biến áp T-12', date: '12/10/2023 14:30', tech: 'Nguyễn Văn A', status: 'Hoàn thành', color: 'green' },
                  { id: '#WO-2023-0892', asset: 'Hệ thống tản nhiệt C-02', date: '12/10/2023 09:00', tech: 'Trần Hữu B', status: 'Đang xử lý', color: 'orange' },
                  { id: '#WO-2023-0895', asset: 'Cảm biến lưu lượng F-08', date: '11/10/2023 16:45', tech: 'Lê Thị C', status: 'Thất bại', color: 'red' },
                ].map((log, i) => (
                  <tr key={i} className="border-b border-white/[0.02] hover:bg-white/[0.03] transition-all">
                     <td className="px-10 py-6 font-bold text-slate-500">{log.id}</td>
                     <td className="px-6 py-6 font-bold">{log.asset}</td>
                     <td className="px-6 py-6 text-slate-500 font-medium">{log.date}</td>
                     <td className="px-6 py-6">
                        <div className="flex items-center gap-3">
                           <div className={`w-8 h-8 rounded-full bg-${log.color === 'green' ? 'purple' : log.color === 'orange' ? 'cyan' : 'slate'}-500/20 text-${log.color === 'green' ? 'purple' : log.color === 'orange' ? 'cyan' : 'slate'}-400 flex items-center justify-center text-[9px] font-bold border border-white/5`}>
                              {log.tech.split(' ').slice(-2).map(n => n[0]).join('')}
                           </div>
                           <span className="font-bold">{log.tech}</span>
                        </div>
                     </td>
                     <td className="px-6 py-6">
                        <span className={`px-4 py-1.5 rounded-lg text-[9px] font-bold ${log.color === 'green' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : log.color === 'orange' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'}`}>
                           {log.status}
                        </span>
                     </td>
                     <td className="px-10 py-6 text-right">
                        <button className="p-2 rounded-lg hover:bg-white/5 text-slate-700 hover:text-white transition-all"><Monitor size={16} /></button>
                     </td>
                  </tr>
                ))}
             </tbody>
          </table>
       </div>
    </div>
  );
}

function HistoryStatCard({ title, value, unit, sub, color, icon: Icon }: any) {
  const colors: any = {
    cyan: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
    purple: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
    orange: 'text-orange-400 bg-orange-500/10 border-orange-500/20',
    red: 'text-red-400 bg-red-500/10 border-red-500/20',
  };

  return (
    <div className="glass-card p-10 rounded-[40px] space-y-6 flex flex-col justify-between border-white/5">
       <div className="flex justify-between items-start">
          <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-relaxed max-w-[80px]">{title}</div>
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colors[color]}`}>
             <Icon size={20} />
          </div>
       </div>
       <div className="space-y-2">
          <div className="flex items-baseline gap-2">
             <div className="text-5xl font-bold text-white tracking-tighter">{value}</div>
             <div className="text-xl text-slate-600 font-medium">{unit}</div>
          </div>
          <div className={`text-[10px] font-bold flex items-center gap-2 ${sub.includes('-') ? 'text-cyan-400' : sub.includes('+') ? 'text-orange-400' : 'text-slate-600'}`}>
             {sub.includes('-') && <TrendingDown size={14} />}
             {sub.includes('+') && <TrendingUp size={14} />}
             {sub}
          </div>
       </div>
    </div>
  );
}


// --- FORM: CREATE TICKET ---
function CreateTicketForm({ onCancel }: { onCancel: () => void }) {
  return (
    <div className="max-w-6xl mx-auto space-y-10">
       {/* Step Header */}
       <div className="flex items-center justify-between mb-4">
          <button onClick={onCancel} className="text-slate-500 hover:text-white flex items-center gap-2 text-xs font-bold transition-all">
             <ChevronRight size={18} className="rotate-180" /> Hủy & Quay lại
          </button>
          <h2 className="text-3xl font-bold text-white tracking-tight">Tạo phiếu sửa chữa</h2>
          <div className="w-24" /> {/* Spacer */}
       </div>

       <div className="flex justify-center mb-10">
          <div className="flex items-center gap-20 relative">
             <div className="absolute top-5 left-1/4 right-1/4 h-0.5 bg-white/5 -z-10" />
             <div className="absolute top-5 left-1/4 w-[15%] h-0.5 bg-cyan-500 -z-10 shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
             {[
               { s: 1, l: 'THÔNG TIN SỰ CỐ', active: true },
               { s: 2, l: 'CHI TIẾT LỖI & AI GỢI Ý' },
               { s: 3, l: 'PHÂN CÔNG & LỊCH TRÌNH' },
             ].map((st, i) => (
               <div key={i} className="flex flex-col items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${st.active ? 'bg-cyan-500 text-white shadow-xl shadow-cyan-500/20' : 'bg-[#030712] border border-white/10 text-slate-600'}`}>
                     {st.s}
                  </div>
                  <span className={`text-[9px] font-bold tracking-widest uppercase ${st.active ? 'text-cyan-400' : 'text-slate-700'}`}>{st.l}</span>
               </div>
             ))}
          </div>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 glass-card p-12 rounded-[48px] space-y-10 border-white/5">
             <div className="flex items-center gap-4 text-purple-400 font-bold">
                <AlertTriangle size={24} />
                <h3 className="text-xl font-bold tracking-tight">Khởi tạo sự cố</h3>
             </div>
             <div className="space-y-8">
                <div className="space-y-2">
                   <label className="text-[10px] text-slate-500 font-bold uppercase tracking-widest ml-1">Tên thiết bị / Mã tài sản</label>
                   <div className="relative">
                      <Cpu size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" />
                      <input type="text" placeholder="Nhập tên hoặc mã thiết bị (vd: TRF-Alpha-09)" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-sm text-white focus:outline-none focus:border-cyan-500/50" />
                      <LayoutGrid size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-700" />
                   </div>
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] text-slate-500 font-bold uppercase tracking-widest ml-1">Loại lỗi</label>
                   <select className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm text-white appearance-none focus:outline-none focus:border-cyan-500/50">
                      <option>Chọn phân loại sự cố...</option>
                      <option>Hỏng hóc phần cứng</option>
                      <option>Lỗi phần mềm / Giao thức</option>
                      <option>Bảo trì định kỳ</option>
                   </select>
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] text-slate-500 font-bold uppercase tracking-widest ml-1">Mô tả chi tiết</label>
                   <textarea placeholder="Mô tả hiện tượng quan sát được, tiếng động lạ, cảnh báo trên màn hình..." className="w-full h-40 bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm text-white resize-none focus:outline-none focus:border-cyan-500/50" />
                </div>
                <div className="space-y-4">
                   <label className="text-[10px] text-slate-500 font-bold uppercase tracking-widest ml-1">Upload ảnh/video</label>
                   <div className="aspect-video w-full rounded-[32px] bg-white/[0.02] border-2 border-dashed border-white/10 flex flex-col items-center justify-center gap-4 group cursor-pointer hover:bg-white/[0.05] transition-all">
                      <div className="w-16 h-16 rounded-[20px] bg-white/5 flex items-center justify-center text-slate-600 group-hover:text-cyan-500 transition-all">
                         <Camera size={32} />
                      </div>
                      <div className="text-center space-y-1">
                         <div className="text-sm font-bold text-slate-400">Kéo thả file vào đây hoặc <span className="text-cyan-500">Chọn file</span></div>
                         <div className="text-[10px] text-slate-600">Hỗ trợ JPG, PNG, MP4 (Tối đa 50MB)</div>
                      </div>
                   </div>
                </div>
             </div>
          </div>

          <div className="space-y-8">
             <div className="glass-card p-10 rounded-[48px] space-y-10 border-white/5 bg-gradient-to-b from-[#0a0f1e] to-transparent">
                <div className="flex items-center justify-between">
                   <div className="flex items-center gap-3 text-purple-400 font-bold">
                      <Zap size={20} />
                      <h3 className="text-lg font-bold tracking-tight">AI Co-Pilot</h3>
                   </div>
                   <span className="px-3 py-1 rounded-full bg-white/5 text-[9px] font-bold text-slate-600 uppercase flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-700" /> Standby
                   </span>
                </div>
                <div className="flex flex-col items-center text-center gap-6 py-10">
                   <div className="w-24 h-24 rounded-full bg-white/[0.02] border border-white/5 flex items-center justify-center relative">
                      <div className="absolute inset-0 border-2 border-cyan-500/20 rounded-full animate-ping" />
                      <Search size={40} className="text-slate-800" />
                   </div>
                   <p className="text-xs text-slate-500 leading-relaxed px-4">
                      Hệ thống AI đang chờ dữ liệu đầu vào. Nhập thông tin hoặc tải ảnh lên để AI tự động phân tích và đưa ra <span className="text-purple-400 font-bold">gợi ý nguyên nhân</span> ở bước tiếp theo.
                   </p>
                </div>
                <div className="pt-10 border-t border-white/[0.03]">
                   <div className="flex items-center gap-3 text-[9px] text-slate-700 font-bold leading-relaxed">
                      <History size={16} /> AI phân tích dựa trên lịch sử bảo trì, telemetry real-time và hình ảnh tải lên.
                   </div>
                </div>
             </div>

             <div className="flex gap-4">
                <button className="flex-1 py-4 rounded-2xl border border-white/10 text-slate-400 text-xs font-bold hover:bg-white/5 transition-all">Lưu nháp</button>
                <button className="flex-[2] py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white text-xs font-bold shadow-xl shadow-cyan-500/20 hover:scale-[1.05] transition-all flex items-center justify-center gap-2">
                   Tiếp tục: Chi tiết AI <ArrowRight size={18} />
                </button>
             </div>
          </div>
       </div>
    </div>
  );
}

// --- SHARED COMPONENT: METRIC BOX ---
function MetricBox({ title, value, sub, icon: Icon, color }: any) {
  const colorMap: any = {
    purple: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
    blue: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    red: 'text-red-400 bg-red-500/10 border-red-500/20',
    green: 'text-green-400 bg-green-500/10 border-green-500/20',
    slate: 'text-slate-500 bg-white/5 border-white/10'
  };

  return (
    <div className="glass-card p-10 rounded-[40px] space-y-6 flex flex-col justify-between border-white/5 transition-all hover:border-white/10">
       <div className="flex justify-between items-start">
          <div className="text-[11px] text-slate-500 font-bold uppercase tracking-widest">{title}</div>
          {Icon && <Icon size={24} className={colorMap[color].split(' ')[0]} />}
       </div>
       <div className="flex items-baseline gap-3">
          <div className="text-5xl font-bold text-white tracking-tighter">{value}</div>
          <div className={`text-[11px] font-bold tracking-widest ${colorMap[color].split(' ')[0]}`}>{sub}</div>
       </div>
    </div>
  );
}
