import { useState } from 'react';
import {
    FiBriefcase,
    FiCalendar,
    FiCheck,
    FiCreditCard,
    FiDatabase,
    FiHeadphones,
    FiLayers,
    FiPhone,
    FiSend,
    FiShield,
    FiUser,
    FiZap,
} from 'react-icons/fi';
import Header from './Header';
import { createApplication } from '../services/applicationsApi';
import type { CreateApplicationPayload, EmploymentStatus } from '../types/application.types';
import '../admin/components/ApplicationPage.css';

const amountOptions = [100000, 200000, 300000, 500000, 700000, 1000000, 1500000, 2000000, 3000000, 4000000];
const termOptions = [12, 24, 36, 48, 60];

const initialState: CreateApplicationPayload = {
    fullName: '', phone: '', amount: 100000, termMonths: 12, monthlyIncome: 0,
    workplace: '', loanPurpose: '', hasActiveLoans: false, comment: '',
    employmentStatus: 'EMPLOYED', jobYears: 0, activeLoanMonthlyPay: 0,
    hasOverdueNow: false, wasBlacklistedBefore: false, isBlacklistedNow: false,
    hadDelaysBefore: false, monthsSinceLastDelay: 0,
};

function ApplicationIllustration() {
    return (
        <svg className="application-illustration" viewBox="0 0 440 290" role="img" aria-label="Վարկային հայտի պատկերազարդում">
            <defs>
                <linearGradient id="paper" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stopColor="#f6fffb" /><stop offset="1" stopColor="#b9e8d2" /></linearGradient>
                <linearGradient id="board" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stopColor="#b5ead3" /><stop offset=".55" stopColor="#42bd88" /><stop offset="1" stopColor="#11865d" /></linearGradient>
                <linearGradient id="pen" x1="0" x2="1"><stop offset="0" stopColor="#062d28" /><stop offset=".48" stopColor="#0d6b55" /><stop offset="1" stopColor="#74e3ad" /></linearGradient>
                <linearGradient id="bar" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#9df8c6" /><stop offset="1" stopColor="#08a963" /></linearGradient>
                <filter id="drop" x="-35%" y="-35%" width="170%" height="190%"><feDropShadow dx="0" dy="16" stdDeviation="13" floodColor="#001d17" floodOpacity=".65" /></filter>
                <filter id="glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="12" /></filter>
            </defs>
            <ellipse cx="216" cy="247" rx="154" ry="25" fill="#18e58a" opacity=".22" filter="url(#glow)" />
            <g filter="url(#drop)">
                <g transform="translate(264 34)">
                    {[94, 72, 51, 31].map((height, index) => (
                        <g key={height} transform={`translate(${index * 38} ${112 - height})`}>
                            <path d="M0 10 16 1 31 10 15 19Z" fill="#b8f8d5" />
                            <path d={`M0 10 15 19 15 ${height + 15} 0 ${height + 6}Z`} fill="#0aa967" />
                            <path d={`M15 19 31 10 31 ${height + 6} 15 ${height + 15}Z`} fill="url(#bar)" />
                        </g>
                    ))}
                </g>
                <g transform="translate(65 44) rotate(-7 130 100)">
                    <rect x="20" y="18" width="230" height="196" rx="25" fill="url(#board)" stroke="#c4fae0" strokeOpacity=".52" strokeWidth="3" />
                    <rect x="43" y="32" width="187" height="153" rx="8" fill="url(#paper)" />
                    <path d="M103 25v-8c0-15 12-27 27-27s27 12 27 27v8" fill="none" stroke="#d9f5e8" strokeWidth="15" strokeLinecap="round" />
                    <rect x="88" y="18" width="84" height="34" rx="8" fill="#e5f8ef" stroke="#96d9bb" strokeWidth="3" />
                    {[78, 118, 158].map((y) => (
                        <g key={y}>
                            <circle cx="75" cy={y} r="15" fill="#16b876" />
                            <path d={`m67 ${y} 6 6 12-16`} fill="none" stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                            <rect x="103" y={y - 7} width="95" height="7" rx="3.5" fill="#86b9a7" opacity=".52" />
                            <rect x="103" y={y + 7} width="72" height="7" rx="3.5" fill="#86b9a7" opacity=".33" />
                        </g>
                    ))}
                </g>
                <g transform="translate(167 204) rotate(-31)">
                    <rect width="176" height="25" rx="12.5" fill="url(#pen)" stroke="#8aefbb" strokeOpacity=".46" strokeWidth="2" />
                    <path d="m176 3 32 9.5-32 9.5Z" fill="#c8f3dc" /><path d="m202 11 7 1.5-7 1.5Z" fill="#03221d" />
                    <rect x="20" y="5" width="77" height="4" rx="2" fill="#b7f2d3" opacity=".28" />
                </g>
            </g>
        </svg>
    );
}

