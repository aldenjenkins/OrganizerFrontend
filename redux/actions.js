import organizerApi from "../routes/api";
import { reset } from "redux-form";
//import { fetchYourProfile } from "../../auth/actions";
//import { fetchMessages, sendChatNotification } from "../../messages/messageActions";
//import getLength from "../../commons/allMiscellaneous/getLength";
//import { selectLocalPost } from "../Drawer/drawerRedux";
import produce from "immer";
import AsyncStorage from "@react-native-community/async-storage";

import { persistor } from "../App";
import { isConstructorDeclaration } from "typescript";
import { Item } from "native-base";

export const FETCH_HABITS = "FETCH_HABITS";
export const FETCH_HABITS_SUCCESS = "FETCH_HABITS_SUCCESS";
export const FETCH_HABITS_ERROR = "FETCH_HABITS_ERROR";
export const FETCH_HABITCOMPLETIONS = "FETCH_HABITCOMPLETIONS";
export const FETCH_HABITCOMPLETIONS_SUCCESS = "FETCH_HABITCOMPLETIONS_SUCCESS";
export const FETCH_HABITCOMPLETIONS_ERROR = "FETCH_HABITCOMPLETIONS_ERROR";
export const FETCH_JOURNALS = "FETCH_JOURNALS";
export const FETCH_JOURNALS_SUCCESS = "FETCH_JOURNALS_SUCCESS";
export const FETCH_JOURNALS_ERROR = "FETCH_JOURNALS_ERROR";
export const FETCH_TODOS = "FETCH_TODOS";
export const FETCH_TODOS_SUCCESS = "FETCH_TODOS_SUCCESS";
export const FETCH_TODOS_ERROR = "FETCH_TODOS_ERROR";

export const CREATE_JOURNAL = "CREATE_JOURNAL";
export const CREATE_JOURNAL_SUCCESS = "CREATE_JOURNAL_SUCCESS";
export const CREATE_JOURNAL_ERROR = "CREATE_JOURNAL_ERROR";
export const UPDATE_JOURNAL = "UPDATE_JOURNAL";
export const UPDATE_JOURNAL_SUCCESS = "UPDATE_JOURNAL_SUCCESS";
export const UPDATE_JOURNAL_ERROR = "UPDATE_JOURNAL_ERROR";
export const DELETE_JOURNAL = "DELETE_JOURNAL";
export const DELETE_JOURNAL_SUCCESS = "DELETE_JOURNAL_SUCCESS";
export const DELETE_JOURNAL_ERROR = "DELETE_JOURNAL_ERROR";

export const CREATE_TODO = "CREATE_TODO";
export const CREATE_TODO_SUCCESS = "CREATE_TODO_SUCCESS";
export const CREATE_TODO_ERROR = "CREATE_TODO_ERROR";
export const UPDATE_TODO = "UPDATE_TODO";
export const UPDATE_TODO_SUCCESS = "UPDATE_TODO_SUCCESS";
export const UPDATE_TODO_ERROR = "UPDATE_TODO_ERROR";
export const DELETE_TODO = "DELETE_TODO";
export const DELETE_TODO_SUCCESS = "DELETE_TODO_SUCCESS";
export const DELETE_TODO_ERROR = "DELETE_TODO_ERROR";

export const CREATE_HABIT = "CREATE_HABIT";
export const CREATE_HABIT_SUCCESS = "CREATE_HABIT_SUCCESS";
export const CREATE_HABIT_ERROR = "CREATE_HABIT_ERROR";
export const UPDATE_HABIT = "UPDATE_HABIT";
export const UPDATE_HABIT_SUCCESS = "UPDATE_HABIT_SUCCESS";
export const UPDATE_HABIT_ERROR = "UPDATE_HABIT_ERROR";
export const DELETE_HABIT = "DELETE_HABIT";
export const DELETE_HABIT_SUCCESS = "DELETE_HABIT_SUCCESS";
export const DELETE_HABIT_ERROR = "DELETE_HABIT_ERROR";

