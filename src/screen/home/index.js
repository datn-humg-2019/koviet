import React, { Component } from "react";
import {
  Text,
  View,
  FlatList,
  Image,
  AppRegistry,
  TouchableOpacity,
  ImageBackground,
  ScrollView
} from "react-native";

import Carousel, { Pagination } from "react-native-snap-carousel";
import { values, color, fonts, screenId, images } from "../../config";
import Navbar from "./navbar";
import { Navigation } from "react-native-navigation";
import Orientation from "react-native-orientation";

import ItemHome from "./ItemHome";

import { inject, observer } from "mobx-react";
import { toJS } from "mobx";
import Loading from "../../component/Loading";
@inject("Home", "Product")
export default class HomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeSlide: 0,
      isLoading: false
    };
  }
  loading = () => {
    this.setState({ isLoading: true });
  };

  noLoad = () => {
    this.setState({ isLoading: false });
  };
  showScreen = (screen, rightButton) => {
    console.log(screen);
    Navigation.push("MainScreen", {
      component: {
        id: screen.id,
        name: screen.id,
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
              text: screen.title,
              color: "#fff",
              alignment: "center",
              fontSize: values.nav.fontSize
            },
            rightButtons: rightButton,
            visible: true,
            background: { color: color.mainColor }
          },
          statusBar: {
            style: "light",
            visible: true
          }
        }
      }
    });
  };
  componentWillMount() {
    // const initial = Orientation.getInitialOrientation();
    // if (initial === 'PORTRAIT') {
    //     Orientation.lockToPortrait()
    //     // do something
    // } else {
    //     Orientation.lockToPortrait()
    //     // do something else
    // }
  }

  componentDidMount() {
    const { Product } = this.props;
    Product.getDataStart();
  }

  componentWillUnmount() {
    // Orientation.unlockAllOrientations()
  }

  clickItem = value => {
    let { Product } = this.props;
    console.log(value);
    let rightButton = [];
    switch (value) {
      case screenId.HOME.item.sell.id:
        rightButton = [
          // {
          //   id: "extraInfo",
          //   color: "#fff",
          //   icon: images.ic_extraInfo
          // }
        ];

        // Product.getListProduct(name, code, dNhomMatHangId, page, (status) => {
        //     if (status) {
        //         this.noLoad()
        this.showScreen(screenId.HOME.item.sell, rightButton);
        //     }

        // })

        break;
      case screenId.HOME.item.sell_tablet.id:
        rightButton = [
          // {
          //   id: "extraInfo",
          //   color: "#fff",
          //   icon: images.ic_extraInfo
          // }
        ];
        // Product.getListProduct('token', (status) => {
        //     if (status) {
        //         this.noLoad()
        //         this.showScreen(screenId.HOME.item.sell_tablet, rightButton)
        //     }

        // })
        break;
      case screenId.HOME.item.bill.id:
        rightButton = [
          {
            id: "calendar",
            color: "#fff",
            icon: images.ic_calendar
          }
        ];
        this.showScreen(screenId.HOME.item.bill, rightButton);
        break;
      case screenId.HOME.item.product.id:
        this.showScreen(screenId.HOME.item.product, rightButton);
        break;

      default:
        // type.setting
        this.showScreen(screenId.HOME.item.setting, rightButton);
        break;
    }
  };

  render() {
    let { Home } = this.props;
    return (
      <View style={{ width: "100%", flex: 1, backgroundColor: "white" }}>
        <View
          style={{
            flex: 1,
            width: "100%",
            backgroundColor: color.HOME.bgColorHome,
            justifyContent: "flex-end"
          }}
        >
          <Image
            style={{ width: "100%",tintColor:color.mainColor, resizeMode: "repeat" }}
            source={images.bg_home}
          />
        </View>

        <ScrollView
          justifyContent={"center"}
          style={{
            height: "100%",
            width: "100%",
            position: "absolute"
          }}
        >
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 90
            }}
          >
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: values.isTablet ? 60 : 20
              }}
            >
              <ItemHome
                marginRight={values.isTablet ? 60 : 20}
                onPress={() =>
                  this.clickItem(
                    values.isTablet
                      ? screenId.HOME.item.sell_tablet.id
                      : screenId.HOME.item.sell.id
                  )
                }
                title={
                  values.isTablet
                    ? screenId.HOME.item.sell_tablet.title
                    : screenId.HOME.item.sell.title
                }
                image={images.ic_sell}
              />
              <ItemHome
                onPress={() => this.clickItem(screenId.HOME.item.bill.id)}
                title={screenId.HOME.item.bill.title}
                image={images.ic_bill}
              />
            </View>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <ItemHome
                marginRight={values.isTablet ? 60 : 20}
                onPress={() => this.clickItem(screenId.HOME.item.product.id)}
                title={screenId.HOME.item.product.title}
                image={images.ic_product}
              />
              <ItemHome
                onPress={() => this.clickItem(screenId.HOME.item.setting.id)}
                title={screenId.HOME.item.setting.title}
                image={images.ic_setting}
              />
            </View>
          </View>
        </ScrollView>
        <Loading isLoading={this.state.isLoading} title={""} />
      </View>
    );
  }
}
