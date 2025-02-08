import React, { useState } from 'react';

const AddShipModal = ({ isOpen, handleClose, handleSubmit, newShipData, setNewShipData }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white rounded-lg p-6 max-w-lg">
        <h2 className="text-lg font-semibold">Add Ship</h2>
        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <label className="block mb-1">Ship Name</label>
            <input 
              type="text" 
              value={newShipData.shipName} 
              onChange={(e) => setNewShipData({ ...newShipData, shipName: e.target.value })} 
              className="border border-gray-300 rounded-md w-full p-2"
              required
            />
          </div>
          <div className="mt-4">
            <label className="block mb-1">Boarding Date</label>
            <input 
              type="date" 
              value={newShipData.boardingDate} 
              onChange={(e) => setNewShipData({ ...newShipData, boardingDate: e.target.value })} 
              className="border border-gray-300 rounded-md w-full p-2"
              required
            />
          </div>
          <div className="mt-4">
            <label className="block mb-1">Arrival Date</label>
            <input 
              type="date" 
              value={newShipData.arrivalDate} 
              onChange={(e) => setNewShipData({ ...newShipData, arrivalDate: e.target.value })} 
              className="border border-gray-300 rounded-md w-full p-2"
              required
            />
          </div>
          <div className="mt-4">
            <label className="block mb-1">Boarding Port</label>
            <input 
              type="text" 
              value={newShipData.boardingPort} 
              onChange={(e) => setNewShipData({ ...newShipData, boardingPort: e.target.value })} 
              className="border border-gray-300 rounded-md w-full p-2"
              required
            />
          </div>
          <div className="mt-4">
            <label className="block mb-1">Arrival Port</label>
            <input 
              type="text" 
              value={newShipData.departurePort} 
              onChange={(e) => setNewShipData({ ...newShipData, departurePort: e.target.value })} 
              className="border border-gray-300 rounded-md w-full p-2"
              required
            />
          </div>
          <div className="mt-4">
            <label className="block mb-1">Max Capacity</label>
            <input 
              type="number" 
              value={newShipData.maxCapacity} 
              onChange={(e) => setNewShipData({ ...newShipData, maxCapacity: e.target.value })} 
              className="border border-gray-300 rounded-md w-full p-2"
              required
            />
          </div>
          <div className="mt-4">
            <label className="block mb-1">Current Load</label>
            <input 
              type="number" 
              value={newShipData.currentLoad} 
              onChange={(e) => setNewShipData({ ...newShipData, currentLoad: e.target.value })} 
              className="border border-gray-300 rounded-md w-full p-2"
              required
            />
          </div>
          <div className="mt-4">
            <label className="block mb-1">Status</label>
            <select 
              value={newShipData.shipStatus} 
              onChange={(e) => setNewShipData({ ...newShipData, shipStatus: e.target.value })} 
              className="border border-gray-300 rounded-md w-full p-2"
            >
              <option value="Docked">Docked</option>
              <option value="In Transit">In Transit</option>
              <option value="Arrived">Arrived</option>
              <option value="Maintenance">Maintenance</option>
            </select>
          </div>
          <div className="mt-6 flex justify-end">
            <button type="button" onClick={handleClose} className="text-gray-500 mr-2">Cancel</button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddShipModal;