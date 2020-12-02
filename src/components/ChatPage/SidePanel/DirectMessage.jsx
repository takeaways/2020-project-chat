import React, { Component } from 'react';
import styled from 'styled-components';
import { FaRegSmile } from 'react-icons/fa';
export class DirectMessage extends Component {
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

export default DirectMessage;
