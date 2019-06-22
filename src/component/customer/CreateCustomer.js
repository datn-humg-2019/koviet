import React, { Component } from 'react'
import { Text, View, TextInput, StyleSheet, KeyboardAvoidingView, ScrollView, TouchableOpacity, Keyboard, } from 'react-native'
import { color, values, images } from '../../config';
import { Navigation } from 'react-native-navigation';

import { inject, observer } from 'mobx-react'
import { toJS } from 'mobx';
import SimpleToast from 'react-native-simple-toast';
import { validateEmail, checkPhone } from '../../utils/Func';
@inject('Sell')
@observer
export default class CreateCustomer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            email: '',
            phone: '',
            note: '',
        }
        Navigation.events().bindComponent(this); // <== Will be automatically unregistered when unmounted
    }

    componentWillMount() {
    }

    navigationButtonPressed({ buttonId }) {
        if (buttonId == 'back') {
            this.goBack()
        } else if (buttonId == 'save') {
            this.save()
        }
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

    save = () => {
        let { Sell } = this.props;
        let { name, email, phone, note } = this.state;
        if (this.checkValue()) {

            Sell.addCustomer(name, email, phone, note)
            this.gotoCustomerInfo({ name, email, phone, note })

        }
    }

    gotoCustomerInfo = (item) => {
        Navigation.push('CreateCustomer', {
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
                            // alignment: 'center',
                            fontSize: values.nav.fontSize
                        },
                        rightButtons: [
                            {
                                id: 'add',
                                color: '#fff',
                                text: 'Thêm vào hoá đơn'
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

    goBack = () => {
        Navigation.pop('CreateCustomer')
    }

    render() {
        return (
            <ScrollView style={{ flex: 1 }}
            // bounces={false}
            >
                <KeyboardAvoidingView style={{ flex: 1 }} enabled={values.platform == 'ios' ? true : false} behavior={'padding'}>
                    <TouchableOpacity activeOpacity={1} onPress={() => Keyboard.dismiss()} style={{ flex: 1, paddingTop: 50, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 10 }}>
                        <TextInput
                            value={this.state.name}
                            underlineColorAndroid={'transparent'}
                            onChangeText={(name) => { this.setState({ name }) }}
                            placeholder={'Họ và tên'}
                            autoCapitalize={'words'}
                            placeholderTextColor={color.colorText_nolected}
                            style={styles.textInput}
                        />
                        <TextInput
                            value={this.state.email}
                            underlineColorAndroid={'transparent'}
                            onChangeText={(email) => { this.setState({ email }) }}
                            placeholder={'Email'}
                            keyboardType={'email-address'}
                            placeholderTextColor={color.colorText_nolected}
                            style={styles.textInput} />
                        <TextInput
                            value={this.state.phone}
                            underlineColorAndroid={'transparent'}
                            onChangeText={(phone) => { this.setState({ phone }) }}
                            placeholder={'Số điện thoại'}
                            keyboardType={'numeric'}
                            placeholderTextColor={color.colorText_nolected}
                            style={styles.textInput} />
                        <TextInput
                            value={this.state.note}
                            underlineColorAndroid={'transparent'}
                            onChangeText={(note) => { this.setState({ note }) }}
                            placeholder={'Ghi chú'}
                            autoCapitalize={'none'}
                            placeholderTextColor={color.colorText_nolected}
                            style={styles.textInput} />
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    textInput: { height: 40, color: '#000', width: '100%', borderBottomColor: color.borderColor, borderBottomWidth: 0.5, marginBottom: 15 },
})