import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity
} from "react-native";
import { color, values, images } from "../config";
import { noop } from "lodash";

type PropsType = {
  editable?: boolean,
  isScan?: boolean,
  keyboardType?: string,
  onChangeText?: Function,
  onPress?: Function,
  placeholder?: string,
  title?: string,
  type?: string,
  value: string
};
export default class EnterTextView extends React.PureComponent<PropsType> {
  static defaultProps = {
    editable: true,
    isScan: false,
    keyboardType: "default",
    onChangeText: noop,
    onPress: noop,
    placeholder: "",
    title: "",
    type: ""
  };

  render() {
    const {
      editable,
      isScan,
      keyboardType,
      onChangeText,
      onPress,
      placeholder,
      title,
      type,
      value
    } = this.props;
    console.log("value: ", value);
    return (
      <View style={styles.main}>
        <Text style={styles.title}>{title}</Text>
        <View style={[styles.content, styles.shadow]}>
          <TextInput
            editable={editable}
            underlineColorAndroid={"transparent"}
            placeholder={placeholder}
            placeholderTextColor="#00000034"
            value={value + ""}
            keyboardType={keyboardType}
            onChangeText={text => {
              onChangeText(type, text);
            }}
            style={styles.textInput}
          />
          {isScan && (
            <TouchableOpacity onPress={onPress} style={styles.button}>
              <Image source={images.ic_scanner} style={styles.images} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  images: { width: 20, resizeMode: "contain" },
  button: {
    height: "100%",
    width: 40,
    justifyContent: "center",
    alignItems: "center"
  },
  textInput: {
    flex: 1,
    height: "100%",
    fontSize: values.fontSizeNormal,
    paddingLeft: 10,
    color: "#000"
  },
  content: {
    width: "100%",
    flexDirection: "row",
    backgroundColor: "#fff",
    height: 40,
    borderRadius: 7
  },
  title: {
    fontSize: values.fontSizeTitle,
    color: "#000",
    marginBottom: 5
  },
  main: { width: "100%", marginTop: 15, paddingHorizontal: 15 },
  text: {
    flex: 1,
    paddingHorizontal: 10,
    fontSize: values.fontSizeTitle,
    color: "#000"
  },
  viewGreen: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: color.mainColor
  },
  buttonParent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginTop: 15
  },
  shadow:
    values.platform == "ios"
      ? {
          shadowColor: "#000000",
          shadowOffset: { width: 2, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4
        }
      : { elevation: 5 }
});
