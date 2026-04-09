export default async function handler(req, res) {
    // 1. Setup - Use your tag and the secret key from Vercel Environment Variables
    const playerTag = "2UJLYCRP0"; 
    const apiKey = process.env.BRAWL_KEY;
    const url = `https://proxy.royaleapi.dev/v1/players/%23${playerTag}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6ImI4ZjA2ODNhLTVmMDgtNDczYi1hMjM1LWViNDNiYmVhMjA2OCIsImlhdCI6MTc3NTcwMTgwNywic3ViIjoiZGV2ZWxvcGVyL2QyMDlkMmYwLTgwNWEtZjQyNi05NTBlLWVkODEyOWJiYzdkOSIsInNjb3BlcyI6WyJicmF3bHN0YXJzIl0sImxpbWl0cyI6W3sidGllciI6ImRldmVsb3Blci9zaWx2ZXIiLCJ0eXBlIjoidGhyb3R0bGluZyJ9LHsiY2lkcnMiOlsiNDUuNzkuMjE4Ljc5Il0sInR5cGUiOiJjbGllbnQifV19.l5U6JZbqyp8U9MdrlK8Enwzj_VosvjlcwswdExCqasu5wEuWe5v0I5PfV9zJFuADT9MK21bA4Gx1BdKWSKlrFA}`,
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
