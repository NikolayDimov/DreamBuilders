import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from "../../contexts/AuthContext";

export default function AuthGuard(props) {
    const isLoggedIn = useAuth();
    const isAuthenticated = isLoggedIn.isLoggedIn;
    // console.log(isLoggedIn.isLoggedIn);

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return <Outlet />
}