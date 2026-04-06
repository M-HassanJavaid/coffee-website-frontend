import React, { useState, useEffect, useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Loader from '../components/Loader';
import { AppContext } from '../App';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, Clock, CheckCircle, XCircle, ChevronDown, ChevronUp, ShoppingBag, Search, Filter, Calendar, ArrowUpDown } from 'lucide-react';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');
  const [timeFilter, setTimeFilter] = useState('All Time');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const navigate = useNavigate();
  const { setAlertMessage } = useContext(AppContext);

  const statusFilters = ['All', 'Pending', 'Processing', 'Delivered', 'Cancelled'];
  const timeFilters = ['All Time', 'Last 7 Days', 'Last 30 Days', 'This Year'];

  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/order/me`, {
        method: 'GET',
        credentials: 'include',
      });
      const data = await res.json();
      if (data.ok) {
        setOrders(data.orders);
      } else {
        throw new Error(data.message || 'Failed to fetch orders');
      }
    } catch (error) {
      setAlertMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelOrder = async (orderId) => {
    if (!window.confirm('Are you sure you want to cancel this order?')) return;
    
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/order/cancel/${orderId}`, {
        method: 'PUT',
        credentials: 'include',
      });
      const data = await res.json();
      if (data.ok) {
        setAlertMessage('Order cancelled successfully.');
        fetchOrders(); // Refresh
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      setAlertMessage(error.message);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const formatStatus = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending': return 'Pending';
      case 'confirmed': return 'Processing';
      case 'delivered': return 'Delivered';
      case 'cancelled': return 'Cancelled';
      default: return status;
    }
  };

  const filteredOrders = useMemo(() => {
    let result = [...orders];

    // Status Filter
    if (activeFilter !== 'All') {
      result = result.filter(order => {
        const displayStatus = formatStatus(order.orderStatus);
        return displayStatus.toLowerCase() === activeFilter.toLowerCase();
      });
    }

    // Time Filter
    const now = new Date();
    if (timeFilter === 'Last 7 Days') {
      const sevenDaysAgo = new Date(now.setDate(now.getDate() - 7));
      result = result.filter(order => new Date(order.createdAt) >= sevenDaysAgo);
    } else if (timeFilter === 'Last 30 Days') {
      const thirtyDaysAgo = new Date(now.setDate(now.getDate() - 30));
      result = result.filter(order => new Date(order.createdAt) >= thirtyDaysAgo);
    } else if (timeFilter === 'This Year') {
      const startOfYear = new Date(new Date().getFullYear(), 0, 1);
      result = result.filter(order => new Date(order.createdAt) >= startOfYear);
    }

    // Search Filter (ID or Product Name)
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(order => 
        order._id.toLowerCase().includes(query) || 
        order.items.some(item => item.product.name.toLowerCase().includes(query))
      );
    }

    // Sorting
    if (sortBy === 'newest') {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortBy === 'oldest') {
      result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.totalAmount - a.totalAmount);
    } else if (sortBy === 'price-low') {
      result.sort((a, b) => a.totalAmount - b.totalAmount);
    }

    return result;
  }, [orders, activeFilter, timeFilter, searchQuery, sortBy]);

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending': return <Clock className="w-4 h-4 text-amber-500" />;
      case 'confirmed': return <Package className="w-4 h-4 text-blue-500" />;
      case 'processing': return <Package className="w-4 h-4 text-blue-500" />;
      case 'delivered': return <CheckCircle className="w-4 h-4 text-emerald-500" />;
      case 'cancelled': return <XCircle className="w-4 h-4 text-rose-500" />;
      default: return <Clock className="w-4 h-4 text-neutral-500" />;
    }
  };

  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending': return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
      case 'confirmed': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'processing': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'delivered': return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
      case 'cancelled': return 'bg-rose-500/10 text-rose-500 border-rose-500/20';
      default: return 'bg-neutral-500/10 text-neutral-500 border-neutral-500/20';
    }
  };

  const OrderProgressBar = ({ status }) => {
    const steps = ['pending', 'confirmed', 'delivered'];
    const stepLabels = ['Pending', 'Processing', 'Delivered'];
    const currentStep = steps.indexOf(status?.toLowerCase());
    if (status?.toLowerCase() === 'cancelled') return null;

    return (
      <div className="w-full mt-6 mb-2">
        <div className="relative flex justify-between">
          {/* Progress Line */}
          <div className="absolute top-1/2 left-0 w-full h-[2px] bg-neutral-800 -translate-y-1/2 z-0" />
          <div 
            className="absolute top-1/2 left-0 h-[2px] bg-amber-400 -translate-y-1/2 z-0 transition-all duration-1000 ease-out" 
            style={{ width: `${(Math.max(0, currentStep) / (steps.length - 1)) * 100}%` }}
          />

          {steps.map((step, idx) => (
            <div key={step} className="relative z-10 flex flex-col items-center">
              <div className={`w-3 h-3 rounded-full border-2 transition-all duration-500 ${
                idx <= currentStep ? 'bg-amber-400 border-amber-400 scale-110 shadow-[0_0_10px_rgba(251,191,36,0.5)]' : 'bg-neutral-900 border-neutral-700'
              }`} />
              <span className={`text-[8px] font-black uppercase mt-2 tracking-widest ${
                idx <= currentStep ? 'text-amber-400' : 'text-neutral-600'
              }`}>{stepLabels[idx]}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-zinc-50 flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 md:pt-32 pb-12 px-4 md:px-8 max-w-[1200px] mx-auto w-full">
        <header className="mb-10 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-fjalla italic text-amber-400 mb-4 tracking-tight">Your Orders</h1>
          <p className="text-zinc-400 max-w-2xl">Track and manage your previous coffee journeys. Everything from your first roast to yesterday's brew.</p>
        </header>

        {/* Advanced Filters Section */}
        <div className="bg-neutral-900/40 backdrop-blur-md border border-neutral-800 rounded-[2rem] p-6 mb-10 space-y-6">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative w-full md:w-96 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-amber-400 transition-colors" />
              <input 
                type="text"
                placeholder="Search by Order ID or Product..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-neutral-800/50 border border-neutral-700/50 rounded-2xl py-3 pl-12 pr-4 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-amber-400/30 focus:ring-4 focus:ring-amber-400/5 transition-all outline-none"
              />
            </div>

            {/* Sorting */}
            <div className="flex items-center gap-3 w-full md:w-auto">
              <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                <ArrowUpDown className="w-3 h-3" /> Sort:
              </span>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-neutral-800/50 border border-neutral-700/50 rounded-xl px-4 py-2 text-xs font-bold text-zinc-300 outline-none hover:border-amber-400/30 transition-colors cursor-pointer"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="price-high">Price: High to Low</option>
                <option value="price-low">Price: Low to High</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-6 pt-6 border-t border-neutral-800/50">
            {/* Status Tabs */}
            <div className="flex-grow space-y-3">
              <label className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em] ml-1 flex items-center gap-2">
                <Filter className="w-3 h-3" /> Status
              </label>
              <div className="flex flex-wrap gap-2">
                {statusFilters.map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 border ${
                      activeFilter === filter
                        ? 'bg-amber-400 text-neutral-900 border-amber-400 shadow-lg shadow-amber-400/10'
                        : 'bg-neutral-800/30 text-zinc-500 border-neutral-700/50 hover:border-amber-400/30 hover:text-zinc-300'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            {/* Time Filter */}
            <div className="md:w-64 space-y-3">
              <label className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em] ml-1 flex items-center gap-2">
                <Calendar className="w-3 h-3" /> Timeframe
              </label>
              <div className="grid grid-cols-2 gap-2">
                {timeFilters.map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setTimeFilter(filter)}
                    className={`px-3 py-2 rounded-xl text-[10px] font-bold transition-all duration-300 border truncate ${
                      timeFilter === filter
                        ? 'bg-zinc-100 text-neutral-900 border-zinc-100'
                        : 'bg-neutral-800/30 text-zinc-500 border-neutral-700/50 hover:border-zinc-500'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Orders List */}
        {isLoading ? (
          <div className="h-64 flex items-center justify-center">
            <Loader />
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="text-center py-20 bg-neutral-900/50 rounded-[3rem] border border-neutral-800 backdrop-blur-sm shadow-2xl">
            <div className="w-24 h-24 bg-neutral-800/50 rounded-full flex items-center justify-center mx-auto mb-6 border border-neutral-700">
               <ShoppingBag className="w-10 h-10 text-neutral-600" />
            </div>
            <h2 className="text-3xl font-fjalla italic text-zinc-100">Your coffee story is just beginning</h2>
            <p className="text-neutral-500 mt-4 max-w-sm mx-auto">Explore our menu and find the perfect roast for your next moment.</p>
            <button 
              onClick={() => navigate('/menu')}
              className="mt-8 px-8 py-3.5 bg-amber-400 text-neutral-900 rounded-2xl font-bold hover:scale-105 active:scale-95 transition-all text-sm shadow-lg shadow-amber-400/10"
            >
              Browse Menu
            </button>
          </div>
        ) : (
          <div className="grid gap-4">
            <AnimatePresence mode="popLayout">
              {filteredOrders.map((order) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  key={order._id}
                  className="bg-neutral-900/40 backdrop-blur-sm border border-neutral-800 rounded-3xl overflow-hidden hover:border-neutral-700 transition-colors"
                >
                  <div 
                    className="p-5 md:p-6 cursor-pointer"
                    onClick={() => setExpandedOrderId(expandedOrderId === order._id ? null : order._id)}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-neutral-800 rounded-2xl flex items-center justify-center border border-neutral-700">
                          <Package className="w-6 h-6 text-amber-400" />
                        </div>
                        <div>
                          <p className="text-xs text-neutral-500 font-bold uppercase tracking-widest mb-1">Order #{order._id.slice(-6)}</p>
                          <p className="text-sm font-medium">{new Date(order.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-6">
                        <div className="text-right hidden sm:block">
                          <p className="text-xs text-neutral-500 font-bold uppercase tracking-widest mb-1">Total</p>
                          <p className="text-lg font-bold text-amber-400">Rs. {order.totalAmount}</p>
                        </div>
                        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-bold uppercase tracking-wider ${getStatusClass(order.orderStatus)}`}>
                          {getStatusIcon(order.orderStatus)}
                          {formatStatus(order.orderStatus)}
                        </div>
                        {expandedOrderId === order._id ? <ChevronUp className="w-5 h-5 text-neutral-500" /> : <ChevronDown className="w-5 h-5 text-neutral-500" />}
                      </div>
                    </div>
                  </div>

                  <AnimatePresence>
                    {expandedOrderId === order._id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden border-t border-neutral-800 bg-neutral-950/30"
                      >
                        <div className="p-6">
                          <div className="grid md:grid-cols-2 gap-8">
                            {/* Items List */}
                            <div>
                              <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-4">Ordered Items</h3>
                              <div className="space-y-4">
                                {order.items.map((item, idx) => (
                                  <div key={idx} className="flex gap-4 items-center">
                                    <img src={item.product.image.url} alt={item.product.name} className="w-16 h-16 rounded-xl object-contain bg-white p-2 border border-neutral-800" />
                                    <div className="flex-grow">
                                      <p className="font-bold text-zinc-200">{item.product.name}</p>
                                      <p className="text-xs text-neutral-500">Qty: {item.quantity} × Rs. {item.price.basePrice}</p>
                                      {item.selectedOptions.length > 0 && (
                                        <p className="text-[10px] text-amber-400/80 mt-1 uppercase tracking-tighter">
                                          {item.selectedOptions.map(opt => `${opt.name}: ${opt.value}`).join(' | ')}
                                        </p>
                                      )}
                                    </div>
                                    <p className="font-bold text-sm">Rs. {item.price.total}</p>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Delivery Info */}
                            <div className="md:border-l md:border-neutral-800 md:pl-8">
                                <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-4">Delivery Details</h3>
                                <div className="space-y-3 text-sm text-zinc-400">
                                  <p><span className="text-neutral-500 mr-2">Address:</span> {order.address.street}, {order.address.city}, {order.address.state}</p>
                                  <p><span className="text-neutral-500 mr-2">Phone:</span> {order.address.phone}</p>
                                  {order.note && <p><span className="text-neutral-500 mr-2">Note:</span> {order.note}</p>}
                                  <p className="pt-3 block sm:hidden font-bold text-amber-400 text-lg">Total: Rs. {order.totalAmount}</p>
                                </div>
                                
                                <div className="mt-8 space-y-4">
                                   <OrderProgressBar status={order.orderStatus} />
                                   
                                   {order.orderStatus.toLowerCase() === 'pending' && (
                                     <button
                                       onClick={() => handleCancelOrder(order.orderId)}
                                       className="w-full py-3 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs font-bold uppercase tracking-widest hover:bg-rose-500 hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
                                     >
                                       <XCircle className="w-4 h-4" /> Cancel Order
                                     </button>
                                   )}
                                   
                                   {order.orderStatus.toLowerCase() === 'delivered' && (
                                      <button
                                        onClick={() => navigate('/menu')}
                                        className="w-full py-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-bold uppercase tracking-widest hover:bg-emerald-500 hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
                                      >
                                        <ShoppingBag className="w-4 h-4" /> Order Again
                                      </button>
                                   )}
                                </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Orders;
