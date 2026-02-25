import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful!");
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message || "Login failed");
    }

    setLoading(false);
  };

  return (
    <div className="login-page">
      <div className="login-wrapper">
        {/* Left Form */}
        <div className="login-form">
          <h2>Welcome Back</h2>
          <p className="subtitle">Login to manage your smart home</p>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="email"
                placeholder="Email address"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <span className="input-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
              </span>
            </div>

            <div className="input-group">
              <input
                type="password"
                placeholder="Password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="input-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              </span>
            </div>

            <button type="submit" disabled={loading}>
              {loading ? (
                <span className="loading-container">
                  <svg className="spinner" viewBox="0 0 50 50"><circle cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle></svg>
                  Logging in...
                </span>
              ) : "Sign In"}
            </button>

            {error && <p className="error">{error}</p>}
          </form>

          <p className="signup-prompt">
            New user? <Link to="/signup">Create an account</Link>
          </p>
        </div>

        {/* Right Image */}
        <div className="login-image">
          <img src="/src/assets/ha1.jpg" alt="Smart Home Login" />
        </div>
      </div>
    </div>
  );
};

export default Login;
