import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Image } from 'react-native'
import { color, config, values, images } from '../../../../config'

const widthButton = 40;
export default class ItemFlatlist extends Component {
    render() {
        let { item, clickItem, addItemToCart } = this.props;
        return (
            <TouchableOpacity
                onPress={() => clickItem(item)}
                style={{ flex: 1, marginTop: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                <View style={{ flexDirection: 'row', flex: 1, }}>
                    <View style={{ width: widthButton, height: widthButton, borderRadius: widthButton / 2, overflow: 'hidden', }}>
                        <Image
                            style={{ width: '100%', height: '100%' }}
                            source={
                                item.image ?
                                    { uri: item.image }
                                    :
                                    images.ic_user_info
                            }
                            style={{ width: '100%', height: '100%' }} />
                    </View>
                    <View style={{ flex: 1, paddingHorizontal: 10 }}>
                        <Text numberOfLines={1} style={{ fontSize: values.fontSizeTitle, fontWeight: '500', flex: 1, backgroundColor: 'transparent' }}>{item.name || ''}</Text>
                        <Text numberOfLines={1} style={{ fontSize: 11, flex: 1, backgroundColor: 'transparent' }}>{(item.email || '') + ' ' + (item.phone ? (', ' + item.phone) : '')}</Text>
                    </View>
                </View>
                <TouchableOpacity
                    onPress={() => addItemToCart(item)}
                    style={{
                        borderRadius: 5, borderColor: color.mainColor,
                        borderWidth: 0.5, justifyContent: 'center', alignItems: 'center',
                    }}>
                    <Text style={{
                        fontSize: 11, paddingHorizontal: 7, paddingVertical: 2,
                        color: color.mainColor, textAlign: 'center'
                    }}>Thêm</Text>
                </TouchableOpacity>
            </TouchableOpacity>
        )
    }
}