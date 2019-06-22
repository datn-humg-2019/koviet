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
  @observable billDetail = { data: [], amount: 0 };
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
        product_ids += `${obj.id}` + dt;
        counts += `${obj.value}` + dt;
      });
    }
    const body = { product_ids, counts, email };
    console.log("body: ", body);
    PostWithToken(api.BILL.sell, body, (data, status) => {
      if (status) {
        console.log("data:", data);
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
    this.billDetail.data = data;
    if (data) {
      let amount = 0;
      map(data, obj => {
        amount += parseInt(obj.price + "") * parseInt(obj.count + "");
      });
      this.billDetail.amount = amount;
    }

    // this.filterBill(day)
  }

  @action
  clearBillDetail() {
    this.billDetail = { data: [], amount: 0 };
  }

  @action
  filterBill(day) {
    let obj = filter(this.listBillDefault, function(o) {
      return moment(o.created).format("YYYY-MM-DD") == day;
    });
    if (obj) {
      console.log("du lieu tim kiem:filterbill " + JSON.stringify(obj));
      this.listBill = [];
      this.listBill = obj;
    }
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
  getListBill(fromDate, toDate, callback = null) {
    let body = {
      fromDate,
      toDate
    };
    console.log("bodu: ", body);

    PostWithToken(api.BILL.bills, body, (data, status) => {
      if (status) {
        if (get(data, "code") == 0) {
          if (size(get(data, "data")) > 0) {
            this.setDataListBill(get(data, "data"));
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
  setDataListBill(data) {
    this.listBill = data;
  }

  @action
  setPage(page) {
    this.page = page;
  }

  @action
  getBillDetail(bill_id, callback = null) {
    PostWithToken(api.BILL.bill_detail, { bill_id }, (data, status) => {
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
