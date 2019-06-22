import React, { Component } from "react"
import { Text, View, TouchableOpacity, Image, Keyboard, FlatList } from "react-native"
import { color, values } from "../../../../config";
import { Navigation } from "react-native-navigation";
import EmailnputView from "../../../../component/EmailnputView";
import SearchView from "../../../../component/SearchView";
import _ from "lodash"
import ButtonGradient from "../../../../component/ButtonGradient";
import ItemFlatlist from "./ItemFlatlist";
import { bodauTiengViet } from "../../../../utils/Func";

export default class AddCustomerScreeen extends Component {
    constructor(props) {
        super(props)

        this.state = {
            textSearch: "",
            check: false,
            dataSearch: [],
            isShowCancel: false,
            dataSearch: [
                { id: 0, name: "Ngô Hải Yến", image: "http://nguoimaudep.vaileu.com/wp-content/uploads/2017/09/12487048_823294384462795_5774759080163262295_o.jpg", email: "haiyen@gmail.com", phone: "0373343623" },
                { id: 1, name: "Hoàng Minh Hiếu", image: "http://sgtvt.hochiminhcity.gov.vn/HoatDongAnh/GTT/hinh-nen-girl-dep.jpg", email: "minhhiedadasu@gmail.com", phone: "012920027321" },
                { id: 2, name: "Đặng Đình Tùng", image: "https://znews-photo.zadn.vn/w660/Uploaded/obfluaa/2014_11_09/yen_3.jpg", email: "A@a.com", phone: "0112322232" },
                { id: 0, name: "Hải Vân", image: "http://nguoimaudep.vaileu.com/wp-content/uploads/2017/09/12487048_823294384462795_5774759080163262295_o.jpg", email: "haiyen@gmail.com", phone: "0373343623" },
                { id: 1, name: "Minh Hoà", image: "http://sgtvt.hochiminhcity.gov.vn/HoatDongAnh/GTT/hinh-nen-girl-dep.jpg", email: "minhhiedadasu@gmail.com", phone: "012920027321" },
                { id: 2, name: "Đình Thu", image: "https://znews-photo.zadn.vn/w660/Uploaded/obfluaa/2014_11_09/yen_3.jpg", email: "A@a.com", phone: "0112322232" },
            ],
            customer: [
                { id: 0, name: "Ngô Hải Yến", image: "http://nguoimaudep.vaileu.com/wp-content/uploads/2017/09/12487048_823294384462795_5774759080163262295_o.jpg", email: "haiyen@gmail.com", phone: "0373343623" },
                { id: 1, name: "Hoàng Minh Hiếu", image: "http://sgtvt.hochiminhcity.gov.vn/HoatDongAnh/GTT/hinh-nen-girl-dep.jpg", email: "minhhiedadasu@gmail.com", phone: "012920027321" },
                { id: 2, name: "Đặng Đình Tùng", image: "https://znews-photo.zadn.vn/w660/Uploaded/obfluaa/2014_11_09/yen_3.jpg", email: "A@a.com", phone: "0112322232" },
                { id: 0, name: "Hải Vân", image: "http://nguoimaudep.vaileu.com/wp-content/uploads/2017/09/12487048_823294384462795_5774759080163262295_o.jpg", email: "haiyen@gmail.com", phone: "0373343623" },
                { id: 1, name: "Minh Hoà", image: "http://sgtvt.hochiminhcity.gov.vn/HoatDongAnh/GTT/hinh-nen-girl-dep.jpg", email: "minhhiedadasu@gmail.com", phone: "012920027321" },
                { id: 2, name: "Đình Thu", image: "https://znews-photo.zadn.vn/w660/Uploaded/obfluaa/2014_11_09/yen_3.jpg", email: "A@a.com", phone: "0112322232" },
            ],
            customerRecent: [
                { id: 0, name: "Hải Vân", image: "http://nguoimaudep.vaileu.com/wp-content/uploads/2017/09/12487048_823294384462795_5774759080163262295_o.jpg", email: "haiyen@gmail.com", phone: "0373343623" },
                { id: 1, name: "Minh Hoà", image: "http://sgtvt.hochiminhcity.gov.vn/HoatDongAnh/GTT/hinh-nen-girl-dep.jpg", email: "minhhiedadasu@gmail.com", phone: "012920027321" },
                { id: 2, name: "Đình Thu", image: "https://znews-photo.zadn.vn/w660/Uploaded/obfluaa/2014_11_09/yen_3.jpg", email: "A@a.com", phone: "0112322232" },

            ],

        }
        Navigation.events().bindComponent(this); // <== Will be automatically unregistered when unmounted
    }
    componentWillMount() {
    }

    navigationButtonPressed({ buttonId }) {
        if (buttonId == "close") {
            Navigation.dismissModal("AddCustomerScreeen")
        }
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
                dataSearch: this.state.customer,
            })
        }
        //Tim kiem offline
        let obj = [];
        var xxx = _.filter(this.state.customer, function (o) {
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
            dataSearch: [
                { id: 0, name: "Ngô Hải Yến", image: "http://nguoimaudep.vaileu.com/wp-content/uploads/2017/09/12487048_823294384462795_5774759080163262295_o.jpg", email: "haiyen@gmail.com", phone: "0373343623" },
                { id: 1, name: "Hoàng Minh Hiếu", image: "http://sgtvt.hochiminhcity.gov.vn/HoatDongAnh/GTT/hinh-nen-girl-dep.jpg", email: "minhhiedadasu@gmail.com", phone: "012920027321" },
                { id: 2, name: "Đặng Đình Tùng", image: "https://znews-photo.zadn.vn/w660/Uploaded/obfluaa/2014_11_09/yen_3.jpg", email: "A@a.com", phone: "0112322232" },
                { id: 0, name: "Hải Vân", image: "http://nguoimaudep.vaileu.com/wp-content/uploads/2017/09/12487048_823294384462795_5774759080163262295_o.jpg", email: "haiyen@gmail.com", phone: "0373343623" },
                { id: 1, name: "Minh Hoà", image: "http://sgtvt.hochiminhcity.gov.vn/HoatDongAnh/GTT/hinh-nen-girl-dep.jpg", email: "minhhiedadasu@gmail.com", phone: "012920027321" },
                { id: 2, name: "Đình Thu", image: "https://znews-photo.zadn.vn/w660/Uploaded/obfluaa/2014_11_09/yen_3.jpg", email: "A@a.com", phone: "0112322232" },
            ],
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

    }

    renderItem = ({ item }) => {
        return (<ItemFlatlist item={item} />)
    }

    render() {
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
                                            this.state.customer
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
                                    data={this.state.customerRecent}
                                    renderItem={this.renderItem}
                                    keyExtractor={(item, index) => index.toString()}
                                />
                            </View>
                    }
                </View>
                <ButtonGradient
                    containStyle={{ marginBottom: 10, }}
                    onPress={this.addCustomer}
                    title="Thêm khách hàng"
                />
            </View>
        )
    }
}