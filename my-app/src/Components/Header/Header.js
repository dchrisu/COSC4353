import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
//import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Menu from '@material-ui/core/Toolbar';
import { BrowserRouter as Router, Route, Redirect, Switch, Link} from 'react-router-dom';

const styles = theme => ({
    wrapper: {
        align: "center",
        width: "100%",
        overflowX: 'auto',
    },
    linkStyles: {
        textDecoration: 'none',
        color: 'white',
        fontWeight: 'bold',
        '&:hover': {
            backgroundColor: 'black'
        }
    },
    gridItem: {
        textAlign: 'center',
        width: '10%',
        display: 'inline-block',
        float: 'right',
        color: 'red',
        paddingLeft: '12px',
        paddingRight: '12px',
    },
    home: {
        width: '10%',
        display: 'inline-block',
        float: 'left',
    },
});


class Header extends Component {
    state = {
        cur_User: -1,
        user_LoggedIn: false,
        debugMode: false,
    }

    componentDidMount() {
        this.state.cur_User = localStorage.getItem("cur_User");
        this.setState({ cur_User: this.state.cur_User });
    }

    logoutUser() {
        localStorage.removeItem("cur_User");
        this.setState({ cur_User: -1 });
    }

    render() {
        const { classes } = this.props;
        return (
            <div class="container" style={{ maxWidth: '100%', margin: '0 auto', paddingBottom: '50px' }}>
                <AppBar position="static">
                    <Menu>
                        <ul style={{ listStyleType: 'none', width: '100%' }}>

                            {this.state.debugMode === true ?
                                <Fragment>
                                    <li class={classes.home}><Link to="/" class={classes.linkStyles}>Home</Link></li>
                                    <li class={classes.gridItem}><Link to="/ClientProfileManagement" class={classes.linkStyles}>Profile</Link></li>
                                    <li class={classes.gridItem}><Link to="/FuelQuoteHistory" class={classes.linkStyles}>Check Quote History</Link></li>
                                    <li class={classes.gridItem}><Link to="/FuelQuoteForm" class={classes.linkStyles}>Get Fuel Quote</Link></li>
                                    <li class={classes.gridItem}><Link to="/ClientRegistration" class={classes.linkStyles}>Register</Link></li>
                                    <li class={classes.gridItem}><Link to="/Login" class={classes.linkStyles}>Login</Link></li>
                                </Fragment>
                                :
                                <Fragment>
                                    {this.state.cur_User !== -1 ?
                                        <Fragment>
                                            <li class={classes.home}><Link to="/" class={classes.linkStyles}>Home</Link></li>
                                            <li class={classes.gridItem}><Link to="/" class={classes.linkStyles} onClick={() => this.logoutUser()}>Logout</Link></li>
                                            <li class={classes.gridItem}><Link to="/ClientProfileManagement" class={classes.linkStyles}>Profile</Link></li>
                                            <li class={classes.gridItem}><Link to="/FuelQuoteHistory" class={classes.linkStyles}>Check Quote History</Link></li>
                                            <li class={classes.gridItem}><Link to="/FuelQuoteForm" class={classes.linkStyles}>Get Fuel Quote</Link></li>
                                        </Fragment>
                                        :
                                        <Fragment>
                                            <li class={classes.home}><Link to="/" class={classes.linkStyles}>Home</Link></li>
                                            <li class={classes.gridItem}><Link to="/Login" class={classes.linkStyles}>Login</Link></li>
                                            <li class={classes.gridItem}><Link to="/ClientRegistration" class={classes.linkStyles}>Register</Link></li>
                                        </Fragment>
                                    }
                                </Fragment>
                            }
                        </ul>
                    </Menu>
                </AppBar>
            </div>
        );
    }
}
Header.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);