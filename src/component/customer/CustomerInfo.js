import React, { Component } from 'react'
import {
    Text, View, TextInput, StyleSheet, KeyboardAvoidingView, ScrollView,
    TouchableOpacity, Keyboard, Image, Alert,
} from 'react-native'
import { color, values, images, config } from '../../config';
import { Navigation } from 'react-native-navigation';
import { inject, observer } from 'mobx-react'
import { toJS } from 'mobx';
import SimpleToast from 'react-native-simple-toast';
import { validateEmail, checkPhone } from '../../utils/Func';
import ButtonGradient from '../ButtonGradient';
@inject('Sell')
@observer
export default class CustomerInfo extends Component {
    constructor(props) {
        super(props)
        let { item } = this.props;
        this.state = {
            name: item.name || '',
            email: item.email || '',
            phone: item.phone || '',
            note: item.note || '',
            editable: false,
        }
        Navigation.events().bindComponent(this); // <== Will be automatically unregistered when unmounted
    }

    componentWillMount() {
    }

    navigationButtonPressed({ buttonId }) {
        if (buttonId == 'back') {

            this.goBack(this.props.type || '')
        } else if (buttonId == 'add') {
            this.addItemToCart()
        } else if (buttonId == 'delete') {
            this.deleteCustomer()
        }
    };

    deleteCustomer = () => {
        let { Sell } = this.props;
        Alert.alert('Xoá khách hàng', 'Bạn thực sự muốn xoá khách hàng khỏi đơn hàng này chứ?',
            [
                {
                    // text: 'No way',
                    text: 'Từ chối',
                    onPress: () => console.log('Permission denied'),
                    style: 'cancel',
                },
                {
                    text: 'Xoá',
                    //  text: 'Open Settings',
                    onPress: () => {
                        Sell.removeCustomerInfoCart()
                        this.goBack(this.props.type || '')
                    }
                }//vao setting xin quyen
                ,],
        )
    };

    addItemToCart = () => {
        let { Sell } = this.props;
        this.goBack(this.props.type || '')
        Navigation.dismissAllModals()
        Sell.addCustomerInfoCart(this.props.item)
    };

    goBack = (type) => {
        if (type == config.typeScreenCustomInfo.isInfoCustomer) {
            Navigation.pop('CustomerInfo')
        } else {
            Navigation.popTo('AddCustomerScreeen')
        }
    }

    editInfo = () => {
        this.setState({ editable: true })
        this.nameRef.focus()
    }
    checkValue = () => {
        let check = false
        let { name, email, phone } = this.state;
        if (name.trim() != '') {
            if (email.trim() != '') {
                if (validateEmail(email)) {
                    if (phone.trim() != '') {
                        if (checkPhone(phone)) {
                            check = true
                        } else {
                            SimpleToast.show('Bạn cần nhập đúng định dạng số điện thoại')
                        }
                    } else {
                        SimpleToast.show('Bạn cần nhập số điện thoại')
                    }
                } else {
                    SimpleToast.show('Bạn cần nhập đúng định dạng email')
                }
            } else {
                SimpleToast.show('Bạn cần nhập email')
            }
        } else {
            SimpleToast.show('Bạn cần nhập họ tên của Khách hàng')
        }
        return check
    }

    saveInfo = () => {
        let { Sell } = this.props;
        let { name, email, phone, note } = this.state;
        if (this.checkValue()) {
            Sell.editCustomer(this.props.item.id, name, email, phone, note)
            this.goBack(this.props.type || '')
        }
    }

    render() {
        let { item } = this.props;
        return (
            <ScrollView style={{ flex: 1 }}
            >
                <KeyboardAvoidingView style={{ flex: 1 }} enabled={values.platform == 'ios' ? true : false} behavior={'padding'}>
                    <TouchableOpacity activeOpacity={1} onPress={() => Keyboard.dismiss()}
                        style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 10 }}>
                        <View style={{ borderRadius: 40, overflow: 'hidden', justifyContent: 'center', alignItems: 'center' }}>
                            <Image style={{ width: 80, height: 80, tintColor: 'gray' }} source={images.ic_user_info} />
                        </View>
                        <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center', }}>
                            <TextInput
                                underlineColorAndroid={'transparent'}
                                value={this.state.name}
                                onChangeText={(name) => { this.setState({ name }) }}
                                placeholder={'Họ và tên'}
                                ref={(ref) => { this.nameRef = ref; }}
                                editable={this.state.editable}
                                autoCapitalize={'words'}

                                placeholderTextColor={color.colorText_nolected}
                                style={[{ height: 50, color: '#000', flex: 1, textAlign: 'center', fontSize: 21 }]}
                            />
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
                            <Image style={{ width: 20, height: 20, resizeMode: 'contain' }} source={images.ic_email} />
                            <View style={{ flex: 1 }}>
                                <TextInput
                                    underlineColorAndroid={'transparent'}
                                    value={this.state.email}
                                    editable={this.state.editable}
                                    onChangeText={(email) => { this.setState({ email }) }}
                                    placeholder={'Email'}
                                    placeholderTextColor={color.colorText_nolected}
                                    style={styles.textInput}
                                />
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
                            <Image style={{ width: 20, height: 20, resizeMode: 'contain' }} source={images.ic_call} />
                            <View style={{ flex: 1 }}>
                                <TextInput
                                    underlineColorAndroid={'transparent'}
                                    value={this.state.phone}
                                    editable={this.state.editable}
                                    onChangeText={(phone) => { this.setState({ phone }) }}
                                    placeholder={'Số điện thoại'}
                                    placeholderTextColor={color.colorText_nolected}
                                    style={styles.textInput}
                                />
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
                            <Image style={{ width: 20, height: 20, resizeMode: 'contain' }} source={images.ic_note} />
                            <View style={{ flex: 1 }}>
                                <TextInput
                                    underlineColorAndroid={'transparent'}
                                    value={this.state.note}
                                    onChangeText={(note) => { this.setState({ note }) }}
                                    placeholder={'Ghi chú'}
                                    editable={this.state.editable}
                                    placeholderTextColor={color.colorText_nolected}
                                    style={styles.textInput}
                                />
                            </View>
                        </View>
                        {
                            this.state.editable
                                ?
                                <ButtonGradient
                                    onPress={this.saveInfo}
                                    containStyle={{ width: '80%', marginVertical: 30, }}
                                    title={'Lưu'}
                                />
                                :
                                <Text
                                    onPress={this.editInfo}
                                    style={{ textAlign: 'center', padding: 10, marginTop: 30, fontSize: 16, color: color.mainColor, }}>{'Chỉnh sửa hồ sơ'}</Text>

                        }

                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </ScrollView >
        )
    }
}

const styles = StyleSheet.create({
    textInput: {
        height: 40, color: '#000', flex: 1,
        borderBottomColor: color.borderColor,
        borderBottomWidth: 0.5, marginLeft: 10, fontSize: 13

    },
})