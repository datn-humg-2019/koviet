import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Image } from 'react-native'
import { values, images, color } from '../../../../../config';

let marginRight = 15;
let widthButtonColor = 56;
export default class ChooseColorView extends Component {
    render() {
        let { chooseColor, itemColorCheck, data } = this.props;
        return (
            <View style={{ width: '100%', marginTop: marginRight, }}>
                <Text style={{ fontSize: values.fontSizeNormal, paddingHorizontal: marginRight, color: '#000', marginBottom: 5 }}>{'Chọn màu danh mục'}</Text>
                <View style={{ width: '100%', flexDirection: 'row', flexWrap: 'wrap', marginLeft: marginRight }}>
                    {data.map((item, index) => {
                        return (
                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={() => chooseColor(item)}
                                key={item.id} style={{
                                    width: widthButtonColor,
                                    height: widthButtonColor, borderRadius: 8, overflow: 'hidden',
                                    backgroundColor: item.color || color.mainColor,
                                    marginRight: marginRight, marginBottom: marginRight,
                                    justifyContent: 'center', alignItems: 'center',
                                }}>
                                {
                                    itemColorCheck && itemColorCheck.id == item.id
                                        ?
                                        <Image source={images.ic_tick}
                                            style={{ width: widthButtonColor / 2, tintColor: '#fff', resizeMode: 'contain' }} />
                                        :
                                        null
                                }
                            </TouchableOpacity>
                        )
                    })}
                </View>
            </View>
        )
    }
}