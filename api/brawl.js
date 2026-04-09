export default async function handler(req, res) {
    const playerTag = "2UJLYCRP0"; 
    const apiKey = process.env.BRAWL_KEY;

    // USE THIS EXACT URL - it's the most stable for Vercel's network
    const url = `https://bsproxy.royaleapi.dev/v1/players/%23${playerTag}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Accept': 'application/json'
            }
        });

        // This lets us see EXACTLY what Supercell says in the Vercel logs
        if (!response.ok) {
            const errorText = await response.text();
            console.error("Supercell Error:", errorText);
            return res.status(response.status).send(errorText);
        }

        const data = await response.json();

        // Allow your main website to access this data
        res.setHeader('Access-Control-Allow-Origin', '*'); 
        res.status(200).json(data);

    } catch (error) {
        // This prints the specific network error to your Vercel Dashboard
        console.error("Vercel Fetch Error:", error.message);
        res.status(500).json({ error: "Failed to connect to Supercell", details: error.message });
    }
}
