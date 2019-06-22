import React, { Component } from "react";
import { AsyncStorage } from "react-native";
import { observable, action, toJS } from "mobx";
import { config, values, api } from "../config";

import { get, map, size, findIndex, filter } from "lodash";
import moment from "moment";
import { GetNoToken, PostWithToken } from "../config/request";
import SimpleToast from "react-native-simple-toast";

class Bill {
  @observable listBill = [];

  @observable listBillDefault = [];
  @observable refundItem = null;
  @observable dayFilter = "";
  @observable billDetail = {};
  @observable page = 0;

  @action
  createBill(email, bill, callback = null) {
    console.log("bill: ", toJS(bill.listCart));
    let product_ids = "";
    let counts = "";
    if (toJS(bill.listCart)) {
      map(toJS(bill.listCart), (obj, index) => {
        let dt = ",";
        if (index === size(toJS(bill.listCart) - 1)) {
          dt = "";
        }
        product_ids += dt + `${obj.id}`;
        counts += dt + `${obj.value}`;
      });
    }
    const body = { product_ids, counts, email };
    console.log("body:", body);
    PostWithToken(api.BILL.sell, body, (data, status) => {
      if (status) {
        if (get(data, "code") == 0) {
          if (size(get(data, "data")) > 0) {
            callback && callback(true);
          } else {
            callback && callback(false);
          }
        } else {
          callback && callback(false);
          SimpleToast.show(data.message);
        }
      } else {
        callback && callback(false);
      }
    });
  }

  @action
  setDayFilter(day) {
    if (day) {
      this.dayFilter = day;
      this.filterBill(day);
    } else {
      this.getListBill("", "", status => {});
    }
  }
  @action
  setBillDetail(data) {
    console.log("data: ", data);
    this.billDetail = data;
  }

  @action
  clearBillDetail() {
    this.billDetail = {};
  }

  @action
  filterBill(day) {
    const dayNow = moment(day).format("YYYY-MM-DD");
    this.getListBill(dayNow, dayNow, status => {});
  }

  @action
  setRefundItem(item) {
    this.refundItem = item;
  }

  @action
  updateRefundItem(id) {
    let index = findIndex(this.listBillDefault, function(o) {
      return o.id == id;
    });
    if (index + "" != "-1") {
      this.listBillDefault[index].isRefund = true;
      this.listBill = this.listBillDefault;
    }
  }

  @action
  getListBill(from_date, to_date, callback = null) {
    let body = {
      from_date,
      to_date
    };
    console.log("getListBill: ", body);
    PostWithToken(api.BILL.bills, body, (data, status) => {
      console.log("data: ", data);
      if (status) {
        if (get(data, "code") == 0) {
          if (size(get(data, "data")) > 0) {
            this.setDataListBill(get(data, "data"));
            callback && callback(true);
          } else {
            this.setDataListBill([]);
            callback && callback(false);
          }
        } else {
          callback && callback(false);
          SimpleToast.show(data.message);
        }
      } else {
        callback && callback(false);
      }
    });
  }

  @action
  setDataListBill(data) {
    if (data) {
      this.listBill = data;
    } else {
      this.listBill = [];
    }
  }

  @action
  setPage(page) {
    this.page = page;
  }

  @action
  getBillDetail(sell_id, callback = null) {
    console.log("sellId: ", sell_id);
    PostWithToken(api.BILL.sell_detail, { sell_id }, (data, status) => {
      console.log("data", data);
      if (status) {
        if (get(data, "code") == 0) {
          this.setBillDetail(get(data, "data"));
          callback && callback(true);
        } else {
          callback && callback(false, null);
          SimpleToast.show(data.message);
        }
      } else {
        callback && callback(false, null);
      }
    });
  }

  @action
  insertBill(
    tilegiamgia,
    dKhoXuatId,
    the,
    dCuaHangId,
    voucher,
    dVoucherId,
    khachdua,
    listCart = [],
    callback = null
  ) {
    let body = {
      note: "",
      tilegiamgia: "",
      tilethue: 0,
      dKhoXuatId,
      khachdua,
      the,
      phivanchuyen: "",
      loaithanhtoan: the,
      dCuaHangId,
      voucher,
      dVoucherId,
      details: listCart.map((v, k) => {
        let objectTemp = {};
        objectTemp.note = v.name;
        objectTemp.dMatHangId = v.id;
        objectTemp.tilegiamgia = "";
        objectTemp.dongia = v.giaBan;
        objectTemp.slxuat = v.value;
        objectTemp.dDonViTinhId = v.dDonViTinh.id;
        return objectTemp;
      })
    };

    console.log("bodyyy", JSON.stringify(body));

    PostWithToken(api.BILL.insertBill, body, (data, status) => {
      if (status) {
        if (get(data, "code") == 0) {
          callback && callback(true);
        } else {
          callback && callback(false);
          SimpleToast.show(data.message);
        }
      } else {
        callback && callback(false);
      }
    });
  }
}

export default new Bill();
