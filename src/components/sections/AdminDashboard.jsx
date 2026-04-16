import React, { useState, useEffect, useRef } from 'react';
import { db } from '../../firebase/config';
import {
    collection,
    onSnapshot,
    query,
    orderBy,
    updateDoc,
    deleteDoc,
    doc,
    addDoc,
    serverTimestamp,
} from 'firebase/firestore';
import { motion, AnimatePresence } from 'framer-motion';
import {
    MdLogout,
    MdEmail,
    MdPhone,
    MdDelete,
    MdSearch,
    MdFilterList,
    MdInbox,
    MdMoreVert,
    MdClose,
    MdCheckCircle,
    MdAccessTime,
    MdFactCheck,
    MdDownload,
    MdCancel,
    MdMenu,
} from 'react-icons/md';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { sendOrderEmail } from '../../utils/email';
import * as XLSX from 'xlsx';

const SERVICE_COLORS = {
    'Web Development': 'bg-blue-50 text-blue-700 border-blue-200',
    'UI/UX Design': 'bg-pink-50 text-pink-700 border-pink-200',
    'Security & Maintenance': 'bg-orange-50 text-orange-700 border-orange-200',
    'IoT Projects': 'bg-green-50 text-green-700 border-green-200',
};

const STATUS_COLORS = {
    'Pending': 'text-gray-600 bg-gray-100',
    'Accepted': 'text-blue-600 bg-blue-100',
    'Waitlisted': 'text-yellow-600 bg-yellow-100',
    'Finished': 'text-green-600 bg-green-100',
    'Rejected': 'text-red-600 bg-red-100',
};

const CHART_COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#6b7280', '#ef4444']; // Blue, Green, Yellow, Gray, Red

