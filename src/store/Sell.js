import React, { Component } from "react";
import { AsyncStorage } from "react-native";
import { observable, action, toJS } from "mobx";
import { config, values, api } from "../config";
import _ from "lodash";
import moment from "moment";
import { GetNoToken } from "../config/request";
import SimpleToast from "react-native-simple-toast";

class Sell {
  @observable typeFilterSelected = config.allProduct;

  @observable listCart = [
    // {
    //     id: 0,
    //     title: 'Laptop Dell Inspiron 6699 Core i9 SSD 120GB card NDVIA GTX 1090ti',
    //     price: '66999000',
    //     image: 'http://ksassets.timeincuk.net/wp/uploads/sites/54/2016/08/lenovo-ideapad-710s-13isk-7.jpg',
    //     unit: 'đ',
    // value: 50,
    // type: 1//1 ; 0: phần trăm; 1: mỗi
    // }
  ];
  @observable infoCart = {
    price: 0,
    unit: "đ",
    number: 0,
    customer: null,
    payType: config.payType.cash
  };
  @observable isShowExtraInfo = false;

  @observable customerRecent = [
    {
      id: 0,
      name: "Ngô Hải Yến",
      image:
        "http://nguoimaudep.vaileu.com/wp-content/uploads/2017/09/12487048_823294384462795_5774759080163262295_o.jpg",
      email: "haiyen@gmail.com",
      phone: "0373343623"
    },
    {
      id: 1,
      name: "Hoàng Minh Hiếu",
      image:
        "http://sgtvt.hochiminhcity.gov.vn/HoatDongAnh/GTT/hinh-nen-girl-dep.jpg",
      email: "minhhiedadasu@gmail.com",
      phone: "012920027321"
    },
    {
      id: 2,
      name: "Đặng Đình Tùng",
      image:
        "https://znews-photo.zadn.vn/w660/Uploaded/obfluaa/2014_11_09/yen_3.jpg",
      email: "A@a.com",
      phone: "0112322232"
    },
    {
      id: 0,
      name: "Hải Vân",
      image:
        "http://nguoimaudep.vaileu.com/wp-content/uploads/2017/09/12487048_823294384462795_5774759080163262295_o.jpg",
      email: "haiyen@gmail.com",
      phone: "0373343623"
    },
    {
      id: 1,
      name: "Minh Hoà",
      image:
        "http://sgtvt.hochiminhcity.gov.vn/HoatDongAnh/GTT/hinh-nen-girl-dep.jpg",
      email: "minhhiedadasu@gmail.com",
      phone: "012920027321"
    },
    {
      id: 2,
      name: "Đình Thu",
      image:
        "https://znews-photo.zadn.vn/w660/Uploaded/obfluaa/2014_11_09/yen_3.jpg",
      email: "A@a.com",
      phone: "0112322232"
    }
  ];

  //~~~~~~~~~~~~~~~~~~~~~~~~~~~customer~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  @action
  addCustomer(name, email, phone, note) {
    let item = {
      id: "ID " + moment(new Date()).format("YYYYMMDDHHss"),
      name: name,
      email: email,
      phone: phone,
      note: note
    };
    this.customerRecent.unshift(item);
    console.log("addCustomer luc sau: " + JSON.stringify(this.customerRecent));
  }

  @action
  editCustomer(id, name, email, phone, note) {
    let indexItem = _.findIndex(this.customerRecent, function(o) {
      return o.id == id;
    });
    if (indexItem + "" != "-1") {
      this.customerRecent[indexItem].name = name;
      this.customerRecent[indexItem].email = email;
      this.customerRecent[indexItem].phone = phone;
      this.customerRecent[indexItem].note = note;

      if (this.infoCart.customer) {
        if (this.infoCart.customer.id == id) {
          this.infoCart.customer = this.customerRecent[indexItem];
        }
      }
    }
    console.log("editCustomer luc sau: " + JSON.stringify(this.customerRecent));
  }

  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~customer~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  @action
  dismissisExtraInfo() {
    this.isShowExtraInfo = false;
  }

  @action
  showExtraInfo() {
    this.isShowExtraInfo = true;
  }

  @action
  setTypeFilter(value) {
    this.typeFilterSelected = value;
  }

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~cart~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  @action
  deleteCart() {
    this.listCart = [];
    this.getInfoCart(config.payType.cash);
  }

