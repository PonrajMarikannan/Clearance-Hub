import React, { useEffect } from 'react';

const SuccessModal = ({ onClose }) => {
  useEffect(() => {
    localStorage.setItem("PaymentStatus","Success");
    const timer = setTimeout(() => {
      onClose(); 
    }, 2000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 text-center animate-fadeIn">
        <h2 className="text-2xl font-semibold mb-4 text-green-600">Payment Successful!</h2>
        <p className="text-gray-700 mb-4">Your payment was processed successfully.</p>
      </div>
    </div>
  );
};

export default SuccessModal;
