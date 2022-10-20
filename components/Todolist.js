import React from "react";
import { StyleSheet, View, Text, Modal } from "react-native";
import { TouchableOpacity } from "react-native";
import colors from "../colors.js";
import TodoModal from "./TodoModal.js";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  MenuProvider,
} from "react-native-popup-menu";
import { Entypo  } from "@expo/vector-icons";

class TodoList extends React.Component {
  state = {
    showListVisisble: false,
  };
  toggleListModal() {
    this.setState({ showListVisisble: !this.state.showListVisisble });
  }
  render() {
    const list = this.props.list;
    const completedCount = list.todos.filter((todo) => todo.completed).length;
    const remainingCount = list.todos.length - completedCount;

    return (
      <MenuProvider>
        <View>
          <Modal
            animationType="slide"
            visible={this.state.showListVisisble}
            onRequestClose={() => this.toggleListModal()}
          >
            <TodoModal
              list={list}
              closeModal={() => this.toggleListModal()}
              updateList={this.props.updateList}
              delList = {this.props.delList}
            />
          </Modal>
          
          <TouchableOpacity
            onPress={() => this.toggleListModal()}
            style={[styles.listContainer, { backgroundColor: list.color }]}
          >
            <Text style={styles.listTitle} numberOfLines={1}>
              {list.name}
            </Text>
            <View>
              <View style={{ alignItems: "center" }}>
                <Text style={styles.count}>{completedCount}</Text>
                <Text style={styles.subtitle}>Completed</Text>
              </View>
              <View style={{ alignItems: "center" }}>
                <Text style={styles.count}>{remainingCount}</Text>
                <Text style={styles.subtitle}>Remaining</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </MenuProvider>
    );
  }
}
export default TodoList;

const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: 32,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginHorizontal: 5,
    alignItems: "center",
    width: 200,
  },
  listTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.white,
    marginBottom: 10,
  },
  count: {
    fontSize: 48,
    fontWeight: "200",
    color: colors.white,
  },
  subtitle: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.white,
  },
  menu: {
    alignItems: "flex-end",
    marginRight: 10,
    flex: 1,
  },
});
