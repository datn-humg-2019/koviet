import React, { Component } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Keyboard,
  FlatList,
  DeviceEventEmitter
} from "react-native";
import { Navigation } from "react-native-navigation";
import { values, color, images, config } from "../../../../../config";
import ButtonGradient from "../../../../../component/ButtonGradient";
import EnterTextView from "../../../../../component/EnterTextView";
import ChooseImageView from "./ChooseImage";
import { _alertForPhotosAndCameraPermission } from "../../../../../utils/Func";

const typeTextInput = {
  name: 0,
  price_sale: 1,
  price_origin: 2,
  count: 5,
};
var ImagePicker = require("react-native-image-picker");
var options = {
  title: "Chọn ảnh",
  takePhotoButtonTitle: "Chụp ảnh",
  chooseFromLibraryButtonTitle: "Chọn ảnh từ thư viện",
  cancelButtonTitle: "Huỷ",
  cameraType: "back", //'front',
  allowsEditing: true,
  maxWidth: 300,
  maxHeight: 300,
  quality: 1,
  didCancel: "Bạn đã huỷ chọn ảnh",
  error: "Có lỗi xảy ra!!!",

  customButtons: [],
  storageOptions: {
    skipBackup: true
  }
};
import { inject, observer } from "mobx-react";
import { toJS } from "mobx";
import ListItemView from "./listItem";
import SimpleToast from "react-native-simple-toast";