export default function ApplicationPage() {
    const [form, setForm] = useState<CreateApplicationPayload>(initialState);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const setField = <K extends keyof CreateApplicationPayload>(key: K, value: CreateApplicationPayload[K]) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); setLoading(true); setError(''); setSuccess('');
        try {
            const payload: CreateApplicationPayload = {
                ...form, amount: Number(form.amount), termMonths: Number(form.termMonths),
                monthlyIncome: Number(form.monthlyIncome || 0), jobYears: Number(form.jobYears || 0),
                activeLoanMonthlyPay: Number(form.activeLoanMonthlyPay || 0),
                monthsSinceLastDelay: Number(form.monthsSinceLastDelay || 0),
            };
            await createApplication(payload);
            setSuccess('Ձեր հայտը հաջողությամբ ուղարկվել է։ Մեր մասնագետը շուտով կապ կհաստատի Ձեզ հետ։');
            setForm(initialState);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Չհաջողվեց ուղարկել հայտը');
        } finally { setLoading(false); }
    };

    return (
        <div className="application-page">
            <Header />
            <main className="application-main">
                <section className="application-card">
                    <div className="application-card__glow application-card__glow--left" />
                    <div className="application-card__glow application-card__glow--right" />
                    <aside className="application-intro">
                        <div className="application-intro__copy">
                            <span className="application-badge">HAYFIN</span>
                            <h1>Հայտի<br />ձևակերպում</h1>
                            <p>Լրացրեք տվյալները և ուղարկեք հայտը դիտարկման՝ դիմումի համար։</p>
                        </div>
                        <ApplicationIllustration />
                        <div className="application-benefits" aria-label="Մեր առավելությունները">
                            <div className="application-benefit"><FiZap /><span>Արագ<br />դիտարկում</span></div>
                            <div className="application-benefit"><FiShield /><span>Անվտանգ<br />մշակում</span></div>
                            <div className="application-benefit"><FiHeadphones /><span>Աջակցություն<br />ամբողջ ընթացքում</span></div>
                        </div>
                    </aside>

                    <form className="application-form" onSubmit={handleSubmit}>
                        <div className="application-grid">
                            <div className="field"><label htmlFor="fullName">Անուն Ազգանուն <em>*</em></label><div className="field-control"><FiUser /><input id="fullName" autoComplete="name" placeholder="Մուտքագրեք Ձեր անունը" value={form.fullName} onChange={(e) => setField('fullName', e.target.value)} required /></div></div>
                            <div className="field"><label htmlFor="phone">Հեռախոս <em>*</em></label><div className="field-control"><FiPhone /><input id="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="Օրինակ՝ 077 123456" value={form.phone} onChange={(e) => setField('phone', e.target.value)} required /></div></div>
                            <div className="field"><label htmlFor="amount">Գումար <em>*</em></label><div className="field-control"><FiDatabase /><select id="amount" value={form.amount} onChange={(e) => setField('amount', Number(e.target.value))} required>{amountOptions.map((amount) => <option key={amount} value={amount}>{amount.toLocaleString('en-US')} դրամ</option>)}</select></div></div>
                            <div className="field"><label htmlFor="termMonths">Ժամկետ (ամիս) <em>*</em></label><div className="field-control"><FiCalendar /><select id="termMonths" value={form.termMonths} onChange={(e) => setField('termMonths', Number(e.target.value))} required>{termOptions.map((month) => <option key={month} value={month}>{month} ամիս</option>)}</select></div></div>
                            <div className="field"><label htmlFor="monthlyIncome">Ամսական եկամուտ</label><div className="field-control"><FiCreditCard /><input id="monthlyIncome" type="number" min="0" value={form.monthlyIncome ?? ''} onFocus={(e) => e.currentTarget.select()} onChange={(e) => setField('monthlyIncome', e.target.value === '' ? undefined : Number(e.target.value))} /></div></div>
                            <div className="field"><label htmlFor="employmentStatus">Զբաղվածության կարգավիճակ</label><div className="field-control"><FiBriefcase /><select id="employmentStatus" value={form.employmentStatus} onChange={(e) => setField('employmentStatus', e.target.value as EmploymentStatus)}><option value="EMPLOYED">Աշխատող</option><option value="SELF_EMPLOYED">Ինքնազբաղված</option><option value="UNEMPLOYED">Գործազուրկ</option><option value="STUDENT">Ուսանող</option><option value="RETIRED">Թոշակառու</option></select></div></div>
                            <div className="field field--wide"><label htmlFor="activeLoanMonthlyPay">Գործող վարկերի մնացորդ</label><div className="field-control"><FiLayers /><input id="activeLoanMonthlyPay" type="number" min="0" value={form.activeLoanMonthlyPay ?? ''} onFocus={(e) => e.currentTarget.select()} onChange={(e) => setField('activeLoanMonthlyPay', e.target.value === '' ? undefined : Number(e.target.value))} /></div></div>
                        </div>

                        <div className="checkbox-grid">
                            <label className="check-item"><input type="checkbox" checked={!!form.hasActiveLoans} onChange={(e) => setField('hasActiveLoans', e.target.checked)} /><span className="check-box"><FiCheck /></span><span>Կան ակտիվ վարկեր</span></label>
                            <label className="check-item"><input type="checkbox" checked={!!form.hasOverdueNow} onChange={(e) => setField('hasOverdueNow', e.target.checked)} /><span className="check-box"><FiCheck /></span><span>Կա ընթացիկ ուշացում</span></label>
                            <label className="check-item"><input type="checkbox" checked={!!form.wasBlacklistedBefore} onChange={(e) => setField('wasBlacklistedBefore', e.target.checked)} /><span className="check-box"><FiCheck /></span><span>Նախկինում եղել է սև ցուցակում</span></label>
                            <label className="check-item"><input type="checkbox" checked={!!form.isBlacklistedNow} onChange={(e) => setField('isBlacklistedNow', e.target.checked)} /><span className="check-box"><FiCheck /></span><span>Հիմա գտնվում է սև ցուցակում</span></label>
                            <label className="check-item"><input type="checkbox" checked={!!form.hadDelaysBefore} onChange={(e) => setField('hadDelaysBefore', e.target.checked)} /><span className="check-box"><FiCheck /></span><span>Նախկինում եղել են ուշացումներ</span></label>
                        </div>

                        {form.hadDelaysBefore && <div className="field delayed-field"><label htmlFor="monthsSinceLastDelay">Քանի ամիս է անցել վերջին ուշացումից</label><div className="field-control"><FiCalendar /><input id="monthsSinceLastDelay" type="number" min="0" value={form.monthsSinceLastDelay ?? ''} onFocus={(e) => e.currentTarget.select()} onChange={(e) => setField('monthsSinceLastDelay', e.target.value === '' ? undefined : Number(e.target.value))} /></div></div>}
                        {success && <div className="form-success">{success}</div>}
                        {error && <div className="form-error">{error}</div>}
                        <button className="application-submit" type="submit" disabled={loading}><span>{loading ? 'Ուղարկվում է...' : 'Ուղարկել հայտ'}</span>{!loading && <FiSend />}</button>
                    </form>
                </section>
            </main>
        </div>
    );
}
