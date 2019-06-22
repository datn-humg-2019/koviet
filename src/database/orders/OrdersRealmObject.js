class OrdersRealmObject {
    constructor(ORDERS_ID, CUSTOMER_ID, USER_ID, CREATED_AT, GIABAN, GIANHAP, SOLUONG, SHOP_ID) {
        this.ORDERS_ID = ORDERS_ID,
            this.CUSTOMER_ID = CUSTOMER_ID,
            this.USER_ID = USER_ID,
            this.CREATED_AT = CREATED_AT,
            this.GIABAN = GIABAN,
            this.GIANHAP = GIANHAP,
            this.SOLUONG = SOLUONG,
            this.SHOP_ID = SHOP_ID
    }
}
module.exports = OrdersRealmObject;
