import React, { Component } from "react";
import { AsyncStorage } from "react-native";
import { observable, action, toJS } from "mobx";
import { config, values, api } from "../config";
import { get, size, map, filter, find, findIndex, remove } from "lodash";
import moment from "moment";
import {
  GetNoToken,
  PostNoToken,
  PostWithToken,
  GetWithToken,
  createProductFormData
} from "../config/request";
import SimpleToast from "react-native-simple-toast";

class Product {
  @observable dataListSell = [];
  // type:1//mỗi
  // type:0://phần cân
  @observable listProduct = [];

  @observable listGroupProduct = [];

  // typesale: 1//1 ; 0: phần trăm; 1: mỗi
  @observable listSale = [
    // {
    //     id: 0,
    //     title: 'Giả giá 50% trên một đơn hàng',
    //     value: 50,
    //     type: 0//1 ; 0: phần trăm; 1: mỗi
    // },
    // {
    //     id: 1,
    //     title: 'Giảm giá 50.000 cho mỗi đơn hàng nhân dịp Giáng sinh',
    //     value: 50000,
    //     type: 1//1 ; 0: phần trăm; 1: mỗi
    // }
  ];

  @observable page = 0;

  @observable pageGroup = 0;

  @observable listItemSetProduct = [];

  @action
  getDataStart() {
    this.getAllProduct("", "", "", status => {});
    this.getAllGroupProduct(status => {});
  }
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Danh sach san pham~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  @action
  getAllProduct(name, product_id, category_id, callback = null) {
    const body = { name, product_id, category_id };
    console.log("body: ", body);
    PostWithToken(api.PRODUCT.warehouses, body, (data, status) => {
      console.log("getAllProduct ", data);
      if (status) {
        if (get(data, "code") == 0) {
          this.setListProduct(get(data, "data"));
          callback && callback(true);
        } else {
          callback && callback(false);
          SimpleToast.show(data.message);
        }
      } else {
        callback && callback(false);
        SimpleToast.show("Lỗi kết nối GAP66");
      }
    });
  }

  @action
  createProductWarehouse(
    name,
    category_id,
    count,
    price_origin,
    price_sale,
    images,
    callback = null
  ) {
    console.log(
      "name: ",
      name,
      " category_id: ",
      category_id,
      " count:",
      count,
      " price_origin: ",
      price_origin,
      " price_sale:",
      price_sale
    );
    createProductFormData(
      api.PRODUCT.create_product_warehouse,
      name,
      category_id,
      count,
      price_origin,
      price_sale,
      images,
      (data, status) => {
        console.log("data: ", data);
        if (status) {
          if (get(data, "code") == 0) {
            callback && callback(true);
          } else {
            callback && callback(false);
            SimpleToast.show(data.message);
          }
        } else {
          callback && callback(false);
          SimpleToast.show("Lỗi kết nối GAP66");
        }
      },
      cb => {}
    );
    // PostWithToken(api.PRODUCT.create_product_warehouse, body, (data, status) => {
    //   console.log("getAllProduct ", data);
    //   if (status) {
    //     if (get(data, "code") == 0) {
    //       callback && callback(true);
    //     } else {
    //       callback && callback(false);
    //       SimpleToast.show(data.message);
    //     }
    //   } else {
    //     callback && callback(false);
    //     SimpleToast.show("Lỗi kết nối GAP66");
    //   }
    // });
  }

  @action
  userStopProviding(product_id, callback = null) {
    const body = { product_id };
    console.log("body: ", body);
    PostWithToken(api.PRODUCT.user_stop_providing, body, (data, status) => {
      console.log("userStopProviding ", data);
      if (status) {
        if (get(data, "code") == 0) {
          callback && callback(true);
        } else {
          callback && callback(false);
          SimpleToast.show(data.message);
        }
      } else {
        callback && callback(false);
        SimpleToast.show("Lỗi kết nối USP115");
      }
    });
  }

