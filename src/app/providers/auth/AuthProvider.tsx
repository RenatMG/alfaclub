import { createContext, FC, PropsWithChildren, useEffect, useState } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, User } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

import { useContext } from 'react';
import useSession from './hooks/useSession';
import { useNavigate } from 'react-router-dom';
import { Auth } from '../../../shared/interfaces/auth.interface';
import { auth } from '../../../firebase';
import { AppRoutes, RoutePath } from '../router/config/routesConfig';
import { EXPIRE_TIME } from './config/auth';
import { admins } from './config/admins';


interface ContextProps {
    authenticated: boolean;
    error: string;
    isAdmin: boolean;
    loading: boolean;
    login: (data: Auth) => void;
    logout: () => void;
    setError: (error: string) => void;
    user: User | null;
}

export const AuthContext = createContext<ContextProps>({} as ContextProps);
export const useAuth = () => useContext(AuthContext);


const AuthContextProvider: FC<PropsWithChildren> = ({ children }) => {
    const [, loading] = useAuthState(auth);
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string>('');
    const [isAdmin, setIsAdmin] = useState(false);

    const login = ({ email, password }: { email: string, password: string }) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                setUser(user);
            })
            .catch(() => {
                setError('Неверный логин или пароль!');
            });
    };

    const logout = async () => {
        console.log('logout');
        signOut(auth).then(() => {
            console.log('Sign-out successful');
            navigate(RoutePath[AppRoutes.MAIN]);
        }).catch((error) => {
            console.log('Sign-out error: ' + error.message());
        });
    };

    useSession({
        callback: logout,
        expireTime: EXPIRE_TIME
    });

    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                setIsAdmin(user && admins.includes(user.email as string));
            } else {
                setUser(null);
            }
        });
        return () => {
            listen();
        };
    }, []);

    const context = {
        authenticated: !!user?.email,
        error,
        isAdmin,
        loading,
        login,
        logout,
        setError,
        user,
    };

    return <AuthContext.Provider value={context}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;

