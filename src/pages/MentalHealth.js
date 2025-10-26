import React from 'react';
import { Box, Container, Typography, Card, CardContent, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import SpaIcon from '@mui/icons-material/Spa';
import PsychologyIcon from '@mui/icons-material/Psychology'; 

// Import the necessary component we created previously
import ResourceFinderWidget from '../components/ResourceFinderWidget'; 

const MentalHealth = () => {
    const theme = useTheme();

    return (
        <Container maxWidth="md" sx={{ py: 8 }}>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                <Typography variant="h3" component="h1" align="center" sx={{ mb: 2, fontWeight: 800 }}>
                    <PsychologyIcon fontSize="large" sx={{ mr: 1, verticalAlign: 'middle' }} /> Mental Health & Wellness Resources
                </Typography>
                <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 6 }}>
                    Connecting students and families with crucial NYC support services.
                </Typography>
            </motion.div>

            <Card elevation={4} sx={{ p: 4 }}>
                <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, color: theme.palette.secondary.main }}>
                        <SpaIcon sx={{ mr: 1.5, fontSize: 30 }} />
                        <Typography variant="h5" fontWeight={700}>
                            Sensitive AI Guidance
                        </Typography>
                    </Box>
                    <Typography variant="body1" color="text.secondary">
                        This page showcases a sensitive, non-diagnostic AI interface designed to help users quickly find the appropriate NYC mental health resources, crisis hotlines, or school-based support programs. It prioritizes confidentiality and immediate access to human help.
                    </Typography>
                    
                    {/* The component that handles the search logic */}
                    <ResourceFinderWidget />
                    
                </CardContent>
            </Card>
        </Container>
    );
};

export default MentalHealth;