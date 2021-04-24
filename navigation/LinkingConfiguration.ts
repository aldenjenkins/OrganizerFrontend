import * as Linking from "expo-linking";

export default {
  prefixes: [Linking.makeUrl("/")],
  config: {
    screens: {
      Root: {
        screens: {
          Journals: {
            screens: {
              JournalScreen: "journals",
            },
          },
          Todos: {
            screens: {
              TodoScreen: "todos",
            },
          },
          Habits: {
            screens: {
              HabitScreen: "habits",
            },
          },
        },
      },
      NotFound: "*",
    },
  },
};
