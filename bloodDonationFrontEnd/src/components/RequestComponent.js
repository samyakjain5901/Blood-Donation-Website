import React, { Component } from "react";
import axios from "axios";
import {
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  Button,
  FormText,
  FormFeedback,
} from "reactstrap";
import csc from "country-state-city";
var reqData;

class Request extends Component {
  constructor(props) {
    super(props);
    this.state = {
      state: "",
      city: "",
      brcode: "",
      fullname: "",
      bloodgroup: "",
      age: "",
      date: "",
      units: "",
      mobilenum: "",
      mobilenumalt: "",
      hospname: "",
      hosplocation: "",
      patientaddress: "",
      purpose: "",
      recovered: "",
      touched: {
        fullname: false,
        units: false,
        age: false,
        mobilenum: false,
        mobilenumalt: false,
        patientaddress: false,
        purpose: false,
      },
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    // this.toggleListOpen = this.toggleListOpen.bind(this);
    this.postBloodReq = this.postBloodReq.bind(this);
    this.handleBrCode = this.handleBrCode.bind(this);
    this.setInputDate = this.setInputDate.bind(this);
  }

  handleBrCode() {
    const BloodReqCode = {
      code: this.state.brcode,
    };
    axios
      .post("/bloodrequest/getbycode", BloodReqCode, { withCredentials: true })
      .then((response) => {
        console.log(response.data);
        if (response.data.request)
          this.setState({
            state: response.data.request.state,
            city: response.data.request.city,
            brcode: response.data.request.code,
            fullname: response.data.request.name,
            bloodgroup: response.data.request.bloodGroup,
            age: response.data.request.age,
            date: response.data.request.requirementDate,
            units: response.data.request.unitsNeeded,
            mobilenum: response.data.request.mobileNumber,
            mobilenumalt: response.data.request.alternateMobileNumber,
            hospname: response.data.request.hospitalName,
            hosplocation: response.data.request.hospitalLocation,
            patientaddress: response.data.request.patientAdress,
            purpose: response.data.request.purpose,
            recovered: response.data.request.covidPlasma,
          });
        else {
          alert("OOPs No such request could be found");
        }
      });
  }

  postBloodReq() {
    const bloodReq = {
      name: this.state.fullname,
      age: this.state.age,
      bloodGroup: this.state.bloodgroup,
      mobileNumber: this.state.mobilenum,
      alternateMobileNumber: this.state.mobilenumalt,
      state: this.state.state,
      city: this.state.city,
      requirementDate: this.state.date,
      unitsNeeded: this.state.units,
      hospitalName: this.state.hospname,
      patientAdress: this.state.patientaddress,
      purpose: this.state.purpose,
      covidPlasma: this.state.recovered === "yes" ? true : false,
    };
    axios
      .post("/bloodrequest/new", bloodReq, { withCredentials: true })
      .then((response) => {
        //handle the response here properly and adequately
        alert(response.data.message);
        axios
          .post(
            "/bloodrequest/sendemail",
            { code: response.data.newReqCode },
            { withCredentials: true }
          )
          .then((response) => {
            alert(response.data.message);
          });
      });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  }

  handleBlur = (field) => () => {
    this.setState({
      touched: { ...this.state.touched, [field]: true },
    });
  };

  validate(
    fullname,
    units,
    age,
    mobilenum,
    mobilenumalt,
    patientaddress,
    purpose
  ) {
    const errors = {
      fullname: "",
      units: "",
      age: "",
      mobilenum: "",
      mobilenumalt: "",
      patientaddress: "",
      purpose: "",
    };

    if (this.state.touched.fullname && fullname.length < 3)
      errors.fullname = "Name should be >= 3 characters";
    else if (this.state.touched.fullname && fullname.length > 20)
      errors.fullname = "Name should be <= 20 characters";

    if (this.state.touched.units && units <= 0)
      errors.units = "Units of Blood Required must be greater than 0";

    if (this.state.touched.age && age <= 0) errors.age = "Invalid Age";

    if (this.state.touched.mobilenum) {
      if (
        (mobilenum.length === 11 && mobilenum[0] !== "0") ||
        mobilenum.length !== 10
      ) {
        errors.mobilenum = "Invalid Mobile Number";
      }
    }

    if (this.state.touched.mobilenumalt) {
      if (
        (mobilenumalt.length === 11 && mobilenumalt[0] !== "0") ||
        mobilenumalt.length !== 10
      ) {
        errors.mobilenumalt = "Invalid Mobile Number";
      } else if (mobilenum == mobilenumalt) {
        errors.mobilenumalt = "Mobile Numbers should be different";
      }
    }

    if (this.state.touched.patientaddress && patientaddress.length < 15)
      errors.patientaddress = "Address should be atleast 15 characters long";

    if (this.state.touched.purpose && purpose.length < 15)
      errors.purpose = "Purpose of need should be atleast 15 characters long";

    return errors;
  }

  // function sendBloodRequest(){
  //   const data;
  // axios.post("http://localhost:3000/bloodrequest/new",data)
  // .then(response=>{
  // //analyse the response and do things accordingly
  // })
  // }

  //Form after submitting, details still there

  setInputDate(me) {
    if (me === "") return null;
    else {
      let hoy = new Date(me),
        d = hoy.getDate(),
        m = hoy.getMonth() + 1,
        y = hoy.getFullYear(),
        data;

      if (d < 10) {
        d = "0" + d;
      }
      if (m < 10) {
        m = "0" + m;
      }

      data = y + "-" + m + "-" + d;
      console.log(data);
      return data;
    }
  }

  render() {
    const states = csc.getStatesOfCountry("IN").map((state, key) => (
      <option key={key} value={state.isoCode}>
        {state.name}
      </option>
    ));
    const cities = csc
      .getCitiesOfState("IN", `${this.state.state}`)
      .map((city, key) => <option key={key}>{city.name}</option>);
    const errors = this.validate(
      this.state.fullname,
      this.state.units,
      this.state.age,
      this.state.mobilenum,
      this.state.mobilenumalt,
      this.state.patientaddress,
      this.state.purpose
    );
    return (
      <>
        <Modal isOpen={this.props.isReqOpen} toggle={this.props.toggleReqOpen}>
          <ModalHeader toggle={this.props.toggleReqOpen}>
            Blood Request Form
          </ModalHeader>
          <ModalBody>
            <Form
              onSubmit={(event) => {
                event.preventDefault();
                this.handleBrCode();
              }}
            >
              <FormText color="primary" style={{ fontSize: "0.8rem" }}>
                <strong>
                  If you have previously posted a blood request, and want to
                  update it, then please enter your blood request code. Note
                  that this will delete the previous request and update it with
                  new data
                </strong>
              </FormText>
              <br />
              <FormGroup row>
                <Label htmlFor="brcode" md={5}>
                  Blood Request Code :
                </Label>
                <Col md={5}>
                  <Input
                    required
                    type="text"
                    id="brcode"
                    name="brcode"
                    value={this.state.brcode}
                    onChange={this.handleInputChange}
                  />
                </Col>
                <Button type="submit" color="info" size="sm">
                  Submit
                </Button>
              </FormGroup>
            </Form>
            <hr />
            <Form
              onSubmit={(event) => {
                event.preventDefault();
                this.postBloodReq();
                this.props.toggleReqOpen();
              }}
            >
              <FormGroup row>
                <Label htmlFor="fullname" md={6}>
                  Patient Full Name :
                </Label>
                <Col md={6}>
                  <Input
                    required
                    type="text"
                    id="fullname"
                    name="fullname"
                    value={this.state.fullname}
                    valid={
                      errors.fullname === "" && this.state.touched.fullname
                    }
                    invalid={errors.fullname !== ""}
                    onBlur={this.handleBlur("fullname")}
                    onChange={this.handleInputChange}
                  />
                  <FormFeedback>{errors.fullname}</FormFeedback>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label htmlFor="bloodgroup" md={6}>
                  Patient Blood Group :
                </Label>
                <Col md={4}>
                  <Input
                    required
                    type="select"
                    id="bloodgroup"
                    name="bloodgroup"
                    value={this.state.bloodgroup}
                    onChange={this.handleInputChange}
                  >
                    <option></option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                  </Input>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label htmlFor="age" md={6}>
                  Patient Age :
                </Label>
                <Col md={3}>
                  <Input
                    required
                    type="number"
                    id="age"
                    name="age"
                    value={this.state.age}
                    valid={errors.age === "" && this.state.touched.age}
                    invalid={errors.age !== ""}
                    onBlur={this.handleBlur("age")}
                    onChange={this.handleInputChange}
                  />
                  <FormFeedback>{errors.units}</FormFeedback>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label htmlFor="date" md={6}>
                  When you need Blood?
                </Label>
                <Col md={6}>
                  <Input
                    required
                    type="date"
                    id="date"
                    name="date"
                    defaultValue={this.setInputDate(this.state.date)}
                    onChange={this.handleInputChange}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label htmlFor="units" md={6}>
                  How many units you need?
                </Label>
                <Col md={5}>
                  <Input
                    required
                    type="number"
                    id="units"
                    name="units"
                    value={this.state.units}
                    valid={errors.units === "" && this.state.touched.units}
                    invalid={errors.units !== ""}
                    onBlur={this.handleBlur("units")}
                    onChange={this.handleInputChange}
                  />
                  <FormFeedback>{errors.units}</FormFeedback>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label htmlFor="mobilenum" md={6}>
                  Mobile Number :
                </Label>
                <Col md={6}>
                  <Input
                    required
                    type="number"
                    id="mobilenum"
                    name="mobilenum"
                    value={this.state.mobilenum}
                    valid={
                      errors.mobilenum === "" && this.state.touched.mobilenum
                    }
                    invalid={errors.mobilenum !== ""}
                    onBlur={this.handleBlur("mobilenum")}
                    onChange={this.handleInputChange}
                  />
                  <FormFeedback>{errors.mobilenum}</FormFeedback>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label htmlFor="mobilenumalt" md={6}>
                  Alternate Mobile Number :
                </Label>
                <Col md={6}>
                  <Input
                    required
                    type="number"
                    id="mobilenumalt"
                    name="mobilenumalt"
                    value={this.state.mobilenumalt}
                    valid={
                      errors.mobilenumalt === "" &&
                      this.state.touched.mobilenumalt
                    }
                    invalid={errors.mobilenumalt !== ""}
                    onBlur={this.handleBlur("mobilenumalt")}
                    onChange={this.handleInputChange}
                  />
                  <FormFeedback>{errors.mobilenumalt}</FormFeedback>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label htmlFor="hospname" md={6}>
                  Hospital Name :
                </Label>
                <Col md={6}>
                  <Input
                    required
                    type="text"
                    id="hospname"
                    name="hospname"
                    value={this.state.hospname}
                    onChange={this.handleInputChange}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label htmlFor="hosplocation" md={6}>
                  Location :
                </Label>
                <Col md={6}>
                  <Input
                    required
                    type="text"
                    id="hosplocation"
                    name="hosplocation"
                    value={this.state.hosplocation}
                    onChange={this.handleInputChange}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label htmlFor="patientaddress" md={6}>
                  Patient Address :
                </Label>
                <Col md={6}>
                  <Input
                    required
                    type="textarea"
                    rows="4"
                    id="patientaddress"
                    name="patientaddress"
                    value={this.state.patientaddress}
                    valid={
                      errors.patientaddress === "" &&
                      this.state.touched.patientaddress
                    }
                    invalid={errors.patientaddress !== ""}
                    onBlur={this.handleBlur("patientaddress")}
                    onChange={this.handleInputChange}
                  />
                  <FormFeedback>{errors.patientaddress}</FormFeedback>
                </Col>
              </FormGroup>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label htmlFor="state">State</Label>
                    <Input
                      required
                      type="select"
                      id="state"
                      name="state"
                      value={this.state.state}
                      onChange={this.handleInputChange}
                    >
                      <option></option>
                      {states}
                    </Input>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label htmlFor="city">City</Label>
                    <Input
                      required
                      type="select"
                      id="city"
                      name="city"
                      value={this.state.city}
                      onChange={this.handleInputChange}
                    >
                      <option></option>
                      {cities}
                    </Input>
                  </FormGroup>
                </Col>
              </Row>
              <FormGroup row>
                <Label htmlFor="purpose" md={6}>
                  Purpose :
                </Label>
                <Col md={6}>
                  <Input
                    required
                    type="textarea"
                    rows="4"
                    id="purpose"
                    name="purpose"
                    value={this.state.purpose}
                    valid={errors.purpose === "" && this.state.touched.purpose}
                    invalid={errors.purpose !== ""}
                    onBlur={this.handleBlur("purpose")}
                    onChange={this.handleInputChange}
                  />
                  <FormFeedback>{errors.purpose}</FormFeedback>
                </Col>
              </FormGroup>
              <Row form>
                <Col md={8}>
                  <p>Covid-19 recovered person's Plasma?</p>
                </Col>
                <Col md={2}>
                  <FormGroup check>
                    <Label check>
                      <Input
                        required
                        type="radio"
                        name="recovered"
                        value="yes"
                        onChange={this.handleInputChange}
                        checked={this.state.recovered === "yes" ? true : false}
                      />
                      Yes
                    </Label>
                  </FormGroup>
                </Col>
                <Col md={2}>
                  <FormGroup check>
                    <Label check>
                      <Input
                        type="radio"
                        name="recovered"
                        value="no"
                        onChange={this.handleInputChange}
                        checked={this.state.recovered === "yes" ? false : true}
                      />
                      No
                    </Label>
                  </FormGroup>
                </Col>
              </Row>
              <Button type="submit" color="success" block>
                Post Blood Request
              </Button>
            </Form>
          </ModalBody>
        </Modal>
      </>
    );
  }
}

export default Request;
