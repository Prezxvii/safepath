import React from 'react';
import { Box, Container, Typography, Card, CardContent, Grid, Button, useTheme, Divider} from '@mui/material';
import { motion } from 'framer-motion';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import RouteIcon from '@mui/icons-material/Route';
import MapIcon from '@mui/icons-material/Map';

// Import the new Map Component
import InteractiveMap from '../components/InteractiveMap'; // <-- NEW IMPORT

const Transportation = () => {
    const theme = useTheme();

    return (
        <Container maxWidth="lg" sx={{ py: 8 }}>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                <Typography 
                    variant="h3" 
                    component="h1" 
                    align="center" 
                    sx={{ mb: 1, fontWeight: 800, color: theme.palette.primary.dark }}
                >
                    <MapIcon fontSize="large" sx={{ mr: 1, verticalAlign: 'middle' }} /> Safe Commute Routes & Optimization
                </Typography>
                <Typography 
                    variant="h6" 
                    align="center" 
                    color="text.secondary" 
                    sx={{ mb: 6 }}
                >
                    AI analysis of NYC streets to highlight safest walking and bus paths for students.
                </Typography>
            </motion.div>

            <Grid container spacing={4}>
                {/* --- 1. Interactive Map Component --- */}
                <Grid item xs={12} md={8}>
                    {/* 🛑 FIX: Use the imported map component */}
                    <InteractiveMap /> 
                </Grid>

                {/* --- 2. Route Recommendation Sidebar (Remains the same) --- */}
                <Grid item xs={12} md={4}>
                    <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.3 }}>
                        <Card elevation={4} sx={{ height: '100%', p: 3 }}>
                            {/* ... (rest of sidebar content remains the same) ... */}
                            <Typography variant="h5" fontWeight={700} sx={{ mb: 2 }}>
                                AI Route Summary
                            </Typography>
                            <Divider sx={{ mb: 2 }} />
                            
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, color: 'success.main' }}>
                                <RouteIcon sx={{ mr: 1 }} />
                                <Typography variant="body1" fontWeight={600}>Route A (Recommended)</Typography>
                            </Box>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                                **Status:** 27% Safer than Route B. Factors include superior street lighting after 5 PM and 40% lower traffic volume.
                            </Typography>
                            
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, color: 'error.main' }}>
                                <LocationOnIcon sx={{ mr: 1 }} />
                                <Typography variant="body1" fontWeight={600}>Incident Hotspot Alert</Typography>
                            </Box>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                                A non-violent pattern anomaly detected near the 34th St subway entrance between 3:00 PM - 3:45 PM. Advise students to use the 33rd St exit as an alternative.
                            </Typography>

                            <Button 
                                variant="contained" 
                                color="secondary" 
                                fullWidth 
                                startIcon={<RouteIcon />}
                            >
                                Generate Custom Route
                            </Button>
                        </Card>
                    </motion.div>
                </Grid>
            </Grid>

        </Container>
    );
};

export default Transportation;