
import { Navigate } from 'react-router-dom';
import { useAuth } from "../../contexts/AuthContext";

export default function AuthGuard(props) {
    const isLoggedIn = useAuth();
    const isAuthenticated = isLoggedIn.isLoggedIn;
    // console.log(isLoggedIn.isLoggedIn);

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return (
        <>
            {props.children}
        </>
    )
}




// in App.js
// <Route path='/create' element={<AuthGuard><Create /></AuthGuard>} />
// <Route path='/catalog/:id/edit' element={<AuthGuard><Edit /></AuthGuard>} />
// <Route path='/logout' element={<AuthGuard><Logout /></AuthGuard>} />