import React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {withRouter} from 'react-router-dom';

import AppBar from "@material-ui/core/AppBar";
import { withStyles } from '@material-ui/core/styles';
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Link from '@material-ui/core/Link';
import ButtonGroup from "@material-ui/core/ButtonGroup";

import {logoutUser} from "../actions/user";


const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    link: {
        textDecoration: 'none',
        // color: 'white',
        outline: 'none'
    },
    add: {
        marginRight: 20,
    },
    button: {
        border: 'none',
    }
};

function AuthBtn({isAuth, classes, logout}) {
    if (isAuth) {
        return (
            <Button variant="contained" color="secondary" className={classes.button} onClick={logout}>
                <Link color="secondary" href='/login' underline='none' className={classes.link}>Logout</Link>
            </Button>
        )
    } else {
        return (
            <ButtonGroup color="secondary" aria-label="secondary button group">
                <Button color="secondary" className={classes.button}>
                    <Link color="secondary" href='/register' underline='none' className={classes.link}>Sign Up</Link>
                </Button>
                <Button color="secondary" className={classes.button}>
                    <Link color="secondary" href='/login' underline='none' className={classes.link}>Sign In</Link>
                </Button>
            </ButtonGroup>
        )
    }
}

export class Header extends React.PureComponent {
    constructor(props) {
        super(props);
        this.onLogout = this.onLogout.bind(this);
    }
    onLogout(e) {
        e.preventDefault();
        this.props.logout();
    }

    render() {
        const {classes, auth} = this.props;
        return (
            <header className={classes.root}>
                <AppBar color="primary" position="static" className={classes.header}>
                    <Toolbar>
                        <Typography variant="h5" color="secondary" className={classes.grow}>
                            Exciting Random Chat
                        </Typography>
                        <Typography variant="h6" color="inherit" className={classes.grow}>
                            {auth.user && auth.user.name}
                        </Typography>
                        <AuthBtn isAuth={auth.isAuthenticated} classes={classes} logout={this.onLogout}/>
                    </Toolbar>
                </AppBar>
            </header>
        );
    };
}

Header.propTypes = {
    classes: PropTypes.object.isRequired,
    auth: PropTypes.object,
    logout: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => {
            dispatch(logoutUser());
        },
    }
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(Header)));
