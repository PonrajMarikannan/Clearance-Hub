// import React, { useState } from 'react';
// import {
//   Button,
//   Box,
//   TextField,
//   Typography,
//   Container,
//   Grid,
//   CircularProgress,
//   FormControl,
//   Paper,
//   Input,
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
// import { Formik, Field, Form, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css'; 

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


// const validationSchema = Yup.object({
//   importerName: Yup.string().matches(/^[A-Za-z\s]+$/, 'Only letters and spaces are allowed').required('Importer Name is required'),
//   importerEmail: Yup.string().email('Invalid email address').required('Importer Email is required'),
//   impPhnum: Yup.string().matches(/^\+?\d{1,4}?[-.\s]?\(?\d{1,5}?\)?[-.\s]?\d{1,5}[-.\s]?\d{1,9}$/, 'Invalid phone number').required('Importer Phone Number is required'),
//   exporterName: Yup.string().matches(/^[A-Za-z\s]+$/, 'Only letters and spaces are allowed').required('Exporter Name is required'),
//   exporterEmail: Yup.string().email('Invalid email address').required('Exporter Email is required'),
//   expPhnum: Yup.string().matches(/^\+?\d{1,4}?[-.\s]?\(?\d{1,5}?\)?[-.\s]?\d{1,5}[-.\s]?\d{1,9}$/, 'Invalid phone number').required('Exporter Phone Number is required'),
//   productName: Yup.string().matches(/^[A-Za-z0-9\s]+$/, 'Only letters, numbers, and spaces are allowed').required('Product Name is required'),
//   productDescription: Yup.string().matches(/^[A-Za-z0-9\s,.'-]+$/, 'Invalid characters in product description').required('Product Description is required'),
//   weight: Yup.number().positive('Weight must be a positive number').required('Weight is required'),
//   destinationCountry: Yup.string().matches(/^[A-Za-z\s]+$/, 'Only letters and spaces are allowed').required('Destination Country is required'),
// });

// const ExporterApplicationForm = () => {
//   const location = useLocation();
//   const { shipId, userId } = location.state || {};
//   const navigate = useNavigate();

//   const UserId = sessionStorage.getItem("UserId");
//   const [file, setFile] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleSubmit = async (values, { setSubmitting }) => {
//     setLoading(true);
//     setError('');

//     const formDataToSend = new FormData();
//     Object.keys(values).forEach((key) => {
//       formDataToSend.append(key, values[key]);
//     });
//     formDataToSend.append('userId', UserId);
//     formDataToSend.append('shipId', shipId);
//     if (file) {
//       formDataToSend.append('file', file);
//     }

//     try {
//       const response = await axios.post('http://localhost:7070/exportapp', formDataToSend, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       console.log(response.data);
//       toast.success('Form submitted successfully!', {
//         position: "top-right",
//         autoClose: 5000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//       });
//     } catch (error) {
//       console.error(error);
//       setError('Failed to submit the form. Please try again.');
//       toast.error('Failed to submit the form. Please try again.', {
//         position: "top-right",
//         autoClose: 5000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//       });
//     } finally {
//       setLoading(false);
//       setSubmitting(false);
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
//         <IconButton
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
//           Exporter Application Form
//         </Typography>

//         <Formik
//           initialValues={{
//             importerName: '',
//             importerEmail: '',
//             impPhnum: '',
//             exporterName: '',
//             exporterEmail: '',
//             expPhnum: '',
//             productName: '',
//             productDescription: '',
//             weight: '',
//             destinationCountry: '',
//             shipmentDate: '',
//           }}
//           validationSchema={validationSchema}
//           onSubmit={handleSubmit}
//         >
//           {({ isSubmitting }) => (
//             <Form>
//               <Grid container spacing={2}>
               
//                 <Grid item xs={12} sm={6}>
//                   <Field
//                     name="importerName"
//                     as={TextField}
//                     fullWidth
//                     label="Importer Name"
//                     variant="outlined"
//                     size="small"
//                   />
//                   <ErrorMessage name="importerName" component="div" style={{ color: 'red' }} />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <Field
//                     name="importerEmail"
//                     as={TextField}
//                     fullWidth
//                     label="Importer Email"
//                     type="email"
//                     variant="outlined"
//                     size="small"
//                   />
//                   <ErrorMessage name="importerEmail" component="div" style={{ color: 'red' }} />
//                 </Grid>
//                 <Grid item xs={12}>
//                   <Field
//                     name="impPhnum"
//                     as={TextField}
//                     fullWidth
//                     label="Importer Phone Number"
//                     variant="outlined"
//                     size="small"
//                   />
//                   <ErrorMessage name="impPhnum" component="div" style={{ color: 'red' }} />
//                 </Grid>