  @action
  getInfoCart(typeMoney = null) {
    let number = 0;
    let price = 0;
    let unit = "đ";
    let payType =
      this.infoCart.payType != undefined
        ? this.infoCart.payType
        : config.payType.cash;

    console.log("this.listCart: getInfoCart " + JSON.stringify(this.listCart));
    if (this.listCart) {
      if (typeMoney != null && typeMoney != "" && typeMoney != undefined) {
        payType = typeMoney;
      }
      this.listCart.map(item => {
        price += parseFloat(item.price_sale + "") * parseFloat(item.value + "");
        unit = item.unit || "đ";

        number += parseFloat(item.value + "");
      });
    } else {
      payType = config.payType.cash;
    }
    let customer = null;
    customer = this.infoCart.customer;
    // console.log('payType: ' + payType)
    this.infoCart = { price, unit, number, customer, payType };
  }

  @action
  changePayTypeInfoCart(payType) {
    this.infoCart.payType = payType;
    console.log("info cart: " + JSON.stringify(this.infoCart));
  }

  @action
  addCustomerInfoCart(item) {
    this.infoCart.customer = item;
    console.log("info cart: " + JSON.stringify(this.infoCart));
  }

  @action
  removeCustomerInfoCart() {
    this.infoCart.customer = null;
    console.log("info cart: " + JSON.stringify(this.infoCart));
  }

  @action
  addToCart(item) {
    let listCart = [];
    listCart = toJS(this.listCart);
    let index = _.findIndex(listCart, function(o) {
      return o.id == item.id;
    });

    if (parseFloat(index + "") + "" != "-1") {
      // if (parseFloat(listCart[index].value + '') < parseFloat(item.inventory + '')) {
      //     listCart[index].value = listCart[index].value + listCart[index].valueDefault;
      // } else {
      //     SimpleToast.show('Mặt hàng này chỉ còn đủ số lượng bạn đã chọn')
      // }
      listCart[index]["value"] += 1;
    } else {
      let obj = item;
      obj.comment = "";
      obj.value = 1;
      obj.sales = [];
      listCart.push(obj);
    }
    this.listCart = listCart;
    console.log(listCart);
    this.getInfoCart(null);
  }

  @action
  addSaleToCartItem(idItem, itemSale) {
    let listCart = [];
    listCart = toJS(this.listCart);
    let index = _.findIndex(listCart, function(o) {
      return o.id == idItem;
    });
    console.log("index add: " + index);
    if (parseFloat(index + "") + "" != "-1") {
      //neu don hang do ton tai
      //kiem tra coi sale do da ton tai trong trong item nay chua?
      if (this.listCart[index].sales && this.listCart[index].sales.length > 0) {
        let sales = this.listCart[index].sales;
        let indexSales = _.findIndex(sales, function(o) {
          return o.id == itemSale.id;
        });
        console.log("indexSales add: " + indexSales);
        if (parseFloat(indexSales + "") + "" != "-1") {
          //neu Sale do da ton tai
        } else {
          //sale do chua ton tai
          sales.push(itemSale);
          this.listCart[index].sales = sales;
          console.log("listcart sau them: " + JSON.stringify(this.listCart));
        }
      } else {
        //sale chua ton tai
        this.listCart[index].sales = [itemSale];
        console.log("listcart sau them: " + JSON.stringify(this.listCart));
      }
    } else {
    }
  }

  @action
  removeSaleToCartItem(idItem, itemSale) {
    let listCart = [];
    listCart = toJS(this.listCart);
    let index = _.findIndex(listCart, function(o) {
      return o.id == idItem;
    });
    if (parseFloat(index + "") + "" != "-1") {
      //neu don hang do ton tai

      //kiem tra coi sale do da ton tai trong trong item nay chua?
      if (this.listCart[index].sales && this.listCart[index].sales.length > 0) {
        let sales = this.listCart[index].sales;
        let indexSales = _.findIndex(sales, function(o) {
          return o.id == itemSale.id;
        });
        if (indexSales + "" != "-1") {
          sales.splice(indexSales, 1);
        }
        // _.remove(sales, function (o) { return o.id == itemSale.id });
        // android bi loiUnable to delete property. lodash
        this.listCart[index].sales = sales;
      }
    } else {
      console.log("don hang k ton tai");
    }
  }

  @action
  genListCart() {
    return this.listCart;
  }
  @action
  genDataBill() {
    let bill = {
      id: "#HD" + moment(new Date()).format("YYMDDHHmmsss"),
      time: new Date(),
      total: this.infoCart.price,
      unit: this.infoCart.unit,
      customer: this.infoCart.customer,
      payType: this.infoCart.payType,
      isRefund: false,
      listCart: this.listCart
    };
    return bill;
  }
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~cart~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
}

export default new Sell();
