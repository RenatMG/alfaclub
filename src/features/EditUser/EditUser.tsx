import {
    Form,
    Input,
    Button,
    TextArea,
    DatePicker,
} from 'antd-mobile';
import dayjs from 'dayjs';
import { RefObject, useState } from 'react';
import type { DatePickerRef } from 'antd-mobile/es/components/date-picker';
import { auth, firestore } from '../../firebase';
import {  doc, setDoc } from "firebase/firestore";

import { useAuth } from '../../app/providers/auth/AuthProvider';
import { useDocumentDataOnce } from 'react-firebase-hooks/firestore';
import { LoadingBlock } from '../../shared/ui/LoadingBlock';
import { useUpdatePassword } from 'react-firebase-hooks/auth';


const EditUser = () => {
    const { user, loading } = useAuth();
    const [form] = Form.useForm();
    const [updating, setUpdating] = useState(false);
    const [updatePassword, updatingPass] = useUpdatePassword(auth);

    const [data] = useDocumentDataOnce(
        doc(firestore, 'users', user?.uid || ''));
    const onSubmit = async () => {

        const values = form.getFieldsValue();
        const { password, birthday, status } = values;
        if (auth?.currentUser && user?.uid) {
            if (password) {
                await updatePassword(password);
            }
            if (status || birthday) {
                setUpdating(true);
                const data: any = {};
                if (status) {
                    data.status = status;
                }
                if (birthday) {
                    data.birthday = birthday;
                }
                const userRef = doc(firestore, 'users', user?.uid);
                await setDoc(userRef, data, { merge: true }).then(() => {
                });
                setUpdating(false);
            }
        }
    };

    if (loading || updatingPass || updating) {
        return <LoadingBlock />;
    }

    return (
        <div>


            <Form
                form={form}
                layout="horizontal"
                footer={
                    <Button block type="submit" color="primary" size="large" onClick={onSubmit}>
                        Сохранить
                    </Button>
                }
            >
                <Form.Header>Редактировние пользователя</Form.Header>
                <Form.Item
                    name="status"
                    label="Статус"
                    help="Напишите что-нибудь о сотруднике, не более 100 символов"
                >
                    <TextArea
                        maxLength={100}
                        rows={2}
                        showCount
                        value={data?.status || ''}
                    />
                </Form.Item>
                <Form.Item
                    name="password"
                    label="Пароль"
                    help="Не менее 6 символов"
                >
                    <input type="hidden" name="" />
                    <Input minLength={6} />
                </Form.Item>
                <Form.Item
                    name="birthday"
                    label="День рождения"
                    trigger="onConfirm"
                    onClick={(e, datePickerRef: RefObject<DatePickerRef>) => {
                        datePickerRef.current?.open();
                    }}
                >
                    <DatePicker
                        confirmText="Ок"
                        cancelText="Отменить"
                        min={new Date('1900-01-01')}
                        max={new Date('2005-01-01')}
                    >
                        {value =>
                            value ? dayjs(value).format('DD.MM.YYYY') : ''
                        }
                    </DatePicker>
                </Form.Item>
            </Form>
        </div>
    );
};

export default EditUser;
