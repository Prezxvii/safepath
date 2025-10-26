import React from 'react';
import { Box, Container, Grid, Typography, Link, useTheme, Divider } from '@mui/material';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Link as RouterLink } from 'react-router-dom';

const quickLinks = [
    { name: 'Safety Insights', path: '/insights' },
    { name: 'Transportation Routes', path: '/transportation' },
    { name: 'Emergency Planning', path: '/emergency-planning' },
    { name: 'FAQ & Ethics', path: '/faq' },
];

const resourceLinks = [
    { name: 'NYC Open Data', href: 'https://opendata.cityofnewyork.us/' },
    { name: 'Privacy Policy', path: '/privacy' }, // Placeholder route
    { name: 'AI Transparency Report', path: '/about' },
    { name: 'Submit Feedback', path: '/contact' }, // Placeholder route
];

const Footer = () => {
    const theme = useTheme();

    return (
        <Box 
            component="footer" 
            sx={{ 
                backgroundColor: theme.palette.primary.dark, // Use a dark primary color for the footer
                color: theme.palette.grey[300], 
                py: 6, 
                mt: 'auto', // Push to the bottom of the viewport
            }}
        >
            <Container maxWidth="lg">
                <Grid container spacing={4} justifyContent="space-between">
                    
                    {/* Column 1: Logo & Mission */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="h6" fontWeight={700} sx={{ mb: 1.5, color: theme.palette.background.paper }}>
                            SafePath AI 
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 2 }}>
                            Harnessing intelligent insights to protect our next generation in NYC.
                        </Typography>
                        <Box sx={{ '& > *': { mr: 1 } }}>
                            <Link href="#" color="inherit"><TwitterIcon /></Link>
                            <Link href="#" color="inherit"><LinkedInIcon /></Link>
                            <Link href="#" color="inherit"><GitHubIcon /></Link>
                        </Box>
                    </Grid>

                    {/* Column 2: Quick Links */}
                    <Grid item xs={6} sm={3} md={2}>
                        <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 1, color: theme.palette.background.paper }}>
                            Quick Links
                        </Typography>
                        {quickLinks.map((link) => (
                            <Link 
                                component={RouterLink}
                                to={link.path}
                                key={link.name}
                                color="inherit"
                                underline="hover"
                                display="block"
                                variant="body2"
                                sx={{ mb: 0.5 }}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </Grid>

                    {/* Column 3: Resources */}
                    <Grid item xs={6} sm={3} md={2}>
                        <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 1, color: theme.palette.background.paper }}>
                            Resources
                        </Typography>
                        {resourceLinks.map((link) => (
                            <Link 
                                href={link.href || link.path}
                                component={link.href ? 'a' : RouterLink}
                                target={link.href ? "_blank" : "_self"}
                                key={link.name}
                                color="inherit"
                                underline="hover"
                                display="block"
                                variant="body2"
                                sx={{ mb: 0.5 }}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </Grid>
                    
                    {/* Column 4: Contact/Credit */}
                    <Grid item xs={12} md={3}>
                        <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 1, color: theme.palette.background.paper }}>
                            Data & Contact
                        </Typography>
                        <Typography variant="body2">
                            Built by T.B. as a portfolio project using **NYC Open Data** (Mock API Integration).
                        </Typography>
                        <Typography variant="body2" sx={{ mt: 1 }}>
                          
                        </Typography>
                    </Grid>

                </Grid>
                
                <Divider sx={{ my: 4, bgcolor: theme.palette.grey[600] }} />

                <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                    <Typography variant="caption" sx={{ color: theme.palette.grey[500] }}>
                        © {new Date().getFullYear()} SafePath AI. All rights reserved.
                    </Typography>
                    <Typography variant="caption" sx={{ color: theme.palette.grey[500] }}>
                        Disclaimer: This is a demonstration project using simulated data.
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;