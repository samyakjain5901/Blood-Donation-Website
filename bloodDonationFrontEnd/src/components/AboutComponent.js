import React, { useEffect } from "react";
import { Jumbotron, Container, Media, Row } from "reactstrap";

const About = (props) => {
  useEffect(() => {
    if (document.documentElement.clientWidth < 768) {
      document
        .querySelectorAll(".media-object")
        .forEach((img) => (img.style.width = "40%"));
    } else {
      document
        .querySelectorAll(".media-object")
        .forEach((img) => (img.style.width = "70%"));
    }
    window.addEventListener("resize", () => {
      if (document.documentElement.clientWidth < 768) {
        document
          .querySelectorAll(".media-object")
          .forEach((img) => (img.style.width = "40%"));
      } else {
        document
          .querySelectorAll(".media-object")
          .forEach((img) => (img.style.width = "70%"));
      }
    });
  });

  return (
    <>
      <Jumbotron fluid>
        <Container fluid>
          <h1 className="display-5">About Us</h1>
        </Container>
        <hr width="20%" className="header-line" />
      </Jumbotron>
      <Container>
        <Row>
          <div className="col-12">
            <p>
              Have you at anytime witnessed a relative of yours or a close
              friend searching frantically for a blood donor, when blood banks
              say out of stock, the donors in mind are out of reach and the time
              keeps ticking? Have you witnessed loss of life for the only reason
              that a donor was not available at the most needed hour? Is it
              something that we as a society can do nothing to prevent? This
              thought laid our foundation. <br />
              Through this website, we seek donors who are willing to donate
              blood, as well as provide the timeliest support to those in
              frantic need of it.
            </p>
          </div>
        </Row>
        <Row>
          <Media className="col-12">
            <Media body className="col-md-8 m-auto">
              <Media heading tag="h3">
                Our Vision
              </Media>
              <p>
                Bringing Dignity to Life of people by making Quality blood and
                blood products available when needed.{" "}
              </p>
              <p>
                Provide a global platform to celebrate and thank individuals who
                donate blood voluntarily, for altruistic reasons and without any
                monetary reward.{" "}
              </p>
            </Media>
            <Media right middle className="col-md-4 m-auto d-none d-md-inline">
              <Media object src="assets/binoculars.png" alt="Our Vision" />
            </Media>
          </Media>
        </Row>
        <br />
        <Row>
          <Media className="col-12">
            <Media body className="col-md-8 m-auto">
              <Media heading tag="h3">
                Our Goal
              </Media>
              <p>
                This website aims at maintaining all the information pertaining
                to blood donors, different blood groups and help receivers
                manage in a better way.
              </p>{" "}
              <p>
                To provide transparency in this field, make the process of
                obtaining blood which is hassle-free and corruption-free and
                make the system of blood donating and receiving effective.
              </p>
            </Media>
            <Media right middle className="col-md-4 m-auto d-none d-md-inline">
              <Media object src="assets/target.png" alt="Our Goal" />
            </Media>
          </Media>
        </Row>
        <br />
        <Row>
          <Media className="col-12">
            <Media body className="col-md-8 m-auto">
              <Media heading tag="h3">
                Our Mission
              </Media>
              <p>
                To make blood donation 100% voluntary without any replacement
                donor by building individual or institutional alliances.
              </p>{" "}
              <p>
                Provide a global platform to celebrate and thank individuals who
                donate blood voluntarily, for altruistic reasons and without any
                monetary reward.
              </p>
            </Media>
            <Media right middle className="col-md-4 m-auto d-none d-md-inline">
              <Media object src="assets/goal.png" alt="Our Mission" />
            </Media>
          </Media>
        </Row>
      </Container>
      <br />
    </>
  );
};

export default About;
