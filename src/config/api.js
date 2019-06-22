const api = {
  AUTH: {
    login: "/login",
    forgetPass: "/forgot-password",
    userInfo: "/user-info",
    changePass: "/change-pass",
    logout: "/logout",
    signup: "/signup"
  },
  CUSTOMERS: {
    // GetListCustomers: "/customers/list",
    // CreateCustomer: "/customers/insert",
    // UpdateCustomer: "/customers/update/", ///customers/update/{id}
    // DeleteCustomer: "/customers/delete/", ///customers/delete/{id}
    // GetInfoCustomer: "/customers/info/{id}" ///customers/info/{id}
  },
  PRODUCT: {
    warehouses: "/warehouses", //danh sach san pham
    list_categories: "/list_categories", //danh sach nhom
    create_product_warehouse: "/create_product_warehouse",
    user_stop_providing: "/user_stop_providing",
    user_start_providing: "/user_start_providing",
    user_stop_providing_category: "/user_stop_providing_category",
    user_start_providing_category: "/user_start_providing_category",
    user_inventory: "/user_inventory"
    // getListProduct: "/products/list",
    // addProduct: "/products/insert",
    // updateProduct: "/products/update/",
    // deleteProduct: "/products/delete/",
    // getListInventory: '/inventory/list',// danh sách tồn kho
  },
  GROUP_PRODUCT: {
    // getListGroupProduct: "/product-groups/list",
    // createGroupProduct: "/product-groups/insert",
    // updateGroupProduct: "/product-groups/update/", ///product-groups/update/{id},
    // deleteGroupProduct: "/product-groups/delete/", ///product-groups/delete/{id}
    // getInfoGroupProduct: "/product-groups/info/" ///product-groups/info/{id}
  },
  VOUCHERS: {
    // getListDiscountCode: "/vouchers/list",
    // createDiscountCode: "/vouchers/insert",
    // updateDiscountCode: "/vouchers/update/", ///vouchers/update/{id}
    // deleteDiscountCode: "/vouchers/delete/", ///vouchers/delete/{id}
    // getInfoDiscountCode: "/vouchers/info/" ///vouchers/info/{id}
  },
  ORDERS: {
    // getListOrders: "/bills/list",
    // getDetailOrder: "/bill/info/", ///bill/info/{id}
    // refundOrder: "",
    // CreateOrder: "/bill/insert"
  },
  BILL: {
    sell: "/sell",
    bills: "/sells",
    sell_detail: "/sell_detail",
    bill_detail: "/bill_detail"
    // getListBill: "/bills/list",
    // getBillInfo: "/bill/info/"
  }
};

export default api;
