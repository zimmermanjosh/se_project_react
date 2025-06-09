import React, { useState } from "react";
import "./RegisterModal.css";

const RegisterModal = ({ isOpen, onClose, onRegister, onLoginClick, isLoading }) => {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister({ name, avatar, email, password });
  };

  if (!isOpen) return null;

  return (
    <div className="register-modal">
      <div className="register-modal__content">
        {/* Close button */}
        <button
          onClick={onClose}
          className="register-modal__close-button"
          type="button"
        >
          ✕
        </button>

        <div className="register-modal__body">
          <h2 className="register-modal__title">Sign up</h2>

          <form onSubmit={handleSubmit} className="register-modal__form">
            {/* Email field */}
            <div className="register-modal__field">
              <label className="register-modal__label">Email*</label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="register-modal__input"
              />
            </div>

            {/* Password field */}
            <div className="register-modal__field">
              <label className="register-modal__label">Password*</label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength="8"
                className="register-modal__input"
              />
            </div>

            {/* Name field */}
            <div className="register-modal__field">
              <label className="register-modal__label">Name</label>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                minLength="2"
                maxLength="30"
                className="register-modal__input"
              />
            </div>

            {/* Avatar URL field */}
            <div className="register-modal__field">
              <label className="register-modal__label">Avatar URL</label>
              <input
                type="url"
                name="avatar"
                placeholder="Avatar URL"
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
                className="register-modal__input"
              />
            </div>

            {/* Button container */}
            <div className="register-modal__button-container">
              <button
                type="submit"
                disabled={isLoading}
                className="register-modal__submit-button"
              >
                {isLoading ? "Signing up..." : "Next"}
              </button>
              <span className="register-modal__or">or</span>
              <button
                onClick={onLoginClick}
                type="button"
                className="register-modal__login-button"
              >
                Log in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;