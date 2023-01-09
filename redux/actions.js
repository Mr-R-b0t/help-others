export const SET_USER = 'SET_USER';
export const SET_USER_SUCCESS = 'SET_USER_SUCCESS';
export const SET_USER_FAILURE = 'SET_USER_FAILURE';

export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

const initialState = {
  user: null,
  loading: false,
  error: null,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        loading: true,
      };
    case SET_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };
    case SET_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

