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

export default function Eligible(props) {
  return (
    <React.Fragment>
      <Jumbotron className="home-jumbotron" fluid>
        <Container fluid>
          <h1 className="display-5">Eligibility</h1>
        </Container>
        <hr width="250px" className="header-line" />
        <p style={{ fontSize: "18px", lineHeight: "35px" }}>
          <strong>
            Some health conditions, medications, and travel locations may
            temporarily or permanently prevent people from donating blood.
            Eligible donors should be in good health, at least 17 years old, and
            weigh at least 115 pounds (> 53Kg) (for whole blood donations) or
            110 pounds (for platelet donations).
          </strong>
        </p>
      </Jumbotron>
      <Breadcrumb>
        <BreadcrumbItem>
          <Link to="/home">Home</Link>
        </BreadcrumbItem>
        <BreadcrumbItem active>Eligibility FAQ's</BreadcrumbItem>
      </Breadcrumb>
      <Container>
        <div className="row">
          <h3> FAQ's </h3>
        </div>
        <br />
        <ListGroup>
          <ListGroupItem>
            <ListGroupItemHeading className="text-center">
              <h2>
                <strong>MEDICAL CONDITIONS</strong>
              </h2>
            </ListGroupItemHeading>
            <hr width="300px" className="list-header-line" />
            <h5>
              <strong>Can I donate if:</strong>
            </h5>
            <br />
            <ListGroupItemText>
              <ul style={{ listStyleType: "none" }}>
                <li className="eligible-question">
                  I HAVE LEUKEMIA, LYMPHOMA OR ANOTHER HEMATOLOGICAL MALIGNANCY?
                </li>
                <li className="eligible-answer"> No ,You can not donate</li>
                <br />
                <li className="eligible-question">
                  I HAVE BASAL CELL CARCINOMA?
                </li>
                <li className="eligible-answer">
                  You can donate as early as one day after removal.
                </li>
                <br />
                <li className="eligible-question">I HAVE CANCER?</li>
                <li className="eligible-answer">
                  If it has been more than 2 years since the end of your
                  treatment, you may be able to donate. Please contact to doctor
                  firstly.
                </li>
                <br />
                <li className="eligible-question">
                  I HAVE COLD OR FLU SYMPTOMS?
                </li>
                <li className="eligible-answer">
                  Wait until you have felt well at least for one day.
                </li>
                <br />
                <li className="eligible-question">I AM PREGNANT?</li>
                <li className="eligible-answer">
                  You must wait until 6-weeks post-delivery.
                </li>
                <br />
                <li className="eligible-question">
                  I HAVE SYPHILIS OR GONORRHEA?
                </li>
                <li className="eligible-answer">
                  You may donate 3 months later.
                </li>
                <br />
                <li className="eligible-question">I HAVE AIDS/HIV?</li>
                <li className="eligible-answer">
                  Regrettably, you cannot donate.
                </li>
                <br />
                <li className="eligible-question">
                  I HAVE A LOW HEMOGLOBIN/HEMATOCRIT LEVEL?
                </li>
                <li className="eligible-answer">
                  Wait one day for levels to rise.
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
                <strong>MEDICAL PROCEDURES</strong>
              </h2>
            </ListGroupItemHeading>
            <hr width="300px" className="list-header-line" />
            <h5>
              <strong>Can I donate if:</strong>
            </h5>
            <br />
            <ListGroupItemText>
              <ul style={{ listStyleType: "none" }}>
                <li className="eligible-question">
                  I HAVE A PACEMAKER OR IMPLANTED DEFIBRILLATOR?
                </li>
                <li className="eligible-answer">No, You cannot donate.</li>
                <br />
                <li className="eligible-question">
                  I HAD HEART SURGERY DUE TO HEART ATTACK?
                </li>
                <li className="eligible-answer">
                  You may be able to donate 12 months after a heart attack.
                </li>
                <br />
                <li className="eligible-question">I HAD A COLONOSCOPY?</li>
                <li className="eligible-answer">
                  You may donate if you have had a recent colonoscopy.
                </li>
                <br />
                <li className="eligible-question">
                  I RECEIVED A BLOOD TRANSFUSION, SKIN GRAFT OR TISSUE
                  TRANSPLANT?
                </li>
                <li className="eligible-answer">
                  You may donate 3 months later.
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
                <strong>MEDICATIONS AND VACCINATIONS</strong>
              </h2>
            </ListGroupItemHeading>
            <hr width="300px" className="list-header-line" />
            <h5>
              <strong>Can I donate if:</strong>
            </h5>
            <br />
            <ListGroupItemText>
              <ul style={{ listStyleType: "none" }}>
                <li className="eligible-question">
                  I AM ON ANTIBIOTICS FOR AN INFECTION?
                </li>
                <li className="eligible-answer">
                  Wait until 1-day after completion and no signs or symptoms of
                  infection remain.
                </li>
                <br />
                <li className="eligible-question">
                  I AM ON ASPIRIN, FELDENE, PIROXICAM OR ANY ASPIRIN-CONTAINING
                  PRODUCT?
                </li>
                <li className="eligible-answer">
                  There is no wait if you are donating whole blood. A 48-hour
                  wait for apheresis platelet donation.
                </li>
                <br />
                <li className="eligible-question">
                  I AM ON AN EXPERIMENTAL MEDICATION?
                </li>
                <li className="eligible-answer">
                  You may donate 12-months after completion.
                </li>
                <br />
                <li className="eligible-question">
                  I JUST RECEIVED A FLU SHOT?
                </li>
                <li className="eligible-answer">Yes,You can donate.</li>
                <br />
                <li className="eligible-question">
                  I JUST RECEIVED THE HEPATITIS B VACCINATION?
                </li>
                <li className="eligible-answer">Wait two weeks.</li>
                <br />
                <li className="eligible-question">
                  I RECEIVED AN UNLICENSED VACCINE?
                </li>
                <li className="eligible-answer">Wait one year.</li>
                <br />
                <li className="eligible-question">
                  I RECEIVED ANY OTHER VACCINATION?
                </li>
                <li className="eligible-answer">Consult To a doctor.</li>
              </ul>
            </ListGroupItemText>
          </ListGroupItem>
        </ListGroup>
      </Container>
    </React.Fragment>
  );
}
