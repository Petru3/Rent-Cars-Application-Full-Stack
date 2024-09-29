import { useState } from 'react';
import { Link } from 'react-router-dom';
import authService from '../services/authService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import Font Awesome
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons'; // Icons

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('CLIENT'); // Default role is CLIENT
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await authService.signUp({ email, password, role });
      setSuccess(true);
    } catch (error) {
      setError('Registration failed');
    }
  };

  return (
    <div className="flex justify-center items-center bg-gradient-to-br from-blue-700 via-blue-800 to-slate-900 p-6 min-h-screen">
      <div className="bg-white shadow-lg p-8 sm:p-10 rounded-lg w-full max-w-md md:max-w-lg lg:max-w-xl transition-all duration-300 hover:scale-105">
        <h2 className="mb-6 font-extrabold text-3xl text-center text-gray-800 sm:text-4xl">Sign Up</h2>
        {error && <p className="mb-4 font-medium text-center text-red-500">{error}</p>}
        {success && <p className="mb-4 font-medium text-center text-green-500">Account created! Please Sign In.</p>}
        
        <form onSubmit={handleSignUp} className="space-y-5">
          {/* Email Input */}
          <div className="relative flex items-center">
            <FontAwesomeIcon icon={faEnvelope} className="left-3 absolute text-blue-500" />
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="shadow-sm py-3 pr-4 pl-10 border rounded-lg focus:ring-4 focus:ring-blue-300 w-full focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password Input */}
          <div className="relative flex items-center">
            <FontAwesomeIcon icon={faLock} className="left-3 absolute text-blue-500" />
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="shadow-sm py-3 pr-4 pl-10 border rounded-lg focus:ring-4 focus:ring-blue-300 w-full focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Role Dropdown */}
          <div className="relative flex items-center">
            <FontAwesomeIcon icon={faUser} className="left-3 absolute text-blue-500" />
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="shadow-sm py-3 pr-4 pl-10 border rounded-lg focus:ring-4 focus:ring-blue-300 w-full focus:outline-none"
            >
              <option value="CLIENT">Client</option>
              <option value="OWNER">Owner</option>
            </select>
          </div>

          {/* Already have an account? */}
          <div className="text-center text-sm">
            <Link to={'/signin'} className="text-blue-600 hover:underline">
              Already have an account? Sign in here
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 shadow-md py-3 rounded-lg w-full font-semibold text-white transition-all duration-300"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
