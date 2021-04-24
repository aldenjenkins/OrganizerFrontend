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
        autoCapitalize="none"
        defaultValue={input.value}
      />
    </View>
  );
}

function LoginForm(props) {
  return (
    <ScrollView keyboardShouldPersistTaps={"never"}>
      <Text>Login</Text>
      <Field
        name={"username"}
        placeholder={"username"}
        component={MyTextInput}
      />
      <Field
        name={"password"}
        placeholder={"password"}
        component={MyTextInput}
      />
      <TouchableOpacity onPress={props.handleSubmit}>
        <Text style={{ backgroundColor: "blue" }}>Login!</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

export const ConnectedLoginForm = reduxForm({ form: "loginForm" })(LoginForm);
