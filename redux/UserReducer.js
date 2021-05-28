import {
  LOGIN,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  REFRESH,
  REFRESH_ERROR,
  REFRESH_SUCCESS,
  REGISTER_ERROR,
  REGISTER_SUCCESS,
  LOGGED_IN,
  LOGOUT,
  LATEST_SDK_VERSION,
} from "./actions";

const INITIAL_STATE = {
  isLoggedIn: false,
  organizerToken: null,
  habitsToken: null,
  organizerInfo: {
    id: Math.random(),
    username: "",
    is_mod: false,
  },
  habitsInfo: {
    id: Math.random(),
    username: "",
    is_mod: false,
  },
  error: {
    on: false,
    message: null,
  },
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, isLoading: true };
    case LOGIN_SUCCESS:
      return {
        ...state,
        organizerInfo: { ...state.organizerInfo, ...action.organizerInfo },
        habitsInfo: { ...state.habitsInfo, ...action.habitsInfo },
        isLoggedIn: true,
        organizerToken: action.organizerToken,
        habitsToken: action.habitsToken,
      };
    case LOGIN_ERROR:
      return { ...state, isLoading: false, error: action.error };
    case REFRESH:
      return { ...state, isLoading: true };
    case REFRESH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        info: { ...state.info, ...action.user },
        token: action.token,
      };
    case REFRESH_ERROR:
      if (action.logout) {
        Alert.alert(
          "Oh no!",
          "Something went wrong with the key that authenticates you. Please log in again."
        );
        return { ...INITIAL_STATE, wasLoggedOut: true };
      }
      return { ...state, isLoading: false, error: action.error };
    case LOGOUT:
      return INITIAL_STATE;
    case "PURGE":
      return {};
    default:
      return state;
  }
};
