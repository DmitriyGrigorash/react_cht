import React from 'react';
import {Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from 'prop-types';

import {logoutUser} from "../actions";

import Header from './Header';
import Landing from './Landing'
import RegisterForm from './auth/RegisterForm';

import './styles.scss';


class App extends React.Component {
    render() {
        return(
            <main>
                <Header isAuth={this.props.isAuth} user={this.props.user} logout={this.props.logoutUser}/>
                <div className="content">
                    <Switch>
                        <Route exact path="/" component={ Landing } />
                        <div className="container">
                            <Route exact path="/register" component={ RegisterForm } />
                            <Route exact path="/login" component={ RegisterForm } />
                        </div>
                    </Switch>
                </div>
            </main>
        )
    }
}

App.propTypes = {
    isAuth: PropTypes.bool,
    user: PropTypes.object,
    logoutUser: PropTypes.func,
};

// const mapDispatchToProps = dispatch => {
//     return {
//         // fetchUser: () => dispatch(actions.fetchUser())
//     }
// };
const mapStateToProps = ({auth}) => {
    return { isAuth: auth.isAuthenticated, user: auth.user }
};

export default connect(mapStateToProps, {logoutUser})(App);
