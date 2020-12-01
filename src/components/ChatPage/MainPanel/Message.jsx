import React from 'react'
import styled from 'styled-components'
import Media from 'react-bootstrap/Media'
import moment from 'moment'
function Message({ message, user }) {
  const timeFromNow = (timestamp) => moment(timestamp).fromNow()

  const isImage = (message) =>
    message.hasOwnProperty('image') && !message.hasOwnProperty('content')

  const isMessageMine = () => message.user.uid === user.uid

  return (
    <Wrapper>
      <img className="mr-3" src={message.user.image} alt={message.user.name} />
      <Media.Body className={isMessageMine(message, user) ? 'mine' : ''}>
        <h6>
          {message.user.name}
          <span> {timeFromNow(message.timestamp)}</span>
        </h6>
        {isImage(message) ? (
          <img src={message.image} alt={'이미지'} />
        ) : (
          <p className="content">{message.content}</p>
        )}
      </Media.Body>
    </Wrapper>
  )
}

const Wrapper = styled(Media)`
  display: flex;
  align-items: center;
  margin-bottom: 4px;

  .mr-3 {
    border-radius: 10px;
    width: 48px;
    height: 48px;
  }
  h6 {
    margin-bottom: 4px;
  }
  h6 > span {
    font-size: 10px;
    color: gray;
  }
  & > div {
    display: flex;
    flex-direction: column;
  }

  .mine {
    border-radius: 5px;
    background-color: #efefef;
    padding: 1em;
  }

  img {
    max-width: 250px;
    max-height: 250px;
    transition: transform 1s ease;
    cursor: pointer;
  }

  img:hover {
    transform: scale(1.3);
  }
`

export default Message
