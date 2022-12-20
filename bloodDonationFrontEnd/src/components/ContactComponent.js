import React, { Component } from "react";
import {
	Card,
	CardImg,
	CardText,
	CardBody,
	CardTitle,
	CardSubtitle,
	Jumbotron,
	Container,
} from "reactstrap";

class Contact extends Component {
	render() {
		return (
			<div>
				<Jumbotron className="home-jumbotron" fluid>
					<Container fluid>
						<h1 className="display-5">Our Team</h1>
					</Container>
					<hr width="250px" className="header-line" />
				</Jumbotron>
				<div className="row">
					<div className="col-12 col-md-6">
						<Card>
							<CardBody>
								<CardTitle tag="h5">Samyak Jain</CardTitle>
								<CardSubtitle
									tag="h6"
									className="mb-2 text-muted"
								>
									IT undergrad at NSUT, Delhi
								</CardSubtitle>
								<CardText>
									<strong>
										Email Id:- samyak.jain5901@gmail.com
									</strong>
									<br />
									Connect with me on
									<div className="text-center">
										<a
											className="btn btn-social-icon btn-facebook"
											href="https://www.facebook.com/profile.php?id=100009501696328"
										>
											<i className="fa fa-facebook"></i>
										</a>
										<a
											className="btn btn-social-icon btn-linkedin"
											href="https://www.linkedin.com/in/samyak-jain-4221171b4"
										>
											<i className="fa fa-linkedin"></i>
										</a>
									</div>
								</CardText>
							</CardBody>
						</Card>
					</div>
					<div className="col-12 col-md-6">
						<Card>
							<CardBody>
								<CardTitle tag="h5">Yush Singla</CardTitle>
								<CardSubtitle
									tag="h6"
									className="mb-2 text-muted"
								>
									CSAI undergrad at NSUT, Delhi
								</CardSubtitle>
								<CardText>
									<strong>
										Email Id:- yushsingla@gmail.com
									</strong>
									<br />
									Connect with me on
									<div className="text-center">
										<a
											className="btn btn-social-icon btn-facebook"
											href="https://www.facebook.com/yush.singla.50"
										>
											<i className="fa fa-facebook"></i>
										</a>
										<a
											className="btn btn-social-icon btn-linkedin"
											href="https://www.linkedin.com/in/yush-singla-0524331b4/"
										>
											<i className="fa fa-linkedin"></i>
										</a>
									</div>
								</CardText>
							</CardBody>
						</Card>
					</div>
				</div><br/><br/><br/><br/>
			</div>
		);
	}
}

export default Contact;
