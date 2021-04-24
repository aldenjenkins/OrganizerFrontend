import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, View } from "react-native";
import { logout } from "../redux/actions";

class LogoutButton extends Component {
  render() {
    const { logout, navigation } = this.props;
    console.log(this.props);
    return (
      <View>
        <Button onPress={logout} title="Logout"></Button>
      </View>
    );
  }
}

export default connect(null, { logout })(LogoutButton);
