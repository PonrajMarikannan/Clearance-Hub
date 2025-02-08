import React, { useState } from 'react';

const ConfirmDeleteModal = ({ isOpen, handleClose, handleDeleteShip, shipId }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white rounded-lg p-6 max-w-lg">
        <h2 className="text-lg font-semibold">Confirm Delete</h2>
        <p>Are you sure you want to delete the ship with ID {shipId}?</p>
        <div className="mt-6 flex justify-end">
          <button type="button" onClick={handleClose} className="text-gray-500 mr-2">Cancel</button>
          <button type="button" onClick={() => handleDeleteShip(shipId)} className="bg-red-500 text-white px-4 py-2 rounded-lg">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;