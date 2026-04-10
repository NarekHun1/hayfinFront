import { useEffect, useState } from 'react';
import AdminLayout from '../admin/components/AdminLayout';
import StatsCard from '../admin/components/StatsCard';
import { adminFetch } from '../services/adminApi';
import type { DashboardStats, DashboardUser } from '../types/admin.types';
import '../admin/components/AdminLayout.css';

function formatDate(date?: string | null) {
    if (!date) return '—';

    return new Date(date).toLocaleString('hy-AM', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
    });
}

function getStatusLabel(status: string) {
    switch (status.toLowerCase()) {
        case 'new':
            return 'Նոր';
        case 'in_review':
            return 'Քննարկման մեջ';
        case 'approved':
            return 'Հաստատված';
        case 'rejected':
            return 'Մերժված';
        default:
            return status;
    }
}

export default function AdminDashboardPage() {
    const [data, setData] = useState<DashboardStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const loadDashboard = async () => {
            try {
                setLoading(true);
                setError('');
                const result = await adminFetch<DashboardStats>('/admin/dashboard');
                setData(result);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Տվյալների բեռնումը ձախողվեց');
            } finally {
                setLoading(false);
            }
        };

        loadDashboard();
    }, []);

    return (
        <AdminLayout>
            {loading ? (
                <div className="admin-panel-message">Բեռնվում է...</div>
            ) : error ? (
                <div className="admin-panel-error">{error}</div>
            ) : data ? (
                <div className="admin-dashboard">
                    <div className="admin-dashboard__stats">
                        <StatsCard title="Բոլոր հայտերը" value={data.totalApplications} />
                        <StatsCard title="Նոր հայտեր" value={data.newApplications} />
                        <StatsCard title="Քննարկման մեջ" value={data.inReviewApplications} />
                        <StatsCard title="Հաստատված" value={data.approvedApplications} />
                        <StatsCard title="Մերժված" value={data.rejectedApplications} />
                        <StatsCard title="Բոլոր օգտատերերը" value={data.totalUsers} />
                    </div>

                    <div className="admin-table-card">
                        <div className="admin-table-card__head">
                            <h2>Վերջին հայտերը</h2>
                        </div>

                        <div className="admin-table-wrap">
                            <table className="admin-table">
                                <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Անուն Ազգանուն</th>
                                    <th>Հեռախոս</th>
                                    <th>Գումար</th>
                                    <th>Կարգավիճակ</th>
                                    <th>Ամսաթիվ</th>
                                </tr>
                                </thead>
                                <tbody>
                                {data.latestApplications.length > 0 ? (
                                    data.latestApplications.map((item) => (
                                        <tr key={item.id}>
                                            <td>{item.id}</td>
                                            <td>{item.fullName}</td>
                                            <td>
                                                <a href={`tel:${item.phone}`} className="admin-phone-link">
                                                    {item.phone}
                                                </a>
                                            </td>
                                            <td>{item.amount.toLocaleString('hy-AM')} դրամ</td>
                                            <td>
                                                    <span className={`status-badge status-badge--${item.status.toLowerCase()}`}>
                                                        {getStatusLabel(item.status)}
                                                    </span>
                                            </td>
                                            <td>{formatDate(item.createdAt)}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={6} className="admin-empty-cell">
                                            Հայտեր չկան
                                        </td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="admin-table-card">
                        <div className="admin-table-card__head">
                            <h2>Օգտատերեր</h2>
                        </div>

                        <div className="admin-table-wrap">
                            <table className="admin-table">
                                <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Անուն</th>
                                    <th>Ազգանուն</th>
                                    <th>Հեռախոս</th>
                                    <th>Վերջին մուտք</th>
                                </tr>
                                </thead>
                                <tbody>
                                {data.users && data.users.length > 0 ? (
                                    data.users.map((user: DashboardUser) => (
                                        <tr key={user.id}>
                                            <td>{user.id}</td>
                                            <td>{user.firstName}</td>
                                            <td>{user.lastName}</td>
                                            <td>
                                                <a href={`tel:${user.phone}`} className="admin-phone-link">
                                                    {user.phone}
                                                </a>
                                            </td>
                                            <td>{formatDate(user.lastLoginAt)}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="admin-empty-cell">
                                            Օգտատերեր չկան
                                        </td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            ) : null}
        </AdminLayout>
    );
}