import React from "react";
import classnames from "classnames";
import withStyles from "@material-ui/core/styles/withStyles";
import Table from "@material-ui/core/Table";
import {COLOR} from "../constants/theme";

const styles = {
    table: {
        borderSpacing: '0 15px',
        borderCollapse: 'separate',
        '& tr': {
            '& th': {
                fontSize: 14,
                paddingTop: 5,
                paddingBottom: 0,
                color: COLOR.DARK,
                border: 'none'
            },
            '& td': {
                height: 60,
                fontSize: 14,
                background: COLOR.WHITE,
                color: COLOR.DARK,
                padding: '10px 15px',
                border: 'none'
            },
            '& td:first-child': {
                borderTopLeftRadius: 20,
                borderBottomLeftRadius: 20,
            },
            '& td:last-child': {
                borderTopRightRadius: 20,
                borderBottomRightRadius: 20
            }
        }
    }
}

class CustomTable extends React.Component {
    render() {
        const { classes, className, children } = this.props
        return (
            <Table className={classnames(
                classes.table,
                className
            )}>
                { children }
            </Table>
        );
    }
}

export default withStyles(styles)(CustomTable)
