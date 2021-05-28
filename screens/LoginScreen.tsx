import React, { Component, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import Colors from "../constants/Colors";
import Markdown from "react-native-markdown-display";

import EditScreenInfo from "../components/EditScreenInfo";
import JournalEntryList from "../components/JournalEntryList";
import { Text } from "../components/Themed";
import { View } from "native-base";
import axios from "axios";
import { login } from "../redux/actions";
import { ConnectedLoginForm } from "../components/LoginForm";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { TextInput } from "react-native-gesture-handler";
import autoMergeLevel1 from "redux-persist/es/stateReconciler/autoMergeLevel1";

class LoginScreen extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     token: false,
  //     todos: this.props.todos,
  //     //	journals: this.props.journals,
  //     //	//locked: this.props.home_location ? this.props.home_location.locked : true,
  //   };
  //   //this.readJournal = this.readJournal.bind(this);
  // }

  //async readJournal(args) {
  //	const { localPostPage, index, deleteLocalPost, navigation, token } = this.props;
  //	if (localPostPage) navigation.goBack();
  //	const patch_data = {
  //		id: journalID,
  //		read_dt: new Date().toJSON(),
  //	};
  //	deleteLocalPost({ postId: args.postId, index: args.index, token });
  //}

  render() {
    const { login, navigation } = this.props;
    return (
      <View style={styles.container}>
        <View
          style={[styles.codeHighlightContainer, styles.homeScreenFilename]}
          darkColor="rgba(255,255,255,0.05)"
          lightColor="rgba(0,0,0,0.05)"
        >
          <ConnectedLoginForm onSubmit={login} />
        </View>
      </View>
    );
  }

  //  return (
  //    <View style={styles.container}>
  //      <Text style={styles.title}>Tab One</Text>
  //      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
  //      <EditScreenInfo path="/screens/TabOneScreen.tsx" />
  //    </View>
  //  );
}

const styles = StyleSheet.create({
  codeHighlightText: {
    margin: "0px auto",
    color: "rgba(96,100,109, 0.8)",
  },
  codeHighlightContainer: {
    backgroundColor: "#fff",
    fontSize: 15,
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    margin: "20%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});

//const mapDispatchToProps = (dispatch) =>
//	bindActionCreators(
//		{
//			readJournal,
//		},
//		dispatch
//	);
//export default connect(mapStateToProps, mapDispatchToProps)(TabOneScreen);
const mapStateToProps = (state: object) => ({
  username: state.user.username,
  password: state.user.password,
});
const mapDispatchToProps = (dispatch: any) => {
  return {
    login: (username, password) => dispatch(login(username, password)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
