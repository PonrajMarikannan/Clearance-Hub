import React, { useEffect, useState } from 'react';
import {
  Ship, Search, Calendar, Anchor, PlusCircle,
  Grid, List, X, Check, ChevronRight, ChevronLeft,

  Edit2,
  Trash2,
  MapPin,
  Package
} from 'lucide-react';
import axiosInstance from '../../utils/axiosInstance';

const ShipManagement = () => {
  const [view, setView] = useState('table');
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddShipModalOpen, setIsAddShipModalOpen] = useState(false);
  const [isEditShipModalOpen, setIsEditShipModalOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleteShipId, setDeleteShipId] = useState(null);
  const [newShipData, setNewShipData] = useState({
    shipName: '',
    boardingDate: '',
    arrivalDate: '',
    boardingPort: '',
    departurePort: '',
    maxCapacity: '',
    currentLoad: '',
    shipStatus: 'Docked'
  });
  const [ships, setShips] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShips = async () => {
      try {
        const response = await axiosInstance('/getAllShip');
        setShips(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchShips();
  }, []);

  const currentShips = ships
    .filter(ship => ship.shipName.toLowerCase().includes(searchTerm.toLowerCase()))
    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const renderTableView = () => (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse shadow-md bg-white rounded-lg">
        <thead className="bg-gray-200 text-gray-700">
          <tr>
            <th className="p-4 text-left font-semibold">Name</th>
            <th className="p-4 text-left font-semibold">Boarding Date</th>
            <th className="p-4 text-left font-semibold">Arrival Date</th>
            <th className="p-4 text-left font-semibold">Boarding Port</th>
            <th className="p-4 text-left font-semibold">Arrival Port</th>
            <th className="p-4 text-left font-semibold">Max Capacity</th>
            <th className="p-4 text-left font-semibold">Current Load</th>
            <th className="p-4 text-left font-semibold">Status</th>
            <th className="p-4 text-left font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentShips.map(ship => (
            <tr key={ship.shipId} className="border-b transition duration-200 hover:bg-gray-50">
              <td className="p-4">{ship.shipName}</td>
              <td className="p-4">{ship.boardingDate}</td>
              <td className="p-4">{ship.arrivalDate}</td>
              <td className="p-4">{ship.boardingPort}</td>
              <td className="p-4">{ship.departurePort}</td>
              <td className="p-4">{ship.maxCapacity}</td>
              <td className="p-4">{ship.currentLoad}</td>
              <td className="p-4">
                <span className={`px-3 py-1 rounded-full text-xs ${getStatusColor(ship.shipStatus)}`}>
                  {ship.shipStatus}
                </span>
              </td>
              <td className="p-4 flex space-x-2">
                <button
                  onClick={() => handleEditShip(ship)}
                  className="flex items-center text-blue-600 hover:bg-blue-200 p-2 rounded-full transition duration-200"
                  aria-label="Edit ship"
                >
                  <Edit2
                    className="text-blue-600 group-hover:scale-110 transition duration-200"
                    size={20}
                  />
                </button>
                <button
                  onClick={() => openDeleteConfirmation(ship.shipId)}
                  className="flex items-center text-red-600 hover:bg-red-200 p-2 rounded-full transition duration-200"
                  aria-label="Delete ship"
                >
                  <Trash2
                    className="text-red-600 group-hover:scale-110 transition duration-200"
                    size={20}
                  />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderCardView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {currentShips.map(ship => (
      <div className="hover:shadow-lg transition-shadow duration-300">
        <div className="relative p-6 border rounded-lg bg-gray-100">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Ship className="h-5 w-5 text-blue-600" />
                <h3 className="text-xl font-bold text-gray-800">
                  {ship.shipName}
                </h3>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                <MapPin className="h-4 w-4" />
                <span>{ship.boardingPort} → {ship.departurePort}</span>
              </div>
            </div>
            <span
              className={`text-xs font-semibold px-3 py-1 rounded-full ${
                ship.shipStatus.toLowerCase() === 'docked'
                  ? 'bg-green-200 text-green-800'
                  : ship.shipStatus.toLowerCase() === 'en route'
                  ? 'bg-blue-200 text-blue-800'
                  : 'bg-yellow-200 text-yellow-800'
              }`}
            >
              {ship.shipStatus}
            </span>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Package className="h-4 w-4" />
              <span>Capacity: {ship.currentLoad} / {ship.maxCapacity}</span>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${(ship.currentLoad / ship.maxCapacity) * 100}%`
                }}
              />
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-blue-200">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="h-4 w-4" />
                <span>Last Updated: {new Date().toLocaleDateString()}</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEditShip(ship)}
                  className="text-blue-600 hover:bg-blue-50 px-3 py-1 rounded transition duration-200 text-sm font-medium"
                >
                  Edit
                </button>
                <button
                  onClick={() => openDeleteConfirmation(ship.shipId)}
                  className="text-red-600 hover:bg-red-50 px-3 py-1 rounded transition duration-200 text-sm font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>


  );

  const getStatusColor = (status) => {
    const colors = {
      'Arriving': 'bg-green-100 text-green-800',
      'Departed': 'bg-red-100 text-red-800',
      'In Transit': 'bg-blue-100 text-blue-800',
      'Docked': 'bg-yellow-100 text-yellow-800',
      'At Anchor': 'bg-purple-100 text-purple-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const handleEditShip = (ship) => {
    setNewShipData(ship);
    setIsEditShipModalOpen(true);
  };

  const openDeleteConfirmation = (shipId) => {
    setDeleteShipId(shipId);
    setConfirmDelete(true);
  };

  const handleDeleteShip = async () => {
    try {
      await axiosInstance.delete(`/deleteShip/${deleteShipId}`);
      setShips(ships.filter(ship => ship.shipId !== deleteShipId));
      alert('Ship deleted successfully!');
    } catch (error) {
      setError(error);
    } finally {
      setConfirmDelete(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (isEditShipModalOpen) {
        // Update Ship
        await axiosInstance.put(`/updateShip/${newShipData.shipId}`, newShipData);
      } else {
        // Add Ship
        await axiosInstance.post('/createShip', newShipData);
        alert('Ship added successfully!');
      }
      setIsAddShipModalOpen(false);
      setIsEditShipModalOpen(false);
      setNewShipData({
        shipName: '',
        boardingDate: '',
        arrivalDate: '',
        boardingPort: '',
        departurePort: '',
        maxCapacity: '',
        currentLoad: '',
        shipStatus: ''
      });
      // Refetch ships
      const response = await axiosInstance('/getAllShip');
      setShips(response.data);
    } catch (error) {
      setError(error);
    }
  };

  if (loading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  if (error) return <div className="text-red-500">Error loading ships: {error.message}</div>;

  return (
    <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b flex flex-col md:flex-row md:justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <button onClick={() => setView('table')} className={`p-2 rounded ${view === 'table' ? 'bg-blue-100' : 'hover:bg-gray-100'}`}>
              <List className={view === 'table' ? 'text-blue-600' : 'text-gray-600'} />
            </button>
            <button onClick={() => setView('card')} className={`p-2 rounded ${view === 'card' ? 'bg-blue-100' : 'hover:bg-gray-100'}`}>
              <Grid className={view === 'card' ? 'text-blue-600' : 'text-gray-600'} />
            </button>
          </div>

          <div className="relative flex-1 max-w-xl mx-auto mb-4 md:mb-0">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search ships..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <button
            onClick={() => {
              setNewShipData({
                shipName: '',
                boardingDate: '',
                arrivalDate: '',
                boardingPort: '',
                departurePort: '',
                maxCapacity: '',
                currentLoad: '',
                shipStatus: ''
              });
              setIsAddShipModalOpen(true);
            }}
            className="px-4 py-2 flex items-center border border-gray-300 rounded-md bg-green-500 text-white hover:bg-green-600"
          >
            <PlusCircle className="h-4 w-4 mr-1" />
            Add Ship
          </button>
        </div>

        <div className="p-6">
          {view === 'table' ? renderTableView() : renderCardView()}
        </div>

        {/* Pagination */}
        <div className="flex flex-col md:flex-row justify-between items-center p-4 border-t">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <label className="text-sm font-medium text-gray-700">Items per page:</label>
            <select
              className="border border-gray-300 rounded-md p-2"
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50"
            >
              <ChevronLeft />
            </button>
            <span>
              {currentPage} of {Math.ceil(ships.length / itemsPerPage)}
            </span>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage >= Math.ceil(ships.length / itemsPerPage)}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50"
            >
              <ChevronRight />
            </button>
          </div>
        </div>

        {/* Add/Edit Ship Modal */}
        {(isAddShipModalOpen || isEditShipModalOpen) && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white rounded-lg p-8 max-w-full w-full md:max-w-2xl">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">{isEditShipModalOpen ? 'Edit Ship' : 'Add Ship'}</h2>
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-1">
                  <label className="block mb-1 text-gray-700 font-medium">Ship Name</label>
                  <input
                    type="text"
                    value={newShipData.shipName}
                    onChange={(e) => setNewShipData({ ...newShipData, shipName: e.target.value })}
                    className="border border-gray-300 rounded-md w-full p-3 transition duration-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    required
                  />
                </div>
                <div className="col-span-1">
                  <label className="block mb-1 text-gray-700 font-medium">Ship Status</label>
                  <div className="relative">
                    <select
                      value={newShipData.shipStatus}
                      onChange={(e) => setNewShipData({ ...newShipData, shipStatus: e.target.value })}
                      className="border border-gray-300 rounded-md w-full p-3 transition duration-200 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white appearance-none"
                    >
                      <option value="select ship status">Select</option>
                      <option value="Departed">Departed</option>
                      <option value="Arriving">Arriving</option>
                      <option value="Docked">Docked</option>
                      <option value="In Transit">In Transit</option>
                      <option value="At Anchor">At Anchor</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <svg
                        className="w-5 h-5 text-gray-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.23 7.21a.75.75 0 011.06 0l3.47 3.47 3.47-3.47a.75.75 0 111.06 1.06l-4 4a.75.75 0 01-1.06 0l-4-4a.75.75 0 010-1.06z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="col-span-1">
                  <label className="block mb-1 text-gray-700 font-medium">Arrival Date</label>
                  <input
                    type="date"
                    value={newShipData.arrivalDate}
                    onChange={(e) => setNewShipData({ ...newShipData, arrivalDate: e.target.value })}
                    className="border border-gray-300 rounded-md w-full p-3 transition duration-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    required
                  />
                </div>
                <div className="col-span-1">
                  <label className="block mb-1 text-gray-700 font-medium">Price per Ton</label>
                  <input
                    type="number"
                    value={newShipData.price_per_ton}
                    onChange={(e) => setNewShipData({ ...newShipData, price_per_ton: e.target.value })}
                    className="border border-gray-300 rounded-md w-full p-3 transition duration-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    required
                  />
                </div>
                <div className="col-span-1">
                  <label className="block mb-1 text-gray-700 font-medium">Boarding Date</label>
                  <input
                    type="date"
                    value={newShipData.boardingDate}
                    onChange={(e) => setNewShipData({ ...newShipData, boardingDate: e.target.value })}
                    className="border border-gray-300 rounded-md w-full p-3 transition duration-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    required
                  />
                </div>
                <div className="col-span-1">
                  <label className="block mb-1 text-gray-700 font-medium">Boarding Port</label>
                  <input
                    type="text"
                    value={newShipData.boardingPort}
                    onChange={(e) => setNewShipData({ ...newShipData, boardingPort: e.target.value })}
                    className="border border-gray-300 rounded-md w-full p-3 transition duration-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    required
                  />
                </div>
                <div className="col-span-1">
                  <label className="block mb-1 text-gray-700 font-medium">Departure Date</label>
                  <input
                    type="date"
                    value={newShipData.departureDate}
                    onChange={(e) => setNewShipData({ ...newShipData, departureDate: e.target.value })}
                    className="border border-gray-300 rounded-md w-full p-3 transition duration-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    required
                  />
                </div>
                <div className="col-span-1">
                  <label className="block mb-1 text-gray-700 font-medium">Departure Port</label>
                  <input
                    type="text"
                    value={newShipData.departurePort}
                    onChange={(e) => setNewShipData({ ...newShipData, departurePort: e.target.value })}
                    className="border border-gray-300 rounded-md w-full p-3 transition duration-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    required
                  />
                </div>

                <div className="col-span-1">
                  <label className="block mb-1 text-gray-700 font-medium">Max Capacity</label>
                  <input
                    type="number"
                    value={newShipData.maxCapacity}
                    onChange={(e) => setNewShipData({ ...newShipData, maxCapacity: e.target.value })}
                    className="border border-gray-300 rounded-md w-full p-3 transition duration-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    required
                  />
                </div>
               
                <div className="col-span-1">
                  <label className="block mb-1 text-gray-700 font-medium">Current Load</label>
                  <input
                    type="number"
                    value={newShipData.currentLoad}
                    onChange={(e) => setNewShipData({ ...newShipData, currentLoad: e.target.value })}
                    className="border border-gray-300 rounded-md w-full p-3 transition duration-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    required
                  />
                </div>
                <div className="col-span-2 text-center mt-4">
                  <button 
                    type="button" 
                    onClick={() => {
                      setIsAddShipModalOpen(false);
                      setIsEditShipModalOpen(false);
                    }} 
                    className="text-gray-600 hover:text-gray-800 border border-gray-300 px-4 py-2 rounded-lg transition duration-150 mr-2"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded-lg transition duration-150">Submit</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Confirm Delete Modal */}
        {confirmDelete && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white rounded-lg p-6 max-w-sm w-full">
              <h2 className="text-lg font-semibold">Confirm Delete</h2>
              <p className="mt-4">Are you sure you want to delete this ship?</p>
              <div className="mt-6 flex justify-end">
                <button type="button" onClick={() => setConfirmDelete(false)} className="text-gray-500 mr-2">Cancel</button>
                <button onClick={handleDeleteShip} className="bg-red-500 text-white px-4 py-2 rounded-lg">Delete</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShipManagement;