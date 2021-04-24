import React, { Component, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  TouchableHighlight,
  Platform,
  Modal,
  View,
  RefreshControl,
  TextInput,
  ScrollView,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import TodoEntryList from "../components/TodoEntryList";
//import { Text, View } from "../components/Themed";
import { Text } from "../components/Themed";
import { reduxForm, Field } from "redux-form";
import SplashLoading from "../components/SplashLoading";
import moment, { isMoment } from "moment";

import {
  reloadHabitCompletions,
  reloadHabits,
  editHabit,
  createHabit,
  switchHabitEditModalOpen,
  completeHabitCompletion,
  switchHabitCreationModalOpen,
  habitDateChange,
  deleteHabit,
} from "../redux/actions";
import axios from "axios";
import Markdown from "react-native-markdown-display";
import styles from "../styles/TodoListStyle";
import Colors from "../constants/Colors";

import { connect } from "react-redux";
import { Container, Button } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { format } from "date-fns";
import {
  ConnectedHabitCreationForm,
  ConnectedHabitEditForm,
} from "../components/HabitForm";
import SimplerDatePicker from "@cawfree/react-native-simpler-date-picker";

class HabitListScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      gettingMore: false,
      dateModalOpen: false,
    };
  }
  componentDidMount() {
    this.props.reloadHabits();
    this.props.reloadHabitCompletions();
  }
  onRefresh = async () => {
    this.setState({ refreshing: true });
    await this.props.reloadHabitCompletions();
    this.setState({ refreshing: false });
  };
  render() {
    const {
      habitCompletions,
      editHabit,
      habitEditFormObject,
      createModalOpen,
      editModalOpen,
      reloadHabitCompletions,
      switchCreateModal,
      switchEditModal,
      completeHabitCompletion,
      selectedDate,
      isFetched,
      habits,
      deleteHabit,
      habitDateChange,
      createHabit,
      navigation,
    } = this.props;
    let isPhone = Platform.OS === "ios" || Platform.OS === "android";
    if (!isFetched && this.state.refreshing)
      return (
        <SafeAreaView>
          <SplashLoading />
        </SafeAreaView>
      );
    return (
      <SafeAreaView
        style={styles.container}
        darkColor="rgba(255,255,255,0.05)"
        lightColor="rgba(0,0,0,0.05)"
      >
        <Modal visible={createModalOpen} animationType="slide">
          <SafeAreaView style={styles.modalContent}>
            <MaterialIcons
              name="close"
              size={24}
              onPress={() => {
                switchCreateModal();
              }}
            />
            <ConnectedHabitCreationForm onSubmit={createHabit} />
          </SafeAreaView>
        </Modal>
        <Modal visible={editModalOpen} animationType="slide">
          <SafeAreaView style={styles.modalContent}>
            <MaterialIcons
              name="close"
              size={24}
              onPress={() => {
                switchEditModal({});
              }}
            />
            <ConnectedHabitEditForm
              onSubmit={(formVals) => {
                editHabit(formVals);
                switchEditModal();
              }}
              options={habitEditFormObject}
              initialValues={habitEditFormObject}
            />
            <Button
              onPress={() => {
                deleteHabit(habitEditFormObject.id);
              }}
              title="Delete Habit"
            >
              <Text>Delete Habit</Text>
            </Button>
          </SafeAreaView>
        </Modal>
        {(isPhone && (
          <>
            <MaterialIcons
              name="timer"
              size={30}
              onPress={() => {
                this.setState({ dateModalOpen: true });
              }}
            />
            <Modal visible={this.state.dateModalOpen} animationType="slide">
              <SafeAreaView style={styles.modalContent}>
                <MaterialIcons
                  name="close"
                  size={24}
                  onPress={() => {
                    this.setState({ dateModalOpen: false });
                  }}
                />
                <SimplerDatePicker
                  maxDate={moment()}
                  date={moment(selectedDate)}
                  onDatePicked={(newDate) => {
                    if (newDate) {
                      habitDateChange(newDate);
                      reloadHabitCompletions();
                      reloadHabits();
                    }
                  }}
                />
              </SafeAreaView>
            </Modal>
          </>
        )) || (
          <SimplerDatePicker
            maxDate={moment()}
            date={moment(selectedDate)}
            onDatePicked={(newDate) => {
              if (newDate) {
                habitDateChange(newDate);
                reloadHabitCompletions();
                reloadHabits();
              }
            }}
          />
        )}
        <MaterialIcons
          name="add"
          size={24}
          onPress={() => {
            switchCreateModal();
          }}
        />
        <FlatList
          data={habitCompletions}
          style={{ width: "100%" }}
          keyExtractor={(item, index) => item.id.toString()}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
            />
          }
          renderItem={({ item }) => (
            <TouchableHighlight
              style={
                item.did_complete ? styles.todoComplete : styles.todoIncomplete
              }
              underlayColor={Colors.buttonBlue}
              onPress={() => completeHabitCompletion(item)}
              onLongPress={() =>
                switchEditModal(habits.find((habit) => habit.id === item.habit))
              }
              delayLongPress={500}
            >
              <Text>{`\u2022 ${item.name_full}`}</Text>
            </TouchableHighlight>
          )}
        />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => ({
  habitCompletions: state.habits.habitCompletions,
  habitEditFormObject: state.habits.habitEditFormObject,
  createModalOpen: state.habits.habitCreationModalOpen,
  habits: state.habits.habits,
  editModalOpen: state.habits.habitEditModalOpen,
  editModalObject: state.habits.editModalObject,
  selectedDate: state.habits.selectedDate,
  isFetched: state.habits.isFetched,
});
const mapDispatchToProps = (dispatch) => {
  return {
    completeHabitCompletion: (id) => dispatch(completeHabitCompletion(id)),
    editHabit: (formVals) => dispatch(editHabit(formVals)),
    reloadHabitCompletions: () => dispatch(reloadHabitCompletions()),
    reloadHabits: () => dispatch(reloadHabits()),
    deleteHabit: (id) => dispatch(deleteHabit(id)),
    switchCreateModal: () => dispatch(switchHabitCreationModalOpen()),
    switchEditModal: (obj) => dispatch(switchHabitEditModalOpen(obj)),
    habitDateChange: (selectedDate) => dispatch(habitDateChange(selectedDate)),
    createHabit: (values) => dispatch(createHabit(values)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(HabitListScreen);
