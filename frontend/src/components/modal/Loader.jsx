// import React, { useEffect } from 'react';
// import { Box, CircularProgress, Typography } from '@mui/material';
// import LocalShippingIcon from '@mui/icons-material/LocalShipping';

// const Loader = ({ onClose }) => {
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       if (onClose) onClose(); 
//     }, 6000);
//     return () => clearTimeout(timer); 
//   }, [onClose]);

//   return (
//     <Box
//       sx={{
//         position: 'fixed',
//         top: 0,
//         left: 0,
//         width: '100vw',
//         height: '100vh',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         backgroundColor: 'rgba(0, 0, 0, 0.5)', 
//         backdropFilter: 'blur(5px)', 
//         zIndex: 9999 
//       }}
//     >
//       <Box
//         sx={{
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center',
//           justifyContent: 'center',
//           backgroundColor: 'white',
//           borderRadius: '8px',
//           padding: '20px',
//           boxShadow: 3
//         }}
//       >
//         <LocalShippingIcon sx={{ fontSize: 80, color: 'primary.main' }} />
//         <CircularProgress sx={{ marginTop: 2 }} />
//         <Typography variant="h6" sx={{ marginTop: 2 }}>
//           Processing Payment...
//         </Typography>
//       </Box>
//     </Box>
//   );
// };

// export default Loader;
