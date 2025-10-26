import React, { useState } from 'react';
import { Box, Container, Typography, TextField, Select, MenuItem, Button, Card, CardContent, CircularProgress, useTheme } from '@mui/material';
import { motion } from 'framer-motion';

// Import Icons
import PersonIcon from '@mui/icons-material/Person';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import SchoolIcon from '@mui/icons-material/School';
import PublicIcon from '@mui/icons-material/Public'; 
import ErrorIcon from '@mui/icons-material/Error';

// Import AI Logic and Context
import { useAI } from '../context/AIContext';


// --- DEFINE SECURE API ENDPOINT (MUST BE UPDATED) ---
const API_BASE_URL = "YOUR_RENDER_URL_HERE"; 
// -----------------------------------------------------

const fetchSafetyInsight = async (scenario, currentPersona) => {
    // The utility is structured to send a full conversation context
    const messagesToSend = [{ role: "user", content: scenario }];

    const response = await fetch(`${API_BASE_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            messages: messagesToSend,
            persona: currentPersona, 
        }),
    });

    // --- Robust Error Handling ---
    const contentType = response.headers.get('content-type');
    if (!response.ok && (!contentType || !contentType.includes('application/json'))) {
        const textError = await response.text();
        console.error("Server Returned Non-JSON Content:", textError);
        throw new Error(`Server Error (Code: ${response.status}): Could not reach the AI service.`);
    }

    const data = await response.json();

    if (!response.ok) {
        console.error("Backend Proxy Error:", data);
        throw new Error(data.message || "Failed to fetch insight from AI service.");
    }
    
    return data.response;
};


const AIAssessmentForm = () => {
    const theme = useTheme();

    // 1. STATE MANAGEMENT
    const [name, setName] = useState('');
    const [safetyScenario, setSafetyScenario] = useState('');
    const [insight, setInsight] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Only need 'persona' from context. openRouterKey is NOT USED.
    const { persona, setPersona } = useAI();
    
    // ... (Animation variants unchanged) ...
    const formContainerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 50, delay: 0.5 } }
    };

    /**
     * Handles the form submission, calls the AI, and manages state.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        setInsight('');
        setError(null);

        if (!name || !safetyScenario) {
            setError('Please fill in both your name/alias and safety scenario.');
            return;
        }

        // Add client-side check if API_BASE_URL is still the placeholder
        if (API_BASE_URL === "YOUR_RENDER_URL_HERE") {
             setError('CRITICAL ERROR: Please update API_BASE_URL in AIAssessmentForm.js with your Render URL.');
             return;
        }

        setIsLoading(true);

        const fullScenarioInput = `
            User Name/Alias: ${name}
            Safety Scenario: ${safetyScenario}
            ---
            Provide a detailed safety insight tailored for a ${persona}.
        `;

        try {
            // CALL THE NEW SECURE RENDER ENDPOINT
            const result = await fetchSafetyInsight(fullScenarioInput, persona);
            
            setInsight(result);

        } catch (err) {
            console.error('Submission failed:', err);
            setError(err.message || 'An error occurred while fetching the safety insight. Please check the console for details.');
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <Container maxWidth="md" sx={{ py: 8 }}>
            <Typography variant="h3" component="h2" align="center" sx={{ mb: 6, fontWeight: 700 }}>
                Get Your Personalized Safety Insight
            </Typography>

            <motion.div
                variants={formContainerVariants}
                initial="hidden"
                animate="visible"
            >
                <Card elevation={6} sx={{ p: 4, borderRadius: 3 }}>
                    <CardContent>
                        
                        {/* === PERSONA SELECTION (unchanged) === */}
                        <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Typography variant="h6" color="text.secondary">
                                I need advice as a:
                            </Typography>
                            <Select
                                value={persona}
                                onChange={(e) => setPersona(e.target.value)}
                                size="small"
                                color="secondary"
                                sx={{ minWidth: 150 }}
                            >
                                <MenuItem value="teenager"><PersonIcon fontSize="small" sx={{ mr: 1 }} /> Teen/Young Adult</MenuItem>
                                <MenuItem value="parent"><FamilyRestroomIcon fontSize="small" sx={{ mr: 1 }} /> Parent/Guardian</MenuItem>
                                <MenuItem value="teacher"><SchoolIcon fontSize="small" sx={{ mr: 1 }} /> Teacher/Admin</MenuItem>
                                <MenuItem value="developer"><PublicIcon fontSize="small" sx={{ mr: 1 }} /> City Planner/Safety Official</MenuItem>
                            </Select>
                        </Box>


                        {/* === INPUT FORM (unchanged) === */}
                        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                            
                            <TextField
                                label="Your Name (or Alias)"
                                variant="outlined"
                                fullWidth
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />

                            <TextField
                                label="Scenario or Safety Query (e.g., Safest route from PS 145 to the N/W train at 4 PM)"
                                variant="outlined"
                                fullWidth
                                multiline
                                rows={4}
                                value={safetyScenario}
                                onChange={(e) => setSafetyScenario(e.target.value)}
                                placeholder="e.g., I need to find the best pick-up time for my 7th grader at 3 PM on a Friday in Brooklyn."
                                required
                            />
                            
                            <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                                <Button 
                                    type="submit" 
                                    variant="contained" 
                                    color="primary" 
                                    size="large"
                                    fullWidth
                                    disabled={isLoading}
                                    sx={{ py: 1.5, mt: 2, fontWeight: 700 }}
                                >
                                    {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Generate Safety Insight'}
                                </Button>
                            </motion.div>
                        </Box>
                    </CardContent>
                </Card>

                {/* === OUTPUT AREA (unchanged) === */}
                <Box sx={{ mt: 4 }}>
                    {error && (
                        <Typography color="error" align="center" sx={{ my: 2 }}>
                            <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center' }}>
                                <ErrorIcon color="error" sx={{ mr: 1 }} /> {error}
                            </Box>
                        </Typography>
                    )}
                    
                    {insight && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            <Card elevation={4} sx={{ p: 3, borderLeft: `5px solid ${theme.palette.secondary.main}` }}>
                                <Typography variant="h5" sx={{ mb: 2, fontWeight: 600, color: theme.palette.text.primary }}>
                                    Safety Insight (for a {persona})
                                </Typography>
                                <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                                    {insight}
                                </Typography>
                            </Card>
                        </motion.div>
                    )}
                </Box>
            </motion.div>

        </Container>
    );
}

export default AIAssessmentForm;