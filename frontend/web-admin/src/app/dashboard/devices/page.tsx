'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Cpu, 
  Zap, 
  Wifi, 
  Battery, 
  Clock, 
  ChevronRight,
  QrCode,
  Image as ImageIcon,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ArrowLeft,
  RotateCcw,
  Monitor,
  Download,
  Printer,
  History,
  Activity,
  LineChart,
  LayoutGrid,
  Server,
  TrendingUp,
  Wrench
} from 'lucide-react';

const tabs = [
  { id: 'list', label: 'Danh sách thiết bị' },
  { id: 'add', label: 'Thêm thiết bị' },
  { id: 'realtime', label: 'Giám sát Realtime' },
  { id: 'history', label: 'Lịch sử thiết bị' },
  { id: 'qr', label: 'Quản lý QR Code' }
];

export default function DevicesPage() {
  const [activeTab, setActiveTab] = React.useState('list');

  return (
    <div className="space-y-6 relative z-10">
      {/* Header & Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
           <div className="flex items-center gap-2 text-slate-500 text-xs mb-2">
              <span>Trang chủ</span>
              <ChevronRight size={12} />
              <span className="text-cyan-500 font-medium">Thiết bị</span>
           </div>
           <h1 className="text-3xl font-bold text-white tracking-tight">
             {activeTab === 'list' && 'Danh sách thiết bị'}
             {activeTab === 'add' && 'Thêm thiết bị mới'}
             {activeTab === 'realtime' && 'Giám sát Realtime'}
             {activeTab === 'history' && 'Lịch sử thiết bị'}
             {activeTab === 'qr' && 'Quản lý QR Code Thiết bị'}
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
              onClick={() => setActiveTab('add')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 text-white text-xs font-bold hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all"
            >
              <Plus size={16} /> Thêm thiết bị
            </button>
          )}
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
          {activeTab === 'list' && <DeviceListTab />}
          {activeTab === 'add' && <AddDeviceTab />}
          {activeTab === 'realtime' && <RealtimeMonitorTab />}
          {activeTab === 'history' && <DeviceHistoryTab />}
          {activeTab === 'qr' && <QRCodeManagementTab />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// --- TAB: DEVICE LIST ---
function DeviceListTab() {
  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-6">
        <StatCard title="Tổng thiết bị" value="1,248" icon={Cpu} color="cyan" />
        <StatCard title="Đang hoạt động" value="1,190" icon={CheckCircle2} color="green" badge="95%" />
        <StatCard title="Lỗi hệ thống" value="14" icon={AlertTriangle} color="red" />
        <StatCard title="Đang bảo trì" value="44" icon={RotateCcw} color="purple" />
      </div>

      {/* Table Section */}
      <div className="glass-card rounded-[32px] overflow-hidden">
        <div className="p-8 flex items-center justify-between border-b border-white/5">
          <h3 className="text-xl font-bold text-white">Chi tiết thiết bị</h3>
          <div className="flex gap-2">
            <button className="p-2.5 rounded-xl bg-white/5 text-slate-400 hover:text-white transition-all">
              <Filter size={18} />
            </button>
            <button className="p-2.5 rounded-xl bg-white/5 text-slate-400 hover:text-white transition-all">
              <MoreVertical size={18} />
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] text-slate-500 font-bold uppercase tracking-widest border-b border-white/5">
                <th className="px-8 py-6">Mã thiết bị</th>
                <th className="px-4 py-6">Tên thiết bị</th>
                <th className="px-4 py-6">Khu vực</th>
                <th className="px-4 py-6 text-center">Trạng thái</th>
                <th className="px-4 py-6">Pin/Nguồn</th>
                <th className="px-8 py-6 text-right">Hoạt động gần nhất</th>
              </tr>
            </thead>
            <tbody className="text-sm text-white">
              {[
                { id: 'SN-8291-A', name: 'Cảm biến nhiệt độ T1', area: 'Tầng 3, Khu Server A', status: 'Hoạt động', power: '98%', icon: Activity, color: 'cyan' },
                { id: 'SN-8292-B', name: 'Đồng hồ đo công suất', area: 'Tầng 1, Tủ điện chính', status: 'Hoạt động', power: 'DC', icon: Zap, color: 'purple' },
                { id: 'SN-7104-E', name: 'Gateway kết nối M2', area: 'Tầng 2, Khu Hành chính', status: 'Lỗi kết nối', power: 'Offline', icon: Wifi, color: 'red' },
                { id: 'SN-5521-M', name: 'Bộ điều khiển HVAC', area: 'Sân thượng', status: 'Bảo trì', power: '-', icon: Monitor, color: 'slate' },
              ].map((dev, i) => (
                <tr key={i} className="group border-b border-white/[0.02] hover:bg-white/[0.03] transition-all cursor-pointer">
                  <td className="px-8 py-6 font-medium text-cyan-400">{dev.id}</td>
                  <td className="px-4 py-6">
                    <div className="flex items-center gap-3">
                       <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-slate-400 group-hover:text-cyan-400 transition-colors">
                          <dev.icon size={16} />
                       </div>
                       <span className="font-medium">{dev.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-6 text-slate-400">{dev.area}</td>
                  <td className="px-4 py-6">
                    <div className="flex justify-center">
                       <div className={`px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-1.5 ${dev.status === 'Hoạt động' ? 'bg-green-500/10 text-green-400' : dev.status === 'Lỗi kết nối' ? 'bg-red-500/10 text-red-400' : 'bg-white/5 text-slate-500'}`}>
                          <div className={`w-1 h-1 rounded-full ${dev.status === 'Hoạt động' ? 'bg-green-400' : dev.status === 'Lỗi kết nối' ? 'bg-red-400' : 'bg-slate-500'}`} />
                          {dev.status}
                       </div>
                    </div>
                  </td>
                  <td className="px-4 py-6">
                    {dev.power === 'DC' ? <Zap size={14} className="text-slate-500" /> : dev.power === 'Offline' ? <Wifi size={14} className="text-red-500/50" /> : (
                      <div className="flex items-center gap-2">
                        <div className="w-12 h-1.5 bg-white/5 rounded-full overflow-hidden">
                           <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500" style={{ width: dev.power }} />
                        </div>
                        <span className="text-[10px] text-slate-500 font-bold">{dev.power}</span>
                      </div>
                    )}
                  </td>
                  <td className="px-8 py-6 text-right text-slate-500 text-xs italic">Vài giây trước</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-8 border-t border-white/5 flex items-center justify-between">
           <div className="text-xs text-slate-500">Hiển thị 1-10 của 1,248</div>
           <div className="flex gap-2">
              <button className="p-2 rounded-lg bg-white/5 text-slate-500 hover:text-white"><ChevronRight size={16} className="rotate-180" /></button>
              <button className="w-8 h-8 rounded-lg bg-cyan-500 text-white text-xs font-bold">1</button>
              <button className="w-8 h-8 rounded-lg bg-white/5 text-slate-500 text-xs font-bold hover:text-white">2</button>
              <button className="w-8 h-8 rounded-lg bg-white/5 text-slate-500 text-xs font-bold hover:text-white">3</button>
              <button className="p-2 rounded-lg bg-white/5 text-slate-500 hover:text-white"><ChevronRight size={16} /></button>
           </div>
        </div>
      </div>
    </div>
  );
}

// --- TAB: ADD DEVICE ---
function AddDeviceTab() {
  const [currentStep, setCurrentStep] = React.useState(1);
  const totalSteps = 3;

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, totalSteps));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-8">
        {/* Progress Steps */}
        <div className="glass-card p-8 rounded-[32px] flex justify-between relative overflow-hidden">
           {/* Step Line Background */}
           <div className="absolute top-[52px] left-[15%] right-[15%] h-0.5 bg-white/5" />
           {/* Active Step Line */}
           <motion.div 
            initial={false}
            animate={{ width: `${(currentStep - 1) * 35}%` }}
            className="absolute top-[52px] left-[15%] h-0.5 bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)] transition-all" 
           />
           
           {[
             { step: 1, label: 'Thông tin cơ bản' },
             { step: 2, label: 'Thông số kỹ thuật' },
             { step: 3, label: 'Cấu hình mạng' },
           ].map((s, i) => (
             <div key={i} className="flex flex-col items-center gap-3 relative z-10">
                <button 
                  onClick={() => s.step < currentStep && setCurrentStep(s.step)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-500 ${
                    s.step < currentStep 
                      ? 'bg-cyan-500 text-white cursor-pointer' 
                      : s.step === currentStep 
                        ? 'bg-[#030712] border-2 border-cyan-500 text-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.4)] scale-110' 
                        : 'bg-[#030712] border border-white/10 text-slate-500'
                  }`}
                >
                   {s.step < currentStep ? <CheckCircle2 size={18} /> : s.step}
                </button>
                <span className={`text-[10px] font-bold uppercase tracking-wider transition-colors duration-500 ${s.step <= currentStep ? 'text-cyan-500' : 'text-slate-600'}`}>{s.label}</span>
             </div>
           ))}
        </div>

        {/* Dynamic Form Area */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="glass-card p-10 rounded-[32px] space-y-8"
          >
             <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-cyan-400 font-bold">
                   <LayoutGrid size={20} />
                   {currentStep === 1 && 'Bước 1: Thông tin định danh'}
                   {currentStep === 2 && 'Bước 2: Chỉ số vận hành'}
                   {currentStep === 3 && 'Bước 3: Giao thức kết nối'}
                </div>
                <div className="text-[10px] text-slate-500 font-bold">BƯỚC {currentStep} / {totalSteps}</div>
             </div>

             {currentStep === 1 && (
               <div className="grid grid-cols-2 gap-8">
                  <div className="col-span-2 space-y-2">
                     <label className="text-[10px] text-cyan-500 font-bold uppercase tracking-widest ml-1">Tên thiết bị</label>
                     <input type="text" placeholder="Ví dụ: Cảm biến nhiệt độ Zone A" className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-white focus:outline-none focus:border-cyan-500/50 transition-all" />
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] text-cyan-500 font-bold uppercase tracking-widest ml-1">Mã thiết bị nội bộ</label>
                     <input type="text" placeholder="SEN-TEMP-XXX" className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-white focus:outline-none focus:border-cyan-500/50 transition-all" />
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] text-cyan-500 font-bold uppercase tracking-widest ml-1">Số Serial (S/N)</label>
                     <input type="text" placeholder="SNXXXXXXXXXXXX" className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-white focus:outline-none focus:border-cyan-500/50 transition-all" />
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] text-cyan-500 font-bold uppercase tracking-widest ml-1">Nhà sản xuất</label>
                     <select className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-white appearance-none focus:outline-none focus:border-cyan-500/50">
                        <option>Chọn nhà sản xuất...</option>
                        <option>Siemens</option>
                        <option>ABB</option>
                     </select>
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] text-cyan-500 font-bold uppercase tracking-widest ml-1">Loại thiết bị</label>
                     <select className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-white appearance-none focus:outline-none focus:border-cyan-500/50">
                        <option>Chọn phân loại...</option>
                        <option>Cảm biến IoT</option>
                        <option>Bộ điều khiển</option>
                     </select>
                  </div>
               </div>
             )}

             {currentStep === 2 && (
               <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-2">
                     <label className="text-[10px] text-cyan-500 font-bold uppercase tracking-widest ml-1">Điện áp định mức (V)</label>
                     <input type="number" placeholder="220" className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-white focus:outline-none focus:border-cyan-500/50 transition-all" />
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] text-cyan-500 font-bold uppercase tracking-widest ml-1">Nhiệt độ tối đa (°C)</label>
                     <input type="number" placeholder="85" className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-white focus:outline-none focus:border-cyan-500/50 transition-all" />
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] text-cyan-500 font-bold uppercase tracking-widest ml-1">Công suất tiêu thụ (W)</label>
                     <input type="number" placeholder="15" className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-white focus:outline-none focus:border-cyan-500/50 transition-all" />
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] text-cyan-500 font-bold uppercase tracking-widest ml-1">Ngày lắp đặt</label>
                     <input type="date" className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-white focus:outline-none focus:border-cyan-500/50 transition-all" />
                  </div>
                  <div className="col-span-2 space-y-4 pt-4">
                     <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Môi trường hoạt động đề xuất</div>
                     <div className="flex gap-4">
                        <button className="px-6 py-2 rounded-full bg-cyan-500 text-white text-[10px] font-bold flex items-center gap-2">
                           <div className="w-1.5 h-1.5 rounded-full bg-white" /> Trong nhà
                        </button>
                        <button className="px-6 py-2 rounded-full bg-white/5 text-slate-500 text-[10px] font-bold flex items-center gap-2">
                           <div className="w-1.5 h-1.5 rounded-full bg-slate-700" /> Ngoài trời
                        </button>
                     </div>
                  </div>
               </div>
             )}

             {currentStep === 3 && (
               <div className="grid grid-cols-2 gap-8">
                  <div className="col-span-2 space-y-2">
                     <label className="text-[10px] text-cyan-500 font-bold uppercase tracking-widest ml-1">Địa chỉ IP thiết bị</label>
                     <input type="text" placeholder="192.168.1.100" className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-white focus:outline-none focus:border-cyan-500/50 transition-all" />
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] text-cyan-500 font-bold uppercase tracking-widest ml-1">Cổng (Port)</label>
                     <input type="number" placeholder="8080" className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-white focus:outline-none focus:border-cyan-500/50 transition-all" />
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] text-cyan-500 font-bold uppercase tracking-widest ml-1">Giao thức</label>
                     <select className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-white appearance-none focus:outline-none focus:border-cyan-500/50">
                        <option>MQTT</option>
                        <option>HTTP/Rest</option>
                        <option>Modbus TCP</option>
                     </select>
                  </div>
                  <div className="col-span-2 p-6 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center gap-4">
                     <Wifi className="text-cyan-400" />
                     <div className="space-y-1">
                        <div className="text-xs font-bold text-white">Kiểm tra kết nối</div>
                        <div className="text-[10px] text-slate-500">Hệ thống sẽ gửi một tín hiệu ping để xác thực địa chỉ IP.</div>
                     </div>
                     <button className="ml-auto px-4 py-2 bg-cyan-500 text-white text-[10px] font-bold rounded-lg">Test Connection</button>
                  </div>
               </div>
             )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="space-y-8">
         {/* Image Upload Mockup */}
         <div className="glass-card p-8 rounded-[32px] space-y-6">
            <h3 className="text-lg font-bold text-white">Hình ảnh thiết bị</h3>
            <div className="aspect-square rounded-2xl bg-white/5 border border-dashed border-white/10 flex flex-col items-center justify-center gap-4 group cursor-pointer hover:bg-white/[0.08] transition-all overflow-hidden relative">
               <div className="relative z-10 flex flex-col items-center gap-2">
                  <ImageIcon size={32} className="text-slate-600 group-hover:text-cyan-500 transition-colors" />
                  <span className="text-[10px] text-slate-500 font-bold">Tải lên hoặc kéo thả</span>
               </div>
            </div>
            <p className="text-[10px] text-slate-600 text-center leading-relaxed">Hỗ trợ định dạng JPG, PNG. Tối đa 5MB.</p>
         </div>

         {/* QR Recognition Mockup */}
         <div className="glass-card p-8 rounded-[32px] space-y-6">
            <h3 className="text-lg font-bold text-white">QR Code Nhận Diện</h3>
            <div className="aspect-square rounded-2xl bg-white border-8 border-[#030712] flex items-center justify-center p-8 relative overflow-hidden">
               <div className="relative z-10 w-full h-full bg-white flex items-center justify-center">
                  <QrCode size={120} strokeWidth={1.5} className="text-[#030712]" />
               </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
               <button className="flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 text-slate-300 text-[10px] font-bold hover:bg-white/10 transition-all">
                  <Download size={14} /> Tải xuống
               </button>
               <button className="flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 text-slate-300 text-[10px] font-bold hover:bg-white/10 transition-all">
                  <Printer size={14} /> In tem
               </button>
            </div>
         </div>

         {/* Action Buttons */}
         <div className="flex gap-4 pt-4">
            {currentStep > 1 && (
              <button onClick={prevStep} className="flex-1 py-4 rounded-xl border border-white/10 text-slate-400 text-xs font-bold hover:bg-white/5 transition-all flex items-center justify-center gap-2">
                 <ChevronRight size={16} className="rotate-180" /> Quay lại
              </button>
            )}
            <button 
              onClick={currentStep === totalSteps ? undefined : nextStep}
              className="flex-[2] py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 transition-all hover:scale-[1.02]"
            >
               {currentStep === totalSteps ? 'Hoàn tất & Lưu' : 'Tiếp theo'} <ChevronRight size={16} />
            </button>
         </div>
      </div>
    </div>
  );
}

// --- TAB: REALTIME MONITOR ---
function RealtimeMonitorTab() {
  return (
    <div className="space-y-8">
      {/* Device Title & Actions */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
         <div className="space-y-3">
            <div className="flex items-center gap-3">
               <span className="px-3 py-1 rounded-lg bg-cyan-500/10 text-cyan-400 text-[10px] font-bold border border-cyan-500/20 tracking-widest uppercase">MDB-01</span>
               <div className="flex items-center gap-2 text-[10px] text-green-500 font-bold uppercase tracking-widest">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                  ONLINE
               </div>
            </div>
            <h1 className="text-5xl font-bold text-white tracking-tight leading-none">Tủ điện phân phối chính</h1>
            <p className="text-sm text-slate-500 font-medium">Khu vực: Trạm biến áp T1 • Cập nhật: Vừa xong</p>
         </div>
         <div className="flex gap-4">
            <button className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-white text-[11px] font-bold hover:bg-white/10 transition-all active:scale-95">
               <RotateCcw size={16} /> Khởi động lại
            </button>
            <button className="flex items-center gap-3 px-8 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white text-[11px] font-bold shadow-xl shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all active:scale-95">
               <Monitor size={16} /> Điều khiển từ xa
            </button>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Stats & Insights */}
        <div className="space-y-8">
           {/* Device Image Box */}
           <div className="glass-card p-3 rounded-[40px] overflow-hidden group border-white/5">
              <div className="aspect-[3/4] bg-slate-900 rounded-[32px] overflow-hidden relative">
                 {/* Placeholder for device image */}
                 <div className="absolute inset-0 bg-[#0a0f1e] flex flex-col items-center justify-center gap-4">
                    <Server size={64} className="text-slate-800" />
                    <div className="w-24 h-1 bg-white/5 rounded-full" />
                 </div>
                 {/* Glow and Label */}
                 <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent opacity-90" />
                 <div className="absolute bottom-8 left-0 right-0 text-center">
                    <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-cyan-400 font-mono text-[10px] font-bold tracking-widest backdrop-blur-md">
                      SN: 8A9F-22B4
                    </span>
                 </div>
              </div>
           </div>

           {/* Mobile Scanner Mockup */}
           <div className="glass-card p-8 rounded-[40px] flex flex-col items-center gap-6 text-center border-white/5">
              <div className="w-36 h-36 bg-white p-6 rounded-2xl border-8 border-[#030712] shadow-2xl relative overflow-hidden group cursor-pointer">
                 <QrCode size="100%" strokeWidth={1} className="text-[#030712]" />
                 <div className="absolute inset-0 bg-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="space-y-1">
                 <span className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em]">Scanner AR</span>
                 <p className="text-[11px] text-slate-400 px-4">Quét để xem tài liệu kỹ thuật và hướng dẫn bảo trì 3D</p>
              </div>
           </div>

           {/* AI Insight Box */}
           <div className="p-8 rounded-[40px] bg-gradient-to-br from-purple-600/20 via-cyan-600/10 to-transparent border border-white/5 space-y-6 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 blur-[50px] -mr-16 -mt-16" />
              <div className="flex items-center gap-3 text-purple-400 font-bold">
                 <div className="w-8 h-8 rounded-xl bg-purple-500/20 flex items-center justify-center">
                    <Zap size={18} />
                 </div>
                 <h3 className="text-lg font-bold tracking-tight">AI Insights</h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed font-medium">
                 Mô hình dự báo cho thấy <span className="text-orange-400 font-bold">tải sẽ tăng 15%</span> vào ca chiều (14:00 - 17:00). 
                 Khuyến nghị chuẩn bị phương án chuyển nguồn dự phòng nếu nhiệt độ vượt ngưỡng <span className="text-white font-bold">50°C</span>.
              </p>
              <div className="pt-2">
                 <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div animate={{ width: '65%' }} className="h-full bg-purple-500" />
                 </div>
                 <div className="flex justify-between mt-2 text-[8px] text-slate-600 font-bold uppercase">
                    <span>Probability</span>
                    <span>65%</span>
                 </div>
              </div>
           </div>
        </div>

        {/* Center Main Dashboard */}
        <div className="lg:col-span-3 space-y-8">
           {/* Detailed Tabs Header */}
           <div className="flex gap-10 border-b border-white/5">
              {['Tổng quan', 'Thông số kỹ thuật', 'Nhật ký hoạt động', 'Lịch bảo trì'].map((t, i) => (
                <button key={i} className={`pb-5 text-sm font-bold transition-all relative ${i === 0 ? 'text-cyan-400' : 'text-slate-500 hover:text-slate-300'}`}>
                   {t}
                   {i === 0 && (
                     <motion.div 
                      layoutId="monitor-tab-active"
                      className="absolute bottom-0 left-0 right-0 h-1 bg-cyan-400 rounded-t-full shadow-[0_-4px_15px_rgba(34,211,238,0.5)]" 
                     />
                   )}
                </button>
              ))}
           </div>

           {/* Core Metrics Grid */}
           <div className="grid grid-cols-3 gap-8">
              <MetricCard label="NHIỆT ĐỘ TỦ" value="42" unit="°C" icon={Activity} color="orange" progress={42} />
              <MetricCard label="ĐIỆN ÁP PHASE A" value="380" unit="V" icon={Zap} color="cyan" trend="+1.2%" />
              <MetricCard label="TÍN HIỆU MẠNG" value="-45" unit="dBm" icon={Wifi} color="slate" signal={[1, 1, 0.8, 0.6, 0.2]} />
           </div>

           {/* Consumption Analysis Section */}
           <div className="glass-card p-10 rounded-[48px] space-y-12 border-white/5 bg-[#0a0f1e]/40">
              <div className="flex items-center justify-between">
                 <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-white tracking-tight">Phân tích tải tiêu thụ</h3>
                    <div className="flex items-center gap-4">
                       <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(34,211,238,0.5)]" />
                          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Active Power</span>
                       </div>
                       <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-white/10" />
                          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Reactive</span>
                       </div>
                    </div>
                 </div>
                 <div className="bg-white/5 p-1.5 rounded-2xl flex gap-1 border border-white/5">
                    {['24 Giờ qua', 'Tuần', 'Tháng'].map(t => (
                      <button key={t} className={`px-5 py-2.5 rounded-xl text-[10px] font-bold transition-all ${t === '24 Giờ qua' ? 'bg-white/10 text-white shadow-xl' : 'text-slate-500 hover:text-slate-300'}`}>{t}</button>
                    ))}
                 </div>
              </div>

              {/* Chart Placeholder */}
              <div className="h-80 relative flex items-end">
                 <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 240" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="chart-fill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                      </linearGradient>
                      <filter id="glow">
                        <feGaussianBlur stdDeviation="4" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                      </filter>
                    </defs>
                    <path 
                      d="M0,180 Q100,160 200,190 T400,140 T600,100 T800,120 L800,240 L0,240 Z" 
                      fill="url(#chart-fill)" 
                    />
                    <path 
                      d="M0,180 Q100,160 200,190 T400,140 T600,100 T800,120" 
                      fill="none" 
                      stroke="#22d3ee" 
                      strokeWidth="4" 
                      filter="url(#glow)"
                      className="transition-all duration-1000"
                    />
                 </svg>
                 {/* Y-Axis Labels */}
                 <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-[10px] text-slate-700 font-bold font-mono">
                    <span>800kW</span><span>600kW</span><span>400kW</span><span>200kW</span><span>0</span>
                 </div>
                 {/* X-Axis Labels */}
                 <div className="w-full flex justify-between text-[10px] text-slate-700 font-bold font-mono mt-6 pt-4 border-t border-white/5">
                    <span>00:00</span><span>06:00</span><span>12:00</span><span>18:00</span><span>24:00</span>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ label, value, unit, icon: Icon, color, progress, trend, signal }: any) {
  const colorMap: any = {
    orange: 'text-orange-500 bg-orange-500/10',
    cyan: 'text-cyan-500 bg-cyan-500/10',
    slate: 'text-slate-400 bg-white/5'
  };

  return (
    <div className="glass-card p-10 rounded-[40px] space-y-8 border-white/5 flex flex-col justify-between group hover:border-white/10 transition-all">
       <div className="flex justify-between items-start">
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em]">{label}</span>
          <div className={`p-4 rounded-[20px] ${colorMap[color]} group-hover:scale-110 transition-transform`}>
             <Icon size={24} />
          </div>
       </div>
       <div className="space-y-4">
          <div className="text-6xl font-bold text-white tracking-tighter">
            {value} <span className="text-xl text-slate-600 font-medium">{unit}</span>
          </div>
          {progress !== undefined && (
            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
               <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="h-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500" 
               />
            </div>
          )}
          {trend && (
             <div className="flex items-center gap-2 text-green-500 text-xs font-bold uppercase tracking-tight">
                <TrendingUp size={14} /> {trend} <span className="text-slate-600 ml-1">so với 1h trước</span>
             </div>
          )}
          {signal && (
             <div className="flex gap-1.5">
                {signal.map((v: number, i: number) => (
                  <div key={i} className="h-2 flex-1 bg-white/5 rounded-full overflow-hidden">
                     <div className="h-full bg-slate-500" style={{ opacity: v }} />
                  </div>
                ))}
             </div>
          )}
       </div>
    </div>
  );
}

// --- TAB: DEVICE HISTORY ---
function DeviceHistoryTab() {
  return (
    <div className="space-y-10">
       {/* History Header & Controls */}
       <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="space-y-3">
             <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-cyan-400 border border-white/10">
                   <History size={28} />
                </div>
                <div>
                   <h1 className="text-4xl font-bold text-white tracking-tight">Lịch sử thiết bị</h1>
                   <p className="text-slate-500 font-medium mt-1">Transformer Unit TX-902 • ID: 4892-A</p>
                </div>
             </div>
          </div>
          <div className="flex flex-wrap items-center gap-4">
             <div className="bg-white/5 p-1.5 rounded-2xl flex gap-1 border border-white/5">
                {['24h qua', '7 ngày', '30 ngày'].map(t => (
                  <button key={t} className={`px-5 py-2.5 rounded-xl text-[10px] font-bold transition-all ${t === '24h qua' ? 'bg-white/10 text-white shadow-xl' : 'text-slate-500 hover:text-slate-300'}`}>{t}</button>
                ))}
             </div>
             <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <select className="bg-[#111827] border border-white/10 rounded-2xl py-3 pl-10 pr-10 text-[10px] font-bold text-slate-300 appearance-none min-w-[200px] focus:outline-none focus:border-cyan-500/50">
                   <option>Tất cả sự kiện</option>
                   <option>Cảnh báo nhiệt độ</option>
                   <option>Bảo trì định kỳ</option>
                   <option>Cập nhật hệ thống</option>
                </select>
                <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 rotate-90" />
             </div>
             <button className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-[11px] font-bold shadow-lg shadow-cyan-500/20 hover:scale-105 transition-all">
                <Download size={16} /> Xuất PDF
             </button>
          </div>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Timeline View */}
          <div className="glass-card p-12 rounded-[48px] space-y-12 border-white/5 bg-[#0a0f1e]/40">
             <div className="flex items-center gap-4 text-white font-bold">
                <div className="w-10 h-10 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-400">
                   <Activity size={20} />
                </div>
                <h3 className="text-xl font-bold tracking-tight">Dòng thời gian</h3>
             </div>
             <div className="space-y-12 relative">
                {/* Connector Line */}
                <div className="absolute top-2 bottom-2 left-5 w-px bg-white/10" />
                
                {[
                  { time: '10:42 AM • Hôm nay', title: 'Cảnh báo nhiệt độ', desc: 'Nhiệt độ lõi vượt ngưỡng 85°C. Hệ thống làm mát đã kích hoạt.', icon: AlertTriangle, color: 'red' },
                  { time: '08:00 AM • Hôm nay', title: 'Bảo trì định kỳ', desc: 'Kỹ thuật viên đã kiểm tra hệ thống làm mát cấp 1.', icon: Wrench, color: 'cyan' },
                  { time: '14:30 PM • Hôm qua', title: 'Cập nhật Firmware', desc: 'Hoàn tất nâng cấp module điều khiển v2.4.1.', icon: History, color: 'purple' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-10 group cursor-default">
                     <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 relative z-10 ${item.color === 'red' ? 'bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.4)]' : item.color === 'cyan' ? 'bg-cyan-500 shadow-[0_0_15px_rgba(34,211,238,0.4)]' : 'bg-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.4)]'} border-8 border-[#030712] transition-transform group-hover:scale-110`}>
                        <item.icon size={14} className="text-white" />
                     </div>
                     <div className="space-y-3 pt-1">
                        <div className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">{item.time}</div>
                        <div className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors leading-tight">{item.title}</div>
                        <p className="text-[11px] text-slate-500 leading-relaxed max-w-xs">{item.desc}</p>
                     </div>
                  </div>
                ))}
             </div>
          </div>

          {/* Data Log Table */}
          <div className="lg:col-span-2 glass-card rounded-[48px] overflow-hidden border-white/5 bg-[#0a0f1e]/40">
             <div className="p-10 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-4 text-white font-bold">
                   <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                      <LayoutGrid size={20} />
                   </div>
                   <h3 className="text-xl font-bold tracking-tight">Bảng Log Chi Tiết</h3>
                </div>
                <button className="p-3 rounded-2xl hover:bg-white/5 text-slate-500 hover:text-white transition-all">
                   <Filter size={20} />
                </button>
             </div>
             <div className="overflow-x-auto px-4">
                <table className="w-full text-left min-w-[700px]">
                   <thead className="text-[10px] text-slate-600 font-bold uppercase tracking-[0.2em] border-b border-white/5">
                      <tr>
                         <th className="px-8 py-8">THỜI GIAN</th>
                         <th className="px-6 py-8">SỰ KIỆN / MODULE</th>
                         <th className="px-6 py-8 text-center">TRẠNG THÁI</th>
                         <th className="px-8 py-8">CHI TIẾT KỸ THUẬT</th>
                      </tr>
                   </thead>
                   <tbody className="text-[11px] text-white">
                      {[
                        { time: '10:42:15', date: '12/10/2023', mod: 'Thermal Sensor M2', status: 'ERR-TEMP-04', color: 'red', detail: 'Temp_Core > Threshold_85C. Auto-cooling initiated.' },
                        { time: '08:00:00', date: '12/10/2023', mod: 'Cooling System C1', status: 'MAINT-OK', color: 'cyan', detail: 'Routine check passed. Fluid levels nominal.' },
                        { time: '02:15:33', date: '12/10/2023', mod: 'Power Grid Link', status: 'SYNC-01', color: 'slate', detail: 'Grid sync successful. Variance < 0.05Hz.' },
                        { time: '14:30:00', date: '11/10/2023', mod: 'Main Control Unit', status: 'UPD-V2.4.1', color: 'purple', detail: 'Firmware applied. Reboot cycle completed in 45s.' },
                      ].map((log, i) => (
                        <tr key={i} className="group border-b border-white/[0.02] hover:bg-white/[0.03] transition-all">
                           <td className="px-8 py-8">
                              <div className="text-sm font-bold">{log.time}</div>
                              <div className="text-[9px] text-slate-600 font-bold mt-1 uppercase">{log.date}</div>
                           </td>
                           <td className="px-6 py-8">
                              <div className="text-slate-300 font-bold">{log.mod}</div>
                           </td>
                           <td className="px-6 py-8">
                              <div className="flex justify-center">
                                 <div className={`px-4 py-2 rounded-xl bg-opacity-10 font-bold border border-opacity-20 text-[9px] tracking-widest ${
                                    log.color === 'red' ? 'bg-red-500 text-red-500 border-red-500' : 
                                    log.color === 'cyan' ? 'bg-cyan-500 text-cyan-500 border-cyan-500' : 
                                    log.color === 'purple' ? 'bg-purple-500 text-purple-500 border-purple-500' : 
                                    'bg-slate-500 text-slate-500 border-slate-500'
                                 }`}>
                                    {log.status}
                                 </div>
                              </div>
                           </td>
                           <td className="px-8 py-8 text-slate-500 font-mono tracking-tighter leading-relaxed group-hover:text-slate-300 transition-colors">
                              {log.detail}
                           </td>
                        </tr>
                      ))}
                   </tbody>
                </table>
             </div>
             <div className="p-10 flex items-center justify-between border-t border-white/5">
                <div className="text-[10px] text-slate-700 font-bold uppercase tracking-widest">Hiển thị 1-4 của 128 bản ghi</div>
                <div className="flex gap-4">
                   <button className="w-12 h-12 rounded-2xl bg-white/5 text-slate-600 hover:text-white transition-all flex items-center justify-center"><ChevronRight size={20} className="rotate-180" /></button>
                   <button className="w-12 h-12 rounded-2xl bg-white/5 text-slate-600 hover:text-white transition-all flex items-center justify-center"><ChevronRight size={20} /></button>
                </div>
             </div>
          </div>
       </div>
    </div>
  );
}

