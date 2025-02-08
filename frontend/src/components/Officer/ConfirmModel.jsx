import React from 'react';

function ConfirmationModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
      <div className="bg-white p-4 rounded shadow-lg">
        <h2 role='confirm' className="text-xl mb-4">Confirm Action</h2>
        <p role='changes' className="mb-4">Are you sure you want to save the changes?</p>
        <div className="flex justify-end">
          <button role="cancel"
            onClick={onClose}
            className="mr-2 bg-gray-300 hover:bg-gray-400 text-white py-1 px-3 rounded"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-3 rounded"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
