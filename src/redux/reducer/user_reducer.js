import { SET_USER, CLEAR_USER, SET_USER_PHOTO } from '../actions/types';

const initialUserState = {
  currentUser: null,
  isLoading: true,
};

export default function userReducer(state = initialUserState, action) {
  switch (action.type) {
    case SET_USER: {
      return {
        ...state,
        currentUser: action.payload,
        isLoading: false,
      };
    }

    case CLEAR_USER: {
      return {
        ...state,
        currentUser: null,
        isLoading: false,
      };
    }

    case SET_USER_PHOTO: {
      return {
        ...state,
        currentUser: { ...state.currentUser, photoUrl: action.payload },
        isLoading: false,
      };
    }

    default:
      return state;
  }
}
