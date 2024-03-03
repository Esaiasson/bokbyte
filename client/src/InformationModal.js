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
            <Modal.Header>
            <Modal.Title>Exemensarbete om byteshandel</Modal.Title>
            </Modal.Header>

            <Modal.Body>
            <div style={{ display: 'flex', flexDirection: 'column'  }}>
              <p>
                - Fyll i vilka böcker du vill ha 
              </p>
              <p>
                - Fyll i vilka böcker du har hemma
              </p>
              <p>
                - Klicka på "Skicka svar" nere i högra hörnet
              </p>
            </div>
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