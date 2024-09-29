import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  getOneRentById,
  getReviewsByRentId,
  addReviewForRent,
  deleteReview,
  updateRentById
} from '../services/rentsService';
import LoadingSpinner from '../components/LoadingSpinner';
import RentPageItem from '../components/RentPageItem';
import ReviewForm from '../components/ReviewForm';
import Reviews from '../components/Reviews';
import {jwtDecode} from 'jwt-decode';

function RentPage() {
  const { id } = useParams();
  const [rent, setRent] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null); // State for error handling
  const [currentUserId, setCurrentUserId] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [editing, setEditing] = useState(false); // State to handle edit mode
  const [editFormData, setEditFormData] = useState({}); // Data for rent editing

  useEffect(() => {
    const fetchRentDetails = async () => {
      setIsLoading(true);
      setError(null); // Reset error state before fetching
      try {
        const rentResponse = await getOneRentById(id);
        setRent(rentResponse.data);
        setEditFormData(rentResponse.data); // Set form data to the current rent data

        const reviewsResponse = await getReviewsByRentId(id);
        setReviews(reviewsResponse.data);

        const token = localStorage.getItem('token');
        if (token) {
          const decodedToken = jwtDecode(token);
          setCurrentUserId(decodedToken.userId);
          
          // Check if the user is the owner
          if (decodedToken.userId === rentResponse.data.userId) {
            setIsOwner(true);
          }
        }
      } catch (error) {
        console.error('Error fetching rent details:', error);
        setError('Failed to load rent details. Please try again later.'); // Set error message
      } finally {
        setIsLoading(false);
      }
    };

    fetchRentDetails();
  }, [id]);

  const handleSubmitReview = async (newReview) => {
    try {
      const response = await addReviewForRent(id, newReview);
      setReviews((prevReviews) => [...prevReviews, response.data]);
    } catch (error) {
      console.error('Error adding review:', error);
      setError('Failed to add review. Please try again.'); // Set error message
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      await deleteReview(reviewId);
      setReviews((prevReviews) => prevReviews.filter((review) => review.id !== reviewId));
    } catch (error) {
      console.error('Error deleting review:', error);
      setError('Failed to delete review. Please try again.'); // Set error message
    }
  };

  const handleEditToggle = () => {
    setEditing(!editing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  const handleRentUpdate = async () => {
    try {
      const response = await updateRentById(id, editFormData);
      setRent(response.data);
      setEditing(false); // Close the edit mode
    } catch (error) {
      console.error('Error updating rent:', error);
      setError('Failed to update rent. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center bg-gray-50 min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className="mt-4 text-center text-lg text-red-600">{error}</p>; // Show error message
  }

  if (!rent) {
    return <p className="mt-4 text-center text-lg text-red-600">No details available.</p>;
  }

  return (
    <div className="flex justify-center items-center bg-gradient-to-r from-indigo-50 to-blue-50 pt-6 pb-12 min-h-screen font-serif text-gray-800">
      <div className="bg-white shadow-lg mx-4 md:mx-0 px-4 md:px-8 py-6 rounded-lg w-full max-w-7xl">
        <div className="mb-4">
          <RentPageItem rent={rent} />
        </div>

        {/* Show review form only if the user is NOT the owner */}
        {!isOwner && <ReviewForm onSubmitReview={handleSubmitReview} />}
        <Reviews reviews={reviews} currentUserId={currentUserId} onDeleteReview={handleDeleteReview} />
      </div>
    </div>
  );
}

export default RentPage;
