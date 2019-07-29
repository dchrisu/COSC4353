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

class ClientRegistration extends React.Component {
    constructor(props){
        super(props);
        this.state = {username: "default", 
                      password: "default",
                      confirmPassword: "",
                      data: [],
                      from_backend1: 0,
                      from_backend2: 0,
                      clientInfoFK: 0
                    };

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

        if(this.state.password != this.state.confirmPassword){
            alert("Passwords do not match.")
        }
        else{
            fetch('http://localhost:5000/post_CheckRegistrationInfo',{
                method: "POST",
                headers: {
                'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    param1: this.state.username
                })
                })
                .then(res => res.json())
                .then(result => {
                    this.setState({ data: result.data })

                    var x = 'IF(EXISTS(SELECT * from LoginCredentials WHERE Username = \''+this.state.username+'\'),1,0)'

                    if(result.data[0][x] == 1){
                        alert("Username already exists. Please choose a different username.")
                    }
                    else if(result.data[0][x] == 0){
                        fetch('http://localhost:5000/post_ClientRegistrationPt1', {
                        method: "POST",
                        headers: {
                        'Content-type': 'application/json'
                        },
                        /*body: JSON.stringify({
                            //param1: this.state.username,
                            //param2: this.state.password,
                        })*/
                        })
                        .then(res => res.json())
                        .then(result => {

                            this.setState({ data: result.data, clientInfoFK: result.data[0].ClientPK })

                            fetch('http://localhost:5000/post_ClientRegistrationPt2', {
                            method: "POST",
                            headers: {
                            'Content-type': 'application/json'
                            },
                            body: JSON.stringify({
                                param1: this.state.username,
                                param2: this.state.password,
                                param3: result.data[0].ClientPK//this.state.clientInfoFK,
                            })
                            })
                            .then(res => res.json())
                            .then(result => {
                                this.setState({ data: result.data })
                                alert("Account created.")
                                window.location.href = '/Login';
                                return false;
                            })
                        })
                                }


                })
        
            //this.setState({ data: result.data, from_backend1: result.data[0].key1, from_backend2: result.data[0].key2 })
        
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <Paper className={classes.container}>
            
                <h1>Register an account</h1>
                <form className={classes.container} noValidate autoComplete="off">
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
                <Button variant="contained" className={classes.button} type = "button"  onClick = {this.handleSubmit}>
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