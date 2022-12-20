import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Modal,
  FormGroup,
  FormFeedback,
  ModalHeader,
  ModalBody,
  Form,
  Label,
  Input,
  Button,
  Col,
  Row,
  Container,
} from "reactstrap";
import Timer from "react-compound-timer";

function SignUp(props) {
  const [emailid, setEmail] = useState("");
  const [GottenOtp, setGottenOtp] = useState(0);
  const [writtenOtp, setOtp] = useState("");
  const [verfiedOtp, setVerifiedOtp] = useState(false);
  const [passwords, setpassword] = useState({
    password: "",
    confirmPassword: "",
  });
  const [passwordMatches, setpasswordMatches] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [showVerifyBtn, setShowVerifyBtton] = useState(true);
  const [otpMssg, setOtpMssg] = useState("X");
  const [touchedOtp, setTouchedOtp] = useState(false);
  const [buttonmssg, setButtonmssg] = useState("Verify Email");
  // const [isDisabled, setIsDisabled] = useState(true);
  useEffect(() => {
    let isMounted = true; // note this flag denote mount status
    if (
      passwords.password !== "" &&
      passwords.password === passwords.confirmPassword
    ) {
      // alert("yeahh!");
      setpasswordMatches(true);
    } else if (passwords.password !== passwords.confirmPassword) {
      setpasswordMatches(false);
    }
  }, [passwords]);
  useEffect(() => {
    let isMounted = true; // note this flag denote mount status
    resetModal();
    setEmail("");
  }, [props.isLoggedIn]);
  function handleEmailChange(event) {
    if (!verfiedOtp) setEmail(event.target.value);
    else {
      const result = window.confirm(
        "Are you sure you want to change your mail,  doing so will  need reverfication"
      );
      if (result) {
        setGottenOtp(0);
        setOtp("");
        setVerifiedOtp(false);
        setpassword({
          password: "",
          confirmPassword: "",
          match: false,
        });
        setShowOtp(false);
        setOtpMssg("X");
        setShowVerifyBtton(true);
        setEmail(event.target.value);
      } else {
        setEmail((prev) => prev);
      }
    }
  }
  function VerifyEmail() {
    // const obj = {
    //   email: emailid
    // };
    // console.log(obj);
    axios
      .post("/verify/email", {
        email: emailid,
      })
      .then((res) => {
        setGottenOtp(res.data);
        setShowOtp(true);
        // alert(GottenOtp);
      });
  }
  useEffect(() => {
    // if (GottenOtp !== 0) alert(GottenOtp, writtenOtp);
    let isMounted = true; // note this flag denote mount status

    if (GottenOtp !== 0 && writtenOtp == GottenOtp) {
      // alert("yeahh");
      setOtpMssg("ok");
      setTimeout(() => {
        setVerifiedOtp(true);
        setShowOtp(false);
        setButtonmssg("Verify Email");
        setShowVerifyBtton(false);
      }, 1500);
    }
  }, [writtenOtp]);
  function resetModal() {
    if (props.isModalOpenUp) props.toggleModalUp();
    setGottenOtp(0);
    setOtp("");
    setVerifiedOtp(false);
    setButtonmssg("Verify Email");
    setpassword({
      password: "",
      confirmPassword: "",
      match: false,
    });
    setShowOtp(false);
    setOtpMssg("X");
    setShowVerifyBtton(true);
  }
  function handleSuccessGoogle() {
    window.open("/auth/google", "_self");
  }
  function handleSuccessFacebook() {
    window.open("/auth/facebook", "_self");
  }
  function handleSubmitLocal(event) {
    props.toggleModalUp();
    const userInfo = {
      email: emailid,
      password: passwords.password,
    };
    axios
      .post("/register", userInfo, { withCredentials: true })
      .then((response) => {
        if (
          response.data === "A user with this id already exists Login Instead"
        ) {
          alert(
            "A user with the following email id already exists Log in instead"
          );
          resetModal();
        } else if (response.data === "error") {
          alert("OOPs there was an error.Plz try again!");
          resetModal();
        } else {
          props.getName();
          props.toggleLoggedIn();
        }
      });
    // props.toggleLoggedIn();
    event.preventDefault();
  }
  const [otpError, setOtpError] = useState("");
  useEffect(() => {
    console.log(writtenOtp, GottenOtp);
    if (writtenOtp == GottenOtp) {
      setOtpError("");
    } else {
      setOtpError("Invalid OTP");
    }
  }, [writtenOtp]);
  return (
    <Container id="signForm">
      <Form>
        <Row>
          <Col md={{ size: 10, offset: 1 }}>
            <Button block color="danger" onClick={handleSuccessGoogle}>
              <span className="fa fa-lg fa-google"></span> Continue with Google
            </Button>
          </Col>{" "}
        </Row>
        <hr />
        <p className="text-center">
          <strong>OR</strong>
          <br /> Use your email address
        </p>
        <FormGroup>
          <Label htmlFor="email">Email ID</Label>
          <Row>
            <Col md={8}>
              <div className="input-icons">
                <i className="fa fa-envelope-square fa-lg icon"></i>
                <Input
                  className="input-field"
                  type="email"
                  value={emailid}
                  onChange={handleEmailChange}
                  id="email"
                  name="email"
                />
              </div>
            </Col>
            <Col md={4}>
              {showVerifyBtn ? (
                <Button
                  size="sm"
                  onClick={(e) => {
                    if (emailid !== "") {
                      e.target.disabled = true;
                      VerifyEmail();
                      setTimeout(() => {
                        e.target.disabled = false;
                      }, 45000);
                      setButtonmssg("Resend Otp");
                    } else {
                      alert("Please write your email id");
                    }
                  }}
                  color="primary"
                >
                  {buttonmssg}
                </Button>
              ) : (
                <Button size="sm" color="primary" disabled>
                  Verified
                </Button>
              )}
            </Col>
          </Row>
        </FormGroup>
        <FormGroup row>
          {showOtp && (
            <>
              <Col md={{ size: 5 }}>
                <Input
                  type="password"
                  id="otp"
                  name="otp"
                  value={writtenOtp}
                  valid={otpError === ""}
                  invalid={otpError !== ""}
                  placeholder="Enter OTP"
                  onBlur={() => {
                    setTouchedOtp(true);
                  }}
                  onChange={(event) => {
                    setOtp(event.target.value);
                    // alert(writtenOtp.toString().length);
                  }}
                />
                <FormFeedback>{otpError}</FormFeedback>
              </Col>
              <Timer initialTime={40000} direction="backward">
                {() => (
                  <>
                    Resend OTP after <Timer.Seconds /> sec
                  </>
                )}
              </Timer>
            </>
          )}
        </FormGroup>
      </Form>
      <Form onSubmit={handleSubmitLocal}>
        <FormGroup>
          <Label htmlFor="password">Password</Label>
          <div className="input-icons">
            <i className="fa fa-lock fa-lg icon"></i>
            <Input
              className="input-field"
              type="password"
              value={passwords.password}
              id="password"
              name="password"
              onChange={(event) => {
                setpassword((prev) => {
                  return {
                    ...prev,
                    password: event.target.value,
                  };
                });
              }}
            />
          </div>
          {passwords.password.length > 0 && passwords.password.length < 6 ? (
            <Label style={{ color: "red" }}>
              Password should be atleast 6 characters long
            </Label>
          ) : null}
        </FormGroup>
        <FormGroup>
          <Label htmlFor="confirm_password">Confirm Password</Label>
          <div className="input-icons">
            <i className="fa fa-lock fa-lg icon"></i>
            <Input
              type="password"
              className="input-field"
              id="confirm_password"
              name="confirm_password"
              value={passwords.confirmPassword}
              onChange={(event) => {
                setpassword((prev) => {
                  return {
                    ...prev,
                    confirmPassword: event.target.value,
                  };
                });
              }}
            />
          </div>
          {passwords.confirmPassword !== "" &&
            (passwordMatches ? (
              <Label style={{ color: "green" }}>Passwords match</Label>
            ) : (
              <Label style={{ color: "red" }}>Passwords don't match</Label>
            ))}
        </FormGroup>
        {verfiedOtp && passwordMatches && passwords.password.length > 5 ? (
          <Row>
            <Col md={{ size: 10, offset: 1 }}>
              <Button
                block
                type="submit"
                value="submit"
                color="info"
                disabled={true}
              >
                Sign Up
              </Button>
            </Col>{" "}
          </Row>
        ) : (
          <Row>
            <Col md={{ size: 10, offset: 1 }}>
              <Button
                block
                type="submit"
                value="submit"
                color="info"
                disabled={true}
              >
                Sign Up
              </Button>
            </Col>{" "}
          </Row>
        )}
      </Form>
    </Container>
  );
}

export default SignUp;
