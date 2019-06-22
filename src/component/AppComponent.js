import React, { Component } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import Loading from "./Loading";

export default class AppComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    };
  }
  showLoading = () => {
    this.setState({
      isLoading: true
    });
  };

  hideLoading = () => {
    this.setState({
      isLoading: false
    });
  };


  render() {
    let { isLoading } = this.state;
    return (
      <View style={{ width: "100%", height: "100%" }}>
        {this.renderContent()}
        <Loading isLoading={isLoading} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewLoadding: {
    width: "100%",
    height: "100%",
    position: "absolute",
    backgroundColor: "#00000080",
    justifyContent: "center",
    alignContent: "center"
  }
});
