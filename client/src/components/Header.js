import React from 'react';
import PropTypes from 'prop-types';
import AppBar from "@material-ui/core/AppBar";
import { withStyles } from '@material-ui/core/styles';
import Toolbar from "@material-ui/core/Toolbar";
import HomeIcon from '@material-ui/icons/Home';
import AccountBalance from '@material-ui/icons/AccountBalance';
import AddIcon from '@material-ui/icons/Add'
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Link from '@material-ui/core/Link';
import Fab from "@material-ui/core/Fab";
import Badge from "@material-ui/core/Badge";

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

function AuthBtn ({isAuth, classes}) {
  if (isAuth) {
    return(
      <Button color="inherit">
          <Link href='/api/logout' underline='none' className={classes.link}>LOGOUT</Link>
      </Button>
    )
  } else {
    return (
      <Button color="inherit">
          <Link href='/auth/google' underline='none' className={classes.link}>LOGIN</Link>
      </Button>
    )
  }
}

export class Header extends React.PureComponent {
    render() {
        const {classes, isAuth} = this.props;
        return (
            <header className={classes.root}>
                <AppBar position="static" color="primary">
                    <Toolbar>
                        <Fab color="primary" size="medium" className={classes.menuButton} href={isAuth ? '/surveys' : '/'}>
                            <HomeIcon />
                        </Fab>
                        <Typography variant="h6" color="inherit" className={classes.grow}>
                            Emaily
                        </Typography>
                        <Fab color="primary" aria-label="Add" size="medium" href="/charge" className={classes.add}>
                            <AddIcon />
                        </Fab>
                        <Badge
                            color="secondary" max={99999}
                            style={{marginRight: '30px'}}
                            badgeContent={isAuth.credits}
                        >
                            <AccountBalance />
                        </Badge>
                        <AuthBtn isAuth={isAuth} classes={classes}/>
                    </Toolbar>
                </AppBar>
            </header>
        );
    };
}

Header.propTypes = {
    classes: PropTypes.object.isRequired,
    isAuth: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired,
};

export default withStyles(styles)(Header);
