import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { Radio } from "@material-ui/core";
import { Avatar } from "@material-ui/core";

//Importing the Data Fetching function to gather employee data using provided API
import { employeeDataFetcher } from "./DataFetcher.js";
//Importing function to add "checked" field to HR Data objects.
import { addRadioChecked } from "./AddRadioChecked.js";
//Importing function to reset "checked" field to be able to select only one radio button at a time.
import { resetRadioCheckedField } from "./ResetRadioCheckedField.js";
//Importing HR.json
import data from "../../assets/data/HR.json";

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
  const [departments, setDepartments] = useState([]);
  const [employeeData, setemployeeData] = useState([]);

  useEffect(async () => {
    // Check if departments exists in local storage, if not load it in from the HR.json file.
    if ("selectedDepartment" in localStorage) {
      //Load users previos selection from Local Storage.
      setDepartments(JSON.parse(localStorage.getItem("departments")));
      const empData = await employeeDataFetcher(
        localStorage.getItem("selectedDepartment")
      );
      setemployeeData(empData);
    } else {
      //If no previous user selection load from HR.json.
      setDepartments(addRadioChecked(data));
    }
  }, []);

  //Radio button selection handler.
  const handleRadio = async (id) => {
    let tempDepartmentData = resetRadioCheckedField(departments);
    //Invert the "checked" field of the selected radio button to allow for checking or unchecking
    tempDepartmentData[id].checked = !tempDepartmentData[id].checked;
    // Update the selected department in local storage
    localStorage.setItem(
      "selectedDepartment",
      tempDepartmentData[id].department.toString()
    );
    setDepartments(tempDepartmentData);
    //Store selected radio button in local storage.
    localStorage.setItem("departments", JSON.stringify(tempDepartmentData));
    const empData = await employeeDataFetcher(
      tempDepartmentData[id].department
    );
    setemployeeData(empData);
  };

  const classes = useStyles();
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Departments</h4>
              <p className={classes.cardCategoryWhite}>List of Departments</p>
            </CardHeader>
            <CardBody>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell className={classes.tableCellClasses}>
                      Select Department
                    </TableCell>
                    <TableCell className={classes.tableCellClasses}>
                      Department
                    </TableCell>
                    <TableCell className={classes.tableCellClasses}>
                      Department Manager First Name
                    </TableCell>
                    <TableCell className={classes.tableCellClasses}>
                      Department Manager Last Name
                    </TableCell>
                    <TableCell className={classes.tableCellClasses}></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {departments.map((data, id) => (
                    <TableRow key={id} className={classes.tableRow}>
                      <TableCell>
                        <Radio
                          onClick={() => handleRadio(id)}
                          checked={data.checked}
                        />
                      </TableCell>
                      <TableCell>{data.department}</TableCell>
                      <TableCell>{data.manager.name.first}</TableCell>
                      <TableCell>{data.manager.name.last}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <Card plain>
            <CardHeader plain color="primary">
              <div>
                <h4 className={classes.cardTitleWhite}>Result Table</h4>
                <p className={classes.cardCategoryWhite}>
                  Result Table for {localStorage.getItem("selectedDepartment")}{" "}
                  Department
                </p>
              </div>
            </CardHeader>
            <CardBody>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell className={classes.tableCellClasses}>
                      Display Picture
                    </TableCell>
                    <TableCell className={classes.tableCellClasses}>
                      Title
                    </TableCell>
                    <TableCell className={classes.tableCellClasses}>
                      First Name
                    </TableCell>
                    <TableCell className={classes.tableCellClasses}>
                      Last Name
                    </TableCell>
                    <TableCell className={classes.tableCellClasses}>
                      Phone
                    </TableCell>
                    <TableCell className={classes.tableCellClasses}>
                      Email
                    </TableCell>
                    <TableCell className={classes.tableCellClasses}>
                      Located In
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {employeeData.map((data, id) => (
                    <TableRow key={id} className={classes.tableRow}>
                      <TableCell>
                        <Avatar key={id} src={data.picture.thumbnail} />
                      </TableCell>
                      <TableCell>{data.name.title}</TableCell>
                      <TableCell>{data.name.first}</TableCell>
                      <TableCell>{data.name.last}</TableCell>
                      <TableCell>{data.phone}</TableCell>
                      <TableCell>{data.email}</TableCell>
                      <TableCell>{data.location.country}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
