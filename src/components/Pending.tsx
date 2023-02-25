import React from 'react';
import { Box, CircularProgress } from '@mui/material';

export const Pending: React.FC = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4, flexGrow: 1 }}>
    <CircularProgress/>
  </Box>
);
