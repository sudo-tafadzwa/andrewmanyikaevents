import connectToDatabase, { Ticket } from '../lib/mongodb.js';

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    await connectToDatabase();

    if (req.method === 'GET') {
      const tickets = await Ticket.find().sort({ soldAt: -1 });
      return res.json(tickets);
    }

    if (req.method === 'POST') {
      const { ticketType, buyerName, buyerPhone, quantity, notes } = req.body;
      const ticket = await Ticket.create({
        ticketType,
        buyerName,
        buyerPhone,
        quantity: quantity || 1,
        notes
      });
      return res.status(201).json(ticket);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
