import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import styles from "../components/styleAuth/login.styles.module.css";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
	const [message, setMessage] = useState(""); // Success message for email verification
    const [loading, setLoading] = useState(false); // Loading state for button
  // Handle input changes
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });

      // Store the token and role in localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', response.data.user.isAdmin ? 'admin' : 'user');

     // Redirect based on user role
    if (response.data.user.isAdmin) {
      navigate('/admin-dashboard'); 
    } else {
      navigate('/user/dashboard');
    }
    } catch (error) {
      console.error('Login failed:', error.response?.data?.message || error.message);
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className={styles.login_container}>
      <div className={styles.login_form_container}>
        <div className={styles.left}>
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <h2>{isAdmin ? 'Admin Login' : 'User Login'}</h2>
            {message && <div className={styles.success_msg}>{message}</div>} {/* Show verification success message */}
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Email" 
          required 
          className={styles.input}
        />
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Password" 
          required 
          className={styles.input}
        />
            {/* Checkbox to toggle between User and Admin */}
        <label>
          <input 
            type="checkbox" 
            checked={isAdmin} 
            onChange={() => setIsAdmin(!isAdmin)} 
            className={styles.input}
          />
          Login as Admin
        </label>
            {error && <div className={styles.error_msg}>{error}</div>}
            
            {/* Login button - disable during loading */}
            <button type="submit" className={styles.green_btn} disabled={loading}>
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>
        </div>
        
        <div className={styles.right}>
          <h1>New Here?</h1>
          <Link to="/signup">
            <button type="button" className={styles.white_btn}>
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