@inject("OnApp", "Product")
@observer
export default class CreateItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      showModal: false,
      itemGroup: null,
      price_sale: "",
      price_origin: "",
      count: "",
      images: []
    };

    Navigation.events().bindComponent(this); // <== Will be automatically unregistered when unmounted
  }
  componentWillMount() {}

  navigationButtonPressed({ buttonId }) {
    if (buttonId == "back") {
      this.goBack();
    } else if (buttonId == "save") {
      this.createProduct();
    }
  }

  componentDidMount = () => {};

  goBack = () => {
    Navigation.pop("CreateItem");
  };

  setProduct = () => {
    Navigation.push("CreateGroupItem", {
      component: {
        id: "SetProductScreen",
        name: "SetProductScreen",
        passProps: {
          // type: { status: 'product', title: 'Mặt hàng' }
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
              text: "Gán hàng vào danh mục",
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
          },
          statusBar: {
            style: "light"
          }
        }
      }
    });
  };

  chooseItemGroup = () => {
    let { Product } = this.props;
    if (
      this.props.prevScreen &&
      this.props.prevScreen == config.prevScreen.group
    ) {
      SimpleToast.show("Bạn không thể chọn nhóm hàng ở trong chế độ này");
    } else {
      if (toJS(Product.listGroupProduct).length > 0) {
        this.showModalGroup();
      } else {
        Product.getAllGroupProduct(status => {
          this.showModalGroup();
        });
      }
    }
  };

  showModalGroup = () => {
    this.setState({ showModal: true });
  };

  dismissModalGroup = () => {
    this.setState({ showModal: false });
  };

  checkValue = () => {
    let check = false;
    const { name, price_origin, price_sale, count, itemGroup } = this.state;
    if (name.trim != "") {
      if (price_origin.trim() != "") {
        if (price_sale.trim() != "") {
          if (count.trim() != "") {
            if (itemGroup) {
              check = true;
            } else {
              SimpleToast.show("Bạn cần chọn nhóm sản phẩm");
            }
          } else {
            SimpleToast.show("Bạn cần nhập số lượng");
          }
        } else {
          SimpleToast.show("Bạn cần nhập giá bán ra");
        }
      } else {
        SimpleToast.show("Bạn cần nhập giá nhập vào");
      }
    } else {
      SimpleToast.show("Bạn cần nhập tên mặt hàng");
    }
    return check;
  };

  createProduct = () => {
    const self = this;
    const { Product } = this.props;
    const {
      name,
      itemGroup,
      price_sale,
      price_origin,
      count,
      images
    } = self.state;
    if (self.checkValue()) {
      Product.createProductWarehouse(
        name,
        itemGroup.id,
        count,
        price_origin,
        price_sale,
        images,
        status => {
          if (status) {
            Product.getAllProduct("", "", "", status => {
              if (status) {
                self.goBack();
              }
            });
          }
        }
      );
    }
  };

  onChangeText = (type, text) => {
    switch (type) {
      case typeTextInput.name:
        this.setState({ name: text });
        break;
      case typeTextInput.price_sale:
        this.setState({ price_sale: text });
        break;
      case typeTextInput.price_origin:
        this.setState({ price_origin: text });
        break;
      case typeTextInput.count:
        this.setState({ count: text });
        break;

      default:
        break;
    }
  };

  showScanQR = () => {
    Navigation.push("CreateItem", {
      component: {
        id: "ScanQRScreen",
        name: "ScanQRScreen",
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
              text: "Quét mã vạch",
              color: "#fff",
              alignment: "center",
              fontSize: values.nav.fontSize
            },
            rightButtons: [
              {
                id: "flash",
                color: "#fff",
                component: { name: "CameraButton" }
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

  clickItem = item => {
    this.setState({ itemGroup: item }, () => {
      console.log(this.state.itemGroup);
    });
    this.dismissModalGroup();
  };

  changeImage = () => {
    var self = this;
    let { User } = this.props;

    ImagePicker.showImagePicker(options, response => {
      // console.log('response: ' + JSON.stringify(response))
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
        if (response.error === "Camera permissions not granted") {
          _alertForPhotosAndCameraPermission(
            // 'Can we access your camera?',
            // 'We need access so you can set your profile pic'
            "Bạn có thể cho ứng dụng truy cập máy ảnh",
            "Ứng dụng sử dụng máy ảnh để chụp ảnh"
          );
        } else if (response.error === "Photo library permissions not granted") {
          _alertForPhotosAndCameraPermission(
            // 'Can we access your photos?',
            // 'We need access so you can set your profile pic'
            "Bạn có thể cho ứng dụng truy cập thư viện ảnh",
            "Ứng dụng sử dụng thư viện ảnh để lấy ảnh"
          );
        }
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        let imgs = this.state.images;
        imgs.push(response.uri);
        this.setState({ images: imgs });
      }
    });
  };

  render() {
    let { OnApp, Product, prevScreen } = this.props;
    return (
      // <TouchableOpacity style={{ flex: 1, width: '100%', }} activeOpacity={1} onPress={() => { Keyboard.dismiss() }}>
      <KeyboardAvoidingView
        behavior={"padding"}
        enabled={values.platform == "ios" ? true : false}
        style={{ width: "100%", flex: 1 }}
      >
        <ScrollView style={styles.scrollview}>
          <View style={{ flex: 1, width: "100%", paddingVertical: 15 }}>
            <EnterTextView
              title={"Tiêu đề"}
              placeholder="Nhập"
              type={typeTextInput.name}
              onChangeText={this.onChangeText}
              value={this.state.name}
            />

            <View style={styles.parentGroup}>
              <Text style={styles.textGroup}>{"Nhóm hàng"}</Text>
              <TouchableOpacity
                onPress={this.chooseItemGroup}
                activeOpacity={0.7}
                style={[styles.group, styles.shadow]}
              >
                <Text
                  style={{
                    flex: 1,
                    fontSize: values.fontSizeNormal,
                    color:
                      this.state.itemGroup && this.state.itemGroup.id
                        ? "#000"
                        : "#00000034"
                  }}
                >
                  {(this.state.itemGroup && this.state.itemGroup.name) ||
                    "Chọn nhóm hàng"}
                </Text>
                <Image style={styles.ic_down} source={images.ic_down} />
              </TouchableOpacity>
            </View>
            <EnterTextView
              title={"Giá nhập"}
              placeholder="Nhập"
              type={typeTextInput.price_origin}
              onChangeText={this.onChangeText}
              value={this.state.price_origin}
              keyboardType={"numeric"}
            />
            <EnterTextView
              title={"Giá bán"}
              placeholder="Nhập"
              type={typeTextInput.price_sale}
              onChangeText={this.onChangeText}
              value={this.state.price_sale}
              keyboardType={"numeric"}
            />
            <EnterTextView
              title={"Số lượng"}
              placeholder="Nhập"
              type={typeTextInput.count}
              onChangeText={this.onChangeText}
              value={this.state.count}
              keyboardType={"numeric"}
            />
            <ChooseImageView
              title="Chọn ảnh hoặc tải lên"
              avatar={this.state.images[0]}
              onPress={this.changeImage}
            />
          </View>
        </ScrollView>
        {/* <View style={{ width: '100%', paddingTop: 10, paddingHorizontal: 15, }}>
                        <ButtonGradient
                            onPress={this.createProduct}
                            // colors={this.checkDone ? color.colors_gradient : ['#DFDFDF', '#DFDFDF']}
                            containStyle={{ marginBottom: values.bottomIphoneX + 15, }}
                            title={'Xoá mặt hàng'}
                        />
                    </View> */}
        {this.state.showModal && (
          <TouchableOpacity
            onPress={this.dismissModalGroup}
            activeOpacity={1}
            style={styles.modal}
          >
            <View
              style={{
                borderRadius: 8,
                maxHeight: values.deviceHeight / 2,
                paddingHorizontal: 20,
                width: "100%"
              }}
            >
              <ListItemView
                data={toJS(Product.listGroupProduct)}
                clickItem={this.clickItem}
              />
            </View>
          </TouchableOpacity>
        )}
      </KeyboardAvoidingView>
      // </TouchableOpacity >
    );
  }
}
const styles = StyleSheet.create({
  scrollview: { width: "100%", flex: 1, backgroundColor: "transparent" },
  textGroup: {
    fontSize: values.fontSizeTitle,
    color: "#000",
    marginBottom: 5
  },
  parentGroup: { width: "100%", marginTop: 15, paddingHorizontal: 15 },
  group: {
    width: "100%",
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    borderRadius: 7
  },
  ic_down: { height: 10, width: 20, resizeMode: "contain" },
  modal: {
    width: "100%",
    height: "100%",
    position: "absolute",
    paddingHorizontal: 20,
    paddingVertical: 40,
    backgroundColor: "#00000080",
    justifyContent: "center",
    alignItems: "center"
  },
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
