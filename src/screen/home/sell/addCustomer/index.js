import React, { Component } from "react"
import { Text, View, TouchableOpacity, Image, Keyboard, FlatList } from "react-native"
import { color, values, images } from "../../../../config";
import { Navigation } from "react-native-navigation";
import EmailnputView from "../../../../component/EmailnputView";
import SearchView from "../../../../component/SearchView";
import _ from "lodash"
import ButtonGradient from "../../../../component/ButtonGradient";
import ItemFlatlist from "./ItemFlatlist";
import { bodauTiengViet } from "../../../../utils/Func";

import { inject, observer } from 'mobx-react'
@inject('Sell')
@observer
export default class AddCustomerScreeen extends Component {
    constructor(props) {
        super(props)

        this.state = {
            textSearch: "",
            check: false,
            isShowCancel: false,
            dataSearch: []
        }
        Navigation.events().bindComponent(this); // <== Will be automatically unregistered when unmounted
    }
    componentWillMount() {
        let { Sell } = this.props;
        this.setState({ dataSearch: Sell.customerRecent })
    }

    navigationButtonPressed({ buttonId }) {
        if (buttonId == "close") {
            this.goBack()
        }
    }

    goBack = () => {
        Navigation.dismissModal("AddCustomerScreeen")
    }

    onChangeText = (textSearch) => {
        let { Sell } = this.props;
        if (this.state.textSearch.trim() != "") {
            this.setState({
                isShowCancel: true
            })
        }
        this.setState({
            textSearch: textSearch,
            check: textSearch.trim() === "" ? false : true,
        })
        if (textSearch.trim() === "") {
            this.setState({
                dataSearch: Sell.customerRecent,
            })
        }
        //Tim kiem offline
        let obj = [];
        var xxx = _.filter(Sell.customerRecent, function (o) {
            let name = bodauTiengViet(o.name).toLowerCase()
            if (name.includes(bodauTiengViet(textSearch).toLowerCase())) {
                obj.push(o)
            }
        });
        console.log('obj: ' + JSON.stringify(obj))
        this.setState({
            dataSearch: obj
        })
    }

    resetTextInput = () => {
        let { Sell } = this.props;
        this.setState({
            textSearch: "",
            check: false,
            dataSearch: Sell.customerRecent,
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

    addCustomer = () => {
        Navigation.push('AddCustomerScreeen', {
            component: {
                id: 'CreateCustomer',
                name: 'CreateCustomer',
                passProps: {
                    // type: { status: 'product', title: 'Mặt hàng' }
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
                            text: 'Tạo khách hàng',
                            color: '#fff',
                            alignment: 'center',
                            fontSize: values.nav.fontSize
                        },
                        rightButtons: [
                            {
                                id: 'save',
                                color: '#fff',
                                text: 'Lưu'
                            }
                        ],
                        visible: true,
                        background: { color: color.mainColor }
                    }
                }
            }
        });
    }

    clickItem = item => {
        this.gotoCustomerInfo(item)
    }

    addItemToCart = item => {
        let { Sell } = this.props;
        Sell.addCustomerInfoCart(item)
        this.goBack()
    };

    gotoCustomerInfo = (item) => {
        Navigation.push('AddCustomerScreeen', {
            component: {
                id: 'CustomerInfo',
                name: 'CustomerInfo',
                passProps: {
                    item: item
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
                                id: 'add',
                                color: '#fff',
                                text: 'Thêm'
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
    renderItem = ({ item }) => {
        return (<ItemFlatlist item={item}
            clickItem={this.clickItem}
            addItemToCart={this.addItemToCart}
        />)
    }

    render() {
        let { Sell } = this.props;
        console.log('Sell.customerRecent renderlai: ' + JSON.stringify(Sell.customerRecent))
        return (
            <View style={{ paddingHorizontal: 15, width: "100%", flex: 1 }}>
                <View style={{ width: "100%", height: 40, marginVertical: 10, flexDirection: "row" }}>
                    <SearchView
                        placeholder="Tìm kiếm khách hàng"
                        onChangeText={this.onChangeText}
                        value={this.state.textSearch}
                        onFocus={this.onFocus}
                        isShowCancel={this.state.isShowCancel}
                        clickCancel={this.clickCancel}
                    />

                </View>
                <View style={{ flex: 1, width: "100%", backgroundColor: "transparent", }}>
                    {
                        this.state.isShowCancel
                            ?
                            <View style={{ flex: 1, width: '100%' }}>
                                <FlatList
                                    ListEmptyComponent={<Text style={{ fontSize: values.fontSizeNormal, color: "#00000090", textAlign: "center", padding: 15 }}>{"Không có dữ liệu!"}</Text>}
                                    style={[{
                                        width: "100%",
                                    }
                                    ]}
                                    data={
                                        this.state.check
                                            ?
                                            this.state.dataSearch
                                            :
                                            Sell.customerRecent
                                    }
                                    renderItem={this.renderItem}
                                    keyExtractor={(item, index) => index.toString()}
                                />
                            </View>
                            :
                            <View style={{ flex: 1, width: '100%' }}>
                                <Text style={{ color: "black", fontSize: values.fontSizeTitle }}>Khách hàng gần đây</Text>
                                <FlatList
                                    ListEmptyComponent={<Text style={{ fontSize: values.fontSizeNormal, color: "#00000090", textAlign: "center", padding: 15 }}>{"Không có dữ liệu!"}</Text>}
                                    style={[{
                                        width: "100%",
                                    }
                                    ]}
                                    data={Sell.customerRecent}
                                    renderItem={this.renderItem}
                                    keyExtractor={(item, index) => index.toString()}
                                />
                            </View>
                    }
                </View>
                <ButtonGradient
                    containStyle={{ marginBottom: 10 + values.bottomIphoneX, }}
                    onPress={this.addCustomer}
                    title="Thêm khách hàng mới"
                />
            </View>
        )
    }
}