  @action
  userStartProviding(product_id, callback = null) {
    const body = { product_id };
    console.log("body: ", body);
    PostWithToken(api.PRODUCT.user_start_providing, body, (data, status) => {
      console.log("userStartProviding ", data);
      if (status) {
        if (get(data, "code") == 0) {
          callback && callback(true);
        } else {
          callback && callback(false);
          SimpleToast.show(data.message);
        }
      } else {
        callback && callback(false);
        SimpleToast.show("Lỗi kết nối USP115");
      }
    });
  }

  @action
  userStopProvidingCategory(category_id, callback = null) {
    const body = { category_id };
    console.log("body: ", body);
    PostWithToken(
      api.PRODUCT.user_stop_providing_category,
      body,
      (data, status) => {
        console.log("user_stop_providing_category ", data);
        if (status) {
          if (get(data, "code") == 0) {
            callback && callback(true);
          } else {
            callback && callback(false);
            SimpleToast.show(data.message);
          }
        } else {
          callback && callback(false);
          SimpleToast.show("Lỗi kết nối USP115");
        }
      }
    );
  }

  @action
  userStartProvidingCategory(category_id, callback = null) {
    const body = { category_id };
    console.log("body: ", body);
    PostWithToken(
      api.PRODUCT.user_start_providing_category,
      body,
      (data, status) => {
        console.log("user_start_providing_category ", data);
        if (status) {
          if (get(data, "code") == 0) {
            callback && callback(true);
          } else {
            callback && callback(false);
            SimpleToast.show(data.message);
          }
        } else {
          callback && callback(false);
          SimpleToast.show("Lỗi kết nối USP115");
        }
      }
    );
  }

  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Danh sach nhom san pham~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  @action
  getAllGroupProduct(callback = null) {
    PostWithToken(api.PRODUCT.list_categories, {}, (data, status) => {
      console.log("getAllGroupProduct, ", data);
      if (status) {
        if (get(data, "code") == 0) {
          this.setListProductGroup(get(data, "data"));
          callback && callback(true);
        } else {
          callback && callback(false);
          SimpleToast.show(data.message);
        }
      } else {
        callback && callback(false);
        SimpleToast.show("Lỗi kết nối GAGP87");
      }
    });
  }

  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Danh sach nhom san pham~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~item - product ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  @action
  setListProductGroup(data) {
    this.listGroupProduct = data;
  }

  @action
  getDataListGroup(name, code, page, callback = null) {
    let body = {
      name,
      code,
      page,
      size: 100
    };
    let dataOld = toJS(this.listGroupProduct);
    if (page == 0) {
      dataOld = [
        {
          id: "",
          name: "Tất cả",
          color: "#ccc"
        }
      ];
    }
    PostWithToken(
      api.GROUP_PRODUCT.getListGroupProduct,
      body,
      (data, status) => {
        if (status) {
          if (data) {
            if (get(data, "code") == 0) {
              if (size(data.data) > 0) {
                this.setListProductGroup([...dataOld, ...data.data]);
                callback && callback(true);
              } else {
                callback && callback(false);
              }
            } else {
              callback && callback(false);
              // SimpleToast.show(data.message);
            }
          } else {
            callback && callback(false);
          }
        } else {
          callback && callback(false);
          SimpleToast.show("Lỗi kết nối GDLG141");
        }
      }
    );
  }

  @action
  removeItemProduct(id, callback = null) {
    // remove(this.listProduct, function (o) { return o.id == id });
    PostWithToken(api.PRODUCT.deleteProduct + id, {}, (data, status) => {
      if (status) {
        if (get(data, "code") == 0) {
          callback && callback(true, data.data);
        } else {
          SimpleToast.show(get(data, "message"));
          callback && callback(false);
        }
      }
    });
  }

  @action
  checkListProduct(callback = null) {
    if (size(this.listProduct) === 0) {
      this.getListProduct("", "", "", 0, status => {
        if (status) {
          callback && callback(true);
        } else {
          callback && callback(false);
        }
      });
    } else {
      callback && callback(true);
    }
  }