//                 <Grid item xs={12} sm={6}>
//                   <Field
//                     name="exporterName"
//                     as={TextField}
//                     fullWidth
//                     label="Exporter Name"
//                     variant="outlined"
//                     size="small"
//                   />
//                   <ErrorMessage name="exporterName" component="div" style={{ color: 'red' }} />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <Field
//                     name="exporterEmail"
//                     as={TextField}
//                     fullWidth
//                     label="Exporter Email"
//                     type="email"
//                     variant="outlined"
//                     size="small"
//                   />
//                   <ErrorMessage name="exporterEmail" component="div" style={{ color: 'red' }} />
//                 </Grid>
//                 <Grid item xs={12}>
//                   <Field
//                     name="expPhnum"
//                     as={TextField}
//                     fullWidth
//                     label="Exporter Phone Number"
//                     variant="outlined"
//                     size="small"
//                   />
//                   <ErrorMessage name="expPhnum" component="div" style={{ color: 'red' }} />
//                 </Grid>

//                 <Grid item xs={12}>
//                   <Field
//                     name="productName"
//                     as={TextField}
//                     fullWidth
//                     label="Product Name"
//                     variant="outlined"
//                     size="small"
//                   />
//                   <ErrorMessage name="productName" component="div" style={{ color: 'red' }} />
//                 </Grid>
//                 <Grid item xs={12}>
//                   <Field
//                     name="productDescription"
//                     as={TextField}
//                     fullWidth
//                     label="Product Description"
//                     variant="outlined"
//                     multiline
//                     rows={3}
//                     size="small"
//                   />
//                   <ErrorMessage name="productDescription" component="div" style={{ color: 'red' }} />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <Field
//                     name="weight"
//                     as={TextField}
//                     fullWidth
//                     label="Weight (tons)"
//                     type="number"
//                     variant="outlined"
//                     size="small"
//                     InputProps={{ inputProps: { min: 0 } }}
//                   />
//                   <ErrorMessage name="weight" component="div" style={{ color: 'red' }} />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <Field
//                     name="destinationCountry"
//                     as={TextField}
//                     fullWidth
//                     label="Destination Country"
//                     variant="outlined"
//                     size="small"
//                   />
//                   <ErrorMessage name="destinationCountry" component="div" style={{ color: 'red' }} />
//                 </Grid>

//                 <Grid item xs={12} container spacing={2} alignItems="center">
//                   <Grid item xs={12} sm={6} container justifyContent="center">
//                     <FormControl fullWidth variant="outlined" size="small">
//                       <InputLabel htmlFor="file-upload">Upload Document</InputLabel>
//                       <Input
//                         id="file-upload"
//                         type="file"
//                         onChange={handleFileChange}
//                         inputProps={{ accept: 'application/pdf, image/*' }}
//                         startAdornment={
//                           <InputAdornment position="start">
//                             <IconButton edge="start" color="primary" aria-label="upload">
//                               <AttachFileIcon />
//                             </IconButton>
//                           </InputAdornment>
//                         }
//                         sx={{
//                           borderRadius: 1,
//                           '& .MuiInputBase-input': {
//                             padding: '10px',
//                           },
//                           '& .MuiInputBase-root': {
//                             borderColor: 'primary.main',
//                           },
//                         }}
//                       />
//                       <FormHelperText>PDF or image file</FormHelperText>
//                     </FormControl>
//                   </Grid>
//                   <Grid item xs={12} sm={6} container justifyContent="flex-end">
//                     <CustomButton
//                       type="submit"
//                       variant="outlined"
//                       disabled={isSubmitting || loading}
//                       sx={{ mt: 2 }}
//                     >
//                       {loading ? <CircularProgress size={24} color="inherit" /> : 'Submit'}
//                     </CustomButton>
//                   </Grid>
//                 </Grid>
//               </Grid>
//             </Form>
//           )}
//         </Formik>

//         <ToastContainer />

//         {error && <Typography color="error" align="center" mt={2}>{error}</Typography>}
//       </Box>
//     </Container>
//     </div>
//   );
// };

// export default ExporterApplicationForm;
