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

//const USstates = [{value: 'CA'},{value: 'NY'},{value: 'TX'}]

const USstatesArray = [
    {
      value: 'AL',
      label: 'Alabama',
    },
    {
      value: 'AK',
      label: 'Alaska',
    },
    {
      value: 'AZ',
      label: 'Arizona',
    },
    {
      value: 'AR',
      label: 'Arkansas',
    },
    {
      value: 'CA',
      label: 'California',
    },
    {
      value: 'CO',
      label: 'Colorado',
    },
      {
        value: 'CT',
        label: 'Connecticut',
      },
      {
        value: 'DE',
        label: 'Delaware',
      },
      {
        value: 'FL',
        label: 'Florida',
      },
      {
        value: 'GA',
        label: 'Georgia',
      },
      {
        value: 'HI',
        label: 'Hawaii',
      },
      {
        value: 'ID',
        label: 'Idaho',
      },
      {
        value: 'IL',
        label: 'Illinois',
      },
      {
        value: 'IN',
        label: 'Indiana',
      },
      {
        value: 'IA',
        label: 'Iowa',
      },
      {
        value: 'KS',
        label: 'Kansas',
      },
      {
        value: 'KY',
        label: 'Kentucky',
      },
      {
        value: 'LA',
        label: 'Louisiana',
      },
      {
        value: 'ME',
        label: 'Maine',
      },
      {
        value: 'MD',
        label: 'Maryland',
      },
      {
        value: 'MA',
        label: 'Massachusetts',
      },
      {
        value: 'MI',
        label: 'Michigan',
      },
      {
        value: 'MN',
        label: 'Minnesota',
      },
      {
        value: 'MS',
        label: 'Mississippi',
      },
      {
        value: 'MO',
        label: 'Missouri',
      },
      {
        value: 'MT',
        label: 'Montana',
      },
      {
        value: 'NE',
        label: 'Nebraska',
      },
      {
        value: 'NV',
        label: 'Nevada',
      },
      {
        value: 'NH',
        label: 'New Hampshire',
      },
      {
        value: 'NJ',
        label: 'New Jersey',
      },
      {
        value: 'NM',
        label: 'New Mexico',
      },
      {
        value: 'NY',
        label: 'New York',
      },
      {
        value: 'NC',
        label: 'North Carolina',
      },
      {
        value: 'ND',
        label: 'North Dakota',
      },
      {
        value: 'OH',
        label: 'Ohio',
      },
      {
        value: 'OK',
        label: 'Oklahoma',
      },
      {
        value: 'OR',
        label: 'Oregon',
      },
      {
        value: 'PA',
        label: 'Pennsylvania',
      },
      {
        value: 'SC',
        label: 'South Carolina',
      },
      {
        value: 'SD',
        label: 'South Dakota',
      },
      {
        value: 'TN',
        label: 'Tennessee',
      },
      {
        value: 'TX',
        label: 'Texas',
      },
      {
        value: 'UT',
        label: 'Utah',
      },
      {
        value: 'VT',
        label: 'Vermont',
      },
      {
        value: 'VA',
        label: 'Virginia',
      },
      {
        value: 'WA',
        label: 'Washington',
      },
      {
        value: 'WV',
        label: 'West Virginia',
      },
      {
        value: 'WI',
        label: 'Wisconsin',
      },
      {
        value: 'WY',
        label: 'Wyoming',
      }

  ];


class ClientProfileManagement extends React.Component {
    constructor(props){
        super(props);
        this.state = {FirstName: "", 
                      LastName: "",
                      Address1: "",
                      Address2: " ",
                      City: "",
                      USstate: "",
                      Zipcode: "",
                      data: []
                    };

                      this.USstates = this.USstates;
                      //this.handleChange = this.handleChange.bind(this);
                      this.handleSubmit = this.handleSubmit.bind(this);


    }
    componentDidMount() {
        /*overload*/
    }

