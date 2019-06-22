import React, { Component } from "react";
import {
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  Keyboard
} from "react-native";
import { values, color, images } from "../config";

export default class EmailnputView extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let {
      placeholder,
      onChangeText,
      value,
      isShowCancel,
      onFocus,
      send
    } = this.props;
    return (
      <View
        style={{
          width: "100%",
          height: 40,
          backgroundColor: "transparent",
          flexDirection: "row"
        }}
      >
        <View
          style={[
            {
              flex: 1,
              borderRadius: 20,
              backgroundColor: "white",
              flexDirection: "row",
              alignItems: "center"
            },
            values.platform == "ios"
              ? {
                  shadowColor: "#000000",
                  shadowOffset: { width: 2, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 1
                }
              : { elevation: 5 }
          ]}
        >
          <TextInput
            ref={ref => (this.refs = ref)}
            underlineColorAndroid={"transparent"}
            placeholder={placeholder || ""}
            placeholderTextColor={color.colorText_nolected}
            style={{
              color: "#000",
              height: 40,
              paddingLeft: 10,
              fontSize: values.fontSizeNormal,
              flex: 1,
              backgroundColor: "transparent"
            }}
            onChangeText={text => onChangeText(text)}
            onFocus={onFocus}
            value={value}
          />
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={send}
            style={{
              width: 40,
              height: 40,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Image
              style={{
                width: 18,
                height: 18,
                tintColor: color.mainColor,
                resizeMode: "contain"
              }}
              source={images.ic_send}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
