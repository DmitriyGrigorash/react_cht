import React from 'react';
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import {Redirect} from "react-router-dom";

import * as actions from '../../actions';

import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

import './styles.scss';


class RegisterForm extends React.Component {

    render() {
        const {location, errors, auth} = this.props;
        if (auth) {
            return <Redirect to='/chat'/>
        }
        return (
            <article className="RegisterForm">
                {location.pathname === '/register' && <SignUpForm onSubmit={this.props.registerUser} errors={errors}/>}
                {location.pathname === '/login' && <SignInForm onSubmit={this.props.loginUser} errors={errors}/>}
            </article>
        );
    };
}

RegisterForm.propTypes = {
    registerUser: PropTypes.func.isRequired,
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.bool.isRequired,
};

const mapStateToProps = ({auth}) => ({
    auth: auth.isAuthenticated,
    errors: auth.errors
});

const mapDispatchToProps = (dispatch) => {
    return {
        registerUser: (formData) => {
            dispatch(actions.registerUser(formData));
        },
        loginUser: (formData) => {
            dispatch(actions.loginUser(formData));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
