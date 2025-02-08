import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ConfirmationModal from './ConfirmModel';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ImportRequest() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentAction, setCurrentAction] = useState(null); // State for the action to perform
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4);
  const [filter, setFilter] = useState('ALL'); // State for filtering by status

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    // Filter data based on the selected status
    if (filter === 'ALL') {
      setFilteredData(data);
    } else {
      setFilteredData(data.filter(item => item.status === filter));
    }
  }, [filter, data]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:7070/importapp/all');
      setData(response.data);
      setFilteredData(response.data); // Initialize filtered data
    } catch (error) {
      console.error(error);
    }
  };

  const handleActionClick = (index, action) => {
    setSelectedIndex(index);
    setCurrentAction(action); // Set the action to be performed
    setIsModalOpen(true);
  };

  const handleConfirmSave = () => {
    const updatedItem = data[selectedIndex];
    const newStatus = currentAction === 'APPROVE' ? 'APPROVED' : 'REJECTED';

    axios.put('http://localhost:7070/importapp/updateStatus', null, {
      params: {
        id: updatedItem.applicationId,
        status: newStatus
      }
    })
    .then(response => {
      console.log('Status updated successfully', response);

      if (newStatus === 'APPROVED') {
        const totalAmount = updatedItem.weight * updatedItem.ship.price_per_ton;

        const formData = new FormData();
        formData.append('applicationId', updatedItem.applicationId);
        formData.append('amount', totalAmount);

        axios.post("http://localhost:7070/impinvoice", formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(() => {
          console.log('Invoice created successfully');
          toast.success('Invoice created successfully');
        })
        .catch(error => {
          console.error('Error creating invoice:', error);
          toast.error('Error creating invoice');
        });
      } else {
        toast.success('Status updated successfully');
      }

      // Update the data with the new status
      const updatedData = data.map((item, index) => 
        index === selectedIndex ? { ...item, status: newStatus } : item
      );
      setData(updatedData);

      // Apply filter again after status update
      setFilteredData(updatedData.filter(item => filter === 'ALL' || item.status === filter));

      setIsModalOpen(false); // Close modal on success
    })
    .catch(error => {
      console.error('Update error', error);
      toast.error('Error updating status');
      setIsModalOpen(false); // Close modal on error
    });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleViewDocument = (base64String) => {
    const byteCharacters = atob(base64String);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <h1 className="text-3xl font-bold">Import Notifications</h1>
      </div>

      <div className="mb-4">
        <label className="block mb-2">
          <span className="text-gray-700">Status Filter</span>
          <select 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="block w-full mt-1 p-2 border rounded-md bg-white"
          >
            <option value="ALL">All</option>
            <option value="PENDING">Pending</option>
            <option value="APPROVED">Approved</option>
            <option value="REJECTED">Rejected</option>
          </select>
        </label>
      </div>

      <div className="overflow-x-auto">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ship ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Capacity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Importer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Weight</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Document</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => (
                <tr key={item.applicationId}>
                  <td className="px-6 py-4 whitespace-nowrap">{item.ship ? item.ship.shipId : ''}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.ship ? item.ship.maxCapacity - item.ship.currentLoad : 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.importerName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.productName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.weight}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.documentFile ? (
                      <button onClick={() => handleViewDocument(item.documentFile)} className="text-blue-500 hover:underline">
                        View
                      </button>
                    ) : (
                      <span className="text-gray-400">No Document</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.status}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleActionClick(index, 'APPROVE')}
                      className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                      disabled={item.status !== 'PENDING'} // Disable button if status is not PENDING
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleActionClick(index, 'REJECT')}
                      className="bg-red-500 text-white px-4 py-2 rounded"
                      disabled={item.status !== 'PENDING'} // Disable button if status is not PENDING
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-between items-center mt-4">
        <div>
          <button onClick={() => handleChangePage(null, page - 1)} className="bg-gray-300 px-4 py-2 rounded" disabled={page === 0}>
            Previous
          </button>
          <button onClick={() => handleChangePage(null, page + 1)} className="bg-gray-300 px-4 py-2 rounded" disabled={page >= Math.ceil(filteredData.length / rowsPerPage) - 1}>
            Next
          </button>
        </div>

        <div>
          <span className="text-gray-700">Rows per page:</span>
          <select 
            value={rowsPerPage}
            onChange={handleChangeRowsPerPage}
            className="ml-2 p-1 border rounded-md"
          >
            <option value={4}>4</option>
            <option value={8}>8</option>
            <option value={12}>12</option>
          </select>
        </div>
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => handleConfirmSave()}
        message={`Are you sure you want to ${currentAction === 'APPROVE' ? 'approve' : 'reject'} this application?`}
      />

      <ToastContainer />
    </div>
  );
}

export default ImportRequest;