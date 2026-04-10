import './AdminLayout.css';

type Props = {
    title: string;
    value: number;
};

export default function StatsCard({ title, value }: Props) {
    return (
        <div className="stats-card">
            <span className="stats-card__title">{title}</span>
            <strong className="stats-card__value">{value}</strong>
        </div>
    );
}