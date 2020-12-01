import React, { Component } from 'react'
import styled from 'styled-components'
import { FaRegSmileWink, FaPlus } from 'react-icons/fa'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
class ChatRooms extends Component {
  state = {
    show: false,
  }

  handleShow = () => this.setState({ show: true })
  handleClose = () => this.setState({ show: false })

  render() {
    return (
      <Wrapper>
        <div className="room-item">
          <FaRegSmileWink style={{ marginRight: 3 }} />
          CHAT ROOMS (1)
          <FaPlus
            style={{ position: 'absolute', right: 0, cursor: 'pointer' }}
          />
        </div>

        <Button variant="primary" onClick={this.handleShow}>
          Launch demo modal
        </Button>

        <Modal show={this.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={this.handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </Wrapper>
    )
  }
}

export default ChatRooms

const Wrapper = styled.div`
  .room-item {
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
  }
`
