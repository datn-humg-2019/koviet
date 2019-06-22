import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity } from 'react-native'
import numeral from 'numeral'
import { values, color, images } from '../../../../../config';
export default class FlatlistItem extends Component {
    render() {
        let { item, clickItem } = this.props;
        return (
            <TouchableOpacity
                onPress={() => clickItem(item)}
                activeOpacity={0.7}
                style={[{
                    width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
                    backgroundColor: 'transparent', borderBottomWidth: 0.5, borderBottomColor: '#ccc',
                },
                ]}>
                <View style={{
                    width: 40, height: 40, marginRight: 10, backgroundColor: color.HOME.bgColorHome,
                    borderRadius: 20, justifyContent: 'center', alignItems: 'center',
                    marginVertical: 10,
                    overflow: 'hidden',
                }}>
                    <Image style={{ width: 20, height: 20, resizeMode: 'contain' }}
                        source={images.ic_printer} />
                </View>
                <View style={{ flex: 1, backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'center', }}>
                    <View style={{
                        width: '100%', backgroundColor: 'transparent', alignSelf: 'center'
                    }}>
                        <Text
                            numberOfLines={1}
                            style={{ fontSize: 15, width: '100%', color: '#000', backgroundColor: 'transparent' }} >{item.name || ''}</Text>
                        <Text
                            style={{ fontSize: values.fontSizeNormal, width: '100%', color: color.HOME.nolected, backgroundColor: 'transparent' }}
                        >{item.model || ''}</Text>
                    </View>
                </View>
            </TouchableOpacity >
        )
    }
}