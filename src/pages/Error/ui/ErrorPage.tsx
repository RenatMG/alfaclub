import { Button, Card } from "antd";
import { useNavigate } from 'react-router-dom';
import { AppRoutes, RoutePath } from '../../../app/providers/router/config/routesConfig';


const ErrorPage = () => {
    const navigate = useNavigate();
    const backHandler = () => {
        navigate(RoutePath[AppRoutes.MAIN]);
    };
    return (
        <Card title="Ошибка доступа" bordered={false} style={{ width: 300 }}>
            <div>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Ab impedit mollitia quidem reprehenderit
                vitae! Delectus inventore odio officiis repudiandae saepe.
            </div>
            <Button type="primary" onClick={backHandler}>
                Назад
            </Button>
        </Card>
    );
};

export default ErrorPage;
