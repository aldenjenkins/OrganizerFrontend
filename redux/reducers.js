import { combineReducers } from "redux";

import journalReducer from "./JournalReducer";
import todoReducer from "./TodoReducer";
import { reducer as form } from "redux-form";
import userReducer from "./UserReducer";
import habitReducer from "./HabitReducer";

//import todoReducer from "./TodoReducer";
//import habitReducer from "./HabitReducer";
//import habitCompletionReducer from "./HabitCompletionReducer";
//// miscellaneous important that is somehow different than the first miscellaneous imporant bunch
//import cacheReducer from "./cache";
//import drawerReducer from "../screens/home/Drawer/drawerRedux";
//import updateReducer from "./updateRedux";

//	user: UserReducer,
//	todos: todoReducer,
//	habits: habitReducer,
//	habitCompletions: habitCompletionReducer,
//	// friends: friendsReducer,
//	form,
//	drawer: drawerReducer,
//	onboarding: onboardingReducer,
//	cache: cacheReducer,
//	update: updateReducer,
export default combineReducers({
  journals: journalReducer,
  todos: todoReducer,
  user: userReducer,
  habits: habitReducer,
  form,
});
