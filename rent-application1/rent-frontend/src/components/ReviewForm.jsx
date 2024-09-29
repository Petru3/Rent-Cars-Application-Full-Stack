import React, { useState } from 'react';

function ReviewForm({ onSubmitReview }) {
  const [newReview, setNewReview] = useState({ comment: '', name: '' });
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSubmitReview(newReview);
      setNewReview({ comment: '', name: '' });
      setErrorMessage('');
    } catch (error) {
      console.error('Error submitting review:', error);
      setErrorMessage('An error occurred while submitting the review.');
    }
  };

  return (
    <div className="bg-gray-50 shadow-md mx-auto mt-12 p-6 rounded-lg w-full max-w-xl">
      <h3 className="mb-6 font-bold text-2xl text-indigo-600">Add a Review</h3>

      {errorMessage && <p className="mb-4 text-red-500">{errorMessage}</p>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block font-medium text-gray-700 text-lg">Name</label>
          <input
            type="text"
            value={newReview.name}
            onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
            className="border-gray-300 p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 w-full focus:outline-none"
            required
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700 text-lg">Comment</label>
          <textarea
            value={newReview.comment}
            onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
            className="border-gray-300 p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 w-full focus:outline-none"
            rows="4"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-indigo-500 hover:bg-indigo-600 shadow-lg px-4 py-2 rounded-lg font-semibold text-white transform transition-all duration-200 hover:scale-105 w-full"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
}

export default ReviewForm;
