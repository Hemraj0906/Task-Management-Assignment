

// eslint-disable-next-line no-unused-vars
import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";

const Home = () => {
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate("/register");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className={styles.homeContainer}>
      <h1 className={styles.title}>Welcome to Task Management System</h1>
      <div className={styles.buttonContainer}>
        <button onClick={handleRegister} className={styles.button}>
          Register
        </button>
        <button onClick={handleLogin} className={styles.button}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Home;

