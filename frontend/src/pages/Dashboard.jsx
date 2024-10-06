import React from 'react'
import styles from "../components/styleAuth/main.styles.module.css";
// import PizzaDashboard from "./users/PizzaDashboard";
import PizzaBuilder from './users/PizzaBuilder';
import PizzaList from './users/PizzaList';

function Dashboard() {
  const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

  return (
   
    <div className={styles.main_container}>
			<nav className={styles.navbar}>
				<h1>Mern Pizza User</h1>
				<button className={styles.white_btn} onClick={handleLogout}>
					Logout
				</button>
			</nav>
      <h2>Dashboard</h2>
      <p>Welcome to the pizza dashboard! Choose your pizza ingredients here.</p>
      <PizzaBuilder />
	  <PizzaList />
		</div>

  )
}

export default Dashboard