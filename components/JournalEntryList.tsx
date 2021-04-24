import * as WebBrowser from "expo-web-browser";
import React from "react";
import {
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import Markdown from "react-native-markdown-display";

import Colors from "../constants/Colors";
import { MonoText } from "./StyledText";
import { Text, View } from "./Themed";
import JournalEntry from "./JournalEntry";

export default function JournalEntryList({ data }: { data: object }) {
  return (
    <View
      style={[styles.codeHighlightContainer, styles.homeScreenFilename]}
      darkColor="rgba(255,255,255,0.05)"
      lightColor="rgba(0,0,0,0.05)"
    >
      <FlatList
        data={data}
        keyExtractor={({ id }, index) => id}
        renderItem={({ item }) => (
          <TouchableHighlight
            style={item.read_dt ? styles.journalRead : styles.journalUnread}
            underlayColor={Colors.buttonBlue}
            onPress={readJournal}
          >
            <>
              <Text>{Date(item.created)}</Text>
              <Markdown>{item.text}</Markdown>
            </>
          </TouchableHighlight>
        )}
      />
    </View>
  );
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    "https://docs.expo.io/get-started/create-a-new-app/#opening-the-app-on-your-phonetablet"
  );
}

function handleJournalPress() {
  console.log("pressed");
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
    backgroundColor: Colors.journalRead,
  },
  journalRead: {
    ...baseEntry,
    backgroundColor: Colors.journalUnread,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  developmentModeText: {
    marginBottom: 20,
    fontSize: 14,
    lineHeight: 19,
    textAlign: "center",
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: "contain",
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
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
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: "center",
  },
  helpContainer: {
    marginTop: 15,
    marginHorizontal: 20,
    alignItems: "center",
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    textAlign: "center",
  },
});
