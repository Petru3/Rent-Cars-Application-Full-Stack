import { Navigate, useLocation } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'; // Import jwt-decode

// ProtectedRoute component that supports role-based access control
function ProtectedRoute({ children, allowedRoles }) {
  const token = localStorage.getItem('token');
  const location = useLocation(); // To get the current route

  // If no token, redirect to the sign-in page
  if (!token) {
    return <Navigate to="/signin" state={{ from: location }} />;
  }

  // Decode the token to extract the role
  let userRole = null;
  try {
    const decodedToken = jwtDecode(token);
    userRole = decodedToken.role; // Ensure that the JWT contains a `role` claim
  } catch (error) {
    console.error("Error decoding token:", error);
    return <Navigate to="/signin" state={{ from: location }} />;
  }

  // If allowedRoles are provided, check if the user's role is allowed
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    // If user role is not allowed, redirect to /rents or another page
    return <Navigate to="/rents" />;
  }

  // If everything is okay, render the protected content
  return children;
}

export default ProtectedRoute;
