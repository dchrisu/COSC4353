import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'

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
        user_value1: 0,
        user_value2: 0,
        data: [],
        from_backend1: 0,
        from_backend2: 0,
    }

    getShipStatus() {
        fetch('http://68.183.131.116:4000/get_shipstatus', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                pass_in_parameter1: this.state.user_value1,
                pass_in_parameter2: this.state.user_value2
            })
        })
            .then(res => res.json())
            .then(result => {
                if (result.data.length !== 0) {
                    this.setState({ done: false })
                    this.setState({ data: result.data })
                }
                else {
                    this.setState({ TrackingID: -1 })
                    this.setState({ done: false })
                }
            })
            .catch(err => this.setState({ TrackingID: -1 }))
    }

    componentDidMount() {
        this.state.Date = new Date().getDate();
    }

    validType(cur, type) {
        const value = cur.target.value;
        const nextState = {};
        nextState[type] = value;
        this.setState(nextState);
    }

    render() {
        const { classes } = this.props;
        return (
            <Paper className={classes.container}>
                <h1>Fuel Quote Form</h1>
                <form noValidate autoComplete="off">
                    <TextField
                        id="filled-name"
                        type="number"
                        onChange={GallonsRequested => this.validType(GallonsRequested, "number")}
                        label="Gallons Requested*"
                        style={{ margin: 8 }}
                        className={classes.textField}
                        margin="normal"
                        variant="filled"
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
                        id="date"
                        label="Delivery Date"
                        type="date"
                        defaultValue={this.state.Date}
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
                        margin="normal"
                        InputProps={{
                            readOnly: true,
                        }}
                        variant="filled"
                    />
                    <TextField
                        disabled
                        id="filled-disabled"
                        defaultValue="Total Amount Due"
                        className={classes.textField}
                        margin="normal"
                        InputProps={{
                            readOnly: true,
                        }}
                        variant="filled"
                    />
                </form>

                <Button size="medium" style={{ margin: 50 }} variant="contained">
                    Get Price
                    </Button>

                <br></br>
                <Button size="large" style={{ margin: 50 }} disabled variant="contained">
                    Submit
                </Button>
            </Paper>
        );
    }
}
FuelQuoteForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FuelQuoteForm);