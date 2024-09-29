import React from 'react';

const Modal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 p-4">
      <div className="bg-white shadow-lg p-6 rounded-lg w-full max-w-lg">
        <h3 className="font-semibold text-lg">Confirm Cancellation</h3>
        <p className="mt-4">Are you sure you want to cancel this booking?</p>
        <div className="flex justify-end mt-6">
          <button
            className="bg-red-500 hover:bg-red-600 mr-2 px-4 py-2 rounded text-white"
            onClick={onConfirm}
          >
            Confirm
          </button>
          <button
            className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
