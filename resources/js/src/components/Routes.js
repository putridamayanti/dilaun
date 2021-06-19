import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import LoginScreen from "../screens/Login";
import DashboardScreen from "../screens/Dashboard";
import UserScreen from "../screens/User";
import ServiceScreen from "../screens/Service";
import OrderScreen from "../screens/Order";
import ReportScreen from "../screens/Report";
import FormUserScreen from "../screens/User/Form";
import FormServiceScreen from "../screens/Service/Form";
import ProductScreen from "../screens/Product";
import FormProductScreen from "../screens/Product/Form";
import FormOrderScreen from "../screens/Order/Form";

const routes = [
    { path: '/login', component: LoginScreen },
    { path: '/dashboard', component: DashboardScreen, restricted: true },
    { path: '/user', component: UserScreen, restricted: true },
    { path: '/user/create', component: FormUserScreen, restricted: true },
    { path: '/user/update/:id', component: FormUserScreen, restricted: true },
    { path: '/service', component: ServiceScreen, restricted: true },
    { path: '/service/create', component: FormServiceScreen, restricted: true },
    { path: '/service/update/:id', component: FormServiceScreen, restricted: true },
    { path: '/product', component: ProductScreen, restricted: true },
    { path: '/product/create', component: FormProductScreen, restricted: true },
    { path: '/product/update/:id', component: FormProductScreen, restricted: true },
    { path: '/order', component: OrderScreen, restricted: true },
    { path: '/order/create', component: FormOrderScreen, restricted: true },
    { path: '/order/update/:id', component: FormOrderScreen, restricted: true },
    { path: '/report', component: ReportScreen, restricted: true },
]

export default function Routes() {
    const isAuthed = !!localStorage.getItem('dilaun_token');

    return (
        <div>
            <Route exact={true} path={'/'}>
                <Redirect to='/dashboard'/>
            </Route>
            {routes.map(({path, restricted, component: Component}, i) => (
                <Route
                    key={i}
                    path={path}
                    exact={true}
                    render={props => {
                        if (!isAuthed && restricted) {
                            return <Redirect to='/login'/>;
                        }

                        if (path === '/login' && isAuthed) {
                            return <Redirect to='/'/>
                        }

                        return <Component {...props}/>;
                    }}
                />
            ))}
        </div>
    )
}
