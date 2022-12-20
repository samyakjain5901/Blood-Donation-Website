import axios from "axios";
// import { use } from "passport";
import React, { Component } from "react";
import { Table, Button } from "reactstrap";
import Donor from "./DonorComponent";
import { statesWithCode } from "../shared/stateWithCode";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reqs: [],
      isDonorOpen: false,
      details: [],
    };
    this.deleThisReq = this.deleThisReq.bind(this);
    this.toggleDonorOpen = this.toggleDonorOpen.bind(this);
    this.setDetails = this.setDetails.bind(this);
    this.calculateAge = this.calculateAge.bind(this);
  }

  toggleDonorOpen() {
    this.setState({ isDonorOpen: !this.state.isDonorOpen });
  }

  componentDidMount() {
    axios
      .get("/bloodrequest/showexistingrequests", { withCredentials: true })
      .then((response) => {
        //handle the response adequately here
        this.setState({ reqs: [...response.data.List] });
        // console.log(this.state.reqs);
      });
    axios.get("/donors/findme", { withCredentials: true }).then((response) => {
      if (response.data.message === "found the donor")
        this.setState({ details: response.data.Details });
    });
  }
  setDetails(donorDetails) {
    this.setState({ details: donorDetails });
  }
  deleThisReq(code) {
    const obj = { code: code };
    axios.post("/bloodrequest/deletebycode", obj).then((response) => {
      alert(response.data.message);
      axios
        .get("/bloodrequest/showexistingrequests", { withCredentials: true })
        .then((response) => {
          this.setState({ reqs: [...response.data.List] });
        });
    });
  }
  calculateAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  render() {
    return (
      <div>
        <h3 className="text-center">
          <strong>My Profile</strong>
        </h3>
        {this.state.details.name ? (
          <>
            <Table bordered>
              <tbody>
                <tr>
                  <th>Full Name: </th>
                  <td>{this.state.details.name}</td>
                  <th></th>
                  <td></td>
                </tr>
                <tr>
                  <th>Blood Group: </th>
                  <td>{this.state.details.bloodGroup}</td>
                  <th>Age: </th>
                  <td>{this.calculateAge(this.state.details.dob)} years</td>
                </tr>
                <tr>
                  <th>Mobile Number: </th>
                  <td>
                    {this.state.details.mobileNumber} (
                    {!this.state.details.showMobileNumber && "Not"} Visible to
                    others)
                  </td>
                  <th>Alternate Mobile Number: </th>
                  <td>
                    {this.state.details.alternateMobileNumber} (
                    {!this.state.details.showMobileNumber && "Not"} Visible to
                    others)
                  </td>
                </tr>
                <tr>
                  <th>State: </th>
                  <td>{statesWithCode[this.state.details.state]}</td>
                  <th>City: </th>
                  <td>{this.state.details.city}</td>
                </tr>
                <tr>
                  <th>Availability: </th>
                  <td>
                    {this.state.details.availability
                      ? "Available"
                      : "Unavailable"}
                  </td>
                  <th>Covid Recovered: </th>
                  <td>{this.state.details.covidPlasma ? "Yes" : "No"}</td>
                </tr>
              </tbody>
            </Table>
            <Button size="sm" onClick={this.toggleDonorOpen}>
              <span className="fa fa-lg fa-pencil"></span> Modify Details?
            </Button>
          </>
        ) : (
          <h5>
            <strong>You are not a donor yet, become one today !!</strong>
          </h5>
        )}
        <h3 className="text-center">
          <strong>Your Blood Requests</strong>
        </h3>
        <Table striped>
          <thead>
            <tr>
              <th>Req.No.</th>
              <th>Blood Request Code</th>
              <th>Patient Name</th>
              <th>Blood Group</th>
              <th>Date of Request</th>
              <th>Date When Required</th>
              <th>Units of Blood</th>
            </tr>
          </thead>
          {this.state.reqs &&
            this.state.reqs.map((data, key) => {
              return (
                <tr key={key}>
                  <th scope="row">{key + 1}</th>
                  <td>{data.code}</td>
                  <td>{data.name}</td>
                  <td>{data.bloodGroup}</td>
                  <td>
                    {new Intl.DateTimeFormat("en-US", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    }).format(new Date(Date.parse(data.createdAt)))}
                  </td>
                  <td>
                    {new Intl.DateTimeFormat("en-US", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    }).format(new Date(Date.parse(data.requirementDate)))}
                  </td>
                  <td>{data.unitsNeeded}</td>
                  <td
                    onClick={() => {
                      this.deleThisReq(data.code);
                    }}
                  >
                    <span
                      className="fa fa-lg fa-trash"
                      style={{ cursor: "pointer" }}
                    ></span>
                  </td>
                </tr>
              );
            })}
        </Table>
        <br />
        <Donor
          isDonorOpen={this.state.isDonorOpen}
          toggleDonorOpen={this.toggleDonorOpen}
          calledFrom={2}
          setDetails={this.setDetails}
        />
      </div>
    );
  }
}

export default Profile;
