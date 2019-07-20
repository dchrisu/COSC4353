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
    constructor(props) {
        super(props);
        this.state = {
            username: "testing",
            password: "testing",
            usernameFromBackend: [],
            passwordFromBackend: [],
            data: {}
        };
    }
    componentDidMount() {
        /*overload*/
    }

    handleChangeUsername = event => {
        this.setState({ username: event.target.value })
    }

    handleChangePassword = event => {
        this.setState({ password: event.target.value })
    }

    getLoginInfo = event => {
        //alert(this.state.username);

        fetch('http://localhost:5000/get_Login', {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                param1: this.state.username,
            })
        })
            .then(res => res.json())
            .then(result => {
                //this.setState({ data: result.data})
                this.setState({ data: result.data, usernameFromBackend: result.data[0].Username, passwordFromBackend: result.data[0].UserPassword })

                var UFB = JSON.stringify(this.state.usernameFromBackend)
                var PFB = JSON.stringify(this.state.passwordFromBackend)

                var a = '"';
                var b = '"';

                var userInputtedUsername = a + this.state.username + b
                var userInputtedPassword = a + this.state.password + b


                if ((UFB) == userInputtedUsername && (PFB) == userInputtedPassword) {
                    alert("Login Successful.")
                    if (result.data.length !== 0) {
                        localStorage.setItem('cur_User', result.data[0].ClientInfoFK);
                        this.setState({ loggedIn: true })
                        window.location.assign('/');
                    }
                    else {
                        this.setState({ auth: false })
                    }
                }
                else {
                    alert("Wrong username / password combination.")
                }


                //alert("POG");


            })

        {
            /*
            alert(this.state.passwordFromBackend)
            
            (this.state.usernameFromBackend) !== this.state.username && (this.state.passwordFromBackend) !== this.state.password ?
                alert("Wrong username / password combination.")
                //alert(this.state.usernameFromBackend)
                
            :
            alert("Login Successful.")
            */

        }

        //alert(this.state.data);
    }

    render() {
        const { classes } = this.props;
        return (
            <Paper className={classes.container}>
                <h1>Login</h1>
                <form className={classes.container} noValidate autoComplete="off" onSubmit={this.getLoginInfo}>
                    <TextField
                        id="standard-name"
                        label="Username"
                        className={classes.textField}
                        margin="normal"
                        style={{ margin: 8 }}
                        onChange={this.handleChangeUsername}
                    />
                    <br></br>
                    <TextField

                        id="standard-password-input"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        margin="normal"
                        style={{ margin: 8 }}
                        onChange={this.handleChangePassword}
                    />
                    <br></br>
                    <Button variant="contained" className={classes.button} type="submit">
                        Sign In
                </Button>
                    <br></br><br></br>
                </form>

                <Button>
                    <a className={classes.linkStyles} href="/ClientRegistration"><Link to="/ClientRegistration">Sign Up
                </Link></a></Button>

            </Paper>
        );
    }
}
Login.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);