import React, { Component } from 'react';
import styled from 'styled-components';
import { FaRegSmile } from 'react-icons/fa';
import firebase from 'myFirebase';
import { connect } from 'react-redux';
import {
  setCurrentChatRoom,
  setPrivateChatRoom,
} from 'redux/actions/chatRoom_action';

export class DirectMessage extends Component {
  state = {
    usersRef: firebase.database().ref('users'),
    users: [],
    activeChatRoom: '',
  };

  componentDidMount() {
    if (this.props.user) {
      this.addUserListener(this.props.user.uid);
    }
  }

  addUserListener = (currentUserId) => {
    const { usersRef } = this.state;
    const users = [];
    usersRef.on('child_added', (snapshot) => {
      if (currentUserId !== snapshot.key) {
        const user = snapshot.val();
        user['uid'] = snapshot.key;
        user['status'] = 'offline';
        users.push(user);
        this.setState({ users });
      }
    });
  };

  getChatRoomId = (userId) => {
    const currentUserId = this.props.user.uid;

    return userId > currentUserId
      ? `${userId}/${currentUserId}`
      : `${currentUserId}/${userId}`;
  };

  changeChatRoom = (user) => {
    const chatRoomId = this.getChatRoomId(user.uid);
    const chatRoomData = {
      id: chatRoomId,
      name: user.name,
    };
    this.props.dispatch(setCurrentChatRoom(chatRoomData));
    this.props.dispatch(setPrivateChatRoom(true));
    this.setActiveChatRoom(user.uid);
  };

  setActiveChatRoom = (userId) => {
    this.setState({ activeChatRoom: userId });
  };

  renderDirectMessages = (users) => {
    return (
      users.length > 0 &&
      users.map((user) => (
        <li
          className={`${
            user.uid === this.state.activeChatRoom ? 'active' : ''
          }`}
          key={user.uid}
          onClick={() => {
            this.changeChatRoom(user);
          }}
        >
          # {user.name}
        </li>
      ))
    );
  };

  render() {
    const { users } = this.state;
    return (
      <Wrapper>
        <span>
          <FaRegSmile style={{ marginRight: 3 }} /> DIRECT MESSAGE(1)
        </span>
        <ul>{this.renderDirectMessages(users)}</ul>
      </Wrapper>
    );
  }
}

const Wrapper = styled.section`
  & > span {
    display: flex;
    align-items: center;
  }
  & > ul {
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
  .active {
    background-color: #ffffff45;
  }
`;

const mapStateToProps = (state) => {
  return {
    user: state.user.currentUser,
  };
};
export default connect(mapStateToProps)(DirectMessage);
