import React, { Component, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  TouchableHighlight,
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

import {
  reloadTodos,
  createTodo,
  switchTodoCreationModalOpen,
  switchTodoEditModalOpen,
  editTodo,
  deleteTodo,
} from "../redux/actions";
import axios from "axios";
import Markdown from "react-native-markdown-display";
import styles from "../styles/TodoListStyle";
import Colors from "../constants/Colors";

import { connect } from "react-redux";
import { Container, Button } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import {
  ConnectedTodoCreationForm,
  ConnectedTodoEditForm,
} from "../components/TodoForm";

class TodoListScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      gettingMore: false,
    };
  }
  componentDidMount() {
    this.props.reloadTodos();
  }
  onRefresh = async () => {
    const { reloadTodos } = this.props;
    this.setState({ refreshing: true });
    await reloadTodos();
    this.setState({ refreshing: false });
  };
  render() {
    const {
      todos,
      createModalOpen,
      switchCreateModal,
      editModalOpen,
      switchEditModal,
      isFetched,
      deleteTodo,
      todoFormObject,
      createTodo,
      editTodo,
      navigation,
    } = this.props;
    console.log(todoFormObject);
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
            <ConnectedTodoCreationForm onSubmit={createTodo} />
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
            <ConnectedTodoEditForm
              onSubmit={editTodo}
              options={todoFormObject}
              initialValues={todoFormObject}
            />
            <Button
              primary
              onPress={() => {
                deleteTodo(todoFormObject.id);
                // navigation.navigate("Edit Todo", {
                //   todoId: item.id,
                // });
              }}
              title="Delete Todo"
            >
              <Text>Delete Todo</Text>
            </Button>
            <Button
              primary
              onPress={() => {
                editTodo({
                  done_dt: new Date().toJSON(),
                  id: todoFormObject.id,
                });
                // navigation.navigate("Edit Todo", {
                //   todoId: item.id,
                // });
              }}
              title="Complete Todo"
            >
              <Text>Complete Todo</Text>
            </Button>
          </SafeAreaView>
        </Modal>

        <MaterialIcons
          name="add"
          size={24}
          onPress={() => {
            switchCreateModal();
          }}
        />

        <FlatList
          data={todos}
          keyExtractor={(item, index) => item.id.toString()}
          style={{ width: "100%" }}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
            />
          }
          renderItem={({ item }) => (
            <View>
              <TouchableHighlight
                style={
                  item.done_dt ? styles.todoComplete : styles.todoIncomplete
                }
                underlayColor={Colors.buttonBlue}
                onPress={() => switchEditModal(item)}
              >
                <Text>{`\u2022 ${item.text}`}</Text>
              </TouchableHighlight>
            </View>
          )}
        />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => ({
  todos: state.todos.todos,
  createModalOpen: state.todos.todoCreationModalOpen,
  isFetched: state.todos.isFetched,
  editModalOpen: state.todos.todoEditModalOpen,
  todoFormObject: state.todos.todoEditFormObject,
});
const mapDispatchToProps = (dispatch) => {
  return {
    completeTodo: (id) => dispatch(completeTodo(id)),
    reloadTodos: () => dispatch(reloadTodos()),
    deleteTodo: (id) => dispatch(deleteTodo(id)),
    reloadTodos: () => dispatch(reloadTodos()),
    switchCreateModal: () => dispatch(switchTodoCreationModalOpen()),
    switchEditModal: (todoObject) =>
      dispatch(switchTodoEditModalOpen(todoObject)),
    createTodo: (values) => dispatch(createTodo(values)),
    editTodo: (itemData) => dispatch(editTodo(itemData)),
    //switchEditModal: (id) => dispatch(switchTodoEditModal(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TodoListScreen);
