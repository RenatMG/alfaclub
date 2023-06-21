import React, { FC } from 'react';
import { AutoCenter, Avatar, List } from 'antd-mobile';
import { useDocumentDataOnce } from 'react-firebase-hooks/firestore';
import { doc } from 'firebase/firestore';
import { firestore } from '../../../../firebase';
import { User } from 'firebase/auth';
import dayjs from 'dayjs';

const UserInfo: FC<{ user: User }> = ({ user }) => {
    const [data] = useDocumentDataOnce(
        doc(firestore, 'users', user?.uid || ''));

    let birthday = '';
    if (data?.birthday) {
        const date = data?.birthday?.toDate();
        birthday = dayjs(date.getTime()).format('DD.MM.YYYY');
    }

    return (
        <div>
            <AutoCenter style={{ margin: '10px' }}>
                <Avatar src={data?.photo || ''} style={{ '--size': '100px' }} />
            </AutoCenter>
            <List header="Информация">
                <List.Item>
                    <>Статус: {data?.status}</>
                </List.Item>
                <List.Item>
                    <>ФИО: {data?.name} {data?.surname}</>
                </List.Item>
                <List.Item>
                    <>
                        Должность: {data?.position}
                    </>
                </List.Item>
                <List.Item>
                    <>
                        Почта: {data?.email}</>
                </List.Item>
                <List.Item>
                    <>
                        День рождения: {birthday}
                    </>
                </List.Item>
            </List>
        </div>
    );
};

export default UserInfo;
