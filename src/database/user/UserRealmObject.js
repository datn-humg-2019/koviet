class UserRealmObject {

    constructor(USER_ID, USERNAME, PASSWORD, SALT, FULLNAME, PHONE, AVATAR, POSITION, SHOP_ID) {
        THIS.USER_ID = USER_ID,
            THIS.USERNAME = USERNAME,
            THIS.PASSWORD = PASSWORD,
            THIS.SALT = SALT,
            THIS.FULLNAME = FULLNAME,
            THIS.PHONE = PHONE,
            THIS.AVATAR = AVATAR,
            THIS.POSITION = POSITION,
            THIS.SHOP_ID = SHOP_ID
    }
}
module.exports = UserRealmObject;
