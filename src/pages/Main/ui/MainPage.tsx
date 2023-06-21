import styles from './MainPage.module.scss';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../app/providers/auth/AuthProvider';
import { AppRoutes, RoutePath } from '../../../app/providers/router/config/routesConfig';
import { ContentContainer } from '../../../shared/ui/ContentContainer';
import { LoginForm } from '../../../features/Auth';

const MainPage = () => {
    const { authenticated } = useAuth();
    const navigate = useNavigate();


    useEffect(() => {
        if (authenticated) {
            navigate(RoutePath[AppRoutes.ADMIN]);
        }
    }, [authenticated, navigate]);

    return (
        <ContentContainer>
            <div className={styles.main}>
                <LoginForm />
            </div>
        </ContentContainer>
    );
};

export default MainPage;
