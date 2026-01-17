import connectToDatabase, { Ticket } from '../lib/mongodb.js';

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'DELETE,PATCH,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { id } = req.query;

  try {
    await connectToDatabase();

    if (req.method === 'DELETE') {
      const ticket = await Ticket.findByIdAndDelete(id);
      if (!ticket) {
        return res.status(404).json({ error: 'Ticket not found' });
      }
      return res.json({ message: 'Ticket deleted' });
    }

    if (req.method === 'PATCH') {
      const { action } = req.body;

      let status;
      if (action === 'cancel') {
        status = 'cancelled';
      } else if (action === 'restore') {
        status = 'sold';
      } else {
        return res.status(400).json({ error: 'Invalid action. Use "cancel" or "restore"' });
      }

      const ticket = await Ticket.findByIdAndUpdate(
        id,
        { status },
        { new: true }
      );

      if (!ticket) {
        return res.status(404).json({ error: 'Ticket not found' });
      }
      return res.json(ticket);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
