import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity, ScrollView } from 'react-native'
import { Navigation } from 'react-native-navigation';
import ListItemView from './listItem';
import _ from 'lodash'
import { inject, observer } from 'mobx-react'
import { toJS } from 'mobx';
import { color, values, images, config } from '../../../../config';
import ButtonGradient from '../../../../component/ButtonGradient';
import numeral from 'numeral'
const typeMoney = { cash: 0, card: 1 }
@inject('Sell')
@observer
export default class Step01View extends Component {
    constructor(props) {
        super(props)

        this.state = {
            typeMoney: typeMoney.cash
        }

    }
    componentWillMount() {
    }

    changeValue = (type, item) => {
        let { Sell } = this.props;
        console.log('item: ' + JSON.stringify(item))
        itemChange = _.findIndex(Sell.listCart, function (o) {
            return o.id == item.id;
        })
        if (itemChange != '-1') {
            if (type == '-') {
                if (parseFloat(Sell.listCart[itemChange].value + '') > parseFloat(Sell.listCart[itemChange].valueDefault + '')) {
                    Sell.listCart[itemChange].value = parseFloat(Sell.listCart[itemChange].value + '') - parseFloat(Sell.listCart[itemChange].valueDefault + '')
                } else {
                    //xoa mat hang khoi gio hang
                    _.remove(Sell.listCart, function (o) { return o.id == item.id });
                    if (Sell.listCart.length == 0) {
                        Sell.deleteCart()
                    }
                }

            } else {
                Sell.addToCart(item)
                // Sell.listCart[itemChange].value = parseFloat(Sell.listCart[itemChange].value + '') + parseFloat(Sell.listCart[itemChange].valueDefault + '')
            }
        }
        Sell.getInfoCart(this.state.typeMoney)
    }

    changeTypePay = (type) => {
        let { Sell } = this.props;
        this.setState({ typeMoney: type })
        Sell.changePayTypeInfoCart(type)
    }

    render() {
        let { Sell, changeStep, clickItem } = this.props
        return (
            <ScrollView style={{ width: '100%', flex: 1, backgroundColor: color.HOME.bgColorHome }}>
                <ListItemView
                    data={
                        // this.state.check
                        //     ?
                        //     this.state.dataSearch
                        //     :
                        toJS(Sell.listCart)
                    }
                    changeValue={this.changeValue}
                    clickItem={clickItem}
                />
                <View style={{ paddingHorizontal: 10, width: '100%', }}>
                    <Text style={{ color: '#000', fontSize: values.fontSizeTitle }}>{'Tiến hành thanh toán'}</Text>
                    <Text style={{ color: color.HOME.nolected, fontSize: values.fontSizeNormal, fontWeight: '500', paddingVertical: 3, }}>{'Tổng tiền'}</Text>
                    <Text style={{ color: color.mainColor, fontSize: values.fontSizeNormal, fontWeight: '500' }}>{numeral(Sell.infoCart.price).format('0,0') + ' ' + Sell.infoCart.unit}</Text>

                    <Text style={{ color: color.HOME.nolected, fontSize: values.fontSizeNormal, marginTop: 15 }}>{'Chọn hình thức'}</Text>
                    <View style={{
                        flexDirection: 'row', alignItems: 'center', marginVertical: 5,
                    }}>
                        <Image
                            source={images.ic_info_des}
                            style={{ width: 12, height: 12, marginRight: 5, resizeMode: 'contain', tintColor: '#E88F0B' }} />
                        <Text style={{ fontSize: values.fontSizeNormal, color: '#E88F0B', }}>{'Vui lòng chọn hình thức thanh toán của bạn.'}</Text>
                    </View>
                    <View style={{ width: '100%', flexDirection: 'row', }}>
                        <ButtonGradient
                            onPress={() => this.changeTypePay(config.payType.cash)}
                            containStyle={{ paddingRight: 10, flex: 1 }}
                            image={images.ic_cash}
                            colors={this.state.typeMoney == typeMoney.cash ? color.colors_gradient : ['#DFDFDF', '#DFDFDF']}
                            styleText={{ color: this.state.typeMoney == typeMoney.cash ? '#fff' : '#000' }}
                            styleImage={{ tintColor: this.state.typeMoney == typeMoney.cash ? '#fff' : '#000' }}
                            title={'Tiền mặt'}
                        />
                        <ButtonGradient
                            onPress={() => this.changeTypePay(config.payType.card)}
                            containStyle={{ paddingLeft: 10, flex: 1 }}
                            title={'Thẻ'}
                            colors={this.state.typeMoney == typeMoney.card ? color.colors_gradient : ['#DFDFDF', '#DFDFDF']}
                            styleImage={{ tintColor: this.state.typeMoney == typeMoney.card ? '#fff' : '#000' }}
                            styleText={{ color: this.state.typeMoney == typeMoney.card ? '#fff' : '#000' }}
                            image={images.ic_card}
                        />
                    </View>
                    <ButtonGradient
                        onPress={changeStep}
                        containStyle={{ paddingLeft: 10, marginTop: 40, marginBottom: 10 + values.bottomIphoneX, }}
                        title={'Thanh toán đơn hàng'}
                    />
                </View>
            </ScrollView >
        )
    }
}