export const UPDATE_HABIT_COMPLETION = "UPDATE_HABIT_COMPLETION";
export const UPDATE_HABIT_COMPLETION_SUCCESS =
  "UPDATE_HABIT_COMPLETION_SUCCESS";
export const UPDATE_HABIT_COMPLETION_ERROR = "UPDATE_HABIT_COMPLETION_ERROR";

export const TODO_CREATION_MODAL_SWITCHED = "TODO_CREATION_MODAL_SWITCHED";
export const TODO_EDIT_MODAL_SWITCHED = "TODO_EDIT_MODAL_SWITCHED";

export const JOURNAL_CREATION_MODAL_SWITCHED =
  "JOURNAL_CREATION_MODAL_SWITCHED";
export const JOURNAL_EDIT_MODAL_SWITCHED = "JOURNAL_EDIT_MODAL_SWITCHED";
export const HABIT_EDIT_MODAL_SWITCHED = "HABIT_EDIT_MODAL_SWITCHED";
export const HABIT_CREATION_MODAL_SWITCHED = "HABIT_CREATION_MODAL_SWITCHED";

export const AGREED_TO_RULES = "AGREED_TO_RULES";
export const REGISTER_ERROR = "REGISTER_ERROR";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const LOGOUT = "LOGOUT";
export const LOGGED_IN = "LOGGED_IN";
export const LOGIN_ERROR = "LOGIN_ERROR";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LATEST_SDK_VERSION = "LATEST_SDK_VERSION";
export const HABIT_DATE_CHANGED = "HABIT_DATE_CHANGED";

export const hasAgreedToRules = () => ({ type: AGREED_TO_RULES });

export function reloadTodos() {
  return async (dispatch, getState) => {
    try {
      const user = getState().user;
      const args = { token: user.token };
      // let timesToRefresh = (localPosts.data.results.length / 20)
      const data = await organizerApi.fetchTodos(args);
      // let additional = data
      // for (i = 1; i < timesToRefresh; i++){
      //     const fetch = await axios.get(additional.next, { headers: { 'Authorization': `Bearer ${args.token}` }});
      //     additional.results.concat(fetch.data.results)
      //     additional.next = fetch.data.next
      //     additional.count = fetch.data.count
      // }
      dispatch(reloadTodosSuccess(data));
      return data;
    } catch (e) {
      dispatch(reloadTodosError(e));
      return { hasError: true, error: e };
    }
  };
}

export function habitDateChange(selectedDate) {
  console.log("DATE PRE FORMAT!!!!!!!!!!!!!!!!!!!", selectedDate);
  selectedDate = selectedDate.format("YYYY-MM-DD");
  console.log("DATE POST FORMAT!!!!!!!!!!!!!!!!!!!", selectedDate);
  return {
    type: HABIT_DATE_CHANGED,
    selectedDate: selectedDate,
  };
}

function reloadTodosSuccess(data) {
  return {
    type: FETCH_TODOS_SUCCESS,
    isUpdated: true,
    todos: data,
    error: {
      on: false,
      message: null,
    },
  };
}

function reloadTodosError(error) {
  return {
    type: FETCH_TODOS_ERROR,
    error,
  };
}

export function reloadHabits() {
  return async (dispatch, getState) => {
    try {
      const user = getState().user;
      const selectedDate = getState().habits.selectedDate;
      const args = { token: user.token, selectedDate };
      let habits = await organizerApi.fetchHabits(args);
      let habitCompletions = await organizerApi.fetchHabitCompletions(args);
      console.log(habits, habitCompletions);
      dispatch(reloadHabitsSuccess({ habits, habitCompletions }));
    } catch (e) {
      dispatch(reloadHabitsError(e));
      return { hasError: true, error: e };
    }
  };
}
export function reloadHabitCompletions() {
  return async (dispatch, getState) => {
    try {
      const user = getState().user;
      const selectedDate = getState().habits.selectedDate;
      const args = { token: user.token, selectedDate };
      const data = await organizerApi.fetchHabitCompletions(args);
      dispatch(reloadHabitCompletionsSuccess(data));
    } catch (e) {
      dispatch(reloadHabitCompletionsError(e));
      return { hasError: true, error: e };
    }
  };
}

