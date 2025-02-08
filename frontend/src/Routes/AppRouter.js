// import React from 'react';
// import { Routes, Route } from 'react-router-dom';

// import Home from '../pages/Home';
// import Login from '../components/Authentication/Login';
// import Register  from '../components/Authentication/Register';

// import UserSideBar from '../components/User/UserSideBar';
// import ShipPage from '../components/User/ShipPage';
// import ImpInvoice from '../components/User/ImpInvoice';
// import ExpInvoice from '../components/User/ExpInvoice';
// import ExpPayment from '../components/User/ExpPayment';
// import ImpPayment from '../components/User/ImpPayment';
// import TrackingPage from '../components/User/Tracking';

// import AdminSideBar from '../components/Admin/AdminSideBar';
// import AddOfficer from '../components/Admin/AddOfficer';

// import Entries from '../components/Admin/Entries';
// import ShipTracking from '../components/Admin/ShipTracking';
// import ShipManagement from '../components/Admin/ShipManagement';
// import Export from '../components/User/Exporter';
// import Import from '../components/User/Importer';

// import ExportNotify from '../components/Officer/ExportNotify';
// import Error from '../pages/Error';
// import ImportNotify from '../components/Officer/ImportNotify';

// import Ofzdashboard from '../components/Officer/OfzDashboard';
// import AnimatedText from '../components/User/AnimatedText';
// import CustomsSideBar from '../components/Officer/CustomsSideBar';

// import Dashboard from '../components/Admin/Dashboard';

// function AppRouter() {
//   return (
//     <Routes>

//       {/* Landing Page */}
//       <Route path="*" element={<Error />} />
//       <Route path='/' element={<Home />} />
//       <Route path='/register' element={<Register />} />
//       <Route path='/login' element={<Login />} />

//       {/* User Module */}
//       <Route path='/AnimatedText' element={ <> <UserSideBar/> <AnimatedText/> </>   } />
//       <Route path='/ShipPage' element={<><ShipPage/></>} />
//       <Route path='/user/import' element={<> <UserSideBar/> <Import/> </> } />
//       <Route path='/user/export' element={<> <UserSideBar/> <Export/> </>} />
//       <Route path='/ImpInvoice' element={<> <UserSideBar/> <ImpInvoice/> </> } />
//       <Route path='/exppayment' element={<> <UserSideBar/> <ExpPayment/> </> } />
//       <Route path='/ExpInvoice' element={<> <UserSideBar/> <ExpInvoice/> </>} />
//       <Route path='/imppayment' element={<> <UserSideBar/> <ImpPayment/> </> } />
//       <Route path='/tracking' element={<> <UserSideBar/> <TrackingPage/> </> } />

//       {/* Admin Module */}
//       <Route path="/admindashboard" element={<Dashboard />} />
      
//       {/* Customs Module */}
//       <Route path='/customsdashboard' element={ <> <CustomsSideBar/> <Ofzdashboard/> </>} />
//       <Route path='/ExportNotify' element={<> <CustomsSideBar/><ExportNotify/> </>} />
//       <Route path='/ImportNotify' element={<> <CustomsSideBar/><ImportNotify/> </>} />

//     </Routes>
//   );
// }

// export default AppRouter;
