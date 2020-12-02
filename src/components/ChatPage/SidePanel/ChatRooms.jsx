import React, { Component } from 'react';
import styled from 'styled-components';
import { FaRegSmileWink, FaPlus } from 'react-icons/fa';
import { connect } from 'react-redux';

import Form from 'react-bootstrap/Form';
import firebase from 'myFirebase';
import {
  setCurrentChatRoom,
  setPrivateChatRoom,
} from 'redux/actions/chatRoom_action';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';

class ChatRooms extends Component {
  state = {
    show: false,
    name: '',
    description: '',
    chatRoomsRef: firebase.database().ref('chatRooms'),
    messageRef: firebase.database().ref('messages'),
    chatRooms: [],
    firstLoad: true,
    activeChatRoomId: '',
    notifications: [],
  };

  componentDidMount() {
    this.AddChatRoomsListeners();
  }

  componentWillUnmount() {
    this.state.chatRoomsRef.off();
  }

  setFirstChatRoom = () => {
    const firstChatRoom = this.state.chatRooms[0];
    if (this.state.firstLoad && this.state.chatRooms.length > 0) {
      this.props.dispatch(setCurrentChatRoom(firstChatRoom));
      this.setState({ activeChatRoomId: firstChatRoom.id });
    }
    this.setState({ firstLoad: false });
  };

  AddChatRoomsListeners = () => {
    const chatRooms = [];
    this.state.chatRoomsRef.on('child_added', (snapshot) => {
      chatRooms.push(snapshot.val());
      this.setState({ chatRooms }, () => this.setFirstChatRoom());
      this.addNotificationListener(snapshot.key);
    });
  };

  handleNotification = (
    chatRoomId,
    currentChatRoomId,
    notifications,
    snapshot,
  ) => {
    let lastTotal = 0;

    const index = notifications.findIndex(
      (notification) => notification.id === chatRoomId,
    );

    if (index === -1) {
      notifications.push({
        id: chatRoomId,
        total: snapshot.numChildren(),
        lastKnownTotal: snapshot.numChildren(),
        count: 0,
      });
    } else {
      if (chatRoomId !== currentChatRoomId) {
        lastTotal = notifications[index].lastKnownTotal;

        if (snapshot.numChildren() - lastTotal > 0) {
          notifications[index].count = snapshot.numChildren() - lastTotal;
        }
      }

      notifications[index].total = snapshot.numChildren();
    }

    this.setState({ notifications });
  };
  addNotificationListener = (chatRoomId) => {
    this.state.messageRef.child(chatRoomId).on('value', (snap) => {
      if (this.props.chatRoom) {
        this.handleNotification(
          chatRoomId,
          this.props.chatRoom.id,
          this.state.notifications,
          snap,
        );
      }
    });
  };

  handleShow = () => this.setState({ show: true });
  handleClose = () => this.setState({ show: false });
  handleChange = (e) =>
    this.setState({
      [e.target.name]: e.target.value,
    });

  addChatRoom = async () => {
    const { name, description } = this.state;
    const { user } = this.props;
    const id = this.state.chatRoomsRef.push().key;
    const newChatRoom = {
      id,
      name,
      description,
      createdBy: {
        name: user.displayName,
        image: user.photoURL,
      },
    };
    try {
      await this.state.chatRoomsRef.child(id).update(newChatRoom);
      this.setState({
        name: '',
        description: '',
        show: false,
      });
    } catch (error) {
      console.log(error);
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { name, description } = this.state;
    this.isFormValid(name, description) && this.addChatRoom();
  };

  isFormValid = (name, description) => name && description;

  getNotificationCount = (room) => {
    let count = 0;
    this.state.notifications.forEach((notification) => {
      console.log(notification.id, room.id);
      if (notification.id === room.id) {
        console.log(notification);
        count = notification.count;
      }
    });

    console.log(count);

    if (count > 0) {
      return count;
    }
  };
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
          <Badge className="noti-badge" variant="danger">
            {this.getNotificationCount(room)}
          </Badge>
        </li>
      ))
    );
  };

  changeChatRoom = (room) => {
    this.setState({ activeChatRoomId: room.id });
    this.props.dispatch(setCurrentChatRoom(room));
    this.props.dispatch(setPrivateChatRoom(false));
  };

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
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.currentUser,
    chatRoom: state.chatRoom.currentChatRoom,
  };
};

export default connect(mapStateToProps)(ChatRooms);

const Wrapper = styled.section`
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
    justify-content: space-between;
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
`;
