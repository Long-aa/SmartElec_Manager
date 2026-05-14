'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
   Package,
   Search,
   Filter,
   Download,
   Plus,
   MoreVertical,
   Cpu,
   CheckCircle2,
   AlertTriangle,
   XCircle,
   ChevronRight,
   Truck,
   User,
   Calendar,
   Zap,
   Activity,
   History,
   TrendingDown,
   Phone,
   Mail,
   FileText,
   QrCode,
   ArrowUpRight,
   ArrowDownRight,
   Layers,
   Clock
} from 'lucide-react';

const tabs = [
   { id: 'list', label: 'Danh sách linh kiện' },
   { id: 'import', label: 'Nhập kho' },
   { id: 'export', label: 'Xuất kho' },
   { id: 'alerts', label: 'Cảnh báo thiếu hàng' }
];

export default function InventoryPage() {
   const [activeTab, setActiveTab] = React.useState('list');

   return (
      <div className="space-y-6 relative z-10">
         {/* Breadcrumbs & Header */}
         <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
               <div className="flex items-center gap-2 text-slate-500 text-xs mb-2">
                  <span>Kho</span>
                  <ChevronRight size={12} />
                  <span className="text-purple-500 font-medium">{tabs.find(t => t.id === activeTab)?.label}</span>
               </div>
               <h1 className="text-3xl font-bold text-white tracking-tight">
                  {activeTab === 'list' && 'Quản lý linh kiện'}
                  {activeTab === 'import' && 'Nhập kho linh kiện'}
                  {activeTab === 'export' && 'Xuất kho linh kiện'}
                  {activeTab === 'alerts' && 'Cảnh báo thiếu hàng Realtime'}
               </h1>
            </div>

            <div className="flex items-center gap-3">
               <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-1 flex gap-1">
                  {tabs.map((tab) => (
                     <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-4 py-2 rounded-xl text-[10px] font-bold transition-all relative ${activeTab === tab.id ? 'text-white bg-white/10 shadow-xl' : 'text-slate-500 hover:text-slate-300'
                           }`}
                     >
                        {tab.label}
                     </button>
                  ))}
               </div>
               {activeTab === 'list' && (
                  <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 text-white text-xs font-bold hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all">
                     <Plus size={16} /> Thêm linh kiện
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
               {activeTab === 'list' && <InventoryListTab />}
               {activeTab === 'import' && <StockImportTab />}
               {activeTab === 'export' && <StockExportTab />}
               {activeTab === 'alerts' && <ShortageAlertsTab />}
            </motion.div>
         </AnimatePresence>
      </div>
   );
}

// --- TAB: INVENTORY LIST ---
function InventoryListTab() {
   return (
      <div className="space-y-6">
         {/* Summary Cards */}
         <div className="grid grid-cols-4 gap-6">
            <InvStatCard title="TỔNG LINH KIỆN" value="12,450" icon={Cpu} color="cyan" />
            <InvStatCard title="CÒN HÀNG" value="11,200" icon={CheckCircle2} color="green" />
            <InvStatCard title="SẮP HẾT" value="850" icon={AlertTriangle} color="yellow" />
            <InvStatCard title="HẾT HÀNG" value="400" icon={XCircle} color="red" />
         </div>

         {/* Filter & Table Area */}
         <div className="glass-card rounded-[32px] overflow-hidden border-white/5">
            <div className="p-8 flex items-center justify-between border-b border-white/5">
               <div className="relative w-96">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                     type="text"
                     placeholder="Tìm kiếm theo mã, tên linh kiện..."
                     className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-xs text-white focus:outline-none focus:border-purple-500/50 transition-all"
                  />
               </div>
               <div className="flex gap-2">
                  <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 text-slate-400 text-[10px] font-bold hover:text-white transition-all">
                     <Filter size={14} /> Lọc
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 text-slate-400 text-[10px] font-bold hover:text-white transition-all">
                     <Download size={14} /> Xuất file
                  </button>
               </div>
            </div>
            <div className="overflow-x-auto">
               <table className="w-full text-left">
                  <thead>
                     <tr className="text-[10px] text-slate-600 font-bold uppercase tracking-widest border-b border-white/5">
                        <th className="px-8 py-6">MÃ LK</th>
                        <th className="px-4 py-6">TÊN LINH KIỆN</th>
                        <th className="px-4 py-6">LOẠI</th>
                        <th className="px-4 py-6 text-right">TỒN KHO</th>
                        <th className="px-4 py-6">VỊ TRÍ</th>
                        <th className="px-4 py-6 text-center">TRẠNG THÁI</th>
                        <th className="px-8 py-6 text-right">THAO TÁC</th>
                     </tr>
                  </thead>
                  <tbody className="text-xs text-white">
                     {[
                        { id: 'IC-74HC00', name: 'Quad 2-Input NAND Gate', type: 'Vi mạch (IC)', qty: '2,500', loc: 'Kệ A - Tầng 2', status: 'Còn hàng', color: 'green' },
                        { id: 'RES-10K-0805', name: 'Điện trở SMD 10K Ohm 1%', type: 'Thụ động', qty: '50', loc: 'Kệ C - Tầng 1', status: 'Sắp hết', color: 'yellow' },
                        { id: 'MCU-STM32F4', name: 'STM32F405RGT6 Microcontroller', type: 'Vi điều khiển', qty: '0', loc: 'Tủ chống ẩm B', status: 'Hết hàng', color: 'red' },
                     ].map((item, i) => (
                        <tr key={i} className="group border-b border-white/[0.02] hover:bg-white/[0.03] transition-all">
                           <td className="px-8 py-6 font-medium text-slate-400 group-hover:text-purple-400 transition-colors">{item.id}</td>
                           <td className="px-4 py-6 font-bold">{item.name}</td>
                           <td className="px-4 py-6 text-slate-500">{item.type}</td>
                           <td className={`px-4 py-6 text-right font-bold ${item.color === 'yellow' ? 'text-yellow-500' : item.color === 'red' ? 'text-red-500' : 'text-white'}`}>{item.qty}</td>
                           <td className="px-4 py-6 text-slate-500 italic">{item.loc}</td>
                           <td className="px-4 py-6">
                              <div className="flex justify-center">
                                 <div className={`px-3 py-1.5 rounded-lg text-[10px] font-bold flex items-center gap-2 border ${item.color === 'green' ? 'bg-green-500/10 text-green-500 border-green-500/20' : item.color === 'yellow' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' : 'bg-red-500/10 text-red-500 border-red-500/20'}`}>
                                    <div className={`w-1 h-1 rounded-full ${item.color === 'green' ? 'bg-green-500' : item.color === 'yellow' ? 'bg-yellow-500' : 'bg-red-500'}`} />
                                    {item.status}
                                 </div>
                              </div>
                           </td>
                           <td className="px-8 py-6 text-right">
                              <button className="p-2 rounded-lg hover:bg-white/5 text-slate-500 hover:text-white transition-all">
                                 <MoreVertical size={16} />
                              </button>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
            <div className="p-8 flex items-center justify-between border-t border-white/5 text-[10px] text-slate-600 font-bold uppercase">
               <span>Hiển thị 1 - 3 của 12,450 linh kiện</span>
               <div className="flex gap-2">
                  <button className="p-2 rounded-lg bg-white/5 text-slate-500 hover:text-white"><ChevronRight size={14} className="rotate-180" /></button>
                  <button className="w-8 h-8 rounded-lg bg-purple-500 text-white">1</button>
                  <button className="w-8 h-8 rounded-lg bg-white/5 text-slate-500">2</button>
                  <button className="w-8 h-8 rounded-lg bg-white/5 text-slate-500">3</button>
                  <span className="px-2">...</span>
                  <button className="p-2 rounded-lg bg-white/5 text-slate-500 hover:text-white"><ChevronRight size={14} /></button>
               </div>
            </div>
         </div>
      </div>
   );
}

// --- TAB: STOCK IMPORT ---
function StockImportTab() {
   return (
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
         <div className="lg:col-span-3 space-y-8">
            {/* Ticket Info */}
            <div className="glass-card p-10 rounded-[32px] space-y-8 border-white/5">
               <div className="flex items-center gap-3 text-white font-bold">
                  <FileText size={20} className="text-purple-400" />
                  Thông tin phiếu nhập
               </div>
               <div className="grid grid-cols-4 gap-6">
                  <div className="space-y-2">
                     <label className="text-[10px] text-slate-500 font-bold uppercase tracking-widest ml-1">Mã phiếu</label>
                     <input type="text" defaultValue="PN-2023-1045" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-xs text-white focus:outline-none" />
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] text-slate-500 font-bold uppercase tracking-widest ml-1">Nhà cung cấp</label>
                     <select className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-xs text-white appearance-none">
                        <option>TechCorp Electronic</option>
                     </select>
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] text-slate-500 font-bold uppercase tracking-widest ml-1">Người nhập</label>
                     <input type="text" defaultValue="Nguyễn Văn A" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-xs text-white" />
                  </div>
                  <div className="space-y-2 relative">
                     <label className="text-[10px] text-slate-500 font-bold uppercase tracking-widest ml-1">Ngày nhập</label>
                     <input type="text" defaultValue="10/25/2023" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-xs text-white" />
                     <Calendar size={14} className="absolute right-4 bottom-3.5 text-slate-600" />
                  </div>
               </div>
            </div>

            {/* Component Details */}
            <div className="glass-card rounded-[32px] overflow-hidden border-white/5">
               <div className="p-10 flex items-center justify-between border-b border-white/5">
                  <div className="flex items-center gap-3 text-white font-bold">
                     <Layers size={20} className="text-purple-400" />
                     Chi tiết linh kiện
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 text-white text-[10px] font-bold hover:bg-white/10 transition-all">
                     <Plus size={14} /> Thêm dòng
                  </button>
               </div>
               <div className="overflow-x-auto">
                  <table className="w-full text-left">
                     <thead>
                        <tr className="text-[10px] text-slate-600 font-bold uppercase tracking-widest border-b border-white/5">
                           <th className="px-8 py-6">STT</th>
                           <th className="px-4 py-6">MÃ LK</th>
                           <th className="px-4 py-6">TÊN LINH KIỆN</th>
                           <th className="px-4 py-6">SỐ LƯỢNG</th>
                           <th className="px-4 py-6">ĐƠN GIÁ (VND)</th>
                           <th className="px-8 py-6 text-right">THÀNH TIỀN</th>
                        </tr>
                     </thead>
                     <tbody className="text-xs text-white">
                        {[
                           { stt: 1, id: 'IC-MCU-32', name: 'Vi điều khiển 32-bit ARM Cortex', qty: '500', price: '125,000', total: '62,500,000' },
                           { stt: 2, id: 'CAP-100UF', name: 'Tụ điện Electrolytic 100uF 50V', qty: '2000', price: '1,200', total: '2,400,000' },
                        ].map((row, i) => (
                           <tr key={i} className="border-b border-white/[0.02]">
                              <td className="px-8 py-8 text-slate-600 font-bold">{row.stt}</td>
                              <td className="px-4 py-8">
                                 <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[10px] font-mono text-purple-400">{row.id}</span>
                              </td>
                              <td className="px-4 py-8">
                                 <div className="max-w-[150px] leading-relaxed text-slate-300">{row.name}</div>
                              </td>
                              <td className="px-4 py-8">
                                 <input type="text" defaultValue={row.qty} className="w-24 bg-white/5 border border-white/10 rounded-lg py-2 px-3 text-center focus:outline-none focus:border-purple-500/50" />
                              </td>
                              <td className="px-4 py-8">
                                 <input type="text" defaultValue={row.price} className="w-32 bg-white/5 border border-white/10 rounded-lg py-2 px-3 text-right focus:outline-none focus:border-purple-500/50" />
                              </td>
                              <td className="px-8 py-8 text-right font-bold tracking-tight">{row.total}</td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </div>
         </div>

         {/* Right Summary Sidebar */}
         <div className="space-y-8">
            <div className="glass-card p-10 rounded-[40px] space-y-10 border-white/5">
               <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-white tracking-tight">Tổng kết</h3>
                  <div className="px-3 py-1 rounded-full bg-slate-900 text-[10px] font-bold text-slate-500 flex items-center gap-1.5 border border-white/5">
                     <div className="w-1.5 h-1.5 rounded-full bg-slate-500" /> Đang soạn thảo
                  </div>
               </div>
               <div className="space-y-8">
                  <div className="flex justify-between items-end border-b border-white/5 pb-6">
                     <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Tổng số lượng</div>
                     <div className="text-3xl font-bold text-white tracking-tighter">2,500</div>
                  </div>
                  <div className="flex justify-between items-end border-b border-white/5 pb-6">
                     <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Số loại linh kiện</div>
                     <div className="text-3xl font-bold text-white tracking-tighter">2</div>
                  </div>
                  <div className="space-y-2 pt-4">
                     <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Tổng giá trị ước tính</div>
                     <div className="text-6xl font-bold text-purple-400 tracking-tighter">
                        64.9 <span className="text-xl text-slate-500 font-medium">Tr VND</span>
                     </div>
                  </div>
               </div>
               <button className="w-full py-5 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold shadow-xl shadow-purple-500/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-3">
                  <CheckCircle2 size={20} /> Xác nhận nhập kho
               </button>
            </div>

            <button className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-slate-400 text-xs font-bold hover:text-white transition-all flex items-center justify-center gap-3 group">
               <QrCode size={18} className="group-hover:text-purple-400" /> Quét mã QR linh kiện
            </button>
         </div>
      </div>
   );
}

// --- TAB: STOCK EXPORT ---
function StockExportTab() {
   return (
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
         <div className="lg:col-span-3 space-y-8">
            <div className="glass-card p-10 rounded-[32px] space-y-8 border-white/5">
               <div className="flex items-center gap-3 text-white font-bold">
                  <FileText size={20} className="text-purple-400" />
                  Thông tin phiếu xuất
               </div>
               <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-6">
                     <div className="space-y-2">
                        <label className="text-[10px] text-slate-500 font-bold uppercase tracking-widest ml-1">Mã phiếu</label>
                        <input type="text" defaultValue="XK-202310-084" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-xs text-purple-400" />
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] text-slate-500 font-bold uppercase tracking-widest ml-1">Bộ phận</label>
                        <select className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-xs text-white appearance-none">
                           <option>Chọn bộ phận...</option>
                           <option>Bảo trì hệ thống</option>
                           <option>Lắp đặt mới</option>
                        </select>
                     </div>
                  </div>
                  <div className="space-y-6">
                     <div className="space-y-2">
                        <label className="text-[10px] text-slate-500 font-bold uppercase tracking-widest ml-1">Người nhận</label>
                        <input type="text" placeholder="Nhập tên nhân viên..." className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-xs text-white" />
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] text-slate-500 font-bold uppercase tracking-widest ml-1">Lý do xuất</label>
                        <textarea placeholder="Ghi chú mục đích sử dụng..." className="w-full h-24 bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-xs text-white resize-none" />
                     </div>
                  </div>
               </div>
            </div>

            <div className="glass-card rounded-[32px] overflow-hidden border-white/5">
               <div className="p-10 flex items-center justify-between">
                  <h3 className="text-xl font-bold text-white tracking-tight">Danh sách linh kiện</h3>
                  <button className="flex items-center gap-2 text-slate-400 hover:text-white transition-all text-xs font-bold">
                     <Plus size={16} /> Thêm dòng
                  </button>
               </div>
               <div className="overflow-x-auto px-4">
                  <table className="w-full text-left">
                     <thead className="text-[10px] text-slate-600 font-bold uppercase tracking-widest border-b border-white/5">
                        <tr>
                           <th className="px-6 py-6">MÃ LK</th>
                           <th className="px-6 py-6">TÊN LINH KIỆN</th>
                           <th className="px-6 py-6 text-center">TỒN HIỆN TẠI</th>
                           <th className="px-6 py-6 text-right">SL XUẤT</th>
                        </tr>
                     </thead>
                     <tbody className="text-xs text-white">
                        {[
                           { id: 'IC-74HC595', name: 'Shift Register 8-bit', stock: 500, export: 50, color: 'cyan' },
                           { id: 'REL-12V-DC', name: 'Relay 12V 10A Songle', stock: 20, export: 50, color: 'red', warning: true },
                        ].map((item, i) => (
                           <tr key={i} className={`border-b border-white/[0.02] ${item.warning ? 'bg-red-500/5' : ''}`}>
                              <td className="px-6 py-8">
                                 <div className="flex items-center gap-3">
                                    {item.warning && <AlertTriangle size={14} className="text-red-500" />}
                                    <span className="text-purple-400 font-mono tracking-tight">{item.id}</span>
                                 </div>
                              </td>
                              <td className="px-6 py-8 text-slate-300 font-medium">{item.name}</td>
                              <td className="px-6 py-8">
                                 <div className="flex flex-col gap-2 max-w-[150px] mx-auto">
                                    <div className="flex justify-between text-[8px] font-bold uppercase text-slate-600">
                                       <span>Stock</span>
                                       <span>{item.stock}</span>
                                    </div>
                                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                       <div className={`h-full ${item.color === 'red' ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]' : 'bg-cyan-500 shadow-[0_0_8px_rgba(34,211,238,0.5)]'}`} style={{ width: `${Math.min(100, item.stock / 5)}%` }} />
                                    </div>
                                 </div>
                              </td>
                              <td className="px-6 py-8 text-right">
                                 <input
                                    type="text"
                                    defaultValue={item.export}
                                    className={`w-24 bg-[#030712] border ${item.warning ? 'border-red-500/50 text-red-500' : 'border-white/10 text-white'} rounded-xl py-2 px-4 text-center font-bold focus:outline-none focus:border-purple-500/50`}
                                 />
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
               <div className="p-10 flex justify-end gap-4">
                  <button className="px-8 py-3 rounded-2xl border border-white/10 text-slate-400 text-xs font-bold hover:bg-white/5 transition-all">Hủy bỏ</button>
                  <button className="px-10 py-3 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 text-xs font-bold hover:bg-cyan-500/30 transition-all flex items-center gap-3">
                     <CheckCircle2 size={18} /> Xác nhận xuất kho
                  </button>
               </div>
            </div>
         </div>

         <div className="space-y-8">
            <div className="glass-card p-10 rounded-[40px] space-y-10 border-white/5">
               <div className="flex justify-between items-start">
                  <h3 className="text-xs text-slate-500 font-bold uppercase tracking-widest leading-relaxed">GIÁ TRỊ XUẤT (ƯỚC TÍNH)</h3>
                  <FileText size={20} className="text-slate-700" />
               </div>
               <div className="space-y-2">
                  <div className="text-6xl font-bold text-white tracking-tighter">
                     45.2 <span className="text-xl text-slate-600 font-medium">Tr</span>
                  </div>
                  <div className="flex items-center gap-2 text-red-500 text-[10px] font-bold">
                     <TrendingDown size={14} /> -12% <span className="text-slate-700 ml-1">So với tuần trước</span>
                  </div>
               </div>
               <div className="h-32 bg-white/[0.02] rounded-2xl border border-white/5 overflow-hidden">
                  {/* Small Sparkline Placeholder */}
                  <svg className="w-full h-full p-2" viewBox="0 0 100 40">
                     <path d="M0,35 L20,30 L40,38 L60,25 L80,28 L100,10" fill="none" stroke="#6366f1" strokeWidth="2" strokeOpacity="0.5" />
                  </svg>
               </div>
            </div>
            <button className="w-full py-4 rounded-2xl bg-[#0a0f1e] border border-white/10 text-slate-300 text-xs font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-3 shadow-2xl">
               <QrCode size={18} /> QUÉT MÃ QR
            </button>
         </div>
      </div>
   );
}

// --- TAB: SHORTAGE ALERTS ---
function ShortageAlertsTab() {
   return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
         <div className="lg:col-span-2 space-y-8">
            <div className="flex flex-col gap-2">
               <p className="text-slate-500 text-sm">Theo dõi và xử lý nhanh các nguy cơ gián đoạn chuỗi cung ứng.</p>
            </div>

            <div className="space-y-6">
               {[
                  { id: 'MCU-ST-405-VG', name: 'Vi điều khiển STM32F4', current: 120, min: 500, type: 'EMERGENCY', time: 'Vừa xong', supplier: 'TechAsia Component', eta: '24h' },
                  { id: 'SEN-PT-100-IND', name: 'Cảm biến nhiệt độ công nghiệp PT100', current: 45, min: 100, type: 'CRITICAL', time: '10 phút trước', supplier: 'Global Sensor Co.', eta: '48h' },
                  { id: 'REL-SSR-40A-DC', name: 'Relay Solid State 40A', current: 210, min: 250, type: 'WARNING', time: '1 giờ trước', supplier: 'ElectroParts VN', eta: '3-5 ngày' },
               ].map((alert, i) => (
                  <div key={i} className={`glass-card p-10 rounded-[40px] border-l-8 ${alert.type === 'EMERGENCY' ? 'border-l-red-500/80 border-white/5' : alert.type === 'CRITICAL' ? 'border-l-purple-500/80 border-white/5' : 'border-l-cyan-500/80 border-white/5'} space-y-8 relative overflow-hidden group hover:bg-white/[0.04] transition-all`}>
                     <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                           <div className={`px-4 py-1.5 rounded-lg text-[9px] font-bold tracking-widest ${alert.type === 'EMERGENCY' ? 'bg-red-500/10 text-red-500 border border-red-500/20' : alert.type === 'CRITICAL' ? 'bg-purple-500/10 text-purple-500 border border-purple-500/20' : 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'}`}>
                              {alert.type}
                           </div>
                           <span className="text-[10px] text-slate-600 font-bold uppercase">{alert.time}</span>
                        </div>
                     </div>
                     <div className="flex items-end justify-between">
                        <div className="space-y-3">
                           <h4 className="text-2xl font-bold text-white tracking-tight">{alert.name}</h4>
                           <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Mã LK: {alert.id}</p>
                        </div>
                        <div className="p-6 rounded-2xl bg-[#030712] border border-white/5 flex flex-col items-center gap-2">
                           <div className="text-[10px] text-slate-700 font-bold uppercase tracking-widest">Tồn hiện tại / Mức tối thiểu</div>
                           <div className="text-2xl font-bold text-white">
                              <span className={alert.type === 'EMERGENCY' ? 'text-red-500' : 'text-purple-400'}>{alert.current}</span>
                              <span className="text-slate-600 mx-2">/</span>
                              <span className="text-slate-400">{alert.min} pcs</span>
                           </div>
                        </div>
                     </div>
                     <div className="flex items-center justify-between pt-4 border-t border-white/[0.03]">
                        <div className="flex items-center gap-3 text-[10px] text-slate-500 font-bold">
                           <Truck size={14} className="text-slate-700" />
                           NCC đề xuất: <span className="text-slate-300">{alert.supplier}</span> <span className="text-slate-600">(Giao {alert.eta})</span>
                        </div>
                        <button className={`px-6 py-3 rounded-2xl font-bold text-[11px] shadow-lg transition-all active:scale-95 ${alert.type === 'EMERGENCY' ? 'bg-red-500/20 text-red-500 hover:bg-red-500/30' : alert.type === 'CRITICAL' ? 'bg-purple-500/20 text-purple-400 hover:bg-purple-500/30' : 'bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30'}`}>
                           Tạo phiếu nhập nhanh
                        </button>
                     </div>
                  </div>
               ))}
            </div>
         </div>

         <div className="space-y-10">
            {/* AI Forecast Card */}
            <div className="glass-card p-10 rounded-[48px] space-y-10 border-white/5 bg-[#0a0f1e]/40 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-8">
                  <Zap size={32} className="text-cyan-500/20 animate-pulse" />
               </div>
               <div className="flex items-center gap-3 text-cyan-400 font-bold">
                  <Activity size={20} />
                  <h3 className="text-lg tracking-tight">AI Dự báo tiêu thụ</h3>
               </div>
               <p className="text-[11px] text-slate-500 leading-relaxed font-medium">Tốc độ tiêu hao (MCU-ST-405-VG)</p>

               <div className="h-40 relative flex items-end">
                  <svg className="w-full h-full" viewBox="0 0 200 80" preserveAspectRatio="none">
                     <path d="M0,70 Q50,65 100,50 T200,20" fill="none" stroke="#22d3ee" strokeWidth="3" className="drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
                     <circle cx="180" cy="25" r="4" fill="#f87171" className="animate-ping" />
                     <circle cx="180" cy="25" r="3" fill="#f87171" />
                  </svg>
               </div>

               <div className="p-6 rounded-3xl bg-red-500/10 border border-red-500/20 space-y-3">
                  <div className="flex items-center gap-2 text-red-400 text-[10px] font-bold uppercase tracking-widest">
                     <Clock size={14} /> DỰ KIẾN CẠN KIỆT
                  </div>
                  <div className="text-4xl font-bold text-white tracking-tighter">
                     12 <span className="text-sm text-slate-500 font-medium">giờ tới</span>
                  </div>
                  <p className="text-[10px] text-slate-600 leading-relaxed">Dựa trên tốc độ sản xuất dây chuyền A1.</p>
               </div>
            </div>

            {/* Supplier Contact */}
            <div className="glass-card p-10 rounded-[48px] space-y-10 border-white/5">
               <div className="flex items-center gap-3 text-white font-bold">
                  <User size={20} className="text-slate-500" />
                  <h3 className="text-lg tracking-tight">Liên hệ nhà cung cấp</h3>
               </div>
               <div className="space-y-6">
                  {[
                     { name: 'TechAsia Component', sla: '24h' },
                     { name: 'Global Sensor Co.', sla: '48h' }
                  ].map((s, i) => (
                     <div key={i} className="p-6 rounded-[28px] bg-white/[0.02] border border-white/5 flex items-center justify-between group hover:bg-white/5 transition-all">
                        <div className="space-y-1">
                           <div className="text-xs font-bold text-white group-hover:text-cyan-400 transition-colors">{s.name}</div>
                           <div className="text-[10px] text-slate-600 font-bold uppercase">SLA: {s.sla}</div>
                        </div>
                        <div className="flex gap-2">
                           <button className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-500 hover:text-white transition-all">
                              <Phone size={14} />
                           </button>
                           <button className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-500 hover:text-white transition-all">
                              <Mail size={14} />
                           </button>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </div>
   );
}

// --- SHARED COMPONENT: INV STAT CARD ---
function InvStatCard({ title, value, icon: Icon, color }: any) {
   const colorMap: any = {
      cyan: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
      green: 'bg-green-500/10 text-green-400 border-green-500/20',
      yellow: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
      red: 'bg-red-500/10 text-red-400 border-red-500/20',
   };

   return (
      <div className="glass-card p-8 rounded-[32px] space-y-6 flex flex-col justify-between border-white/5">
         <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${colorMap[color]}`}>
            <Icon size={24} />
         </div>
         <div className="space-y-2">
            <div className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em]">{title}</div>
            <div className="text-4xl font-bold text-white tracking-tighter">{value}</div>
         </div>
      </div>
   );
}
