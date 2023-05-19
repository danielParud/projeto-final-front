import { useNavigate } from "react-router-dom";
import { VIEWS } from "../../utils/routes";
import { Navigate, Outlet } from "react-router-dom";

export function AuthRouteProtector() {
  const loggedInUser = localStorage.getItem("loggedInUser");
  return loggedInUser ? <Outlet /> : <Navigate to={VIEWS.SIGNIN} />;
}
