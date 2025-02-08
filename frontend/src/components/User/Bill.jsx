// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Button } from '@mui/material';
// import { format } from 'date-fns';

// function Bill() {

//     const amount = parseFloat(sessionStorage.getItem("Amount")) || 0;
// const tax = parseFloat(sessionStorage.getItem("Tax")) || 0;

// const total = amount + tax;

//   return (
//     <Container maxWidth="md">
    
//     <TableContainer component={Paper}>
//       <Table>
//         <TableHead>
//           <TableRow>
//             <TableCell>Field</TableCell>
//             <TableCell>Value</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>

//           <TableRow>
//             <TableCell>Invoice ID</TableCell>
//             <TableCell>{sessionStorage.getItem("InvoiceId")}</TableCell>
//           </TableRow>

//           <TableRow>
//             <TableCell>Product Name</TableCell>
//             <TableCell>{sessionStorage.getItem("ProductName")}</TableCell>
//           </TableRow>

//           <TableRow>
//             <TableCell>Amount</TableCell>
//             <TableCell>{sessionStorage.getItem("Amount")}</TableCell>
//           </TableRow>

//           <TableRow>
//             <TableCell>Tax</TableCell>
//             <TableCell>{sessionStorage.getItem("Tax")}</TableCell>
//           </TableRow>

//           <TableRow>
//             <TableCell>Total</TableCell>
//             <TableCell>{total}</TableCell>
//           </TableRow>
          
//         </TableBody>
//       </Table>
//     </TableContainer>
   
//   </Container>
//   )
// }

// export default Bill
