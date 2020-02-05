import React from 'react';
import { Field, reduxForm } from 'redux-form';
import Button from "@material-ui/core/Button";
import Link from '@material-ui/core/Link';

import InputField from './InputField';
// import validateEmail from '../../utils/validateEmail';

const validate = (values) => {
    const errors = {};

    // errors.email = validateEmail(values.email || '');

    if(!values.title) {
        errors.title = 'Provide a title'
    }
    if(!values.subject) {
        errors.subject = 'Provide a subject'
    }
    if(!values.body) {
        errors.body = 'Provide a body'
    }
    if(!values.recipients) {
        errors.recipients = 'Provide an email'
    }

    return errors;
};

class SignInForm extends React.Component {
    render() {
        return (
            <article className="SurveyForm">
                <h3>Sign up</h3>
                <form onSubmit={this.props.handleSubmit}>
                    <div className="SurveyFormFields">
                        <Field label="Name" type="text" name="name" component={InputField} />
                        <Field label="Email" type="email" name="email" component={InputField} />
                        <Field label="Password" type="password" name="password" component={InputField} />
                    </div>
                    {/*<div className="SurveyFormButtons">*/}
                    {/*    <Button color="default" size="medium" type="submit" variant="contained">*/}
                    {/*        <Link href="/surveys" underline="none">Cancel</Link>*/}
                    {/*    </Button>*/}
                    {/*    <Button color="default" size="medium" type="submit" variant="contained">*/}
                    {/*        Submit*/}
                    {/*    </Button>*/}
                    {/*</div>*/}
                </form>
            </article>
        );
    };
}

export default reduxForm({
    validate,
    form: 'registerForm'
})(SignInForm);
