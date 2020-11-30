import React from 'react'
import SidePanel from './SidePanel/SidePanel'
import MainPanel from './MainPanel/MainPanel'
import style from './ChatPage.module.css'

function ChatPage() {
  return (
    <article className={style.container}>
      <section className={style.sideSection}>
        <SidePanel />
      </section>
      <section className={style.mainSection}>
        <MainPanel />
      </section>
    </article>
  )
}

export default ChatPage
