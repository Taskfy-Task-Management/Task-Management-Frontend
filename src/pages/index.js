import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css';
import axios from 'axios';

export default function HomePage() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false); // Added loading state
  const router = useRouter();

  useEffect(() => {
    /**
     * Check if the user is already logged in by checking for a token in localStorage.
     * If the token exists, redirect the user to the Projects page.
     */
    document.title = 'Task Management';

    const token = localStorage.getItem('token');
    if (token) {
      router.push('/projects'); // Redirect to projects if logged in
    }
  }, [router]);

  /**
   * Validates the email format.
   * 
   * @param {string} email - The email address to validate.
   * @returns {boolean} True if the email is valid, false otherwise.
   */
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Standard email validation regex
    return emailRegex.test(email);
  };

  /**
   * Validates the password strength.
   * Password must be at least 8 characters long and include:
   * - At least one uppercase letter
   * - At least one lowercase letter
   * - At least one number
   * - At least one special character
   * 
   * @param {string} password - The password to validate.
   * @returns {boolean} True if the password meets the criteria, false otherwise.
   */
  const isStrongPassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  /**
   * Handles user registration by sending the form data to the backend API.
   * On successful registration, redirects the user to the login page.
   * 
   * @param {Event} e - The form submission event.
   */
  const handleRegister = async (e) => {
    e.preventDefault();

    // Validate email format
    if (!isValidEmail(form.email)) {
      alert('Please enter a valid email address.');
      return;
    }

    // Validate password strength
    if (!isStrongPassword(form.password)) {
      alert(
        'Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character.'
      );
      return;
    }

    setLoading(true);
    try {
      await axios.post('http://localhost:3000/auth/register', form);
      alert('Registration successful! Please login.');
      setForm({ name: '', email: '', password: '' }); // Clear the form
      router.push('/auth/login'); // Redirect to login
    } catch (error) {
      console.error('Error registering user:', error);
      const errorMessage =
        error.response?.data?.message || 'Registration failed. Please try again.';
      alert(errorMessage); // Display specific error message if available
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <h1>Welcome to Task Management</h1>
        <form onSubmit={handleRegister}>
          <h2>Register</h2>
          <input
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <p>
          Already have an account?{' '}
          <a onClick={() => router.push('/auth/login')} className={styles.link}>
            Login here
          </a>
        </p>
      </div>
    </div>
  );
}
