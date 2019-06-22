import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity } from 'react-native'
import numeral from 'numeral'
import moment from 'moment'
import _ from 'lodash'
import { values, color, images } from '../../../../../../config';
export default class FlatlistItem extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isCheck: false,
        }
    }

    clickItem = () => {
        this.setState({ isCheck: !this.state.isCheck })
        this.props.clickItem(this.props.item)
    }

    render() {
        let { item, index,
            length,
            changeValue } = this.props;
        let width = values.deviceWidth / 7.5 < 80 ? values.deviceWidth / 7.5 : 80;
        return (

            <TouchableOpacity
                activeOpacity={1}
                onPress={this.clickItem}
                style={[{
                    width: '100%', flexDirection: 'row', paddingVertical: 10,
                    alignSelf: 'center', justifyContent: 'space-between',
                    borderBottomColor: index == (length - 1) ? '#000' : '#ccc',
                    borderBottomWidth: 0.5,
                    overflow: 'hidden', alignItems: 'center'
                },
                ]}>
                {
                    !this.state.isCheck
                        ?
                        <View style={{ width: 18, height: 18, marginRight: 5, borderRadius: 3, borderWidth: 1, borderColor: color.borderColor }} />
                        :
                        <View style={{
                            width: 18, height: 18, marginRight: 5, borderRadius: 3, justifyContent: 'center',
                            alignItems: 'center', borderWidth: 1, borderColor: color.mainColor
                        }} >
                            <Image style={{ width: 13, resizeMode: 'contain' }}
                                source={images.ic_tick}
                            />
                        </View>
                }
                <View style={{ paddingLeft: 10, flex: 1 }}>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ flex: 1, paddingRight: 10, }}>
                            <Text numberOfLines={1} style={{ color: color.HOME.nolected, marginBottom: 2, fontSize: 11, flex: 1 }}>{item.name || ''}</Text>
                            <Text numberOfLines={1} style={{ color: '#000', fontSize: 11, flex: 1, fontWeight: '500' }}>{(item.value || '') + 'x' + (item.price ? (numeral(item.price).format('0,0') + (item.unit || '')) : '')}</Text>
                        </View>
                        <Text numberOfLines={1} style={{ fontSize: 11, fontWeight: '500', color: '#000' }}>{item.price ? (numeral((parseFloat(item.price) * parseFloat(item.value) + '')).format('0,0') + (item.unit || '')) : ''}</Text>
                    </View>
                    <View style={{
                        marginTop: 10,
                        borderRadius: 5, borderWidth: 1,
                        borderColor: color.HOME.borderColorAdd, height: 30,
                        // alignSelf: 'center',4
                        width: 90,
                        flexDirection: 'row', backgroundColor: 'transparent'
                    }}>
                        <TouchableOpacity
                            onPress={() => changeValue('-', item)}
                            activeOpacity={0.7} style={{ width: 30, alignItems: 'center', justifyContent: 'center', }}>
                            <Text style={{ color: color.mainColor, fontSize: values.fontSizeNormal, }}>-</Text></TouchableOpacity>
                        <TouchableOpacity activeOpacity={1} style={{
                            width: 30, alignItems: 'center', justifyContent: 'center', borderLeftWidth: 1,
                            borderRightWidth: 1, borderLeftColor: color.HOME.borderColorAdd, borderRightColor: color.HOME.borderColorAdd
                        }}><Text numberOfLines={1} style={{ color: color.mainColor, fontSize: values.fontSizeNormal, width: '100%', textAlign: 'center' }}>{item.value}</Text></TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => changeValue('+', item)}
                            activeOpacity={0.7} style={{ width: 30, alignItems: 'center', justifyContent: 'center', }}>
                            <Text style={{ color: color.mainColor, fontSize: values.fontSizeNormal, }}>+</Text></TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}