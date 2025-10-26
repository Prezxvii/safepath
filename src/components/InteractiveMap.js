import React, { useMemo, useState } from 'react';
import { Box, Typography, Card, CardContent, useTheme } from '@mui/material';
// FIX: Ensure this import line is correct for your version of react-map-gl
import Map, { Marker, useMap } from 'react-map-gl';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import 'mapbox-gl/dist/mapbox-gl.css'; 

// --- Configuration ---
const initialViewState = {
  latitude: 40.7128, // NYC Latitude
  longitude: -74.0060, // NYC Longitude
  zoom: 12,
};

// Mock Safety Route Markers
const routeMarkers = [
    { id: 1, lat: 40.7306, lng: -73.9852, color: 'green' },
    { id: 2, lat: 40.7419, lng: -73.9899, color: 'red' },
    { id: 3, lat: 40.7061, lng: -74.0081, color: 'blue' },
];
// ---------------------

const InteractiveMap = () => {
    const theme = useTheme();
    
    // Get the Mapbox Access Token from the environment variable
    const mapboxToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
    
    // State to manage the map view (zoom, center)
    const [viewState, setViewState] = useState(initialViewState); // <-- CRITICAL: Ensure you have useState

    // Error handling for missing token
    if (!mapboxToken) {
        return (
            <Box sx={{ height: 550, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', bgcolor: theme.palette.error.light, p: 4 }}>
                <Typography variant="h5" color="error">
                    Mapbox Load Error: Access Token Missing.
                </Typography>
                <Typography variant="body1" color="error">
                    Please set REACT_APP_MAPBOX_ACCESS_TOKEN in your .env.local file and restart the server.
                </Typography>
            </Box>
        );
    }
    
    return (
        <Card elevation={6}>
            <CardContent sx={{ p: 0 }}>
                {/* Mapbox Component */}
                <Box sx={{ height: 550, width: '100%', borderRadius: '8px', overflow: 'hidden' }}>
                    <Map
                        // The spread operator ensures viewState controls map position
                        {...viewState} 
                        // onMove updates the viewState when the user interacts with the map
                        onMove={evt => setViewState(evt.viewState)} 
                        style={{ width: '100%', height: '100%' }}
                        mapboxAccessToken={mapboxToken}
                        mapStyle="mapbox://styles/mapbox/streets-v12" // Use a standard Mapbox style
                    >
                        {/* Add Markers */}
                        {routeMarkers.map(marker => (
                            <Marker
                                key={marker.id}
                                latitude={marker.lat}
                                longitude={marker.lng}
                                anchor="bottom"
                            >
                                {/* Custom marker based on color */}
                                <MapOutlinedIcon 
                                    sx={{ 
                                        color: marker.color, 
                                        fontSize: 40,
                                        filter: 'drop-shadow(0 0 5px rgba(0,0,0,0.5))'
                                    }} 
                                />
                            </Marker>
                        ))}
                    </Map>
                </Box>
            </CardContent>
        </Card>
    );
};

export default InteractiveMap;