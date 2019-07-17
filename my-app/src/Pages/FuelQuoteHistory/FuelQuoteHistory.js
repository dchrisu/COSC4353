import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

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

class FuelQuoteHistory extends React.Component {
    state = {
        CurrentDate: '',
        User: '',
        data: [],
    }

    getFuelQuoteHistory() {
        fetch('http://localhost:3000/get_FuelQuoteHistory', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                pass_in_parameter1: this.state.User,
            })
        })
            .then(res => res.json())
            .then(result => {
                this.setState({ data: result.data })
            })
    }

    componentDidMount() {
        this.state.CurrentDate = new Date().getDate();

    }

    render() {
        const { classes } = this.props;
        return (
            <Paper className={classes.container}>
                <h1>Fuel Quote History</h1>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Gallons Requested</TableCell>
                            <TableCell align="left">Delivery Date</TableCell>
                            <TableCell align="left">Suggested Price</TableCell>
                            <TableCell align="left">Total Amount Due</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.data.map(row => (
                            <TableRow>
                                <TableCell align="left"> {row.Gallons} </TableCell>
                                <TableCell align="left"> {row.Date}</TableCell>
                                <TableCell align="left"> {row.Price} </TableCell>
                                <TableCell align="left"> {row.Total} </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}
FuelQuoteHistory.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FuelQuoteHistory);