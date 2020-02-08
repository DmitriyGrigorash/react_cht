import React from 'react';
import {connect} from "react-redux";
import PropTypes from 'prop-types';

import * as actions from '../../actions';

import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

import './styles.scss';


class RegisterForm extends React.Component {

    componentWillReceiveProps(nextProps) {
        if(nextProps.auth.isAuthenticated) {
            this.props.history.push('/')
        }
        if(nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    componentDidMount() {
        if(this.props.auth.isAuthenticated) {
            this.props.history.push('/');
        }
    }
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
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.auth.errors
});

const mapDispatchToProps = (dispatch, props) => {
    return {
        registerUser: (formData) => {
            dispatch(actions.registerUser(formData, props.history));
        },
        loginUser: (formData) => {
            dispatch(actions.loginUser(formData));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
