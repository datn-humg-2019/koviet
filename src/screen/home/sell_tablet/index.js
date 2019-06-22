import React, { Component } from 'react';
import { Text, View, FlatList, Image, AppRegistry, Dimensions, TouchableOpacity, ImageBackground, Keyboard } from 'react-native';

import { Navigation } from 'react-native-navigation';
import ListItemView from './listItem';
import { color, values, config, screenId, images } from '../../../config';
import InfoBottomCartView from './InfoBottomCartView';
import TopView from './topView';
import SearchView from '../../../component/SearchView';
import _ from 'lodash'
import { toJS } from 'mobx';
import { bodauTiengViet } from '../../../utils/Func';
import FilterView from './filter/';
import ExtraInfoView from '../../../component/extraInfo';
import Orientation from 'react-native-orientation';

import { inject, observer } from 'mobx-react'
import CartTabletScreen from './cart/index';
import ItemCartTabletDetail from './cart/detail';
@inject('Sell', 'OnApp', 'Product')
@observer
export default class SellTabletScreen extends Component {
    constructor(props) {
        super(props)
        let { Product } = this.props;
        let { width, height } = Dimensions.get('window')
        this.state = {
            width, height,
            textSearch: '',
            check: false,
            isShowDetail: false,
            itemCart: null,
            dataSearch: Product.dataListSell,
            isShowFilter: false,
            isShowCancel: false,

        }
        Navigation.events().bindComponent(this); // <== Will be automatically unregistered when unmounted
    }
    componentWillMount() {
        const initial = Orientation.getInitialOrientation();
        if (initial === 'PORTRAIT') {
            if (values.isTablet) {
                Orientation.lockToLandscapeLeft()
            }
            // do something
        } else {
            // do something else
        }
    }

    unlockAllOrientations = () => {
        Orientation.unlockAllOrientations()
        // Orientation.lockToPortrait()
    }

    componentWillUnmount() {
        this.unlockAllOrientations()

    };

    goBack = () => {
        Navigation.pop('SellTabletScreen')
        this.unlockAllOrientations()
    }
    navigationButtonPressed({ buttonId }) {
        if (buttonId == 'back') {
            this.goBack()
        } else if (buttonId == 'extraInfo') {
            this.props.Sell.showExtraInfo()
        }
    }

    onChangeText = (textSearch) => {
        let { Sell, Product } = this.props;
        this.setState({
            textSearch: textSearch,
            check: textSearch.trim() === '' ? false : true,
        })
        if (textSearch.trim() === '') {
            this.setState({
                dataSearch: Product.dataListSell,
            })
        }
        //Tim kiem offline
        let obj = [];
        var xxx = _.filter(Product.dataListSell, function (o) {
            let name = bodauTiengViet(o.title).toLowerCase()
            if (name.includes(bodauTiengViet(textSearch).toLowerCase())) {
                obj.push(o)
            }
        });
        this.setState({
            dataSearch: obj
        })
    }

    resetTextInput = () => {
        let { Sell, Product } = this.props;
        this.setState({
            textSearch: '',
            check: false,
            dataSearch: Product.dataListSell,
            isShowCancel: false,
        })
    }

    clickCancel = () => {
        // this.refs.
        Keyboard.dismiss()
        this.resetTextInput()
    }

    onFocus = () => {
        this.setState({
            isShowCancel: true
        })
    }

    chooseTypeFilter = () => {
        this.setState({ isShowFilter: true })
    }

    clickItemFilter = (item) => {
        console.log(item)
        let { Sell, Product } = this.props;
        Sell.setTypeFilter(item);
        Product.setDataListSell(item)
        this.dismissFilter()
    }

