import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Menu from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
    wrapper: {
        align: "center",
        width: "100%",
        overflowX: 'auto',
    },
    gridItem: {
        textAlign: 'center',
    },
    linkStyles: {
        color: 'white'
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
                        <div style={{ width: '30%' }}>
                            <Router>
                                <Grid>
                                    <Button variant="contained">
                                        <a href="/" class="MenuContents"><Link to="/">Home
                                    </Link></a></Button>
                                </Grid>
                            </Router>
                        </div>
                        <Grid container style={{ width: '70%' }} style={{ textAlign: 'center' }}>
                            <Router>
                                <Grid className={classes.gridItem} item xs={3}>
                                    <Button>
                                        <a className={classes.linkStyles} href="/Login"><Link to="/Login">Login</Link></a></Button>
                                </Grid>
                                <Grid className={classes.gridItem} item xs={3}>
                                    <Button>
                                        <a className={classes.linkStyles} href="/ClientProfileManagement" ><Link to="/ClientProfileManagement">Profile</Link></a></Button>
                                </Grid>
                                <Grid className={classes.gridItem} item xs={3}>
                                    <Button>
                                        <a className={classes.linkStyles} href="/FuelQuoteForm"><Link to="/FuelQuoteForm">Fuel Quote</Link></a></Button>
                                </Grid>
                                <Grid className={classes.gridItem} item xs={3}>
                                    <Button>
                                        <a className={classes.linkStyles} href="/FuelQuoteHistory" ><Link to="/FuelQuoteHistory">Quote History</Link></a></Button>
                                </Grid>
                            </Router>
                        </Grid>
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