function reloadHabitsSuccess(data) {
  return {
    type: FETCH_HABITS_SUCCESS,
    isUpdated: true,
    habits: data.habits,
    habitCompletions: data.habitCompletions,
    error: {
      on: false,
      message: null,
    },
  };
}

function reloadHabitsError(error) {
  return {
    type: FETCH_HABITS_ERROR,
    error,
  };
}
function reloadHabitCompletionsSuccess(data) {
  return {
    type: FETCH_HABITCOMPLETIONS_SUCCESS,
    isUpdated: true,
    data: data,
    error: {
      on: false,
      message: null,
    },
  };
}

function reloadHabitCompletionsError(error) {
  return {
    type: FETCH_HABITCOMPLETIONS_ERROR,
    error,
  };
}

export function reloadJournals() {
  return async (dispatch, getState) => {
    try {
      // let timesToRefresh = (localPosts.data.results.length / 20)
      const user = getState().user;
      const args = { token: user.token };
      const data = await organizerApi.fetchJournals(args);
      // let additional = data
      // for (i = 1; i < timesToRefresh; i++){
      //     const fetch = await axios.get(additional.next, { headers: { 'Authorization': `Bearer ${args.token}` }});
      //     additional.results.concat(fetch.data.results)
      //     additional.next = fetch.data.next
      //     additional.count = fetch.data.count
      // }
      dispatch(reloadJournalsSuccess(data));
      return data;
    } catch (e) {
      dispatch(reloadJournalsError(e));
      return { hasError: true, error: e };
    }
  };
}

function reloadJournalsSuccess(data) {
  return {
    type: FETCH_JOURNALS_SUCCESS,
    isUpdated: true,
    data: data,
    error: {
      on: false,
      message: null,
    },
  };
}

function reloadJournalsError(error) {
  return {
    type: FETCH_JOURNALS_ERROR,
    error,
  };
}
export function readJournal(args) {
  return async (dispatch) => {
    try {
      await organizerApi.updateJournalEntry(args);
      await dispatch(reloadJournals(args));
    } catch (e) {
      return dispatch(readJournalError(e));
    }
  };
}
function readJournalSuccess(data) {
  return {
    type: UPDATE_JOURNAL_SUCCESS,
    journals: data,
    isUpdated: true,
    error: {
      on: false,
      message: null,
    },
  };
}

function readJournalError(e) {
  return {
    type: UPDATE_JOURNAL_ERROR,
    isUpdated: true,
    error: {
      on: true,
      message: e.message,
    },
  };
}

// export function editTodo(args) {
//   return async (dispatch, getState) => {
//     try {
//       const user = getState().user;
//       const args = { ...args, token: user.token };
//       await organizerApi.editTodoEntry(args);
//       await dispatch(reloadTodos(args));
//     } catch (e) {
//       return dispatch(completeTodoError(e));
//     }
//   };
// }

function completeTodoSuccess(data) {
  return {
    type: UPDATE_TODO_SUCCESS,
    todos: data,
    isUpdated: true,
    error: {
      on: false,
      message: null,
    },
  };
}

function createHabitSuccess() {
  return {
    type: CREATE_HABIT_SUCCESS,
    isUpdated: true,
    error: {
      on: false,
      message: null,
    },
  };
}

function createHabitError(e) {
  console.log(e);
  return {
    type: CREATE_HABIT_ERROR,
    isUpdated: true,
    error: {
      on: true,
      message: e.message,
    },
  };
}
function createJournalSuccess() {
  return {
    type: CREATE_JOURNAL_SUCCESS,
    isUpdated: true,
    error: {
      on: false,
      message: null,
    },
  };
}

function createJournalError(e) {
  console.log(e);
  return {
    type: CREATE_JOURNAL_ERROR,
    isUpdated: true,
    error: {
      on: true,
      message: e.message,
    },
  };
}

