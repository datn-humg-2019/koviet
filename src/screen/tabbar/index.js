import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity } from 'react-native'
import { values, color, config, images } from '../../config';
import ButtonTab from './ButtonTab';

export default class Tabbar extends Component {


    render() {
        return (
            <View style={{
                width: '100%', height: values.tabbarHeight, backgroundColor: color.mainColor,
                alignItems: 'center',
            }}>
                <View style={{
                    width: '100%', height: values.tabbarContent, flexDirection: 'row',
                    justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent'
                }}>
                    <ButtonTab
                        typeClick={config.typeHome.home}
                        image={images.ic_home} title={'Trang chủ'} {...this.props} />
                    <ButtonTab
                        typeClick={config.typeHome.info}
                        image={images.ic_user_tab} title={'Thông tin'} {...this.props} />
                </View>
            </View>
        )
    }
}