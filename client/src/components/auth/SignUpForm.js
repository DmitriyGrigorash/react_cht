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
    if(!values.name) {
        errors.name = 'Provide a password'
    }
    return errors;
};

class SignUpForm extends React.Component {
    render() {
        const {errors} = this.props;
        return (
            <article className="BaseForm">
                <h3>Sign up</h3>
                <form onSubmit={this.props.handleSubmit}>
                    <div className="BaseFormFields">
                        <Field label="Name" type="text" name="name" component={InputField} />
                        <Field label="Email" type="email" name="email" component={InputField} />
                        <Field label="Password" type="password" name="password" component={InputField} />
                    </div>
                    <div className="BaseFormButtons">
                        <Button color="default" size="medium" type="submit" variant="contained">
                            Sign up
                        </Button>
                    </div>
                    <p className="BaseForm__error">{errors && errors}</p>
                </form>
            </article>
        );
    };
}

export default reduxForm({
    validate,
    form: 'registerForm'
})(SignUpForm);
