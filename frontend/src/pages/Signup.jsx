import { useState } from "react";
import axios from "axios";
import { Link,useNavigate } from "react-router-dom";
import styles from "../components/styleAuth/reg.styles.module.css";

const Signup = () => {
	// State for form data, error message, password visibility
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isAdmin, setIsAdmin] = useState(false);
	const navigate = useNavigate();
	const [error, setError] = useState("");
	const [msg, setMsg] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	
	// Function to toggle password visibility
	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};
	const handleRegister = async (e) => {
		e.preventDefault();
		try {
		  // API call to backend registration endpoint
		  await axios.post('http://localhost:5000/api/auth/register', { name, email, password, isAdmin });
		  alert('Registration successful! Please check your email for verification.');
		  navigate('/verify-otp');  // Redirect to OTP verification page
		} catch (error) {
		  console.error('Registration failed:', error);
		  alert('Registration failed, please try again.');
		}
	  };
	

	return (
		<div className={styles.signup_container}>
			<div className={styles.signup_form_container}>
				<div className={styles.left}>
					<h1>Welcome Back</h1>
					<Link to="/login">
						<button type="button" className={styles.white_btn}>
							Sign in
						</button>
					</Link>
				</div>
				<div className={styles.right}>
					<form className={styles.form_container} onSubmit={handleRegister}>
					<h2>{isAdmin ? 'Admin Registration' : 'User Registration'}</h2>
				
							<input 
							type="text" 
							value={name} 
							onChange={(e) => setName(e.target.value)} 
							placeholder="Full Name" 
							required 
							className={styles.input}
							/>
							<input 
							type="email" 
							value={email} 
							onChange={(e) => setEmail(e.target.value)} 
							placeholder="Email" 
							required 
							className={styles.input}
							/>
							<div className={styles.password_container}>
							<input 
							type={showPassword ? "text" : "password"}
							value={password} 
							onChange={(e) => setPassword(e.target.value)} 
							placeholder="Password" 
							required 
							className={styles.input}
							/>
							<span onClick={togglePasswordVisibility} className={styles.eye_icon}>
								{showPassword ? '👁️' : '👁️‍🗨️'} {/* Eye icon for toggling visibility */}
							</span>
						</div>
					<label>
						<input 
							type="checkbox" 
							checked={isAdmin} 
							onChange={() => setIsAdmin(!isAdmin)} 
						/>
						Register as Admin
					</label>
						{error && <div className={styles.error_msg}>{error}</div>}
						{msg && <div className={styles.success_msg}>{msg}</div>}
						<button type="submit" className={styles.green_btn}>
							Sign Up
						</button>
						
					</form>
				</div>
			</div>
		</div>
	);
};

export default Signup;
