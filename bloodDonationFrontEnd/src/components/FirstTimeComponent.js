import React from "react";
import {
  Jumbotron,
  Container,
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
import { Link } from "react-router-dom";

export default function FirstTime(props) {
  return (
    <div>
      <Jumbotron className="home-jumbotron" fluid>
        <Container fluid>
          <h1 className="display-5">First Time Donor ?</h1>
        </Container>
        <hr width="250px" className="header-line" />
        <p style={{ fontSize: "20px", lineHeight: "35px" }}>
          <strong>
            Donating blood is a great experience and everyone should enjoy the
            feeling of helping others and saving lives. Here are some things to
            keep in mind if you havent donated blood before.
          </strong>
        </p>
      </Jumbotron>
      <Breadcrumb>
        <BreadcrumbItem>
          <Link to="/home">Home</Link>
        </BreadcrumbItem>
        <BreadcrumbItem active>First Time Donor FAQ's</BreadcrumbItem>
      </Breadcrumb>
      <div className="container">
        <div className="row">
          <h3> FAQ's </h3>
        </div>
        <br />
        <ListGroup>
          <ListGroupItem>
            <ListGroupItemHeading className="text-center">
              <h2>
                <strong>Why Give Blood ?</strong>
              </h2>
            </ListGroupItemHeading>
            <hr width="250px" className="list-header-line" />
            <h4 className="eligible-list-starter">
              You don't need a special reason to give blood. You just need your
              own reason.
            </h4>
            <br />
            <ListGroupItemText>
              <ul style={{ listStyleType: "none" }}>
                <li className="eligible-question">
                  Some of us give blood because we were asked by a friend.
                </li>
                <br />
                <li className="eligible-question">
                  Some know that a family member or a friend might need blood
                  some day.
                </li>
                <br />
                <li className="eligible-question">
                  Some believe it is the right thing to do.
                </li>
                <br />
                <li className="eligible-question">
                  Some do it for the free cookies and juice.
                </li>
                <br />
              </ul>
            </ListGroupItemText>
          </ListGroupItem>
        </ListGroup>
        <br />
        <ListGroup>
          <ListGroupItem>
            <ListGroupItemHeading className="text-center">
              <h2>
                <strong>Common Concerns</strong>
              </h2>
            </ListGroupItemHeading>
            <h4 className="eligible-list-starter">
              Many people are reluctant to make their first blood donation, but
              once they do, they find the donation process to be easy and
              gratifying.
            </h4>
            <br />
            <ListGroupItemText>
              <ul style={{ listStyleType: "none" }}>
                <li className="eligible-question">
                  Unsure if travel or medications will prevent you from donating
                  blood?
                </li>
                <li className="eligible-answer">
                  No travel will not cause you to prevent blood as long as you
                  haven't picked any foreign infections
                </li>
                <br />
                <li className="eligible-question">Is it safe to donate?</li>
                <li className="eligible-answer">
                  Yes donating blood under proper supervision is a completely
                  safe process
                </li>
                <br />
                <li className="eligible-question">Afraid of needles?</li>
                <li className="eligible-answer">
                  Some people may experience different levels of discomfort
                  during their blood donation. When you donate blood, you give
                  more life—and that outlasts any temporary pain during your
                  donation. So, just try to stay focused on all of the
                  life-saving benefits your donation will bring!
                </li>
                <br />
              </ul>
            </ListGroupItemText>
          </ListGroupItem>
        </ListGroup>
        <br />
        <ListGroup>
          <ListGroupItem>
            <ListGroupItemHeading className="text-center">
              <h2>
                <strong>HOW TO GET READY?</strong>
              </h2>
            </ListGroupItemHeading>
            <ListGroupItemText>
              <ul style={{ listStyleType: "none" }}>
                <li className="eligible-question">Eat Iron-Rich foods</li>
                <br />
                <li className="eligible-question">Drink Extra Liquids</li>
                <br />
                <li className="eligible-question">Review Eligibility</li>
                <br />
              </ul>
            </ListGroupItemText>
          </ListGroupItem>
        </ListGroup>
      </div>
    </div>
  );
}
