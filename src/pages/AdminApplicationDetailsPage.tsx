import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AdminLayout from '../admin/components/AdminLayout';
import {
    getApplicationById,
    updateApplicationStatus,
} from '../services/applicationsApi';
import type {
    ApplicationStatus,
    LoanApplication,
} from '../types/application.types';
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

function boolLabel(value?: boolean | null) {
    if (value === true) return 'Այո';
    if (value === false) return 'Ոչ';
    return '—';
}

export default function AdminApplicationDetailsPage() {
    const { id } = useParams();
    const numericId = Number(id);

    const [item, setItem] = useState<LoanApplication | null>(null);
    const [status, setStatus] = useState<ApplicationStatus>('NEW');
    const [managerComment, setManagerComment] = useState('');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        const load = async () => {
            try {
                setLoading(true);
                setError('');
                const result = await getApplicationById(numericId);
                setItem(result);
                setStatus(result.status);
                setManagerComment(result.managerComment || '');
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Չհաջողվեց բեռնել հայտը');
            } finally {
                setLoading(false);
            }
        };

        if (numericId) {
            load();
        }
    }, [numericId]);

    const handleSave = async () => {
        try {
            setSaving(true);
            setError('');
            setSuccess('');

            const updated = await updateApplicationStatus(numericId, {
                status,
                managerComment,
            });

            setItem(updated);
            setSuccess('Փոփոխությունները պահպանվել են');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Չհաջողվեց պահպանել');
        } finally {
            setSaving(false);
        }
    };

    return (
        <AdminLayout>
            {loading ? (
                <div className="admin-panel-message">Բեռնվում է...</div>
            ) : error ? (
                <div className="admin-panel-error">{error}</div>
            ) : item ? (
                <div className="admin-dashboard">
                    <div className="admin-table-card">
                        <div className="admin-table-card__head">
                            <h2>Հայտ #{item.id}</h2>
                        </div>

                        <div className="application-details-grid">
                            <div className="detail-box"><strong>Անուն</strong><span>{item.fullName}</span></div>
                            <div className="detail-box"><strong>Հեռախոս</strong><span>{item.phone}</span></div>
                            <div className="detail-box"><strong>Գումար</strong><span>{item.amount.toLocaleString('hy-AM')} դրամ</span></div>
                            <div className="detail-box"><strong>Ժամկետ</strong><span>{item.termMonths} ամիս</span></div>
                            <div className="detail-box"><strong>Ամսական եկամուտ</strong><span>{item.monthlyIncome?.toLocaleString('hy-AM') || '—'}</span></div>
                            <div className="detail-box"><strong>Աշխատավայր</strong><span>{item.workplace || '—'}</span></div>
                            <div className="detail-box"><strong>Վարկի նպատակ</strong><span>{item.loanPurpose || '—'}</span></div>
                            <div className="detail-box"><strong>Զբաղվածություն</strong><span>{item.employmentStatus}</span></div>
                            <div className="detail-box"><strong>Աշխատանքային ստաժ</strong><span>{item.jobYears ?? '—'}</span></div>
                            <div className="detail-box"><strong>Ակտիվ վարկեր</strong><span>{boolLabel(item.hasActiveLoans)}</span></div>
                            <div className="detail-box"><strong>Ընթացիկ ուշացում</strong><span>{boolLabel(item.hasOverdueNow)}</span></div>
                            <div className="detail-box"><strong>Սև ցուցակ նախկինում</strong><span>{boolLabel(item.wasBlacklistedBefore)}</span></div>
                            <div className="detail-box"><strong>Սև ցուցակում հիմա</strong><span>{boolLabel(item.isBlacklistedNow)}</span></div>
                            <div className="detail-box"><strong>Ուշացումներ նախկինում</strong><span>{boolLabel(item.hadDelaysBefore)}</span></div>
                            <div className="detail-box"><strong>Վերջին ուշացումից անցել է</strong><span>{item.monthsSinceLastDelay ?? '—'} ամիս</span></div>
                            <div className="detail-box"><strong>Սքոր</strong><span>{item.scoringPoints}</span></div>
                            <div className="detail-box"><strong>Հաստատման հավանականություն</strong><span>{item.approvalProbability}%</span></div>
                            <div className="detail-box"><strong>Probability Level</strong><span>{item.probabilityLevel}</span></div>
                            <div className="detail-box"><strong>Auto decision</strong><span>{item.autoDecision}</span></div>
                            <div className="detail-box detail-box--full"><strong>Risk notes</strong><span>{item.riskNotes || '—'}</span></div>
                            <div className="detail-box detail-box--full"><strong>Մեկնաբանություն</strong><span>{item.comment || '—'}</span></div>
                            <div className="detail-box"><strong>Ստեղծվել է</strong><span>{formatDate(item.createdAt)}</span></div>
                            <div className="detail-box"><strong>Թարմացվել է</strong><span>{formatDate(item.updatedAt)}</span></div>
                        </div>
                    </div>

                    <div className="admin-table-card">
                        <div className="admin-table-card__head">
                            <h2>Կառավարում</h2>
                        </div>

                        <div className="admin-form-block">
                            <div className="field">
                                <label>Կարգավիճակ</label>
                                <select
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value as ApplicationStatus)}
                                >
                                    <option value="NEW">NEW</option>
                                    <option value="IN_REVIEW">IN_REVIEW</option>
                                    <option value="APPROVED">APPROVED</option>
                                    <option value="REJECTED">REJECTED</option>
                                </select>
                            </div>

                            <div className="field">
                                <label>Մենեջերի մեկնաբանություն</label>
                                <textarea
                                    rows={5}
                                    value={managerComment}
                                    onChange={(e) => setManagerComment(e.target.value)}
                                />
                            </div>

                            {success && <div className="form-success">{success}</div>}
                            {error && <div className="form-error">{error}</div>}

                            <button className="application-submit" onClick={handleSave} disabled={saving}>
                                {saving ? 'Պահպանվում է...' : 'Պահպանել'}
                            </button>
                        </div>
                    </div>
                </div>
            ) : null}
        </AdminLayout>
    );
}