import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const PasswordChangeModal = ({ isOpen, onClose }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    console.log(data);
    
    const userId = sessionStorage.getItem('UserId');
    const payload = {
      userId,
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
      confirmNewPassword: data.confirmNewPassword
    };

    console.log(payload);

    try {

      const response = await axios.put('http://localhost:7070/auth/updatePass', null, {
        params: payload,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      if(response.data==="Success") {
        alert('Password changed Successfully');
        onClose();
      }

    } catch (err) {
      alert('Failed to change password. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-xl font-semibold mb-4">Change Password</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Current Password</label>
            <input
              type="password"
              {...register('currentPassword', { required: 'Current password is required' })}
              className={`w-full px-3 py-2 border rounded-lg ${errors.currentPassword ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.currentPassword && <p className="text-red-500 text-sm">{errors.currentPassword.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">New Password</label>
            <input
              type="password"
              {...register('newPassword', { required: 'New password is required' })}
              className={`w-full px-3 py-2 border rounded-lg ${errors.newPassword ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.newPassword && <p className="text-red-500 text-sm">{errors.newPassword.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Confirm New Password</label>
            <input
              type="password"
              {...register('confirmNewPassword', {
                required: 'Please confirm your new password',
                validate: (value, { newPassword }) => value === newPassword || 'Passwords do not match',
              })}
              className={`w-full px-3 py-2 border rounded-lg ${errors.confirmNewPassword ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.confirmNewPassword && <p className="text-red-500 text-sm">{errors.confirmNewPassword.message}</p>}
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              {isSubmitting ? 'Changing...' : 'Change Password'}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default PasswordChangeModal;
