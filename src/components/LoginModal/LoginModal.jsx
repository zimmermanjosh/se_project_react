
import React, { useState } from "react";
import "./LoginModal.css";

const LoginModal = ({ isOpen, onClose, onLogin, onRegisterClick, isLoading, loginError }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ email, password });
  };

  if (!isOpen) return null;

  // Check if form is filled to determine button color
  const isFormFilled = email.trim() && password.trim();

  return (
    <div className="login-modal">
      <div className="login-modal__content">
        {/* Close button */}
        <button
          onClick={onClose}
          className="login-modal__close-button"
          type="button"
        >
          ✕
        </button>

        <div className="login-modal__body">
          <h2 className="login-modal__title">Log in</h2>

          <form onSubmit={handleSubmit} className="login-modal__form">
            {/* Email field */}
            <div className="login-modal__field">
              <label className="login-modal__label">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={`login-modal__input ${loginError ? 'login-modal__input--error' : ''}`}
              />
            </div>

            {/* Password field */}
            <div className="login-modal__field">
              <label className="login-modal__label">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="login-modal__input"
              />
            </div>

            {/* Error message */}
            {loginError && (
              <div className="login-modal__error">
                Incorrect password
              </div>
            )}

            {/* Button container */}
            <div className="login-modal__button-container">
              <button
                type="submit"
                disabled={isLoading}
                className={`login-modal__submit-button ${isFormFilled ? 'login-modal__submit-button--filled' : ''}`}
              >
                {isLoading ? "Logging in..." : "Log in"}
              </button>
              <span className="login-modal__or">or</span>
              <button
                onClick={onRegisterClick}
                type="button"
                className="login-modal__register-button"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;