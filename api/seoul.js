import fetch from 'node-fetch';

export default async function handler(req, res) {
  const { start, end, date } = req.query;
  const apikey = '6d71694172676f6f353466574a6a77';

  if (!start || !end || !date) {
    return res.status(400).json({ error: 'Missing parameters' });
  }

  const url = `http://openapi.seoul.go.kr:8088/${apikey}/json/SPOP_DAILYSUM_JACHI/${start}/${end}/${date}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Proxy fetch failed', details: err.message });
  }
}
