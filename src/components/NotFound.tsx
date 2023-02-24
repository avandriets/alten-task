import React from 'react';
import { Alert, AlertTitle, Link } from "@mui/material";

export const NotFound: React.FC = () => {

  return (
    <Alert severity="error" action={
      <Link href="/">Go to Home</Link>
    }>
      <AlertTitle>Error</AlertTitle>
      404 Page not found!
    </Alert>
  );
};
