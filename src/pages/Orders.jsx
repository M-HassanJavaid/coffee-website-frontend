import React, { useState, useEffect, useContext } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Loader from '../components/Loader';
import { AppContext } from '../App';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, Clock, CheckCircle, XCircle, ChevronDown, ChevronUp, ShoppingBag } from 'lucide-react';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const { setAlertMessage } = useContext(AppContext);

  const filters = ['All', 'Pending', 'Processing', 'Delivered', 'Cancelled'];

  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('https://coffee-website-backend-gamma.vercel.app/order/me', {
        method: 'GET',
        credentials: 'include',
      });
      const data = await res.json();
      if (data.ok) {
        setOrders(data.orders);
        setFilteredOrders(data.orders);
      } else {
        throw new Error(data.message || 'Failed to fetch orders');
      }
    } catch (error) {
      setAlertMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    if (activeFilter === 'All') {
      setFilteredOrders(orders);
    } else {
      setFilteredOrders(orders.filter(order => order.status.toLowerCase() === activeFilter.toLowerCase()));
    }
  }, [activeFilter, orders]);

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'pending': return <Clock className="w-4 h-4 text-amber-500" />;
      case 'processing': return <Package className="w-4 h-4 text-blue-500" />;
      case 'delivered': return <CheckCircle className="w-4 h-4 text-emerald-500" />;
      case 'cancelled': return <XCircle className="w-4 h-4 text-rose-500" />;
      default: return <Clock className="w-4 h-4 text-neutral-500" />;
    }
  };

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'pending': return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
      case 'processing': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'delivered': return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
      case 'cancelled': return 'bg-rose-500/10 text-rose-500 border-rose-500/20';
      default: return 'bg-neutral-500/10 text-neutral-500 border-neutral-500/20';
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-zinc-50 flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 md:pt-32 pb-12 px-4 md:px-8 max-w-[1200px] mx-auto w-full">
        <header className="mb-10 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-fjalla italic text-amber-400 mb-4 tracking-tight">Your Orders</h1>
          <p className="text-zinc-400 max-w-2xl">Track and manage your previous coffee journeys. Everything from your first roast to yesterday's brew.</p>
        </header>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center md:justify-start">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 border ${
                activeFilter === filter
                  ? 'bg-amber-400 text-neutral-900 border-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.3)]'
                  : 'bg-neutral-900 text-zinc-400 border-neutral-800 hover:border-amber-400/50'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Orders List */}
        {isLoading ? (
          <div className="h-64 flex items-center justify-center">
            <Loader />
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="text-center py-20 bg-neutral-900/50 rounded-3xl border border-neutral-800 backdrop-blur-sm">
            <ShoppingBag className="w-16 h-16 text-neutral-700 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-zinc-300">No orders found</h2>
            <p className="text-neutral-500 mt-2">Seems like you haven't ordered any coffee in this category yet.</p>
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
                        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-bold uppercase tracking-wider ${getStatusClass(order.status)}`}>
                          {getStatusIcon(order.status)}
                          {order.status}
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
                                      <p className="text-xs text-neutral-500">Qty: {item.quantity} × Rs. {item.price.base}</p>
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
