import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../admin/components/AdminLayout';
import { getApplications } from '../services/applicationsApi';
import type { LoanApplication } from '../types/application.types';
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

export default function AdminApplicationsPage() {
    const [items, setItems] = useState<LoanApplication[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [statusFilter, setStatusFilter] = useState('ALL');

    useEffect(() => {
        const load = async () => {
            try {
                setLoading(true);
                setError('');
                const result = await getApplications();
                setItems(result);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Չհաջողվեց բեռնել հայտերը');
            } finally {
                setLoading(false);
            }
        };

        load();
    }, []);

    const filteredItems = useMemo(() => {
        if (statusFilter === 'ALL') return items;
        return items.filter((item) => item.status === statusFilter);
    }, [items, statusFilter]);

    return (
        <AdminLayout>
            {loading ? (
                <div className="admin-panel-message">Բեռնվում է...</div>
            ) : error ? (
                <div className="admin-panel-error">{error}</div>
            ) : (
                <div className="admin-dashboard">
                    <div className="admin-table-card">
                        <div className="admin-table-card__head" style={{ gap: '12px', flexWrap: 'wrap' }}>
                            <h2>Բոլոր հայտերը</h2>

                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="admin-select"
                            >
                                <option value="ALL">Բոլորը</option>
                                <option value="NEW">Նոր</option>
                                <option value="IN_REVIEW">Քննարկման մեջ</option>
                                <option value="APPROVED">Հաստատված</option>
                                <option value="REJECTED">Մերժված</option>
                            </select>
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
                                    <th>Սքոր</th>
                                    <th>Ամսաթիվ</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                {filteredItems.length > 0 ? (
                                    filteredItems.map((item) => (
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
                                            <td>{item.scoringPoints}</td>
                                            <td>{formatDate(item.createdAt)}</td>
                                            <td>
                                                <Link to={`/admin/applications/${item.id}`} className="admin-action-link">
                                                    Բացել
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={8} className="admin-empty-cell">
                                            Հայտեր չկան
                                        </td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}