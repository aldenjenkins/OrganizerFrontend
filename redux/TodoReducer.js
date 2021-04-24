import {
  FETCH_TODOS,
  FETCH_TODOS_SUCCESS,
  FETCH_TODOS_ERROR,
  FETCH_MORE_TODOS_SUCCESS,
  FETCH_MORE_TODOS_ERROR,
  UPDATE_TODO_SUCCESS,
  UPDATE_TODO_ERROR,
  DELETE_TODO_SUCCESS,
  DELETE_TODO_ERROR,
  TODO_CREATION_MODAL_SWITCHED,
  TODO_EDIT_MODAL_SWITCHED,
  CREATE_TODO_SUCCESS,
  LOGOUT,
} from "./actions";

const INITIAL_STATE = {
  todos: [],
  isFetched: false,
  todoCreationModalOpen: false,
  todoEditModalOpen: false,
  todoEditFormObject: {},
  error: {
    on: false,
    message: null,
  },
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TODO_EDIT_MODAL_SWITCHED:
      return {
        ...state,
        todoEditModalOpen: !state.todoEditModalOpen,
        todoEditFormObject: action.todoEditFormObject,
      };
    case TODO_CREATION_MODAL_SWITCHED:
      return {
        ...state,
        todoCreationModalOpen: !state.todoCreationModalOpen,
      };
    case FETCH_TODOS_SUCCESS:
      return {
        ...state,
        todos: action.todos,
        isFetched: true,
        error: {
          on: false,
          message: null,
        },
      };

    case FETCH_TODOS_ERROR:
      return {
        ...state,
        isFetched: true,
        error: {
          on: true,
          message: action.error,
        },
      };

    case DELETE_TODO_SUCCESS:
      return {
        ...state,
        isFetched: true,
        error: {
          on: false,
          message: null,
        },
      };

    case DELETE_TODO_ERROR:
      return {
        ...state,
        isFetched: true,
        error: {
          on: false,
          message: action.error,
        },
      };

    //	case "FETCH_MORE_LOCAL_HOT_SUCCESS":
    //		let oldState = [...state.school.results];
    //		if (action.nearby) oldState = [...state.nearby.results];
    //		for (let i = 0; i < action.data.results.length; i++) {
    //			oldState.push(action.data.results[i]);
    //		}
    //		if (action.nearby) {
    //			return {
    //				...state,
    //				nearby: {
    //					count: action.data.count,
    //					next: action.data.next,
    //					previous: action.data.previous,
    //					results: oldState,
    //				},
    //				isFetched: true,
    //				error: {
    //					on: false,
    //					message: null,
    //				},
    //			};
    //		} else {
    //			return {
    //				...state,
    //				school: {
    //					count: action.data.count,
    //					next: action.data.next,
    //					previous: action.data.previous,
    //					results: oldState,
    //				},
    //				isFetched: true,
    //				error: {
    //					on: false,
    //					message: null,
    //				},
    //			};
    //		}
    case "REFRESH_THIS_LOCAL_HOT_SUCCESS":
      return {
        ...state,
        ...action.payload,
      };
    case "UPDATE_TODO_SUCCESS":
      return {
        ...state,
        todos: action.todos,
        isFetched: true,
        error: {
          on: false,
          message: action.error,
        },
      };
    case "UPDATE_TODO_ERROR":
      return {
        ...state,
        isFetched: true,
        error: {
          on: true,
          message: action.error,
        },
      };
    case CREATE_TODO_SUCCESS:
      return {
        ...state,
        error: {
          on: true,
          message: action.error,
        },
      };
    case "PURGE":
      return {};
    case LOGOUT:
      return INITIAL_STATE;
    default:
      return state;
  }
};
