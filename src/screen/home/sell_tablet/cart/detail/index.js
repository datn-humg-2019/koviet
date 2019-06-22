import React, { Component } from 'react'
import {
    Text, View, TouchableOpacity, TextInput,
    Switch, ScrollView, FlatList
} from 'react-native'
import { color, values, config, images } from '../../../../../config/';
import { Navigation } from 'react-native-navigation';
let widthButton = 35;
import _ from 'lodash'
import { inject, observer } from 'mobx-react'
import ExtraInfoView from '../../../../../component/extraInfo';
import NavbarDetail from './NavbarDetail';
import SaleFlatListItem from './SaleFlatListItem';
import Loading from '../../../../../component/Loading';
let indexItem = -1;
@inject('Sell', 'Product')
@observer
export default class ItemCartDetail extends Component {
    constructor(props) {
        super(props)
        let { Sell } = this.props;
        let self = this;

        indexItem = _.findIndex(Sell.listCart, function (o) {
            return o.id == self.props.item.id;
        })

        this.state = {
            isLoading: false,
            text: (indexItem + '') != '-1' ? Sell.listCart[indexItem].comment : '',
            salePrice: 0,
            isSale: false,
        }
        // Navigation.events().bindComponent(this); // <== Will be automatically unregistered when unmounted
    }
    componentWillMount() {
    }

    // navigationButtonPressed({ buttonId }) {
    //     if (buttonId == 'back') {
    //         this.goBackCart()

    //     } else if (buttonId == 'extraInfo') {
    //         this.props.Sell.showExtraInfo()
    //     }
    // }

    showAppCustomer = () => {
        Navigation.showModal({
            stack: {
                children: [{
                    component: {
                        id: 'AddCustomerScreeen',
                        name: 'AddCustomerScreeen',
                        passProps: {
                            text: 'stack with one child'
                        },
                        options: {
                            topBar: {
                                leftButtons: [
                                    {
                                        id: 'close',
                                        color: '#fff',
                                        icon: images.ic_close
                                    }
                                ],
                                title: {
                                    text: 'Thêm khách hàng vào hoá đơn',
                                    color: '#fff',
                                    fontSize: values.nav.fontSize
                                },
                                rightButtons: [],
                                noBorder: true,
                                animate: true,
                                borderColor: 'transparent',//android
                                // visible: false,
                                // drawBehind: true,
                                // transparent: true,
                                // translucent: true,
                                background: { color: color.mainColor },
                                // elevation: 0,
                            }
                        }
                    }
                }]
            }
        });
    };


    clickItemExtraInfo = (item) => {
        let { Sell } = this.props;
        if (item.id == config.extraInfo[0].id) {//them kh vao hoa don
            if (Sell.infoCart.customer) {
                this.gotoCustomerInfo(Sell.infoCart.customer)
            } else {
                this.showAppCustomer()
            }
        } else if (item.id == config.extraInfo[1].id) {//xoa hoa don
            Sell.deleteCart()
            Navigation.popTo('SellScreen')
        } else {//dong bo du lieu
        }
        Sell.dismissisExtraInfo()
    };

    gotoCustomerInfo = (item) => {
        Navigation.push('ItemCartDetail', {
            component: {
                id: 'CustomerInfo',
                name: 'CustomerInfo',
                passProps: {
                    item: item,
                    type: config.typeScreenCustomInfo.isInfoCustomer
                },
                options: {
                    topBar: {
                        leftButtons: [
                            {
                                id: 'back',
                                color: '#fff',
                                icon: images.ic_back
                            }
                        ],
                        title: {
                            text: 'Hồ sơ khách hàng',
                            color: '#fff',
                            alignment: 'center',
                            fontSize: values.nav.fontSize
                        },
                        rightButtons: [
                            {
                                id: 'delete',
                                color: '#ccc',
                                text: 'Xoá KH'
                            }
                        ],
                        visible: true,
                        background: { color: color.mainColor }
                    }, statusBar: {
                        style: 'light',
                    }
                }
            }
        });
    }


    goBackCart = () => {
        let { Sell } = this.props;
        if (this.state.text.trim() != '') {
            if ((indexItem + '') != '-1' && Sell.listCart[indexItem].comment != this.state.text.trim()) {
                Sell.listCart[indexItem].comment = this.state.text.trim()
            }
        }
        Navigation.pop('ItemCartDetail')
    }

