import styles from './LoginForm.module.scss';
import { FC, useEffect } from 'react';
import { useAuth } from '../../app/providers/auth/AuthProvider';
import { AutoCenter, Button, Form, Input } from 'antd-mobile';
import { ReactComponent as Logo } from '../../shared/icons/logo.svg';
import { LoadingBlock } from '../../shared/ui/LoadingBlock';


const LoginForm: FC = () => {
    const [form] = Form.useForm();
    const email = Form.useWatch('email', form);
    const pass = Form.useWatch('password', form);
    const { login, loading, error, setError } = useAuth();

    const onSubmit = () => {
        const values = form.getFieldsValue();
        const { email, password } = values;
        login({ email, password });
    };

    useEffect(() => {
        if (!!error) {
            setError('');
        }
    }, [email, pass]);

    if (loading) {
        return <LoadingBlock />;
    }

    return (
        <div>
            <AutoCenter style={{ margin: 25 }}>
                <Logo />
            </AutoCenter>
            <Form
                form={form}
                layout="horizontal"
                initialValues={{ email: '', password: '' }}
                footer={
                    <Button block type="submit" color="primary" size="large" onClick={onSubmit}>
                        Войти
                    </Button>
                }
            >
                <Form.Header>Авторизация</Form.Header>
                <div className={styles.hidden}>
                    <input type="text" autoComplete="new-password" />
                    <input type="password" autoComplete="new-password" />
                </div>
                <Form.Item
                    name="email"
                    label="email"
                    rules={[{ required: true, message: 'Это поле обязательно' }]}
                >
                    <Input type="email" />
                </Form.Item>

                <Form.Item
                    name="password"
                    label="Пароль"
                    rules={[{ required: true, message: 'Это поле обязательно' }]}
                >
                    <Input type="password" />
                </Form.Item>
            </Form>
            {error && <AutoCenter><span className={styles.error}>{error}</span></AutoCenter>}
        </div>
    );
};

export default LoginForm;
