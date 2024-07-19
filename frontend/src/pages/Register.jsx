

// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {  toast } from "react-toastify";

import styles from "./Register.module.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name) {
      toast.error("Please fill in the name field.");
      return;
    }

    if (!email) {
      toast.error("Please fill in the email field.");
      return;
    }

    if (!password) {
      toast.error("Please fill in the password field.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name,
          email,
          password,
        }
      );

      console.log(response.data); 

      if (response.status === 201) {
        toast.success("Registration successful!");
        navigate("/login");
      } else {
        toast.error("Registration failed!");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error("Email already exists. Please use a different email.");
      } else {
        toast.error("Registration failed. Please try again later.");
      }
      console.error("Error:", error);
    }
  };

  return (
    <div className={styles.registerContainer}>
      
      <div className={styles.registerForm}>
        <h1 className={styles.registerHeading}>Register</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className={styles.formInput}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={styles.formInput}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={styles.formInput}
            />
          </div>
          <button type="submit" className={styles.submitButton}>
            Register
          </button>
        </form>
        <div className={styles.loginLinkContainer}>
          Already have an account?{" "}
          <Link to="/login" className={styles.loginLink}>
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
