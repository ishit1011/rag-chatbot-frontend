import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {

  const isAuth = localStorage.getItem("auth");
  return isAuth ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;

// import { Navigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// const ProtectedRoute = ({ children }) => {
//   const { isAuth } = useAuth();  // ✅ use custom hook
//   return isAuth ? children : <Navigate to="/" replace />;
// };

// export default ProtectedRoute;
