import React, { Component } from 'react';
import { Container, Form, Button, Modal } from 'react-bootstrap';


export default class BookFormModal extends Component {
  render() {
    return (
      <div 
        className='modal show'
        style={{ display: 'block', position: 'initial '}}
      >

        <Modal show={this.props.show} onHide=
        {this.props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title variant='secondary'>Add a Book</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Container className='mt-5'>
            <Form onSubmit={this.props.handleBookSubmit}>
              <Form.Group controlId='title'>
                <Form.Label>Title</Form.Label>
                <Form.Control type='text' />
              </Form.Group>
              <Form.Group controlId='status'>
                <Form.Label>Status</Form.Label>
                <Form.Check type='checkbox' label='Available' />
                <Form.Check type='checkbox' label='Unavailable' />
              </Form.Group>
              <Button type='submit' variant='success'>Save your Book</Button>
            </Form>
            </Container>
          </Modal.Body>

        </Modal>
      </div>
    )
  }
}