export function completeHabitCompletion(item) {
  return async (dispatch, getState) => {
    try {
      const selectedDate = getState().habits.selectedDate;
      const user = getState().user;
      const args = {
        token: user.token,
        habitCompletionId: item.id,
        selectedDate,
        did_complete: !item.did_complete,
      };
      await organizerApi.completeHabitCompletion(args);
      // await dispatch(reloadHabitCompletions());
      await dispatch(reloadHabits());
      await dispatch(completeHabitSuccess());
    } catch (e) {
      console.log(e);
      return dispatch(completeHabitError(e));
    }
  };
}

function completeHabitError(e) {
  return {
    type: UPDATE_HABIT_COMPLETION_ERROR,
    isUpdated: true,
    error: {
      on: true,
      message: e,
    },
  };
}
function completeHabitSuccess() {
  return {
    type: UPDATE_HABIT_COMPLETION_SUCCESS,
    isUpdated: true,
    error: {
      on: false,
      message: null,
    },
  };
}
function completeTodoError(e) {
  return {
    type: UPDATE_TODO_ERROR,
    isUpdated: true,
    error: {
      on: true,
      message: e.message,
    },
  };
}
function createTodoSuccess() {
  return {
    type: CREATE_TODO_SUCCESS,
    isUpdated: true,
    error: {
      on: false,
      message: null,
    },
  };
}

function createTodoError(e) {
  console.log(e);
  return {
    type: CREATE_TODO_ERROR,
    isUpdated: true,
    error: {
      on: true,
      message: e.message,
    },
  };
}

function deleteHabitError(error) {
  return {
    type: DELETE_HABIT_ERROR,
    isUpdated: true,
    error: {
      on: true,
      message: error.message,
    },
  };
}
function deleteHabitSuccess() {
  return {
    type: DELETE_HABIT_SUCCESS,
    isUpdated: true,
    error: {
      on: false,
      message: null,
    },
  };
}
function deleteJournalError(error) {
  return {
    type: DELETE_JOURNAL_ERROR,
    isUpdated: true,
    error: {
      on: true,
      message: error.message,
    },
  };
}
function deleteJournalSuccess() {
  return {
    type: DELETE_JOURNAL_SUCCESS,
    isUpdated: true,
    error: {
      on: false,
      message: null,
    },
  };
}
function deleteTodoSuccess() {
  return {
    type: DELETE_TODO_SUCCESS,
    isUpdated: true,
    error: {
      on: false,
      message: null,
    },
  };
}
function editJournalError(e) {
  console.log(e);
  return {
    type: UPDATE_JOURNAL_ERROR,
    isUpdated: true,
    error: {
      on: true,
      message: e.message,
    },
  };
}
function editJournalSuccess() {
  return {
    type: UPDATE_JOURNAL_SUCCESS,
    isUpdated: true,
    error: {
      on: false,
      message: null,
    },
  };
}
function editHabitSuccess() {
  return {
    type: UPDATE_HABIT_SUCCESS,
    isUpdated: true,
    error: {
      on: false,
      message: null,
    },
  };
}

function editHabitError(e) {
  console.log(e);
  return {
    type: UPDATE_HABIT_ERROR,
    isUpdated: true,
    error: {
      on: true,
      message: e.message,
    },
  };
}
function editTodoError(e) {
  console.log(e);
  return {
    type: UPDATE_TODO_ERROR,
    isUpdated: true,
    error: {
      on: true,
      message: e.message,
    },
  };
}
function editTodoSuccess() {
  return {
    type: UPDATE_TODO_SUCCESS,
    isUpdated: true,
    error: {
      on: false,
      message: null,
    },
  };
}
function deleteTodoError(e) {
  console.log(e);
  return {
    type: DELETE_TODO_ERROR,
    isUpdated: true,
    error: {
      on: true,
      message: e.message,
    },
  };
}

export function switchJournalEditModalOpen(journalObject) {
  if (!journalObject) {
    journalObject = {};
  }
  return {
    type: JOURNAL_EDIT_MODAL_SWITCHED,
    journalEditFormObject: journalObject,
  };
}