    changeValue = (type) => {
        let { Sell, item } = this.props;
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
                        // this.goBackCart()
                    }
                    this.props.dismissModal()
                }
            } else {
                Sell.addToCart(item)
                // Sell.listCart[itemChange].value = parseFloat(Sell.listCart[itemChange].value + '') + parseFloat(Sell.listCart[itemChange].valueDefault + '')
            }
        }
        Sell.getInfoCart(this.state.typeMoney)
    }

    changeValueSale = (type, itemSale) => {
        let { Sell, item } = this.props;
        // console.log('type: ' + type + ' - item: ' + JSON.stringify(item))
        if (type) {
            // them giam gia
            Sell.addSaleToCartItem(item.id, itemSale)
            this.setState({ isLoading: true })
            setTimeout(() => {
                this.setState({ isLoading: false })
            }, 500);
        } else {
            //xoa giam gia khoi so sanh
            Sell.removeSaleToCartItem(item.id, itemSale)
            this.setState({ isLoading: true })
            setTimeout(() => {
                this.setState({ isLoading: false })
            }, 500);
        }
        Sell.getInfoCart(null)
    }

    renderItem = ({ item }) => {
        return (
            <SaleFlatListItem
                item={item}
                sales={this.props.item.sales}
                changeValueSale={this.changeValueSale}
            />)
    }

    render() {
        let { Sell, Product, item, dismissModal } = this.props;
        return (
            <View style={{ width: '66%', flex: 1, backgroundColor: '#fff', borderRadius: 10, overflow: 'hidden' }}>
                <NavbarDetail title={item && item.title || ''} onPress={dismissModal} />
                <ScrollView style={{ width: '100%', flex: 1 }}>
                    <View style={{ padding: 15, width: '100%', }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                            <Text style={{ fontSize: values.fontSizeTitle, fontWeight: 'bold', color: 'black', marginRight: 15 }}>{'Số lượng'}</Text>
                            <View style={{
                                borderRadius: 10, borderWidth: 1, borderColor: color.HOME.borderColorAdd,
                                height: widthButton, flexDirection: 'row', backgroundColor: 'transparent'
                            }}>
                                <TouchableOpacity onPress={() => this.changeValue('-')} activeOpacity={1} style={{ width: widthButton, alignItems: 'center', justifyContent: 'center', }}>
                                    <Text style={{ color: color.mainColor, fontSize: 15, }}>-</Text></TouchableOpacity>
                                <TouchableOpacity activeOpacity={1} style={{
                                    minWidth: widthButton, alignItems: 'center', justifyContent: 'center', borderLeftWidth: 1,
                                    borderRightWidth: 1, borderLeftColor: color.HOME.borderColorAdd, borderRightColor: color.HOME.borderColorAdd
                                }}><Text numberOfLines={1} style={{ color: color.mainColor, fontSize: values.fontSizeNormal, width: '100%', textAlign: 'center' }}>{(indexItem != -1 && Sell.listCart[indexItem] && Sell.listCart[indexItem].value) ? Sell.listCart[indexItem].value : 1}</Text></TouchableOpacity>
                                <TouchableOpacity onPress={() => this.changeValue('+')} activeOpacity={1} style={{ width: widthButton, alignItems: 'center', justifyContent: 'center', }}>
                                    <Text style={{ color: color.mainColor, fontSize: 15, }}>+</Text></TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ justifyContent: 'center', marginVertical: 20 }}>
                            <Text style={{ fontSize: values.fontSizeTitle, fontWeight: 'bold', color: 'black', marginRight: 15, marginBottom: 5 }}>{'Bình luận'}</Text>
                            <View style={[{
                                borderRadius: 7, flexDirection: 'row', backgroundColor: '#fff', width: '100%'
                            },
                            values.platform == 'ios' ? {
                                shadowColor: '#000000',
                                shadowOffset: { width: 2, height: 2 },
                                shadowOpacity: 0.3,
                                shadowRadius: 3,
                            }
                                :
                                { elevation: 5, }
                            ]}>
                                <TextInput
                                    placeholder={'Nhập bình luận'}
                                    placeholderTextColor={color.colorText_nolected}
                                    underlineColorAndroid='transparent'
                                    style={{
                                        width: '100%',
                                        paddingHorizontal: 10,
                                        height: 80, fontSize: values.fontSizeNormal,
                                        color: '#000',
                                    }} multiline
                                    value={this.state.text}
                                    onChangeText={(text) => { this.setState({ text }) }}
                                />

                            </View>
                        </View>
                        {
                            Product.listSale.length > 0
                                ?
                                <View style={{ justifyContent: 'center', flex: 1 }}>
                                    <Text style={{ fontSize: values.fontSizeTitle, fontWeight: 'bold', color: 'black', marginRight: 15, marginBottom: 5 }}>{'Giảm giá'}</Text>
                                    <View style={[{
                                        borderRadius: 7,
                                        paddingHorizontal: 10,
                                        backgroundColor: '#fff',
                                        alignItems: 'center',
                                        width: '100%',
                                    },
                                    values.platform == 'ios' ? {
                                        shadowColor: '#000000',
                                        shadowOffset: { width: 2, height: 2 },
                                        shadowOpacity: 0.3,
                                        shadowRadius: 3,
                                    }
                                        :
                                        { elevation: 5, }
                                    ]}>
                                        <FlatList
                                            style={{ width: '100%' }}
                                            data={Product.listSale}
                                            renderItem={this.renderItem}
                                            keyExtractor={(item, index) => index.toString()}
                                        />
                                    </View>
                                </View>
                                :
                                null
                        }
                    </View>
                </ScrollView>
                <ExtraInfoView
                    clickItem={this.clickItemExtraInfo} />

                <Loading isLoading={this.state.isLoading} title={''} />
            </View>

        )
    }
}