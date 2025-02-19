import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Checkbox from "@material-ui/core/Checkbox";
// core components
import styles from "assets/jss/material-dashboard-react/components/tableStyle.js";
import { TableBody } from "@material-ui/core";
import "./Table.css";
import { checkboxNumberHandler } from "redux/actions/actions";
const useStyles = makeStyles(styles);
import { useDispatch } from "react-redux";
import { departmentNameHandler } from "redux/actions/actions";

export default function CustomTable(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { tableHeaderColor } = props;
  // eslint-disable-next-line react/prop-types
  const { tableHead, tableData, sendSelectedDepartmentName } = props;
  console.log(tableData);

  useEffect(() => {
    if (localStorage.getItem("checkboxnumber")) {
      console.log(parseInt(localStorage.getItem("checkboxnumber")));
      const element = document.getElementsByClassName("MuiTableRow-root")[
        parseInt(localStorage.getItem("checkboxnumber")) + 1
      ];
      element.classList.add("highlight-tr");
    }
  });

  const clickHandler = (e, num) => {
    console.log(e);
    console.log(num);
    const element = document.getElementsByClassName("MuiTableRow-root")[e + 1];
    console.log(element);
    dispatch(checkboxNumberHandler(e));
    localStorage.setItem("checkboxnumber", e);
    localStorage.setItem("departmentname", tableData[e].department);

    dispatch(departmentNameHandler(tableData[e].department));
    element.classList.toggle("highlight-tr");
    console.log(tableData[e].department);
    sendSelectedDepartmentName(tableData[e].department);
  };

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
          {tableData.map((data, num) => (
            <TableRow key={num}>
              <TableCell>
                <Checkbox
                  onClick={(nums) => clickHandler(num, nums)}
                  inputProps={{ "aria-label": "primary checkbox" }}
                />
              </TableCell>

              <TableCell>{data.id}</TableCell>
              <TableCell>{data.department}</TableCell>
              <TableCell>{data.location}</TableCell>
              <TableCell>
                {data.manager.name.first} {data.manager.name.last}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

CustomTable.defaultProps = {
  tableHeaderColor: "gray",
};

CustomTable.propTypes = {
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