// --- TAB: QR MANAGEMENT ---
function QRCodeManagementTab() {
  return (
    <div className="space-y-8">
       <div className="flex items-center justify-between">
          <div className="space-y-1">
             <h1 className="text-4xl font-bold text-white tracking-tight">Quản lý QR Code Thiết bị</h1>
             <p className="text-slate-500 text-sm">Hệ thống tạo và quản lý tem nhãn định danh tài sản.</p>
          </div>
          <div className="flex gap-3">
             <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 text-[10px] font-bold hover:bg-white/10 transition-all">
                <Plus size={14} /> Tùy chỉnh Mẫu
             </button>
             <button className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white text-[10px] font-bold shadow-lg shadow-cyan-500/20">
                <LayoutGrid size={14} /> Tạo Hàng Loạt
             </button>
          </div>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3 space-y-6">
             {/* Filter Bar */}
             <div className="glass-card p-4 rounded-2xl flex items-center justify-between">
                <div className="flex gap-4">
                   <select className="bg-white/5 border border-white/10 rounded-lg py-2 px-4 text-[10px] font-bold text-slate-400">
                      <option>Khu vực: Tất cả</option>
                   </select>
                   <select className="bg-white/5 border border-white/10 rounded-lg py-2 px-4 text-[10px] font-bold text-slate-400">
                      <option>Loại: Tất cả</option>
                   </select>
                </div>
                <div className="text-[10px] text-slate-600 font-bold uppercase">Hiển thị 24/156 thiết bị</div>
             </div>

             {/* QR Grid */}
             <div className="grid grid-cols-3 gap-6">
                {[
                  { id: 'PNL-A1-001', name: 'Tủ Điện Tổng Tầng 1', area: 'Trạm Biến Áp A1', color: 'cyan' },
                  { id: 'SNS-T2-045', name: 'Cảm biến Nhiệt độ', area: 'Phòng Server B2', color: 'purple' },
                  { id: 'INV-S1-002', name: 'Inverter Solar C-2', area: 'Mái Tòa nhà A', color: 'cyan' },
                ].map((qr, i) => (
                  <div key={i} className="glass-card p-6 rounded-[24px] space-y-6 group hover:border-cyan-500/30 transition-all cursor-pointer">
                     <div className="flex justify-between items-start">
                        <span className={`px-2 py-0.5 rounded bg-white/5 text-[8px] font-bold ${qr.color === 'cyan' ? 'text-cyan-400' : 'text-purple-400'}`}>{qr.id}</span>
                        <MoreVertical size={14} className="text-slate-600 group-hover:text-white transition-colors" />
                     </div>
                     <div className="aspect-square bg-white rounded-xl p-4 flex items-center justify-center relative">
                        <QrCode size="100%" strokeWidth={1} className="text-[#030712]" />
                        <div className="absolute w-8 h-8 bg-white border border-[#030712] rounded flex items-center justify-center">
                           <Zap size={14} className="text-[#030712]" />
                        </div>
                     </div>
                     <div className="space-y-1">
                        <div className="text-xs font-bold text-white group-hover:text-cyan-400 transition-colors">{qr.name}</div>
                        <div className="text-[10px] text-slate-500 font-medium">{qr.area}</div>
                     </div>
                     <div className="grid grid-cols-2 gap-3 pt-2">
                        <button className="py-2 rounded-lg bg-white/5 text-[9px] font-bold text-slate-400 hover:bg-white/10 flex items-center justify-center gap-1.5 transition-all">
                           <Download size={10} /> PNG
                        </button>
                        <button className="py-2 rounded-lg bg-white/5 text-[9px] font-bold text-slate-400 hover:bg-white/10 flex items-center justify-center gap-1.5 transition-all">
                           <Printer size={10} /> In Tem
                        </button>
                     </div>
                  </div>
                ))}
             </div>
          </div>

          <div className="space-y-8">
             {/* Simulator Card */}
             <div className="glass-card overflow-hidden rounded-[32px] flex flex-col">
                <div className="p-6 border-b border-white/5 flex items-center gap-3 bg-white/[0.02]">
                   <Monitor size={18} className="text-cyan-400" />
                   <span className="text-sm font-bold text-white">Giả lập Quét Mã</span>
                </div>
                <div className="aspect-[3/4] relative bg-slate-900 group">
                   <div className="absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-700" style={{ backgroundImage: 'url("/images/qr-scan-mockup.png")' }} />
                   <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-48 h-48 border-2 border-cyan-500/50 rounded-2xl relative">
                         <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-500 -translate-x-1 -translate-y-1" />
                         <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-500 translate-x-1 -translate-y-1" />
                         <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-500 -translate-x-1 translate-y-1" />
                         <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-500 translate-x-1 translate-y-1" />
                         <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.5)] animate-scan" />
                      </div>
                   </div>
                   <div className="absolute bottom-4 left-4 right-4 p-4 glass-card rounded-xl border-white/10 space-y-3">
                      <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                            <Zap size={14} />
                         </div>
                         <div>
                            <div className="text-[10px] text-slate-500 font-bold">PNL-A1-001</div>
                            <div className="text-xs font-bold text-white">Tủ Điện Tổng Tầng 1</div>
                         </div>
                      </div>
                      <button className="w-full py-2 bg-cyan-500/20 text-cyan-400 text-[10px] font-bold rounded-lg hover:bg-cyan-500/30 transition-all">
                         Xem Chi Tiết Kỹ Thuật
                      </button>
                   </div>
                </div>
             </div>

             {/* Appearance Customize */}
             <div className="glass-card p-8 rounded-[32px] space-y-6">
                <h3 className="text-lg font-bold text-white flex items-center gap-3">
                   <Activity size={18} className="text-purple-400" /> Tùy chỉnh Diện mạo
                </h3>
                <div className="space-y-4">
                   <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Màu chủ đạo QR</div>
                   <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-cyan-500 border-2 border-white ring-2 ring-cyan-500/20 cursor-pointer" />
                      <div className="w-8 h-8 rounded-full bg-teal-500 hover:scale-110 transition-transform cursor-pointer" />
                      <div className="w-8 h-8 rounded-full bg-purple-500 hover:scale-110 transition-transform cursor-pointer" />
                      <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-500 cursor-pointer">+</div>
                   </div>
                </div>
                <div className="space-y-4">
                   <div className="flex items-center justify-between">
                      <div className="text-[10px] text-slate-300 font-bold uppercase tracking-widest">Chèn Logo Công ty</div>
                      <div className="w-8 h-4 bg-cyan-500 rounded-full relative">
                         <div className="absolute right-0.5 top-0.5 w-3 h-3 bg-white rounded-full" />
                      </div>
                   </div>
                   <div className="text-[10px] text-slate-500 leading-relaxed">Hiển thị logo ở trung tâm mã</div>
                </div>
                <div className="space-y-4">
                   <div className="flex items-center justify-between">
                      <div className="text-[10px] text-slate-300 font-bold uppercase tracking-widest">In kèm Mã ID</div>
                      <div className="w-8 h-4 bg-cyan-500 rounded-full relative">
                         <div className="absolute right-0.5 top-0.5 w-3 h-3 bg-white rounded-full" />
                      </div>
                   </div>
                   <div className="text-[10px] text-slate-500 leading-relaxed">Thêm text phía dưới mã QR</div>
                </div>
                <button className="w-full py-4 rounded-xl bg-white/5 text-slate-400 text-xs font-bold hover:text-white hover:bg-white/10 transition-all border border-white/5">
                   Lưu Mẫu Mặc Định
                </button>
             </div>
          </div>
       </div>
    </div>
  );
}

// --- SHARED COMPONENT: STAT CARD ---
function StatCard({ title, value, icon: Icon, color, badge }: any) {
  const colorMap: any = {
    cyan: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    green: 'bg-green-500/10 text-green-400 border-green-500/20',
    red: 'bg-red-500/10 text-red-400 border-red-500/20',
    purple: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    slate: 'bg-white/5 text-slate-400 border-white/5',
  };

  return (
    <div className="glass-card p-6 rounded-[24px] space-y-4 flex flex-col justify-between border-white/5">
       <div className="flex justify-between items-start">
          <div className={`p-3 rounded-2xl ${colorMap[color]}`}>
             <Icon size={20} />
          </div>
          {badge && (
            <div className="px-2 py-0.5 rounded-lg bg-green-500/10 text-green-500 text-[10px] font-bold flex items-center gap-1">
               <div className="w-1 h-1 rounded-full bg-green-500" /> {badge}
            </div>
          )}
       </div>
       <div>
          <div className="text-3xl font-bold text-white tracking-tight">{value}</div>
          <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">{title}</div>
       </div>
    </div>
  );
}
