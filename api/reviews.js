const { supabase } = require('./lib/supabase');

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-admin-password');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const isAdmin = req.headers['x-admin-password'] === ADMIN_PASSWORD;

  if (req.method === 'GET') {
    let query = supabase
      .from('reviews')
      .select('id, reviewer_name, reviewer_role, review_text, rating, created_at')
      .order('created_at', { ascending: false });

    if (!isAdmin) query = query.eq('visible', true);

    const { data, error } = await query;
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json(data);
  }

  if (!isAdmin) return res.status(401).json({ error: 'Unauthorized' });

  if (req.method === 'POST') {
    const { reviewer_name, reviewer_role, review_text, rating } = req.body;
    if (!reviewer_name || !review_text) {
      return res.status(400).json({ error: 'Name and review text are required' });
    }

    const { data, error } = await supabase
      .from('reviews')
      .insert([{
        reviewer_name: reviewer_name.trim(),
        reviewer_role: (reviewer_role || 'Customer').trim(),
        review_text: review_text.trim(),
        rating: Math.min(5, Math.max(1, parseInt(rating) || 5)),
        visible: true
      }])
      .select()
      .single();

    if (error) return res.status(500).json({ error: error.message });
    return res.status(201).json(data);
  }

  if (req.method === 'DELETE') {
    const { id } = req.body;
    if (!id) return res.status(400).json({ error: 'id is required' });

    const { error } = await supabase.from('reviews').delete().eq('id', id);
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json({ success: true });
  }

  return res.status(405).json({ error: 'Method not allowed' });
};
