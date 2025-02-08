import React, { useState, useEffect } from 'react';
import { Search, Plus, X, User, Shield, Mail, Calendar } from 'lucide-react';
import axiosInstance from '../../utils/axiosInstance';

const OfficerManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [officers, setOfficers] = useState([]);
  const [activeFilter, setActiveFilter] = useState(null); // null means show all
  const [officerData, setOfficerData] = useState({
    username: '',
    email: '',
    role: 'officer'
  });

  useEffect(() => {
    const fetchOfficers = async () => {
      try {
        const response = await axiosInstance.get('/getAllUser');
        // Filter out admin users before setting the state
        const nonAdminUsers = response.data.filter(user => user.role !== 'admin');
        setOfficers(nonAdminUsers);
      } catch (error) {
        console.error('Error fetching officers:', error);
      }
    };
    fetchOfficers();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOfficerData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleAddOfficer = async () => {
    try {
      const response = await axiosInstance.post('/register', officerData);
     
      setIsModalOpen(false);
      setOfficerData({ username: '', email: '', role: 'officer' });
    } catch (error) {
      console.error('Error adding officer:', error);
    }
  };

  const handleRoleFilter = (role) => {
    setActiveFilter(activeFilter === role ? null : role);
  };

  const filteredOfficers = officers.filter(officer => {
    const matchesSearch = 
      officer.username.toLowerCase().includes(searchQuery.toLowerCase()) || 
      officer.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!activeFilter) return matchesSearch; // Show all non-admin users if no filter is active
    return matchesSearch && officer.role === activeFilter;
  });

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Controls Section */}
<div className="flex flex-col items-center justify-center max-w-4xl mx-auto gap-4 mb-8">
  <div className="relative w-full max-w-md">
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
      <Search className="h-5 w-5 text-gray-400" />
    </div>
    <input
      type="text"
      className="w-full pl-10 pr-3 py-2 border rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-transparent"
      placeholder="Search officers..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
  </div>

  <div className="flex gap-2 items-center">
    <button 
      onClick={() => handleRoleFilter('client')}
      className={`px-4 py-2 rounded-full flex items-center gap-2 transition-all ${
        activeFilter === 'client'
          ? 'bg-green-100 text-green-700'
          : 'bg-gray-100 text-gray-600'
      }`}
    >
      <User className="h-4 w-4" />
      Client
    </button>
    <button 
      onClick={() => handleRoleFilter('officer')}
      className={`px-4 py-2 rounded-full flex items-center gap-2 transition-all ${
        activeFilter === 'officer'
          ? 'bg-blue-100 text-blue-700'
          : 'bg-gray-100 text-gray-600'
      }`}
    >
      <Shield className="h-4 w-4" />
      Officer
    </button>
    <button 
      onClick={() => setIsModalOpen(true)}
      className="ml-2 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full transition-transform hover:scale-105"
    >
      <Plus className="h-6 w-6" />
    </button>
  </div>
</div>


      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredOfficers.map((officer, index) => (
          <div
            key={officer.id}
            className={`relative overflow-hidden rounded-xl ${
              officer.role === 'officer'
                ? 'bg-gradient-to-br from-blue-50 to-blue-100'
                : 'bg-gradient-to-br from-green-50 to-green-100'
            } hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in-up group`}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            {/* Decorative background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className={`w-40 h-40 rounded-full ${
                officer.role === 'officer' ? 'bg-blue-400' : 'bg-green-400'
              } absolute -right-20 -top-20`}></div>
              <div className={`w-32 h-32 rounded-full ${
                officer.role === 'officer' ? 'bg-blue-300' : 'bg-green-300'
              } absolute -left-16 -bottom-16`}></div>
            </div>

            {/* Card content */}
            <div className="relative p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    {officer.role === 'officer' ? (
                      <Shield className={`h-5 w-5 ${
                        officer.role === 'officer' ? 'text-blue-600' : 'text-green-600'
                      }`} />
                    ) : (
                      <User className={`h-5 w-5 ${
                        officer.role === 'officer' ? 'text-blue-600' : 'text-green-600'
                      }`} />
                    )}
                    <h3 className="text-xl font-bold text-gray-800">
                      {officer.username}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <Mail className="h-4 w-4" />
                    <span>{officer.email}</span>
                  </div>
                </div>
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full ${
                    officer.role === 'officer'
                      ? 'bg-blue-200 text-blue-800'
                      : 'bg-green-200 text-green-800'
                  }`}
                >
                  {officer.role}
                </span>
              </div>

              {/* Additional details with hover effect */}
              <div className={`mt-4 pt-4 border-t ${
                officer.role === 'officer' ? 'border-blue-200' : 'border-green-200'
              } flex items-center gap-2 text-sm text-gray-600`}>
                <Calendar className="h-4 w-4" />
                <span>Joined {new Date().toLocaleDateString()}</span>
              </div>
            </div>

            {/* Hover overlay */}
            <div className={`absolute inset-0 ${
              officer.role === 'officer' ? 'bg-blue-500' : 'bg-green-500'
            } opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
          </div>
        ))}
      </div>

      {/* Add Officer Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md space-y-4 animate-slide-up">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">New Officer</h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="username"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                  value={officerData.username}
                  onChange={handleInputChange}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                  value={officerData.email}
                  onChange={handleInputChange}
                />
              </div>

              <div className="flex gap-3 justify-end pt-4">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddOfficer}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Create Officer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OfficerManagement;