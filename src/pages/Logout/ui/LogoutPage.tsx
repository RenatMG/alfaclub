import { useAuth } from '../../../app/providers/auth/AuthProvider';
import { useEffect } from 'react';
import { LoadingBlock } from '../../../shared/ui/LoadingBlock';

const LogoutPage = () => {
    const { logout } = useAuth();

    useEffect(() => {
        logout();
    }, []);

    return <LoadingBlock />;
};

export default LogoutPage;
