import React, { useState } from 'react';
import { Box, Container, Typography, Accordion, AccordionSummary, AccordionDetails, useTheme } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PolicyIcon from '@mui/icons-material/Policy';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { motion } from 'framer-motion';

// --- Mock Data for the FAQ section ---
const faqData = [
    {
        category: 'AI Transparency & Ethics',
        icon: PolicyIcon,
        items: [
            {
                question: 'What data does SafePath AI use to calculate safety scores?',
                answer: 'We use publicly available, anonymized data including NYC open data on historical traffic incidents, street lighting surveys, MTA bus delay records, and aggregated non-violent crime statistics in school zones. We DO NOT use any personally identifiable student data.'
            },
            {
                question: 'Is SafePath AI a definitive authority on safety?',
                answer: 'No. SafePath AI provides predictive insights based on historical patterns. It is a decision support tool, not a definitive safety guarantee. Users should always exercise personal caution.'
            },
            {
                question: 'How is student privacy protected?',
                answer: 'We only process location data in aggregated form (e.g., school zone level). All data remains on secure, encrypted servers, and no individual student data is ever collected or sold.'
            },
        ]
    },
    {
        category: 'Using the Platform',
        icon: HelpOutlineIcon,
        items: [
            {
                question: 'How do I generate a Safe Route?',
                answer: 'Navigate to the Transportation tab, enter your starting address, destination school, and the time of travel. The AI analyzes real-time and historical data to recommend the path with the highest safety score.'
            },
            {
                question: 'What does the Safety Index score mean?',
                answer: 'The index is a score from 0 to 100. A score of 90+ indicates optimal safety conditions (low traffic, excellent lighting). A score below 70 indicates elevated risk due to expected delays or historical incident patterns.'
            },
            {
                question: 'Where can I find mental health resources?',
                answer: 'The Mental Health & Wellness tab provides immediate, confidential links to NYC crisis hotlines, school counselors, and local support organizations, prioritizing direct human connection.'
            },
        ]
    },
];
// -------------------------------------


const FAQ = () => {
    const theme = useTheme();
    const [expanded, setExpanded] = useState(false);

    // Handler for managing which accordion panel is open
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <Container maxWidth="md" sx={{ py: 8 }}>
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {/* Emojis removed from the heading */}
                <Typography variant="h3" component="h1" align="center" sx={{ mb: 2, fontWeight: 800, color: theme.palette.primary.dark }}>
                    Frequently Asked Questions
                </Typography>
                <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 6 }}>
                    Transparency on AI, Data, and Decision-Making
                </Typography>
            </motion.div>

            {faqData.map((categoryGroup, groupIndex) => (
                <Box key={groupIndex} sx={{ mb: 5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, color: theme.palette.secondary.main }}>
                        <categoryGroup.icon sx={{ mr: 1.5, fontSize: 30 }} />
                        <Typography variant="h5" component="h2" fontWeight={700}>
                            {categoryGroup.category}
                        </Typography>
                    </Box>

                    {categoryGroup.items.map((item, itemIndex) => (
                        <motion.div
                            key={itemIndex}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: itemIndex * 0.05 }}
                        >
                            <Accordion
                                expanded={expanded === `panel${groupIndex}-${itemIndex}`}
                                onChange={handleChange(`panel${groupIndex}-${itemIndex}`)}
                                sx={{ mb: 1, boxShadow: theme.shadows[1] }}
                            >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon color="primary" />}
                                    aria-controls={`panel${groupIndex}-${itemIndex}bh-content`}
                                    id={`panel${groupIndex}-${itemIndex}bh-header`}
                                    sx={{ bgcolor: theme.palette.grey[50] }}
                                >
                                    <Typography variant="subtitle1" fontWeight={600} color="primary.dark">
                                        {item.question}
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography variant="body1" color="text.secondary">
                                        {item.answer}
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        </motion.div>
                    ))}
                </Box>
            ))}
        </Container>
    );
};

export default FAQ;