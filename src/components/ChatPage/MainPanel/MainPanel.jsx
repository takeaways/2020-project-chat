import React, { Component } from 'react'
import styled from 'styled-components'

import MessageForm from './MessageForm'
import MessageHeader from './MessageHeader'

export class MainPanel extends Component {
  render() {
    return (
      <Wrapper>
        <MessageHeader />
        <div className={'message'}></div>
        <MessageForm />
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  padding: 2rem 2rem 0 2rem;

  .message {
    width: 100%;
    height: 450px;
    border: 0.2rem solid #ececec;
    border-radius: 4px;
    padding: 1rem;
    margin-bottom: 1rem;
    overflow-y: auto;
  }
`

export default MainPanel
