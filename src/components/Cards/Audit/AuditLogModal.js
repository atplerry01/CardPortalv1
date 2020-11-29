import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

const AuditLogModal = (props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <p variant="primary" onClick={handleShow} style={{ cursor: "pointer" }}>
        {props.parameters.slice(0, 8)}...
      </p>

      <Modal
        show={show}
        onHide={handleClose}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Parameters</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ wordWrap: "break-word" }}>
          {props.parameters}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AuditLogModal;
