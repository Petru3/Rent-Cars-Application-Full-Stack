import React, { useEffect, useState } from 'react';
import { getAllRents, updateRentById, createRent, deleteRentById } from '../services/rentsService';

const DeleteModal = ({ isOpen, onDelete, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-75">
      <div className="bg-white shadow-lg p-8 border rounded-lg">
        <h3 className="mb-4 font-semibold text-gray-700 text-xl">Confirm Deletion</h3>
        <p className="mb-4">Are you sure you want to delete this rent?</p>
        <button onClick={onDelete} className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-white transition duration-300">
          Delete
        </button>
        <button onClick={onCancel} className="bg-gray-300 hover:bg-gray-400 ml-2 px-4 py-2 rounded text-gray-700 transition duration-300">
          Cancel
        </button>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [rents, setRents] = useState([]);
  const [selectedRent, setSelectedRent] = useState(null);
  const [formData, setFormData] = useState({
    make: '',
    year: '',
    licencePlate: '',
    description: '',
    status: 'AVAILABLE',
    dateRent: '',
    rentalPrice: '',
    imageRent: '',
  });
  const [newRentData, setNewRentData] = useState({
    make: '',
    year: '',
    licencePlate: '',
    description: '',
    status: 'AVAILABLE',
    dateRent: '',
    rentalPrice: '',
    imageRent: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const fetchRents = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await getAllRents();
      setRents(response.data);
    } catch (err) {
      setError('Failed to fetch rents');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRents();
  }, []);

  useEffect(() => {
    if (selectedRent) {
      setFormData({ ...selectedRent });
      setShowEditModal(true);
    }
  }, [selectedRent]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNewRentInputChange = (e) => {
    const { name, value } = e.target;
    setNewRentData({ ...newRentData, [name]: value });
  };

  const handleUpdate = async () => {
    setLoading(true);
    setError('');
    try {
      await updateRentById(selectedRent.id, formData);
      setSuccess('Rent updated successfully');
      setShowEditModal(false);
      await fetchRents();
    } catch (error) {
      setError('Failed to update rent');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateRent = async () => {
    setLoading(true);
    setError('');
    try {
      await createRent(newRentData);
      setSuccess('Rent created successfully');
      await fetchRents();
      setNewRentData({
        make: '',
        year: '',
        licencePlate: '',
        description: '',
        status: 'AVAILABLE',
        dateRent: '',
        rentalPrice: '',
        imageRent: '',
      });
    } catch (error) {
      setError('Failed to create rent');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    setError('');
    try {
      await deleteRentById(selectedRent.id);
      setSuccess('Rent deleted successfully');
      setShowDeleteModal(false);
      await fetchRents();
    } catch (error) {
      setError('Failed to delete rent');
    } finally {
      setLoading(false);
    }
  };

  const openDeleteModal = (rent) => {
    setSelectedRent(rent);
    setShowEditModal(false);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedRent(null);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setSelectedRent(null);
  };

  const handleToggleStatus = async (rent) => {
    setLoading(true);
    const updatedRent = { ...rent, status: rent.status === 'AVAILABLE' ? 'RENTED' : 'AVAILABLE' };

    try {
      await updateRentById(rent.id, updatedRent);
      setSuccess(`Rent status updated to ${updatedRent.status}`);
      await fetchRents();
    } catch (error) {
      setError('Failed to update rent status');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 mx-auto px-6 py-10 min-h-screen container">
      <h1 className="mb-6 font-bold text-4xl text-center text-gray-800">Rent Dashboard</h1>

      {loading && <p className="text-blue-500 text-center">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      {success && <p className="text-center text-green-500">{success}</p>}

      {/* Form for creating a new rent */}
      <div className="bg-white shadow-md mb-8 p-8 border rounded-lg">
        <h2 className="mb-4 font-semibold text-3xl text-gray-700">Create New Rent</h2>
        <form onSubmit={(e) => { e.preventDefault(); handleCreateRent(); }}>
          <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
            {['make', 'year', 'licencePlate', 'description', 'status', 'dateRent', 'rentalPrice', 'imageRent'].map((field, index) => (
              <div key={index} className="mb-4">
                <label className="block font-medium text-gray-600 text-sm">{field.charAt(0).toUpperCase() + field.slice(1)}:</label>
                {field === 'description' ? (
                  <textarea
                    name={field}
                    value={newRentData[field]}
                    onChange={handleNewRentInputChange}
                    className="border-gray-300 p-3 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                  />
                ) : field === 'status' ? (
                  <select
                    name={field}
                    value={newRentData[field]}
                    onChange={handleNewRentInputChange}
                    className="border-gray-300 p-3 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                  >
                    <option value="AVAILABLE">AVAILABLE</option>
                    <option value="RENTED">RENTED</option>
                  </select>
                ) : field === 'dateRent' ? (
                  <input
                    type="date"
                    name={field}
                    value={newRentData[field]}
                    onChange={handleNewRentInputChange}
                    className="border-gray-300 p-3 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                  />
                ) : (
                  <input
                    type={field === 'year' || field === 'rentalPrice' ? 'number' : 'text'}
                    name={field}
                    value={newRentData[field]}
                    onChange={handleNewRentInputChange}
                    className="border-gray-300 p-3 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                  />
                )}
              </div>
            ))}
          </div>
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white transition duration-300">
            Create Rent
          </button>
        </form>
      </div>

      {/* List of existing rents */}
      <h2 className="mb-4 font-semibold text-3xl text-gray-700">All Rents</h2>
      <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {rents.map((rent) => (
          <div key={rent.id} className="bg-white shadow-md mb-4 p-6 border rounded-lg">
            <h3 className="font-bold text-gray-800 text-xl">{rent.make} - {rent.year}</h3>
            <p className="text-gray-600">{rent.description}</p>
            <p className="text-gray-600">Licence Plate: {rent.licencePlate}</p>
            <p className="text-gray-600">Status: {rent.status}</p>
            <p className="text-gray-600">Rental Price: ${rent.rentalPrice}</p>
            <p className="text-gray-600">Date of Rent: {new Date(rent.dateRent).toLocaleDateString()}</p>
            <div className="flex justify-between mt-4">
              {/* Only show the buttons if the delete modal is not open */}
              {!showDeleteModal && (
                <>
                  <button
                    onClick={() => {
                      setSelectedRent(rent);
                      setShowEditModal(true);
                    }}
                    className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded text-white transition duration-300"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => openDeleteModal(rent)}
                    className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-white transition duration-300"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleToggleStatus(rent)}
                    className={`px-4 py-2 rounded text-white transition duration-300 ${rent.status === 'AVAILABLE' ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600'}`}
                  >
                    {rent.status === 'AVAILABLE' ? `Make it RENTED` : `Make it AVAILABLE`}
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-75">
          <div className="bg-white shadow-lg p-8 border rounded-lg">
            <h2 className="mb-4 font-semibold text-3xl text-gray-700">Edit Rent</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleUpdate(); }}>
              <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
                {['make', 'year', 'licencePlate', 'description', 'status', 'dateRent', 'rentalPrice', 'imageRent'].map((field, index) => (
                  <div key={index} className="mb-4">
                    <label className="block font-medium text-gray-600 text-sm">{field.charAt(0).toUpperCase() + field.slice(1)}:</label>
                    {field === 'description' ? (
                      <textarea
                        name={field}
                        value={formData[field]}
                        onChange={handleInputChange}
                        className="border-gray-300 p-3 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                      />
                    ) : field === 'status' ? (
                      <select
                        name={field}
                        value={formData[field]}
                        onChange={handleInputChange}
                        className="border-gray-300 p-3 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                      >
                        <option value="AVAILABLE">AVAILABLE</option>
                        <option value="RENTED">RENTED</option>
                      </select>
                    ) : field === 'dateRent' ? (
                      <input
                        type="date"
                        name={field}
                        value={formData[field]}
                        onChange={handleInputChange}
                        className="border-gray-300 p-3 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                      />
                    ) : (
                      <input
                        type={field === 'year' || field === 'rentalPrice' ? 'number' : 'text'}
                        name={field}
                        value={formData[field]}
                        onChange={handleInputChange}
                        className="border-gray-300 p-3 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                      />
                    )}
                  </div>
                ))}
              </div>
              <button type="submit" className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white transition duration-300">
                Update Rent
              </button>
              <button onClick={closeEditModal} className="bg-gray-300 hover:bg-gray-400 ml-2 px-4 py-2 rounded text-gray-700 transition duration-300">
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <DeleteModal isOpen={showDeleteModal} onDelete={handleDelete} onCancel={closeDeleteModal} />
    </div>
  );
};

export default Dashboard;
