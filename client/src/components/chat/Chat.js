import React, {Component} from 'react';
import {connect} from "react-redux";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import PropTypes from "prop-types";

import FormChat from "./FormChat";
import {sendMessage, getMessages} from "../../actions/messages";
import './styles.scss';


const useStyles = makeStyles({
    root: {
        marginBottom: 10,
        minHeight: 100,
    }
});
const Message = () => {
    const classes = useStyles();
    return(
        <Card className={classes.root}>
            <CardContent>
                <Typography variant="body1" gutterBottom>
                    Name
                </Typography>
                <Typography variant="body2">
                    Message body
                </Typography>
            </CardContent>
        </Card>
    )
};


class Chat extends Component {

    componentDidMount() {
        // this.props.getMessages()
    }

    sendNewMessage(message) {
        console.log('### message', message)
        // this.props.sendMessage(message)
    }

    render() {
        return (
            <article className="Chat">
                <section className="Chat__Area">
                    <Message/>
                    <Message/>
                    <Message/>
                    <Message/>
                    <Message/>
                    <Message/>
                </section>
                <section className="Chat__Text-field">
                    <FormChat onSubmit={this.sendNewMessage} errors={this.props.errors}/>
                </section>
            </article>
        );
    }
}

Chat.propTypes = {
    sendMessage: PropTypes.func.isRequired,
    getMessages: PropTypes.func.isRequired,
    messages: PropTypes.array,
    errors: PropTypes.string,
    user: PropTypes.object,
};
Chat.defaultProps = {
    messages: [],
    user: {},
};

const mapDispatchToProps = (dispatch) => {
    return {
        sendMessage: (message) => {
            dispatch(sendMessage(message));
        },
        getMessages: () => {
            dispatch(getMessages())
        }
    }
};
const mapStateToProps = ({messages, auth}) => ({
    messages: messages.messages,
    errors: messages.errors,
    user: auth.user
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
