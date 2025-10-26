import React from 'react';
import { Box, Container, Typography, Card, CardContent, Grid, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import WarningIcon from '@mui/icons-material/Warning';

const EmergencyPlanning = () => {
    const theme = useTheme();

    return (
        <Container maxWidth="md" sx={{ py: 8 }}>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                <Typography variant="h3" component="h1" align="center" sx={{ mb: 2, fontWeight: 800 }}>
                    🚨 Emergency Response Simulation
                </Typography>
                <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 6 }}>
                    AI-driven recommendations for school administrators and communities.
                </Typography>
            </motion.div>

            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <Card elevation={6} sx={{ p: 3, borderLeft: `5px solid ${theme.palette.error.main}` }}>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <WarningIcon color="error" sx={{ mr: 1.5, fontSize: 30 }} />
                                <Typography variant="h5" fontWeight={700}>
                                    Current Protocol Status: Review Required
                                </Typography>
                            </Box>
                            <Typography variant="body1" color="text.secondary">
                                This section will display real-time (mocked) risk ratings and AI-simulated evacuation or contact procedures based on scenarios like severe weather, infrastructure failures, or external incidents. It demonstrates the ability to integrate live alerts with protocol recommendations.
                            </Typography>
                            <Box sx={{ height: 150, mt: 3, border: `1px dashed ${theme.palette.grey[400]}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Typography color="text.hint">
                                    [Placeholder for AI Protocol Dashboard]
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};

export default EmergencyPlanning;