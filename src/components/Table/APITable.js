import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import styles from "assets/jss/material-dashboard-react/components/tableStyle.js";
import { TableBody } from "@material-ui/core";
import "./Table.css";

const useStyles = makeStyles(styles);

export default function CustomAPITable(props) {
  const classes = useStyles();
  const { tableHeaderColor } = props;
  const { tableHead, tableData } = props;

  return (
    <div className={classes.tableResponsive}>
      <Table className={classes.table}>
        <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
          <TableRow className={classes.tableHeadRow}>
            {tableHead.map((prop, key) => {
              return (
                <TableCell
                  className={classes.tableCell + " " + classes.tableHeadCell}
                  key={key}
                >
                  {prop}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.length > 2
            ? tableData.map((data, num) => (
                <TableRow key={num}>
                  <TableCell>{data.gender}</TableCell>
                  <TableCell>
                    {data.name.title} {data.name.first} {data.name.last}
                  </TableCell>
                  <TableCell>
                    {data.location.street.name} {data.location.street.number}{" "}
                    {","}
                    {<br />}
                    {data.location.city} {","} {data.location.state}
                    {","} {data.location.postcode} {","} {<br />}
                    {data.location.country}
                  </TableCell>
                  <TableCell>{data.email}</TableCell>
                  <TableCell>
                    Username : {data.login.username} {<br />} Password :{" "}
                    {data.login.password}
                  </TableCell>
                </TableRow>
              ))
            : ""}
        </TableBody>
      </Table>
    </div>
  );
}

CustomAPITable.defaultProps = {
  tableHeaderColor: "gray",
};

CustomAPITable.propTypes = {
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray",
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string),
  tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
};
