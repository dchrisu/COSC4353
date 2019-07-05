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