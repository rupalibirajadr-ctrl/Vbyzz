import React, { useState } from 'react';
import { AudioLines } from 'lucide-react';
import './LoginPage.css';

const LoginPage = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    identifier: '', // email or phone
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.identifier && formData.password) {
      // Complete mock login/signup
      onLogin(formData);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card fade-in">
        <div className="auth-header">
          <div className="premium-logo auth-logo-wrapper">
            <AudioLines size={32} color="white" />
          </div>
          <h1>Vbyzz</h1>
        </div>

        <h2 className="auth-title">
          {isLogin ? 'Log in to Vbyzz' : 'Sign up for free to start listening.'}
        </h2>

        <form className="auth-form" onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="form-group">
              <label>What should we call you?</label>
              <input
                type="text"
                placeholder="Enter a profile name."
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                required={!isLogin}
              />
            </div>
          )}

          <div className="form-group">
            <label>Email address or Phone number</label>
            <input
              type="text"
              placeholder="Email address or Phone number"
              value={formData.identifier}
              onChange={e => setFormData({ ...formData, identifier: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={e => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>

          <button type="submit" className="auth-submit-btn hover-scale">
            {isLogin ? 'Log In' : 'Sign Up'}
          </button>
        </form>

        <div className="auth-toggle">
          <span className="text-subdued">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}
          </span>
          <button className="text-btn hover-scale" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Sign up for Vbyzz' : 'Log in here'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
