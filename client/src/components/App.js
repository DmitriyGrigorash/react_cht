import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from 'prop-types';

import {logoutUser} from "../actions";

import Header from './Header';
import Landing from './Landing'
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
                <Header isAuth={this.props.isAuth} user={this.props.user} logout={logoutUser}/>
                <div className="content">
                    <Switch>
                         <Route exact path="/">
                            {this.props.isAuth ? <Redirect to="/chat" /> : <Redirect to="/login" />}
                        </Route>
                        <div className="container">
                            <Route exact path="/register" component={ RegisterForm } />
                            <Route exact path="/login"    component={ RegisterForm } />
                            <PrivateRoute path="/chat" isAuth={this.props.isAuth}>
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
    isAuth: PropTypes.object,
    user: PropTypes.object,
};

// const mapDispatchToProps = dispatch => {
//     return {
//         // fetchUser: () => dispatch(actions.fetchUser())
//     }
// };
const mapStateToProps = ({auth}) => {
    return { isAuth: auth.isAuthenticated, user: auth.user }
};

export default connect(mapStateToProps, null)(App);
