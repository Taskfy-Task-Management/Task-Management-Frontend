import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css';
import axios from 'axios';

export default function HomePage() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (token) {
      router.push('/projects'); // Redirect to projects if logged in
    }
  }, [router]);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/auth/register', form);
      alert('Registration successful! Please login.');
      router.push('/auth/login'); // Redirect to login
    } catch (error) {
      console.error('Error registering user:', error);
      alert('Registration failed.');
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
          <button type="submit">Register</button>
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
