import React, { Component } from "react";
import { Text, View, Alert, Image, TouchableOpacity } from "react-native";
import { values, color, screenId, images } from "../../../config";
import { Navigation } from "react-native-navigation";
import { goAuth } from "../../../../App";
import { get } from "lodash";
import { inject, observer } from "mobx-react";
@inject("User")
@observer
export default class ProfileScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    Navigation.events().bindComponent(this); // <== Will be automatically unregistered when unmounted
  }

  navigationButtonPressed({ buttonId }) {
    // will be called when "buttonOne" is clicked
    if (buttonId == "close") {
      this.dismissModal();
    }
  }

  dismissModal = () => {
    Navigation.dismissModal("ProfileScreen");
  };

  componentWillMount() {
    Navigation.mergeOptions("ProfileScreen", {
      topBar: {
        leftButtons: [
          {
            id: "close",
            color: "#fff",
            icon: images.ic_close
          }
        ],

        title: {
          text: screenId.INFO.title,
          color: "#fff",
          alignment: "center",
          fontSize: values.nav.fontSize
        },
        visible: true,
        background: { color: color.mainColor }
      },
      statusBar: {
        style: "light",
        visible: true
      }
    });
  }

  logout = () => {
    let { User } = this.props;
    const self = this;
    Alert.alert("Đăng xuất", "Bạn thực sự muốn đăng xuất khỏi tài khoản này?", [
      {
        text: "Huỷ",
        onPress: () => {
          console.log("huỷ đăng xuất");
        },
        style: "cancel"
      },
      {
        text: "Đồng ý",
        onPress: () => {
          self.dismissModal();
          User.logout();
        },
        style: "destructive"
      }
    ]);
  };

  render() {
    let { User } = this.props;
    let width = values.deviceWidth / 3.5 < 100 ? values.deviceWidth / 3.5 : 100;
    return (
      <View
        style={{
          width: "100%",
          flex: 1,
          backgroundColor: "#fff",
          paddingTop: values.marginTopScreen,
          alignItems: "center"
        }}
      >
        <View style={{ width: "100%", alignItems: "center", flex: 1 }}>
          <View
            style={{
              width: width,
              height: width,
              borderRadius: 20,
              overflow: "hidden",
              borderWidth: 1,
              borderColor: "#ffffff"
            }}
          >
            <Image
              style={{ width: width, height: width }}
              source={
                User.userInfo && User.userInfo.avatar
                  ? { uri: User.userInfo.avatar }
                  : images.ic_user_info
              }
            />
          </View>
          <Text style={{ fontSize: 20, fontWeight: "500", marginVertical: 7 }}>
            {(get(User, "userInfo") && get(User, "userInfo.name")) || ""}
          </Text>
          <View
            style={{
              borderRadius: 10,
              borderWidth: 1,
              borderColor: color.mainColor
            }}
          >
            <Text
              style={{
                fontSize: values.fontSizeNormal,
                paddingHorizontal: 10,
                paddingVertical: 3,
                color: color.mainColor
              }}
            >
              {(get(User, "userInfo") && get(User, "userInfo.role")) || ""}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={this.logout}
          style={{
            flexDirection: "row",
            height: 40,
            marginBottom: values.marginTopScreen,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Image
            style={{
              width: 17,
              height: 17,
              marginRight: 5,
              resizeMode: "contain",
              tintColor: "#DC0000"
            }}
            source={images.ic_logout}
          />
          <Text style={{ fontSize: values.fontSizeTitle, color: "#DC0000" }}>
            {"Đăng xuất"}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
