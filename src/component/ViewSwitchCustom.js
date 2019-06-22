import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { color, values } from '../config';

export default class ViewSwitchCustom extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        let { title, type, leftTitle, rightTitle, onPress, widthItem } = this.props;

        return (
            <View
                style={[{
                    width: '100%', height: 40, marginTop: 15,
                    flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, backgroundColor: 'transparent', borderRadius: 7
                },
                ]} >
                <Text style={{ flex: 1, fontSize: values.fontSizeTitle, color: '#000', paddingRight: 5, }}>{title || ''}</Text>
                <TouchableOpacity
                    onPress={onPress}
                    activeOpacity={0.7}
                    style={{ flexDirection: 'row', borderRadius: 5, overflow: 'hidden', height: 25 }}
                >
                    <View style={{
                        justifyContent: 'center', alignItems: 'center', width: widthItem || 70,
                        backgroundColor: type == 0 ? color.mainColor : '#DFDFDF'
                    }}>
                        <Text numberOfLines={1} style={{ paddingHorizontal: 5, fontSize: 11, color: type == 0 ? '#fff' : '#000' }}>{leftTitle || ''}</Text>
                    </View>
                    <View style={{
                        justifyContent: 'center', alignItems: 'center', width: widthItem || 70,
                        backgroundColor: type == 1 ? color.mainColor : '#DFDFDF'
                    }}>
                        <Text numberOfLines={1} style={{ fontSize: 11, color: type == 1 ? '#fff' : '#000', paddingHorizontal: 5, }}>{rightTitle || ''}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}