import connectToDatabase, { Ticket, EventConfig } from './lib/mongodb.js';

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await connectToDatabase();

    // Initialize config if not exists
    let config = await EventConfig.findOne();
    if (!config) {
      config = await EventConfig.create({});
    }

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
}
