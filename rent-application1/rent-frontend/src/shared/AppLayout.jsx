import React from 'react';
import { useLocation } from 'react-router-dom'; // Use for v6+ compatibility
import NavBar from '../components/NavBar';

function AppLayout({ children }) {
  const location = useLocation();

  return (
    <>
      {(location.pathname !== '/signin' && location.pathname !== '/signup') && <NavBar />}
      {children}
    </>
  );
}

export default AppLayout;