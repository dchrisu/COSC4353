import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

const styles = theme => ({
    container: {
        width: "70%",
        margin: "0 auto",
        padding: "30px"
    },
    table: {
        minWidth: 650
    },
    menu: {
        width: 200,
      },
});

const USstates = [{value: 'CA'},{value: 'NY'},{value: 'TX'}]


class ClientProfileManagement extends React.Component {
    constructor(props){
        super(props);
        this.state = {name: "", 
                      address1: "",
                      address2: "",
                      city: "",
                      USstate: "",
                      zipcode: ""};

                      this.USstates = this.USstates;
                      this.handleChange = this.handleChange.bind(this);
                      this.handleSubmit = this.handleSubmit.bind(this);


    }
    componentDidMount() {
        /*overload*/
    }

    handleSubmit = (event) =>{
        alert(this.state.USstate);
        alert("Profile updated.");
    }


    handleChange = (event) =>{
        this.setState({USstate: event.target.value})
    }
        
        
    render() {
        const { classes } = this.props;
        return (
            <Paper className={classes.container}>
                <h1>Profile Information</h1>
                <form className={classes.container} noValidate autoComplete="off" onSubmit={this.handleSubmit}>
                <TextField
                    required
                    onInput={(e) => {
                        e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 50)
                    }}
                    id="standard-required"
                    label="Name"
                    className={classes.textField}
                    margin="normal"
                    style={{ margin: 8 }}
                />
                <br></br>
                <TextField
                    required
                    onInput={(e) => {
                    e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 100)
                    }}
                    id="standard-name"
                    label="Address 1"
                    className={classes.textField}
                    margin="normal"
                    style={{ margin: 8 }}
                />
                <br></br>
                <TextField
                    onInput={(e) => {
                    e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 100)
                    }}
                    id="standard-name"
                    label="Address 2"
                    className={classes.textField}
                    margin="normal"
                    style={{ margin: 8 }}
                />
                <br></br>
                <TextField
                    required
                    onInput={(e) => {
                    e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 100)
                    }}
                    id="standard-name"
                    label="City"
                    className={classes.textField}
                    margin="normal"
                    style={{ margin: 8 }}
                />
                <br></br>
                <TextField
                    id="standard-select-currency"
                    select
                    label="State"
                    className={classes.textField}
                    value = {USstates}
                    onChange = {this.handleChange}
                    
                    
                    /*{event =>{
                        this.setState({USstate: event.target.value})
                    }}*/

                    /*SelectProps={{
                        native: true,
                        MenuProps: {
                          className: classes.menu,
                        },
                      }}*/
                    helperText="Please select your state"
                    margin="normal"
                >
                 
                <MenuItem> AK </MenuItem>
                <MenuItem> AL </MenuItem>
                <MenuItem> AR </MenuItem>
                <MenuItem> AZ </MenuItem>
                <MenuItem> CA </MenuItem>
                <MenuItem> CO </MenuItem>
                <MenuItem> CT </MenuItem>
                <MenuItem> DE </MenuItem>
                <MenuItem> FL </MenuItem>
                <MenuItem> GA </MenuItem>
                <MenuItem> HI </MenuItem>
                <MenuItem> IA </MenuItem>
                <MenuItem> ID </MenuItem>
                <MenuItem> IL </MenuItem>
                <MenuItem> IN </MenuItem>
                <MenuItem> KS </MenuItem>
                <MenuItem> KY </MenuItem>
                <MenuItem> LA </MenuItem>
                <MenuItem> MA </MenuItem>
                <MenuItem> MD </MenuItem>
                <MenuItem> ME </MenuItem>
                <MenuItem> MI </MenuItem>
                <MenuItem> MN </MenuItem>
                <MenuItem> MO </MenuItem>
                <MenuItem> MS </MenuItem>
                <MenuItem> MT </MenuItem>
                <MenuItem> NC </MenuItem>
                <MenuItem> ND </MenuItem>
                <MenuItem> NE </MenuItem>
                <MenuItem> NH </MenuItem>
                <MenuItem> NJ </MenuItem>
                <MenuItem> NM </MenuItem>
                <MenuItem> NV </MenuItem>
                <MenuItem> NY </MenuItem>
                <MenuItem> OH </MenuItem>
                <MenuItem> OK </MenuItem>
                <MenuItem> OR </MenuItem>
                <MenuItem> PA </MenuItem>
                <MenuItem> RI </MenuItem>
                <MenuItem> SC </MenuItem>
                <MenuItem> TN </MenuItem>
                <MenuItem> TX </MenuItem>
                <MenuItem> UT </MenuItem>
                <MenuItem> VA </MenuItem>
                <MenuItem> VT </MenuItem>
                <MenuItem> WA </MenuItem>
                <MenuItem> WI </MenuItem>
                <MenuItem> WV </MenuItem>
                <MenuItem> WY </MenuItem>
                
                </TextField>
                <br></br>
                <TextField
                    Required
                    onInput={(e) => {
                    e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 9)
                    }}
                    id="standard-name"
                    label="Zipcode"
                    className={classes.textField}
                    margin="normal"
                    style={{ margin: 8 }}
                />
                <br></br><br></br>
                <Button variant="contained" className={classes.button} type="submit">
                    Complete Profile
                </Button>
                <br></br><br></br>
            </form>
            </Paper>
        );
    }
}
ClientProfileManagement.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ClientProfileManagement);