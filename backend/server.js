// server.js
import express from 'express';
import bodyParser from 'body-parser';
import 'dotenv/config'; // For local testing, ensure you have a .env file
import fetch from 'node-fetch';

const app = express();
const PORT = process.env.PORT || 3001;
const OPENROUTER_SECRET_KEY = process.env.OPENROUTER_SECRET_KEY;
const OPENROUTER_MODEL = "mistralai/mistral-7b-instruct:free"; // Your desired model

// Middleware
app.use(bodyParser.json());

// --- Security Check ---
if (!OPENROUTER_SECRET_KEY) {
    console.error("CRITICAL ERROR: OPENROUTER_SECRET_KEY is not set.");
    // In a real server, you might prevent startup, but here we log and continue.
}

// --- CORS Configuration (Important for Frontend to Backend Communication) ---
app.use((req, res, next) => {
    // Replace '*' with your actual frontend domain (e.g., 'https://safe-path-nine.vercel.app')
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

// --- API Route to Proxy OpenRouter Call ---
app.post('/api/chat', async (req, res) => {
    if (!OPENROUTER_SECRET_KEY) {
        return res.status(500).json({ message: "Server configuration error: Missing API Key." });
    }

    const { messages, persona } = req.body;

    if (!messages || !persona) {
        return res.status(400).json({ message: "Missing 'messages' or 'persona' in request body." });
    }

    try {
        // Construct System Prompt
        const systemPrompt = { 
            role: "system", 
            content: `You are SafePath AI, a friendly, non-judgmental assistant for the NYC school community. Your responses must be tailored to the persona of a ${persona}. Keep responses helpful and concise.` 
        };
        
        // Add System Prompt to the start of the message array
        const messagesForAPI = [systemPrompt, ...messages];

        const openRouterResponse = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${OPENROUTER_SECRET_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "model": OPENROUTER_MODEL, 
                "messages": messagesForAPI,
            }),
        });

        // Handle errors from the OpenRouter API itself (e.g., rate limits, invalid key)
        if (!openRouterResponse.ok) {
            const errorData = await openRouterResponse.json();
            console.error("OpenRouter API Error:", errorData);
            return res.status(openRouterResponse.status).json({ 
                message: errorData.message || "Failed to get response from OpenRouter." 
            });
        }

        const data = await openRouterResponse.json();
        const aiResponseText = data.choices[0]?.message?.content?.trim() || "I'm sorry, I couldn't process that request.";

        // Send the final AI text back to the frontend
        res.status(200).json({ response: aiResponseText });

    } catch (error) {
        console.error("Backend Proxy Error:", error);
        res.status(500).json({ message: "An unexpected internal server error occurred." });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});