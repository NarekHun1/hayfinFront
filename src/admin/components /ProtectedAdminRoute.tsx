import { Navigate } from 'react-router-dom';
import { getAdminUser, getAdminToken, isAdminAllowed } from '../../utils/adminAuth.ts';

type Props = {
    children: React.ReactNode;
};

export default function ProtectedAdminRoute({ children }: Props) {
    const token = getAdminToken();
    const user = getAdminUser();

    if (!token || !user || !isAdminAllowed(user)) {
        return <Navigate to="/admin/login" replace />;
    }

    return <>{children}</>;
}