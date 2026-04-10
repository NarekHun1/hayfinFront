import { useEffect, useState } from 'react';
import AdminLayout from '../admin/components /AdminLayout';
import StatsCard from '../admin/components /StatsCard';
import { adminFetch } from '../services/adminApi';
import type { DashboardStats } from '../types/admin.types';
import '../admin/components /AdminLayout.css';

export default function AdminDashboardPage() {
    const [data, setData] = useState<DashboardStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const loadDashboard = async () => {
            try {
                setLoading(true);
                const result = await adminFetch<DashboardStats>('/admin/dashboard');
                setData(result);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load dashboard');
            } finally {
                setLoading(false);
            }
        };

        loadDashboard();
    }, []);

    return (
        <AdminLayout>
            {loading ? (
                <div className="admin-panel-message">Loading dashboard...</div>
            ) : error ? (
                <div className="admin-panel-error">{error}</div>
            ) : data ? (
                <div className="admin-dashboard">
                    <div className="admin-dashboard__stats">
                        <StatsCard title="Total Applications" value={data.totalApplications} />
                        <StatsCard title="New Applications" value={data.newApplications} />
                        <StatsCard title="In Review" value={data.inReviewApplications} />
                        <StatsCard title="Approved" value={data.approvedApplications} />
                        <StatsCard title="Rejected" value={data.rejectedApplications} />
                        <StatsCard title="Total Users" value={data.totalUsers} />
                    </div>

                    <div className="admin-table-card">
                        <div className="admin-table-card__head">
                            <h2>Latest Applications</h2>
                        </div>

                        <div className="admin-table-wrap">
                            <table className="admin-table">
                                <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Phone</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                    <th>Date</th>
                                </tr>
                                </thead>
                                <tbody>
                                {data.latestApplications.map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.fullName}</td>
                                        <td>{item.phone}</td>
                                        <td>{item.amount.toLocaleString()}</td>
                                        <td>
                                                <span className={`status-badge status-badge--${item.status.toLowerCase()}`}>
                                                    {item.status}
                                                </span>
                                        </td>
                                        <td>
                                            {new Date(item.createdAt).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            ) : null}
        </AdminLayout>
    );
}