const AdminDashboard = ({ user, onSignOut }) => {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [filterService, setFilterService] = useState('All');
    const [filterStatus, setFilterStatus] = useState('All');
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [actionLoading, setActionLoading] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const fileInputRef = useRef(null);

    // Real-time Firestore listener
    useEffect(() => {
        const q = query(collection(db, 'contacts'), orderBy('createdAt', 'desc'));
        const unsub = onSnapshot(q, (snap) => {
            setContacts(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
            setLoading(false);
        });
        return unsub;
    }, []);

    const handleAction = async (orderId, newStatus) => {
        setActionLoading(true);
        try {
            const orderRef = doc(db, 'contacts', orderId);
            await updateDoc(orderRef, { status: newStatus });
            
            const contact = contacts.find(c => c.id === orderId);
            if (contact) {
                // Determine action name based on status
                let actionName = newStatus;
                await sendOrderEmail(contact, actionName);
            }
            
            if (selectedOrder?.id === orderId) {
                setSelectedOrder({ ...selectedOrder, status: newStatus });
            }
        } catch (error) {
            console.error("Error updating status:", error);
            alert("Failed to update status. Check console for details.");
        } finally {
            setActionLoading(false);
        }
    };

    const deleteContact = async (id) => {
        if (window.confirm('Delete this order permanently?')) {
            await deleteDoc(doc(db, 'contacts', id));
            if (selectedOrder?.id === id) setSelectedOrder(null);
        }
    };

    const formatDate = (ts) => {
        if (!ts) return '—';
        return new Date(ts.seconds * 1000).toLocaleDateString('en-US', {
            month: 'short', day: 'numeric'
        });
    };

    const handleExport = () => {
        if (contacts.length === 0) return alert('No data to export.');
        
        // Define CSV Headers
        const headers = ['OrderNumber', 'FirstName', 'LastName', 'Email', 'Phone', 'Status', 'Services', 'Message', 'CreatedAt'];
        const csvRows = [headers.join(',')];
        
        // Format rows (escaping quotes and commas inside text)
        contacts.forEach(c => {
            const row = [
                `"${(c.orderNumber || c.id).replace(/"/g, '""')}"`,
                `"${(c.firstName || '').replace(/"/g, '""')}"`,
                `"${(c.lastName || '').replace(/"/g, '""')}"`,
                `"${(c.email || '').replace(/"/g, '""')}"`,
                `"${(c.phone || '').replace(/"/g, '""')}"`,
                `"${(c.status || 'Pending').replace(/"/g, '""')}"`,
                `"${(c.services ? c.services.join('; ') : '').replace(/"/g, '""')}"`,
                `"${(c.message || '').replace(/"/g, '""').replace(/\n/g, ' ')}"`, // remove newlines for clean CSV
                `"${c.createdAt ? new Date(c.createdAt.seconds * 1000).toLocaleString() : ''}"`
            ];
            csvRows.push(row.join(','));
        });
        
        // Create Blob and Download
        const csvString = csvRows.join('\n');
        const blob = new Blob([csvString], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `flowzen_orders_${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const handleImportClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Simple loading toast
        if (!window.confirm("This will upload all rows in the document to your database. Make sure it contains columns like FirstName, LastName, Email, Status, Message. Proceed?")) {
            if (fileInputRef.current) fileInputRef.current.value = '';
            return;
        }

        try {
            const reader = new FileReader();
            reader.onload = async (evt) => {
                const data = evt.target.result;
                const workbook = XLSX.read(data, { type: 'binary' });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const jsonData = XLSX.utils.sheet_to_json(worksheet);

                if (!jsonData || jsonData.length === 0) {
                    alert("The file appears to be empty or in an unsupported format.");
                    return;
                }

                let successCount = 0;
                
                for (const row of jsonData) {
                    // Fuzzy match common headers
                    const firstName = row['FirstName'] || row['First Name'] || row['Name'] || '';
                    const lastName = row['LastName'] || row['Last Name'] || '';
                    const email = row['Email'] || row['Email Address'] || '';
                    const phone = row['Phone'] || row['Phone Number'] || '';
                    let status = row['Status'] || row['Order Status'] || 'Pending';
                    const message = row['Message'] || row['Notes'] || '';
                    
                    // Validate status enum
                    if (!allStatuses.includes(status)) status = 'Pending';
                    
                    let services = [];
                    const rawServices = row['Services'] || row['Requested Services'] || '';
                    if (typeof rawServices === 'string' && rawServices) {
                        services = rawServices.split(';').map(s => s.trim()).filter(Boolean);
                    }

                    // Skip completely empty meaningless rows
                    if (!email && !firstName) continue; 

                    const newOrderNum = row['OrderNumber'] || row['Order ID'] || `FZ-${Math.floor(10000 + Math.random() * 90000)}`;

                    await addDoc(collection(db, 'contacts'), {
                        orderNumber: newOrderNum,
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        phone: phone,
                        status: status,
                        message: message,
                        services: services,
                        createdAt: serverTimestamp()
                    });
                    successCount++;
                }
                
                alert(`Successfully imported ${successCount} orders to your dashboard!`);
                if (fileInputRef.current) fileInputRef.current.value = '';
            };
            reader.readAsBinaryString(file);
        } catch (error) {
            console.error("Import error:", error);
            alert("Error parsing file. Please ensure it is a valid CSV or XLS/XLSX file without password protection.");
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    const allServices = ['All', 'Web Development', 'UI/UX Design', 'Security & Maintenance', 'IoT Projects'];
    const allStatuses = ['All', 'Pending', 'Accepted', 'Waitlisted', 'Finished', 'Rejected'];

    const filtered = contacts.filter((c) => {
        const matchSearch =
            `${c.orderNumber} ${c.firstName} ${c.lastName} ${c.email}`
                .toLowerCase()
                .includes(search.toLowerCase());
        const matchService =
            filterService === 'All' || (c.services || []).includes(filterService);
        const matchStatus = 
            filterStatus === 'All' || (c.status || 'Pending') === filterStatus;
        return matchSearch && matchService && matchStatus;
    });

    // Analytics Data Prep
    const totalOrders = contacts.length;
    const acceptedStats = contacts.filter(c => c.status === 'Accepted' || c.status === 'Finished').length;
    const pendingStats = contacts.filter(c => !c.status || c.status === 'Pending').length;
    
    // Status distribution for chart
    const statusCounts = contacts.reduce((acc, curr) => {
        const status = curr.status || 'Pending';
        acc[status] = (acc[status] || 0) + 1;
        return acc;
    }, {});

    const chartData = [
        { name: 'Accepted/Finished', value: (statusCounts['Accepted'] || 0) + (statusCounts['Finished'] || 0) },
        { name: 'Pending', value: statusCounts['Pending'] || 0 },
        { name: 'Waitlisted', value: statusCounts['Waitlisted'] || 0 },
    ].filter(d => d.value > 0);

    return (
        <div className="flex h-screen bg-gray-50 text-gray-900 font-sans overflow-hidden relative">
            
            {/* Mobile Sidebar Overlay */}
            {mobileMenuOpen && (
                <div 
                    className="fixed inset-0 bg-gray-900/50 z-20 lg:hidden" 
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}
            
            {/* ── LEFT SIDEBAR (Dark Theme Aligned with Website) ── */}
            <aside className={`absolute z-30 lg:relative lg:translate-x-0 w-64 bg-gray-950 border-r border-gray-900 flex flex-col justify-between shrink-0 h-full transition-transform duration-300 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div>
                    <div className="p-6">
                        <img src="/assets/images/logo/LOGO.png" alt="Flowzen Logo" className="h-8 mb-2" />
                    </div>
                    <nav className="mt-4 px-4 space-y-1">
                        <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-900 transition-colors">
                            <MdInbox className="text-lg" /> Dashboard
                        </a>
                        <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium bg-gray-900 text-white border-l-2 border-violet-500">
                            <MdFactCheck className="text-lg" /> Orders
                        </a>
                        {/* More links would go here in a full app */}
                    </nav>
                </div>
                
                <div className="p-6 border-t border-gray-900">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-8 rounded-full bg-violet-600/30 flex justify-center items-center text-violet-400 font-bold border border-violet-500/50">
                            A
                        </div>
                        <div className="min-w-0">
                            <p className="text-sm font-medium text-white truncate">Admin User</p>
                            <p className="text-xs text-gray-500 truncate">{user.email}</p>
                        </div>
                    </div>
                    <button
                        onClick={onSignOut}
                        className="flex items-center gap-2 text-gray-400 hover:text-red-400 text-sm transition-colors w-full"
                    >
                        <MdLogout /> Sign out
                    </button>
                </div>
            </aside>

            {/* ── MAIN CONTENT AREA (Light Theme) ── */}
            <main className="flex-1 flex flex-col h-full overflow-hidden">
                
                {/* Header Area */}
                <div className="px-4 lg:px-8 py-4 lg:py-6 border-b border-gray-200 bg-white shrink-0 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <button 
                            className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg -ml-2"
                            onClick={() => setMobileMenuOpen(true)}
                        >
                            <MdMenu className="text-2xl" />
                        </button>
                        <h1 className="text-xl lg:text-3xl font-bold text-gray-900 tracking-tight">Orders</h1>
                    </div>
                    <div className="flex gap-2 lg:gap-3">
                        <input 
                            type="file" 
                            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" 
                            ref={fileInputRef} 
                            style={{ display: 'none' }} 
                            onChange={handleFileUpload} 
                        />
                        <button 
                            onClick={handleImportClick}
                            className="hidden sm:flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium bg-white hover:bg-gray-50 transition shadow-sm text-gray-700"
                        >
                            <MdDownload className="rotate-180" /> Import
                        </button>
                        <button 
                            onClick={handleExport}
                            className="flex items-center gap-2 px-3 lg:px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium bg-white hover:bg-gray-50 text-violet-700 border-violet-200 transition shadow-sm"
                        >
                            <MdDownload /> <span className="hidden sm:inline">Export CSV</span>
                        </button>
                    </div>
                </div>

                {/* Filters Row */}
                <div className="px-4 lg:px-8 py-4 bg-white border-b border-gray-100 flex flex-col sm:flex-row sm:items-center gap-4 shrink-0">
                    <div className="flex flex-wrap gap-2">
                        <div className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-full bg-gray-50 text-sm flex-1 sm:flex-none">
                            <MdFilterList className="text-gray-500" />
                            <span className="text-gray-600 font-medium hidden sm:inline">Type</span>
                            <select
                                value={filterService}
                                onChange={(e) => setFilterService(e.target.value)}
                                className="bg-transparent border-none text-gray-900 focus:outline-none focus:ring-0 text-sm font-medium cursor-pointer w-full sm:w-auto"
                            >
                                {allServices.map((s) => <option key={s}>{s}</option>)}
                            </select>
                        </div>

                        <div className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-full bg-gray-50 text-sm flex-1 sm:flex-none">
                            <span className="text-gray-600 font-medium hidden sm:inline">Status</span>
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className="bg-transparent border-none text-gray-900 focus:outline-none focus:ring-0 text-sm font-medium cursor-pointer w-full sm:w-auto"
                            >
                                {allStatuses.map((s) => <option key={s}>{s}</option>)}
                            </select>
                        </div>
                    </div>
                    
                    <div className="sm:ml-auto relative w-full sm:w-auto">
                        <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search orders..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-9 pr-4 py-2 border border-gray-200 rounded-full text-sm w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition"
                        />
                    </div>
                </div>

                {/* Data Grid & Analytics Area */}
                <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
                    
                    {/* Data Table */}
                    <div className="flex-1 overflow-y-auto overflow-x-auto bg-white p-4 lg:p-8">
                        {loading ? (
                            <div className="flex justify-center items-center h-40">
                                <div className="w-8 h-8 border-4 border-violet-500 border-t-transparent rounded-full animate-spin"></div>
                            </div>
                        ) : (
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-gray-200 text-sm text-gray-500">
                                        <th className="pb-3 font-medium px-2">Order</th>
                                        <th className="pb-3 font-medium px-2">Customer</th>
                                        <th className="pb-3 font-medium px-2">Type</th>
                                        <th className="pb-3 font-medium px-2">Status</th>
                                        <th className="pb-3 font-medium px-2 text-right">Date</th>
                                        <th className="pb-3 px-2"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <AnimatePresence>
                                        {filtered.map((order) => (
                                            <motion.tr 
                                                layout
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                key={order.id} 
                                                className="border-b border-gray-100 hover:bg-gray-50 transition cursor-pointer group"
                                                onClick={() => setSelectedOrder(order)}
                                            >
                                                <td className="py-4 px-2 text-sm font-medium text-gray-900">
                                                    {order.orderNumber || `#${order.id.substring(0, 6)}`}
                                                </td>
                                                <td className="py-4 px-2">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">
                                                            {order.firstName?.charAt(0)}{order.lastName?.charAt(0)}
                                                        </div>
                                                        <span className="text-sm font-medium text-gray-900">{order.firstName} {order.lastName}</span>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-2">
                                                    <span className="text-sm text-gray-600 truncate max-w-[150px] inline-block">
                                                        {order.services?.[0] || 'General Inquiry'}
                                                        {order.services?.length > 1 && ` +${order.services.length - 1}`}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-2">
                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[order.status || 'Pending']}`}>
                                                        {order.status || 'Pending'}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-2 text-sm text-gray-500 text-right">
                                                    {formatDate(order.createdAt)}
                                                </td>
                                                <td className="py-4 px-2 text-right">
                                                    <button className="text-gray-400 hover:text-gray-900 opacity-0 group-hover:opacity-100 transition p-1">
                                                        <MdMoreVert />
                                                    </button>
                                                </td>
                                            </motion.tr>
                                        ))}
                                    </AnimatePresence>
                                </tbody>
                            </table>
                        )}
                        {filtered.length === 0 && !loading && (
                            <div className="text-center py-12 text-gray-500">
                                No orders found matching your criteria.
                            </div>
                        )}
                    </div>

                    {/* Right Analytics Panel */}
                    <div className="w-full lg:w-80 bg-gray-50 border-t lg:border-t-0 lg:border-l border-gray-200 p-4 lg:p-8 overflow-y-auto shrink-0 flex flex-col gap-8">
                        <div>
                            <h3 className="text-xs font-bold uppercase text-gray-500 tracking-wider mb-4">Orders Status</h3>
                            <div className="h-40 w-full mb-2 -ml-2">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={chartData}
                                            innerRadius={50}
                                            outerRadius={70}
                                            paddingAngle={5}
                                            dataKey="value"
                                            stroke="none"
                                        >
                                            {chartData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="flex justify-between items-center px-2">
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-gray-900">{totalOrders}</p>
                                    <p className="text-xs text-gray-500">Total</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-gray-900">{acceptedStats}</p>
                                    <p className="text-xs text-gray-500">Active</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-gray-900">{pendingStats}</p>
                                    <p className="text-xs text-gray-500">Pending</p>
                                </div>
                            </div>
                        </div>

                        <div className="pt-8 border-t border-gray-200">
                            <h3 className="text-xs font-bold uppercase text-gray-500 tracking-wider mb-4">Overview Context</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                                    <p className="text-xs text-gray-500 mb-1">Conversion Rate</p>
                                    <p className="text-xl font-bold text-gray-900">
                                        {totalOrders ? Math.round((acceptedStats / totalOrders) * 100) : 0}%
                                    </p>
                                </div>
                                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                                    <p className="text-xs text-gray-500 mb-1">Response Time</p>
                                    <p className="text-xl font-bold text-gray-900">&lt; 24h</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* ── ORDER DETAIL MODAL FLYOUT ── */}
            <AnimatePresence>
                {selectedOrder && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedOrder(null)}
                            className="fixed inset-0 bg-gray-900/20 backdrop-blur-sm z-40"
                        />
                        <motion.div
                            initial={{ x: '100%', opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: '100%', opacity: 0 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
                        >
                            {/* Modal Header */}
                            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-900 text-white">
                                <h2 className="text-lg font-medium">Order {selectedOrder.orderNumber || `#${selectedOrder.id}`}</h2>
                                <button 
                                    onClick={() => setSelectedOrder(null)}
                                    className="p-1 hover:bg-gray-800 rounded-full transition"
                                >
                                    <MdClose className="text-xl" />
                                </button>
                            </div>

                            {/* Modal Content */}
                            <div className="p-6 overflow-y-auto flex-1">
                                {/* Customer Summary */}
                                <div className="flex items-start gap-4 mb-8">
                                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-lg font-bold text-gray-600">
                                        {selectedOrder.firstName?.charAt(0)}{selectedOrder.lastName?.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-900 text-lg">{selectedOrder.firstName} {selectedOrder.lastName}</p>
                                        <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
                                            <MdEmail />
                                            <a href={`mailto:${selectedOrder.email}`} className="hover:text-violet-600 hover:underline">{selectedOrder.email}</a>
                                        </div>
                                        {selectedOrder.phone && (
                                            <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
                                                <MdPhone />
                                                <a href={`tel:${selectedOrder.phone}`} className="hover:text-violet-600 hover:underline">{selectedOrder.phone}</a>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Current Status */}
                                <div className="mb-8">
                                    <p className="text-xs uppercase font-bold text-gray-400 tracking-wider mb-2">Current Status</p>
                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${STATUS_COLORS[selectedOrder.status || 'Pending']}`}>
                                        {selectedOrder.status || 'Pending'}
                                    </span>
                                </div>

                                {/* Order Items / Services */}
                                <div className="mb-8 border border-gray-100 rounded-xl overflow-hidden">
                                    <div className="bg-gray-50 px-4 py-2 border-b border-gray-100">
                                        <p className="text-xs font-bold text-gray-600">SERVICES REQUESTED</p>
                                    </div>
                                    <div className="p-4 flex flex-col gap-2">
                                        {selectedOrder.services?.map((service, idx) => (
                                            <div key={idx} className="flex justify-between items-center py-1">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-2 h-2 rounded-full bg-violet-400" />
                                                    <span className="text-sm font-medium text-gray-800">{service}</span>
                                                </div>
                                            </div>
                                        )) || <span className="text-sm text-gray-500">No specific services selected.</span>}
                                    </div>
                                </div>

                                {/* Message */}
                                <div className="mb-8">
                                    <p className="text-xs uppercase font-bold text-gray-400 tracking-wider mb-2">Client Message</p>
                                    <div className="p-4 bg-gray-50 rounded-xl text-sm text-gray-700 whitespace-pre-wrap border border-gray-100 leading-relaxed">
                                        {selectedOrder.message || 'No message provided.'}
                                    </div>
                                </div>
                            </div>

                            {/* Modal Footer / Actions */}
                            <div className="p-6 border-t border-gray-100 bg-gray-50 flex flex-col gap-3">
                                <p className="text-xs font-medium text-gray-500 text-center mb-1">Update Status & Send Auto-Email</p>
                                
                                <div className="grid grid-cols-2 gap-2 relative">
                                    {actionLoading && (
                                        <div className="absolute inset-0 bg-white/50 backdrop-blur-[1px] flex items-center justify-center z-10 rounded-lg">
                                            <div className="w-5 h-5 border-2 border-violet-600 border-t-transparent animate-spin rounded-full" />
                                        </div>
                                    )}
                                    <button 
                                        onClick={() => handleAction(selectedOrder.id, 'Accepted')}
                                        disabled={selectedOrder.status === 'Accepted'}
                                        className="flex flex-col items-center justify-center py-3 bg-blue-50 hover:bg-blue-100 focus:ring-2 focus:ring-blue-500 border border-blue-200 text-blue-700 rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed group"
                                    >
                                        <MdCheckCircle className="text-xl mb-1 group-hover:scale-110 transition-transform" />
                                        <span className="text-xs font-bold">Accept</span>
                                    </button>
                                    <button 
                                        onClick={() => handleAction(selectedOrder.id, 'Waitlisted')}
                                        disabled={selectedOrder.status === 'Waitlisted'}
                                        className="flex flex-col items-center justify-center py-3 bg-yellow-50 hover:bg-yellow-100 focus:ring-2 focus:ring-yellow-500 border border-yellow-200 text-yellow-700 rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed group"
                                    >
                                        <MdAccessTime className="text-xl mb-1 group-hover:scale-110 transition-transform" />
                                        <span className="text-xs font-bold">Waitlist</span>
                                    </button>
                                    <button 
                                        onClick={() => handleAction(selectedOrder.id, 'Finished')}
                                        disabled={selectedOrder.status === 'Finished'}
                                        className="flex flex-col items-center justify-center py-3 bg-green-50 hover:bg-green-100 focus:ring-2 focus:ring-green-500 border border-green-200 text-green-700 rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed group"
                                    >
                                        <MdFactCheck className="text-xl mb-1 group-hover:scale-110 transition-transform" />
                                        <span className="text-xs font-bold">Finish</span>
                                    </button>
                                    <button 
                                        onClick={() => handleAction(selectedOrder.id, 'Rejected')}
                                        disabled={selectedOrder.status === 'Rejected'}
                                        className="flex flex-col items-center justify-center py-3 bg-red-50 hover:bg-red-100 focus:ring-2 focus:ring-red-500 border border-red-200 text-red-700 rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed group"
                                    >
                                        <MdCancel className="text-xl mb-1 group-hover:scale-110 transition-transform" />
                                        <span className="text-xs font-bold">Reject</span>
                                    </button>
                                </div>
                                <button 
                                    onClick={() => deleteContact(selectedOrder.id)}
                                    className="w-full py-2 mt-2 text-sm font-medium text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition"
                                >
                                    Delete Record
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminDashboard;
