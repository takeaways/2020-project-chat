import React, { useRef } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import firebase from '../../../myFirebase';
import { IoIosChatboxes } from 'react-icons/io';
import Dropdown from 'react-bootstrap/Dropdown';
import Image from 'react-bootstrap/Image';
import mime from 'mime-types';

import { setPhotoUrl } from '../../../redux/actions/user_action';

function UserPanel() {
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const fileRef = useRef();

  const handleLogout = () => firebase.auth().signOut();
  const handleUpLoadImage = async () => {
    const file = fileRef.current.files[0];

    const metadata = { contentType: mime.lookup(file.name) };

    try {
      const uploadTaskSnapshot = await firebase
        .storage()
        .ref()
        .child(`user_image/${user.uid}`)
        .put(file, metadata);

      const photoURL = await uploadTaskSnapshot.ref.getDownloadURL();
      if (photoURL) {
        await firebase.auth().currentUser.updateProfile({
          photoURL,
        });
      }

      await firebase
        .database()
        .ref('users')
        .child(user.uid)
        .update({ image: photoURL });

      dispatch(setPhotoUrl(photoURL));
    } catch (error) {}
  };

  return (
    <Wrapper>
      <h3>
        <IoIosChatboxes /> Chat App
      </h3>
      <div className="drop-memu">
        <Image src={user?.photoURL} roundedCircle />
        <Dropdown>
          <Toggle>{user?.displayName}</Toggle>
          <Dropdown.Menu>
            <Dropdown.Item
              onClick={() => {
                fileRef.current.click();
              }}
            >
              프로필 사진변경
            </Dropdown.Item>
            <Dropdown.Item onClick={handleLogout}>로그아웃</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <input
        onChange={handleUpLoadImage}
        ref={fileRef}
        accept="image/jpeg, image/png"
        style={{ display: 'none' }}
        type="file"
      />
    </Wrapper>
  );
}

const Wrapper = styled.section`
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
`;

const Toggle = styled(Dropdown.Toggle)`
  background: transparent;
  border: 0px;
`;

export default UserPanel;
