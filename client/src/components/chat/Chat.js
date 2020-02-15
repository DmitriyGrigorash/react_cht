import React, {Component} from 'react';
import {connect} from "react-redux";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import FormChat from "./FormChat";

import './styles.scss';


const useStyles = makeStyles({
    root: {
        marginBottom: 10,
        minHeight: 100
    }
});
const Message = () => {
    const classes = useStyles();
    return(
        <Card className={classes.root}>
            <CardContent>
                <Typography variant="body1" color="textSecondary" gutterBottom>
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
        // this.props.getUser()
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
                    <FormChat/>
                </section>
            </article>
        );
    }
}

// const mapDispatchToProps = (dispatch) => {
//     return {
//         getUser: () => {
//             dispatch(getUserData());
//         }
//     }
// };

export default connect(null, null)(Chat);
