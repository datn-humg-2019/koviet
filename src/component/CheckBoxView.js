import React from "react";
import { Text, TouchableOpacity, Image, View, StyleSheet } from "react-native";
import { color, images, values } from "../config";

type PropsType = { onPress: Function, isCheck: Boolean };
export default class CheckBoxView extends React.PureComponent<PropsType> {
  render() {
    const { onPress, isCheck, title } = this.props;
    return (
      <TouchableOpacity activeOpacity={1} onPress={onPress} style={styles.btn}>
        {!isCheck ? (
          <View style={styles.cb1} />
        ) : (
          <View style={styles.cb2}>
            <Image style={styles.img1} source={images.ic_tick} />
          </View>
        )}
        <Text style={styles.text}>{title}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  btn: {
    flexDirection: "row",
    width: "100%",
    backgroundColor: "transparent",
    alignItems: "center",
    paddingVertical: 15
    // justifyContent: 'center'
  },
  text: {
    fontSize: values.fontSizeNormal,
    flex: 1,
    color: "black",
    paddingLeft: 10
  },
  img1: {
    width: 13,
    resizeMode: "contain",
    tintColor: color.mainColor
  },
  cb2: {
    width: 20,
    height: 20,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: color.mainColor
  },
  cb1: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: color.borderColor
  }
});
