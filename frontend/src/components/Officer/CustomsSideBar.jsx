import React, {  useEffect, useState } from 'react';
import { Link,  useNavigate } from 'react-router-dom';
import man from '../../assets/man.png';
import PasswordChangeModal from '../modal/PasswordChangeModal';
import axios from 'axios';

function OfficerSideBar() {

  const [isModalOpen, setIsModalOpen] = useState(false);


  const navigate = useNavigate();
    
      const id = sessionStorage.getItem('UserId');
      // const [data, setData] = useState([]);

      useEffect(() => {
        
        if (id === null) {
          navigate('/');
        }
      }, [id, navigate]);
    
      const handleLogout = () => {
        sessionStorage.clear();
        if (id === null) {
          navigate('/');
        }
      };

      const handlePassword = async (event) => {
        event.preventDefault();
      
        try {
          // Replace `id` with the actual user ID you want to pass
          const response = await axios.get(`http://localhost:7070/auth/${id}`);
          console.log(response.data);
          setIsModalOpen(true);
        } catch (error) {
          console.error('Error fetching password data:', error);
        }
      };
      


  return (
    <div className="flex">
      <div className="fixed top-0 left-0 h-screen w-72 bg-gray-700 text-white flex flex-col">
        <div className="flex-1 overflow-y-50">
          <h1 className="mt-10 ml-10 text-3xl font-bold">CUSTOMS</h1>
          <ul className="mt-20 space-y-3">
            <li className="relative flex cursor-pointer space-x-2 rounded-md py-4 px-10 font-semibold hover:bg-slate-600">
              <Link to="/customsdashboard" className="flex items-center space-x-2">
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 20V14h4v6h5v-8h3L12 3 2 12h3v8z" />
                  </svg>
                </span>
                <span>Home</span>
              </Link>
            </li>
            <li className="relative flex cursor-pointer space-x-2 rounded-md py-4 px-10 text-gray-300 hover:bg-slate-600">
              <Link to="/ImportNotify" className="flex items-center space-x-2">
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                </span>
                <span>ImporterNotification</span>
              </Link>
              <svg className="absolute -top-1/2 -right-1 h-32 w-8 text-gray-50" xmlns="http://www.w3.org/2000/svg" viewBox="399.349 57.696 100.163 402.081" width="1em" height="4em">
                <path fill="currentColor" d="M 499.289 57.696 C 499.289 171.989 399.349 196.304 399.349 257.333 C 399.349 322.485 499.512 354.485 499.512 458.767 C 499.512 483.155 499.289 57.696 499.289 57.696 Z" />
              </svg>
            </li>
            
            <li className="relative flex cursor-pointer space-x-2 rounded-md py-4 px-10 text-gray-300 hover:bg-slate-600">
              <Link to="/ExportNotify" className="flex items-center space-x-2">
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </span>
                <span>ExporterNotification</span>
              </Link>
            </li>

            <li className="relative flex cursor-pointer space-x-2 rounded-md py-4 px-10 text-gray-300 hover:bg-slate-600">
              <a href="" onClick={handlePassword} className="flex items-center space-x-2">
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </span>
                <span>Change Password</span>
              </a>
            </li>
          
            
            <li className="relative flex cursor-pointer space-x-2 rounded-md py-4 px-10 text-gray-300 hover:bg-slate-600">
            <a  href="/" onClick={handleLogout} className="flex items-center space-x-2">
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </span>
                <span>Logout</span>
              </a>
            </li>
          </ul>
        </div>

        <div className="mt-auto mb-6 ml-10 flex items-center">
          <img className="h-12 w-12 rounded-full" src={man} alt="User profile" />
          <div className="ml-3">
            <p className="font-medium">Officer</p>
            <p className="text-sm text-gray-300">Kiev, Ukraine</p>
          </div>
        </div>
      </div>

      <PasswordChangeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

    </div>
  );
}

export default OfficerSideBar;
