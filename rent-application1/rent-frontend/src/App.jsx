import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import Rents from './pages/Rents';
import ProtectedRoute from './components/ProtectedRoute';
import AppLayout from './shared/AppLayout';
import AboutUs from './pages/AboutUs';
import Dashboard from './pages/Dashboard';
import RentPage from './pages/RentPage';
import BookingList from './pages/BookingList';
import Success from './pages/Success';

class App extends React.Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <AppLayout>
                <Home />
              </AppLayout>
            }
          />
          <Route
            path="/signup"
            element={
              <AppLayout>
                <SignUp />
              </AppLayout>
            }
          />
          <Route
            path="/signin"
            element={
              <AppLayout>
                <SignIn />
              </AppLayout>
            }
          />
          <Route
            path="/rents"
            element={
              <ProtectedRoute>
                <AppLayout>
                  <Rents />
                </AppLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/about-us"
            element={
              <AppLayout>
                <AboutUs />
              </AppLayout>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <AppLayout>
                  <Dashboard />
                </AppLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/rents/:id"
            element={
              <ProtectedRoute>
                <AppLayout>
                  <RentPage />
                </AppLayout>
              </ProtectedRoute>
            }
          />

          {/* Prevent users with the 'OWNER' role from accessing booking and success pages */}
          <Route
            path="/booking"
            element={
              <ProtectedRoute allowedRoles={['user', 'CLIENT']}> {/* Allow only user or client */}
                <AppLayout>
                  <BookingList />
                </AppLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/success"
            element={
              <ProtectedRoute allowedRoles={['user', 'CLIENT']}> {/* Allow only user or client */}
                <AppLayout>
                  <Success />
                </AppLayout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    );
  }
}

export default App;
