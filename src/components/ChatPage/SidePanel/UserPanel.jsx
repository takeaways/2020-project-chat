import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import firebase from '../../../firebase'
import { IoIosChatboxes } from 'react-icons/io'
import Dropdown from 'react-bootstrap/Dropdown'
import Image from 'react-bootstrap/Image'

function UserPanel() {
  const user = useSelector((state) => state.user.currentUser)

  const handleLogout = () => {
    firebase.auth().signOut()
  }
  return (
    <Wrapper>
      <h3>
        <IoIosChatboxes /> Chat App
      </h3>
      <div className="drop-memu">
        <Image src={user?.photoURL} />
        <Dropdown>
          <Toggle>{user?.displayName}</Toggle>
          <Dropdown.Menu>
            <Dropdown.Item>프로필 사진변경</Dropdown.Item>
            <Dropdown.Item onClick={handleLogout}>로그아웃</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  h3 {
    font-size: 2rem;
  }
  .drop-memu {
    display: flex;
    margin-bottom: 1rem;

    img {
      width: 30px;
      height: 30px;
      margin-top: 3px;
    }
  }
`

const Toggle = styled(Dropdown.Toggle)`
  background: transparent;
  border: 0px;
`

export default UserPanel
