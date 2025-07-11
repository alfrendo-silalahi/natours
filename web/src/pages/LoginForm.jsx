import { useState } from "react";
import { login as loginService } from "../services/auth";
import { useAuth } from "../context/auth.context";
import { Navigate } from "react-router";

export default function LoginForm() {
  const { isAuthenticated, login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleEmailInput(e) {
    setEmail(e.target.value);
  }

  function handlePasswordInput(e) {
    setPassword(e.target.value);
  }

  async function handleLoginForm(e) {
    e.preventDefault();
    const response = await loginService({ email, password });
    login(response.data.token);
  }

  if (isAuthenticated) return <Navigate to="/tours" />;

  return (
    <div className="main">
      <div className="login-form">
        <h2 className="heading-secondary ma-bt-lg">Log into your account</h2>
        <form onSubmit={handleLoginForm} className="form">
          <div className="form__group">
            <label className="form__label" htmlFor="email">
              Email address
            </label>
            <input
              id="email"
              className="form__input"
              type="email"
              placeholder="you@example.com"
              required
              onChange={handleEmailInput}
            />
          </div>
          <div className="form__group ma-bt-md">
            <label className="form__label" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              className="form__input"
              type="password"
              placeholder="••••••••"
              required
              minLength="8"
              onChange={handlePasswordInput}
            />
          </div>
          <div className="form__group">
            <button className="btn btn--green">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}
