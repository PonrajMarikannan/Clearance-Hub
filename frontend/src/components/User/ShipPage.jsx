// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import {
//   Button,
//   Box,
//   Typography,
//   Container,
//   TextField,
//   Card,
//   CardContent,
//   Grid,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   InputAdornment
// } from '@mui/material';
// import SearchIcon from '@mui/icons-material/Search';
// import { format, parseISO, subDays } from 'date-fns';
// import UserSideBar from './UserSideBar';

// const User = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filteredShips, setFilteredShips] = useState([]);
//   const [allShips, setAllShips] = useState([]);
//   const [openDialog, setOpenDialog] = useState(false);
//   const [selectedShip, setSelectedShip] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchShips = async () => {
//       try {
//         const response = await axios.get('http://localhost:7070/ships/all');
//         setAllShips(response.data);
//         filterShips(response.data);
//       } catch (error) {
//         console.error('Error fetching ships data:', error);
//       }
//     };
//     fetchShips();
//   }, []);

//   useEffect(() => {
//     filterShips(allShips);
//   }, [searchTerm, allShips]);

//   const filterShips = (ships) => {
//     const oneWeekAgo = subDays(new Date(), 7);
//     const result = ships.filter(
//       (ship) =>
//         (ship.arrivalDate && new Date(ship.arrivalDate) >= oneWeekAgo) &&
//         ship.shipName.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setFilteredShips(result);
//   };

//   const handleOpenDialog = (ship) => {
//     setSelectedShip(ship);
//     setOpenDialog(true);
//   };

//   const handleCloseDialog = () => {
//     setOpenDialog(false);
//     setSelectedShip(null);
//   };

//   const handleNavigation = (type) => {
//     handleCloseDialog();
//     navigate(`/user/${type}`, { state: { shipId: selectedShip.shipId } });
//   };

//   return (
//     <>
   
//     <UserSideBar/>
//     <div className="relative ml-64">
//       <Container maxWidth="lg" className="relative z-10 flex flex-col items-center justify-center">
//         <Box className="flex justify-center items-center my-8 w-full">
//           <TextField
//             fullWidth
//             label="Search Ships"
//             variant="outlined"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <SearchIcon />
//                 </InputAdornment>
//               ),
//             }}
//             sx={{ maxWidth: '600px', borderRadius: 2 }}
//           />
//         </Box>

       
//         <Grid container spacing={2}>
//           {filteredShips.map((ship) => (
//             <Grid item xs={12} sm={6} md={4} key={ship.shipId}>
//               <Card>
//                 <CardContent>
//                   <Typography variant="h5" gutterBottom>
//                     {ship.shipName}
//                   </Typography>
//                   <Typography variant="h6" color="textSecondary">
//                     Boarding Port: {ship.boardingPort}
//                   </Typography>
//                   <Typography variant="h6" color="textSecondary">
//                     Departure Port: {ship.departurePort}
//                   </Typography>
//                   <Typography variant="body2" color="textSecondary">
//                     Price per ton: ${ship.price_per_ton}
//                   </Typography>
//                   <Typography variant="body2" color="textSecondary">
//                     Arrival Date: {ship.arrivalDate ? format(parseISO(ship.arrivalDate), 'MMM d, yyyy') : 'N/A'}
//                   </Typography>
//                   <Typography variant="body2" color="textSecondary">
//                     Boarding Date: {ship.boardingDate ? format(parseISO(ship.boardingDate), 'MMM d, yyyy') : 'N/A'}
//                   </Typography>
//                   <Typography variant="body2" color="textSecondary">
//                     Departure Date: {ship.departureDate ? format(parseISO(ship.departureDate), 'MMM d, yyyy') : 'N/A'}
//                   </Typography>
//                   <Typography variant="body2" color="textSecondary">
//                     Capacity: {ship.maxCapacity} tons
//                   </Typography>
//                   <Typography variant="body2" color="textSecondary">
//                     Current Load: {ship.currentLoad} tons
//                   </Typography>
//                   <Button
//   variant="contained"
//   color="primary"
//   onClick={() => handleOpenDialog(ship)}
//   sx={{ mt: 3 }} 
// >
//   Enquiry
// </Button>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       </Container>

//       <Dialog
//         open={openDialog}
//         onClose={handleCloseDialog}
//         PaperProps={{
//           sx: {
//             width: '90%',
//             maxWidth: '400px',
//             padding: 2,
//             borderRadius: '16px',
//             boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
//           },
//         }}
//       >
//         <DialogTitle
//           sx={{
//             fontSize: '1.25rem',
//             fontWeight: 'bold',
//             textAlign: 'center',
//             color: '#1976d2',
//             position: 'relative',
//           }}
//         >
//           Ship Details
//           <Button
//             onClick={handleCloseDialog}
//             sx={{
//               position: 'absolute',
//               right: 16,
//               top: 16,
//               color: '#1976d2',
//             }}
//           >
//             X
//           </Button>
//         </DialogTitle>
//         <DialogContent
//           sx={{
//             paddingTop: 2,
//             paddingBottom: 2,
//           }}
//         >
//           <Typography variant="body1">
//             You have selected {selectedShip?.shipName}. Would you like to proceed as an Importer or Exporter?
//           </Typography>
//         </DialogContent>
//         <DialogActions
//           sx={{
//             padding: '8px',
//             justifyContent: 'center',
//             gap: 2, 
//           }}
//         >
//           <Button
//             onClick={() => handleNavigation('import')}
//             variant="contained"
//             color="primary"
//             sx={{
//               fontWeight: 'bold',
//               borderRadius: '12px',
//               padding: '8px 16px',
//               backgroundColor: '#1976d2',
//               '&:hover': {
//                 backgroundColor: '#155a8a',
//               },
//             }}
//           >
//             Import
//           </Button>
//           <Button
//             onClick={() => handleNavigation('export')}
//             variant="contained"
//             color="primary"
//             sx={{
//               fontWeight: 'bold',
//               borderRadius: '12px',
//               padding: '8px 16px',
//               backgroundColor: '#1976d2',
//               '&:hover': {
//                 backgroundColor: '#155a8a',
//               },
//             }}
//           >
//             Export
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//     </>
//   );
// };

// export default User;
