import React, { Component, createRef } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Nav,
  NavItem,
  Collapse,
  Button,
  UncontrolledButtonDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Container,
  TabContent,
  TabPane,
  NavLink as TabLink,
  Card,
  CardTitle,
  CardText,
  Row,
  Col,
  Modal,
} from "reactstrap";
import { NavLink, Link } from "react-router-dom";
import SignIn from "./SignInComponent";
import SignUp from "./SignUpComponent";
import axios from "axios";

class Header extends Component {
  constructor(props) {
    super(props);
    this.prevUrl = createRef(window.location.pathname.slice(1));
    this.state = {
      isNavOpen: false,
      isModalOpen: false,
      name: "",
      picUrl: "",
      navbarColor: "navbar-transparent",
      activeTab: "1",
      navTxtColor: "black",
    };
    this.toggleNav = this.toggleNav.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleNav = this.handleNav.bind(this);
    this.updateNavbar = this.updateNavbar.bind(this);
    this.setActiveTab = this.setActiveTab.bind(this);
    // this.setName = this.setName.bind(this);
  }

  updateNavbar() {
    if (window.pageYOffset > 49) {
      this.setState({ navbarColor: "" });
    } else if (window.pageYOffset < 50) {
      this.setState({
        navbarColor: this.prevUrl.current === 'home' ? "navbar-transparent": "#f2f2f2",
      });
    }
  }

  componentDidMount() {
    window.addEventListener("scroll", this.updateNavbar);
    window.addEventListener('resize', () => {
      if (document.documentElement.clientWidth < 760) {
        this.setState({ navTxtColor: "white" });
      } else {
        this.setState({ navTxtColor: "black", isNavOpen: false });
      }
    });
    setInterval(() => {
      if(this.prevUrl.current !== window.location.pathname.slice(1)){
        this.prevUrl.current = window.location.pathname.slice(1);
        if(this.prevUrl.current === 'home'){
          this.setState({navbarColor: "navbar-transparent"});
        }
        else{
          this.setState({navbarColor: "#f2f2f2"});
        }
      }
    }, 100)
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (!prevProps.isLoggedIn && this.props.isLoggedIn) {
      console.log("called");
      this.getName();
    }
  }

  setActiveTab(tab) {
    this.setState({ activeTab: tab });
  }

  handleNav() {
    if (this.state.isNavOpen) this.toggleNav();
  }

  toggleNav() {
    this.setState({ isNavOpen: !this.state.isNavOpen });
  }

  toggleModal() {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  }

  logMeOut(logeedIntoggle) {
    axios.get("/logout", { withCredentials: true }).then((response) => {
      alert(response.data);
      this.setState({ picUrl: "" });
      logeedIntoggle();
    });
  }

  getName() {
    axios.get("/picurl", { withCredentials: true }).then((response) => {
      if (response.data === "No") {
        axios.get("/getname", { withCredentials: true }).then((response) => {
          console.log("this");
          console.log(this);
          this.setState({ name: response.data });
        });
      } else {
        this.setState({ picUrl: response.data });
      }
    });
  }

