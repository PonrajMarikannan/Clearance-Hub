// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { format } from 'date-fns';
// import jsPDF from 'jspdf';
// import { useNavigate } from 'react-router-dom';
// import UserSideBar from './UserSideBar';
// import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Button, Box, Grid, useTheme, IconButton, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
// import NoResultsIcon from '@mui/icons-material/Warning'; 



// const ExpInvoicePage = () => {
//   const [invoices, setInvoices] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [dialogOpen, setDialogOpen] = useState(false);
//   const navigate = useNavigate();
//   const theme = useTheme();

//   useEffect(() => {
//     const fetchInvoices = async () => {
//       const userId = sessionStorage.getItem('UserId');
      
//       if (!userId) {
//         setError('User ID not found in session storage');
//         setLoading(false);
//         return;
//       }

//       try {
//         const response = await axios.get(`http://localhost:7070/invoice/byUserId/${userId}`);
//         if (Array.isArray(response.data) && response.data.length > 0) {
//           setInvoices(response.data); 
//         } else {
//           setDialogOpen(true);
//         }
//       } catch (error) {
//         setError('Error fetching invoices');
//         console.error('Error fetching invoices:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchInvoices();
//   }, []);

//   const formatDate = (date) => {
//     try {
//       const parsedDate = new Date(date);
//       if (isNaN(parsedDate.getTime())) {
//         return 'Invalid date';
//       }
//       return format(parsedDate, 'yyyy-MM-dd');
//     } catch (e) {
//       console.error('Error formatting date:', e);
//       return 'Invalid date';
//     }
//   };

//   const downloadPDF = (invoice) => {
//     const doc = new jsPDF();
//     doc.setFontSize(12);
//     doc.text('Invoice Details', 10, 10);

//     doc.text(`Invoice ID: ${invoice.invoiceId}`, 10, 20);
//     doc.text(`Amount: ${invoice.amount}`, 10, 30);
//     doc.text(`Invoice Date: ${formatDate(invoice.invoiceDate)}`, 10, 40);
//     doc.text(`Exporter Name: ${invoice.exporterApplication?.exporterName}`, 10, 50);
//     doc.text(`Product Name: ${invoice.exporterApplication?.productName}`, 10, 60);
//     doc.text(`Weight: ${invoice.exporterApplication?.weight}`, 10, 70);

//     doc.text(`Document: ${invoice.exporterApplication?.documentFile ? 'Available' : 'No Document'}`, 10, 80);

//     doc.save(`invoice-${invoice.invoiceId}.pdf`);
//   };

//   const handlePaymentRedirect = (invoice) => {
//     if (invoice) {
//       sessionStorage.setItem("InvoiceId", invoice.invoiceId);
//       sessionStorage.setItem("ExporterName", invoice.exporterApplication.exporterName);
//       sessionStorage.setItem("ProductName", invoice.exporterApplication.productName);
//       sessionStorage.setItem("Amount", invoice.amount);
//       sessionStorage.setItem("Tax", 2000);
//       navigate("/exppayment");
//     }
//   };

//   const handleCloseDialog = () => {
//     setDialogOpen(false);
//   };

//   if (loading) {
//     return (
//       <Container maxWidth="md" style={{ textAlign: 'center', padding: '40px' }}>
//         <CircularProgress size={60} thickness={5} />
//         <Typography variant="h6" style={{ marginTop: '20px' }}>Loading...</Typography>
//       </Container>
//     );
//   }

//   if (error) {
//     return (
//       <Container maxWidth="md" style={{ textAlign: 'center', padding: '40px' }}>
//         <Typography variant="h6" color="error">{error}</Typography>
//       </Container>
//     );
//   }


//   return (
//     <>
   
//     <UserSideBar/>
// <div className='ml-64 p-16'>

