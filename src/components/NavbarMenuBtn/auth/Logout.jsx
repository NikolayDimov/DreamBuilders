import { useAuth } from '../../../contexts/AuthContext';

import './Logout.css';


export default function Logout() {
    const { logout } = useAuth();
    const { user } = useAuth();


    const handleLogout = async () => {
        try {
            await logout();
            // Handle successful logout, e.g., redirect to a login page or a home page.
        } catch (error) {
            console.error('Logout error:', error);
        }
    };


    return (
        <div>{user ?
            <section className="container">
                <h5>{`Logged In as ${user.email}`}</h5>
                <button className="btn btn-primary w-100 py-3" onClick={handleLogout}>Logout</button>
            </section>
            : ''}
        </div>
    );
}