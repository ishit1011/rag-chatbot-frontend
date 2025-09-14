import jwt_decode from "jwt-decode";

export const isTokenExpired = (token) => {
  if (!token) return true;

  try {
    const decoded = jwt_decode(token);
    const currentTime = Date.now() / 1000; // seconds
    return decoded.exp < currentTime;
  } catch (e) {
    console.error("Invalid token:", e);
    return true;
  }
};

/*
    if () {
    // Token expired → logout user
    localStorage.removeItem('auth');
    navigate('/login'); // redirect to auth page
    }

*/
