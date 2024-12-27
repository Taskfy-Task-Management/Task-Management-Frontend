import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/Home.module.css';
import axios from 'axios';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/auth/login', form);
      console.log('Token:', response.data.accessToken); // Log the token
      localStorage.setItem('token', response.data.accessToken); // Store token
      alert('Login successful!');
      router.push('/projects'); // Redirect to the projects page
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
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
          <button type="submit">Login</button>
        </form>
        <p>
          Don't have an account?{' '}
          <a onClick={() => router.push('/')} className={styles.link}>
            Register here
          </a>
        </p>
      </div>
    </div>
  );
}
