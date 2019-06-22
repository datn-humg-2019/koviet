
import {
    Platform
} from "react-native";
import api from './api'
import color from "./color";
import values from './values'
import screenId from './screenId'
import images from "./images";

import fonts from '../config/fonts'
let config = {}

config.app_version = "0.0.1";
config.domain = "https://kiot-viet.herokuapp.com";
config.domain_api = config.domain + "/api";
config.api_key = 'fcbf9b9962e023dcee2855564757972c'

config.typeHome = { home: 0, info: 1 }
config.extraInfo = [
    { id: 'add', name: 'Thêm KH vào Hoá đơn', image: images.ic_add_user },
    { id: 'delete', name: 'Xoá nội dung hoá đơn', image: images.ic_delete_bill },
    { id: 'sync', name: 'Đồng bộ dữ liệu', image: images.ic_sync }
]
config.extraInfoWithCustomer = [
    { id: 'add', name: 'Hồ sơ khách hàng', image: images.ic_customerInfo },
    { id: 'delete', name: 'Xoá nội dung hoá đơn', image: images.ic_delete_bill },
    { id: 'sync', name: 'Đồng bộ dữ liệu', image: images.ic_sync }
]

config.typeScreenCustomInfo = { isInfoCustomer: 'isInfoCustomer' }

config.allProduct = {
    id: '',
    name: 'Tất cả',
    color: '#ccc',
}


config.typeProduct = {
    weight: 0, each: 1
}

config.payType = {
    cash: 0, card: 1
}
config.prevScreen = { product: 'product', group: 'group' }
// b6907d289e10d714a6e88b30761fae22
export {
    api,
    color,
    fonts,
    images,
    screenId,
    values,
    config
}