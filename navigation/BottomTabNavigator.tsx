import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import JournalListScreen from "../screens/JournalListScreen";
import TodoListScreen from "../screens/TodoListScreen";
import HabitListScreen from "../screens/HabitListScreen";
import { BottomTabParamList, TabOneParamList, TabTwoParamList } from "../types";
import LogoutButton from "../components/LogoutButton";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator(props) {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
    >
      <BottomTab.Screen
        name="Journals"
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="journal-outline" color={color} />
          ),
        }}
      >
        {(props) => <TabOneNavigator {...props} />}
      </BottomTab.Screen>
      <BottomTab.Screen
        name="Todos"
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="list-outline" color={color} />
          ),
        }}
      >
        {(props) => <TabTwoNavigator {...props} />}
      </BottomTab.Screen>
      <BottomTab.Screen
        name="Habits"
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="bar-chart-outline" color={color} />
          ),
        }}
      >
        {(props) => <TabThreeNavigator {...props} />}
      </BottomTab.Screen>
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>["name"];
  color: string;
}) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator<TabOneParamList>();

function TabOneNavigator(props) {
  console.log(props);
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="JournalScreen"
        component={JournalListScreen}
        options={{
          headerTitle: "Journals",
          headerRight: () => <LogoutButton {...props} />,
        }}
      />
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator(props) {
  console.log(props);
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="TodoScreen"
        component={TodoListScreen}
        options={{
          headerTitle: "Todo Entries",
          headerRight: () => <LogoutButton {...props} />,
        }}
      />
    </TabTwoStack.Navigator>
  );
}

const TabThreeStack = createStackNavigator<TabThreeParamList>();

function TabThreeNavigator(props) {
  return (
    <TabThreeStack.Navigator>
      <TabThreeStack.Screen
        name="HabitScreen"
        component={HabitListScreen}
        options={{
          headerTitle: "Habit Entries",
          headerRight: (props) => <LogoutButton {...props} />,
        }}
      />
    </TabThreeStack.Navigator>
  );
}
