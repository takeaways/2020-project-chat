import React, { Component } from 'react';
import styled from 'styled-components';
import { FaRegSmile } from 'react-icons/fa';
import firebase from 'myFirebase';
import { connect } from 'react-redux';

export class DirectMessage extends Component {
  state = {
    usersRef: firebase.database().ref('users'),
  };

  componentDidMount() {
    console.log(this.props);
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

  renderDirectMessages = () => {};
  render() {
    return (
      <Wrapper>
        <span>
          <FaRegSmile style={{ marginRight: 3 }} /> DIRECT MESSAGE(1)
        </span>
        <ul>{this.renderDirectMessages()}</ul>
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
`;

const mapStateToProps = (state) => {
  return {
    user: state.user.currentUser,
  };
};
export default connect(mapStateToProps)(DirectMessage);