//     <Container maxWidth="lg" style={{ padding: '20px' }}>
//        <Box display="flex" alignItems="center" mb={3}></Box>
         
        
//       <Typography variant="h4" gutterBottom align="center" style={{ marginBottom: '20px' }}>
//         Exporter Invoices
//       </Typography>
//       <Grid container spacing={3}>
//         {invoices.map((invoice) => (
//           <Grid item xs={12} sm={6} md={4} key={invoice.invoiceId}>
//             <Paper elevation={4} style={{ padding: '20px', borderRadius: '8px', boxShadow: '0px 4px 10px rgba(0,0,0,0.2)' }}>
//               <Typography variant="h6" gutterBottom>
//                 Invoice ID: {invoice.invoiceId}
//               </Typography>
//               <Table>
//                 <TableHead>
//                   <TableRow>
//                     <TableCell style={{ borderBottom: '2px solid #ddd', padding: '12px', fontWeight: 'bold' }}>Field</TableCell>
//                     <TableCell style={{ borderBottom: '2px solid #ddd', padding: '12px', fontWeight: 'bold' }}>Value</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   <TableRow>
//                     <TableCell style={{ padding: '12px' }}>Amount</TableCell>
//                     <TableCell style={{ padding: '12px' }}>${invoice.amount.toFixed(2)}</TableCell>
//                   </TableRow>
//                   <TableRow>
//                     <TableCell style={{ padding: '12px' }}>Invoice Date</TableCell>
//                     <TableCell style={{ padding: '12px' }}>{formatDate(invoice.invoiceDate)}</TableCell>
//                   </TableRow>
//                   <TableRow>
//                     <TableCell style={{ padding: '12px' }}>Exporter Name</TableCell>
//                     <TableCell style={{ padding: '12px' }}>{invoice.exporterApplication?.exporterName}</TableCell>
//                   </TableRow>
//                   <TableRow>
//                     <TableCell style={{ padding: '12px' }}>Product Name</TableCell>
//                     <TableCell style={{ padding: '12px' }}>{invoice.exporterApplication?.productName}</TableCell>
//                   </TableRow>
//                   <TableRow>
//                     <TableCell style={{ padding: '12px' }}>Weight</TableCell>
//                     <TableCell style={{ padding: '12px' }}>{invoice.exporterApplication?.weight}</TableCell>
//                   </TableRow>
//                   <TableRow>
//                     <TableCell style={{ padding: '12px' }}>Document</TableCell>
//                     <TableCell style={{ padding: '12px' }}>
//                       {invoice.exporterApplication?.documentFile ? (
//                         <Button onClick={() => downloadPDF(invoice)} variant="contained" color="primary">
//                           Download PDF
//                         </Button>
//                       ) : (
//                         <Typography variant="body2">No Document</Typography>
//                       )}
//                     </TableCell>
//                   </TableRow>
//                 </TableBody>
//               </Table>
//               <Box textAlign="center" marginTop="20px">
//                 <Button onClick={() => handlePaymentRedirect(invoice)} variant="contained" color="secondary">
//                   Pay Now
//                 </Button>
//               </Box>
//             </Paper>
//           </Grid>
//         ))}
//       </Grid>
      
//     </Container>
//     <Dialog open={dialogOpen} onClose={handleCloseDialog}>
//         <DialogTitle style={{ marginLeft: '13rem' }}>No Invoices Found</DialogTitle>
//         <DialogContent>
//           <Box display="flex" flexDirection="column" alignItems="center">
//             <NoResultsIcon style={{ fontSize: 80, color: theme.palette.error.main }} />
//             <Typography variant="h6" style={{ marginTop: '20px' }}>There are no invoices available.</Typography>
//             <Typography variant="body1" color="textSecondary" style={{ marginTop: '10px' }}>
//               It seems you don’t have any invoices at the moment. Please check back later or contact support if you need assistance.
//             </Typography>
//           </Box>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseDialog} color="primary">
//             Close
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
// </>
//   );
// };

// export default ExpInvoicePage;
