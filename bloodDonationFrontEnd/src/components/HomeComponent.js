import React, { Component } from "react";
import {
  UncontrolledCarousel,
  Button,
  ButtonGroup,
  Row,
  Col,
  Tooltip,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import HomeData from "./HomeDataComponent";
import Donor from "./DonorComponent";
import Find from "./FindComponent";
import Request from "./RequestComponent";
import RequestList from "./RequestListComponent";
import FindForm from "./FindDonorFormComponent";
import axios from "axios";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDonorOpen: false,
      isFindOpen: false,
      isReqOpen: false,
      isDetailsOpen: false,
      isAlreadyDonor: false,
      isTooltipReqOpen: false,
      isTooltipDonOpen: false,
      isListOpen: false,
      screenWidth: document.documentElement.clientWidth,
    };
    this.toggleDonorOpen = this.toggleDonorOpen.bind(this);
    this.toggleReqOpen = this.toggleReqOpen.bind(this);
    this.toggleFindOpen = this.toggleFindOpen.bind(this);
    this.toggleDetailsOpen = this.toggleDetailsOpen.bind(this);
    this.toggleTooltipReqOpen = this.toggleTooltipReqOpen.bind(this);
    this.toggleTooltipDonOpen = this.toggleTooltipDonOpen.bind(this);
    this.toggleListOpen = this.toggleListOpen.bind(this);
    this.toggleScreenWidth = this.toggleScreenWidth.bind(this);
  }

  toggleScreenWidth() {
    this.setState({ screenWidth: document.documentElement.clientWidth });
  }

  componentDidMount() {
    window.addEventListener("resize", this.toggleScreenWidth);
    window.addEventListener("resize", () => {
      if (document.documentElement.clientWidth < 768) {
        document.querySelectorAll(".media-object").forEach((img) => {
          img.style.width = "40%";
          img.classList.add("text-center");
        });
      } else if (
        document.documentElement.clientWidth > 767 &&
        document.documentElement.clientWidth < 992
      ) {
        document
          .querySelectorAll(".media-object")
          .forEach((img) => (img.style.width = "80%"));
      } else {
        document
          .querySelectorAll(".media-object")
          .forEach((img) => (img.style.width = "70%"));
      }
    });
    axios.get("/donors/findme", { withCredentials: true }).then((response) => {
      if (response.data.message === "found the donor") {
        this.setState({
          isAlreadyDonor: true,
        });
      }
    });
  }

  toggleTooltipDonOpen() {
    this.setState({ isTooltipDonOpen: !this.state.isTooltipDonOpen });
  }

  toggleTooltipReqOpen() {
    this.setState({ isTooltipReqOpen: !this.state.isTooltipReqOpen });
  }

  toggleDetailsOpen() {
    this.setState({ isDetailsOpen: !this.state.isDetailsOpen });
  }

  toggleDonorOpen() {
    this.setState({ isDonorOpen: !this.state.isDonorOpen });
  }

  toggleReqOpen() {
    this.setState({ isReqOpen: !this.state.isReqOpen });
  }

  toggleFindOpen() {
    this.setState({ isFindOpen: !this.state.isFindOpen });
  }

  toggleListOpen() {
    // event.preventDefault();
    if (this.state.isFindOpen) this.toggleFindOpen();
    this.setState({ isListOpen: !this.state.isListOpen });
  }

  render() {
    return (
      <>
        {this.state.screenWidth < 769 ? (
          <>
            <div className="text-center page-header" filter-color="blue">
              <div className="home-header-text-1">
                <h2>
                  BLOOD<span style={{ color: "red" }}>FOR</span>YOU
                </h2>
                <p>" Excuses never save a life, Blood donation does. "</p>
                <p>
                  " Sometimes money cannot save life but donated blood can! "
                </p>
              </div>
              <ButtonGroup vertical>
                <Button
                  onClick={this.toggleFindOpen}
                  id="findButton"
                  className="col-12"
                  style={{ margin: "10px " }}
                >
                  Find a Donor
                </Button>{" "}
                <Button
                  style={
                    (!this.props.isLoggedIn || this.state.isAlreadyDonor
                      ? { cursor: "default" }
                      : { cursor: "pointer" },
                    { margin: "10px" })
                  }
                  id="donorButton"
                  className="col-12"
                  onClick={() => {
                    if (this.props.isLoggedIn && !this.state.isAlreadyDonor) {
                      this.toggleDonorOpen();
                    }
                  }}
                >
                  Become a donor
                </Button>{" "}
                {!this.props.isLoggedIn && (
                  <Tooltip
                    placement="top"
                    isOpen={this.state.isTooltipDonOpen}
                    target="donorButton"
                    toggle={this.toggleTooltipDonOpen}
                  >
                    You need to Login to become a Donor
                  </Tooltip>
                )}
                {this.props.isLoggedIn && this.state.isAlreadyDonor && (
                  <Tooltip
                    placement="top"
                    isOpen={this.state.isTooltipDonOpen}
                    target="donorButton"
                    toggle={this.toggleTooltipDonOpen}
                  >
                    You are already a Donor
                  </Tooltip>
                )}
                <Button
                  style={
                    (!this.props.isLoggedIn
                      ? { cursor: "default" }
                      : { cursor: "pointer" },
                    { margin: "10px" })
                  }
                  id="requestButton"
                  className="col-12"
                  onClick={() => {
                    if (this.props.isLoggedIn) this.toggleReqOpen();
                  }}
                >
                  Request for Blood
                </Button>
                {!this.props.isLoggedIn && (
                  <Tooltip
                    placement="top"
                    isOpen={this.state.isTooltipReqOpen}
                    target="requestButton"
                    toggle={this.toggleTooltipReqOpen}
                  >
                    You need to Login to Request for Blood
                  </Tooltip>
                )}
              </ButtonGroup>
            </div>
            <Container>
              <Row className="home-table">
                <RequestList
                  isDetailsOpen={this.state.isDetailsOpen}
                  toggleDetailsOpen={this.toggleDetailsOpen}
                  isLoggedIn={this.props.isLoggedIn}
                />
              </Row>
            </Container>
            <br />
          </>
        ) : (
          <>
            <div className="page-header clear-filter" filter-color="blue">
              <div
                className="page-header-image"
                style={{
                  backgroundImage: "url(assets/bloodDonation.jpg)",
                  width: "65%",
                  right: "0px",
                }}
              ></div>
              <div className="home-header-text-2">
                <h2>
                  BLOOD<span style={{ color: "red" }}>FOR</span>YOU
                </h2>
                <p>" Excuses never save a life, Blood donation does. "</p>
                <p>
                  " Sometimes money cannot save life but donated blood can! "
                </p>
              </div>
              <ButtonGroup vertical>
                <Button
                  style={
                    (!this.props.isLoggedIn || this.state.isAlreadyDonor
                      ? { cursor: "default" }
                      : { cursor: "pointer" },
                    { margin: "10px 40px" })
                  }
                  id="donorButton"
                  className="col-12"
                  onClick={() => {
                    if (this.props.isLoggedIn && !this.state.isAlreadyDonor) {
                      this.toggleDonorOpen();
                    }
                  }}
                >
                  Become a donor
                </Button>{" "}
                {!this.props.isLoggedIn && (
                  <Tooltip
                    placement="top"
                    isOpen={this.state.isTooltipDonOpen}
                    target="donorButton"
                    toggle={this.toggleTooltipDonOpen}
                  >
                    You need to Login to become a Donor
                  </Tooltip>
                )}
                {this.props.isLoggedIn && this.state.isAlreadyDonor && (
                  <Tooltip
                    placement="top"
                    isOpen={this.state.isTooltipDonOpen}
                    target="donorButton"
                    toggle={this.toggleTooltipDonOpen}
                  >
                    You are already a Donor
                  </Tooltip>
                )}
                <Button
                  style={
                    (!this.props.isLoggedIn
                      ? { cursor: "default" }
                      : { cursor: "pointer" },
                    { margin: "10px 40px" })
                  }
                  id="requestButton"
                  className="col-12"
                  onClick={() => {
                    if (this.props.isLoggedIn) this.toggleReqOpen();
                  }}
                >
                  Request for Blood
                </Button>
                {!this.props.isLoggedIn && (
                  <Tooltip
                    placement="top"
                    isOpen={this.state.isTooltipReqOpen}
                    target="requestButton"
                    toggle={this.toggleTooltipReqOpen}
                  >
                    You need to Login to Request for Blood
                  </Tooltip>
                )}
              </ButtonGroup>
            </div>
            <br />
            <Container>
              <Row style={{ marginLeft: "25px" }}>
                <div className="home-form col-sm-5 col-md-4">
                  <h3 className="text-center">Find a Blood Donor</h3>
                  <FindForm
                    isListOpen={this.state.isListOpen}
                    toggleListOpen={this.toggleListOpen}
                  />
                </div>
                <div className="home-table col-sm-6 col-md-7">
                  <RequestList
                    isDetailsOpen={this.state.isDetailsOpen}
                    toggleDetailsOpen={this.toggleDetailsOpen}
                    isLoggedIn={this.props.isLoggedIn}
                  />
                </div>
              </Row>
              <br />
            </Container>
            <br />
          </>
        )}
        <HomeData />
        <Donor
          isDonorOpen={this.state.isDonorOpen}
          toggleDonorOpen={this.toggleDonorOpen}
          calledFrom={1}
        />
        <Find
          isFindOpen={this.state.isFindOpen}
          toggleFindOpen={this.toggleFindOpen}
          isListOpen={this.state.isListOpen}
          toggleListOpen={this.toggleListOpen}
        />
        <Request
          isReqOpen={this.state.isReqOpen}
          toggleReqOpen={this.toggleReqOpen}
        />
      </>
    );
  }
}

export default Home;
