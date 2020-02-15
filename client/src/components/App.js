import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from 'prop-types';


import Header from './Header';
import Landing from './chat/Chat'
import RegisterForm from './auth/RegisterForm';

import './styles.scss';

function PrivateRoute({ children, ...rest }) {
    return (
        <Route
            {...rest}
            render={({ location }) =>
                rest.isAuth ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
}

class App extends React.Component {
    render() {
        return(
            <main>
                <Header isAuth={this.props.isAuth} user={this.props.user}/>
                <div className="content">
                    <Switch>
                         <Route
                             exact path="/"
                             render={() => <Redirect to="/chat" />}
                         />
                        <div className="container">
                            <Route exact path="/register" component={ RegisterForm } />
                            <Route exact path="/login"    component={ RegisterForm } />
                            <PrivateRoute exact path="/chat" isAuth={this.props.isAuth}>
                                <Landing />
                            </PrivateRoute>
                        </div>
                    </Switch>
                </div>
            </main>
        )
    }
}

App.propTypes = {
    isAuth: PropTypes.bool.isRequired,
    user: PropTypes.object,
};

const mapStateToProps = ({auth}) => {
    return { isAuth: auth.isAuthenticated, user: auth.user }
};

export default connect(mapStateToProps, null)(App);