export function switchHabitEditModalOpen(habitObject) {
  if (!habitObject) {
    habitObject = {};
  }
  console.log("!!!!HABIT OBJECT WHEN SWITCHING EDIT MODAL!!!!!", habitObject);
  return {
    type: HABIT_EDIT_MODAL_SWITCHED,
    habitEditFormObject: habitObject,
  };
}
export function switchHabitCreationModalOpen() {
  return {
    type: HABIT_CREATION_MODAL_SWITCHED,
  };
}
export function switchJournalCreationModalOpen() {
  return {
    type: JOURNAL_CREATION_MODAL_SWITCHED,
  };
}
export function switchTodoEditModalOpen(todoObject) {
  if (!todoObject) {
    todoObject = {};
  }
  return {
    type: TODO_EDIT_MODAL_SWITCHED,
    todoEditFormObject: todoObject,
  };
}

export function switchTodoCreationModalOpen() {
  return {
    type: TODO_CREATION_MODAL_SWITCHED,
  };
}

export function createTodo(formValues) {
  return async (dispatch, getState) => {
    try {
      const user = getState().user;
      const args = { formValues, token: user.token };
      await organizerApi.createTodoEntry(args);
      await dispatch(switchTodoCreationModalOpen());
      await dispatch(createTodoSuccess());
      await dispatch(reloadTodos());
    } catch (e) {
      return dispatch(createTodoError(e));
    }
  };
}

export function createJournal(formValues) {
  return async (dispatch, getState) => {
    try {
      const user = getState().user;
      const args = { formValues, token: user.token };
      await organizerApi.createJournalEntry(args);
      await dispatch(switchJournalCreationModalOpen());
      await dispatch(createJournalSuccess());
      await dispatch(reloadJournals());
    } catch (e) {
      return dispatch(createJournalError(e));
    }
  };
}

export function editHabit(args) {
  return async (dispatch, getState) => {
    try {
      const user = getState().user;
      const selectedDate = getState().habits.selectedDate;
      console.log(selectedDate);
      args = { ...args, token: user.token, selectedDate };
      await organizerApi.editHabit(args);
      await dispatch(reloadHabits());
      // await dispatch(reloadHabitCompletions());
      await dispatch(editHabitSuccess());
    } catch (e) {
      return dispatch(editHabitError(e));
    }
  };
}
export function editTodo(args) {
  return async (dispatch, getState) => {
    try {
      const user = getState().user;
      args = { ...args, token: user.token };
      await organizerApi.editTodoEntry(args);
      await dispatch(switchTodoEditModalOpen());
      await dispatch(editTodoSuccess());
      await dispatch(reloadTodos());
    } catch (e) {
      return dispatch(editTodoError(e));
    }
  };
}
export function editJournal(formValues) {
  return async (dispatch, getState) => {
    try {
      const user = getState().user;
      const args = { ...formValues, token: user.token };
      await organizerApi.editJournalEntry(args);
      await dispatch(switchJournalEditModalOpen());
      await dispatch(editJournalSuccess());
      await dispatch(reloadJournals());
    } catch (e) {
      return dispatch(editJournalError(e));
    }
  };
}

export function deleteJournal(journalId) {
  return async (dispatch, getState) => {
    try {
      const user = getState().user;
      const args = { id: journalId, token: user.token };
      await organizerApi.deleteJournalEntry(args);
      await dispatch(switchJournalEditModalOpen());
      await dispatch(deleteJournalSuccess());
      await dispatch(reloadJournals());
    } catch (e) {
      return dispatch(deleteJournalError(e));
    }
  };
}
export function deleteTodo(todoId) {
  return async (dispatch, getState) => {
    try {
      const user = getState().user;
      const args = { id: todoId, token: user.token };
      await organizerApi.deleteTodoEntry(args);
      await dispatch(switchTodoEditModalOpen());
      await dispatch(deleteTodoSuccess());
      await dispatch(reloadTodos());
    } catch (e) {
      return dispatch(deleteTodoError(e));
    }
  };
}
export function deleteHabit(habitId) {
  return async (dispatch, getState) => {
    try {
      const user = getState().user;
      const selectedDate = getState().habits.selectedDate;
      const args = { id: habitId, token: user.token, selectedDate };
      await organizerApi.deleteHabit(args);
      //await dispatch(switchHabitEditModalOpen());
      await dispatch(deleteHabitSuccess());
      await dispatch(reloadHabits());
      // await dispatch(reloadHabitCompletions());
      await dispatch(switchHabitEditModalOpen());
    } catch (e) {
      return dispatch(deleteHabitError(e));
    }
  };
}

