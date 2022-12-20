import React, { Component } from "react";
import FindForm from "./FindDonorFormComponent";

import { Modal, ModalBody, ModalHeader } from "reactstrap";

class Find extends Component {
  render() {
    return (
      <>
        <Modal
          isOpen={this.props.isFindOpen}
          toggle={this.props.toggleFindOpen}
        >
          <ModalHeader toggle={this.props.toggleFindOpen}>
            Search for Blood Donor
          </ModalHeader>
          <ModalBody>
            <FindForm
              isListOpen={this.props.isListOpen}
              toggleListOpen={this.props.toggleListOpen}
            />
          </ModalBody>
        </Modal>
      </>
    );
  }
}

export default Find;