  @action
  getListProduct(name, code, dNhomMatHangId, page, callback = null) {
    this.setDataListSell(config.allProduct);
    let body = {
      name,
      code,
      dNhomMatHangId,
      page,
      size: 100
    };

    // let body = {
    //   name,
    //   matHangId,
    //   nhomMatHangId,
    //   toDate: "",
    //   khoHangId: "",
    //   page,
    //   size: 100
    // };

    let dataOld = toJS(this.listProduct);
    if (page == 0) {
      dataOld = [];
    }
    PostWithToken(api.PRODUCT.getListProduct, body, (data, status) => {
      if (status) {
        if (data) {
          if (get(data, "code") == 0) {
            if (data.data && data.data.length > 0) {
              this.setListProduct([...dataOld, ...data.data]);
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
      } else {
        callback && callback(false);
        SimpleToast.show("Lỗi kết nối GLP390.");
      }
    });
  }

  @action
  getListProduct200(name, code, dNhomMatHangId, page, callback = null) {
    this.setDataListSell(config.allProduct);
    let body = {
      name,
      code,
      dNhomMatHangId,
      page,
      size: 200
    };
    let dataOld = toJS(this.listProduct);
    if (page == 0) {
      dataOld = [];
    }
    PostWithToken(api.PRODUCT.getListProduct, body, (data, status) => {
      if (status) {
        if (data) {
          if (get(data, "code") == 0) {
            if (data.data && data.data.length > 0) {
              this.setListProduct([...dataOld, ...data.data]);
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
      } else {
        callback && callback(false);
        SimpleToast.show("Lỗi kết nối GLP200 428");
      }
    });
  }

  @action
  getDataGroupCompare(data) {
    console.log("dataL ", data);
    console.log("listProduct: ", toJS(this.listProduct));

    if (size(data) > 0) {
      // Product.createGroupProduct(this.state.name, status => {
      //   if (status) {
      //     this.goBack();
      //   } else {
      //   }
      // });

      let listTMP = toJS(this.listItemSetProduct) || [];
      if (size(toJS(this.listProduct)) > 0) {
        console.log("1");
        map(data, obj => {
          let indexItem = findIndex(toJS(this.listProduct), o => {
            return o.id === obj.id;
          });
          console.log("indexItem1: ", indexItem);
          if (indexItem != -1) {
            listTMP.push(obj);
          }
        });
        this.listItemSetProduct = listTMP;
      } else {
        console.log("2");
        this.getListProduct200("", "", "", 0, status => {
          if (status) {
            map(data, obj => {
              let indexItem = findIndex(toJS(this.listProduct), o => {
                return o.id === obj.id;
              });
              console.log("indexItem:2 ", indexItem);
              if (indexItem != -1) {
                listTMP.push(obj);
              }
            });
            this.listItemSetProduct = listTMP;
          }
        });
      }
    }
  }

  @action
  getListProductForGroup(dNhomMatHangId, callback = null) {
    this.setDataListSell(config.allProduct);
    let body = {
      name: "",
      code: "",
      dNhomMatHangId,
      page: 0,
      size: 200
    };
    PostWithToken(api.PRODUCT.getListProduct, body, (data, status) => {
      if (status) {
        if (data) {
          if (get(data, "code") == 0) {
            if (data.data && data.data.length > 0) {
              this.getDataGroupCompare(get(data, "data"));
              setTimeout(() => {
                callback && callback(true);
              }, 1000);
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
      } else {
        callback && callback(false);
        SimpleToast.show("Lỗi kết nối GLPFG 510");
      }
    });
  }

  @action
  updateInventoryListProduct(listCart) {
    this.listProduct.map((item, index) => {
      listCart.map((obj, idx) => {
        if (obj.id == item.id) {
          item.inventory =
            parseFloat(item.inventory + "") - parseFloat(obj.value + "");
        }
      });
    });
    console.log("du lieu cart");
  }

  @action
  updateRefundInventoryListProduct(listCart) {
    this.listProduct.map((item, index) => {
      if (listCart.length > 0) {
        listCart.map((obj, idx) => {
          if (obj.id == item.id) {
            item.inventory =
              parseFloat(item.inventory + "") + parseFloat(obj.value + "");
          }
        });
      }
    });
    console.log("du lieu cart");
  }

  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~group - product ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  @action
  createGroupProduct(name, callback = null) {
    let products = [];
    map(this.listItemSetProduct, object => {
      products.push(object.id);
    });
    const body = { name, code: "", note: "", products };
    PostWithToken(
      api.GROUP_PRODUCT.createGroupProduct,
      body,
      (data, status) => {
        console.log("CreateGroupProduct: ", data);
        if (status) {
          if (data) {
            if (get(data, "code") == 0) {
              if (size(data.data) > 0) {
                callback && callback(true, get(data, "data"));
              } else {
                callback && callback(false);
              }
              SimpleToast.show(data.message);
            } else {
              callback && callback(false);
              SimpleToast.show(data.message);
            }
          } else {
            callback && callback(false);
          }
        } else {
          callback && callback(false);
          SimpleToast.show("Lỗi kết nối CGP 574");
        }
      }
    );
  }

  @action
  UpdateGroupProduct() {}

  @action
  deleteGroupProduct(id, callback = null) {
    PostWithToken(
      api.GROUP_PRODUCT.deleteGroupProduct + id,
      {},
      (data, status) => {
        if (status) {
          if (data) {
            if (get(data, "code") == 0) {
              SimpleToast.show("Xóa mặt hàng thành công");
            } else {
              callback && callback(false);
            }
          } else {
            callback && callback(false);
          }
        } else {
          callback && callback(false);
          SimpleToast.show("Lỗi kết nối DGP 601");
        }
      }
    );
  }

  @action
  getInfoGroupProduct(id, callback = null) {
    PostWithToken(
      api.GROUP_PRODUCT.getInfoGroupProduct + id,
      {},
      (data, status) => {
        console.log("getInfoGroupProduct: ", data);
        if (status) {
          if (data) {
            if (get(data, "code") == 0) {
              // if (size(get(data, "code")) > 0) {
              //   callback && callback(true, get(data, "data"));
              // } else {
              //   callback && callback(false);
              // }
            } else {
              callback && callback(false);
              SimpleToast.show(data.message);
            }
          } else {
            callback && callback(false);
          }
        } else {
          callback && callback(false);
          SimpleToast.show("Lỗi kết nối GIGP631");
        }
      }
    );
  }

  @action
  addNewGroupItem(title, color) {
    let id = "IDGROUP" + moment(new Date()).format("YYMMDDHHmmss");
    //cập nhật lại groupId cho các mặt hàng vừa thêm vào
    let listItemSetProduct = this.listItemSetProduct;
    console.log(
      "listItemSetProduct luc dau: " + JSON.stringify(listItemSetProduct)
    );
    if (listItemSetProduct.length > 0) {
      listItemSetProduct.map((item, index) => {
        item.groupId = id;
        this.listProduct.map((obj, idx) => {
          if (obj.id == item.id) {
            this.listProduct[idx].groupId = id;
          }
        });
      });
    }

    console.log(
      "listItemSetProduct luc sau: " + JSON.stringify(listItemSetProduct)
    );
    let item = {
      id: id,
      title: title,
      color: color,
      listProduct: listItemSetProduct
    };
    this.listGroupProduct.push(item);
    console.log(
      " this.listProduct duoc them vao: " +
        JSON.stringify(this.listGroupProduct)
    );
    this.clearListSetProduct();
  }

  @action
  editGroupItem(id, title, color) {
    let indexItem = findIndex(this.listGroupProduct, function(o) {
      return o.id == id;
    });

    console.log(
      " this.listGroupProduct dau: " + JSON.stringify(this.listGroupProduct)
    );

    //tìm xem thằng id cần sửa có nằm trong ds nhóm không?
    if (indexItem + "" != "-1") {
      //nếu tồn tại

      //cập nhật lại groupId cho các mặt hàng vừa thêm vào
      let listItemSetProduct = this.listItemSetProduct;
      // console.log('listItemSetProduct luc daueditGroupItems: ' + JSON.stringify(listItemSetProduct))

      //nếu ds gán group tồn tại
      if (listItemSetProduct.length > 0) {
        listItemSetProduct.map((item, index) => {
          //gán tất cả sản phẩm trong ds về groupId của id hiện tại
          item.groupId = id;

          //gán groupId của thằng id trong dsach sản phẩm
          this.listProduct.map((obj, idx) => {
            //nếu thằng id này trùng với id trong listItemSetProduct
            if (obj.id == item.id) {
              //xoa thằng mặt hàng này khỏi nhóm kia

              // tim thằng nhóm cũ của thằng mặt hàng này
              let indexGroupOld = findIndex(this.listGroupProduct, function(
                oldMain
              ) {
                return oldMain.id == obj.groupId;
              });

              if (indexGroupOld + "" != "-1") {
                if (this.listGroupProduct[indexGroupOld].listProduct) {
                  let indexItemGroupOld = findIndex(
                    this.listGroupProduct[indexGroupOld].listProduct,
                    function(oldChild) {
                      return oldChild.groupId == obj.groupId;
                    }
                  );
                }

                let listProductTmp = this.listGroupProduct[indexGroupOld]
                  .listProduct;
                listProductTmp.splice(indexGroupOld, 1);
                this.listGroupProduct[
                  indexGroupOld
                ].listProduct = listProductTmp;
                console.log(
                  " this.listGroupProduct sau: " +
                    JSON.stringify(this.listGroupProduct)
                );
              }

              //cập nhật groupId cho thằng mh này
              this.listProduct[idx].groupId = id;
            }
          });
        });
      }
      // console.log('listItemSetProduct luc saueditGroupItem: ' + JSON.stringify(listItemSetProduct) + ' ~~~~~' + JSON.stringify(this.listProduct))

      this.listGroupProduct[indexItem].title = title;
      this.listGroupProduct[indexItem].color = color;
      this.listGroupProduct[indexItem].listProduct = listItemSetProduct;
    }
    //cập nhật lại groupId cho các mặt hàng vừa thêm vào

    // console.log('indexItem : ' + indexItem + ' luc sau khi cap nhat la: ' + JSON.stringify(this.listGroupProduct))
    this.clearListSetProduct();
  }

  @action
  setListSetProduct(item) {
    console.log("item 572: ", item);
    let listItemSetProduct = toJS(this.listItemSetProduct) || [];
    console.log("listItemSetProduct 572: ", listItemSetProduct);
    listItemSetProduct.push(item);
    this.listItemSetProduct = listItemSetProduct;
    console.log(
      "listItemSetProduct: " + JSON.stringify(this.listItemSetProduct)
    );
  }

  @action
  removeListSetProduct(item) {
    let listItemSetProduct = this.listItemSetProduct;
    remove(listItemSetProduct, function(o) {
      return o.id == item.id;
    });
    this.listItemSetProduct = listItemSetProduct;
  }

  removeGroupProduct(id, callback = null) {
    remove(this.listGroupProduct, function(o) {
      return o.id === id;
    });
    this.deleteGroupProduct(id);
  }

  @action
  clearListSetProduct() {
    this.listItemSetProduct = [];
  }
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~sale - product ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  @action
  getListDiscountCode(name, dNhomVoucherId, page, callback = null) {
    let body = {
      name,
      dNhomVoucherId,
      page,
      size: 100
    };
    let dataOld = toJS(this.listSale);
    if (page == 0) {
      dataOld = [];
    }
    PostWithToken(api.VOUCHERS.getListDiscountCode, body, (data, status) => {
      console.log("getListDiscountCodeP: ", data);
      if (status) {
        if (data) {
          if (get(data, "code") == 0) {
            if (size(data.data) > 0) {
              this.setListSale([...dataOld, ...data.data]);
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
      } else {
        callback && callback(false);
        SimpleToast.show("Lỗi kết nối GLDC 816.");
      }
    });
  }

  @action
  setListSale(data) {
    this.listSale = data;
  }

  @action
  addNewSaleItem(
    name,
    giatri,
    ngayphathanh,
    hansudung,
    dNhomVoucherId,
    callback = null
  ) {
    let body = {
      name,
      giatri,
      ngayphathanh: "2019-05-22 20:00:00",
      hansudung: "2019-06-01 20:00:00",
      dNhomVoucherId
    };
    PostWithToken(api.VOUCHERS.createDiscountCode, body, (data, status) => {
      if (status) {
        // console.log('createDiscountCode ',data)
        if (get(data, "code") == 0) {
          SimpleToast.show("Thêm mã giảm giá thành công!");
          callback && callback(true);
        } else {
          SimpleToast.show(get(data.data, "message"));
          callback && callback(false);
        }
      } else {
        callback && callback(false);
        SimpleToast.show("Lỗi kết nối CDC854");
      }
    });
  }

  @action
  editSaleItem(
    id,
    name,
    giatri,
    ngayphathanh,
    hansudung,
    dNhomVoucherId,
    callback = null
  ) {
    let body = {
      name,
      giatri,
      ngayphathanh: "2019-05-22 20:00:00",
      hansudung: "2019-06-01 20:00:00",
      dNhomVoucherId
    };
    PostWithToken(
      api.VOUCHERS.updateDiscountCode + id,
      body,
      (data, status) => {
        if (status) {
          // console.log('createDiscountCode ',data)
          if (get(data, "code") == 0) {
            SimpleToast.show("Update thành công!");
            callback && callback(true);
          } else {
            SimpleToast.show(get(data.data, "message"));
            callback && callback(false);
          }
        } else {
          callback && callback(false);
          SimpleToast.show("Lỗi kết nối ESI891");
        }
      }
    );
    // if (indexItem + "" != "-1") {
    //   this.listSale[indexItem].name = name
    //     ? name
    //     : this.listSale[indexItem].name;
    //   this.listSale[indexItem].giatri = giatri
    //     ? giatri
    //     : this.listSale[indexItem].giatri;
    //   this.listSale[indexItem].type =
    //     type != undefined ? type : this.listSale[indexItem].type;
    // }
  }

  @action
  removeItemSale(id, callback = null) {
    // remove(this.listSale, function(o) {
    //   return o.id == id;
    // });
    PostWithToken(api.VOUCHERS.deleteDiscountCode + id, {}, (data, status) => {
      if (status) {
        if (get(data, "code") == 0) {
          callback && callback(true);
        } else {
          SimpleToast.show(get(data, "message"));
          callback && callback(false);
        }
      }
    });
  }
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~sale - product ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  @action
  checkGroup(groupID) {
    let title = "Không có danh mục nào";
    // console.log('groupID: ' + groupID)
    let obj = find(this.listGroupProduct, function(o) {
      return o.id == groupID;
    });
    // console.log('checkGroup groupID: ' + groupID + ' --: ' + JSON.stringify(obj))
    if (obj) {
      title = obj.title;
    }
    return title;
  }

  @action
  setDataListSell(item) {
    if (item.id == "all") {
      this.dataListSell = this.listProduct;
    } else if (item.id == "sale") {
      this.dataListSell = this.listSale;
    } else {
      console.log(
        "this.listProduct: " +
          JSON.stringify(this.listProduct) +
          " -item: " +
          JSON.stringify(item)
      );
      this.dataListSell = filter(this.listProduct, function(o) {
        return o.groupId == item.id;
      });
    }
  }

  @action
  genListGroupProductFilter() {
    let list = [
      {
        id: "",
        name: "Tất cả",
        color: "#ccc"
      }
    ];

    //danh sach nhom
    if (this.listGroupProduct.length == 0) {
      this.getDataListGroup("", "", 0, status => {
        if (status) {
          list = [...list, ...toJS(this.listGroupProduct)];
        }
        return list;
      });
    } else {
      list = [...list, ...toJS(this.listGroupProduct)];
      return list;
    }
  }

  @action
  filterDataProduct(groupId) {
    console.log("this.listProduct: " + JSON.stringify(this.listProduct));
    let list = filter(this.listProduct, function(o) {
      return o.category.id === groupId;
    });
    console.log(list);
    return list;
  }

  @action
  setListProduct(listProduct) {
    this.listProduct = listProduct;
  }
}

export default new Product();
