import React from 'react';

const Pop = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
        <h2 className="text-lg font-semibold mb-4">Are you sure you want to delete this item?</h2>
        <div className="flex justify-center gap-4">
          <button
            className="bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
            onClick={onConfirm}
          >
            Confirm
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pop;
