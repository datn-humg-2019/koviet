class OrdersDetailRealmObject {
    constructor(ORDERS_DETAIL_ID, ORDERS_ID, PRODUCT_ID, NAME, CODE, CREATED_AT, AVATAR, GIABAN, GIANHAP, SOLUONG, TONGTIENNHAP, TONGTIENBAN) {
        this.ORDERS_DETAIL_ID = ORDERS_DETAIL_ID,
            this.ORDERS_ID = ORDERS_ID,
            this.PRODUCT_ID = PRODUCT_ID,
            this.NAME = NAME,
            this.CODE = CODE,
            this.CREATED_AT = CREATED_AT,
            this.AVATAR = AVATAR,
            this.GIABAN = GIABAN,
            this.GIANHAP = GIANHAP,
            this.SOLUONG = SOLUONG,
            this.TONGTIENNHAP = TONGTIENNHAP,
            this.TONGTIENBAN = TONGTIENBAN
    }
}
module.exports = OrdersDetailRealmObject;
