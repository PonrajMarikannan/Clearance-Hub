import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Avatar,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { Home, Dashboard, TrackChanges, ExitToApp, DirectionsBoat } from '@mui/icons-material';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import customs from '../../assets/customs.png'; 
import notificationsGif from '../../assets/bell.gif';

const OfficerPanel = () => {
  const [openProfileDialog, setOpenProfileDialog] = useState(false);
  const [userDetails, setUserDetails] = useState({
    username: 'CustomsOfficer',
    email: 'officer@example.com',
    phone: '123-456-7890',
  });

  const navigate = useNavigate();

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm')); 
  const isExtraSmallScreen = useMediaQuery('(max-width:425px)'); 

  const handleProfileIconClick = () => {
    setOpenProfileDialog(true);
  };

  const handleCloseProfileDialog = () => {
    setOpenProfileDialog(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails(prevDetails => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSave = () => {
    console.log('Saved user details:', userDetails);
    handleCloseProfileDialog();
  };

  const id = sessionStorage.getItem('UserId');

  useEffect(() => {
    if (id === null) {
      navigate('/');
    }
  }, [id, navigate]);

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/');
  };

  return (
    <Box className="flex h-screen overflow-hidden">
      <Box
        className={`${
          isExtraSmallScreen ? 'w-16' : isSmallScreen ? 'w-52' : 'w-64'
        } bg-gray-800 text-white border-r border-gray-700 transition-width duration-300 ease-in-out flex flex-col overflow-auto fixed top-0 left-0 h-full z-40 p-2`}
      >
        <Typography
          variant="h6"
          className={`mb-4 text-center ${isExtraSmallScreen ? 'hidden' : 'block'}`}
        >
          Customs Officer
        </Typography>
        <List>
          <ListItem button component={Link} to="OfzDashboard" className="text-gray-300 hover:bg-gray-700 mb-2">
            <Dashboard className={`mr-2 ${isExtraSmallScreen ? 'text-2xl' : 'text-xl'}`} />
            <ListItemText primary="Dashboard" className={` ${isExtraSmallScreen ? 'hidden' : 'block'}`} />
          </ListItem>
          <ListItem button component={Link} to="ImportNotify" className="text-gray-300 hover:bg-gray-700 mb-2">
            <img src={notificationsGif} 
              alt="Notifications" 
              className={`w-${isExtraSmallScreen ? '5' : '6'} h-${isExtraSmallScreen ? '5' : '6'} mr-2`} 
            />
            <ListItemText primary="Importer Notifications" className={` ${isExtraSmallScreen ? 'hidden' : 'block'}`} />
          </ListItem>
          <ListItem button component={Link} to="ExportNotify" className="text-gray-300 hover:bg-gray-700 mb-2">
            <img src={notificationsGif} 
              alt="Notifications" 
              className={`w-${isExtraSmallScreen ? '5' : '6'} h-${isExtraSmallScreen ? '5' : '6'} mr-2`} 
            />
            <ListItemText primary="Exporter Notifications" className={` ${isExtraSmallScreen ? 'hidden' : 'block'}`} />
          </ListItem>
         
          <Divider className="my-2 bg-gray-700" />
          <ListItem button onClick={handleLogout} className="text-gray-300 hover:bg-gray-700">
            <ExitToApp className={`mr-2 ${isExtraSmallScreen ? 'text-2xl' : 'text-xl'}`} />
            <ListItemText primary="Logout" className={` ${isExtraSmallScreen ? 'hidden' : 'block'}`} />
          </ListItem>
        </List>
      </Box>

      <Box className={`flex-1 flex flex-col ${isExtraSmallScreen ? 'ml-16' : 'ml-64'}`}>
        <Box
          className="bg-blue-600 text-white p-4 flex justify-between items-center border-b border-gray-700 sticky top-0 z-30 shadow-md"
        >
          <Typography variant="h6">Officer Panel</Typography>
          <IconButton
            color="inherit"
            onClick={handleProfileIconClick}
            className="hover:bg-transparent text-white"
          >
            <Avatar
              className="w-14 h-14"
              src={customs}
              alt="User Profile"
            />
          </IconButton>
        </Box>

        <Box
          className="flex-1 p-4 overflow-y-auto bg-gray-100"
        >
          <Outlet />
        </Box>
      </Box>

      <Dialog open={openProfileDialog} onClose={handleCloseProfileDialog}>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Username"
            name="username"
            type="text"
            fullWidth
            variant="outlined"
            value={userDetails.username}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Email"
            name="email"
            type="email"
            fullWidth
            variant="outlined"
            value={userDetails.email}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Phone Number"
            name="phone"
            type="tel"
            fullWidth
            variant="outlined"
            value={userDetails.phone}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseProfileDialog}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default OfficerPanel;
