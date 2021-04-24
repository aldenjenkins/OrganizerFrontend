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

function JournalForm(props) {
  const { text } = props;
  return (
    <ScrollView keyboardShouldPersistTaps={"never"}>
      <Text>{props.mode === "edit" ? "Edit" : "Create"} Journal </Text>
      <Field
        name={"text"}
        placeholder={
          props.mode === "edit"
            ? props.options
              ? props.options.text
              : "Your Journal here"
            : "Your Journal Here"
        }
        value={
          props.mode === "edit" ? (props.options ? props.options.text : "") : ""
        }
        component={MyTextInput}
      />
      <Field
        name="id"
        type="hidden"
        component={TextInput}
        style={{ height: 0 }}
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
      <Markdown>{text}</Markdown>
    </ScrollView>
  );
}

JournalForm.propTypes = {
  mode: PropTypes.oneOf(["create", "edit"]),
  onSubmit: PropTypes.func,
};

var JournalEditForm = (props: object) => <JournalForm {...props} mode="edit" />;
var JournalCreationForm = (props: object) => (
  <JournalForm {...props} mode="create" />
);

JournalCreationForm = reduxForm({
  form: "createJournal",
})(JournalCreationForm);

JournalEditForm = reduxForm({ form: "editJournal" })(JournalEditForm);

const editSelector = formValueSelector("editJournal"); // <-- same as form name
const createSelector = formValueSelector("createJournal"); // <-- same as form name

const mapEditStateToProps = (state) => {
  const text = editSelector(state, "text");
  console.log(text);
  return {
    text,
  };
};
const mapCreateStateToProps = (state) => {
  const text = createSelector(state, "text");
  console.log(text);
  return {
    text,
  };
};

export const ConnectedJournalCreationForm = connect(mapCreateStateToProps)(
  JournalCreationForm
);
export const ConnectedJournalEditForm = connect(mapEditStateToProps)(
  JournalEditForm
);
