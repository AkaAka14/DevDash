import { useState, useEffect } from 'react';
import axios from 'axios';

export default function AuthForm({ mode, onAuth }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // google id script
  useEffect(() => {
    const id = 'google-signin-script';
    if (!document.getElementById(id)) {
      const s = document.createElement('script');
      s.src = 'https://accounts.google.com/gsi/client';
      s.id = id;
      s.onload = () => {
        if (window.google) {
          google.accounts.id.initialize({
            client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
            callback: window.onGoogleAuth
          });
        }
      };
      document.head.appendChild(s);
    } else if (window.google) {
      google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: window.onGoogleAuth
      });
    }
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (mode === 'signup') {
        if (password !== confirm) throw new Error('Passwords do not match');
        const res = await axios.post('/api/auth/signup', { username: email, password });
        localStorage.setItem('token', res.data.token);
        onAuth({ name: email });
      } else {
        const res = await axios.post('/api/auth/signin', { username: email, password });
        localStorage.setItem('token', res.data.token);
        onAuth({ name: email });
      }
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = () => {
    /* global google */
    google.accounts.id.prompt();
  };

  // callback for Google
  window.onGoogleAuth = async response => {
    try {
      const res = await axios.post('/api/auth/google', { id_token: response.credential });
      localStorage.setItem('token', res.data.token);
      onAuth({ name: 'GoogleUser' });
    } catch (err) {
      setError('Google sign-in failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form fade">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      {mode === 'signup' && (
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirm}
          onChange={e => setConfirm(e.target.value)}
          required
        />
      )}
      <button type="submit" disabled={loading}>
        {loading ? 'Please wait...' : mode === 'signin' ? 'Sign In' : 'Sign Up'}
      </button>
      <div id="g_id_onload"
           data-client_id={import.meta.env.VITE_GOOGLE_CLIENT_ID}
           data-callback="onGoogleAuth"
           data-auto_prompt="false">
      </div>
      <div className="g_id_signin" data-type="standard"></div>
      {error && <p className="error">{error}</p>}
    </form>
  );
}
