import {
  FETCH_HABITCOMPLETIONS,
  FETCH_HABITS_SUCCESS,
  FETCH_HABITS_ERROR,
  LOGOUT,
  FETCH_HABITCOMPLETIONS_SUCCESS,
  FETCH_HABITCOMPLETIONS_ERROR,
  UPDATE_HABITCOMPLETION_SUCCESS,
  UPDATE_HABITCOMPLETION_ERROR,
  DELETE_HABIT_SUCCESS,
  DELETE_HABIT_ERROR,
  HABIT_CREATION_MODAL_SWITCHED,
  HABIT_DATE_CHANGED,
  HABIT_EDIT_MODAL_SWITCHED,
  CREATE_HABIT_SUCCESS,
} from "./actions";

import { format } from "date-fns";

const INITIAL_STATE = {
  habits: [],
  habitCompletions: [],
  isFetched: false,
  habitCreationModalOpen: false,
  habitEditFormObject: {},
  habitEditModalOpen: false,
  selectedDate: format(new Date(), "yyyy-MM-dd"),
  error: {
    on: false,
    message: null,
  },
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case HABIT_EDIT_MODAL_SWITCHED:
      return {
        ...state,
        habitEditModalOpen: !state.habitEditModalOpen,
        habitEditFormObject: action.habitEditFormObject,
      };
    case HABIT_DATE_CHANGED:
      console.log(action.selectedDate);
      return {
        ...state,
        selectedDate: action.selectedDate,
      };
    case HABIT_CREATION_MODAL_SWITCHED:
      return {
        ...state,
        habitCreationModalOpen: !state.habitCreationModalOpen,
      };
    case FETCH_HABITS_SUCCESS:
      return {
        ...state,
        habits: action.habits,
        habitCompletions: action.habitCompletions,
        isFetched: true,
        error: {
          on: false,
          message: null,
        },
      };
    case FETCH_HABITCOMPLETIONS_SUCCESS:
      return {
        ...state,
        habitCompletions: action.data,
        isFetched: true,
        error: {
          on: false,
          message: null,
        },
      };

    case FETCH_HABITS_ERROR:
      return {
        ...state,
        isFetched: true,
        error: {
          on: true,
          message: action.error,
        },
      };
    case FETCH_HABITCOMPLETIONS_ERROR:
      return {
        ...state,
        isFetched: true,
        error: {
          on: true,
          message: action.error,
        },
      };

    case DELETE_HABIT_SUCCESS:
      return {
        ...state,
        isFetched: true,
        error: {
          on: false,
          message: null,
        },
      };

    case DELETE_HABIT_ERROR:
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
    case "UPDATE_HABIT_ERROR":
      return {
        ...state,
        isFetched: true,
        error: {
          on: true,
          message: action.error,
        },
      };
    case UPDATE_HABITCOMPLETION_SUCCESS:
      return {
        ...state,
        habitCompletions: action.habitCompletions,
        isFetched: true,
        error: {
          on: true,
          message: action.error,
        },
      };
    case UPDATE_HABITCOMPLETION_ERROR:
      return {
        ...state,
        isFetched: true,
        error: {
          on: true,
          message: action.error,
        },
      };
    case CREATE_HABIT_SUCCESS:
      return {
        ...state,
        error: {
          on: true,
          message: action.error,
        },
      };
    case LOGOUT:
      return INITIAL_STATE;
    default:
      return state;
  }
};
