import React, { useState } from "react";
import {
  Modal,
  FormGroup,
  ModalHeader,
  ModalBody,
  Form,
  Label,
  Input,
  Button,
  Row,
  Col,
  Container,
} from "reactstrap";
import axios from "axios";

export default function SignIn(props) {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  function resetModal() {
    setUserInfo({
      email: "",
      password: "",
    });
    props.toggleModalIn();
  }

  function handleSubmitLocal(event) {
    // alert("yo");
    axios("/login", {
      method: "post",
      data: userInfo,
      withCredentials: true,
    }).then((response) => {
      alert(response.data);
      if (response.data === "No User Exists") {
        alert("OOPs No such user exists login instead");
      } else {
        resetModal();
        props.getName();
        props.toggleLoggedIn();
      }
    });

    event.preventDefault();
  }
  // console.log(gotAuthenticated);
  function handleSuccessGoogle() {
    window.open("/auth/google", "_self");
  }
  function handleSuccessFacebook() {
    window.open("/auth/facebook", "_self");
  }
  function handleFailure(res) {
    console.log("failed miserably");
  }
  return (
    <Container id="signForm">
      <Row>
        <Col md={{ size: 10, offset: 1 }}>
          <Button
            block
            type="submit"
            color="danger"
            onClick={handleSuccessGoogle}
          >
            <span className="fa fa-lg fa-google"></span> Continue with Google
          </Button>
        </Col>{" "}
      </Row>
      <hr />
      <p className="text-center">
        <strong>OR</strong>
        <br /> Use your email address
      </p>
      <Form onSubmit={handleSubmitLocal}>
        <FormGroup>
          <Label htmlFor="email">Email ID</Label>
          <div className="input-icons">
            <i className="fa fa-envelope-square fa-lg icon"></i>
            <Input
              className="input-field"
              required
              type="email"
              value={userInfo.email}
              onChange={(event) =>
                setUserInfo((prevValue) => {
                  return {
                    ...prevValue,
                    email: event.target.value,
                  };
                })
              }
              id="email"
              name="email"
            />
          </div>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="password">Password</Label>
          <div className="input-icons">
            <i className="fa fa-lock fa-lg icon"></i>
            <Input
              required
              className="input-field"
              type="password"
              value={userInfo.password}
              onChange={(event) =>
                setUserInfo((prevValue) => {
                  return {
                    ...prevValue,
                    password: event.target.value,
                  };
                })
              }
              id="password"
              name="password"
            />
          </div>
        </FormGroup>
        <Row>
          <Col md={{ size: 10, offset: 1 }}>
            <Button block type="submit" value="submit" color="info">
              Sign In
            </Button>
          </Col>{" "}
        </Row>
      </Form>
    </Container>
  );
}
