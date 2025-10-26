import React from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, LinearProgress, Divider, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import MapIcon from '@mui/icons-material/Map';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import BarChartIcon from '@mui/icons-material/BarChart'; 

// Import the new Chart Component
import SafetyCorrelationChart from '../components/SafetyCorrelationChart'; 

// --- Mock Data ---
const mockMetrics = [
    { title: "Overall Safety Index (NYC)", value: 78, unit: '/ 100', color: 'success.main', trend: 'Up', icon: TrendingUpIcon, description: "Composite score based on traffic, lighting, and incident reports." },
    { title: "Average Bus Delay (Mins)", value: 8.4, unit: 'Mins', color: 'warning.main', trend: 'Up', icon: AccessTimeIcon, description: "Historical average delay across key Manhattan & Brooklyn school routes." },
    { title: "High-Risk Zones Identified", value: 12, unit: 'Zones', color: 'error.main', trend: 'Down', icon: MapIcon, description: "Areas flagged for increased nocturnal incidents or poor lighting conditions." },
];

const Insights = () => {
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
                    <BarChartIcon fontSize="large" sx={{ mr: 1, verticalAlign: 'middle' }} /> AI Safety Insights Dashboard
                </Typography>
                <Typography 
                    variant="h6" 
                    align="center" 
                    color="text.secondary" 
                    sx={{ mb: 6 }}
                >
                    Live snapshot of safety metrics and predictive insights for NYC school zones.
                </Typography>
            </motion.div>

            {/* --- 1. Key Metrics Cards --- */}
            <Grid container spacing={4} sx={{ mb: 6 }}>
                {mockMetrics.map((metric, index) => (
                    <Grid item xs={12} sm={4} key={metric.title}>
                        <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5, delay: index * 0.1 }}>
                            <Card elevation={4} sx={{ p: 2, borderLeft: `5px solid ${theme.palette[metric.color]?.main || theme.palette.grey[400]}` }}>
                                <CardContent>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                                        <Typography variant="subtitle1" fontWeight={600} color="text.secondary">
                                            {metric.title}
                                        </Typography>
                                        <metric.icon color={metric.color.split('.')[0]} />
                                    </Box>
                                    <Typography variant="h4" fontWeight={800} sx={{ color: metric.color }}>
                                        {metric.value}
                                        <Typography component="span" variant="h6" color="text.secondary" ml={0.5}>
                                            {metric.unit}
                                        </Typography>
                                    </Typography>
                                    <Typography variant="caption" display="block" color="text.secondary" mt={1}>
                                        {metric.description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </Grid>
                ))}
            </Grid>

            <Divider sx={{ my: 4 }} />

            {/* --- 2. AI Predictive Summary --- */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.4 }}>
                <Typography variant="h4" align="center" sx={{ mb: 3, fontWeight: 700 }}>
                    AI Predictive Summary & Recommendations
                </Typography>
                <Card elevation={6} sx={{ p: 4, bgcolor: theme.palette.grey[50] }}>
                    <Typography variant="body1" sx={{ fontStyle: 'italic', mb: 2 }}>
                        "Based on current MTA data and historical crowd analysis, traffic risk for the Lower Manhattan school zone peaks between 7:45 AM and 8:10 AM. We recommend a staggered student arrival plan to mitigate congestion-related incidents. The emergency preparedness index for Queens is currently high (85%), primarily due to updated severe weather protocols."
                    </Typography>
                    <LinearProgress variant="determinate" value={85} color="success" sx={{ height: 10, borderRadius: 5, my: 2 }} />
                    <Typography variant="caption" display="block" color="text.primary" fontWeight={700}>
                        Emergency Preparedness Index: 85%
                    </Typography>
                </Card>
            </motion.div>

            <Divider sx={{ my: 4 }} />
            
            {/* --- 3. Visualization Component --- */}
            <Typography variant="h4" align="center" sx={{ mb: 3, fontWeight: 700 }}>
                Data Visualization Mock-up
            </Typography>
            
            <SafetyCorrelationChart /> 

        </Container>
    );
};

export default Insights;