import React, { Component, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Button,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  Modal,
  TouchableHighlight,
} from "react-native";
import Colors from "../constants/Colors";
import Markdown from "react-native-markdown-display";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import SplashLoading from "../components/SplashLoading";

import EditScreenInfo from "../components/EditScreenInfo";
import JournalEntryList from "../components/JournalEntryList";
import { Text } from "../components/Themed";
import { View } from "native-base";
import axios from "axios";
import {
  readJournal,
  reloadJournals,
  editJournal,
  switchJournalCreationModalOpen,
  switchJournalEditModalOpen,
  createJournal,
  deleteJournal,
} from "../redux/actions";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  ConnectedJournalCreationForm,
  ConnectedJournalEditForm,
} from "../components/JournalForm";

class JournalListScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      gettingMore: false,
    };
  }
  componentDidMount() {
    this.props.reloadJournals();
  }
  onRefresh = async () => {
    const { reloadJournals } = this.props;
    this.setState({ refreshing: true });
    await reloadJournals();
    this.setState({ refreshing: false });
  };

  render() {
    const {
      journals,
      switchEditModal,
      editModalOpen,
      createModalOpen,
      createJournal,
      editJournal,
      isFetched,
      deleteJournal,
      switchCreateModal,
      journalFormObject,
    } = this.props;
    if (!isFetched && this.state.refreshing)
      return (
        <SafeAreaView>
          <SplashLoading />
        </SafeAreaView>
      );

    return (
      <SafeAreaView style={styles.container}>
        <Modal visible={createModalOpen} animationType="slide">
          <SafeAreaView style={styles.modalContent}>
            <MaterialIcons
              name="close"
              size={24}
              onPress={() => {
                switchCreateModal();
              }}
            />
            <ConnectedJournalCreationForm onSubmit={createJournal} />
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
            <ConnectedJournalEditForm
              onSubmit={editJournal}
              options={journalFormObject}
              initialValues={journalFormObject}
            />
            <Button
              onPress={() => {
                deleteJournal(journalFormObject.id);
              }}
              title="Delete Journal"
            ></Button>
            <Button
              onPress={() => {
                editJournal({
                  read_dt: new Date().toJSON(),
                  id: journalFormObject.id,
                });
              }}
              title="Read Journal"
            ></Button>
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
          data={journals}
          keyExtractor={(item) => item.id.toString()}
          style={{ width: "100%" }}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
            />
          }
          renderItem={({ item }) => (
            <TouchableHighlight
              style={item.read_dt ? styles.journalRead : styles.journalUnread}
              underlayColor={Colors.buttonBlue}
              onPress={() => switchEditModal(item)}
            >
              <View>
                <Text>{item.created}</Text>
                <Text>{item.id}</Text>
                <Markdown>{item.text}</Markdown>
              </View>
            </TouchableHighlight>
          )}
        />
      </SafeAreaView>
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

const baseEntry = {
  fontSize: 34,
  padding: 10,
  borderBottomColor: "black",
  borderBottomWidth: 5,
};

const styles = StyleSheet.create({
  journalEntry: {
    ...baseEntry,
  },
  journalUnread: {
    ...baseEntry,
    //backgroundColor: Colors.journalUnread,
    backgroundColor: "#F00",
  },
  journalRead: {
    ...baseEntry,
    //backgroundColor: Colors.journalRead,
    backgroundColor: "#0F0",
  },
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
  journals: state.journals.journals,
  isFetched: state.journals.isFetched,
  createModalOpen: state.journals.journalCreationModalOpen,
  editModalOpen: state.journals.journalEditModalOpen,
  journalFormObject: state.journals.journalEditFormObject,
});
const mapDispatchToProps = (dispatch: any) => {
  return {
    readJournal: (id: number) => dispatch(readJournal(id)),
    reloadJournals: () => dispatch(reloadJournals()),
    deleteJournal: (id) => dispatch(deleteJournal(id)),
    switchCreateModal: () => dispatch(switchJournalCreationModalOpen()),
    switchEditModal: (journalObject) =>
      dispatch(switchJournalEditModalOpen(journalObject)),
    createJournal: (values) => dispatch(createJournal(values)),
    editJournal: (itemData) => dispatch(editJournal(itemData)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(JournalListScreen);
