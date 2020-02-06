import React from 'react';
import {Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from 'prop-types';

import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing'
import RegisterForm from './auth/RegisterForm';

import './styles.scss';


class App extends React.Component {
    componentDidMount() {

    }

    componentDidUpdate() {

    }

    render() {
        return(
            <main>
                <Header isAuth={this.props.isAuth}/>
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
    fetchUser: PropTypes.func,
};

const mapDispatchToProps = dispatch => {
    return {
        // fetchUser: () => dispatch(actions.fetchUser())
    }
};
const mapStateToProps = ({auth}) => {
    return { isAuth: auth.isAuth }
};

export default connect(null, null)(App);
