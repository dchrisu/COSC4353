import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
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
        Date: '',
        GallonsRequested: 0,
        SuggestedPrice: 0,
        TotalAmountDue: 0,
        user_value1: 0,
        user_value2: 0,
        data: [],
        from_backend1: 0,
        from_backend2: 0,
        openData: false,
    }

    postFuelQuote() {
        fetch('http://localhost:5000/post_FuelQuote', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                pass_in_parameter1: this.state.SuggestedPrice,
                pass_in_parameter2: this.state.TotalAmountDue,
            })
        })
            .then(res => res.json())
            .then(result => {
                this.setState({ data: result.data, from_backend1: result.data[0].key1, from_backend2: result.data[0].key2 })
            })
    }

    componentDidMount() {
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
        var sugprice = this.state.GallonsRequested * 2;
        this.setState({ SuggestedPrice: sugprice });
        this.setState({ TotalAmountDue: sugprice * 1.24 })
    }

    render() {
        const { classes } = this.props;
        return (
            <Paper className={classes.container}>
                <Dialog
                    open={this.state.openData}
                    keepMounted
                >
                    <DialogTitle>{"Submission recieved!"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Data: {this.state.from_backend1} {this.state.from_backend2}
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
                    this.state.GallonsRequested !== 0 && this.state.Date !== '' ?
                        <Button size="medium" style={{ margin: 50 }} variant="contained" onClick={() => this.calcAmounts()}>
                            Get Price
                    </Button > :
                        <Button size="medium" style={{ margin: 50 }} disabled variant="contained">
                            Get Price
                    </Button >
                }
                <br></br>
                {
                    this.state.GallonsRequested !== 0 && this.state.Date !== '' && this.state.SuggestedPrice !== 0 && this.state.TotalAmountDue !== 0 ?
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