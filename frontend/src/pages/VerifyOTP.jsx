import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "../components/styleAuth/verify.styles.module.css";   


const VerifyOTP = () => {
    const [otp, setOtp] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const [error, setError] = useState("");
	const [message, setMsg] = useState("");
    const handleOTPSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post('http://localhost:5000/api/auth/verify-otp', { email, otp });
        alert(response.data.message);
        navigate('/login');  // Redirect to login page after successful verification
      } catch (error) {
        alert('OTP verification failed. Please try again.');
      }
    };
  return (
    <div className={styles.verify_container}>
      <div className={styles.verify_form_container}>
        <form className={styles.form_container} onSubmit={handleOTPSubmit}>
          <h1>Verify Your OTP</h1>
          <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Enter your email" 
          className={styles.input}
            required
          />
           <input 
          type="text" 
          value={otp} 
          onChange={(e) => setOtp(e.target.value)} 
          placeholder="Enter OTP" 
          className={styles.input}
          required 
          />
          <button type="submit" className={styles.verify_btn}>
            Verify
          </button>
        </form>
        {error && <div className={styles.error_msg}>{error}</div>}
        {message && <div className={styles.success_msg}>{message}</div>}
      </div>
    </div>
  );
};

export default VerifyOTP;