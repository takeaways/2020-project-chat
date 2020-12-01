import React, { Component } from 'react'
import styled from 'styled-components'
import { FaRegSmileWink, FaPlus } from 'react-icons/fa'
import { connect } from 'react-redux'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import firebase from '../../../firebase'
import { setCurrentChatRoom } from '../../../redux/actions/chatRoom_action'

class ChatRooms extends Component {
  state = {
    show: false,
    name: '',
    description: '',
    chatRoomsRef: firebase.database().ref('chatRooms'),
    chatRooms: [],
    firstLoad: true,
    activeChatRoomId: '',
  }

  componentDidMount() {
    this.AddChatRoomsListeners()
  }

  setFirstChatRoom = () => {
    const firstChatRoom = this.state.chatRooms[0]
    if (this.state.firstLoad && this.state.chatRooms.length > 0) {
      this.props.dispatch(setCurrentChatRoom(firstChatRoom))
      this.setState({ activeChatRoomId: firstChatRoom.id })
    }
    this.setState({ firstLoad: false })
  }

  AddChatRoomsListeners = () => {
    const chatRooms = []
    this.state.chatRoomsRef.on('child_added', (snapshot) => {
      chatRooms.push(snapshot.val())
      this.setState({ chatRooms }, () => this.setFirstChatRoom())
    })
  }

  handleShow = () => this.setState({ show: true })
  handleClose = () => this.setState({ show: false })
  handleChange = (e) =>
    this.setState({
      [e.target.name]: e.target.value,
    })

  addChatRoom = async () => {
    const { name, description } = this.state
    const { user } = this.props
    const id = this.state.chatRoomsRef.push().key
    const newChatRoom = {
      id,
      name,
      description,
      createdBy: {
        name: user.displayName,
        image: user.photoURL,
      },
    }
    try {
      await this.state.chatRoomsRef.child(id).update(newChatRoom)
      this.setState({
        name: '',
        description: '',
        show: false,
      })
    } catch (error) {
      console.log(error)
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { name, description } = this.state
    this.isFormValid(name, description) && this.addChatRoom()
  }

  isFormValid = (name, description) => name && description

  renderChatRooms = (chatRooms) => {
    return (
      chatRooms.length > 0 &&
      chatRooms.map((room) => (
        <li
          className={room.id === this.state.activeChatRoomId ? 'active' : ''}
          key={room.id}
          onClick={() => this.changeChatRoom(room)}
        >
          # {room.name}
        </li>
      ))
    )
  }

  changeChatRoom = (room) => {
    this.setState({ activeChatRoomId: room.id })
    this.props.dispatch(setCurrentChatRoom(room))
  }

  render() {
    return (
      <Wrapper>
        <div className="room-item">
          <FaRegSmileWink style={{ marginRight: 3 }} />
          CHAT ROOMS (1)
          <FaPlus
            style={{ position: 'absolute', right: 0, cursor: 'pointer' }}
            onClick={this.handleShow}
          />
        </div>
        <ul>{this.renderChatRooms(this.state.chatRooms)}</ul>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>새로운 챗팅방 생성</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>방 이름</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="챗팅방 이름"
                  name="name"
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>방 설명</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="방 설명을 적어주세요."
                  name="description"
                  onChange={this.handleChange}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              취소
            </Button>
            <Button type="submit" variant="primary" onClick={this.handleSubmit}>
              방 생성
            </Button>
          </Modal.Footer>
        </Modal>
      </Wrapper>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.currentUser,
  }
}

export default connect(mapStateToProps)(ChatRooms)

const Wrapper = styled.div`
  .room-item {
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
  }

  ul {
    list-style: none;
    padding: 0;
  }
  li {
    display: flex;
    align-items: center;
    padding: 8px 0 8px 4px;
    cursor: pointer;
    border-radius: 5px;
  }
  li:hover {
    background-color: #ffffff45;
  }
  .active {
    background-color: #ffffff45;
  }
`
