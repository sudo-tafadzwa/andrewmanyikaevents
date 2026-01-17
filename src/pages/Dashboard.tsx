import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Ticket, Users, DollarSign, Plus, X, RotateCcw, Trash2,
  Phone, User, FileText, Crown, ChevronRight, Calendar,
  TrendingUp, Home, Clock
} from 'lucide-react';

interface TicketData {
  _id: string;
  ticketType: 'standard' | 'premium';
  buyerName: string;
  buyerPhone: string;
  quantity: number;
  status: 'sold' | 'cancelled';
  soldAt: string;
  notes?: string;
}

interface Stats {
  standard: {
    sold: number;
    total: number;
    remaining: number;
    price: number;
  };
  premium: {
    sold: number;
    total: number;
    remaining: number;
    price: number;
  };
  totalRevenue: number;
}

// Use VITE_API_URL for Render backend
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export function Dashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [tickets, setTickets] = useState<TicketData[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'tickets'>('overview');

  const [formData, setFormData] = useState({
    ticketType: 'standard' as 'standard' | 'premium',
    buyerName: '',
    buyerPhone: '',
    quantity: 1,
    notes: ''
  });

  const fetchData = useCallback(async () => {
    try {
      const [statsRes, ticketsRes] = await Promise.all([
        fetch(`${API_URL}/stats`),
        fetch(`${API_URL}/tickets`)
      ]);

      if (!statsRes.ok || !ticketsRes.ok) {
        throw new Error('Failed to fetch data');
      }

      const statsData = await statsRes.json();
      const ticketsData = await ticketsRes.json();

      setStats(statsData);
      setTickets(ticketsData);
      setError(null);
    } catch (err) {
      setError('Unable to connect. Please check your connection.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleAddTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/tickets`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!res.ok) throw new Error('Failed to add ticket');

      setIsAddModalOpen(false);
      setFormData({
        ticketType: 'standard',
        buyerName: '',
        buyerPhone: '',
        quantity: 1,
        notes: ''
      });
      fetchData();
    } catch (err) {
      console.error(err);
      alert('Failed to add ticket');
    }
  };

  const handleCancelTicket = async (id: string) => {
    if (!confirm('Cancel this ticket?')) return;
    try {
      const res = await fetch(`${API_URL}/tickets/${id}/cancel`, {
        method: 'PATCH'
      });
      if (!res.ok) throw new Error('Failed to cancel ticket');
      fetchData();
    } catch (err) {
      console.error(err);
      alert('Failed to cancel ticket');
    }
  };

  const handleRestoreTicket = async (id: string) => {
    try {
      const res = await fetch(`${API_URL}/tickets/${id}/restore`, {
        method: 'PATCH'
      });
      if (!res.ok) throw new Error('Failed to restore ticket');
      fetchData();
    } catch (err) {
      console.error(err);
      alert('Failed to restore ticket');
    }
  };

  const handleDeleteTicket = async (id: string) => {
    if (!confirm('Permanently delete this ticket?')) return;
    try {
      const res = await fetch(`${API_URL}/tickets/${id}`, {
        method: 'DELETE'
      });
      if (!res.ok) throw new Error('Failed to delete ticket');
      fetchData();
    } catch (err) {
      console.error(err);
      alert('Failed to delete ticket');
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0000] via-[#1a0505] to-[#0a0000] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 mx-auto mb-4 border-4 border-[#8B0000]/30 border-t-[#B76E79] rounded-full animate-spin" />
          <p className="text-[#B76E79] font-medium">Loading dashboard...</p>
        </motion.div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0000] via-[#1a0505] to-[#0a0000] flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-sm"
        >
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-900/20 flex items-center justify-center">
            <X className="w-10 h-10 text-red-400" />
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">Connection Error</h2>
          <p className="text-gray-400 mb-6">{error}</p>
          <button
            onClick={fetchData}
            className="px-6 py-3 bg-gradient-to-r from-[#8B0000] to-[#A00000] text-white rounded-full font-medium"
          >
            Try Again
          </button>
        </motion.div>
      </div>
    );
  }

  const totalTicketsSold = (stats?.standard.sold || 0) + (stats?.premium.sold || 0);
  const totalTickets = (stats?.standard.total || 0) + (stats?.premium.total || 0);
  const progressPercent = totalTickets > 0 ? (totalTicketsSold / totalTickets) * 100 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0000] via-[#1a0505] to-[#0a0000]">
      {/* Mobile Header */}
      <header className="sticky top-0 z-40 bg-[#0a0000]/95 backdrop-blur-lg border-b border-[#8B0000]/20">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#B76E79] text-xs font-medium tracking-wider uppercase">Dashboard</p>
              <h1 className="text-xl font-serif text-white">Hey, Tino!</h1>
            </div>
            <a
              href="/"
              className="w-10 h-10 rounded-full bg-[#8B0000]/20 border border-[#8B0000]/30 flex items-center justify-center"
            >
              <Home className="w-5 h-5 text-[#B76E79]" />
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 pb-24">
        {/* Welcome Card with Logo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-6 rounded-3xl bg-gradient-to-br from-[#8B0000]/30 to-[#1a0000] border border-[#8B0000]/30 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#B76E79]/10 rounded-full blur-3xl" />
          <div className="relative z-10">
            {/* Logo */}
            <img
              src="/images/logo.png"
              alt="Andrews Manyika Events"
              className="h-12 mb-4"
              onError={(e) => {
                // hide gracefully if image fails to load
                e.currentTarget.style.display = 'none';
              }}
            />
            <p className="text-gray-300 text-sm mb-4">
              Valentine's Day 2026 is coming up! Here's your ticket sales overview.
            </p>
            <div className="flex items-center gap-2 text-[#B76E79] text-sm">
              <Calendar className="w-4 h-4" />
              <span>February 14th, 2026</span>
            </div>
          </div>
        </motion.div>

        {/* Quick Stats Row */}
        <div className="grid grid-cols-2 gap-3 mt-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="p-4 rounded-2xl bg-gradient-to-br from-[#1a0505] to-[#0a0000] border border-[#8B0000]/20"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-[#8B0000]/30 flex items-center justify-center">
                <Ticket className="w-4 h-4 text-[#B76E79]" />
              </div>
              <span className="text-gray-400 text-xs">Sold</span>
            </div>
            <p className="text-2xl font-bold text-white">{totalTicketsSold}</p>
            <p className="text-xs text-gray-500">{totalTickets - totalTicketsSold} remaining</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="p-4 rounded-2xl bg-gradient-to-br from-[#1a0505] to-[#0a0000] border border-green-900/30"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-green-900/30 flex items-center justify-center">
                <DollarSign className="w-4 h-4 text-green-400" />
              </div>
              <span className="text-gray-400 text-xs">Revenue</span>
            </div>
            <p className="text-2xl font-bold text-white">${stats?.totalRevenue.toLocaleString() || 0}</p>
            <div className="flex items-center gap-1 text-xs text-green-400">
              <TrendingUp className="w-3 h-3" />
              <span>Great progress!</span>
            </div>
          </motion.div>
        </div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-4 p-4 rounded-2xl bg-gradient-to-br from-[#1a0505] to-[#0a0000] border border-[#8B0000]/20"
        >
          <div className="flex justify-between items-center mb-3">
            <span className="text-white font-medium">Sales Progress</span>
            <span className="text-[#B76E79] font-bold">{progressPercent.toFixed(0)}%</span>
          </div>
          <div className="h-3 bg-[#8B0000]/20 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-full bg-gradient-to-r from-[#8B0000] via-[#B76E79] to-[#8B0000] rounded-full"
            />
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-500">
            <span>{totalTicketsSold} sold</span>
            <span>{totalTickets} total</span>
          </div>
        </motion.div>

        {/* Ticket Type Cards */}
        <div className="grid grid-cols-2 gap-3 mt-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="p-4 rounded-2xl bg-gradient-to-br from-[#1a0505] to-[#0a0000] border border-[#8B0000]/30"
          >
            <div className="flex items-center gap-2 mb-3">
              <Users className="w-5 h-5 text-[#B76E79]" />
              <span className="text-white font-medium text-sm">Standard</span>
            </div>
            <p className="text-3xl font-bold text-white mb-1">{stats?.standard.sold || 0}</p>
            <p className="text-xs text-gray-400">{stats?.standard.remaining || 0} left of {stats?.standard.total || 50}</p>
            <div className="mt-2 px-2 py-1 bg-[#8B0000]/20 rounded-full inline-block">
              <span className="text-[#B76E79] text-xs font-medium">$100</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="p-4 rounded-2xl bg-gradient-to-br from-[#B76E79]/10 to-[#1a0505] border border-[#B76E79]/30"
          >
            <div className="flex items-center gap-2 mb-3">
              <Crown className="w-5 h-5 text-[#B76E79]" />
              <span className="text-white font-medium text-sm">Premium VIP</span>
            </div>
            <p className="text-3xl font-bold text-white mb-1">{stats?.premium.sold || 0}</p>
            <p className="text-xs text-gray-400">{stats?.premium.remaining || 0} left of {stats?.premium.total || 50}</p>
            <div className="mt-2 px-2 py-1 bg-[#B76E79]/20 rounded-full inline-block">
              <span className="text-[#B76E79] text-xs font-medium">$150</span>
            </div>
          </motion.div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mt-6 p-1 bg-[#1a0505] rounded-full border border-[#8B0000]/20">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-all ${
              activeTab === 'overview'
                ? 'bg-gradient-to-r from-[#8B0000] to-[#A00000] text-white'
                : 'text-gray-400'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('tickets')}
            className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-all ${
              activeTab === 'tickets'
                ? 'bg-gradient-to-r from-[#8B0000] to-[#A00000] text-white'
                : 'text-gray-400'
            }`}
          >
            All Tickets ({tickets.length})
          </button>
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'overview' ? (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-4"
            >
              {/* Recent Sales */}
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-white font-medium">Recent Sales</h2>
                <button
                  onClick={() => setActiveTab('tickets')}
                  className="text-[#B76E79] text-sm flex items-center gap-1"
                >
                  View all <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3">
                {tickets.length === 0 ? (
                  <div className="p-8 rounded-2xl bg-[#1a0505] border border-[#8B0000]/20 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#8B0000]/20 flex items-center justify-center">
                      <Ticket className="w-8 h-8 text-[#B76E79]" />
                    </div>
                    <p className="text-gray-400">No tickets sold yet</p>
                    <p className="text-gray-500 text-sm mt-1">Start by adding your first sale</p>
                  </div>
                ) : (
                  tickets.slice(0, 5).map((ticket, index) => (
                    <motion.div
                      key={ticket._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`p-4 rounded-2xl bg-[#1a0505] border border-[#8B0000]/20 ${
                        ticket.status === 'cancelled' ? 'opacity-50' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            ticket.ticketType === 'premium'
                              ? 'bg-[#B76E79]/20'
                              : 'bg-[#8B0000]/20'
                          }`}>
                            {ticket.ticketType === 'premium' ? (
                              <Crown className="w-5 h-5 text-[#B76E79]" />
                            ) : (
                              <User className="w-5 h-5 text-[#B76E79]" />
                            )}
                          </div>
                          <div>
                            <p className="text-white font-medium">{ticket.buyerName}</p>
                            <p className="text-gray-500 text-xs">{ticket.buyerPhone}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`text-sm font-medium ${
                            ticket.ticketType === 'premium' ? 'text-[#B76E79]' : 'text-gray-300'
                          }`}>
                            {ticket.ticketType === 'premium' ? 'VIP' : 'Standard'} x{ticket.quantity}
                          </p>
                          <p className="text-gray-500 text-xs flex items-center justify-end gap-1">
                            <Clock className="w-3 h-3" />
                            {new Date(ticket.soldAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="tickets"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-4 space-y-3"
            >
              {tickets.map((ticket, index) => (
                <motion.div
                  key={ticket._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                  className={`p-4 rounded-2xl bg-[#1a0505] border border-[#8B0000]/20 ${
                    ticket.status === 'cancelled' ? 'opacity-50' : ''
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        ticket.ticketType === 'premium'
                          ? 'bg-gradient-to-br from-[#B76E79]/30 to-[#8B0000]/20'
                          : 'bg-[#8B0000]/20'
                      }`}>
                        {ticket.ticketType === 'premium' ? (
                          <Crown className="w-6 h-6 text-[#B76E79]" />
                        ) : (
                          <User className="w-6 h-6 text-[#B76E79]" />
                        )}
                      </div>
                      <div>
                        <p className="text-white font-medium">{ticket.buyerName}</p>
                        <p className="text-gray-500 text-sm flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          {ticket.buyerPhone}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`px-2 py-0.5 rounded-full text-xs ${
                            ticket.ticketType === 'premium'
                              ? 'bg-[#B76E79]/20 text-[#B76E79]'
                              : 'bg-[#8B0000]/20 text-gray-300'
                          }`}>
                            {ticket.ticketType === 'premium' ? 'Premium VIP' : 'Standard'} x{ticket.quantity}
                          </span>
                          <span className={`px-2 py-0.5 rounded-full text-xs ${
                            ticket.status === 'sold'
                              ? 'bg-green-900/30 text-green-400'
                              : 'bg-red-900/30 text-red-400'
                          }`}>
                            {ticket.status}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      {ticket.status === 'sold' ? (
                        <button
                          onClick={() => handleCancelTicket(ticket._id)}
                          className="w-9 h-9 rounded-lg bg-red-900/20 flex items-center justify-center text-red-400 hover:bg-red-900/40 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleRestoreTicket(ticket._id)}
                          className="w-9 h-9 rounded-lg bg-green-900/20 flex items-center justify-center text-green-400 hover:bg-green-900/40 transition-colors"
                        >
                          <RotateCcw className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteTicket(ticket._id)}
                        className="w-9 h-9 rounded-lg bg-[#8B0000]/20 flex items-center justify-center text-gray-400 hover:text-red-400 hover:bg-red-900/20 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Floating Action Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsAddModalOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-r from-[#8B0000] to-[#A00000] shadow-[0_0_30px_rgba(139,0,0,0.5)] flex items-center justify-center z-50"
      >
        <Plus className="w-6 h-6 text-white" />
      </motion.button>

      {/* Refresh Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        onClick={fetchData}
        className="fixed bottom-6 left-6 w-12 h-12 rounded-full bg-[#1a0505] border border-[#8B0000]/30 flex items-center justify-center z-50"
      >
        <RotateCcw className="w-5 h-5 text-[#B76E79]" />
      </motion.button>

      {/* Add Ticket Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80"
            onClick={() => setIsAddModalOpen(false)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="w-full max-w-md bg-gradient-to-br from-[#1a0505] to-[#0a0000] rounded-t-3xl sm:rounded-3xl p-6 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-serif text-white">New Sale</h2>
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="w-10 h-10 rounded-full bg-[#8B0000]/20 flex items-center justify-center text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddTicket} className="space-y-5">
                {/* Ticket Type */}
                <div>
                  <label className="block text-gray-400 text-sm mb-3">Select Ticket Type</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, ticketType: 'standard' })}
                      className={`p-4 rounded-2xl border-2 text-left transition-all ${
                        formData.ticketType === 'standard'
                          ? 'border-[#8B0000] bg-[#8B0000]/20'
                          : 'border-[#8B0000]/20 hover:border-[#8B0000]/50'
                      }`}
                    >
                      <Users className="w-6 h-6 text-[#B76E79] mb-2" />
                      <p className="text-white font-medium">Standard</p>
                      <p className="text-[#B76E79] text-xl font-bold">$100</p>
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, ticketType: 'premium' })}
                      className={`p-4 rounded-2xl border-2 text-left transition-all ${
                        formData.ticketType === 'premium'
                          ? 'border-[#B76E79] bg-[#B76E79]/20'
                          : 'border-[#8B0000]/20 hover:border-[#B76E79]/50'
                      }`}
                    >
                      <Crown className="w-6 h-6 text-[#B76E79] mb-2" />
                      <p className="text-white font-medium">Premium VIP</p>
                      <p className="text-[#B76E79] text-xl font-bold">$150</p>
                    </button>
                  </div>
                </div>

                {/* Buyer Name */}
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Buyer Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type="text"
                      required
                      value={formData.buyerName}
                      onChange={(e) => setFormData({ ...formData, buyerName: e.target.value })}
                      className="w-full pl-12 pr-4 py-4 bg-[#8B0000]/10 border border-[#8B0000]/30 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-[#B76E79]"
                      placeholder="Enter name"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type="tel"
                      required
                      value={formData.buyerPhone}
                      onChange={(e) => setFormData({ ...formData, buyerPhone: e.target.value })}
                      className="w-full pl-12 pr-4 py-4 bg-[#8B0000]/10 border border-[#8B0000]/30 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-[#B76E79]"
                      placeholder="+263..."
                    />
                  </div>
                </div>

                {/* Quantity */}
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Quantity</label>
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, quantity: Math.max(1, formData.quantity - 1) })}
                      className="w-12 h-12 rounded-xl bg-[#8B0000]/20 border border-[#8B0000]/30 text-white text-xl font-bold"
                    >
                      -
                    </button>
                    <span className="text-white text-2xl font-bold flex-1 text-center">{formData.quantity}</span>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, quantity: formData.quantity + 1 })}
                      className="w-12 h-12 rounded-xl bg-[#8B0000]/20 border border-[#8B0000]/30 text-white text-xl font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Notes (Optional)</label>
                  <div className="relative">
                    <FileText className="absolute left-4 top-4 w-5 h-5 text-gray-500" />
                    <textarea
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full pl-12 pr-4 py-4 bg-[#8B0000]/10 border border-[#8B0000]/30 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-[#B76E79] resize-none"
                      rows={2}
                      placeholder="Any notes..."
                    />
                  </div>
                </div>

                {/* Total */}
                <div className="p-4 rounded-2xl bg-[#8B0000]/10 border border-[#8B0000]/30">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Total</span>
                    <span className="text-2xl font-bold text-white">
                      ${(formData.ticketType === 'premium' ? 150 : 100) * formData.quantity}
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-[#8B0000] to-[#A00000] text-white rounded-2xl font-medium text-lg shadow-[0_0_30px_rgba(139,0,0,0.3)]"
                >
                  Confirm Sale
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
