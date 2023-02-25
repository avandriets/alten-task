import React from 'react';
import { Alert, AlertTitle, Box, Card, CardContent, Typography } from '@mui/material';
import { Status } from '../interfaces';
import { useSelector } from 'react-redux';
import { selectMoviesState } from '../store';

export const Error: React.FC = () => {
  const status: Status = useSelector(selectMoviesState);
  let content;
  if (status.rejected && status.err === 'Movie not found!') {
    content = (
      <Box sx={{ width: '100%' }}>
        <Card sx={{ height: 400 }}>
          <CardContent sx={{ display: 'flex', justifyContent: 'center' }}>
            <Typography color="textSecondary" sx={{ mt: 8 }} gutterBottom>
              Cannot find movies, please adjust search request.
            </Typography>
          </CardContent>
        </Card>
      </Box>
    );
  } else {
    content = (
      <Alert severity="error" sx={{ width: '100%' }}>
        <AlertTitle>Error</AlertTitle>
        Error happened — <strong>{status.err}</strong>
      </Alert>
    );
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4, flexGrow: 1 }}>
      {content}
    </Box>
  );
};
