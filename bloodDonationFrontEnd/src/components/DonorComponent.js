import React, { Component } from "react";
import {
  Col,
  Form,
  FormGroup,
  FormText,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  Button,
  FormFeedback,
} from "reactstrap";
import csc from "country-state-city";
import axios from "axios";

class Donor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: "",
      bloodgroup: "",
      mobilenum: "",
      mobilenumalt: "",
      state: "",
      city: "",
      dob: "",
      willdonate: "",
      recovered: "",
      authorize: "",
      touched: {
        fullname: false,
        mobilenum: false,
        mobilenumalt: false,
      },
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.checkServerFordata = this.checkServerFordata.bind(this);
    this.setInputDate = this.setInputDate.bind(this);
  }

  calculate_age(dob) {
    const diff_ms = Date.now() - new Date(Date.parse(dob)).getTime();
    const age_dt = new Date(diff_ms);

    return Math.abs(age_dt.getUTCFullYear() - 1970);
  }

  handleBlur = (field) => () => {
    this.setState({
      touched: { ...this.state.touched, [field]: true },
    });
  };

  validate(fullname, mobilenum, mobilenumalt, dob) {
    const errors = {
      fullname: "",
      mobilenum: "",
      mobilenumalt: "",
      dob: "",
    };

    if (this.state.touched.fullname && fullname.length < 3)
      errors.fullname = "Name should have atleast 3 characters";
    else if (this.state.touched.fullname && fullname.length > 20)
      errors.fullname = "Name should have atmost 20 characters";

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

    if (this.calculate_age(dob) < 18)
      errors.dob = "You should be at least 18 yrs old to donate blood";

    return errors;
  }

  handleSubmit(event) {
    event.preventDefault();
    const donorDetails = {
      name: this.state.fullname,
      bloodGroup: this.state.bloodgroup,
      mobileNumber: this.state.mobilenum,
      alternateMobileNumber: this.state.mobilenumalt,
      state: this.state.state,
      city: this.state.city,
      dob: this.state.dob,
      availability: this.state.willdonate === "available" ? true : false,
      covidPlasma: this.state.recovered === "yes" ? true : false,
      showMobileNumber: this.state.authorize === "yes" ? true : false,
    };
    if (this.props.calledFrom == 1) {
      axios
        .post("/donors/become", donorDetails, { withCredentials: true })
        .then((response) => {
          alert(response.data.message);
        });
    } else if (this.props.calledFrom == 2) {
      axios
        .post("/donors/modifydetails", donorDetails, { withCredentials: true })
        .then((response) => {
          this.props.setDetails(donorDetails);
          alert(response.data.message);
        });
    }
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }
  componentDidMount() {
    this.checkServerFordata();
  }

  checkServerFordata() {
    if (this.props.calledFrom == 2) {
      axios
        .get("/donors/findme", { withCredentials: true })
        .then((response) => {
          if (response.data.message === "found the donor") {
            console.log(response.data.Details.name);
            this.setState({
              fullname: response.data.Details.name,
              bloodgroup: response.data.Details.bloodGroup,
              mobilenum: response.data.Details.mobileNumber,
              mobilenumalt: response.data.Details.alternateMobileNumber,
              state: response.data.Details.state,
              city: response.data.Details.city,
              willdonate: response.data.Details.availability
                ? "available"
                : "unavailable",
              recovered: response.data.Details.covidPlasma ? "yes" : "no",
              authorize: response.data.Details.showMobileNumber ? "yes" : "no",
              dob: response.data.Details.dob,
            });
          }
        });
    }
  }
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
      .map((city, key) => (
        <option key={key} value={city.name}>
          {city.name}
        </option>
      ));
    const errors = this.validate(
      this.state.fullname,
      this.state.mobilenum,
      this.state.mobilenumalt,
      this.state.dob
    );
    return (
      <div>
        <Modal
          isOpen={this.props.isDonorOpen}
          toggle={() => {
            this.checkServerFordata();
            this.props.toggleDonorOpen();
          }}
        >
          <ModalHeader
            toggle={() => {
              this.checkServerFordata();
              this.props.toggleDonorOpen();
            }}
          >
            Donor Registration Form
          </ModalHeader>
          <ModalBody>
            <FormText className="text-center" color="info">
              <strong>
                Please fill the following information to register as voluntary
                blood donor. If you are unavailable to donate blood for some
                time, please mark unavailable in your profile, and don't forget
                to mark available once again. Also please update your
                profile/information if in case you relocate in future.
              </strong>
            </FormText>
            <br />
            <Form
              onSubmit={(event) => {
                this.handleSubmit(event);
                this.props.toggleDonorOpen();
              }}
            >
              <FormGroup row>
                <Label htmlFor="fullname" md={6}>
                  Full Name :
                </Label>
                <Col md={6}>
                  <Input
                    required
                    type="text"
                    id="fullname"
                    name="fullname"
                    placeholder="Full Name"
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
                  Blood Group :
                </Label>
                <Col md={4}>
                  <Input
                    required
                    type="select"
                    id="bloodgroup"
                    name="bloodgroup"
                    onChange={this.handleInputChange}
                    value={this.state.bloodgroup}
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
                <Label htmlFor="dob" md={6}>
                  Date Of Birth
                </Label>
                <Col md={6}>
                  <Input
                    required
                    type="date"
                    id="dob"
                    name="dob"
                    valid={errors.dob === "" && this.state.touched.dob}
                    invalid={errors.dob !== ""}
                    onChange={this.handleInputChange}
                    defaultValue={this.setInputDate(this.state.dob)}
                  />
                  <FormFeedback>{errors.dob}</FormFeedback>
                </Col>
              </FormGroup>
              <h4
                className="text-center"
                style={{ backgroundColor: "#ccccb3" }}
              >
                Contact Information
              </h4>
              <FormGroup row>
                <Label htmlFor="mobilenum" md={6}>
                  Mobile Number
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
                  Alternate Mobile Number
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
                <Label htmlFor="willdonate" md={6}>
                  Please confirm your availability to donate blood
                </Label>
                <Col md={6}>
                  <Input
                    required
                    type="select"
                    id="willdonate"
                    name="willdonate"
                    value={this.state.willdonate}
                    onChange={this.handleInputChange}
                  >
                    <option value="available">Available</option>
                    <option value="unavailable">Not Available</option>
                  </Input>
                </Col>
              </FormGroup>
              <Row form>
                <p>Are you a Covid-19 recovered warrior?</p>
                <Col md={2}>
                  <FormGroup check>
                    <Label check>
                      <Input
                        required
                        type="radio"
                        value="yes"
                        name="recovered"
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
                        value="no"
                        name="recovered"
                        onChange={this.handleInputChange}
                        checked={this.state.recovered === "no" ? true : false}
                      />
                      No
                    </Label>
                  </FormGroup>
                </Col>
              </Row>
              <br />
              <FormText color="info" style={{ fontSize: "16px" }}>
                <strong>Choose any one of the following options:</strong>
              </FormText>
              <br />
              <FormGroup check>
                <Label check>
                  <Input
                    required
                    type="radio"
                    name="authorize"
                    value="yes"
                    onChange={this.handleInputChange}
                    checked={this.state.authorize === "yes" ? true : false}
                  />{" "}
                  I authorize this website to display my name, telephone number
                  and other details, so that the needy could contact me, as and
                  when there is an emergency.
                </Label>
              </FormGroup>
              <br />
              <FormGroup check>
                <Label check>
                  <Input
                    type="radio"
                    name="authorize"
                    value="no"
                    onChange={this.handleInputChange}
                    checked={this.state.authorize === "no" ? true : false}
                  />{" "}
                  I authorize this website to display my name, but not my
                  telephone number and other details, send me the details of the
                  reciever and i will be happy to contact them
                </Label>
              </FormGroup>
              <br />
              <Button type="submit" color="success" block>
                Submit
              </Button>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default Donor;
