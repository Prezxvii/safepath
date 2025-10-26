import React, { useState } from 'react';
import { 
    Box, 
    Container, 
    Typography, 
    TextField, 
    Button, 
    Paper, 
    Alert,
    useTheme
} from '@mui/material';
import { motion } from 'framer-motion';
import SendIcon from '@mui/icons-material/Send';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

const Contact = () => {
    const theme = useTheme();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [status, setStatus] = useState(null); // 'success', 'error', or null
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus(null);

        // --- Simulated Submission Logic ---
        setTimeout(() => {
            console.log("Contact Form Submitted:", formData);
            
            // In a real application, you would send data to an API here (e.g., Formspree, AWS Lambda)

            setIsSubmitting(false);
            
            // Simulate success
            setStatus('success');
            setFormData({ name: '', email: '', message: '' }); // Clear the form

        }, 1500); // 1.5 second delay
    };

    return (
        <Container maxWidth="sm" sx={{ py: 8 }}>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                
                <Box textAlign="center" mb={4}>
                    <MailOutlineIcon sx={{ fontSize: 60, color: theme.palette.primary.main, mb: 1 }} />
                    <Typography variant="h3" component="h1" fontWeight={800} sx={{ mb: 1 }}>
                        Get In Touch
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                        We welcome feedback from parents, educators, and the community.
                    </Typography>
                </Box>

                <Paper elevation={4} sx={{ p: 4 }}>
                    {status === 'success' && (
                        <Alert severity="success" sx={{ mb: 2 }}>
                            Thank you! Your message has been sent successfully.
                        </Alert>
                    )}
                    {status === 'error' && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            There was an error sending your message. Please try again later.
                        </Alert>
                    )}

                    <Box component="form" onSubmit={handleSubmit} noValidate>
                        <TextField
                            fullWidth
                            label="Your Name"
                            name="name"
                            margin="normal"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            fullWidth
                            label="Your Email"
                            name="email"
                            type="email"
                            margin="normal"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            fullWidth
                            label="Your Message"
                            name="message"
                            multiline
                            rows={4}
                            margin="normal"
                            value={formData.message}
                            onChange={handleChange}
                            required
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            size="large"
                            startIcon={<SendIcon />}
                            disabled={isSubmitting}
                            sx={{ mt: 3, py: 1.5 }}
                        >
                            {isSubmitting ? 'Sending...' : 'Send Message'}
                        </Button>
                    </Box>
                </Paper>
            </motion.div>
        </Container>
    );
};

export default Contact;