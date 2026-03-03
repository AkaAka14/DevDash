import { useState } from 'react';

export default function Login({ onLogin }) {
  const [loading, setLoading] = useState(false);

  const handleGoogle = () => {
    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
      onLogin({ name: 'GoogleUser', provider: 'google' });
    }, 1000);
  };

  return (
    <div>
      <h2>Sign in</h2>
      <button onClick={handleGoogle} disabled={loading}>
        {loading ? 'Authenticating...' : 'Sign in with Google'}
      </button>
      <p>(OAuth flow would redirect to Google's consent screen.)</p>
    </div>
  );
}
