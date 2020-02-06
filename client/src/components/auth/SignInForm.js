import React from 'react';
import { Field, reduxForm } from 'redux-form';
import Button from "@material-ui/core/Button";

import InputField from './InputField';

const validate = (values) => {
    const errors = {};
    if(!values.email) {
        errors.email = 'Provide an email'
    }
    if(!values.password) {
        errors.password = 'Provide a password'
    }
    return errors;
};

class SignInForm extends React.Component {
    render() {
        return (
            <article className="BaseForm">
                <h3>Sign In</h3>
                <form onSubmit={this.props.handleSubmit}>
                    <div className="BaseFormFields">
                        <Field label="Email" type="email" name="email" component={InputField} />
                        <Field label="Password" type="password" name="password" component={InputField} />
                    </div>
                    <div className="BaseFormButtons">
                        <Button color="default" size="medium" type="submit" variant="contained">
                            Sign In
                        </Button>
                    </div>
                </form>
            </article>
        );
    };
}

export default reduxForm({
    validate,
    form: 'registerForm'
})(SignInForm);
