import { Navigate } from "react-router-dom";
import { UserContext } from "../../context/User.context.jsx";
import { useContext } from "react";

export default function GuestRoute({ children }) {
  const { token } = useContext(UserContext);
  if (token) {
    return <Navigate to="/" />;
  } else {
    return children;
  }
}
