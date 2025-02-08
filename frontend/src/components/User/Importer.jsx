// import React, { useState, useEffect } from 'react';
// import {
//   Button,
//   Box,
//   TextField,
//   Typography,
//   Container,
//   Grid,
//   CircularProgress,
//   FormControl,
//   Paper,Input,
//   InputLabel,
//   FormHelperText,
//   IconButton,
//   InputAdornment,
//   styled
// } from '@mui/material';
// import { useLocation, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import AttachFileIcon from '@mui/icons-material/AttachFile'; 
// import ArrowBackIcon from '@mui/icons-material/ArrowBack'; 

// const CustomButton = styled(Button)(({ theme }) => ({
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
//   borderRadius: theme.shape.borderRadius,
//   padding: theme.spacing(1, 2),
//   borderColor: theme.palette.primary.main,
//   color: theme.palette.primary.main,
//   border: `1px solid ${theme.palette.primary.main}`,
//   '&:hover': {
//     backgroundColor: theme.palette.primary.main,
//     color: theme.palette.common.white,
//     borderColor: theme.palette.primary.main,
//   },
// }));

// const ImporterApplicationForm = () => {
//   const location = useLocation();
//   const { shipId, userId } = location.state || {};
//   const UserId = sessionStorage.getItem("UserId");
//   const navigate = useNavigate();


//   const [formData, setFormData] = useState({
//     importerName: '',
//     importerEmail: '',
//     impPhnum: '',
//     exporterName: '',
//     exporterEmail: '',
//     expPhnum: '',
//     productName: '',
//     productDescription: '',
//     weight: '',
//     arrivalCountry: '',
//   });

//   const [file, setFile] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [formSubmitted, setFormSubmitted] = useState(false);

//   useEffect(() => {
//     console.log(`Ship ID: ${shipId}, User ID: ${UserId}`);
//   }, [shipId, UserId]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');

//     const formDataToSend = new FormData();
//     Object.keys(formData).forEach((key) => {
//       formDataToSend.append(key, formData[key]);
//     });
//     formDataToSend.append('userId', UserId);
//     formDataToSend.append('shipId', shipId);
//     if (file) {
//       formDataToSend.append('file', file);
//     }

//     try {
//       const response = await axios.post('http://localhost:7070/importapp', formDataToSend, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       console.log(response.data);
//       setFormSubmitted(true);
//     } catch (error) {
//       console.error(error);
//       setError('Failed to submit the form. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className='ml-64 py-2.5'>
//     <Container maxWidth="sm">
//       <Box
//         my={4}
//         p={2}
//         component={Paper}
//         elevation={3}
//         sx={{
//           maxWidth: 600,
//           mx: 'auto',
//           px: 3,
//           py: 4,
//           backgroundColor: '#fafafa',
//           position: 'relative'
//         }}
//       >

// <IconButton
//           onClick={() => navigate(-1)}
//           color="primary"
//           sx={{
//             position: 'absolute',
//             top: 16,
//             left: 16,
//             zIndex: 1
//           }}
//         >
//           <ArrowBackIcon />
//         </IconButton>


//         <Typography variant="h5" gutterBottom align="center" color="primary" sx={{ mb: 2 }}>
//         Importer Application Form 
//         </Typography>
//         {!formSubmitted ? (
//           <form onSubmit={handleSubmit}>
//             <Grid container spacing={2}>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   label="Importer Name"
//                   name="importerName"
//                   value={formData.importerName}
//                   onChange={handleChange}
//                   required
//                   variant="outlined"
//                   size="small"
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   label="Importer Email"
//                   name="importerEmail"
//                   type="email"
//                   value={formData.importerEmail}
//                   onChange={handleChange}
//                   required
//                   variant="outlined"
//                   size="small"
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   fullWidth
//                   label="Importer Phone Number"
//                   name="impPhnum"
//                   value={formData.impPhnum}
//                   onChange={handleChange}
//                   required
//                   variant="outlined"
//                   size="small"
//                 />
//               </Grid>

//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   label="Exporter Name"
//                   name="exporterName"
//                   value={formData.exporterName}
//                   onChange={handleChange}
//                   required
//                   variant="outlined"
//                   size="small"
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   label="Exporter Email"
//                   name="exporterEmail"
//                   type="email"
//                   value={formData.exporterEmail}
//                   onChange={handleChange}
//                   required
//                   variant="outlined"
//                   size="small"
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   fullWidth
//                   label="Exporter Phone Number"
//                   name="expPhnum"
//                   value={formData.expPhnum}
//                   onChange={handleChange}
//                   required
//                   variant="outlined"
//                   size="small"
//                 />
//               </Grid>

//               <Grid item xs={12}>
//                 <TextField
//                   fullWidth
//                   label="Product Name"
//                   name="productName"
//                   value={formData.productName}
//                   onChange={handleChange}
//                   required
//                   variant="outlined"
//                   size="small"
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   fullWidth
//                   label="Product Description"
//                   name="productDescription"
//                   value={formData.productDescription}
//                   onChange={handleChange}
//                   required
//                   variant="outlined"
//                   multiline
//                   rows={3}
//                   size="small"
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   label="Weight (tons)"
//                   name="weight"
//                   type="number"
//                   value={formData.weight}
//                   onChange={handleChange}
//                   required
//                   variant="outlined"
//                   size="small"
//                   InputProps={{ inputProps: { min: 0 } }}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   label="Arrival Country "
//                   name="arrivalCountry"
//                   value={formData.arrivalCountry}
//                   onChange={handleChange}
//                   required
//                   variant="outlined"
//                   size="small"
//                 />
//               </Grid>

//               <Grid item xs={12} container spacing={2} alignItems="center">
//                 <Grid item xs={12} sm={6} container justifyContent="center">
//                   <FormControl fullWidth variant="outlined" size="small">
//                     <InputLabel htmlFor="file-upload">Upload Document</InputLabel>
//                     <Input
//                       id="file-upload"
//                       type="file"
//                       onChange={handleFileChange}
//                       inputProps={{ accept: 'application/pdf, image/*' }}
//                       required
//                       startAdornment={
//                         <InputAdornment position="start">
//                           <IconButton edge="start" color="primary" aria-label="upload">
//                             <AttachFileIcon />
//                           </IconButton>
//                         </InputAdornment>
//                       }
//                       sx={{
//                         borderRadius: 1,
//                         '& .MuiInputBase-input': {
//                           padding: '10px',
//                         },
//                         '& .MuiInputBase-root': {
//                           borderColor: 'primary.main',
//                         },
//                       }}
//                     />
//                     <FormHelperText>PDF or image file</FormHelperText>
//                   </FormControl>
//                 </Grid>
//                 <Grid item xs={12} sm={6} container justifyContent="flex-end">
//                   <CustomButton
//                     type="submit"
//                     variant="outlined"
//                     disabled={loading}
//                     sx={{ mt: 2 }}
//                   >
//                     {loading ? <CircularProgress size={24} color="inherit" /> : 'Submit'}
//                   </CustomButton>
//                 </Grid>
//               </Grid>
//             </Grid>
//           </form>
//         ) : (
//           <Box textAlign="center">
//             <Typography variant="h6" gutterBottom color="success.main">
//               Form submitted successfully!
//             </Typography>
//           </Box>
//         )}
//         {error && <Typography color="error" align="center" mt={2}>{error}</Typography>}
//       </Box>
//     </Container>
//     </div>
//   );
// };

// export default ImporterApplicationForm;
