import React from 'react';

import {Redirect} from 'react-router-dom';

class ProtectedRoute extends React.Component {
    render() {
        const Component = this.props.component;
        const isAuthenticated = localStorage.getItem("id_token");

        return isAuthenticated ? (
            <Component />
        ) : (
            <Redirect to={{ pathname: '/landing'}} />
        )
    }
}

export default ProtectedRoute;