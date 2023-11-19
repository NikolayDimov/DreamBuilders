import { useAuth } from '../../../contexts/AuthContext';

import './Logout.css';


export default function Logout() {
    const { logout } = useAuth();
    const { user } = useAuth();


    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error('Logout error:', error);
        }
    };


    return (
        <div>{user ?
            <section className="container">
                <p>{`Logged In as ${user.email}`}</p>
                <button className="btn btn-primary w-100 py-3" onClick={handleLogout}>Logout</button>
            </section>
            : ''}
        </div>
    );
}