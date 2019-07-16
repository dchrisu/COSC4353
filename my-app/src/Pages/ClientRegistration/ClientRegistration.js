import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Login from './Login';


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

class ClientRegistration extends React.Component {
    constructor(props){
        super(props);
        this.state = {username: "", 
                      password: "",
                      confirmPassword: ""};

        this.handleSubmit = this.handleSubmit.bind(this);
    }
    /*state = {
        username: "",
        password: "",
        confirmPassword: ""
    }*/

    componentDidMount() {
        /*overload*/
    }

    /*handleChange(event){
        this.setState({username: event.target.username, 
                       password: event.target.password,
                       confirmPassword: event.targer.confirmPassword})
    }*/

    handleChangeUsername = event =>{
        this.setState({username: event.target.value})
    }
    handleChangePassword = event =>{
        this.setState({password: event.target.value})
    }
    handleChangeConfirmPassword= event =>{
        this.setState({confirmPassword: event.target.value})
    }

    handleSubmit = event =>{
        /*alert(this.state.username);*/

        fetch('localhost:5000', {
             method: "POST",
             headers: {
            'Content-type': 'application/json'
            },
             body: JSON.stringify(this.state)
            })
            .then((response) => response.json())
            .then((result) => {
            console.log(result)
            })

        alert("Account created.")
    }

    render() {
        const { classes } = this.props;
        return (
            <Paper className={classes.container}>
            
                <h1>Register an account</h1>
                <form className={classes.container} noValidate autoComplete="off" onSubmit = {this.handleSubmit}>
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
                <TextField
                    
                    id="standard-password-input"
                    label="Confirm Password"
                    type="password"
                    autoComplete="current-password"
                    margin="normal"
                    style={{ margin: 8 }}
                    onChange={this.handleChangeConfirmPassword}
                />
                <br></br>
                <Button variant="contained" className={classes.button} type = "submit">
                    Create Account
                </Button>
            </form>
            </Paper>
        );
    }
}

ClientRegistration.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ClientRegistration);