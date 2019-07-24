import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


const styles = theme => ({
    container: {
        width: "70%",
        margin: "0 auto",
        padding: "30px"
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    dense: {
        marginTop: 16,
    },
    menu: {
        width: 200,
    },
});

class FuelQuoteForm extends React.Component {
    state = {
        cur_User: 0,

        Date: '',
        FuelQuoteHistory_Flag: false,
        GallonsRequested: 0,
        valid_GallonsRequested: true,
        DeliveryAddress: '',
        Address1: '',
        City: '',
        State: '',
        Zipcode: '',
        SuggestedPrice: 0,
        TotalAmountDue: 0,
        data: [],
        openData: false,
        open_GallonsRequested: false,
    }

    componentDidMount() {
        //Before render, make sure to populate the Delivery Address from the DB
        var localUser = localStorage.getItem("cur_User");
        this.state.cur_User = localUser;
        this.getClientAddressAndHistoryFlag();
    }

    //Grab from sessionstorage, the current logged in User's address 
    // for Delivery Address field.
    getClientAddressAndHistoryFlag() {
        fetch('http://localhost:5000/get_ClientAddressAndHistoryFlag', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                param_cur_User: this.state.cur_User,
            })
        })
            .then(res => res.json())
            .then(result => {
                this.setState({
                    Address1: result.data[0].Address1,
                    State: result.data[0].State,
                    City: result.data[0].City,
                    Zipcode: result.data[0].Zipcode,
                    FuelQuoteHistory_Flag: result.data[0].FuelQuoteHistory_Flag,
                    DeliveryAddress: result.data[0].Address1 + ", " + result.data[0].City + " " + result.data[0].State + " " + result.data[0].Zipcode
                })
            })
    }

    //Finish the SUBMISSION using Submit button, this will 
    // INSERT INTO FuelQuoteHistory table.
    postFuelQuote() {
        fetch('http://localhost:5000/post_FuelQuote', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                param_GallonsRequested: this.state.GallonsRequested,
                param_DeliveryDate: this.state.Date,
                param_SuggestedPrice: this.state.SuggestedPrice,
                param_TotalAmountDue: this.state.TotalAmountDue,
                param_User: this.state.cur_User,
            })
        })
            .then(res => res.json())
            .then(this.setState({ openData: true }))
    }

    //Use this function whenever the fields are satisfied.
    // Make a call to the backend that returns the final calculated value
    // based on the pricing module.
    postPricingModule() {
        fetch('http://localhost:5000/post_PricingModule', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                param_GallonsRequested: this.state.GallonsRequested,
                param_Address: this.state.DeliveryAddress,
                param_Date: this.state.Date,
                param_FuelQuoteHistory_Flag: this.state.FuelQuoteHistory_Flag,
            })
        })
            .then(res => res.json())
            .then(result => {
                this.setState({ SuggestedPrice: result.SuggestedPrice })
                var TotalCalc = this.state.GallonsRequested * this.state.SuggestedPrice;
                this.setState({ TotalAmountDue: TotalCalc })
            })
    }

    validType(cur, type) {
        const value = cur.target.value;
        const nextState = {};
        nextState[type] = value;
        this.setState(nextState);
    }

    handleChange = (name, val) => {
        this.setState({ [name]: val });
    }

    calcAmounts() {
        //Check regex for any nonnumeric
        var regex = new RegExp("^\\d+$") //Single instance of a nonnumeric char
        if (regex.test(this.state.GallonsRequested)) {
            //Make the backend call to calculate using Pricing Module
            this.postPricingModule();
        }
        else {
            //Open up dialog window telling user that their 
            // "Gallons Requested" input is not valid.
            this.setState({ open_GallonsRequested: true })
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <Paper className={classes.container}>
                <Dialog
                    open={this.state.open_GallonsRequested}
                    keepMounted
                >
                    <DialogTitle>{"Invalid input!"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Invalid Gallons Requested entry.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.setState({ open_GallonsRequested: false })}>
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
                <Dialog
                    open={this.state.openData}
                    keepMounted
                >
                    <DialogTitle>{"Submission recieved!"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            We have submitted your Fuel Quote! Check Fuel Quote History for more information.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.setState({ openData: false })}>
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
                <h1>Fuel Quote Form</h1>
                <form noValidate autoComplete="off">
                    <TextField
                        id="filled-name"
                        name="GallonsRequested"
                        required
                        onChange={e => this.handleChange(e.target.name, e.target.value)}
                        label="Gallons Requested"
                        style={{ margin: 8 }}
                        className={classes.textField}
                        margin="normal"
                    />
                    <TextField
                        disabled
                        id="filled-disabled"
                        fullWidth
                        label="Delivery Address"
                        value={this.state.DeliveryAddress}
                        className={classes.textField}
                        margin="normal"
                        variant="filled"
                    />
                    <TextField
                        id="Date"
                        label="Delivery Date"
                        required
                        type="date"
                        defaultValue={this.state.Date}
                        name="Date"
                        onChange={e => this.handleChange(e.target.name, e.target.value)}
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        disabled
                        id="filled-disabled"
                        label="Suggested Price per Gallon"
                        defaultValue="Waiting for input..."
                        className={classes.textField}
                        value={this.state.SuggestedPrice.toFixed(2)}
                        margin="normal"
                        InputProps={{
                            readOnly: true,
                        }}
                        variant="filled"
                    />
                    <TextField
                        disabled
                        id="filled-disabled"
                        label="Total Amount Due"
                        defaultValue="Waiting for input..."
                        className={classes.textField}
                        margin="normal"
                        value={"$" + this.state.TotalAmountDue.toFixed(2)}
                        InputProps={{
                            readOnly: true,
                        }}
                        variant="filled"
                    />
                </form>
                {
                    this.state.GallonsRequested !== 0 && this.state.Date !== '' && this.state.valid_GallonsRequested ?
                        <Button size="medium" style={{ margin: 50 }} variant="contained" onClick={() => this.calcAmounts()}>
                            Get Price
                    </Button > :
                        <Button size="medium" style={{ margin: 50 }} disabled variant="contained">
                            Get Price
                    </Button >
                }
                <br></br>
                {
                    this.state.GallonsRequested !== 0 && this.state.Date !== '' && this.state.SuggestedPrice !== 0 && this.state.TotalAmountDue !== 0 && this.state.valid_GallonsRequested ?
                        <Button size="large" style={{ margin: 50 }} variant="contained" onClick={() => { this.postFuelQuote(); this.state.openData = true; }}>
                            Submit
                    </Button> :
                        <Button size="large" style={{ margin: 50 }} disabled variant="contained">
                            Submit
                </Button>
                }

            </Paper >
        );
    }
}
FuelQuoteForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FuelQuoteForm);