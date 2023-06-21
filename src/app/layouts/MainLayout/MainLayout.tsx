import { FC, PropsWithChildren } from 'react';
import { Header } from '../../../widgets/Header';
import styles from './MainLayout.module.scss';
import { Footer } from '../../../widgets/Footer';
import { useAuth } from '../../providers/auth/AuthProvider';


const MainLayout: FC<PropsWithChildren> = ({ children }) => {
    const { authenticated } = useAuth();
    return (
        <div className={styles.page}>
            {authenticated && <Header />}
            {children}
            <Footer />
        </div>
    );
};

export default MainLayout;