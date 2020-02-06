import React from 'react';
import {connect} from "react-redux";
import PropTypes from 'prop-types';

import * as actions from '../../actions';

import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

import './surveys.scss';

class RegisterForm extends React.Component {
    render() {
        const {location} = this.props;
        return (
            <article className="RegisterForm">
                {location.pathname === '/register' && <SignUpForm onSubmit={this.props.registerUser} />}
                {location.pathname === '/login' && <SignInForm onSubmit={this.props.loginUser} />}
            </article>
        );
    };
}

RegisterForm.propTypes = {
    registerUser: PropTypes.func.isRequired,
    loginUser: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        registerUser: (formData) => {
            dispatch(actions.registerUser(formData));
        },
        loginUser: (formData) => {
            dispatch(actions.loginUser(formData));
        }
    }
};

export default connect(null, mapDispatchToProps)(RegisterForm);
