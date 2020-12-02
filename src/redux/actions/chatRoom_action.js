import { SET_CURRENT_CHAT_ROOM, SET_PRIVATE_CHAT_ROOM } from './types';
export const setCurrentChatRoom = (currentChatRoom) => ({
  type: SET_CURRENT_CHAT_ROOM,
  payload: currentChatRoom,
});

export const setPrivateChatRoom = (isPrivate) => ({
  type: SET_PRIVATE_CHAT_ROOM,
  payload: isPrivate,
});
