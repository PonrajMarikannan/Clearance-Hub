import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { useLocation } from 'react-router-dom';

const InvoicePage = () => {
  const location = useLocation();
  const { shipId, userId } = location.state || {};

  const handleDownload = () => {
    console.log('Download invoice for:', shipId);
  };

  return (
    <Container maxWidth="lg" className="my-8">
      <Typography variant="h4" gutterBottom>
        Invoice
      </Typography>
      <Box>
        <Typography variant="h6">Invoice for Ship ID: {shipId}</Typography>
        <Typography variant="body1">
          Here you can view and download your invoice for the selected ship.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleDownload}
          className="mt-2"
        >
          Download Invoice
        </Button>
      </Box>
    </Container>
  );
};

export default InvoicePage;
