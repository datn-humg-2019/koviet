import React, { Component } from 'react'
import {head,get,} from 'lodash'
import { Text, View, Image, TouchableOpacity } from 'react-native'
import numeral from 'numeral'
import { values, color, images } from '../../../../../config';
export default class FlatlistItem extends Component {
    constructor(props) {
        super(props)

        this.state = {
            price: 0
        }
    }

    componentWillMount() {
    }

    render() {
        let { item, clickItem, changeValue } = this.props;
        let width = values.deviceWidth / 7.5 < 80 ? values.deviceWidth / 7.5 : 80;
        // console.log('cart item: ' + JSON.stringify(item))
        // let priceSale = 0;
        // if (item.sales) {
        //     item.sales.map((obj, index) => {
        //         if (obj) {
        //             // type: 0//1 ; 0: phần trăm; 1: mỗi 
        //             // if (obj.type == 1) {
        //             //     priceSale = priceSale + parseFloat(obj.value + '')
        //             // } else {
        //             //     priceSale = priceSale + (
        //             //         parseFloat(obj.value + '')
        //             //         * parseFloat(item.price + '')
        //             //         * (parseFloat(item.value + '') / parseFloat(item.valueDefault + ''))
        //             //         / 100)
        //             // }giatri
        //             priceSale = parseFloat(obj.giatri)
        //         }
        //     })
        // }
        return (
            <View style={{
                width: '100%', padding: 10, backgroundColor: 'white',
                marginBottom: 10, borderRadius: 10, overflow: 'hidden',
            }}>
                <TouchableOpacity
                    onPress={() => clickItem(item)}
                    style={[{
                        width: '100%', flexDirection: 'row',
                        overflow: 'hidden', alignItems: 'center'
                    },
                    ]}>
                    <View style={{
                        width: width, height: width,
                        borderRadius: 10,
                        overflow: 'hidden',
                    }}>
                       {head(get(item, "images")) ? (
                <Image
                  style={{ width: "100%", height: "100%" }}
                  source={{ uri: head(get(item, "images")) }}
                />
              ) : (
                <View
                  style={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: item.color || color.mainColor
                  }}
                />
              )}
                    </View>
                    <View style={{ flex: 1, paddingLeft: 10, justifyContent: 'space-between', backgroundColor: 'transparent' }}>
                        <Text
                            numberOfLines={2}
                            style={{ fontSize: values.fontSizeNormal, color: color.HOME.nolected, flex: 1, backgroundColor: 'transparent' }} >{item.name || ''}</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Text
                                style={{ color: color.mainColor, fontWeight: '500', }}
                            >{(item.price_sale ? numeral(item.price_sale).format('0,0') : '') + ' đ'}</Text>
                            {/* {
                                item.sales.length > 0
                                    ?
                                    <Image source={images.ic_sale_cart} style={{ width: 15, height: 15, resizeMode: 'contain', marginLeft: 10, }} />
                                    :
                                    null
                            } */}
                        </View>
                    </View>
                    <View style={{ borderRadius: 5, borderWidth: 1, borderColor: color.HOME.borderColorAdd, height: 25, flexDirection: 'row', backgroundColor: 'transparent' }}>
                        <TouchableOpacity
                            onPress={() => changeValue('-', item)}
                            activeOpacity={1} style={{ width: 25, alignItems: 'center', justifyContent: 'center', }}>
                            <Text style={{ color: color.mainColor, fontSize: values.fontSizeNormal, }}>-</Text></TouchableOpacity>
                        <TouchableOpacity activeOpacity={1} style={{
                            minWidth: 25, alignItems: 'center', justifyContent: 'center', borderLeftWidth: 1,
                            borderRightWidth: 1, borderLeftColor: color.HOME.borderColorAdd, borderRightColor: color.HOME.borderColorAdd
                        }}><Text numberOfLines={1} style={{ color: color.mainColor, fontSize: values.fontSizeNormal, width: '100%', textAlign: 'center' }}>{item.value}</Text></TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => changeValue('+', item)}
                            activeOpacity={1} style={{ width: 25, alignItems: 'center', justifyContent: 'center', }}>
                            <Text style={{ color: color.mainColor, fontSize: values.fontSizeNormal, }}>+</Text></TouchableOpacity>
                    </View>
                </TouchableOpacity>
                {/* {
                    item.sales && item.sales.length > 0
                        ?
                        < View style={{
                            // borderBottomWidth: 0.5, borderBottomColor: '#ccc',
                            alignItems: 'center', justifyContent: 'space-between', marginTop: 5, paddingVertical: 5,
                            borderTopColor: '#ccc', borderTopWidth: 0.5, flexDirection: 'row',
                        }}>
                            <Text style={{ fontSize: values.fontSizeSmall, color: color.HOME.nolected }}>{'Giảm giá:'}</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
                                <Image source={images.ic_sale_cart} style={{
                                    width: 15, height: 15, resizeMode: 'contain',
                                    marginRight: 10, tintColor: color.HOME.nolected,
                                }} />
                                <Text style={{ fontSize: values.fontSizeNormal, color: '#000' }}>{numeral(price_sale).format('0,0')}</Text>
                            </View>
                        </View>
                        :
                        null
                } */}
                {/* {
                    item.comment
                        ?
                        <View style={{
                            width: '100%',
                            justifyContent: 'center',
                            borderTopColor: '#ccc', borderTopWidth: 0.5,
                        }}>
                            <Text style={{
                                backgroundColor: 'transparent', paddingTop: 5,
                                fontSize: values.fontSizeSmall, color: color.HOME.nolected
                            }}>{'Ghi chú: ' + item.comment}</Text>
                        </View>
                        :
                        null
                } */}
            </View >
        )
    }
}