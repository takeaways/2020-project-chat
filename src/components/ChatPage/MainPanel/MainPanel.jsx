import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import firebase from '../../../firebase';

import MessageForm from './MessageForm';
import MessageHeader from './MessageHeader';
import Message from './Message';

export class MainPanel extends Component {
  state = {
    messageRef: firebase.database().ref('messages'),
    messages: [],
    messagesLoading: true,
    searchTerm: '',
    searchResults: [],
    searchLoading: false,
  };

  componentDidMount = () => {
    const { chatRoom } = this.props;
    chatRoom && this.addMessageListener(chatRoom.id);
  };

  handleSearchChange = (event) => {
    this.setState(
      { searchTerm: event.target.value, searchLoading: true },
      () => {
        this.handleSearchMessages();
      },
    );
  };

  handleSearchMessages = () => {
    const chatRoomMessages = [...this.state.messages];
    const regex = new RegExp(this.state.searchTerm, 'gi');
    const searchResults = chatRoomMessages.reduce((acc, message) => {
      if (
        (message.content && message.content.match(regex)) ||
        message.user.name.match(regex)
      ) {
        acc.push(message);
      }
      return acc;
    }, []);

    this.setState({ searchResults });
  };

  addMessageListener = (chatRoomId) => {
    const messages = [];
    this.state.messageRef.child(chatRoomId).on('child_added', (snapshot) => {
      messages.push(snapshot.val());
      this.setState({ messages, messagesLoading: false });
    });
  };

  renderMessages = (messages) => {
    return (
      messages.length > 0 &&
      messages.map((message) => (
        <Message
          key={message.timestamp}
          message={message}
          user={this.props.user}
        />
      ))
    );
  };

  render() {
    const { messages, searchTerm, searchResults } = this.state;
    return (
      <Wrapper>
        <MessageHeader handleSearchChange={this.handleSearchChange} />
        <div className={'message'}>
          {searchTerm
            ? this.renderMessages(searchResults)
            : this.renderMessages(messages)}
        </div>
        <MessageForm />
      </Wrapper>
    );
  }
}

const Wrapper = styled.section`
  padding: 2rem 2rem 0 2rem;
  min-height: 100vh;

  .message {
    width: 100%;
    height: 450px;
    border: 0.2rem solid #ececec;
    border-radius: 4px;
    padding: 1rem;
    margin-bottom: 1rem;
    overflow-y: auto;
  }
`;

const mapStateToProps = (state) => {
  return {
    user: state.user.currentUser,
    chatRoom: state.chatRoom.currentChatRoom,
  };
};

export default connect(mapStateToProps)(MainPanel);
