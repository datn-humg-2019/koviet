class SaleRealmObject {
    constructor(SALE_ID, NAME, SALE_TYPE_ID, CREATED_AT, UPDATED_AT) {
        this.SALE_ID = SALE_ID,
            this.NAME = NAME,
            this.SALE_TYPE_ID = SALE_TYPE_ID,
            this.CREATED_AT = CREATED_AT,
            this.UPDATED_AT = UPDATED_AT
    }
}
module.exports = SaleRealmObject;