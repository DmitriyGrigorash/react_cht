import React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {withRouter} from 'react-router-dom';

import AppBar from "@material-ui/core/AppBar";
import { withStyles } from '@material-ui/core/styles';
import Toolbar from "@material-ui/core/Toolbar";
import HomeIcon from '@material-ui/icons/Home';
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Link from '@material-ui/core/Link';
import Fab from "@material-ui/core/Fab";
import ButtonGroup from "@material-ui/core/ButtonGroup";

import {logoutUser} from "../actions";


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
        color: 'white'
    },
    add: {
        marginRight: 20,
    }
};

function AuthBtn({isAuth, classes, logout}) {
    if (isAuth) {
        return (
            <Button color="inherit" onClick={logout}>
                Logout
            </Button>
        )
    } else {
        return (
            <ButtonGroup color="primary" aria-label="outlined primary button group">
                <Button color="inherit">
                    <Link href='/register' underline='none' className={classes.link}>Sign Up</Link>
                </Button>
                <Button color="inherit">
                    <Link href='/login' underline='none' className={classes.link}>Sign In</Link>
                </Button>
            </ButtonGroup>
        )
    }
}

export class Header extends React.PureComponent {
    onLogout(e) {
        e.preventDefault();
        this.props.logoutUser(this.props.history);
    }

    render() {
        const {classes, auth} = this.props;
        return (
            <header className={classes.root}>
                <AppBar position="static" color="primary">
                    <Toolbar>
                        <Fab color="primary" size="medium" className={classes.menuButton} href='/'>
                            <HomeIcon />
                        </Fab>
                        <Typography variant="h6" color="inherit" className={classes.grow}>
                            Random Chat
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
    logoutUser: PropTypes.func
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(withRouter(withStyles(styles)(Header)));
