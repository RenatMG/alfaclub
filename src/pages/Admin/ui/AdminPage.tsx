import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AdminPage.module.scss';
import {  Tabs } from 'antd-mobile';

import { useAuth } from '../../../app/providers/auth/AuthProvider';
import { AddUser } from '../../../features/AddUser';
import { EditUser } from '../../../features/EditUser';
import ContentContainer from '../../../shared/ui/ContentContainer/ContentContainer';

import { LoadingBlock } from '../../../shared/ui/LoadingBlock';
import UserInfo from './UserInfo/UserInfo';

const AdminPage = () => {
    const { authenticated, user, isAdmin, loading } = useAuth();
    const navigate = useNavigate();


    // async function requestPermission() {
    //     // const permission = await Notification.requestPermission();
    //     // if (permission === 'granted') {
    //
    //     const token = await getToken(messaging, { vapidKey: process.env.REACT_APP_VAPID_KEY });
    //     console.log('token', token);
    //     // } else if (permission === 'denied') {
    //     //     alert('You denied for the notifications');
    //     // }
    //
    // }

    // onMessageListener().then(payload => {
    //     console.log(payload);
    // }).catch(err => console.log('failed: ', err));

    // useEffect(() => {
    //     requestPermission().then(() => {
    //     });
    // }, []);


    useEffect(() => {
        if (!authenticated && !loading) {
            navigate('/');
        }
    }, [authenticated, loading, navigate]);

    if (loading) {
        return <LoadingBlock />;
    }

    return (
        <ContentContainer>

            <Tabs className={styles.tabs} defaultActiveKey="personal">
                <Tabs.Tab title="Личный кабинет" key="personal">
                    {user && <UserInfo user={user} />}
                </Tabs.Tab>
                <Tabs.Tab title="Редактировать информацию" key="edit">
                    {user && <EditUser />}
                </Tabs.Tab>
                {
                    isAdmin && <Tabs.Tab title="Добавить пользователя" key="add">
                        <AddUser />
                    </Tabs.Tab>
                }
            </Tabs>
        </ContentContainer>
    );
};

export default AdminPage;
