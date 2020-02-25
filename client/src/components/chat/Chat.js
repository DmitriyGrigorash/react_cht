import React, {Component} from 'react';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {reset} from 'redux-form';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import makeStyles from "@material-ui/core/styles/makeStyles";

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

        this.listRef = React.createRef();
        this.sendNewMessage = this.sendNewMessage.bind(this);
    }

    componentDidMount() {
        this.props.getMessages();
    }

    componentDidUpdate() {
        const list = this.listRef.current;
        list.scrollTop = list.scrollHeight;
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
        this.props.cleanForm();
        this.props.getMessages();
    }

    render() {
        return (
            <article className="Chat">
                <section className="Chat__Participants">
                    <Chip
                        size="medium"
                        icon={<FaceIcon />}
                        label="Primary Clickable"
                        clickable
                        color="primary"
                    />
                </section>
                <section className="Chat__Area" ref={this.listRef}>
                    {this.props.messages.map((msg, key) =>
                        <Message
                            name={msg.name}
                            status={msg.status}
                            body={msg.body}
                            me={msg.userId === this.props.user.id}
                            key={key}
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
    cleanForm: PropTypes.func.isRequired,
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
        },
        cleanForm: () => {
            dispatch(reset('messageForm'))
        }
    }
};
const mapStateToProps = ({messages, auth}) => ({
    messages: messages.messages,
    errors: messages.errors,
    user: auth.user
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
