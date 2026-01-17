import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

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

// Event Config Schema
const eventConfigSchema = new mongoose.Schema({
  totalStandardTickets: { type: Number, default: 100 },
  totalPremiumTickets: { type: Number, default: 50 },
  standardPrice: { type: Number, default: 100 },
  premiumPrice: { type: Number, default: 150 }
});

export const Ticket = mongoose.models.Ticket || mongoose.model('Ticket', ticketSchema);
export const EventConfig = mongoose.models.EventConfig || mongoose.model('EventConfig', eventConfigSchema);
export default connectToDatabase;
