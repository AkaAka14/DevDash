import { Routes, Route, Link } from 'react-router-dom';
import Landing from './components/Landing';
import Dashboard from './components/Dashboard';
import Notifications from './components/Notifications';
import Bookmarks from './components/Bookmarks';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [user, setUser] = useState(null);

  // attach token to axios if present
  useEffect(() => {
    const tk = localStorage.getItem('token');
    if (tk) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${tk}`;
      // fetch current user
      axios.get('/api/me').then(r => setUser({ name: r.data.username })).catch(() => setUser(null));
    }
  }, []);

  return (
    <>
      <nav>
        <Link to="/">Home</Link>
        {user && <Link to="/notifications">Notifications</Link>}
        {user && <Link to="/bookmarks">Bookmarks</Link>}
        {!user && <span style={{marginLeft:'1rem'}}>Please sign in</span>}
        {user && <span style={{marginLeft:'1rem'}}>Welcome, {user.name}</span>}
        {user && <button onClick={() => { localStorage.removeItem('token'); setUser(null); delete axios.defaults.headers.common['Authorization']; }} style={{marginLeft:'1rem'}}>Logout</button>}
      </nav>
      <div className="container">
        <Routes>
          <Route path="/" element={user ? <Dashboard user={user} /> : <Landing onLogin={setUser} />} />
          <Route path="/notifications" element={<Notifications user={user} />} />
          <Route path="/bookmarks" element={<Bookmarks user={user} />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
