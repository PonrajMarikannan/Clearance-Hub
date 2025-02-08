import React, { useState } from 'react';
import ShipManagement from './ShipManagement';
import Card from './Card';
import OfficerManagement from './OfficerManagement';
import Track from './Track';
import Navbar from './Navbar';

const Dashboard = () => {

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card/>
        {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
           <ShipManagement/>
           <OfficerManagement/>
        </div>
        <Track/> */}
      </main>
    </div>
  );
};

export default Dashboard;