export function createHabit(formValues) {
  return async (dispatch, getState) => {
    try {
      const user = getState().user;
      const args = { formValues, token: user.token };
      await organizerApi.createHabit(args);
      await dispatch(reloadHabits());
      // await dispatch(reloadHabitCompletions());
      await dispatch(switchHabitCreationModalOpen());
      await dispatch(createHabitSuccess());
    } catch (e) {
      return dispatch(createHabitError(e));
    }
  };
}

export async function setTokenInStorage(token) {
  try {
    await AsyncStorage.setItem("token", token);
    return true;
  } catch (error) {
    throw error;
  }
}

export function loginSuccess({ user: info, token }) {
  return { type: LOGIN_SUCCESS, info, token };
}

function loginError(error) {
  return { type: LOGIN_ERROR, error };
}

export function login(args) {
  return async (dispatch, getState) => {
    try {
      const data = await organizerApi.login(args);
      dispatch(loginSuccess(data));
      setTokenInStorage(data.token);
      return true;
    } catch (error) {
      console.log("login error", error, { error });
      const data = error;
      let errorMessage = "";
      if (data.non_field_errors != null) {
        const loginError = data.non_field_errors[0];
        errorMessage = errorMessage + loginError;
      }
      dispatch(loginError(error));
      return { hasError: true, errorMessage };
    }
  };
}

export function refreshTokenSuccess(data) {
  return { type: REFRESH_TOKEN_SUCCESS, user: data.user, token: data.token };
}

function refreshTokenError(error) {
  return {
    type: REFRESH_TOKEN_ERROR,
    error,
  };
}

export function refreshToken(args) {
  return async (dispatch) => {
    try {
      const data = await metooApi.refreshToken({ args });
      const fetchArgs = { token: data.data.token, id: data.data.user.id };
      dispatch(refreshTokenSuccess(data.data));
    } catch (e) {
      return dispatch(refreshTokenError(e));
    }
  };
}
export async function checkIfPhoneExists({ callingCode, phone_number }) {
  let url = `${metooApi.url()}/phoneexists/${callingCode.concat(phone_number)}`;
  try {
    const { data } = await axios.get(url);
    this.setState({ phoneExists: data, checkedIfPhoneExists: true });
    return data;
  } catch (error) {
    console.log("error", error.response);
    Sentry.captureMessage(`error checking if phone exists - ${error}`);
    Alert.alert("Something went wrong", "Please try again.");
    return false;
  }
}
export function fetchYourProfile(args) {
  return async (dispatch, getState) => {
    try {
      const { info } = getState().user;
      const data = await metooApi.fetchYourProfile(args);
      setTokenInStorage(data.token);
      (data.user.metooPosts = info && info.metooPosts ? info.metooPosts : []),
        (args.url = data.user.metoo_posts);
      dispatch(fetchProfileSuccess(data));
      const metooPosts = await metooApi.fetchUserMetooPosts(args);
      data.user.metooPosts = metooPosts;
      dispatch(fetchProfileSuccess(data));
    } catch (error) {
      console.log("error", error);
      return dispatch(fetchProfileError({ error }));
    }
  };
}

export function fetchProfileSuccess({ user, token }) {
  return { type: REFRESH_SUCCESS, user, token };
}

