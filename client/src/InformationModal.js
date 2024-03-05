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
              <h4>Såhär funkar det:</h4>
              <p>
                1. Klicka "Vill ha boken" på alla böcker du vill ha 
              </p>
              <p>
                2. Klicka "Har boken" på alla böcker du redan har 
              </p>
              <p>
                3. Klicka sedan på "Skicka svar" nere i högra hörnet
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