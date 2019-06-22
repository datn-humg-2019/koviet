import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Image } from 'react-native'
import { color, values, images } from '../../../config';
import ButtonGradient from '../../../component/ButtonGradient';
import numeral from 'numeral'

import { inject, observer } from 'mobx-react'
import { toJS } from 'mobx';
@inject('Sell')
@observer
export default class InfoBottomCartView extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        let { onPress } = this.props;
        let { Sell } = this.props;
        return (
            // listCart
            Sell.infoCart.number && Sell.infoCart.number > 0
                ?
                <View style={[{ width: '100%', backgroundColor: 'white', },
                values.platform == 'ios' ? {
                    shadowColor: '#000000',
                    shadowOffset: { width: 2, height: 4 },
                    shadowOpacity: 0.6,
                    shadowRadius: 6,
                }
                    :
                    { elevation: 7, }
                ]}>
                    <View style={{
                        width: '100%', flexDirection: 'row', paddingHorizontal: 15,
                        paddingTop: 15, backgroundColor: '#fff', paddingBottom: 15 + values.bottomIphoneX
                    }}>
                        <View style={{ flex: 1, }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ color: '#000', fontSize: values.fontSizeNormal, }}>{'Đơn hàng '}</Text>
                                <Text style={{ color: color.mainColor, fontSize: values.fontSizeTitle, fontWeight: '500' }}>{Sell.infoCart.number || 0}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ color: '#000', fontSize: values.fontSizeNormal, }}>{'Giá: '}</Text>
                                <Text numberOfLines={1} style={{ color: color.mainColor, fontSize: values.fontSizeTitle, fontWeight: '500', flex: 1, backgroundColor: 'transparent' }}>
                                    <Text numberOfLines={1} style={{ flex: 1, backgroundColor: 'transparent' }}>{numeral(Sell.infoCart.price).format('0,0')}</Text>
                                    <Text >{' đ'}</Text>

                                </Text>
                            </View>
                        </View>
                        <ButtonGradient
                            onPress={onPress}
                            containStyle={{ width: 130, }}
                            image={images.ic_cart}
                            title={'Tới giỏ hàng'} />
                    </View>
                </View>
                :
                null
        )
    }
}