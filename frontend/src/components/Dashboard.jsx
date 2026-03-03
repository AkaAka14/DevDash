import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Dashboard({ user }) {
  const [contests, setContests] = useState([]);

  useEffect(() => {
    axios.get('/api/contests').then(res => setContests(res.data.upcoming || []));
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      {user ? <p>Logged in as {user.name}</p> : <p>Please sign in to see personalized data.</p>}
      <h3>Upcoming Contests</h3>
      <ul>
        {contests.map(c => (
          <li key={c.id}>{c.provider}: {c.name} ({new Date(c.start).toLocaleString()})</li>
        ))}
      </ul>
    </div>
  );
}
