// api/brawl.js
export default async function handler(req, res) {
    const playerTag = "2UJLYCRP0"; 
    // We'll set this 'BRAWL_KEY' in the Vercel dashboard later
    const apiKey = process.env.BRAWL_KEY;

    const url = `https://api.brawlstars.com/v1/players/%23${playerTag}`;

    try {
        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Accept': 'application/json'
            }
        });
        const data = await response.json();
        
        // Allow your larpers.xyz site to access this data
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch data" });
    }
}
