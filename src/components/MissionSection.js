import React from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
// Icons for the three mission pillars
import ShieldIcon from '@mui/icons-material/Security';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import MapIcon from '@mui/icons-material/Map';

// --- Mission Content Data ---
const missionPillars = [
    {
        title: "Protect",
        icon: ShieldIcon,
        description: "Prioritizing the physical and digital security of students by flagging potential risks in routes, schedules, and digital interactions.",
        color: 'primary.main', // Deep Blue
    },
    {
        title: "Predict",
        icon: LightbulbIcon,
        description: "Harnessing AI to predict safe timing for drop-offs and potential delays based on real-time and historical NYC data patterns.",
        color: 'secondary.main', // Cyan Accent
    },
    {
        title: "Inform",
        icon: MapIcon,
        description: "Providing clear, localized, and actionable safety insights to parents, teachers, and students across all five NYC boroughs.",
        color: 'text.secondary', // Darker Grey/Text Color
    },
];
// ----------------------------

// --- Framer Motion Variants ---
const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 80 } }
};
// ------------------------------

const MissionSection = () => {
    const theme = useTheme();

    return (
        // 🛑 FIX: The main container ensures all text and grid items are horizontally centered.
        // We ensure the Container itself is centered (though maxWidth="lg" usually handles it).
        <Container maxWidth="lg" sx={{ py: 10, textAlign: 'center' }}>
            {/* Section Header with Animation */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                // The text alignment is already centered via the parent Container's style
            >
                <Typography variant="h3" component="h2" sx={{ mb: 2, fontWeight: 800, color: theme.palette.primary.dark }}>
                    Our Core Mission
                </Typography>
                <Typography variant="h6" color="text.secondary" sx={{ mb: 8 }}>
                    SafePath AI is built on the three pillars of **Predict, Protect, and Inform**.
                </Typography>
            </motion.div>

            {/* Grid for the Three Cards */}
            {/* FIX: alignItems="stretch" ensures equal height, and the default centered text handles alignment */}
            <Grid container spacing={4} alignItems="stretch" justifyContent="center"> 
                {missionPillars.map((pillar, index) => (
                    <Grid 
                        item 
                        xs={12} // Stacked on small screens
                        sm={12}
                        md={4} // Three-in-a-row on medium screens and up
                        key={pillar.title}
                        sx={{ 
                            display: 'flex', 
                            justifyContent: 'center', // Center card when it's the only one in the row (xs/sm)
                            // This grid item's content is now guaranteed to be centered.
                        }}
                    >
                        <motion.div
                            variants={cardVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ delay: index * 0.2 }}
                            whileHover={{ scale: 1.05, boxShadow: theme.shadows[10] }}
                            style={{ width: '100%', height: '100%' }}
                        >
                            <Card 
                                elevation={4} 
                                sx={{ 
                                    height: '100%', // Ensures equal card height
                                    p: 3, 
                                    borderRadius: 3,
                                    borderBottom: `5px solid ${pillar.color}`, 
                                    display: 'flex', 
                                    flexDirection: 'column',
                                    justifyContent: 'flex-start',
                                }}
                            >
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Box sx={{ color: pillar.color, mb: 2 }}>
                                        <pillar.icon sx={{ fontSize: 60 }} />
                                    </Box>
                                    
                                    <Typography variant="h5" component="div" sx={{ mb: 1.5, fontWeight: 700 }}>
                                        {pillar.title}
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary">
                                        {pillar.description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

export default MissionSection;