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
        data: [
            { Gallons: 5, Address: '3000 House Street', Date: '2/14/2019', Price: '$432.23', Total: '$1000.66' },
            { Gallons: 4, Address: '12 Tet Canal', Date: '3/7/2019', Price: '$15.23', Total: '$190.32' },
            { Gallons: 23, Address: '3399 Street Place', Date: '3/30/2019', Price: '$23.23', Total: '$300.00' },
            { Gallons: 1, Address: '987 Nice Place', Date: '4/15/2019', Price: '$843.23', Total: '$2054.11' },
            { Gallons: 3, Address: '4265 Area Farm', Date: '7/2/2019', Price: '$10.23', Total: '$145.00' }
        ],
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
                            <TableCell align="left">Delivery Address</TableCell>
                            <TableCell align="left">Delivery Date</TableCell>
                            <TableCell align="left">Suggested Price</TableCell>
                            <TableCell align="left">Total Amount Due</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.data.map(row => (
                            <TableRow>
                                <TableCell align="left"> {row.Gallons} </TableCell>
                                <TableCell align="left"> {row.Address}</TableCell>
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