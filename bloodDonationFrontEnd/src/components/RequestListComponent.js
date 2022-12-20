import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  Col,
  Row,
} from "reactstrap";
import csc from "country-state-city";
import { statesWithCode } from "../shared/stateWithCode";

function RequestData({ toggleDetailsOpen, isDetailsOpen, data, setIndex }) {
  if (data != null) {
    const tabledata = data.map((request, key) => {
      return (
        <tr>
          <th>{key + 1}</th>
          <td>
            <Button
              color="link"
              onClick={() => {
                setIndex(key);
                toggleDetailsOpen();
              }}
            >
              {request.name}
            </Button>
          </td>
          <td>{request.bloodGroup}</td>
          <td className="d-none d-lg-table-cell">
            {request.city}, {statesWithCode[request.state]}
          </td>
          <td className="d-none d-lg-table-cell">
            {new Intl.DateTimeFormat("en-US", {
              day: "numeric",
              month: "short",
              year: "numeric",
            }).format(new Date(Date.parse(request.requirementDate)))}
          </td>
        </tr>
      );
    });
    return <tbody>{tabledata}</tbody>;
  } else {
    return <tbody></tbody>;
  }
}

function RequestList(props) {
  const [data, setData] = useState([]);
  const [index, setIndex] = useState(-1);
  useEffect(() => {
    let isMounted = true; // note this flag denote mount status

    axios.get("/bloodrequest/getlatestrequests").then((response) => {
      if (response.data.message == "found some documents !!") {
        setData(response.data.List);
      }
    });
    // alert("got it");
  }, []);
  useEffect(() => {
    let isMounted = true; // note this flag denote mount status
    axios.get("/bloodrequest/getlatestrequests").then((response) => {
      if (response.data.message == "found some documents !!") {
        setData(response.data.List);
      }
    });
    // alert("got it");
  }, [props.isLoggedIn]);
  return (
    <div>
      <h4 className="text-center">
        <strong>CURRENT REQUESTS</strong>
      </h4>
      <Table bordered>
        <thead>
          <tr>
            <th>S.No.</th>
            <th>Full Name</th>
            <th>Blood Group</th>
            <th className="d-none d-lg-table-cell">City, State</th>
            <th className="d-none d-lg-table-cell">Date of Requirement</th>
          </tr>
        </thead>
        <RequestData
          toggleDetailsOpen={props.toggleDetailsOpen}
          isDetailsOpen={props.isDetailsOpen}
          data={data}
          setIndex={setIndex}
        />
      </Table>
      {index !== -1 && (
        <Modal
          isOpen={props.isDetailsOpen}
          toggle={() => {
            props.toggleDetailsOpen();
            setIndex(-1);
          }}
        >
          <ModalHeader
            toggle={() => {
              props.toggleDetailsOpen();
              setIndex(-1);
            }}
          >
            Patient Details
          </ModalHeader>
          <ModalBody>
            <Table borderless>
              <tbody>
                <tr>
                  <th>Full Name: </th>
                  <td>{data[index].name}</td>
                </tr>
                <tr>
                  <th>Blood Group: </th>
                  <td>{data[index].bloodGroup}</td>
                </tr>
                <tr>
                  <th>Age: </th>
                  <td>{data[index].age}</td>
                </tr>
                <tr>
                  <th>Date of Requirement: </th>
                  <td>
                    {new Intl.DateTimeFormat("en-US", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    }).format(
                      new Date(Date.parse(data[index].requirementDate))
                    )}
                  </td>
                </tr>
                <tr>
                  <th>Units Required: </th>
                  <td>{data[index].unitsNeeded}</td>
                </tr>
                <tr>
                  <th>Mobile Number: </th>
                  <td>{data[index].mobileNumber}</td>
                </tr>
                <tr>
                  <th>Alternate Mobile Number: </th>
                  <td>{data[index].alternateMobileNumber}</td>
                </tr>
                <tr>
                  <th>Hospital Name: </th>
                  <td>{data[index].hospitalName}</td>
                </tr>
                <tr>
                  <th>Hospital Location: </th>
                  <td>x</td>
                </tr>
                <tr>
                  <th>Patient Address: </th>
                  <td>{data[index].patientAdress}</td>
                </tr>
                <tr>
                  <th>State: </th>
                  <td>{data[index].state}</td>
                </tr>
                <tr>
                  <th>City: </th>
                  <td>{data[index].city}</td>
                </tr>
                <tr>
                  <th>Purpose: </th>
                  <td>{data[index].purpose}</td>
                </tr>
                <tr>
                  <th>Needs Covid-19 recoverd person's plasma?: </th>
                  <td>{data[index].covidPlasma ? "Yes" : "No"}</td>
                </tr>
              </tbody>
            </Table>
          </ModalBody>
        </Modal>
      )}
    </div>
  );
}

export default RequestList;