  render() {
    // const BRAND_STYLES={
    //   backgroundImage :"url('assets/blood.png')",
    // }
    //errfdsrfger
    // if (this.props.isLoggedIn) {
    //   this.getName();
    // }
    return (
      <>
        <Navbar
          light
          expand="md"
          className={"fixed-top " + this.state.navbarColor}
          style={{ backgroundColor: "#f2f2f2" }}
        >
          <Container>
            <NavbarBrand href="/">
              <img
                src="assets/bloodDrop.png"
                height="50"
                width="30"
                alt="blood_donation"
              />
            </NavbarBrand>

            <Nav
              navbar
              className={this.state.isNavOpen ? "nav-menu active" : "nav-menu"}
            >
              <NavItem>
                <NavLink
                  className="nav-link"
                  to="/home"
                  onClick={this.handleNav}
                  style={{
                    color: this.state.navTxtColor,
                    fontWeight: "bolder",
                  }}
                >
                  <span className="fa fa-home fa-lg"></span> Home
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className="nav-link"
                  to="/aboutus"
                  onClick={this.handleNav}
                  style={{
                    color: this.state.navTxtColor,
                    fontWeight: "bolder",
                  }}
                >
                  <span className="fa fa-info fa-lg"></span> About Us
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className="nav-link"
                  to="/bloodchart"
                  onClick={this.handleNav}
                  style={{
                    color: this.state.navTxtColor,
                    fontWeight: "bolder",
                  }}
                >
                  <span className="fa fa-bar-chart fa-lg"></span> Blood Chart
                </NavLink>
              </NavItem>
              {"  "}
              <NavItem>
                <NavLink
                  className="nav-link"
                  to="/contactus"
                  onClick={this.handleNav}
                  style={{
                    color: this.state.navTxtColor,
                    fontWeight: "bolder",
                  }}
                >
                  <span className="fa fa-address-card fa-lg"></span> Contact Us
                </NavLink>
              </NavItem>
            </Nav>
            <Nav navbar className="ml-auto">
              <NavItem>
                {!this.props.isLoggedIn ? (
                  <>
                    <Button
                      color="warning"
                      className="login-btn"
                      onClick={this.toggleModal}
                    >
                      Become a Member
                    </Button>{" "}
                  </>
                ) : (
                  <UncontrolledButtonDropdown className="button-dropdown" style={{marginRight: '45px'}}>
                    {this.state.picUrl === "" ? (
                      <DropdownToggle
                        style={{
                          backgroundColor: "#b30000",
                          borderRadius: "50%",
                        }}
                      >
                        <strong>
                          {this.state.name.charAt(0).toUpperCase()}
                        </strong>
                      </DropdownToggle>
                    ) : (
                      <DropdownToggle
                        className="imageOfPerson"
                        style={{
                          padding: 0,
                          borderRadius: "50%",
                        }}
                      >
                        <img
                          style={{
                            height: "38px",
                            width: "38px",
                            borderRadius: "50%",
                            objectFit: "contain",
                          }}
                          src={this.state.picUrl}
                          alt="img"
                        />
                      </DropdownToggle>
                    )}
                    <DropdownMenu>
                      <Link style={{ color: "black" }} to="/myprofile">
                        <DropdownItem>
                          <span className="fa fa-user-circle"></span> My Profile
                        </DropdownItem>
                      </Link>
                      <Link to="/home">
                        <DropdownItem
                          onClick={() => {
                            this.logMeOut(this.props.toggleLoggedIn);
                          }}
                        >
                          <span className="fa fa-sign-out"></span> Logout
                        </DropdownItem>
                      </Link>
                    </DropdownMenu>
                  </UncontrolledButtonDropdown>
                )}
              </NavItem>
            </Nav>
            <div className="nav-icon" onClick={this.toggleNav}>
              <i
                className={
                  this.state.isNavOpen
                    ? "fa fa-times fa-sm"
                    : "fa fa-bars fa-sm"
                }
              ></i>
            </div>
          </Container>
        </Navbar>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <Nav tabs horizontal>
            <NavItem className="col-6 text-center">
              <TabLink
                role="button"
                style={{ borderLeftWidth: 0 }}
                active={this.state.activeTab === "1"}
                onClick={() => this.setActiveTab("1")}
              >
                Sign Up
              </TabLink>
            </NavItem>
            <NavItem className="col-6 text-center">
              <TabLink
                role="button"
                style={{ borderRightWidth: 0 }}
                active={this.state.activeTab === "2"}
                onClick={() => this.setActiveTab("2")}
              >
                Sign In
              </TabLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={this.state.activeTab}>
            <TabPane tabId="1">
              <Row>
                <Col sm="12">
                  <SignUp
                    isLoggedIn={this.props.isLoggedIn}
                    toggleLoggedIn={this.props.toggleLoggedIn}
                    getName={() => {
                      this.getName();
                    }}
                  />
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="2">
              <Row>
                <Col sm="12">
                  <SignIn
                    isLoggedIn={this.props.isLoggedIn}
                    toggleLoggedIn={this.props.toggleLoggedIn}
                    getName={() => {
                      this.getName();
                    }}
                  />
                </Col>
              </Row>
            </TabPane>
          </TabContent>
        </Modal>
      </>
    );
  }
}

export default Header;
