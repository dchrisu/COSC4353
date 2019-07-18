import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Menu from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { Z_BLOCK } from 'zlib';

const styles = theme => ({
    wrapper: {
        align: "center",
        width: "100%",
        overflowX: 'auto',
    },
    linkStyles: {
        color: 'white'
    },
    gridItem: {
        textAlign: 'center',
        width: '10%',
        display: 'inline-block',
        float: 'right',
    },
    home: {
        width: '10%',
        display: 'inline-block',
        float: 'left',
    },
    a: {
        link: {
            textDecoration: 'none',
            color: 'white',
        },
        visited: {
            textDecoration: 'none',
            color: 'white',
        }
    }
});


class Header extends Component {
    render() {
        const { classes } = this.props;
        return (
            <div class="container" style={{ maxWidth: '100%', margin: '0 auto', paddingBottom: '50px' }}>
                <AppBar position="static">
                    <Menu>
                        <ul style={{ listStyleType: 'none', width: '100%' }}>
                            <li class={classes.home}><Link to="/">Home</Link></li>
                            <li class={classes.gridItem}><Link to="/Login">Login</Link></li>
                            <li class={classes.gridItemPadding}></li>
                            <li class={classes.gridItem}><Link to="/ClientRegistration">Register</Link></li>
                            <li class={classes.gridItemPadding}></li>
                            <li class={classes.gridItem}><Link to="/ClientProfileManagement">Profile</Link></li>
                            <li class={classes.gridItemPadding}></li>
                            <li class={classes.gridItem}><Link to="/FuelQuoteForm">Fuel Quote</Link></li>
                            <li class={classes.gridItemPadding}></li>
                            <li class={classes.gridItem}><Link to="/FuelQuoteHistory">Quote History</Link></li>
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