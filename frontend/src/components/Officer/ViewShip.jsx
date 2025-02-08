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
  const [confirmDelete, setConfirmDelete] = useState(false);

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

      </div>
    </div>
  );
};

export default ShipManagement;