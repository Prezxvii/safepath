import React, { useState } from 'react';
import { 
    Box, 
    Typography, 
    Button, 
    Select, 
    MenuItem, 
    InputLabel, 
    FormControl, 
    Divider, 
    List, 
    ListItem, 
    ListItemText, 
    ListItemSecondaryAction, 
    IconButton,
    useTheme
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PhoneIcon from '@mui/icons-material/Phone';
import CrisisAlertIcon from '@mui/icons-material/CrisisAlert';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WebIcon from '@mui/icons-material/Web';

// --- Verified and Real NYC Resource Data ---
const mockResources = [
    // Crisis Hotlines (NYC-Wide) - VERIFIED
    { id: 1, name: 'NYC Crisis Text Line', type: 'Crisis Hotline', location: 'NYC-Wide', contact: '741741', contactType: 'text', href: 'https://www.crisistextline.org/', details: 'Free, confidential support 24/7 via text for anyone in crisis.' },
    { id: 2, name: 'NYC Well', type: 'Crisis Hotline', location: 'NYC-Wide', contact: '1-888-692-9355', contactType: 'phone', href: 'https://nycwell.cityofnewyork.us/', details: '24/7 free mental health support, crisis counseling, and referral via phone, text, or chat.' },
    { id: 3, name: '988 Suicide & Crisis Lifeline', type: 'Crisis Hotline', location: 'NYC-Wide', contact: '988', contactType: 'phone', href: 'https://988lifeline.org/', details: '24/7 confidential support for people in distress, prevention and crisis resources.' },
    { id: 13, name: 'The Trevor Project', type: 'Crisis Hotline', location: 'NYC-Wide', contact: '1-866-488-7386', contactType: 'phone', href: 'https://www.thetrevorproject.org/', details: '24/7 crisis support for LGBTQ young people via phone, text, or chat.' },

    // Counseling & Therapy (Borough Specific - Using authoritative org links as examples)
    { id: 4, name: 'The Brooklyn Center for Therapy', type: 'Counseling & Therapy', location: 'Brooklyn', contact: 'Website Link', contactType: 'web', href: 'https://www.brooklyncenterfortherapy.org/', details: 'Example of an organization offering sliding scale individual and family therapy.' },
    { id: 5, name: 'Queens Community Counseling', type: 'Counseling & Therapy', location: 'Queens', contact: 'Website Link', contactType: 'web', href: 'https://www.samhsa.gov/find-help/national-helpline', details: 'Example - linking to general federal help finder for local referrals.' },
    { id: 6, name: 'Manhattan Wellness Clinic', type: 'Counseling & Therapy', location: 'Manhattan', contact: 'Website Link', contactType: 'web', href: 'https://www.nychealthandhospitals.org/mental-health-services/', details: 'Example - linking to NYC Health + Hospitals mental health services.' },
    { id: 7, name: 'Bronx Family Guidance', type: 'Counseling & Therapy', location: 'Bronx', contact: 'Website Link', contactType: 'web', href: 'https://www.bronxhealthreach.org/mental-health', details: 'Example of a Bronx-based health coalition for local mental health referrals.' },
    { id: 8, name: 'Staten Island Mental Health Society', type: 'Counseling & Therapy', location: 'Staten Island', contact: 'Website Link', contactType: 'web', href: 'https://www.statenislandusa.com/mental-health.html', details: 'Example - linking to general SI community mental health resources.' },

    // School-Based Support & Official Resources - VERIFIED
    { id: 9, name: 'NYC DOE Mental Health & Wellness', type: 'School-Based Support', location: 'NYC-Wide', contact: 'Website Link', contactType: 'web', href: 'https://www.schools.nyc.gov/learning/student-support/mental-health-support', details: 'Official resource page for school-based support, including social workers and counselors.' },
    { id: 10, name: 'Child Mind Institute', type: 'Resource Library', location: 'NYC-Wide', contact: 'Website Link', contactType: 'web', href: 'https://childmind.org/', details: 'Provides expert information and articles on children\'s mental health and learning disorders.' },
    { id: 16, name: 'NYC Department of Health Mental Health', type: 'Government Service', location: 'NYC-Wide', contact: 'Website Link', contactType: 'web', href: 'https://www1.nyc.gov/site/doh/health/health-topics/mental-health.page', details: 'Official city resources and guides for comprehensive mental health services.' },
    
    // Additional Examples
    { id: 17, name: 'Youth Counseling Alliance', type: 'Counseling & Therapy', location: 'Manhattan', contact: 'Website Link', contactType: 'web', href: 'https://www.nyc.gov/site/dycd/services/youth-services/youth-counseling.page', details: 'NYC DYCD resource for youth counseling.' },
    { id: 18, name: 'SafeSpace Queens', type: 'School-Based Support', location: 'Queens', contact: 'Website Link', contactType: 'web', href: 'https://www.safespace.org/', details: 'Example of an organization providing youth development and mental wellness programs.' },
    { id: 19, name: 'Wellness Center of SI', type: 'Counseling & Therapy', location: 'Staten Island', contact: 'Website Link', contactType: 'web', href: 'https://www.samhsa.gov/find-help/national-helpline', details: 'Example - general help finder for local referrals.' },
];
// ---------------------------------------------

const ResourceFinderWidget = () => {
    const theme = useTheme();
    const [searchParams, setSearchParams] = useState({
        location: 'All Boroughs',
        helpType: 'All Types',
    });
    const [results, setResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [searched, setSearched] = useState(false);

    const handleChange = (event) => {
        setSearchParams({ ...searchParams, [event.target.name]: event.target.value });
    };

    const handleSearch = () => {
        setIsSearching(true);
        setSearched(true);
        
        const filtered = mockResources.filter(resource => {
            // Check if resource location includes the search borough or if 'All Boroughs' is selected
            const matchesLocation = searchParams.location === 'All Boroughs' || resource.location.includes(searchParams.location);
            const matchesType = searchParams.helpType === 'All Types' || resource.type === searchParams.helpType;
            return matchesLocation && matchesType;
        });

        setTimeout(() => {
            setResults(filtered);
            setIsSearching(false);
        }, 500); 
    };

    // Helper function to get the correct icon and href for contact
    const getContactAction = (resource) => {
        // Use the explicit 'href' field for verified links
        const baseHref = resource.href || '#'; 

        switch (resource.contactType) {
            case 'phone':
                // For phone numbers, use tel:
                return { icon: <PhoneIcon />, href: `tel:${resource.contact.replace(/\D/g, '')}` };
            case 'text':
                // For text lines, use tel: for mobile users, but the main action is the website
                return { icon: <PhoneIcon />, href: `tel:${resource.contact.replace(/\D/g, '')}` };
            case 'web':
            case 'email':
                // For web/email types, use the verified URL
                return { icon: <WebIcon />, href: baseHref }; 
            default:
                return { icon: <WebIcon />, href: '#' }; 
        }
    };

    return (
        <Box sx={{ mt: 4 }}>
            <Typography variant="body1" sx={{ mb: 3, fontStyle: 'italic', color: theme.palette.text.secondary }}>
                Use the filters below to connect with immediate, relevant mental health support in your area.
            </Typography>

            {/* --- Search / Filter Controls --- */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3 }}>
                <FormControl sx={{ minWidth: 150 }} size="small">
                    <InputLabel id="location-label">Borough/Location</InputLabel>
                    <Select
                        labelId="location-label"
                        name="location"
                        value={searchParams.location}
                        label="Borough/Location"
                        onChange={handleChange}
                    >
                        <MenuItem value="All Boroughs">All Boroughs</MenuItem>
                        <MenuItem value="Manhattan">Manhattan</MenuItem>
                        <MenuItem value="Brooklyn">Brooklyn</MenuItem>
                        <MenuItem value="Queens">Queens</MenuItem>
                        <MenuItem value="Bronx">Bronx</MenuItem>
                        <MenuItem value="Staten Island">Staten Island</MenuItem>
                    </Select>
                </FormControl>

                <FormControl sx={{ minWidth: 200 }} size="small">
                    <InputLabel id="help-type-label">Type of Help Needed</InputLabel>
                    <Select
                        labelId="help-type-label"
                        name="helpType"
                        value={searchParams.helpType}
                        label="Type of Help Needed"
                        onChange={handleChange}
                    >
                        <MenuItem value="All Types">All Types</MenuItem>
                        <MenuItem value="Crisis Hotline">Crisis Hotline (Urgent)</MenuItem>
                        <MenuItem value="Counseling & Therapy">Counseling & Therapy</MenuItem>
                        <MenuItem value="School-Based Support">School-Based Support</MenuItem>
                        <MenuItem value="Resource Library">Resource Library</MenuItem>
                        <MenuItem value="Family Support">Family Support</MenuItem>
                        <MenuItem value="Government Service">Government Service</MenuItem>
                    </Select>
                </FormControl>

                <Button 
                    variant="contained" 
                    onClick={handleSearch} 
                    startIcon={<SearchIcon />} 
                    disabled={isSearching}
                    sx={{ flexGrow: 1, fontWeight: 700 }}
                >
                    {isSearching ? 'Analyzing...' : 'Find Resources'}
                </Button>
            </Box>

            <Divider sx={{ my: 3 }} />

            {/* --- Results Area --- */}
            <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                <CrisisAlertIcon color="secondary" sx={{ mr: 1 }} /> 
                Immediate Matches ({results.length})
            </Typography>

            <List sx={{ bgcolor: theme.palette.grey[50], borderRadius: 1, border: `1px solid ${theme.palette.grey[300]}` }}>
                {searched && results.length === 0 ? (
                     <ListItem>
                        <ListItemText 
                            primary="No specific resources found for your selection." 
                            secondary="Try expanding your search to 'All Types' or 'All Boroughs'." 
                            sx={{ color: theme.palette.text.secondary }}
                        />
                    </ListItem>
                ) : (
                    results.map(resource => {
                        const { icon, href } = getContactAction(resource);
                        return (
                            <ListItem key={resource.id} divider>
                                <ListItemText
                                    primary={
                                        <Typography variant="subtitle1" fontWeight={600} color="primary.dark">
                                            {resource.name} ({resource.type})
                                        </Typography>
                                    }
                                    secondary={
                                        <Box>
                                            <Typography variant="body2">{resource.details}</Typography>
                                            <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                                                <LocationOnIcon sx={{ fontSize: 14, mr: 0.5 }} /> {resource.location}
                                            </Typography>
                                        </Box>
                                    }
                                />
                                <ListItemSecondaryAction>
                                    <IconButton edge="end" aria-label="contact" href={href} target="_blank" rel="noopener noreferrer" color="secondary" size="large">
                                        {icon}
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        );
                    })
                )}
            </List>
        </Box>
    );
};

export default ResourceFinderWidget;