import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import TimelineIcon from '@mui/icons-material/Timeline';

// --- Mock Data for the Chart ---
const data = [
    { name: '7:00 AM', BusDelay: 5, SafetyIndex: 85 },
    { name: '7:30 AM', BusDelay: 7, SafetyIndex: 82 },
    { name: '8:00 AM', BusDelay: 12, SafetyIndex: 75 }, // Peak Delay / Lower Safety
    { name: '8:30 AM', BusDelay: 10, SafetyIndex: 78 },
    { name: '9:00 AM', BusDelay: 4, SafetyIndex: 90 },
    { name: '3:00 PM', BusDelay: 6, SafetyIndex: 88 },
    { name: '3:30 PM', BusDelay: 15, SafetyIndex: 70 }, // Secondary Peak
    { name: '4:00 PM', BusDelay: 11, SafetyIndex: 77 },
    { name: '4:30 PM', BusDelay: 6, SafetyIndex: 86 },
];
// ------------------------------

const SafetyCorrelationChart = () => {
    const theme = useTheme();

    return (
        <Box 
            sx={{ 
                height: 450, // Slightly increased height for the chart
                p: 2, 
                bgcolor: theme.palette.background.paper,
                borderRadius: 2,
                boxShadow: theme.shadows[2]
            }}
        >
            <Typography variant="h6" align="center" sx={{ mb: 2, fontWeight: 700, color: theme.palette.primary.main }}>
                Bus Delay vs. Safety Index by Time of Day
            </Typography>
            
            <ResponsiveContainer width="100%" height="85%">
                <LineChart
                    data={data}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.grey[300]} />
                    <XAxis dataKey="name" stroke={theme.palette.text.secondary} />
                    <YAxis 
                        yAxisId="left" 
                        label={{ value: 'Bus Delay (Mins)', angle: -90, position: 'insideLeft', fill: theme.palette.warning.main }}
                        stroke={theme.palette.warning.main} 
                        tickCount={5}
                        domain={[0, 'auto']}
                    />
                    <YAxis 
                        yAxisId="right" 
                        orientation="right" 
                        label={{ value: 'Safety Index (0-100)', angle: 90, position: 'insideRight', fill: theme.palette.success.main }}
                        stroke={theme.palette.success.main}
                        tickCount={5}
                        domain={[60, 100]}
                    />
                    <Tooltip 
                        contentStyle={{ 
                            backgroundColor: theme.palette.background.paper, 
                            border: `1px solid ${theme.palette.grey[400]}`, 
                            borderRadius: 4 
                        }} 
                    />
                    <Legend wrapperStyle={{ paddingTop: '10px' }} />
                    
                    {/* Bus Delay (Line 1, Primary Axis) */}
                    <Line 
                        yAxisId="left" 
                        type="monotone" 
                        dataKey="BusDelay" 
                        stroke={theme.palette.warning.main} 
                        activeDot={{ r: 8 }} 
                        strokeWidth={2}
                    />
                    
                    {/* Safety Index (Line 2, Secondary Axis) */}
                    <Line 
                        yAxisId="right" 
                        type="monotone" 
                        dataKey="SafetyIndex" 
                        stroke={theme.palette.success.main} 
                        activeDot={{ r: 8 }} 
                        strokeWidth={2}
                    />
                </LineChart>
            </ResponsiveContainer>
        </Box>
    );
};

export default SafetyCorrelationChart;;