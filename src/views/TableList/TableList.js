import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { departments } from "../../assets/data/HR.js";
import CustomAPITable from "components/Table/APITable.js";
import axios from "axios";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
};

const useStyles = makeStyles(styles);

export default function TableList() {
  const classes = useStyles();
  const [department, setDepartment] = useState("hr");
  const api = `https://randomuser.me/api/?seed=${department}&results=10`;
  const [apiData, setApiData] = useState([]);
  useEffect(() => {
    if (localStorage.getItem("departmentname")) {
      setDepartment(localStorage.getItem("departmentname"));
      console.log(localStorage.getItem("departmentname"));
    }
  });
  useEffect(() => {
    if (localStorage.getItem("departmentname")) {
      setDepartment(localStorage.getItem("departmentname"));
      console.log(localStorage.getItem("departmentname"));
    }
    axios.get(api).then((res) => {
      console.log(res);
      console.log(res.data.results);
      setApiData(res.data.results);
    });
  }, [department]);
  const selectedData = (e) => {
    console.log(e);
    setDepartment(e);
  };
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Simple Table</h4>
            <p className={classes.cardCategoryWhite}>
              Here is a subtitle for this table
            </p>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["Select", "ID", "Department", "Location", "Manager"]}
              tableData={departments}
              sendSelectedDepartmentName={selectedData}
            />
          </CardBody>
        </Card>
      </GridItem>
      <GridItem xs={12} sm={12} md={12}>
        <Card plain>
          <CardHeader plain color="primary">
            <h4 className={classes.cardTitleWhite}>
              Table on Plain Background
            </h4>
            <p className={classes.cardCategoryWhite}>
              Here is a subtitle for this table
            </p>
          </CardHeader>
          <CardBody>
            <CustomAPITable
              tableHeaderColor="primary"
              tableHead={["Gender", "Name", "Location", "Email", "Login"]}
              tableData={apiData.length > 1 ? apiData : []}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
