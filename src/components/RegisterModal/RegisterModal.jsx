import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
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

  return (
    <ModalWithForm
      title="Sign up"
      buttonText={isLoading ? "Signing up..." : "Next"}
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <label className="modal__input-label">
        Name
        <input
          className="modal__input"
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
          minLength="2"
          maxLength="30"
        />
      </label>
      <label className="modal__input-label">
        Avatar URL
        <input
          className="modal__input"
          type="url"
          name="avatar"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
          placeholder="Avatar URL"
        />
      </label>
      <label className="modal__input-label">
        Email
        <input
          className="modal__input"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
      </label>
      <label className="modal__input-label">
        Password
        <input
          className="modal__input"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          minLength="8"
        />
      </label>
      <p className="modal__switch">
        Already have an account?{" "}
        <span className="modal__switch-link" onClick={onLoginClick}>
          Log in
        </span>
      </p>
    </ModalWithForm>
  );
};

export default RegisterModal;