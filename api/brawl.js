export default async function handler(req, res) {
    // 1. CONFIGURATION
    // Your Player Tag (the %23 represents the # symbol)
    const playerTag = "2UJLYCRP0"; 
    
    // This pulls your key from Vercel's Environment Variables
    const apiKey = process.env.BRAWL_KEY;

    // Use the RoyaleAPI proxy - the most stable for Brawl Stars in 2026
    const url = `https://proxy.royaleapi.dev/v1/players/%23${playerTag}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                // We add 'Bearer ' here so you don't have to put it in Vercel
                'Authorization': `Bearer ${apiKey}`,
                'Accept': 'application/json',
                // User-Agent identifies your request to the proxy
                'User-Agent': 'Vercel-Brawl-Stats-Project'
            }
        });

        // 2. ERROR HANDLING
        if (!response.ok) {
            const errorData = await response.json();
            // This sends the specific Supercell error (like Invalid IP) to your screen
            return res.status(response.status).json(errorData);
        }

        const data = await response.json();

        // 3. CORS SETTINGS (Crucial for larpers.xyz)
        res.setHeader('Access-Control-Allow-Origin', '*'); 
        res.setHeader('Access-Control-Allow-Methods', 'GET');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

        // 4. SEND DATA
        res.status(200).json(data);

    } catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({ 
            error: "Failed to fetch data from Supercell",
            details: error.message 
        });
    }
}
