import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
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
    }
});


class Header extends Component {
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.wrapper} style={{ paddingBottom: '50px' }}>
                <AppBar position="static">
                    <Toolbar>
                        <Grid container spacing={12} style={{ textAlign: 'center' }}>
                            <Router>
                                <Grid className={classes.gridItem} item xs={3} >
                                    <Button variant="contained">
                                        <a href="/Login" class="MenuContents"><Link to="/Login">Login
                                    </Link></a></Button>
                                </Grid>
                                <Grid className={classes.gridItem} item xs={3} >
                                    <Button variant="contained">
                                        <a href="/ClientProfileManagement" class="MenuContents"><Link to="/ClientProfileManagement">Profile
                                    </Link></a></Button>
                                </Grid>
                                <Grid className={classes.gridItem} item xs={3} >
                                    <Button variant="contained">
                                        <a href="/FuelQuoteForm" class="MenuContents"><Link to="/FuelQuoteForm">Fuel Quote
                                    </Link></a></Button>
                                </Grid>
                                <Grid className={classes.gridItem} item xs={3} >
                                    <Button variant="contained">
                                        <a href="/FuelQuoteHistory" class="MenuContents"><Link to="/FuelQuoteHistory">Quote History
                                    </Link></a></Button>
                                </Grid>
                            </Router>
                        </Grid>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}
Header.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);