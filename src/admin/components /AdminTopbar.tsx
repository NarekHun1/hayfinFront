import { useNavigate } from 'react-router-dom';
import { getAdminUser, removeAdminToken } from '../../utils/adminAuth';
import './AdminLayout.css';

export default function AdminTopbar() {
    const navigate = useNavigate();
    const user = getAdminUser();

    const handleLogout = () => {
        removeAdminToken();
        navigate('/admin/login');
    };

    return (
        <div className="admin-topbar">
            <div>
                <h1 className="admin-topbar__title">Admin Dashboard</h1>
                <p className="admin-topbar__subtitle">
                    Role: {user?.role || 'Unknown'}
                </p>
            </div>

            <button className="admin-topbar__logout" onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
}