import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function InformationModal() {

  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
        <Modal show={show}>
        <Modal.Dialog>
            <Modal.Header closeButton>
            <Modal.Title>Exemensarbete om byteshandel</Modal.Title>
            </Modal.Header>

            <Modal.Body>
            <p>Detta är ett examensarbete om byteshandel. Fyll gärna i dina bokintressen och vilka du har hemma så undersöker vi möjligheterna att skapa en digital plattform för byteshandel</p>
            </Modal.Body>

            <Modal.Footer>
            <Button variant="primary" onClick={handleClose}>Förstår</Button>
            </Modal.Footer>
        </Modal.Dialog>
        </Modal>
    </div>
  );
}

export default InformationModal;