function fetchProfileError(e) {
  if (
    (e.error != null && e.error.status == 401) ||
    e.error.response.data.detail == "Invalid signature." ||
    e.error.response.data.detail == "Error decoding signature." ||
    e.error.response.data.detail == "Signature has expired."
  ) {
    return { type: REFRESH_ERROR, logout: true, e };
  }
  return { type: REFRESH_ERROR, e };
}

function registerSuccess(data) {
  return { type: REGISTER_SUCCESS, info: data.user, token: data.token };
}
export function isLogged() {
  NavigatorDispatch({ routeName: "App" });
  return { type: LOGGED_IN };
}
function registerError(error) {
  return { type: REGISTER_ERROR, error };
}
function handleRegistration(data) {
  return async (dispatch) => {
    setTokenInStorage(data.token);
    data.user.metooPosts = { results: [] };
    dispatch(registerSuccess(data));
    dispatch(fetchPeopleYouMayKnow({ token: data.token }));
  };
}
export function register({ phone_number, code }) {
  return async (dispatch, getState) => {
    try {
      const {
        username,
        first_name,
        last_name,
        password,
        email,
        avatar,
      } = await dispatch(updatePhoneNumber(phone_number, code));
      const data = await metooApi.register({
        fields: {
          username,
          first_name,
          last_name,
          password,
          email,
          phone_number,
          code,
        },
      }); // avatar is automatically passed by the form if one was selected, but it takes longer to upload and we want the request to finish asap so we ignore it
      dispatch(handleRegistration(data));
      if (avatar)
        dispatch(
          updateAvatar({
            formData: avatar,
            userId: data.user.id,
            token: data.token,
          })
        ); // and then update after we've registered
      return true;
    } catch (error) {
      Sentry.captureException(new Error(error));
      console.log("registration error", error, error.response);
      let response = (error && error.response && error.response.data) || {};
      let errorMessage = "";
      if (response.username != null) {
        const usernameError = response.username[0];
        errorMessage = errorMessage + "Username: " + usernameError;
      }
      if (response.email != null) {
        const emailError = response.email[0];
        errorMessage = errorMessage + "\n" + "Email: " + emailError;
      }
      if (response.password != null) {
        const passwordError = response.password[0];
        errorMessage = errorMessage + "\n" + "Password: " + passwordError;
      }
      if (response.first_name != null) {
        const firstNameError = response.first_name[0];
        errorMessage = errorMessage + "\n" + "First name: " + firstNameError;
      }
      if (response.last_name != null) {
        const lastNameError = response.last_name[0];
        errorMessage = errorMessage + "\n" + "Last name: " + lastNameError;
      }
      if (response.non_field_errors != null) {
        const codeError = response.non_field_errors[0];
        errorMessage = errorMessage + "\n" + "Code: " + codeError;
      }
      // setTimeout(() => {
      //     Alert.alert(
      //         'Something went wrong with registration!', `${errorMessage}`
      //     )
      // }, 500)
      dispatch(registerError(error));
      return { error, errorMessage };
    }
  };
}

export function logout() {
  return async (dispatch) => {
    persistor.purge();
    try {
      return dispatch(logoutSuccess());
    } catch (error) {
      console.log(error);
    }
    return dispatch(logoutSuccess());
  };
}

export function logoutSuccess() {
  return { type: LOGOUT };
}

export function askForReview() {
  return async (dispatch) => {
    dispatch(hasReviewed());
    if (StoreReview.isSupported() && !__DEV__) StoreReview.requestReview();
    else
      Linking.openURL(
        Platform.OS == "ios"
          ? "https://itunes.apple.com/us/app/metoo/id1369280667?ls=1&mt=8"
          : "https://play.google.com/store/apps/details?id=io.metoo.metooapp"
      );
  };
}
function hasReviewed() {
  return { type: HAS_REVIEWED };
}
export function ignoredReview() {
  return { type: IGNORED_REVIEW };
}
export function showReview() {
  return { type: SHOW_REVIEW };
}
export function hideReview() {
  return { type: HIDE_REVIEW };
}
