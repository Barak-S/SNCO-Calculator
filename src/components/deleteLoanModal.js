import React from 'react'
import { FormControl, InputGroup, Card, Col, Row, Container, Dropdown, DropdownButton, Form, Button, Modal } from 'react-bootstrap';

export default function deleteLoanModal() {


        return (
            <>
              <Modal
                
                backdrop="static"
                keyboard={false}
              >
                <Modal.Header closeButton>
                  <Modal.Title>Modal title</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  I will not close if you click outside me. Don't even try to press
                  escape key.
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary">
                    Close
                  </Button>
                  <Button variant="primary">Understood</Button>
                </Modal.Footer>
              </Modal>
            </>
    )
}