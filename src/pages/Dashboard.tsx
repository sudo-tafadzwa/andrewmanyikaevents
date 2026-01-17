import { useState, useEffect, useCallback } from 'react';
import { Ticket, Users, DollarSign, TrendingUp, Plus, X, RotateCcw, Trash2, Phone, User, FileText, Sparkles } from 'lucide-react';

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

// Use VITE_API_URL if set, otherwise use /api (works on Vercel), fallback to localhost for dev
const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '/api' : 'http://localhost:3001/api');

export function Dashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [tickets, setTickets] = useState<TicketData[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Form state
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
      setError('Failed to connect to server. Make sure the API is running.');
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
    if (!confirm('Are you sure you want to cancel this ticket?')) return;
    try {
      const res = await fetch(`${API_URL}/tickets/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'cancel' })
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
      const res = await fetch(`${API_URL}/tickets/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'restore' })
      });
      if (!res.ok) throw new Error('Failed to restore ticket');
      fetchData();
    } catch (err) {
      console.error(err);
      alert('Failed to restore ticket');
    }
  };

  const handleDeleteTicket = async (id: string) => {
    if (!confirm('Are you sure you want to permanently delete this ticket? This cannot be undone.')) return;
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

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0000] flex items-center justify-center">
        <div className="text-[#B76E79] text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0a0000] flex items-center justify-center p-4">
        <div className="text-center">
          <div className="text-red-400 text-xl mb-4">{error}</div>
          <p className="text-gray-400 mb-4">Run the server with: <code className="bg-gray-800 px-2 py-1 rounded">node server/index.js</code></p>
          <button
            onClick={fetchData}
            className="px-4 py-2 bg-[#8B0000] text-white rounded-lg hover:bg-[#A00000] transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const totalTicketsSold = (stats?.standard.sold || 0) + (stats?.premium.sold || 0);
  const totalTickets = (stats?.standard.total || 0) + (stats?.premium.total || 0);

  return (
    <div className="min-h-screen bg-[#0a0000]">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#1a0000] to-[#2a0505] border-b border-[#8B0000]/30 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-5 h-5 text-[#B76E79]" />
              <span className="text-[#B76E79] text-sm font-medium">SPICES & SPOUSES 2026</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-serif text-white">
              Hi Tino! <span className="text-[#B76E79]">Welcome back</span>
            </h1>
          </div>
          <a
            href="/"
            className="text-gray-400 hover:text-white transition-colors text-sm"
          >
            View Landing Page
          </a>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Total Tickets Sold */}
          <div className="bg-gradient-to-br from-[#1a0000] to-[#0a0000] rounded-2xl border border-[#8B0000]/30 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#8B0000] to-[#B76E79] flex items-center justify-center">
                <Ticket className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Total Sold</p>
                <p className="text-3xl font-bold text-white">{totalTicketsSold}</p>
              </div>
            </div>
            <div className="h-2 bg-[#8B0000]/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#8B0000] to-[#B76E79] transition-all duration-500"
                style={{ width: `${(totalTicketsSold / totalTickets) * 100}%` }}
              />
            </div>
            <p className="text-gray-500 text-xs mt-2">{totalTickets - totalTicketsSold} remaining of {totalTickets}</p>
          </div>

          {/* Standard Tickets */}
          <div className="bg-gradient-to-br from-[#1a0000] to-[#0a0000] rounded-2xl border border-[#8B0000]/30 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-[#8B0000]/20 border border-[#8B0000]/40 flex items-center justify-center">
                <Users className="w-6 h-6 text-[#B76E79]" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Standard ($100)</p>
                <p className="text-3xl font-bold text-white">{stats?.standard.sold || 0}</p>
              </div>
            </div>
            <p className="text-green-400 text-sm">{stats?.standard.remaining || 0} tickets remaining</p>
          </div>

          {/* Premium Tickets */}
          <div className="bg-gradient-to-br from-[#1a0000] to-[#0a0000] rounded-2xl border border-[#B76E79]/30 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#B76E79]/20 to-[#8B0000]/10 border border-[#B76E79]/40 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-[#B76E79]" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Premium VIP ($150)</p>
                <p className="text-3xl font-bold text-white">{stats?.premium.sold || 0}</p>
              </div>
            </div>
            <p className="text-[#B76E79] text-sm">{stats?.premium.remaining || 0} tickets remaining</p>
          </div>

          {/* Total Revenue */}
          <div className="bg-gradient-to-br from-[#1a0000] to-[#0a0000] rounded-2xl border border-[#8B0000]/30 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-green-900/30 border border-green-800/40 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Total Revenue</p>
                <p className="text-3xl font-bold text-white">${stats?.totalRevenue.toLocaleString() || 0}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-green-400 text-sm">
              <TrendingUp className="w-4 h-4" />
              <span>Keep it up!</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-4 mb-8">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#8B0000] to-[#A00000] text-white rounded-xl font-medium shadow-[0_0_30px_rgba(139,0,0,0.3)] hover:shadow-[0_0_40px_rgba(139,0,0,0.5)] transition-all duration-300"
          >
            <Plus className="w-5 h-5" />
            Mark Ticket as Sold
          </button>
          <button
            onClick={fetchData}
            className="flex items-center gap-2 px-6 py-3 bg-[#8B0000]/20 border border-[#8B0000]/40 text-white rounded-xl hover:bg-[#8B0000]/30 transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
            Refresh
          </button>
        </div>

        {/* Recent Sales Table */}
        <div className="bg-gradient-to-br from-[#1a0000] to-[#0a0000] rounded-2xl border border-[#8B0000]/30 overflow-hidden">
          <div className="px-6 py-4 border-b border-[#8B0000]/30">
            <h2 className="text-xl font-serif text-white">Recent Ticket Sales</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#8B0000]/10">
                <tr>
                  <th className="text-left px-6 py-3 text-gray-400 text-sm font-medium">Buyer</th>
                  <th className="text-left px-6 py-3 text-gray-400 text-sm font-medium">Phone</th>
                  <th className="text-left px-6 py-3 text-gray-400 text-sm font-medium">Type</th>
                  <th className="text-left px-6 py-3 text-gray-400 text-sm font-medium">Qty</th>
                  <th className="text-left px-6 py-3 text-gray-400 text-sm font-medium">Status</th>
                  <th className="text-left px-6 py-3 text-gray-400 text-sm font-medium">Date</th>
                  <th className="text-right px-6 py-3 text-gray-400 text-sm font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#8B0000]/20">
                {tickets.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                      No tickets sold yet. Click "Mark Ticket as Sold" to add your first sale.
                    </td>
                  </tr>
                ) : (
                  tickets.map((ticket) => (
                    <tr key={ticket._id} className={ticket.status === 'cancelled' ? 'opacity-50' : ''}>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-gray-500" />
                          <span className="text-white">{ticket.buyerName}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-300">{ticket.buyerPhone}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          ticket.ticketType === 'premium'
                            ? 'bg-[#B76E79]/20 text-[#B76E79] border border-[#B76E79]/30'
                            : 'bg-[#8B0000]/20 text-[#B76E79] border border-[#8B0000]/30'
                        }`}>
                          {ticket.ticketType === 'premium' ? 'Premium VIP' : 'Standard'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-white">{ticket.quantity}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          ticket.status === 'sold'
                            ? 'bg-green-900/30 text-green-400 border border-green-800/30'
                            : 'bg-red-900/30 text-red-400 border border-red-800/30'
                        }`}>
                          {ticket.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-400 text-sm">
                        {new Date(ticket.soldAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          {ticket.status === 'sold' ? (
                            <button
                              onClick={() => handleCancelTicket(ticket._id)}
                              className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-900/20 rounded-lg transition-colors"
                              title="Cancel ticket"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          ) : (
                            <button
                              onClick={() => handleRestoreTicket(ticket._id)}
                              className="p-2 text-gray-400 hover:text-green-400 hover:bg-green-900/20 rounded-lg transition-colors"
                              title="Restore ticket"
                            >
                              <RotateCcw className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            onClick={() => handleDeleteTicket(ticket._id)}
                            className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-900/20 rounded-lg transition-colors"
                            title="Delete permanently"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Add Ticket Modal */}
      {isAddModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
          onClick={() => setIsAddModalOpen(false)}
        >
          <div
            className="relative w-full max-w-md bg-gradient-to-br from-[#1a0000] to-[#0a0000] rounded-2xl border border-[#8B0000]/30 p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#8B0000]/20 border border-[#8B0000]/30 flex items-center justify-center text-white hover:bg-[#8B0000]/40 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-2xl font-serif text-white mb-6">Mark Ticket as Sold</h2>

            <form onSubmit={handleAddTicket} className="space-y-4">
              {/* Ticket Type */}
              <div>
                <label className="block text-gray-400 text-sm mb-2">Ticket Type</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, ticketType: 'standard' })}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      formData.ticketType === 'standard'
                        ? 'border-[#8B0000] bg-[#8B0000]/20'
                        : 'border-[#8B0000]/30 hover:border-[#8B0000]/60'
                    }`}
                  >
                    <p className="text-white font-medium">Standard</p>
                    <p className="text-[#B76E79] text-lg font-bold">$100</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, ticketType: 'premium' })}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      formData.ticketType === 'premium'
                        ? 'border-[#B76E79] bg-[#B76E79]/20'
                        : 'border-[#8B0000]/30 hover:border-[#B76E79]/60'
                    }`}
                  >
                    <p className="text-white font-medium">Premium VIP</p>
                    <p className="text-[#B76E79] text-lg font-bold">$150</p>
                  </button>
                </div>
              </div>

              {/* Buyer Name */}
              <div>
                <label className="block text-gray-400 text-sm mb-2">Buyer Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="text"
                    required
                    value={formData.buyerName}
                    onChange={(e) => setFormData({ ...formData, buyerName: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-[#8B0000]/10 border border-[#8B0000]/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#B76E79]"
                    placeholder="Enter buyer's name"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-gray-400 text-sm mb-2">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="tel"
                    required
                    value={formData.buyerPhone}
                    onChange={(e) => setFormData({ ...formData, buyerPhone: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-[#8B0000]/10 border border-[#8B0000]/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#B76E79]"
                    placeholder="+263..."
                  />
                </div>
              </div>

              {/* Quantity */}
              <div>
                <label className="block text-gray-400 text-sm mb-2">Quantity</label>
                <input
                  type="number"
                  min="1"
                  required
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) || 1 })}
                  className="w-full px-4 py-3 bg-[#8B0000]/10 border border-[#8B0000]/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#B76E79]"
                />
              </div>

              {/* Notes */}
              <div>
                <label className="block text-gray-400 text-sm mb-2">Notes (Optional)</label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-[#8B0000]/10 border border-[#8B0000]/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#B76E79] resize-none"
                    rows={2}
                    placeholder="Any additional notes..."
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-[#8B0000] to-[#A00000] text-white rounded-xl font-medium shadow-[0_0_30px_rgba(139,0,0,0.3)] hover:shadow-[0_0_40px_rgba(139,0,0,0.5)] transition-all duration-300"
              >
                Confirm Sale
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
