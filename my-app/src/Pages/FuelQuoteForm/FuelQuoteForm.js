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
        GallonsRequested: 0,
        valid_GallonsRequested: true,
        DeliveryAddress: '',
        DeliveryDate: '',
        SuggestedPrice: 0,
        TotalAmountDue: 0,
        data: [],
        openData: false,
        open_GallonsRequested: false,
    }

    //Grab from sessionstorage, the current logged in User's address 
    // for Delivery Address field.
    getClientAddress() {
        fetch('http://localhost:5000/get_ClientAddress', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                pass_in_parameter1: this.state.cur_User,
            })
        })
            .then(res => res.json())
            .then(result => {
                this.setState({ data: result.data[0].DeliveryAddress })
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
                param_DeliveryDate: this.state.DeliveryDate,
                param_SuggestedPrice: this.state.SuggestedPrice,
                param_TotalAmountDue: this.state.TotalAmountDue,
            })
        })
            .then(res => res.json())
            .then(result => {
                this.setState({ data: result.data, from_backend1: result.data[0].key1, from_backend2: result.data[0].key2 })
            })
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
                param_Date: this.state.DeliveryDate,
            })
        })
            .then(res => res.json())
            .then(result => {
                this.setState({ data: result.data[0].SuggestedPrice })
            })
    }

    componentDidMount() {
        //Before render, make sure to populate the Delivery Address from the DB
        //this.getClientAddress();
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
        var regex = new RegExp("^\\d+$")
        if (regex.test(this.state.GallonsRequested)) {
            //Placeholder algo
            var sugprice = this.state.GallonsRequested * 2;
            this.setState({ SuggestedPrice: sugprice });
            this.setState({ TotalAmountDue: sugprice * 1.24 })

            //Make the backend call to calculate using Pricing Module
            //this.postPricingModule(); 
            //var TotalCalc = this.state.GallonsRequested * this.state.SuggestedPrice;
            //this.setState({ TotalAmountDue: TotalCalc })
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
                        type="number"
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
                        defaultValue="No address found!"
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
                        label="Suggested Price"
                        defaultValue="Waiting for input..."
                        className={classes.textField}
                        value={this.state.SuggestedPrice}
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
                        value={this.state.TotalAmountDue}
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