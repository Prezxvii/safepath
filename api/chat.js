// api/chat.js
// This code runs securely on the Vercel server.

import fetch from 'node-fetch'; // Vercel environment supports node-fetch

export default async function handler(req, res) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    // Retrieve the secret key from Vercel Environment Variables
    // IMPORTANT: This variable must be set in your Vercel Dashboard as OPENROUTER_SECRET_KEY
    const openRouterKey = process.env.OPENROUTER_SECRET_KEY; 
    const { messages, persona } = req.body; // Data sent from the frontend

    if (!openRouterKey) {
        // Log this error to your Vercel logs, but send a generic error message to the client
        console.error("Vercel Function Error: OPENROUTER_SECRET_KEY is missing in environment variables.");
        return res.status(500).json({ message: 'Server configuration error: AI service unavailable.' });
    }

    // Define the dynamic system prompt based on the persona set by the user
    const systemPrompt = `You are SafePath AI, a friendly, non-judgmental assistant for the NYC school community. 
                          Your responses should be tailored to a ${persona}. You specialize in answering questions about 
                          NYC school safety, finding mental health resources, and interpreting data (like traffic/safety scores). 
                          Keep responses concise and helpful.`;

    // Structure the full message history for the OpenRouter API
    const messagesForAPI = [
        { role: "system", content: systemPrompt },
        ...messages
    ];

    try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${openRouterKey}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "model": "mistralai/mistral-7b-instruct:free", // Using a reliable, cost-effective model
                "messages": messagesForAPI,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("OpenRouter API Error:", errorData);
            return res.status(response.status).json({ message: 'External API failure', details: errorData });
        }

        const data = await response.json();
        const aiMessage = data.choices[0].message.content.trim();

        // Send the AI's final message back to the frontend
        return res.status(200).json({ response: aiMessage });

    } catch (error) {
        console.error("Proxy Fetch Error:", error);
        return res.status(500).json({ message: 'Internal server error during AI request.' });
    }
}