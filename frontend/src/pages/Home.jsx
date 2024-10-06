import Footer from '../components/Footer';
import { HashRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Login from './Login';
import Header from '../components/Header';
import Dashboard from './Dashboard';
import Signup from './Signup';
import VerifyOTP from './VerifyOTP';
import PizzaDashboard from './users/PizzaDashboard';
import AdminDashboard from './admin/AdminDashboard';
import HomeScreen from './HomeScreen';

function Home() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    // Check if token and user type are in localStorage for authentication
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role'); // 'admin' or 'user'
    
    if (token) {
      setUserToken(token);
      setIsAdmin(userRole === 'admin'); // Set isAdmin based on role
    }
  }, []);

  return (
    <>
      <Router>
        <Header />
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={ <Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify-otp" element={ <VerifyOTP />} />
          <Route path="/home-screen" element={ <HomeScreen />} />

          {/* Protected User Routes */}
          <Route
            path="/user/dashboard"
            element={userToken && !isAdmin ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/pizza-dashboard"
            element={userToken && !isAdmin ? <PizzaDashboard /> : <Navigate to="/login" />}
          />
          
          {/* Protected Admin Routes */}
          <Route
            path="/admin-dashboard"
            element={userToken && isAdmin ? <AdminDashboard /> : <Navigate to="/login" />}
          />

          {/* Redirect to login if no route is matched */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default Home;
