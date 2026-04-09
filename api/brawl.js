export default async function handler(req, res) {
    // Your Player Tag (no # needed here)
    const playerTag = "2UJLYCRP0"; 
    
    // This pulls the key you saved in Vercel's Environment Variables
    const apiKey = process.env.BRAWL_KEY;

    // We use %23 to represent the # symbol in the URL
const url = `https://proxy.royaleapi.dev/v1/players/%23${playerTag}`;
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            return res.status(response.status).json(errorData);
        }

        const data = await response.json();
        
        // CRITICAL: This allows larpers.xyz to talk to this Vercel function
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET');
        
        // Send the player data back to your website
        res.status(200).json(data);

    } catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({ error: "Failed to fetch data from Supercell" });
    }
}
