import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../services/authService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import Font Awesome
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'; // Import specific icons

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  function handleSignIn(e) {
    e.preventDefault();
    authService.signIn({ email, password })
      .then(response => {
        localStorage.setItem('token', response.data.accessToken);
        navigate('/');
      })
      .catch(err => {
        console.error(err);
        setError('Invalid credentials');
      });
  }

  return (
    <div className="flex justify-center items-center bg-gradient-to-r from-blue-900 via-slate-800 to-blue-900 p-6 min-h-screen">
      <div className="bg-white shadow-2xl p-10 rounded-xl w-full max-w-md sm:max-w-lg lg:max-w-xl transition-all duration-300 hover:scale-105">
        <h2 className="mb-6 font-extrabold text-3xl text-center text-gray-800 sm:text-4xl">Sign In</h2>
        {error && <p className="mb-4 font-medium text-center text-red-500">{error}</p>}
        
        <form onSubmit={handleSignIn} className="space-y-6">
          {/* Email Input */}
          <div className="relative flex items-center">
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="border-gray-300 shadow-sm py-3 pr-4 pl-4 border rounded-lg focus:ring-4 focus:ring-blue-400 w-full focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password Input */}
          <div className="relative flex items-center">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}  // Toggle between 'password' and 'text'
              placeholder="Enter your password"
              className="border-gray-300 shadow-sm py-3 pr-10 pl-4 border rounded-lg focus:ring-4 focus:ring-blue-400 w-full focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* Toggle Button for Show/Hide Password */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="right-3 absolute inset-y-0 flex items-center text-gray-500 hover:text-blue-600"
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} className="w-5 h-5" />
            </button>
          </div>

          {/* Sign-up Link */}
          <div className="text-center text-sm">
            <Link to={'/signup'} className="text-blue-600 hover:text-blue-800 hover:underline transition-colors">
              Don't have an account? Sign up here
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-600 hover:from-blue-700 to-blue-500 hover:to-blue-600 shadow-lg hover:shadow-xl py-3 rounded-lg w-full font-semibold text-white transition-all duration-300 hover:scale-105"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
