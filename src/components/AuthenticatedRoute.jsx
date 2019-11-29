import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLoggedIn } from '../constants/helpers';

/**
 *
 * @see https://jasonwatmore.com/post/2017/09/16/react-redux-user-registration-and-login-tutorial-example
 */
const AuthenticatedRoute = ({ component: Component, ...rest }) => {
    return <Route {...rest}
        render={
            (props) => (isLoggedIn ? <Component {...props} /> : <Redirect to={{ pathname: '/', state: { from: props.location } }} />)
        }
    />;
};

export default AuthenticatedRoute;
