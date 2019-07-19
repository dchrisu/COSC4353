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
        cur_User: 0,

        CurrentDate: '',
        data: [],
    }

    getFuelQuoteHistory() {
        fetch('http://localhost:5000/get_FuelQuoteHistory', {
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
                if (result.data.length !== 0) {
                    this.setState({ data: result.data })
                }
                else {
                    console.log("Empty dataset!")
                }
            })
    }

    componentDidMount() {
        //Get Fuel Quote History based on User
        var localUser = localStorage.getItem("USERFK");
        this.state.cur_User = localUser;
        this.getFuelQuoteHistory();
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
                                <TableCell align="left"> {row.GallonsRequested} Gallons</TableCell>
                                <TableCell align="left"> {row.DeliveryDate.substring(5, 7) + "/" + row.DeliveryDate.substring(8, 10) + "/" + row.DeliveryDate.substring(0, 4)}</TableCell>
                                <TableCell align="left"> ${row.SuggestedPrice.toFixed(2)}/gal</TableCell>
                                <TableCell align="left"> ${row.TotalAmountDue.toFixed(2)} </TableCell>
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