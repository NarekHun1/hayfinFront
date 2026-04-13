import { useState } from 'react';
import Header from './Header';
import { createApplication } from '../services/applicationsApi';
import type {
    CreateApplicationPayload,
    EmploymentStatus,
} from '../types/application.types';
import '../admin/components/ApplicationPage.css';

const initialState: CreateApplicationPayload = {
    fullName: '',
    phone: '',
    amount: 300000,
    termMonths: 12,
    monthlyIncome: 0,
    workplace: '',
    loanPurpose: '',
    hasActiveLoans: false,
    comment: '',
    employmentStatus: 'EMPLOYED',
    jobYears: 0,
    activeLoanMonthlyPay: 0,
    hasOverdueNow: false,
    wasBlacklistedBefore: false,
    isBlacklistedNow: false,
    hadDelaysBefore: false,
    monthsSinceLastDelay: 0,
};

export default function ApplicationPage() {
    const [form, setForm] = useState<CreateApplicationPayload>(initialState);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const setField = <K extends keyof CreateApplicationPayload>(
        key: K,
        value: CreateApplicationPayload[K],
    ) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const payload: CreateApplicationPayload = {
                ...form,
                amount: Number(form.amount),
                termMonths: Number(form.termMonths),
                monthlyIncome: Number(form.monthlyIncome || 0),
                jobYears: Number(form.jobYears || 0),
                activeLoanMonthlyPay: Number(form.activeLoanMonthlyPay || 0),
                monthsSinceLastDelay: Number(form.monthsSinceLastDelay || 0),
            };

            const result = await createApplication(payload);

            setSuccess(`Заявка успешно отправлена. ID: ${result.id}`);
            setForm(initialState);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Не удалось отправить заявку');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="application-page">
            <Header />

            <main className="application-main">
                <div className="application-card">
                    <div className="application-head">
                        <span className="application-badge">HAYFIN</span>
                        <h1>Оформить заявку</h1>
                        <p>Заполните данные и отправьте заявку на рассмотрение.</p>
                    </div>

                    <form className="application-form" onSubmit={handleSubmit}>
                        <div className="application-grid">
                            <div className="field">
                                <label>ФИО</label>
                                <input
                                    value={form.fullName}
                                    onChange={(e) => setField('fullName', e.target.value)}
                                    required
                                />
                            </div>

                            <div className="field">
                                <label>Телефон</label>
                                <input
                                    value={form.phone}
                                    onChange={(e) => setField('phone', e.target.value)}
                                    required
                                />
                            </div>

                            <div className="field">
                                <label>Сумма</label>
                                <input
                                    type="number"
                                    value={form.amount}
                                    onChange={(e) => setField('amount', Number(e.target.value))}
                                    required
                                />
                            </div>

                            <div className="field">
                                <label>Срок (месяцев)</label>
                                <input
                                    type="number"
                                    value={form.termMonths}
                                    onChange={(e) => setField('termMonths', Number(e.target.value))}
                                    required
                                />
                            </div>

                            <div className="field">
                                <label>Доход в месяц</label>
                                <input
                                    type="number"
                                    value={form.monthlyIncome ?? 0}
                                    onChange={(e) => setField('monthlyIncome', Number(e.target.value))}
                                />
                            </div>

                            <div className="field">
                                <label>Место работы</label>
                                <input
                                    value={form.workplace ?? ''}
                                    onChange={(e) => setField('workplace', e.target.value)}
                                />
                            </div>

                            <div className="field">
                                <label>Цель кредита</label>
                                <input
                                    value={form.loanPurpose ?? ''}
                                    onChange={(e) => setField('loanPurpose', e.target.value)}
                                />
                            </div>

                            <div className="field">
                                <label>Статус занятости</label>
                                <select
                                    value={form.employmentStatus}
                                    onChange={(e) =>
                                        setField('employmentStatus', e.target.value as EmploymentStatus)
                                    }
                                >
                                    <option value="EMPLOYED">EMPLOYED</option>
                                    <option value="SELF_EMPLOYED">SELF_EMPLOYED</option>
                                    <option value="UNEMPLOYED">UNEMPLOYED</option>
                                    <option value="STUDENT">STUDENT</option>
                                    <option value="PENSIONER">PENSIONER</option>
                                </select>
                            </div>

                            <div className="field">
                                <label>Стаж (лет)</label>
                                <input
                                    type="number"
                                    value={form.jobYears ?? 0}
                                    onChange={(e) => setField('jobYears', Number(e.target.value))}
                                />
                            </div>

                            <div className="field">
                                <label>Ежемесячный платеж по другим кредитам</label>
                                <input
                                    type="number"
                                    value={form.activeLoanMonthlyPay ?? 0}
                                    onChange={(e) =>
                                        setField('activeLoanMonthlyPay', Number(e.target.value))
                                    }
                                />
                            </div>
                        </div>

                        <div className="checkbox-grid">
                            <label className="check-item">
                                <input
                                    type="checkbox"
                                    checked={!!form.hasActiveLoans}
                                    onChange={(e) => setField('hasActiveLoans', e.target.checked)}
                                />
                                <span>Есть активные кредиты</span>
                            </label>

                            <label className="check-item">
                                <input
                                    type="checkbox"
                                    checked={!!form.hasOverdueNow}
                                    onChange={(e) => setField('hasOverdueNow', e.target.checked)}
                                />
                                <span>Есть текущая просрочка</span>
                            </label>

                            <label className="check-item">
                                <input
                                    type="checkbox"
                                    checked={!!form.wasBlacklistedBefore}
                                    onChange={(e) => setField('wasBlacklistedBefore', e.target.checked)}
                                />
                                <span>Был в black list раньше</span>
                            </label>

                            <label className="check-item">
                                <input
                                    type="checkbox"
                                    checked={!!form.isBlacklistedNow}
                                    onChange={(e) => setField('isBlacklistedNow', e.target.checked)}
                                />
                                <span>Сейчас в black list</span>
                            </label>

                            <label className="check-item">
                                <input
                                    type="checkbox"
                                    checked={!!form.hadDelaysBefore}
                                    onChange={(e) => setField('hadDelaysBefore', e.target.checked)}
                                />
                                <span>Были просрочки раньше</span>
                            </label>
                        </div>

                        {form.hadDelaysBefore && (
                            <div className="field">
                                <label>Сколько месяцев прошло с последней просрочки</label>
                                <input
                                    type="number"
                                    value={form.monthsSinceLastDelay ?? 0}
                                    onChange={(e) =>
                                        setField('monthsSinceLastDelay', Number(e.target.value))
                                    }
                                />
                            </div>
                        )}

                        <div className="field">
                            <label>Комментарий</label>
                            <textarea
                                rows={4}
                                value={form.comment ?? ''}
                                onChange={(e) => setField('comment', e.target.value)}
                            />
                        </div>

                        {success && <div className="form-success">{success}</div>}
                        {error && <div className="form-error">{error}</div>}

                        <button className="application-submit" type="submit" disabled={loading}>
                            {loading ? 'Отправка...' : 'Отправить заявку'}
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
}