    handleSubmit = event =>{

        fetch('http://localhost:5000/post_ClientProfileManagement', {
             method: "POST",
             headers: {
            'Content-type': 'application/json'
            },
             body: JSON.stringify({
                param1: this.state.FirstName,
                param2: this.state.LastName,
                param3: this.state.Address1,
                param4: this.state.Address2,
                param5: this.state.City,
                param6: this.state.USstate,
                param7: this.state.Zipcode,
             })
            })
            .then(res => res.json())
            .then(result => {
                this.setState({ data: result.data})
            })

    }

    handleFirstNameChange = event =>{
        this.setState({FirstName: event.target.value})
    }
    handleLastNameChange = event =>{
        this.setState({LastName: event.target.value})
    }
    handleAddress1Change = event =>{
        this.setState({Address1: event.target.value})
    }
    handleAddress2Change = event =>{
        this.setState({Address2: event.target.value})
    }
    handleCityChange = event =>{
        this.setState({City: event.target.value})
    }
    handleUSstateChange = event =>{
        this.setState({USstate: event.target.value})
    }

    handleZipcodeChange = event =>{
        this.setState({Zipcode: event.target.value})
    }

    testUSstate = (event) =>{

        alert(this.state.USstate)
    }
        
        
    render() {
        const { classes } = this.props;
        return (
            <Paper className={classes.container}>
                <h1>Profile Information</h1>
                <form className={classes.container} noValidate autoComplete="off" onSubmit={this.handleSubmit}>
                <TextField
                    required
                    //onInput={(e) => {
                    //    e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 50)
                    //}}
                    id="standard-required"
                    label="First Name"
                    className={classes.textField}
                    margin="normal"
                    style={{ margin: 8 }}
                    onChange = {this.handleFirstNameChange}
                />
                <br></br>
                <TextField
                    required
                    //onInput={(e) => {
                    //    e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 50)
                    //}}
                    id="standard-required"
                    label="Last Name"
                    className={classes.textField}
                    margin="normal"
                    style={{ margin: 8 }}
                    onChange = {this.handleLastNameChange}
                />
                <br></br>
                <TextField
                    required
                    //onInput={(e) => {
                    //e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 100)
                    //}}
                    id="standard-name"
                    label="Address 1"
                    className={classes.textField}
                    margin="normal"
                    style={{ margin: 8 }}
                    onChange = {this.handleAddress1Change}
                />
                <br></br>
                <TextField
                    //onInput={(e) => {
                    //e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 100)
                    //}}
                    id="standard-name"
                    label="Address 2"
                    className={classes.textField}
                    margin="normal"
                    style={{ margin: 8 }}
                    onChange = {this.handleAddress2Change}
                />
                <br></br>
                <TextField
                    required
                    //onInput={(e) => {
                    //e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 100)
                    //}}
                    id="standard-name"
                    label="City"
                    className={classes.textField}
                    margin="normal"
                    style={{ margin: 8 }}
                    onChange = {this.handleCityChange}
                />
                <br></br>
                <TextField
                    id="standard-select-currency"
                    select
                    label="State"
                    className={classes.textField}
                    value = {this.handleUSstateChange} //{USstates}
                    onChange = {this.handleUSstateChange}
                    
                    
                    /*{event =>{
                        this.setState({USstate: event.target.value})
                    }}*/

                    SelectProps={{
                        MenuProps: {
                          className: classes.menu,
                        },
                      }}
                    helperText="Please select your state"
                    margin="normal"
                >
                {USstatesArray.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                    ))}

                
                </TextField>
                <br></br>
                <TextField
                    Required
                    //onInput={(e) => {
                    //e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 9)
                    //}}
                    id="standard-name"
                    label="Zipcode"
                    className={classes.textField}
                    margin="normal"
                    style={{ margin: 8 }}
                    onChange = {this.handleZipcodeChange}
                />
                <p>*Required Information</p>
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