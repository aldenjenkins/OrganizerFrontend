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
import { Text } from "./Themed";
import { reduxForm, Field, formValueSelector } from "redux-form";

import Colors from "../constants/Colors";
import axios from "axios";
import Markdown from "react-native-markdown-display";

import { connect } from "react-redux";
import { Container, Button } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { ConnectedLoginForm } from "./LoginForm";
import { ConnectedTodoEditForm } from "./TodoForm";

function MyTextInput(props) {
  const { input, meta, ...inputProps } = props;

  return (
    <TextInput
      {...inputProps}
      onChangeText={input.onChange}
      onBlur={input.onBlur}
      multiline={true}
      onFocus={input.onFocus}
      style={{ height: 200 }}
      defaultValue={input.value}
    />
  );
}

function HabitForm(props) {
  const { name } = props;
  return (
    <ScrollView keyboardShouldPersistTaps={"never"}>
      <Text>{props.mode === "edit" ? "Edit" : "Create"} Habit </Text>
      <Field
        name={"one_word_label"}
        placeholder={
          props.mode === "edit"
            ? props.options
              ? props.options.name
              : "Your Habit here"
            : "Your Habit Here"
        }
        value={
          props.mode === "edit" ? (props.options ? props.options.name : "") : ""
        }
        component={MyTextInput}
      />
      <Field
        name={"name"}
        placeholder={
          props.mode === "edit"
            ? props.options
              ? props.options.name_full
              : "one word label"
            : "one word label"
        }
        value={
          props.mode === "edit"
            ? props.options
              ? props.options.name_full
              : ""
            : ""
        }
        component={MyTextInput}
      />
      <Field
        name={"id"}
        component={TextInput}
        style={{ height: 0 }}
        placeholder={
          props.mode === "edit"
            ? props.options.id
              ? props.options.id.toString()
              : ""
            : ""
        }
      />
      <TouchableOpacity onPress={props.handleSubmit}>
        <Text style={{ backgroundColor: "blue" }}>Submit!</Text>
      </TouchableOpacity>
      <Markdown>{name}</Markdown>
    </ScrollView>
  );
}

HabitForm.propTypes = {
  mode: PropTypes.oneOf(["create", "edit"]),
  onSubmit: PropTypes.func,
};

var HabitEditForm = (props: object) => <HabitForm {...props} mode="edit" />;
var HabitCreationForm = (props: object) => (
  <HabitForm {...props} mode="create" />
);

HabitCreationForm = reduxForm({
  form: "createHabit",
})(HabitCreationForm);

HabitEditForm = reduxForm({ form: "habitJournal" })(HabitEditForm);

const editSelector = formValueSelector("editHabit"); // <-- same as form name
const createSelector = formValueSelector("createHabit"); // <-- same as form name

const mapEditStateToProps = (state) => {
  const name = editSelector(state, "name");
  console.log(name);
  return {
    name,
  };
};
const mapCreateStateToProps = (state) => {
  const name = createSelector(state, "name");
  console.log(name);
  return {
    name,
  };
};

export const ConnectedHabitCreationForm = connect(mapCreateStateToProps)(
  HabitCreationForm
);
export const ConnectedHabitEditForm = connect(mapEditStateToProps)(
  HabitEditForm
);
