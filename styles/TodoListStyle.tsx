import { StyleSheet } from "react-native";
import Colors from "../constants/Colors";

const baseTodo = {
  fontSize: 34,
  padding: 10,
  borderBottomColor: "black",
  borderBottomWidth: 5,
};
const styles = StyleSheet.create({
  todoIncomplete: {
    ...baseTodo,
    backgroundColor: Colors.todoIncomplete,
  },
  todoComplete: {
    ...baseTodo,
    backgroundColor: Colors.todoComplete,
  },
  createTodoButton: {
    margin: "0px auto",
  },
  modalToggle: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#f2f2f2",
    padding: 10,
    borderRadius: 10,
    alignSelf: "center",
  },
  modalClose: {
    marginTop: 20,
    marginBottom: 0,
  },
  modalContent: {
    flex: 1,
    flexDirection: "column",
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

export default styles;
