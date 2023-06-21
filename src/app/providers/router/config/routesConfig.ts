import { RouteProps } from "react-router-dom";
import { ErrorPage } from "../../../../pages/Error";
import { TasksPage } from "../../../../pages/Tasks";
import { MainPage } from '../../../../pages/Main';
import { ExcelPage } from '../../../../pages/Excel';
import { EmployeePage } from '../../../../pages/Employee';
import { AdminPage } from '../../../../pages/Admin';
import { LogoutPage } from '../../../../pages/Logout';

export enum AppRoutes {
    MAIN = 'main',
    EMPLOYEE = 'employee',
    EXCEL = 'excel',
    TASKS = 'tasks',
    ERROR = 'error',
    ADMIN = 'admin',
    LOGOUT = 'logout'
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.EXCEL]: '/excel',
    [AppRoutes.TASKS]: '/tasks',
    [AppRoutes.ERROR]: '/error',
    [AppRoutes.EMPLOYEE]: '/employee',
    [AppRoutes.ADMIN]: '/admin',
    [AppRoutes.LOGOUT]: '/logout',
};

export const routeConfig: Record<AppRoutes, RouteProps> = {
    [AppRoutes.MAIN]: {
        path: RoutePath[AppRoutes.MAIN],
        Component: MainPage,
    },
    [AppRoutes.EXCEL]: {
        path: RoutePath[AppRoutes.EXCEL],
        Component: ExcelPage,
    },
    [AppRoutes.TASKS]: {
        path: RoutePath[AppRoutes.TASKS],
        Component: TasksPage,
    },
    [AppRoutes.ERROR]: {
        path: RoutePath[AppRoutes.ERROR],
        Component: ErrorPage,
    },
    [AppRoutes.EMPLOYEE]: {
        path: RoutePath[AppRoutes.EMPLOYEE],
        Component: EmployeePage,
    },
    [AppRoutes.ADMIN]: {
        path: RoutePath[AppRoutes.ADMIN],
        Component: AdminPage,
    },
    [AppRoutes.LOGOUT]: {
        path: RoutePath[AppRoutes.LOGOUT],
        Component: LogoutPage,
    },
};