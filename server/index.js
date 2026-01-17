  import express from 'express';
  import cors from 'cors';
  import mongoose from 'mongoose';
  import dotenv from 'dotenv';

  dotenv.config();

  const app = express();

  // CORS configuration - allow frontend domains
  const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:3000',
    process.env.FRONTEND_URL // Add your production frontend URL as env variable
  ].filter(Boolean);

  app.use(cors({
    origin: function(origin, callback) {
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV !== 'production') {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true
  }));

  app.use(express.json());

  // Health check endpoint
  app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // MongoDB Connection
  mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

  // Ticket Schema
  const ticketSchema = new mongoose.Schema({
    ticketType: {
      type: String,
      enum: ['standard', 'premium'],
      required: true
    },
    buyerName: {
      type: String,
      required: true
    },
    buyerPhone: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      default: 1
    },
    status: {
      type: String,
      enum: ['sold', 'cancelled'],
      default: 'sold'
    },
    soldAt: {
      type: Date,
      default: Date.now
    },
    notes: String
  });

  const Ticket = mongoose.model('Ticket', ticketSchema);

  // Event Config Schema (for total tickets available)
  const eventConfigSchema = new mongoose.Schema({
    totalStandardTickets: { type: Number, default: 100 },
    totalPremiumTickets: { type: Number, default: 50 },
    standardPrice: { type: Number, default: 100 },
    premiumPrice: { type: Number, default: 150 }
  });

  const EventConfig = mongoose.model('EventConfig', eventConfigSchema);

  // Initialize event config if not exists
  async function initializeConfig() {
    const config = await EventConfig.findOne();
    if (!config) {
      await EventConfig.create({});
      console.log('Event config initialized');
    }
  }
  initializeConfig();

  // Routes

  // Get dashboard stats
  app.get('/api/stats', async (req, res) => {
    try {
      const config = await EventConfig.findOne();

      const standardSold = await Ticket.aggregate([
        { $match: { ticketType: 'standard', status: 'sold' } },
        { $group: { _id: null, total: { $sum: '$quantity' } } }
      ]);

      const premiumSold = await Ticket.aggregate([
        { $match: { ticketType: 'premium', status: 'sold' } },
        { $group: { _id: null, total: { $sum: '$quantity' } } }
      ]);

      const standardCount = standardSold[0]?.total || 0;
      const premiumCount = premiumSold[0]?.total || 0;

      res.json({
        standard: {
          sold: standardCount,
          total: config?.totalStandardTickets || 100,
          remaining: (config?.totalStandardTickets || 100) - standardCount,
          price: config?.standardPrice || 100
        },
        premium: {
          sold: premiumCount,
          total: config?.totalPremiumTickets || 50,
          remaining: (config?.totalPremiumTickets || 50) - premiumCount,
          price: config?.premiumPrice || 150
        },
        totalRevenue: (standardCount * (config?.standardPrice || 100)) + (premiumCount * (config?.premiumPrice || 150))
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get all tickets
  app.get('/api/tickets', async (req, res) => {
    try {
      const tickets = await Ticket.find().sort({ soldAt: -1 });
      res.json(tickets);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Add new ticket sale
  app.post('/api/tickets', async (req, res) => {
    try {
      const { ticketType, buyerName, buyerPhone, quantity, notes } = req.body;
      const ticket = await Ticket.create({
        ticketType,
        buyerName,
        buyerPhone,
        quantity: quantity || 1,
        notes
      });
      res.status(201).json(ticket);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Cancel ticket
  app.patch('/api/tickets/:id/cancel', async (req, res) => {
    try {
      const ticket = await Ticket.findByIdAndUpdate(
        req.params.id,
        { status: 'cancelled' },
        { new: true }
      );
      if (!ticket) {
        return res.status(404).json({ error: 'Ticket not found' });
      }
      res.json(ticket);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Restore cancelled ticket
  app.patch('/api/tickets/:id/restore', async (req, res) => {
    try {
      const ticket = await Ticket.findByIdAndUpdate(
        req.params.id,
        { status: 'sold' },
        { new: true }
      );
      if (!ticket) {
        return res.status(404).json({ error: 'Ticket not found' });
      }
      res.json(ticket);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Delete ticket permanently
  app.delete('/api/tickets/:id', async (req, res) => {
    try {
      const ticket = await Ticket.findByIdAndDelete(req.params.id);
      if (!ticket) {
        return res.status(404).json({ error: 'Ticket not found' });
      }
      res.json({ message: 'Ticket deleted' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