    // clickItemExtraInfo = (item) => {
    //     let { Sell } = this.props;
    //     console.log(item)
    //     if (item.id == config.extraInfo[0].id) {//them kh vao hoa don
    //         this.showAppCustomer()
    //     } else if (item.id == config.extraInfo[1].id) {//xoa hoa don
    //         Sell.deleteCart()
    //     } else {//dong bo du lieu
    //     }
    //     Sell.dismissisExtraInfo()
    // }
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
        } else {//dong bo du lieu
        }
        Sell.dismissisExtraInfo()
    }
    gotoCustomerInfo = (item) => {
        Navigation.push('SellTabletScreen', {
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
                    },
                    statusBar: {
                        style: 'light',
                    }
                }
            }
        });
    }


    clickListItem = (item) => {
        console.log(item)
        let { Sell } = this.props;
        Sell.addToCart(item)
    }

    dismissFilter = () => {
        this.setState({ isShowFilter: false })
    }

    gotoCart = () => {
        Navigation.showOverlay({
            component: {
                id: 'CartScreen',
                name: 'CartScreen',
                passProps: {
                    text: 'CartScreen'
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
                            text: 'Thanh toán',
                            color: '#fff',
                            alignment: 'center',
                            fontSize: values.nav.fontSize
                        },
                        rightButtons: [
                            {
                                id: 'extraInfo',
                                color: '#fff',
                                icon: images.ic_extraInfo
                            }
                        ],
                        visible: true,
                        background: { color: color.mainColor }
                    },
                    statusBar: {
                        style: 'light',
                    }
                }
            }
        });
    }

    showScanQR = () => {
        Navigation.push('SellScreen', {
            component: {
                id: 'ScanQRScreen',
                name: 'ScanQRScreen',
                passProps: {
                    text: 'Pushed screen'
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
                            text: screenId.HOME.item.sell.title,
                            color: '#fff',
                            alignment: 'center',
                            fontSize: values.nav.fontSize
                        },
                        rightButtons: [
                            {
                                id: 'extraInfo',
                                color: '#fff',
                                icon: images.ic_extraInfo
                            },
                            {
                                id: 'flash',
                                color: '#fff',
                                component: { name: 'CameraButton' }
                            }
                        ],
                        visible: true,
                        background: { color: color.mainColor }
                    },
                    statusBar: {
                        style: 'light',
                    }
                }
            }
        });
    }

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

    clickItemCart = (item) => {
        this.setState({
            itemCart: item,
            isShowDetail: true
        })
    }

    onLayout = () => {
        let { width, height } = Dimensions.get('window')
        this.setState({
            width, height
        })
    }
    render() {
        let { Sell, OnApp, Product } = this.props;
        return (
            <TouchableOpacity
                onLayout={this.onLayout}
                activeOpacity={1}
                onPress={() => Keyboard.dismiss()}
                style={{ flex: 1, width: '100%', backgroundColor: color.HOME.bgColorHome }}>
                <View style={{ flex: 1, width: '100%', flexDirection: 'row' }}>

                    <View style={{ flex: 1, width: '100%', }}>
                        <View style={{ width: '100%', height: 40, marginVertical: 10, paddingHorizontal: 10, flexDirection: 'row' }}>
                            <SearchView
                                placeholder='Tìm kiếm'
                                onChangeText={this.onChangeText}
                                value={this.state.textSearch}
                                onFocus={this.onFocus}
                                isShowCancel={this.state.isShowCancel}
                                clickCancel={this.clickCancel}
                            />
                            {
                                OnApp.isShowScanQR
                                    ?
                                    <TouchableOpacity
                                        onPress={this.showScanQR}
                                        style={{
                                            height: '100%', width: 35, alignItems: 'center', backgroundColor: 'transparent',
                                            justifyContent: 'center', flexDirection: 'row'
                                        }}>
                                        <Image style={{ width: 20, height: 20, tintColor: '#000', resizeMode: 'contain' }}
                                            source={images.ic_scanner} />
                                    </TouchableOpacity>
                                    :
                                    <View style={{ paddingLeft: 7 }} />
                            }
                            {
                                !this.state.isShowCancel
                                    ?
                                    <TouchableOpacity
                                        onPress={this.chooseTypeFilter}
                                        style={{ height: 40, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', backgroundColor: 'transparent' }}>
                                        <Text numberOfLines={1} style={{ fontSize: values.fontSizeNormal, color: '#000', paddingRight: 5, }}>{Sell.typeFilterSelected && Sell.typeFilterSelected.name || ""}</Text>
                                        <Image style={{ width: 12, tintColor: '#000', resizeMode: 'contain' }}
                                            source={images.ic_down} />
                                    </TouchableOpacity>
                                    :
                                    null
                            }
                        </View>
                        <ListItemView
                            data={
                                this.state.check
                                    ?
                                    this.state.dataSearch
                                    :
                                    toJS(Product.dataListSell)
                            }
                            numColumns={Sell.listCart && Sell.listCart.length > 0 ? 3 : 6}
                            clickItem={this.clickListItem}
                        />
                        <FilterView
                            isShow={this.state.isShowFilter}
                            dismiss={this.dismissFilter}
                            itemSelected={Sell.typeFilterSelected}
                            data={Product.genListGroupProductFilter()}
                            clickItem={this.clickItemFilter} />
                    </View>
                    {
                        Sell.listCart && _.size(Sell.listCart) > 0
                            ?
                            <View style={[{
                                height: '100%', width: (this.state.width - (this.state.width - 15 * 7) * 3 / 6 - 15 * 4),
                                backgroundColor: '#fff',
                            },
                            values.platform == 'ios' ? {
                                shadowColor: '#000000',
                                shadowOffset: { width: 2, height: 4 },
                                shadowOpacity: 0.2,
                                shadowRadius: 5,
                            }
                                :
                                { elevation: 10 }
                            ]}>
                                < CartTabletScreen clickItemCart={this.clickItemCart} />
                            </View>
                            :
                            null
                    }


                </View>
                {/* <InfoBottomCartView onPress={this.gotoCart} /> */}

                <ExtraInfoView
                    clickItem={this.clickItemExtraInfo} />
                {
                    this.state.isShowDetail
                        ?
                        <View style={{ position: 'absolute', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', paddingVertical: 20, backgroundColor: '#00000070', }}>
                            <ItemCartTabletDetail item={this.state.itemCart} dismissModal={() => { this.setState({ isShowDetail: false }) }} />
                        </View>
                        :
                        null
                }

            </TouchableOpacity>
        )
    }
}