import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function ModelConfirm({ show, close, handleDelete }) {
  return (
    <>
      <Modal show={show} onHide={close}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Hotel</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={close}>
            Close
          </Button>
          <Button variant="primary" onClick={handleDelete}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
