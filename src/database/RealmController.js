import Realm from 'realm';

import moment from 'moment'
var defaultPath = Realm.defaultPath;

let message = 'MessangeRealmObject';
let listImage = 'ListImageRealmObject'
let school = 'SchoolRealmObject'
let group = 'GroupRealmObject'
let media = 'MediaRealmObject'
let teacher = 'TeacherRealmObject'
let info = 'InfoRealmObject'

let customer = "CustomerRealmObject";
let sale = "SaleRealmObject"
let saleType = "SaleTypeRealmObject"
let groupProduct = "GroupProductRealmObject";
let orders = "OrdersRealmObject";
let orderDetail = "OrderDetailRealmObject";
let product = "ProductRealmObject";
let shop = "ShopRealmObject";
let user = "UserRealmObject";

let database = new Realm({
    path: 'smartpos.realm',
    schema: [
        {
            name: customer,
            primaryKey: 'CUSTOMER_ID',
            properties: {
                CUSTOMER_ID: 'string',
                NAME: 'string',
                PHONE: 'string',
                CREATED_AT: 'string',
                UPDATED_AT: 'string'
            }
        },
        {
            name: sale,
            primaryKey: 'SALE_ID',
            properties: {
                SALE_ID: 'string',
                NAME: 'string',
                SALE_TYPE_ID: 'string'
                CREATED_AT: 'string',
                UPDATED_AT: 'string'
            }
        },
        {
            name: saleType,
            primaryKey: 'SALE_TYPE_ID',
            properties: {
                SALE_TYPE_ID: 'string',
                NAME: 'string',
                CREATED_AT: 'string',
                UPDATED_AT: 'string'
            }
        },
        {
            name: groupProduct,
            primaryKey: 'GROUP_PRODUCT_ID',
            properties: {
                GROUP_PRODUCT_ID: 'string',
                NAME: 'string',
                CODE: 'string',
                AVATAR: 'string',
                COLOR: 'string',
                LIST_PRODUCT: 'data',
                CREATED_AT: 'string',
                UPDATED_AT: 'string'
            }
        },
        {
            name: orders,
            primaryKey: 'ORDERS_ID',
            properties: {
                ORDERS_ID: 'string',
                CUSTOMER_ID: 'string',
                USER_ID: 'string',
                CREATED_AT: 'string',
                UPDATED_AT: 'string',
                GIABAN: 'float',
                GIANHAP: 'float',
                SOLUONG: 'float',
                SHOP_ID: 'string'
            }
        },
        {
            name: orderDetail,
            primaryKey: 'ORDERS_DETAIL_ID',
            properties: {
                ORDERS_DETAIL_ID: 'string',
                ORDERS_ID: 'string',
                PRODUCT_ID: 'string',
                NAME: 'string',
                CODE: 'string',
                CREATED_AT: 'string',
                UPDATED_AT: 'string',
                AVATAR: 'string',
                GIABAN: 'float',
                GIANHAP: 'float',
                SOLUONG: 'float',
                TONGTIENNHAP: 'float',
                TONGTIENBAN: 'float'
            }
        },
        {
            name: product,
            primaryKey: 'PRODUCT_ID',
            properties: {
                PRODUCT_ID: 'string',
                NAME: 'string',
                AVATAR: 'string',
                COLOR: 'string',
                GIABAN: 'float',
                GIANHAP: 'float',
                CODE: 'string',
                GROUP_PRODUCT_ID: 'string',
                IS_OFFLINE: 'boolean',
                COMMENT: 'string',
                SALE_ID: 'string',
                CREATED_AT: 'string',
                UPDATED_AT: 'string'
            }
        },
        {
            name: shop,
            primaryKey: 'SHOP_ID',
            properties: {
                SHOP_ID: 'string',
                NAME: 'string',
                PHONE: 'string',
                ADDRESS: 'string',
                CREATED_AT: 'string',
                UPDATED_AT: 'string'
            }
        },
        {
            name: user,
            primaryKey: 'USER_ID',
            properties: {
                USER_ID: 'string',
                USERNAME: 'string',
                PASSWORD: 'string',
                SALT: 'string',
                FULLNAME: 'string'
                PHONE: 'string',
                AVATAR: 'string',
                POSITION: 'string',
                SHOPID: 'string',
                CREATED_AT: 'string',
                UPDATED_AT: 'string'
            }
        },


    ]
});
let RealmController = {

    //GroupProduct
    // --- them moi mot group 
    saveGroupProduct: function (object) {
        if (database.objects(groupProduct).filtered("id = '" + object.id + "'").length) return;
        database.write(() => {
            database.create(school, object);
        })
    },
    // --- cap nhat mot group 
    updateGroupProductById: function (id, object) {
        let groupProductTemp = database.objects(groupProduct)
            .filtered("id = '" + id + "'")[0];
        if (groupProductTemp) {
            database.write(() => {
                groupProductTemp.NAME = object.NAME || groupProductTemp.NAME;
                groupProductTemp.CODE = object.CODE || groupProductTemp.CODE;
                groupProductTemp.AVATAR = object.AVATAR || groupProductTemp.AVATAR;
                groupProductTemp.COLOR = object.COLOR || groupProductTemp.COLOR;
                groupProductTemp.LIST_PRODUCT = object.LIST_PRODUCT || groupProductTemp.LIST_PRODUCT;
                groupProduct.UPDATED_AT = new Date()
            });
        }
    },

    //Sale
    // --- them moi mot group 
    saveGroupProduct: function (object) {
        if (database.objects(groupProduct).filtered("id = '" + object.id + "'").length) return;
        database.write(() => {
            database.create(school, object);
        })
    },
    // --- cap nhat mot group 
    updateGroupProductById: function (id, object) {
        let groupProductTemp = database.objects(groupProduct)
            .filtered("id = '" + id + "'")[0];
        if (groupProductTemp) {
            database.write(() => {
                groupProductTemp.NAME = object.NAME || groupProductTemp.NAME;
                groupProductTemp.CODE = object.CODE || groupProductTemp.CODE;
                groupProductTemp.AVATAR = object.AVATAR || groupProductTemp.AVATAR;
                groupProductTemp.COLOR = object.COLOR || groupProductTemp.COLOR;
                groupProductTemp.LIST_PRODUCT = object.LIST_PRODUCT || groupProductTemp.LIST_PRODUCT;
                groupProduct.UPDATED_AT = new Date()
            });
        }
    },

    //SaleType
    // --- them moi mot group 
    saveGroupProduct: function (object) {
        if (database.objects(groupProduct).filtered("id = '" + object.id + "'").length) return;
        database.write(() => {
            database.create(school, object);
        })
    },

    // --- cap nhat mot group 
    updateGroupProductById: function (id, object) {
        let groupProductTemp = database.objects(groupProduct)
            .filtered("id = '" + id + "'")[0];
        if (groupProductTemp) {
            database.write(() => {
                groupProductTemp.NAME = object.NAME || groupProductTemp.NAME;
                groupProductTemp.CODE = object.CODE || groupProductTemp.CODE;
                groupProductTemp.AVATAR = object.AVATAR || groupProductTemp.AVATAR;
                groupProductTemp.COLOR = object.COLOR || groupProductTemp.COLOR;
                groupProductTemp.LIST_PRODUCT = object.LIST_PRODUCT || groupProductTemp.LIST_PRODUCT;
                groupProduct.UPDATED_AT = new Date()
            });
        }
    },
    // findAllProduct: function (object) {
    // if (database.objects())
    // }

    // saveInfo: function (object) {
    //     if (database.objects(info).filtered("phoneNumber = '" + object.phoneNumber + "'").length) return;
    //     database.write(() => {
    //         database.create(info, object);
    //     })
    // },
    // saveListImage: function (object) {
    //     database.write(() => {
    //         database.create(listImage, object);
    //     })
    // },
    // saveSchool: function (object) {
    //     if (database.objects(school).filtered("id = '" + object.id + "'").length) return;
    //     database.write(() => {
    //         database.create(school, object);
    //     })
    // },
    // updateImageMediaById: function (id, listImage) {
    //     let mmessTemp = database.objects(media)
    //         .filtered("id = '" + id + "'")[0];
    //     if (mmessTemp) {
    //         database.write(() => {
    //             mmessTemp.images = listImage + ''
    //         });
    //     }
    // },
    // updateGroupById: function (id, FirstMessageTitle, totalUnreadMessage) {
    //     let groupTemp = database.objects(group)
    //         .filtered("groupId = '" + id + "'")[0];
    //     if (groupTemp) {
    //         database.write(() => {
    //             groupTemp.FirstMessageTitle = FirstMessageTitle,
    //                 groupTemp.totalUnreadMessage = totalUnreadMessage
    //         });
    //     }
    // },
    // findGroupById: function (id) {
    //     return database.objects(group).filtered("groupId = '" + id + "'")[0];
    // },

    // updateImageBackGroudMediaById: function (id, imagebackgroud) {
    //     let mmessTemp = database.objects(media)
    //         .filtered("id = '" + id + "'")[0];
    //     if (mmessTemp) {
    //         database.write(() => {
    //             mmessTemp.imageBackground = imageBackground + ''
    //         });
    //     }
    // },
    // updateStateById: function (id, state) {
    //     let mediaTemp = database.objects(message)
    //         .filtered("id = '" + id + "'")[0];
    //     if (mediaTemp) {
    //         database.write(() => {
    //             mediaTemp.state = state
    //         });
    //     }
    // },
    // checkUpdateMedia: function (id) {
    //     let mediaTemp = database.objects(media)
    //         .filtered("id = '" + id + "'")[0];
    //     // return  moment(mediaTemp.date).format('DD/MM/YYYY HH:mm')
    //     if (moment(mediaTemp.date).format('DD/MM/YYYY HH:mm') === moment(mediaTemp.updatedAt).format('DD/MM/YYYY HH:mm')) {
    //         return true
    //     } else {
    //         return false
    //     }
    // },
    // findMediaById: function (id) {
    //     return database.objects(media).filtered("id = '" + id + "'")[0];
    // },
    // findAllMedia: function () {
    //     return database.objects(media);
    // },
    // saveMedia: function (object) {
    //     if (database.objects(media).filtered("id = '" + object.id + "'").length) {
    //         let mediaTemp = database.objects(media)
    //             .filtered("id = '" + object.id + "'")[0];
    //         if (mediaTemp) {
    //             database.write(() => {
    //                 mediaTemp.content = object.content,
    //                     mediaTemp.title = object.title,
    //                     mediaTemp.imageBackground = object.imageBackground,
    //                     mediaTemp.textName = object.textName,
    //                     mediaTemp.date = object.date,
    //                     mediaTemp.updatedAt = object.updatedAt,
    //                     mediaTemp.images = object.images,
    //                     mediaTemp.videoUrl = object.videoUrl,
    //                     mediaTemp.type = object.type,
    //                     mediaTemp.service = object.service,
    //                     mediaTemp.logo = object.logo
    //             });
    //         }
    //     } else {
    //         database.write(() => {
    //             database.create(media, object);

    //         })
    //     }

    // },
    // saveTeacher: function (object) {
    //     if (database.objects(teacher).filtered("teacherId = '" + object.teacherId + "'").length) return;
    //     database.write(() => {
    //         database.create(teacher, object);

    //     })
    // },
    // findAllInfo: function () {
    //     return database.objects(info);
    // },
    // findAllTeacher: function () {
    //     return database.objects(teacher);
    // },
    // findAllSchools: function () {
    //     return database.objects(school);
    // },
    // findAllListImage: function () {
    //     return database.objects(listImage);
    // },
    // findAllMessage: function () {
    //     return database.objects(message);
    // },
    // findAllGroup: function () {
    //     return database.objects(group);
    // },
    // saveGroup: function (object) {
    //     if (database.objects(group).filtered("groupId = '" + object.groupId + "'").length) return;
    //     database.write(() => {
    //         database.create(group, object);
    //     })
    // },
    // findLogoShoolById: function (id) {
    //     return database.objects(school).filtered("id = '" + id + "'")[0].logo;
    // },
    // findItemMessById: function (id) {
    //     return database.objects(message).filtered("id = '" + id + "'")[0];
    // },
    // findListImageItemMessById: function (id) {
    //     return database.objects(message).filtered("id = '" + id + "'")[0];
    // },
    // removeAllSchool: function () {
    //     database.write(() => {
    //         database.delete(database.objects(school));
    //     })
    // },
    // removeAllMessage: function () {
    //     database.write(() => {
    //         database.delete(database.objects(message));
    //     })
    // },
    // removeAllTeacher: function () {
    //     database.write(() => {
    //         database.delete(database.objects(teacher));
    //     })
    // },
    // removeAllGroup: function () {
    //     database.write(() => {
    //         database.delete(database.objects(group));
    //     })
    // },
    // removeAllInfo: function () {
    //     database.write(() => {
    //         database.delete(database.objects(info));
    //     })
    // },
    // removeAllMedia: function () {
    //     database.write(() => {
    //         database.delete(database.objects(media));
    //     })
    // },
    // findTextAllMessage: function (txt) {
    //     return database.objects(message).filtered("title = '" + id + "' AND title = '"+txt+ "'");
    // }
}
module.exports = RealmController;
