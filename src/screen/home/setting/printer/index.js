import React, { Component } from "react";
import { Text, View, TouchableOpacity, Image, FlatList } from "react-native";
import { Navigation } from "react-native-navigation";
import ListItemView from "./listItem";
import { color, values, images } from "../../../../config";

import { inject, observer } from "mobx-react";

@inject("Setting")
@observer
export default class PrinterScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEnabled: false,
      discovering: false,
      devices: [],
      unpairedDevices: [],
      connected: false,
      section: 0
    };
    Navigation.events().bindComponent(this); // <== Will be automatically unregistered when unmounted
  }
  componentWillMount() {
    let { Setting } = this.props;
    console.log("componentWillMount: PrinterScreen");
    Setting.getListPrinter();
  }

  navigationButtonPressed({ buttonId }) {
    if (buttonId == "back") {
      Navigation.pop("PrinterScreen");
    }
  }
  clickItem = item => {
    this.editPrinter(item);
  };

  createPrinter = () => {
    Navigation.push("PrinterScreen", {
      component: {
        id: "CreatePrinter",
        name: "CreatePrinter",
        passProps: {
          text: "Pushed screen"
        },
        options: {
          topBar: {
            leftButtons: [
              {
                id: "back",
                color: "#fff",
                icon: images.ic_back
              }
            ],
            title: {
              text: "Tạo máy in",
              color: "#fff",
              alignment: "center",
              fontSize: values.nav.fontSize
            },
            rightButtons: [
              {
                text: "Lưu",
                id: "save",
                color: "#fff",
                fontSize: values.fontSizeTitle
              }
            ],
            visible: true,
            background: { color: color.mainColor }
          },
          statusBar: {
            style: "light"
          }
        }
      }
    });
  };

  editPrinter = item => {
    Navigation.push("PrinterScreen", {
      component: {
        id: "EditPrinter",
        name: "EditPrinter",
        passProps: {
          item: item
        },
        options: {
          topBar: {
            leftButtons: [
              {
                id: "back",
                color: "#fff",
                icon: images.ic_back
              }
            ],
            title: {
              text: "Sửa máy in",
              color: "#fff",
              alignment: "center",
              fontSize: values.nav.fontSize
            },
            rightButtons: [
              {
                id: "save",
                color: "#fff",
                text: "Lưu"
              }
            ],
            visible: true,
            background: { color: color.mainColor }
          }
        },
        statusBar: {
          style: "light"
        }
      }
    });
  };

  render() {
    let { Setting } = this.props;
    return (
      <View style={{ flex: 1, width: "100%" }}>
        <ListItemView data={Setting.listPrinter} clickItem={this.clickItem} />
        <TouchableOpacity
          onPress={this.createPrinter}
          style={{
            width: 50,
            height: 50,
            borderRadius: 25,
            bottom: values.bottomIphoneX + 15,
            right: 15,
            backgroundColor: color.mainColor,
            justifyContent: "center",
            alignItems: "center",
            position: "absolute"
          }}
        >
          <Image
            style={{
              width: 20,
              height: 20,
              tintColor: "#fff",
              resizeMode: "contain"
            }}
            source={images.ic_plus}
          />
        </TouchableOpacity>
      </View>
    );
  }
}
