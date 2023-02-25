import React from 'react';
import { Alert, AlertTitle, Box } from '@mui/material';
import { Status } from '../interfaces';
import { useSelector } from 'react-redux';
import { selectMoviesState } from '../store';

export const Error: React.FC = () => {
  const status: Status = useSelector(selectMoviesState);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4, flexGrow: 1 }}>
      <Alert severity="error" sx={{ width: '100%' }}>
        <AlertTitle>Error</AlertTitle>
        Error happened — <strong>{status.err}!</strong>
      </Alert>
    </Box>
  );
};