import React from "react";
import { Container } from "reactstrap";
import { Link } from "react-router-dom";

function Footer(props) {
  return (
    <div className="footer">
      <Container>
        <div className="row ">
          <div className="col-12 col-sm-3 align-self-center text-center">
            <ul className="list-unstyled">
              <li>
                <Link to="/home">Home</Link>
              </li>
              <li>
                <Link to="/aboutus">About Us</Link>
              </li>
              <li>
                <Link to="/contactus">Contact Us</Link>
              </li>
            </ul>
          </div>
          <div className="col-12 col-sm-4 social-media text-center">
            <a href="/" target="_blank">
              <i className="fa fa-lg fa-instagram"></i>
            </a>
            <a href="/" target="_blank">
              <i className="fa fa-lg fa-facebook-square"></i>
            </a>
            <a href="/" target="_blank">
              <i className="fa fa-lg fa-twitter"></i>
            </a>
          </div>
          <div className="col-12 col-sm-4 text-center copyright">
            <p>© Copyright 2021 BloodForYou</p>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Footer;
