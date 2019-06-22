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
  Alert,
  DeviceEventEmitter
} from "react-native";
import { Navigation } from "react-native-navigation";
import { get } from "lodash";
import { values, color, images } from "../../../../../config";
import ButtonGradient from "../../../../../component/ButtonGradient";
import EnterTextView from "../../../../../component/EnterTextView";
import ViewSwitchCustom from "../../../../../component/ViewSwitchCustom";
import ChooseColorView from "./ChooseColor";
import ChooseImageView from "./ChooseImage";
import { _alertForPhotosAndCameraPermission } from "../../../../../utils/Func";
import _ from "lodash";
const typeTextInput = {
  name: 0,
  price_sale: 1,
  price_origin: 2,
  count: 5
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
@inject("Product")
@observer
export default class CreateDetailItem extends Component {
  constructor(props) {
    super(props);
    console.log("item: " + JSON.stringify(props.item));
    this.state = {
      name: props.item.name || "",
      showModal: false,
      itemGroup: props.item.category || null,
      price_sale: props.item.price_sale || "",
      price_origin: props.item.price_origin || "",
      count: props.item.count || "",
      images: props.item.images || []
    };
    Navigation.events().bindComponent(this); // <== Will be automatically unregistered when unmounted
  }
  componentWillMount() {}

  navigationButtonPressed({ buttonId }) {
    if (buttonId == "back") {
      this.goBack();
    } else if (buttonId == "save") {
      this.updateProduct();
    }
  }

  goBack = () => {
    Navigation.pop("CreateDetailItem");
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

  chooseItemGroup = () => {};

  checkValue = () => {
    let check = false;
    if (this.state.title.trim != "") {
      if (this.state.idProduct.trim() != "") {
        check = true;
      } else {
        SimpleToast.show("Bạn cần nhập mã mặt hàng");
      }
    } else {
      SimpleToast.show("Bạn cần nhập tên mặt hàng");
    }
    return check;
  };

  updateProduct = () => {
    let { Product, item } = this.props;
    let {
      title,
      itemGroup,
      idBarcode,
      idProduct,
      avatar,
      isChooseImage,
      price,
      priceStart,
      inventory,
      itemColorCheck,
      isWeight,
      priceInput
    } = this.state;
    if (this.checkValue()) {
      console.log("isChooseImage: " + isChooseImage);
      Product.editProductItem(
        item.id,
        idProduct,
        title,
        priceInput,
        price,
        priceStart,
        itemGroup.id,
        (status, data) => {
          if (status) {
            DeviceEventEmitter.emit("updateProductSuccess", data);
            this.goBack();
          }
        }
      );

      // Product.addNewProductItem(this.props.prevScreen,
      //     title || '',
      //     // this.state.isChooseImage ? avatar : '',
      //     isChooseImage ? 'https://schoice.vn/wp-content/uploads/2018/01/Cangudaiduong.jpg' : '',
      //     isChooseImage ? '' : (itemColorCheck && itemColorCheck.color || color.mainColor),
      //     itemGroup && itemGroup.id || '',
      //     idProduct || '',
      //     idBarcode || '', price || '',
      //     priceStart || '', isWeight, inventory || 0
      // )

      // if (this.props.prevScreen == config.prevScreen.group) {
      //     //them san pham nay vao
      // } else {

      // }
      this.goBack();
    }
  };

  chooseColor = item => {
    this.setState({ itemColorCheck: item }, () => {
      console.log(
        "itemColorCheck: " + JSON.stringify(this.state.itemColorCheck)
      );
    });
  };

  onChangeText = (type, text) => {
    switch (type) {
      case typeTextInput.title:
        this.setState({ title: text });
        break;
      case typeTextInput.price:
        this.setState({ price: text });
        break;
      case typeTextInput.priceStart:
        this.setState({ priceStart: text });
        break;
      case typeTextInput.idProduct:
        this.setState({ idProduct: text });
        break;
      case typeTextInput.idBarcode:
        this.setState({ idBarcode: text });
        break;
      case typeTextInput.inventory:
        this.setState({ inventory: text });
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

  changeTypePOS = () => {
    let itemColorCheck = this.state.itemColorCheck;
    this.setState({
      isChooseImage: !this.state.isChooseImage
    });
    if (this.state.isChooseImage) {
      //Dang chon ảnh => chọn màu
      if (!this.state.itemColorCheck) {
        itemColorCheck = this.state.listColor[0];
      }
      this.setState({
        itemColorCheck: itemColorCheck,
        isChooseImage: false
      });
    } else {
      //Dang chon màu => chọn ảnh
      this.setState({
        isChooseImage: true
      });
    }
  };

  changeTypeSale = () => {
    if (this.state.isWeight) {
      this.setState({
        isWeight: 0
      });
    } else {
      this.setState({
        isWeight: 1
      });
    }
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
        // UploadImageAxios(api.ACCOUNT.uploadAvatar, response.uri, User.token, (data) => {
        //     console.log('uploadAvatar: ' + JSON.stringify(data))
        //     if (data) {
        //         if (data.errorCode == 0) {
        //             User.updateAvatar(data.responseBase)
        //             console.log('userInfo: ' + JSON.stringify(User.userInfo))
        //             SimpleToast.show(data.message)
        //         } else {
        //             SimpleToast.show(data.message)
        //         }
        //     }
        // }, (percent) => {
        //     console.log(percent)
        // })
        // ImageResizer.createResizedImage(response.uri, 300, 300, 'JPEG', 50).then((resizedImageUri) => {
        //     // console.log('dt: ' + JSON.stringify(resizedImageUri))
        //     let urlUpload = '';
        //     values.platform === 'android'
        //         ?
        //         urlUpload = 'file://' + resizedImageUri.path
        //         :
        //         urlUpload = resizedImageUri.path
        //     console.log('~~~~~~~a~~~~: ' + JSON.stringify(item))
        //     self.setState({ isShowLoading: true })
        // })
      }
    });
  };

  chooseItemGroup = () => {
    // this.showModalGroup()
    let { Product } = this.props;
    if (toJS(Product.listGroupProduct).length > 0) {
      this.showModalGroup();
    } else {
      Product.setPage(0);
      Product.getDataListGroup("", "", 0, status => {
        this.showModalGroup();
      });
    }
  };

  showModalGroup = () => {
    this.setState({ showModal: true });
  };

  dismissModalGroup = () => {
    this.setState({ showModal: false });
  };

  clickItem = item => {
    this.setState({ itemGroup: item });
    this.dismissModalGroup();
  };

  stopSaleItem = () => {
    const self = this;
    const { Product } = this.props;
    Alert.alert(
      "Ngừng kinh doanh",
      "Bạn thực sự muốn ngừng kinh doanh sản phẩm này?",
      [
        {
          // text: 'No way',
          text: "Từ chối",
          onPress: () => console.log("Permission denied"),
          style: "cancel"
        },
        {
          text: "Đồng ý",
          //  text: 'Open Settings',
          onPress: () => {
            Product.userStopProviding(
              this.props.item.id,
              (status, data) => {
                if (status) {
                  SimpleToast.show("Ngừng kinh doanh sản phẩm thành công");
                  Product.getAllProduct("", "", "", status => {
                    if (status) {
                      self.goBack();
                    }
                  });
                }
              }
            );
          }
        } //vao setting xin quyen
      ]
    );
  };
  startSaleItem = () => {
    const self = this;
    const { Product } = this.props;
    Product.userStartProviding(this.props.item.id, (status, data) => {
      if (status) {
        SimpleToast.show("Sản phẩm tiếp tục được kinh doanh");
        Product.getAllProduct("", "", "", status => {
          if (status) {
            self.goBack();
          }
        });
      }
    });
  };

  deleteItem = () => {
    let { Product } = this.props;
    Alert.alert("Xoá mặt hàng", "Bạn thực sự muốn xoá mặt hàng này chứ?", [
      {
        // text: 'No way',
        text: "Từ chối",
        onPress: () => console.log("Permission denied"),
        style: "cancel"
      },
      {
        text: "Xoá",
        //  text: 'Open Settings',
        onPress: () => {
          Product.removeItemProduct(this.props.item.id, (status, data) => {
            if (status) {
              DeviceEventEmitter.emit("removeProductSuccess", data);
              this.goBack();
            }
          });
        }
      } //vao setting xin quyen
    ]);
  };
  render() {
    const { Product, item } = this.props;
    return (
      // <TouchableOpacity style={{ flex: 1, width: '100%', }} activeOpacity={1} onPress={() => { Keyboard.dismiss() }}>
      <KeyboardAvoidingView
        behavior={"padding"}
        enabled={values.platform == "ios" ? true : false}
        style={{ width: "100%", flex: 1 }}
      >
        <ScrollView
          style={{ width: "100%", flex: 1, backgroundColor: "transparent" }}
        >
          <View style={{ flex: 1, width: "100%", paddingVertical: 15 }}>
            <EnterTextView
              editable={false}
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
              editable={false}
              title={"Giá nhập"}
              placeholder="Nhập"
              type={typeTextInput.price_origin}
              onChangeText={this.onChangeText}
              value={this.state.price_origin}
              keyboardType={"numeric"}
            />
            <EnterTextView
              editable={false}
              title={"Giá bán"}
              placeholder="Nhập"
              type={typeTextInput.price_sale}
              onChangeText={this.onChangeText}
              value={this.state.price_sale}
              keyboardType={"numeric"}
            />
            <EnterTextView
              editable={false}
              title={"Số lượng"}
              placeholder="Nhập"
              type={typeTextInput.count}
              onChangeText={this.onChangeText}
              value={this.state.count}
              keyboardType={"numeric"}
            />
            <ChooseImageView
              editable={false}
              title="Chọn ảnh hoặc tải lên"
              listImages={this.state.images}
              onPress={this.changeImage}
            />
          </View>
          {get(item, "stop_providing") ? (
            <ButtonGradient
              onPress={this.startSaleItem}
              containStyle={{
                marginBottom: values.bottomIphoneX + 15,
                paddingHorizontal: 20
              }}
              title={"Tiếp tục kinh doanh"}
            />
          ) : (
            <ButtonGradient
              onPress={this.stopSaleItem}
              colors={["#F26B3A", "#F26B3A"]}
              containStyle={{
                marginBottom: values.bottomIphoneX + 15,
                paddingHorizontal: 20
              }}
              title={"Ngừng kinh doanh"}
            />
          )}
          {/* <ButtonGradient
            onPress={this.deleteItem}
            colors={["#DC0000", "#DC0000"]}
            containStyle={{
              marginBottom: values.bottomIphoneX + 15,
              paddingHorizontal: 20
            }}
            title={"Xoá mặt hàng"}
          /> */}
        </ScrollView>

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
