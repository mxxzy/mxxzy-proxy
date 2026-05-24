export default async function handler(req, res) {
    const { url } = req.query;
    
    if (!url) {
        return res.status(400).json({ error: 'URL required' });
    }
    
    try {
        const response = await fetch(url);
        const buffer = await response.arrayBuffer();
        
        res.setHeader('Content-Type', response.headers.get('content-type') || 'image/jpeg');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Cache-Control', 'public, max-age=3600');
        
        res.send(Buffer.from(buffer));
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch image' });
    }
}
