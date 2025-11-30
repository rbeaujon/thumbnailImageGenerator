const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

//.env
dotenv.config();
const OPENROUTER_KEY = process.env.OPENROUTER_API_KEY;

if (!OPENROUTER_KEY) {
    console.error("ERROR: No se encontró OPENROUTER_API_KEY en .env");
    process.exit(1);
}

app.use(cors({
    origin: 'https://rbeaujon.com', 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
    credentials: true
}));

//Mildware
app.use(express.json());
const router = express.Router();


//ENDPONTS

router.get('/', (req, res) => {
    res.send('API is running correctly');
});



//Aux
async function encodeImageUrlToBase64(imageUrl) {
    const response = await fetch(imageUrl);
    if (!response.ok) throw new Error('No se pudo descargar la imagen');
    const buffer = await response.arrayBuffer();
    return `data:image/jpeg;base64,${Buffer.from(buffer).toString('base64')}`;
}

// Gen thumbnail with OpenRouter

app.post('/generate', async (req, res) => {
    try {
        const { gameName, providerName, imageUrl } = req.body;

        if (!gameName || !providerName || !imageUrl) {
            return res.status(400).json({ error: 'Faltan parámetros' });
        }


        // Read and encode the image
        const base64Image = await encodeImageUrlToBase64(imageUrl);

        const prompt = `
        Create a 420x420 casino-style thumbnail. 
        Remove text.
        Remove extra objects from 50% to the bottom.
        Keep face and body anatomy 100% unchanged.
        No new characters or elements unless they fit naturally.
        Apply a subtle vertical linear gradient overlay from bottom to top. At the very bottom, use a strong, vibrant glowing color that perfectly complements and stands out against the existing background colors of the image (choose the most fitting neon or intense hue automatically, for example neon green, electric cyan, hot pink, fiery orange, or purple depending on what contrasts best). 
        The gradient must start with midium intensity and glow at the bottom, then at 20% of the image height smoothly fade to completely transparent (0% opacity) exactly at 50% of the image height and cover 100% width.
        The upper half must remain 100% untouched with no color tint. Keep all original details, sharpness and colors of the image intact.`;

        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${OPENROUTER_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'google/gemini-2.5-flash-image-preview',
                modalities: ['image', 'text'],
                messages: [
                    {
                        role: 'user',
                        content: [
                            { type: 'text', text: prompt },
                            { type: 'image_url', image_url: { url: base64Image } }
                        ]
                    }
                ]
            })
        });

        const result = await response.json();
        const url = result.choices?.[0]?.message?.images?.[0]?.image_url;

        if (!url) return res.status(500).json({ error: 'No image URL in response' });

        res.json({ imageUrl: url });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});



app.use('/', router);

app.listen(PORT, () => {
    console.log(`API corriendo en http://localhost:${PORT}`);
});
