import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { feed, apiKey } = req.query;

  if (!feed || !apiKey) {
    res.status(400).json({ message: 'feed and apiKey parameters are required' });
    return;
  }

  const api_url = `https://api.pubindex.dev/api/rss?feed=${feed}&api-key=${apiKey}`;

  try {
    const response = await fetch(api_url);

    if (response.ok) {
      const data = await response.json();
      res.status(200).json(data);
    } else {
      const text = await response.text();
      res.status(response.status).json({ message: text });
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: String(error) });
    }
  }
}
