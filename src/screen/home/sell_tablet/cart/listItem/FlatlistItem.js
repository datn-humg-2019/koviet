import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity } from 'react-native'
import numeral from 'numeral'
import _ from 'lodash'
import { values, color } from '../../../../../config';
export default class FlatlistItem extends Component {
    render() {
        let { item, clickItem, changeValue } = this.props;
        let width = values.deviceWidth / 7.5 < 80 ? values.deviceWidth / 7.5 : 80;
        return (
            // <View style={[{
            //     width: '100%', alignItems: 'center', justifyContent: 'center'
            // },
            //     // values.platform == 'ios' ? {
            //     //     shadowColor: '#000000',
            //     //     shadowOffset: { width: 2, height: 4 },
            //     //     shadowOpacity: 0.2,
            //     //     shadowRadius: 10,

            //     // }
            //     //     :
            //     //     { elevation: 10 }
            // ]} >
            <TouchableOpacity
                onPress={() => clickItem(item)}
                style={[{
                    width: '100%', flexDirection: 'row', padding: 10,
                    marginBottom: 10,
                    backgroundColor: 'white',
                    borderRadius: 10,
                    overflow: 'hidden', alignItems: 'center'
                },
                ]}>
                <View style={{
                    width: width, height: width,
                    borderRadius: 10,
                    overflow: 'hidden',
                }}>
                    {
                        item.image
                            ?
                            <Image style={{ width: '100%', height: '100%', }}
                                source={{ uri: item.image }} />
                            :
                            <View style={{ width: '100%', height: '100%', backgroundColor: item.color || color.mainColor }} />
                    }
                </View>
                <View style={{ flex: 1, paddingLeft: 10, justifyContent: 'space-between', backgroundColor: 'transparent' }}>
                    <Text
                        numberOfLines={2}
                        style={{ fontSize: values.fontSizeNormal, color: color.HOME.nolected, flex: 1, backgroundColor: 'transparent' }} >{item.title || ''}</Text>
                    <Text
                        style={{ color: color.mainColor, fontWeight: '500', flex: 1 }}
                    >{(item.price ? numeral(item.price).format('0,0') : '') + ' ' + (item.unit || '')}</Text>
                </View>
                <View style={{ borderRadius: 5, borderWidth: 1, borderColor: color.HOME.borderColorAdd, height: 25, flexDirection: 'row', backgroundColor: 'transparent' }}>
                    <TouchableOpacity
                        onPress={() => this.props.changeValue('-', item)}
                        activeOpacity={1} style={{ width: 25, alignItems: 'center', justifyContent: 'center', }}>
                        <Text style={{ color: color.mainColor, fontSize: values.fontSizeNormal, }}>-</Text></TouchableOpacity>
                    <TouchableOpacity activeOpacity={1} style={{
                        minWidth: 25, alignItems: 'center', justifyContent: 'center', borderLeftWidth: 1,
                        borderRightWidth: 1, borderLeftColor: color.HOME.borderColorAdd, borderRightColor: color.HOME.borderColorAdd
                    }}><Text numberOfLines={1} style={{ color: color.mainColor, fontSize: values.fontSizeNormal, width: '100%', textAlign: 'center' }}>{item.value}</Text></TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.props.changeValue('+', item)}
                        activeOpacity={1} style={{ width: 25, alignItems: 'center', justifyContent: 'center', }}>
                        <Text style={{ color: color.mainColor, fontSize: values.fontSizeNormal, }}>+</Text>
                    </TouchableOpacity>
                </View>
                {
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
                                <Text style={{ fontSize: values.fontSizeNormal, color: '#000' }}>{numeral(priceSale).format('0,0')}</Text>
                            </View>
                        </View>
                        :
                        null
                }
                {
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
                }
            </TouchableOpacity>
            // </View >
        )
    }
}