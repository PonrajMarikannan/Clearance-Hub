import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faCreditCard, faBarcode } from '@fortawesome/free-solid-svg-icons';
import Bill from './Bill';
import SuccessModal from '../modal/SuccessModal';
import { Outlet } from 'react-router-dom';


const ImpPayment = () => {
    const navigate = useNavigate();

    const [paymentMethod, setPaymentMethod] = useState('Debitcard');
    const [formData, setFormData] = useState({
        amountPaid: '',
        paymentMethod: 'Debitcard',
        paymentStatus: 'Success',
        impInvoiceId: parseInt(sessionStorage.getItem("InvoiceId"), 10) || 0 
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [loadingSuccess, setLoadingSuccess] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        validateField(name, value);
    };

    const handlePaymentMethodChange = (e) => {
        const method = e.target.value;
        setPaymentMethod(method);
        setFormData({ ...formData, paymentMethod: method });
    };

    const validateField = (name, value) => {
        let error = '';
       
        switch (name) {
            case 'cardNumber':
                if (!/^\d{16}$/.test(value)) error = 'Card number must be 16 digits';
                break;
            case 'cardName':
                if (!value.trim()) error = 'Card name is required';
                break;
            case 'expiryDate':
                if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(value)) error = 'Expiry date must be in MM/YY format';
                else {
                    const [month, year] = value.split('/');
                    const expiry = new Date(`20${year}`, month - 1);
                    if (expiry < new Date()) error = 'Card has expired';
                }
                break;
            case 'cvv':
                if (!/^\d{3}$/.test(value)) error = 'CVV must be 3 digits';
                break;
            case 'upiId':
                if (!/^[\w\.-]+@[\w\.-]+$/.test(value)) error = 'Invalid UPI ID format';
                break;
            case 'amountPaid':
                if (!/^\d+(\.\d{1,2})?$/.test(value)) error = 'Amount must be a valid number';
                break;
            default:
                break;
        }
       
        setErrors({ ...errors, [name]: error });
    };

    const validateAllFields = () => {
        const newErrors = {};
        Object.keys(formData).forEach((field) => {
            if (field !== 'paymentMethod' && field !== 'paymentStatus' && field !== 'invoice_id') {
                validateField(field, formData[field]);
                if (errors[field]) newErrors[field] = errors[field];
            }
        });
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validateAllFields();
        if (Object.keys(newErrors).length === 0) {
            setLoading(true);
            try {
                console.log('Submitting form data:', formData);
                const response = await axios.post('http://localhost:7070/imppay', formData);
                console.log(response.data);

                setLoadingSuccess(true);
                setTimeout(() => {
                    setLoadingSuccess(false);
                    setShowModal(true);
                }, 2000); 
            } catch (error) {
                console.error('There was an error submitting the payment!', error);
                alert('Payment failed');
            } finally {
                setLoading(false);
            }
        } else {
            setErrors(newErrors);
        }
    };

    const handleModalClose = () => {
        setShowModal(false);
        navigate('/AnimatedText'); 
    };

    return (
        <div className="container mx-auto p-4 md:p-8">
            <div className="flex items-center mb-4">
                <button role='btn'
                    onClick={() => navigate(-1)}
                    className="bg-gradient-to-r from-teal-400 to-green-500 text-white px-3 py-1.5 rounded-lg shadow-lg hover:from-teal-500 hover:to-green-600 transition text-sm"
                >
                    <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
                    Go Back
                </button>
            </div>
            <h1 className="text-xl font-semibold mb-4 text-gray-800">Payment</h1>
            <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-6">
                <div className="lg:w-1/2 bg-gray-200 shadow-md rounded-lg p-4">
                    <h2 role="invoice" className="text-lg font-semibold mb-4 text-gray-700">
                        <FontAwesomeIcon icon={faBarcode} className="mr-2 text-green-600" />
                        Invoice Details
                    </h2>
                    <Bill />
                </div>
 
                <div className="lg:w-1/2 bg-white shadow-md rounded-lg p-4">
                    <h2 role="form-head" className="text-lg font-semibold mb-4 text-gray-700">
                        <FontAwesomeIcon icon={faCreditCard} className="mr-2 text-teal-600" />
                        Payment Form
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-3">
                        <div>
                            <label role="paymethod" className="block text-sm font-medium mb-1">Payment Method</label>
                            <select
                                className="block w-full p-1.5 border border-gray-300 rounded-lg text-sm"
                                value={paymentMethod}
                                onChange={handlePaymentMethodChange}
                            >
                                <option value="Debitcard">Credit/Debit Card</option>
                                <option value="upi">UPI</option>
                            </select>
                        </div>
 
                        {paymentMethod === 'Debitcard' && (
                            <>
                                <div>
                                    <label role="cardno" className="block text-sm font-medium mb-1">Card Number</label>
                                    <input
                                        type="text"
                                        name="cardNumber"
                                        value={formData.cardNumber}
                                        onChange={handleInputChange}
                                        className={`block w-full p-1.5 border ${errors.cardNumber ? 'border-red-500' : 'border-gray-300'} rounded-lg text-sm`}
                                        placeholder="1234 5678 9012 3456"
                                        maxLength="16"
                                        required
                                    />
                                    {errors.cardNumber && <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>}
                                </div>
                                <div>
                                    <label role="cardname" className="block text-sm font-medium mb-1">Card Name</label>
                                    <input
                                        type="text"
                                        name="cardName"
                                        value={formData.cardName}
                                        onChange={handleInputChange}
                                        className={`block w-full p-1.5 border ${errors.cardName ? 'border-red-500' : 'border-gray-300'} rounded-lg text-sm`}
                                        placeholder="Ponraj"
                                        required
                                    />
                                    {errors.cardName && <p className="text-red-500 text-xs mt-1">{errors.cardName}</p>}
                                </div>
                                <div className="flex space-x-2">
                                    <div className="w-1/2">
                                        <label  role="expdate" className="block text-sm font-medium mb-1">Expiry Date</label>
                                        <input
                                            type="text"
                                            name="expiryDate"
                                            value={formData.expiryDate}
                                            onChange={handleInputChange}
                                            className={`block w-full p-1.5 border ${errors.expiryDate ? 'border-red-500' : 'border-gray-300'} rounded-lg text-sm`}
                                            placeholder="MM/YY"
                                            maxLength="5"
                                            required
                                        />
                                        {errors.expiryDate && <p className="text-red-500 text-xs mt-1">{errors.expiryDate}</p>}
                                    </div>
                                    <div className="w-1/2">
                                        <label role="cvv" className="block text-sm font-medium mb-1">CVV</label>
                                        <input
                                            type="password"
                                            name="cvv"
                                            value={formData.cvv}
                                            onChange={handleInputChange}
                                            className={`block w-full p-1.5 border ${errors.cvv ? 'border-red-500' : 'border-gray-300'} rounded-lg text-sm`}
                                            placeholder="123"
                                            maxLength="3"
                                            required
                                        />
                                        {errors.cvv && <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>}
                                    </div>
                                </div>
                            </>
                        )}
 
                        {paymentMethod === 'upi' && (
                            <div>
                                <label className="block text-sm font-medium mb-1">UPI ID</label>
                                <input
                                    type="text"
                                    name="upiId"
                                    value={formData.upiId}
                                    onChange={handleInputChange}
                                    className={`block w-full p-1.5 border ${errors.upiId ? 'border-red-500' : 'border-gray-300'} rounded-lg text-sm`}
                                    placeholder="example@upi"
                                    required
                                />
                                {errors.upiId && <p className="text-red-500 text-xs mt-1">{errors.upiId}</p>}
                            </div>
                        )}

                        <div>
                            <label role="amnt" className="block text-sm font-medium mb-1">Amount Paid</label>
                            <input
                                type="text"
                                name="amountPaid"
                                value={formData.amountPaid}
                                onChange={handleInputChange}
                                className={`block w-full p-1.5 border ${errors.amountPaid ? 'border-red-500' : 'border-gray-300'} rounded-lg text-sm`}
                                placeholder="100.00"
                                required
                            />
                            {errors.amountPaid && <p className="text-red-500 text-xs mt-1">{errors.amountPaid}</p>}
                        </div>
 
                        <button role="btn-submit"
                            type="submit"
                            className={`bg-teal-600 text-white px-3 py-1.5 rounded-lg shadow-lg hover:bg-teal-700 transition text-sm ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={loading}
                        >
                            {loading ? 'Submitting...' : 'Submit Payment'}
                        </button>
                    </form>
                </div>
            </div>
            {loadingSuccess && <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center">
                <div className="animate-spin h-16 w-16 border-4 border-t-4 border-white rounded-full"></div>
            </div>}
            {showModal && <SuccessModal onClose={handleModalClose} />}
            <div className="flex-1 ml-72 p-4 bg-gray-100">
        
        <Outlet />
      </div>
        </div>
    );
};

export default ImpPayment;
