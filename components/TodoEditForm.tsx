import React, { Component, useEffect, useState } from "react";
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
        value={input.value}
      />
    </View>
  );
}

function TodoForm(props) {
  return (
    <ScrollView keyboardShouldPersistTaps={"handled"}>
      <Text>Todo</Text>
      <Field
        name={"text"}
        placeholder={"your todo here"}
        component={MyTextInput}
      />
      <TouchableOpacity onPress={props.handleSubmit}>
        <Text style={{ backgroundColor: "blue" }}>Submit!</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

export const ConnectedTodoEditForm = reduxForm({ form: "editTodo" })(
  TodoCreationForm
);
