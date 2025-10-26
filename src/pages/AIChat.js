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

// Import the context hook
import { useAI } from '../context/AIContext'; 


const AIChat = () => {
    const theme = useTheme();
    // Get persona from context to send to the backend
    const { persona } = useAI(); 

    const [messages, setMessages] = useState([
        { id: 1, text: `Welcome! I'm SafePath AI. I can answer questions about route safety, general policies, and connect you to mental health resources. (Persona: ${persona})`, sender: 'AI' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    // Auto-scroll to the bottom of the chat box
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    // --- UPDATED API Call Function: Calls Vercel Function /api/chat ---
    const fetchAIResponse = async (userMessage) => {
        
        // Format the entire history (excluding the initial welcome message) for the API
        const messagesToSend = messages.slice(1).map(msg => ({ 
            role: msg.sender === 'User' ? 'user' : 'assistant', 
            content: msg.text 
        }));
        
        // Add the new user message
        messagesToSend.push({ role: "user", content: userMessage });

        try {
            // CALL THE SECURE VERCEL SERVERLESS FUNCTION
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    messages: messagesToSend,
                    persona: persona, // Send persona state to backend
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                console.error("Vercel Function Error:", data);
                return data.message || "Vercel function failed to respond. Check console for details.";
            }
            
            // Return the final response from your backend function
            return data.response;

        } catch (error) {
            console.error("Frontend Fetch Error:", error);
            return "Network Error: Could not reach the serverless function.";
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

        // 2. Fetch AI Response (Wait for the serverless function call)
        const responseText = await fetchAIResponse(newUserMessage.text);
        
        // 3. Add AI Message
        const newAIMessage = { id: Date.now() + 1, text: responseText, sender: 'AI' };
        setMessages(prev => [...prev, newAIMessage]);
        setIsLoading(false);
    };

    // --- Message Bubble Component (Remains the same) ---
    const MessageBubble = React.memo(({ message }) => (
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
    ));

    // --- Main Render (Remains the same) ---
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
                        height: '60vh',
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