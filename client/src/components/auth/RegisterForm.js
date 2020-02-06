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
            <article className="SurveyNew">
                {location.pathname === '/register' && <SignUpForm onSubmit={this.props.submitSurvey} />}
                {location.pathname === '/login' && <SignInForm onSubmit={this.props.submitSurvey} />}
            </article>
        );
    };
}

RegisterForm.propTypes = {
    submitSurvey: PropTypes.func
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        submitSurvey: (formData) => {
            dispatch(actions.submitSurvey(formData));
            // ownProps.history.push('/surveys');
        }
    }
};

export default connect(null, mapDispatchToProps)(RegisterForm);
