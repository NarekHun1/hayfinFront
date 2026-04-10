import type { ReactNode } from 'react';
import AdminSidebar from './AdminSidebar';
import AdminTopbar from './AdminTopbar';
import './AdminLayout.css';

type Props = {
    children: ReactNode;
};

export default function AdminLayout({ children }: Props) {
    return (
        <div className="admin-layout">
            <AdminSidebar />

            <div className="admin-layout__main">
                <AdminTopbar />
                <div className="admin-layout__content">{children}</div>
            </div>
        </div>
    );
}