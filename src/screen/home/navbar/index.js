import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity } from 'react-native'
import values from '../../../config/values';
import { color, images } from '../../../config';

export default class Navbar extends Component {
    render() {
        let { content, onPressLeft, onPressRight } = this.props;
        return (
            <View style={{
                width: '100%', backgroundColor: 'transparent', height: values.toolbarHeight,
                flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10,
            }}>
                <TouchableOpacity
                    onPress={onPressLeft}
                    style={{
                        width: 40, height: 40, backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center',
                        // borderWidth: 2, borderColor: 'white',
                        borderRadius: 20, overflow: 'hidden'
                    }} activeOpacity={0}>

                    <Image style={{ resizeMode: 'contain', height: 30, width: 30, tintColor: color.HOME.colortext }}
                        source={images.ic_user_info}
                    />
                </TouchableOpacity>
                {
                    content
                }
                <TouchableOpacity
                    onPress={onPressRight}
                    style={{
                        width: 40, height: 40, backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'flex-end'
                    }} activeOpacity={0}>
                    <Image style={{ resizeMode: 'contain', height: 25, width: 25, tintColor: color.HOME.colortext }}
                        source={images.ic_list} />
                </TouchableOpacity>
            </View>
        )
    }
}