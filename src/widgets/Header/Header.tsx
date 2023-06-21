import styles from './Header.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { TabBar } from 'antd-mobile';
import { AppRoutes, RoutePath } from '../../app/providers/router/config/routesConfig';
import { useMemo } from 'react';
import { AiOutlineComment, AiOutlineUser, AiOutlineTeam, AiOutlineLogout, AiOutlineDashboard } from 'react-icons/ai';


const Header = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const menu = useMemo(() => {
        return [
            {
                key: RoutePath[AppRoutes.EMPLOYEE],
                title: 'Коллеги',
                icon: <AiOutlineTeam />,
            },
            {
                key: RoutePath[AppRoutes.TASKS],
                title: 'Задачи',
                icon: <AiOutlineDashboard />,
            },
            {
                key: RoutePath[AppRoutes.EXCEL],
                title: 'Чат',
                icon: <AiOutlineComment />,
            },
            {
                key: RoutePath[AppRoutes.ADMIN],
                title: 'Кабинет',
                icon: <AiOutlineUser />,
            },
            {
                key: RoutePath[AppRoutes.LOGOUT],
                title: 'Выйти',
                icon: <AiOutlineLogout />,
            }
        ];
    }, []);

    const setRouteActive = (value: string) => {
        navigate(value);
    };

    return (
        <TabBar className={styles.header} activeKey={pathname} onChange={value => setRouteActive(value)}>
            {menu.map(item => (
                <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
            ))}
        </TabBar>
    );
};

export default Header;
