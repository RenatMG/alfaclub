import {
    Form,
    Input,
    Button,
    Avatar,
    TextArea,
    DatePicker, AutoCenter, Space, Radio,

} from 'antd-mobile';
import dayjs from 'dayjs';
import { RefObject, useEffect, useState } from 'react';
import type { DatePickerRef } from 'antd-mobile/es/components/date-picker';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, firestore } from '../../firebase';
import { doc, setDoc } from "firebase/firestore";
import { getRandomInt } from '../../shared/utils/getRandomInt';
import { getRandomAvatar, Sex } from '../../shared/utils/getRandomAvatar';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { LoadingBlock } from '../../shared/ui/LoadingBlock';


const AddUser = () => {
    const [form] = Form.useForm();
    const [photo, setPhoto] = useState('');
    const [sex, setSex] = useState<Sex>('men');
    const [
        createUserWithEmailAndPassword, , loading,
    ] = useCreateUserWithEmailAndPassword(auth);
    const onSubmit = () => {

        const values = form.getFieldsValue();
        const { name, email, password, birthday, position, status, surname } = values;

        if (email && password) {
            createUserWithEmailAndPassword(email, password)
                .then(async (response) => {
                    console.log(response);
                    form.resetFields();
                    try {
                        if (response) {
                            await setDoc(doc(firestore, "users", response.user.uid), {
                                name,
                                surname,
                                email,
                                sex,
                                position,
                                status: status || '',
                                photo,
                                birthday: birthday || '',
                                id: response.user.uid
                            });
                        }
                    } catch (e) {
                        console.error("Error adding user: ", e);
                    }
                }).then(() => {
                signInWithEmailAndPassword(auth, 'admin@admin.com', '11qqaazz').then(() => {
                });
            })
                .catch((error) => {
                    console.log(error.message);
                });
        }
    };

    const sexHandler = (value: any) => {
        setSex(value);
    };

    useEffect(() => {
        setPhoto(getRandomAvatar(sex, getRandomInt(1, 100)));
    }, [sex]);


    if (loading) {
        return <LoadingBlock />;
    }

    return (
        <div>
            <AutoCenter style={{ margin: '10px' }}>
                <Avatar src={photo} style={{ '--size': '100px' }} />
            </AutoCenter>
            <Form
                form={form}
                layout="horizontal"
                initialValues={{ email: '', password: '' }}
                footer={
                    <Button block type="submit" color="primary" size="large" onClick={onSubmit}>
                        Сохранить
                    </Button>
                }
            >
                <Form.Header>Новый пользователь</Form.Header>
                <Form.Item
                    name="name"
                    label="Имя"
                    rules={[{ required: true, message: 'Это поле обязательно' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="surname"
                    label="Фамилия"
                    rules={[{ required: true, message: 'Это поле обязательно' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="email"
                    label="email"
                    help=""
                    initialValue="asd"
                    rules={[{ required: true, message: 'Это поле обязательно' }]}
                >
                    <Input type="email" autoComplete="new-password" />
                </Form.Item>
                <Form.Item
                    name="position"
                    label="Должность"
                    help=""
                    rules={[{ required: true, message: 'Это поле обязательно' }]}
                >
                    <Input autoComplete="new-password" />
                </Form.Item>
                <Form.Item
                    name="status"
                    label="Статус"
                    help="Напишите что-нибудь о сотруднике, не более 100 символов"
                >
                    <TextArea
                        placeholder="..."
                        maxLength={100}
                        rows={2}
                        showCount
                    />
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

                <Form.Item
                    name="sex"
                    label="Пол"
                >
                    <Radio.Group defaultValue="men" onChange={sexHandler}>
                        <Space direction="horizontal">
                            <Radio value="men">Муж</Radio>
                            <Radio value="women">Жен</Radio>
                        </Space>
                    </Radio.Group>
                </Form.Item>

                <Form.Item
                    name="password"
                    label="Пароль"
                    help="Не менее 6 символов"
                >
                    <Input minLength={6} />
                </Form.Item>
            </Form>
        </div>
    );
};

export default AddUser;
