import { useEffect, useState } from 'react';
import { getWatchlist, removeFromWatchlist } from '../../services/watchlist';
import { getUserIdFromToken } from '../../utils/auth'; // Helper to get user ID
import styles from '../../styles/Watchlist.module.css';
import Link from 'next/link'; // Import Link for navigation

export default function WatchlistPage() {
  const [watchlist, setWatchlist] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const id = getUserIdFromToken();
    if (!id) {
      alert('You are not logged in!');
      window.location.href = '/auth/login'; // Redirect to login if not logged in
    } else {
      setUserId(id);
      fetchWatchlist(id);
    }
  }, []);

  // Fetch all tasks in the user's watchlist
  const fetchWatchlist = async (id) => {
    try {
      const response = await getWatchlist(id);
      setWatchlist(response.data);
    } catch (error) {
      console.error('Error fetching watchlist:', error);
    }
  };

  // Remove a task from the watchlist
  const handleRemove = async (taskId) => {
    if (confirm('Are you sure you want to remove this task from your watchlist?')) {
      try {
        await removeFromWatchlist(userId, taskId);
        fetchWatchlist(userId);
        alert('Task removed from watchlist!');
      } catch (error) {
        console.error('Error removing task from watchlist:', error);
        alert('Error removing task from watchlist.');
      }
    }
  };

  return (
    <div className={styles.watchlistPage}>
      <header className={styles.header}>
        <h1>Your Watchlist</h1>
        <Link href="/projects">
          <button className={styles.backButton}>Back to Projects</button>
        </Link>
      </header>
      <table className={styles.watchlistTable}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {watchlist.map((item) => (
            <tr key={item.task.id}>
              <td>{item.task.title}</td>
              <td>{item.task.description}</td>
              <td>{item.task.status}</td>
              <td>{item.task.priority}</td>
              <td>
                <button onClick={() => handleRemove(item.task.id)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
