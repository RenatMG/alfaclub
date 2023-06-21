import { Spin } from 'antd';
import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { routeConfig } from './config/routesConfig';
import { ErrorPage } from '../../../pages/Error';

const AppRouter = () => (
    <Suspense fallback={<Spin />}>
        <Routes>
            {
                Object.values(routeConfig).map(({ path, Component }) => (
                    <Route
                        key={path}
                        path={path}
                        Component={Component}
                    />
                ))
            }
            <Route path="*" element={<ErrorPage />} />
        </Routes>
    </Suspense>
);

export default AppRouter;
