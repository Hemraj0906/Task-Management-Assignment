
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import styles from "./Login.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please fill in the email.");
      return;
    }

    if (!password) {
      toast.error("Please fill in the password.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );

      if (response.status === 200) {
        const { token, userId } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId);

        toast.success("Login successful!");
        navigate("/tasks");
      } else {
        toast.error("Login failed!");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          toast.error("Email is not found Please Fill proper email.");
        } else if (error.response.status === 401) {
          toast.error("Password Invalid credentials Please Fill Right password.");
        } else {
          toast.error("Login failed. Please try again later.");
        }
      } else {
        toast.error("Login failed. Please try again later.");
      }
      console.error("Error:", error);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginForm}>
        <h1 className={styles.loginHeading}>Login</h1>
        <form onSubmit={handleSubmit}>
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
            Login
          </button>
        </form>
        <div className={styles.loginLinkContainer}>
          Don't have an account?{" "}
          <Link to="/register" className={styles.loginLink}>
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
