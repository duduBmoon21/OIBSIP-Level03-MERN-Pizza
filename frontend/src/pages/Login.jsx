import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "../components/styleAuth/login.styles.module.css";
import HomeScreen from "./HomeScreen";

const Login = () => {
  const [email, setEmail] = useState('');         // User's email
  const [password, setPassword] = useState('');   // User's password
  const [error, setError] = useState('');         // Error message state
  const [loading, setLoading] = useState(false);  // Loading state for button
  const navigate = useNavigate();                 // Navigation hook

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);  // Set loading to true while the request is processed

    try {
      // Post the login data to the backend
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      const { token, role } = response.data;

      // Save token and role to localStorage
      localStorage.setItem('authToken', token);
      localStorage.setItem('role', role);

      // Redirect based on role
      if (role === 'admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/user/dashboard');
      }

    } catch (error) {
      // Set error message based on response
      setError('Login failed. Please check your credentials.');
      console.error('Login failed:', error.response?.data?.message || error.message);
    } finally {
      setLoading(false);  // Turn off loading spinner
    }
  };

  return (
    <div className={styles.login_container}>
      <HomeScreen />
      <div className={styles.login_form_container}>
        <div className={styles.left}>
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <h2>Sign In</h2>

            {/* Input for email */}
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="Email" 
              required 
              className={styles.input}
            />

            {/* Input for password */}
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Password" 
              required 
              className={styles.input}
            />

            {/* Display error message if login fails */}
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
