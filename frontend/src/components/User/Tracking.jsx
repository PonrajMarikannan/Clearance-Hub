// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Container, Typography, Box, Divider, CircularProgress, Card, CardContent, CardHeader, CardActions, IconButton } from '@mui/material';
// import LocalShippingIcon from '@mui/icons-material/LocalShipping'; 
// import NoData from '../modal/NoData';

// const Tracking = () => {
//   const [userId, setUserId] = useState(sessionStorage.getItem("UserId"));
//   const [data, setData] = useState([]);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchTrackingData = async () => {
//       try {
//         const paymentStatus = localStorage.getItem("PaymentStatus");
//         if(paymentStatus === "Success" ){
//           const response = await axios.get(`http://localhost:7070/exportapp/getShipStatus/${userId}`);
//           console.log(response.data);
//           const updatedData = response.data.map(item => ({
//             ...item,
//             lastUpdated: new Date().toISOString() 
//           }));
//           setData(updatedData); 
//           setLoading(false);
//         }
//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     fetchTrackingData();
//   }, [userId]);

//   if (loading) return <CircularProgress />;
//   if (error) return <Typography color="error">Error: {error}</Typography>;

//   return (
//     <div className='ml-64'>
//     <Container  sx={{ mt: 4, mb: 6 }}>
//       <Typography variant="h4" gutterBottom>Tracking Information</Typography>
//       {data.length === 0 ? (
//         <NoData />
//       ) : (
//         <Box sx={{ position: 'relative', mb: 6 }}>
//           <Divider sx={{ position: 'absolute', left: 6, height: '100%', width: '2px', backgroundColor: 'gray.200' }} />
//           <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
//             {data.map((item) => {
//               let iconClass = '';
//               let iconStyle = {};

//               switch (item.ship.shipStatus) {
//                 case 'Not Available':
//                   iconClass = 'icon-blur'; 
//                   break;
//                 case 'Departed':
//                   iconStyle = { textAlign: 'left' };
//                   break;
//                 case 'Ongoing':
//                   iconStyle = { textAlign: 'center' };
//                   break;
//                 case 'Arrived':
//                   iconClass = 'icon-arrived'; 
//                   break;
//                 default:
//                   iconStyle = {};
//                   break;
//               }

//               return (
//                 <Card key={item.applicationId} sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2, boxShadow: 3 }}>
//                   <CardHeader
//                     sx={{ display: 'flex', alignItems: 'center', flex: '0 0 auto', ...iconStyle }}
//                     title={<LocalShippingIcon className={iconClass} sx={{ fontSize: 40, color: 'primary.main' }} />}
//                     subheader={
//                       <Typography variant="body2" color="text.secondary">
//                         Last Updated: <time dateTime={item.lastUpdated}>{new Date(item.lastUpdated).toLocaleDateString()}</time>
//                       </Typography>
//                     }
//                   />
//                   <CardContent sx={{ flex: '1 1 auto' }}>
//                     <Typography variant="body3" color="text.primary">
//                       {item.ship.shipName} - {item.productName}
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary">
//                       Username: {item.user.username}
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary">
//                       Boarding Port : {item.ship.boardingPort}
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary">
//                       Departure Port : {item.ship.departurePort}
//                     </Typography>

                 
//                     <Typography variant="body2" color="text.secondary">
//                     Boarding Date: {new Date(item.ship.boardingDate).toLocaleDateString()}
//                     </Typography>

//                     <Typography variant="body2" color="text.secondary">
//                       Departured Date: {new Date(item.ship.departureDate).toLocaleDateString()}
//                     </Typography>
                   
//                     <Typography variant="body1" color="text.primary">
//                       {item.ship.shipStatus}
//                     </Typography>
//                   </CardContent>
//                   <CardActions sx={{ flex: '0 0 auto' }}>
//                     <IconButton>
//                       <LocalShippingIcon sx={{ fontSize: 30, color: 'primary.main' }} />
//                     </IconButton>
//                   </CardActions>
//                 </Card>
//               );
//             })}
//           </Box>
//         </Box>
//       )}
//     </Container>
//     </div>
//   );
// };

// export default Tracking;
