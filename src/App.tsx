import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { MainLayout } from './app/layouts/MainLayout';
import AuthProvider from './app/providers/auth/AuthProvider';
import ModalContextProvider from './app/providers/modal/modalContext';
import AppRouter from './app/providers/router/AppRouter';
import { ConfigProvider } from 'antd';
import { red } from '@ant-design/colors';
import { store } from './app/store';

function App() {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <AuthProvider>
                    <ConfigProvider
                        theme={{
                            token: {
                                colorPrimary: red[5],
                            },
                        }}
                    >
                        <ModalContextProvider>
                            <MainLayout>
                                <AppRouter />
                            </MainLayout>
                        </ModalContextProvider>
                    </ConfigProvider>
                </AuthProvider>
            </Provider>
        </BrowserRouter>
    );
}

export default App;
