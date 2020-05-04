import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import SignUp from '../containers/pages/signUp/index';
import asyncComponent from './asyncComponent';

const RestrictedRoute = ({ component: Component, isLoggedIn, ...rest }) => {
    return (<Route
        {...rest}
        render={props => (isLoggedIn ? (
            <Component {...props} />
        ) : (
                <Redirect
                    to={{
                        pathname: '/SignUp',
                        // state: { from: props.location },
                    }}
                />
            ))}
    />
    );
}
const PublicRoutes = ({ history, isLoggedIn }) => (
    <Router history={history}>
        <Switch>
            <RestrictedRoute
                exact
                path="/"
                isLoggedIn={isLoggedIn}
                component={asyncComponent(() => import('../containers/pages/welcome/index'))}
            />
            <Route
                exact
                path="/SignUp"
                component={asyncComponent(() => import('../containers/pages/signUp/index'))}
            />
            <Route path="/*" component={asyncComponent(() => import('../containers/pages/blankPage/404'))} />
        </Switch>
    </Router>
);

export default connect(state => ({
    isLoggedIn: state.SignUp.signedIn,
}))(PublicRoutes);
