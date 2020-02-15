import React, {Component} from 'react';
import {Field, reduxForm} from "redux-form";
import InputField from "../auth/InputField";
import Button from "@material-ui/core/Button";


const validate = (values) => {
    const errors = {};
    if(!values.message) {
        errors.message = 'Field could not be empty'
    }
    return errors;
};
class FormChat extends Component {

    componentDidMount() {
        // this.props.getUser()
    }

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
                            input={{
                                multiline: true,
                                defaultValue:"Default Value",
                                variant:"outlined",
                                color: "secondary"
                            }}
                        />
                    </div>
                    <div className="FormChat__Button">
                        <Button color="secondary" size="medium" type="submit" variant="outlined">
                            Send
                        </Button>
                    </div>
                </form>
            </article>
        )
    }
}

// const mapDispatchToProps = (dispatch) => {
//     return {
//         getUser: () => {
//             dispatch(getUserData());
//         }
//     }
// };

FormChat.defaultProps = {
    errors: '',
};

export default reduxForm({
    validate,
    form: 'messageForm'
})(FormChat);
