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
    myMessage: {
        background: '#8EEA85',
        marginBottom: 10,
        minHeight: 100,
    },
    message: {
        background: '#00D3AB',
        marginBottom: 10,
        minHeight: 100,
    },
    body: {
        color: '#3c3c3c',
        fontSize: 14
    },
    name: {
        fontSize: 17
    },
    status: {
        color: '#4e4e4e',
        fontSize: 10,
        marginTop: 10
    }
});
const Message = ({name, status, body, me}) => {
    const classes = useStyles();
    return(
        <Card className={me ? classes.myMessage : classes.message}>
            <CardContent>
                <Typography className={classes.name}>
                    {name}
                </Typography>
                <Typography className={classes.body}>
                    {body}
                </Typography>
                <Typography className={classes.status}>
                    {status}
                </Typography>
            </CardContent>
        </Card>
    )
};


class Chat extends Component {
    constructor(props) {
        super(props);

        this.sendNewMessage = this.sendNewMessage.bind(this);
    }

    componentDidMount() {
        this.props.getMessages();
    }

    sendNewMessage(text) {
        const message = {
            body: text.message,
            status: 'Sent',
            dateSent: Date.now(),
            userId: this.props.user.id,
            name: this.props.user.name
        };
        this.props.sendMessage(message);
        this.props.getMessages();
    }

    render() {
        return (
            <article className="Chat">
                <section className="Chat__Area">
                    {this.props.messages.map((msg) =>
                        <Message
                            name={msg.name}
                            status={msg.status}
                            body={msg.body}
                            me={msg.userId === this.props.user.id}
                        />
                        )
                    }
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
