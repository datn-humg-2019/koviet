import React, { Component } from "react";
import { Text, View, ActivityIndicator } from "react-native";

type PropsType = {
  backgroundColor?: string,
  backgroundColorChild?: string,
  colorLoading?: string,
  isLoading: boolean,
  title?: string
};
export default class Loading extends React.PureComponent<PropsType> {
  static defaultProps = {
    backgroundColor: "",
    backgroundColorChild: "",
    colorLoading: "",
    isLoading: false,
    title: ""
  };
  render() {
    const {
      backgroundColor,
      backgroundColorChild,
      colorLoading,
      isLoading,
      title
    } = this.props;

    return isLoading ? (
      <View
        style={{
          height: "100%",
          width: "100%",
          backgroundColor: backgroundColor ? backgroundColor : "#00000070",
          position: "absolute",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <View
          style={{
            minWidth: 80,
            height: 80,
            borderRadius: 10,
            backgroundColor: backgroundColorChild
              ? backgroundColorChild
              : "#ffffff",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <ActivityIndicator
            size="large"
            color={colorLoading ? colorLoading : "#000"}
          />
          {title ? (
            <Text
              style={{
                color: "#000",
                fontSize: 13,
                marginTop: 5,
                textAlign: "center",
                paddingHorizontal: 10
              }}
            >
              {title || ""}
            </Text>
          ) : null}
        </View>
      </View>
    ) : (
      <View />
    );
  }
}
