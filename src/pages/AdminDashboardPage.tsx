import { useEffect, useState } from 'react';
import AdminLayout from '../admin/components/AdminLayout';
import StatsCard from '../admin/components/StatsCard';
import { adminFetch } from '../services/adminApi';
import type { DashboardStats, DashboardUser } from '../types/admin.types';
import '../admin/components/AdminLayout.css';

type UsersResponse = {
    users: DashboardUser[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
};

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
    const [users, setUsers] = useState<DashboardUser[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // загрузка dashboard
    useEffect(() => {
        const loadDashboard = async () => {
            try {
                const dashboard = await adminFetch<DashboardStats>('/admin/dashboard');
                setData(dashboard);
            } catch (err) {
                setError('Սխալ dashboard');
            }
        };

        loadDashboard();
    }, []);

    // загрузка users (по страницам)
    const loadUsers = async (pageNum: number) => {
        try {
            const res = await adminFetch<UsersResponse>(
                `/admin/users?page=${pageNum}&limit=20`
            );

            setUsers((prev) => [...prev, ...(res.users || [])]);

            if (pageNum >= res.totalPages) {
                setHasMore(false);
            }
        } catch (e) {
            console.log('users error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadUsers(page);
    }, [page]);

    // scroll handler
    const handleScroll = (e: any) => {
        const bottom =
            e.target.scrollHeight - e.target.scrollTop <= e.target.clientHeight + 5;

        if (bottom && hasMore) {
            setPage((p) => p + 1);
        }
    };

    return (
        <AdminLayout>
            {loading && users.length === 0 ? (
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

                    {/* заявки */}
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
                                {data.latestApplications.map((item) => (
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
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* users infinite scroll */}
                    <div className="admin-table-card">
                        <div className="admin-table-card__head">
                            <h2>Օգտատերեր</h2>
                        </div>

                        <div
                            className="admin-table-wrap"
                            style={{ maxHeight: '400px', overflowY: 'auto' }}
                            onScroll={handleScroll}
                        >
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
                                {users.map((user) => (
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
                                ))}
                                </tbody>
                            </table>

                            {hasMore && (
                                <div style={{ padding: 10, textAlign: 'center' }}>
                                    Loading...
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ) : null}
        </AdminLayout>
    );
}