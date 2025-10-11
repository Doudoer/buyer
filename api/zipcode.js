export default async function handler(req, res) {
  const { zip } = req.query;
  if (!zip) {
    return res.status(400).json({ error: 'Missing zip parameter' });
  }
  try {
    const apiRes = await fetch(`https://api.zippopotam.us/us/${zip}`);
    if (!apiRes.ok) {
      return res.status(apiRes.status).json({ error: 'Zip code not found' });
    }
    const data = await apiRes.json();
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: 'Server error' });
  }
}
