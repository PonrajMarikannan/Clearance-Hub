import React, { useState } from 'react';

const OtpPage = ({ onCancel, onVerify, setToken, otpErrors }) => {
    const [otp, setOtp] = useState('');

    const handleInputChange = (e) => {
        setOtp(e.target.value);
    };

    const handleVerifyClick = () => {
        if (otp.trim()) {
            setToken(otp);
            onVerify();
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <h2 className="text-lg font-semibold mb-4">Verify OTP</h2>
                <input
                    type="text"
                    value={otp}
                    onChange={handleInputChange}
                    className="block w-full p-2 border border-gray-300 rounded-lg mb-4"
                    placeholder="Enter OTP"
                />
                {otpErrors && <p className="text-red-500 mb-2">{otpErrors}</p>}
                <button
                    onClick={handleVerifyClick}
                    className="bg-gradient-to-r from-teal-400 to-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:from-teal-500 hover:to-green-600 transition"
                >
                    Verify OTP
                </button>
                <button
                    onClick={onCancel}
                    className="ml-4 bg-gray-300 text-gray-800 px-4 py-2 rounded-lg shadow-md hover:bg-gray-400 transition"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default OtpPage;
