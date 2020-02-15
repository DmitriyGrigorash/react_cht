import React from 'react';
import { Field, reduxForm } from 'redux-form';
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

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
        const {errors} = this.props;
        return (
            <article className="BaseForm">
                <Typography color="secondary" variant="h3">Sign in</Typography>
                <form onSubmit={this.props.handleSubmit}>
                    <div className="BaseFormFields">
                        <Field
                            label="Email"
                            type="email"
                            name="email"
                            component={InputField}
                            errors={errors}
                        />
                        <Field
                            label="Password"
                            type="password"
                            name="password"
                            component={InputField}
                            errors={errors}
                        />
                    </div>
                    <div className="BaseFormButtons">
                        <Button color="secondary" size="medium" type="submit" variant="contained">
                            Sign In
                        </Button>
                    </div>
                    <p className="BaseForm__error">{errors && errors}</p>
                </form>
            </article>
        );
    };
}

SignInForm.defaultProps = {
    errors: '',
};

export default reduxForm({
    validate,
    form: 'registerForm'
})(SignInForm);
