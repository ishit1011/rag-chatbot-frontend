import { useNavigate } from "react-router-dom";
import "../assets/styles/auth.scss";
import { GoogleLogin } from '@react-oauth/google'

// import jwt_decode from 'jwt-decode'


const decodeJwt = (token) => {
  if (!token) return null;
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (err) {
    console.error("Invalid token", err);
    return null;
  }
};

const HomePage = () => {
  const navigate = useNavigate();


  const handleSuccess = (credentialResponse) => {
    const token = credentialResponse.credential // idToken
    const user = decodeJwt(token)
    if (user && user.email) {
      localStorage.setItem('auth', 'true')
      localStorage.setItem('userEmail', user.email)
      localStorage.setItem('isToken', token)
      navigate('/chat')
    }
  }

  const handleError = () => {
    alert('Google login failed. Please try again.')
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>BharatAI</h1>
        <p>Your AI-powered news assistant</p>
        {/* Google login button */}
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={handleError}
        />
      </div>
    </div>
  );
};

export default HomePage;
