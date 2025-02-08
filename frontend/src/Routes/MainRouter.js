import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Error from '../pages/Error'
import Register from '../components/Authentication/Register'
import Login from '../components/Authentication/Login'
import Dashboard from '../components/Admin/Dashboard'
import Home from '../components/LandingPage/Home'
import ShipManagement from '../components/Admin/ShipManagement'
import Navbar from '../components/Admin/Navbar'
import OfficerManagement from '../components/Admin/OfficerManagement'
import Track from '../components/Admin/Track'

import Ofzdashboard from '../components/Officer/OfzDashboard';
import NavbarOfz from '../components/Officer/Navbar';
import ViewShip from '../components/Officer/ViewShip';
import ImportRequest from '../components/Officer/ImportRequest';
import ExportRequest from '../components/Officer/ExportRequest';

function MainRouter() {
  return (
    <Routes>
         {/* Landing Page */}
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path="*" element={<Error />} />

        {/* Admin Module */}
        <Route path="/admindashboard" element={<Dashboard />} />
        <Route path="/ShipManagement" element={<><Navbar/>  <ShipManagement/> </>} />
        <Route path="/OfficerManagement" element={<><Navbar/>  <OfficerManagement/> </>} />
        <Route path="/Track" element={<><Navbar/>  <Track/> </>} />

        {/* Officer Module */}
        <Route path='/customsdashboard' element={ <> <NavbarOfz/> <Ofzdashboard/> </>} />
        <Route path='/viewShip' element={ <> <NavbarOfz/> <ViewShip/> </>} />
       <Route path='/ExportRequest' element={<> <NavbarOfz/> <ExportRequest/> </>} />
       <Route path='/ImportRequest' element={<> <NavbarOfz/> <ImportRequest/> </>} />

    </Routes>
  )
}

export default MainRouter
