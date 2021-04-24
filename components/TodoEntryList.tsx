import * as WebBrowser from "expo-web-browser";
import React from "react";
import { StyleSheet, FlatList, TouchableOpacity, TouchableHighlight } from "react-native";
import Markdown from "react-native-markdown-display";

import Colors from "../constants/Colors";
import { MonoText } from "./StyledText";
import { Button, Text, View } from "./Themed";

export default function TodoEntryList({ data }: { data: object }) {
	return (
		<View>
			<View>
				<Text style={styles.getStartedText} lightColor="rgba(0,0,0,0.8)" darkColor="rgba(255,255,255,0.8)">
					Change any of the text, save the file, and your app will automatically update.
				</Text>
			</View>

			<View>
				<TouchableOpacity onPress={handleHelpPress}>
					<Text style={styles.helpLinkText} lightColor={Colors.light.tint}>
						Tap here if your app doesn't automatically update after making changes
					</Text>
				</TouchableOpacity>
			</View>
			<View
				style={[styles.codeHighlightContainer, styles.homeScreenFilename]}
				darkColor="rgba(255,255,255,0.05)"
				lightColor="rgba(0,0,0,0.05)"
			>
				>
				<FlatList
					data={data}
					keyExtractor={({ id }, index) => id}
					renderItem={({ item }) => (
						<TouchableHighlight
							style={item.done_dt ? styles.todoComplete : styles.todoIncomplete}
							underlayColor={Colors.buttonBlue}
							onPress={handleTodoPress}
						>
							<Text style={styles.todoEntry}>{`\u2022 ${item.text}`}</Text>
						</TouchableHighlight>
					)}
				/>
			</View>
		</View>
	);
}

function handleHelpPress() {
	WebBrowser.openBrowserAsync(
		"https://docs.expo.io/get-started/create-a-new-app/#opening-the-app-on-your-phonetablet"
	);
}

function handleTodoPress(e) {
	console.log(e);
}

const baseTodo = {
	fontSize: 34,
	padding: 10,
	borderBottomColor: "black",
	borderBottomWidth: 5,
};

const styles = StyleSheet.create({
	todoEntry: {
		...baseTodo,
	},
	todoIncomplete: {
		...baseTodo,
		backgroundColor: Colors.todoIncomplete,
	},
	todoComplete: {
		...baseTodo,
		backgroundColor: Colors.todoComplete,
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
		color: "rgba(96,100,109, 0.8)",
	},
	codeHighlightContainer: {
		borderRadius: 3,

		paddingHorizontal: 4,
		backgroundColor: "#fff",
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
