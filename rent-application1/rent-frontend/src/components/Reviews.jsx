import { format } from 'date-fns';
import { useState } from 'react';
import Modal from './Modal'; // Adjust the import path as needed

function Reviews({ reviews, currentUserId, onDeleteReview }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState(null);

  const handleDeleteClick = (reviewId) => {
    setReviewToDelete(reviewId);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (reviewToDelete) {
      onDeleteReview(reviewToDelete);
      setReviewToDelete(null); // Reset the review to delete
    }
    setIsModalOpen(false);
  };

  return (
    <div className="mt-12 px-4 sm:px-6 lg:px-8">
      <h3 className="mb-6 font-bold text-3xl text-indigo-600">Customer Reviews</h3>
      {reviews.length === 0 ? (
        <p className="text-gray-600">No reviews yet. Be the first to review this rental!</p>
      ) : (
        <div className="space-y-6">
          {reviews.map((review, index) => {
            const date = review.createdAt ? new Date(review.createdAt) : new Date(); // Fallback to current date if createdAt is missing
            const formattedDate = format(date, 'MM/dd/yyyy');

            return (
              <div key={review.id || index} className="border-gray-200 bg-white shadow-sm p-6 border rounded-lg transition-transform duration-300 hover:scale-105">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-gray-800 text-xl">{review.name || 'Anonymous'}</h4>
                  {currentUserId === review.userId && (
                    <button
                      onClick={() => handleDeleteClick(review.id)}
                      className="font-medium text-red-500 hover:text-red-600 transition duration-200"
                    >
                      Delete
                    </button>
                  )}
                </div>
                <p className="mt-2 text-gray-700 text-lg">{review.comment}</p>
                <div className="mt-2 text-gray-500 text-sm">
                  <span>Posted on: {formattedDate}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal for confirmation */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onConfirm={handleConfirmDelete}
        title="Confirm Deletion"
      >
        <p>Are you sure you want to delete this review?</p>
      </Modal>
    </div>
  );
}

export default Reviews;
