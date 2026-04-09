export default async function handler(req, res) {
    // 1. Setup - Use your tag and the secret key from Vercel Environment Variables
    const playerTag = "2UJLYCRP0"; 
    const apiKey = process.env.BRAWL_KEY;
    const url = `https://proxy.royaleapi.dev/v1/players/%23${playerTag}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Accept': 'application/json'
            }
        });

        // 2. Error Handling
        if (!response.ok) {
            const errorData = await response.json();
            return res.status(response.status).json(errorData);
        }

        const data = await response.json();

        // 3. Security - Allow your main website (larpers.xyz) to access this data
        res.setHeader('Access-Control-Allow-Origin', '*'); 
        res.setHeader('Access-Control-Allow-Methods', 'GET');
        
        // 4. Success - Send data to the frontend
        res.status(200).json(data);

    } catch (error) {
        res.status(500).json({ error: "Failed to connect to Supercell" });
    }
}
