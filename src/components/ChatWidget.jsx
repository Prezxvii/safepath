import React, { useState } from 'react';
import { Box, Card, CardHeader, IconButton, Fab, TextField, Button, Divider, Typography, CircularProgress, useTheme } from '@mui/material';
import { motion } from 'framer-motion';

// Import AI Logic and Context
import { useAI } from '../context/AIContext';

// Import NEW Icons
import ForumIcon from '@mui/icons-material/Forum'; 
import CloseIcon from '@mui/icons-material/Close'; 
import SendIcon from '@mui/icons-material/Send'; 


// --- NEW SECURE FETCH FUNCTION for Chat Widget ---
const fetchChatResponse = async (messagesToSend, currentPersona) => {
    const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            messages: messagesToSend,
            persona: currentPersona, 
        }),
    });

    const data = await response.json();

    if (!response.ok) {
        console.error("Vercel Function Error:", data);
        return data.message || "Failed to fetch insight from AI service.";
    }
    
    return data.response;
};
// ----------------------------------------------------------------------


const ChatWidget = () => {
    const theme = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [conversation, setConversation] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // Only need 'persona' from context. openRouterKey is NOT USED.
    const { persona } = useAI();
    // Use a fixed alias for the chat context
    const alias = "Chat User"; 

    const handleSend = async (e) => {
        e.preventDefault();
        if (!message.trim() || isLoading) return;

        const newUserMessage = { sender: 'user', text: message };
        
        // 1. Update state with new user message
        setConversation(prev => [...prev, newUserMessage]);
        
        // 2. Prepare full history for the API call (must use the new message too)
        const messagesForApi = [
            ...conversation.map(c => ({ 
                role: c.sender === 'user' ? 'user' : 'assistant', 
                content: c.text 
            })),
            { role: 'user', content: newUserMessage.text } // Include the message being sent
        ];
        
        setMessage('');
        setIsLoading(true);

        try {
            // CALL THE NEW SECURE FETCH FUNCTION
            const insight = await fetchChatResponse(messagesForApi, persona);

            const aiResponse = { sender: 'ai', text: insight };
            setConversation(prev => [...prev, aiResponse]);

        } catch (error) {
            console.error('Chat failed:', error);
            const errorResponse = { sender: 'ai', text: "Error: Could not fetch insight. Please check your network or Vercel function configuration." };
            setConversation(prev => [...prev, errorResponse]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Box>
            {/* --- Chat Window --- */}
            {isOpen && (
                <motion.div 
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 100 }}
                    style={{ position: 'fixed', bottom: 90, right: 20, zIndex: 1200 }}
                >
                    <Card sx={{ width: 350, height: 450, borderRadius: 3, display: 'flex', flexDirection: 'column' }} elevation={10}>
                        <CardHeader
                            title="SafePath AI Chat"
                            subheader={`Persona: ${persona.charAt(0).toUpperCase() + persona.slice(1)}`}
                            sx={{ bgcolor: 'primary.main', color: 'primary.contrastText', p: 1.5 }}
                            action={
                                <IconButton onClick={() => setIsOpen(false)} sx={{ color: 'primary.contrastText' }}>
                                    <CloseIcon /> 
                                </IconButton>
                            }
                        />
                        <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 2, bgcolor: 'background.default' }}>
                            {conversation.length === 0 ? (
                                <Typography color="text.secondary" align="center" sx={{ mt: 5 }}>
                                    Ask me any safety question about NYC schools or routes!
                                </Typography>
                            ) : (
                                conversation.map((msg, index) => (
                                    <Box 
                                        key={index} 
                                        sx={{ 
                                            display: 'flex', 
                                            justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                                            mb: 1 
                                        }}
                                    >
                                        <Typography 
                                            variant="body2" 
                                            sx={{ 
                                                p: 1.5, 
                                                borderRadius: 2, 
                                                maxWidth: '75%',
                                                bgcolor: msg.sender === 'user' ? 'primary.light' : 'grey.200',
                                                color: msg.sender === 'user' ? 'primary.contrastText' : 'text.primary',
                                            }}
                                        >
                                            {msg.text}
                                        </Typography>
                                    </Box>
                                ))
                            )}
                            {isLoading && (
                                <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 1 }}>
                                    <Typography variant="body2" sx={{ p: 1.5, borderRadius: 2, bgcolor: 'grey.200', display: 'flex', alignItems: 'center' }}>
                                        <CircularProgress size={12} sx={{ mr: 1 }} /> AI is typing...
                                    </Typography>
                                </Box>
                            )}
                        </Box>

                        <Divider />
                        
                        <Box component="form" onSubmit={handleSend} sx={{ p: 1.5, display: 'flex', gap: 1 }}>
                            <TextField
                                fullWidth
                                size="small"
                                placeholder="Type your message..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                disabled={isLoading}
                            />
                            <Button 
                                type="submit" 
                                variant="contained" 
                                color="primary" 
                                disabled={isLoading || message.trim() === ''}
                                sx={{ minWidth: 50, px: 1 }}
                            >
                                <SendIcon />
                            </Button>
                        </Box>
                    </Card>
                </motion.div>
            )}

            {/* --- Floating Action Button --- */}
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 1200 }}
            >
                <Fab 
                    color="secondary" 
                    aria-label="chat" 
                    onClick={() => setIsOpen(true)}
                >
                    <ForumIcon /> 
                </Fab>
            </motion.div>
        </Box>
    );
}

export default ChatWidget;