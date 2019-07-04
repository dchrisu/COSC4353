import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

const styles = theme => ({
    container: {
        width: "70%",
        margin: "0 auto",
        padding: "30px"
    },
    table: {
        minWidth: 650
    }
});

class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {username: "", 
                      password: ""};
    }
    componentDidMount() {
        /*overload*/
    }

    render() {
        const { classes } = this.props;
        return (
            <Paper className={classes.container}>
                <h1>Login</h1>
                <form className={classes.container} noValidate autoComplete="off">
                <TextField
                    id="standard-name"
                    label="Username"
                    className={classes.textField}
                    margin="normal"
                    style={{ margin: 8 }}
                />
                <br></br>
                <TextField
                    
                    id="standard-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    margin="normal"
                    style={{ margin: 8 }}
                />
                <br></br>
                <Button variant="contained" className={classes.button}>
                    Sign In
                </Button>
                <br></br><br></br>
                <Button>
                 <a className={classes.linkStyles} href="/ClientRegistration"><Link to="/ClientRegistration">Sign Up
                </Link></a></Button>
            </form>
            </Paper>
        );
    }
}
Login.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);