import React, { useState, useRef, useEffect } from 'react';
import { 
    Box, 
    Container, 
    Typography, 
    TextField, 
    Button, 
    Paper, 
    CircularProgress,
    useTheme
} from '@mui/material';
import { motion } from 'framer-motion';
import SendIcon from '@mui/icons-material/Send';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PersonIcon from '@mui/icons-material/Person';
import SecurityIcon from '@mui/icons-material/Security';

// CRITICAL: Import the context hook to access the API key and persona
import { useAI } from '../context/AIContext'; 


const AIChat = () => {
    const theme = useTheme();
    // Get AI context values
    const { openRouterKey, persona } = useAI(); 

    const [messages, setMessages] = useState([
        { id: 1, text: "Welcome! I'm SafePath AI. I can answer questions about route safety, general policies, and connect you to mental health resources.", sender: 'AI' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    // Auto-scroll to the bottom of the chat box
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    // Scroll whenever messages update
    useEffect(scrollToBottom, [messages]);

    // --- API Call Function ---
    const fetchAIResponse = async (userMessage) => {
        if (!openRouterKey) {
            return "ERROR: AI Key not loaded. Please ensure REACT_APP_OPENROUTER_KEY is set in your .env.local file and restart the server.";
        }
        
        // Define the system prompt based on the user persona
        const systemPrompt = `You are SafePath AI, a friendly, non-judgmental assistant for the NYC school community. 
                              Your responses should be tailored to a ${persona} (e.g., student, parent). You specialize in answering questions about 
                              NYC school safety, finding mental health resources, and interpreting data (like traffic/safety scores). 
                              Keep responses concise and helpful.`;

        // Format all previous messages and the new user message for the API
        const messagesForAPI = [
            { role: "system", content: systemPrompt },
            ...messages.slice(1).map(msg => ({ 
                role: msg.sender === 'User' ? 'user' : 'assistant', 
                content: msg.text 
            })),
            { role: "user", content: userMessage },
        ];

        try {
            const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${openRouterKey}`,
                    "Content-Type": "application/json",
                    // Required for OpenRouter to track usage
                    "HTTP-Referer": window.location.href, 
                },
                body: JSON.stringify({
                    "model": "mistralai/mistral-7b-instruct:free", // Reliable, fast, and free model for this use case
                    "messages": messagesForAPI,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("OpenRouter API Error:", errorData);
                return `API Error: Could not get response. Status: ${response.status}. Check console for details.`;
            }

            const data = await response.json();
            return data.choices[0].message.content.trim();

        } catch (error) {
            console.error("Network or Fetch Error:", error);
            return "Connection Error: Could not reach the AI service.";
        }
    };
    
    // --- Send Handler ---
    const handleSend = async () => {
        if (input.trim() === '' || isLoading) return;

        // 1. Add User Message
        const newUserMessage = { id: Date.now(), text: input, sender: 'User' };
        setMessages(prev => [...prev, newUserMessage]);
        setInput('');
        setIsLoading(true);

        // 2. Fetch AI Response (Wait for the API call)
        const responseText = await fetchAIResponse(newUserMessage.text);
        
        // 3. Add AI Message
        const newAIMessage = { id: Date.now() + 1, text: responseText, sender: 'AI' };
        setMessages(prev => [...prev, newAIMessage]);
        setIsLoading(false);
    };

    // --- Message Bubble Component ---
    const MessageBubble = ({ message }) => (
        <Box 
            sx={{ 
                display: 'flex', 
                justifyContent: message.sender === 'User' ? 'flex-end' : 'flex-start', 
                mb: 2,
            }}
            component={motion.div}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <Paper 
                elevation={1} 
                sx={{ 
                    p: 1.5, 
                    maxWidth: '75%', 
                    borderRadius: '20px',
                    backgroundColor: message.sender === 'User' ? theme.palette.primary.light : theme.palette.grey[200],
                    color: message.sender === 'User' ? theme.palette.primary.contrastText : theme.palette.text.primary,
                    borderBottomRightRadius: message.sender === 'User' ? 0 : '20px',
                    borderBottomLeftRadius: message.sender === 'User' ? '20px' : 0,
                    display: 'flex',
                    alignItems: 'flex-start',
                }}
            >
                {message.sender === 'AI' && <SmartToyIcon sx={{ mr: 1, fontSize: 18, color: theme.palette.primary.main, mt: 0.2 }} />}
                <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>{message.text}</Typography>
                {message.sender === 'User' && <PersonIcon sx={{ ml: 1, fontSize: 18, color: theme.palette.primary.dark, mt: 0.2 }} />}
            </Paper>
        </Box>
    );

    // --- Main Render ---
    return (
        <Container maxWidth="sm" sx={{ py: 8 }}>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                <Typography variant="h4" component="h1" align="center" sx={{ mb: 4, fontWeight: 700, color: theme.palette.primary.dark }}>
                    <SecurityIcon fontSize="large" sx={{ mr: 1, verticalAlign: 'middle' }} /> Talk to SafePath AI
                </Typography>

                {/* --- Chat Window --- */}
                <Paper 
                    elevation={6} 
                    sx={{ 
                        height: '60vh', // Increased height slightly for better view
                        display: 'flex', 
                        flexDirection: 'column', 
                        overflow: 'hidden',
                        borderRadius: 2
                    }}
                >
                    {/* Message Display Area */}
                    <Box sx={{ flexGrow: 1, p: 2, overflowY: 'auto', bgcolor: theme.palette.background.default }}>
                        {messages.map((msg) => (
                            <MessageBubble key={msg.id} message={msg} />
                        ))}
                        {isLoading && (
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 2 }}>
                                <Paper 
                                    elevation={1} 
                                    sx={{ p: 1.5, maxWidth: '50%', borderRadius: '20px', bgcolor: theme.palette.grey[200], display: 'inline-flex' }}
                                >
                                    <CircularProgress size={16} sx={{ mr: 1, color: theme.palette.primary.main }} />
                                    <Typography variant="body2" color="text.secondary">AI is thinking...</Typography>
                                </Paper>
                            </Box>
                        )}
                        <div ref={messagesEndRef} />
                    </Box>

                    {/* Input Area */}
                    <Box sx={{ p: 2, borderTop: `1px solid ${theme.palette.divider}`, display: 'flex', alignItems: 'center', bgcolor: 'white' }}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            placeholder="Ask SafePath AI a question..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter' && !isLoading) handleSend();
                            }}
                            size="small"
                            disabled={isLoading}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSend}
                            disabled={isLoading || input.trim() === ''}
                            sx={{ ml: 1, height: 40, minWidth: 40, p: 0 }}
                        >
                            <SendIcon />
                        </Button>
                    </Box>
                </Paper>
            </motion.div>
        </Container>
    );
};

export default AIChat;