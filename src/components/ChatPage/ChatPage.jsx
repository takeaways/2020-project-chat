import React from 'react';
import SidePanel from './SidePanel/SidePanel';
import MainPanel from './MainPanel/MainPanel';
import style from './ChatPage.module.css';
import { useSelector } from 'react-redux';

function ChatPage() {
  const chatRoom = useSelector((state) => state.chatRoom.currentChatRoom);

  return (
    <article className={style.container}>
      <section className={style.sideSection}>
        <SidePanel />
      </section>
      <section className={style.mainSection}>
        <MainPanel key={chatRoom && chatRoom.id} />
      </section>
    </article>
  );
}

export default ChatPage;
