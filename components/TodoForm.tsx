import React, { Component, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  ActivityIndicator,
  FlatList,
  TouchableHighlight,
  Modal,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import styles from "../styles/TodoListStyle";

import TodoEntryList from "./TodoEntryList";
//import { Text, View } from "../components/Themed";
import { Text } from "./Themed";
import { reduxForm, Field } from "redux-form";

import Colors from "../constants/Colors";
import axios from "axios";
import Markdown from "react-native-markdown-display";

import { connect } from "react-redux";
import { Container, Button } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

function MyTextInput(props) {
  const { input, meta, ...inputProps } = props;

  return (
    <View>
      <TextInput
        {...inputProps}
        onChangeText={input.onChange}
        onBlur={input.onBlur}
        onFocus={input.onFocus}
        style={{ height: 220 }}
        defaultValue={input.value}
      />
    </View>
  );
}

function TodoForm(props) {
  return (
    <ScrollView keyboardShouldPersistTaps={"never"}>
      <Text>{props.mode === "edit" ? "Edit" : "Create"} Todo </Text>
      <Field
        name={"text"}
        placeholder={
          props.mode === "edit"
            ? props.options
              ? props.options.text
              : "your todo here"
            : "your todo here"
        }
        value={
          props.mode === "edit" ? (props.options ? props.options.text : "") : ""
        }
        component={MyTextInput}
      />
      <Field
        name="id"
        type="hidden"
        style={{ height: 0 }}
        component={TextInput}
        placeholder={
          props.mode === "edit"
            ? props.options.id
              ? props.options.id.toString()
              : "0"
            : "0"
        }
      />
      <TouchableOpacity onPress={props.handleSubmit}>
        <Text style={{ backgroundColor: "blue" }}>Submit!</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

TodoForm.propTypes = {
  mode: PropTypes.oneOf(["create", "edit"]),
  onSubmit: PropTypes.func,
};

const TodoEditForm = (props: object) => <TodoForm {...props} mode="edit" />;
const TodoCreationForm = (props: object) => (
  <TodoForm {...props} mode="create" />
);

export const ConnectedTodoCreationForm = reduxForm({ form: "createTodo" })(
  TodoCreationForm
);

export const ConnectedTodoEditForm = reduxForm({ form: "editTodo" })(
  TodoEditForm
);
