import { SET_USER, CLEAR_USER, SET_USER_PHOTO } from './types'

export const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  }
}

export const clearUser = () => {
  return {
    type: CLEAR_USER,
  }
}

export const setPhotoUrl = (photoUrl) => {
  return {
    type: SET_USER_PHOTO,
    payload: photoUrl,
  }
}
