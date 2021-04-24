import {
  FETCH_JOURNALS,
  FETCH_JOURNALS_SUCCESS,
  FETCH_JOURNALS_ERROR,
  FETCH_MORE_JOURNALS_SUCCESS,
  FETCH_MORE_JOURNALS_ERROR,
  FETCH_MORE_NEARBY_LOCAL_HOT_SUCCESS,
  FETCH_MORE_NEARBY_LOCAL_HOT_ERROR,
  UPDATE_JOURNAL_SUCCESS,
  UPDATE_JOURNAL_ERROR,
  DELETE_JOURNAL_SUCCESS,
  DELETE_JOURNAL_ERROR,
  JOURNAL_CREATION_MODAL_SWITCHED,
  JOURNAL_EDIT_MODAL_SWITCHED,
  LOGOUT,
} from "./actions";

const INITIAL_STATE = {
  journals: [],
  isFetched: false,
  journalCreationModalOpen: false,
  journalEditModalOpen: false,
  journalEditFormObject: {},
  error: {
    on: false,
    message: null,
  },
};

const journalReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case JOURNAL_EDIT_MODAL_SWITCHED:
      return {
        ...state,
        journalEditModalOpen: !state.journalEditModalOpen,
        journalEditFormObject: action.journalEditFormObject,
      };
    case JOURNAL_CREATION_MODAL_SWITCHED:
      return {
        ...state,
        journalCreationModalOpen: !state.journalCreationModalOpen,
      };
    case FETCH_JOURNALS_SUCCESS:
      return {
        ...state,
        journals: action.data,
        isFetched: true,
        error: {
          on: false,
          message: null,
        },
      };

    case FETCH_JOURNALS_ERROR:
      return {
        ...state,
        isFetched: true,
        error: {
          on: true,
          message: action.error,
        },
      };

    case DELETE_JOURNAL_SUCCESS:
      return {
        ...state,
        isFetched: true,
        error: {
          on: false,
          message: null,
        },
      };

    case DELETE_JOURNAL_ERROR:
      return {
        ...state,
        isFetched: true,
        error: {
          on: false,
          message: action.error,
        },
      };

    case FETCH_JOURNALS_SUCCESS:
      return {
        ...state,
        journals: action.data,
        isFetched: true,
        error: {
          on: false,
          message: null,
        },
      };

    case FETCH_JOURNALS_ERROR:
      return {
        ...state,
        isFetched: true,
        error: {
          on: true,
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
    case UPDATE_JOURNAL_SUCCESS:
      return {
        ...state,
        journals: action.journals,
        isFetched: true,
        error: {
          on: false,
          message: action.error,
        },
      };
    case UPDATE_JOURNAL_ERROR:
      return {
        ...state,
        isFetched: true,
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

export default journalReducer;
