import React from 'react';
import {connect} from "react-redux";
import PropTypes from 'prop-types';

import * as actions from '../../actions';

import SignInForm from './SignInForm';
import './surveys.scss';

class RegisterForm extends React.Component {
    render() {
        return (
            <article className="SurveyNew">
                <SignInForm onSubmit={this.props.submitSurvey} />
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
