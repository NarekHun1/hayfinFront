import { NavLink } from 'react-router-dom';
import './AdminLayout.css';

export default function AdminSidebar() {
    return (
        <aside className="admin-sidebar">
            <div className="admin-sidebar__brand">
                <div className="admin-sidebar__logo">H</div>
                <div>
                    <div className="admin-sidebar__title">HAYFIN</div>
                    <div className="admin-sidebar__subtitle">Admin Panel</div>
                </div>
            </div>

            <nav className="admin-sidebar__nav">
                <NavLink to="/admin/dashboard">Dashboard</NavLink>
                <NavLink to="/admin/applications">Applications</NavLink>
                <NavLink to="/admin/users">Users</NavLink>
                <NavLink to="/admin/content">Content</NavLink>
            </nav>
        </aside>
    );
}