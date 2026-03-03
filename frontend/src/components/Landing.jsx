import { useState, useEffect } from 'react';
import AuthForm from './AuthForm';

export default function Landing({ onLogin }) {
  const [mode, setMode] = useState('signin');

  useEffect(() => {
    document.body.classList.add('lavender-beige');
    return () => {
      document.body.classList.remove('lavender-beige');
    };
  }, []);

  const toggleMode = () => setMode(prev => (prev === 'signin' ? 'signup' : 'signin'));

  return (
    <div className="auth-landing">
      <div className="auth-container">
        <h2>{mode === 'signin' ? 'Sign In' : 'Sign Up'}</h2>
        <AuthForm mode={mode} onAuth={onLogin} />
        <p>
          {mode === 'signin' ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button className="link-button" onClick={toggleMode}>
            {mode === 'signin' ? 'Create one' : 'Sign in'}
          </button>
        </p>
      </div>
    </div>
  );
}
