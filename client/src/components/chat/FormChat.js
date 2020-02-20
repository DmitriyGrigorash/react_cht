import React, {Component} from 'react';
import {Field, reduxForm} from "redux-form";
import InputField from "../InputField";
import Button from "@material-ui/core/Button";


const validate = (values) => {
    const errors = {};
    if(!values.message) {
        errors.message = 'Field could not be empty'
    }
    return errors;
};
class FormChat extends Component {
    render() {
        const {errors} = this.props;
        return (
            <article className="FormChat">
                <form onSubmit={this.props.handleSubmit}>
                    <div className="FormChat__Text">
                        <Field
                            label="Write your message"
                            type="text"
                            name="message"
                            component={InputField}
                            errors={errors}
                            props={{
                                multiline: true,
                                rows: 5,
                                color: "secondary",
                                margin: "none",
                            }}
                        />
                    </div>
                    <div className="FormChat__Button">
                        <Button color="secondary" size="medium" type="submit" variant="contained">
                            Send
                        </Button>
                    </div>
                </form>
            </article>
        )
    }
}

FormChat.defaultProps = {
    errors: '',
};

export default reduxForm({
    validate,
    form: 'messageForm'
})(FormChat);
