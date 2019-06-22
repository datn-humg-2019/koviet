import React, { Component } from 'react'
import { Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView, Keyboard, Image, ScrollView } from 'react-native'
import { fonts, color, values, images } from '../../../config';
import ButtonGradient from '../../../component/ButtonGradient';
import { Navigation } from 'react-native-navigation';
import SimpleToast from 'react-native-simple-toast';
import { inject, observer } from 'mobx-react'
import {validateEmail} from './../../../utils/Func'
import Loading from '../../../component/Loading';
@inject('User', 'OnApp')
@observer
export default class FogotPasswordScreen extends Component {
    constructor(props) {
        super(props)

        this.state = {
            text: '',
            isLoading: false,
        }
        Navigation.events().bindComponent(this); // <== Will be automatically unregistered when unmounted
    }

    navigationButtonPressed({ buttonId }) {
        if (buttonId == 'close') {
            this.dismissModal()
        }
        // will be called when "buttonOne" is clicked
    }

    dismissKeyboard = () => {
        Keyboard.dismiss()
    }

    dismissModal = () => {
        this.dismissKeyboard()
        Navigation.dismissModal('FogotPasswordScreen')
    }

    send = () => {
        let { User } = this.props;
        this.dismissKeyboard()
        if (this.state.text.trim() != '') {
            if (validateEmail(this.state.text)) {
                this.loading()
                User.forgotPassword(this.state.text, (status) => {
                    this.noLoad()
                })
            } else {
                SimpleToast.show('Bạn cần nhập đúng định dạng email.')
            }
        } else {
            SimpleToast.show('Bạn cần nhập email.')
        }

    }
    loading = () => {
        this.setState({ isLoading: true })
    }


    noLoad = () => {
        this.setState({ isLoading: false })
    }

    render() {
        let { User } = this.props;
        return (
            <TouchableOpacity activeOpacity={1} style={{ width: '100%', flex: 1 }} onPress={this.dismissKeyboard}>
                <ScrollView style={{ flex: 1, width: '100%' }}>
                    <KeyboardAvoidingView
                        behavior='padding'
                        enabled={values.platform == 'ios' ? true : false}
                        style={{ width: '100%', flex: 1, backgroundColor: '#fff', alignItems: 'center' }}>
                        <Text style={{
                            fontSize: 58, fontWeight: 'bold', marginBottom: 10,
                            fontFamily: fonts.svn_inter, color: color.mainColor
                        }}>{'SMARTPOS'}</Text>
                        <View style={{ backgroundColor: 'transparent', paddingVertical: 20, width: '80%', alignItems: 'center' }}>
                            <Text style={{ color: color.mainColor, width: '100%', textAlign: 'center' }}>{'Vui lòng nhập lại email đã đăng ký với hệ thống'}</Text>
                            <View style={{ width: '100%', flexDirection: 'row', borderBottomColor: '#D6D6D6', borderBottomWidth: 1, marginVertical: 15, }}>
                                <TextInput
                                    underlineColorAndroid={'transparent'}
                                    placeholder='Email'
                                    placeholderTextColor={color.colorText_nolected}
                                    keyboardType='email-address'
                                    style={{
                                        color: color.mainColor, height: 40,
                                        fontSize: values.fontSizeTitle, flex: 1,
                                        textAlign: 'center',
                                    }}
                                    value={this.state.text}
                                    onChangeText={(text) => this.setState({ text })}
                                />
                                {
                                    this.state.text.trim() != ''
                                        ?
                                        <TouchableOpacity onPress={() => this.setState({ text: '' })} style={{ width: 25, backgroundColor: 'transparent', height: 40, alignItems: 'center', justifyContent: 'center', }}>
                                            <Image style={{ width: 15, resizeMode: 'contain' }}
                                                source={images.ic_clear} />
                                        </TouchableOpacity>
                                        :
                                        null
                                }
                            </View>
                            <ButtonGradient
                                onPress={this.send}
                                containStyle={{ width: '80%' }}
                                title={'Gửi'}
                            />
                        </View>
                    </KeyboardAvoidingView>
                </ScrollView>
                <Loading isLoading={this.state.isLoading} backgroundColor={'transparent'} backgroundColorChild={'#00000070'} colorLoading={'#fff'} title={''} />
            </TouchableOpacity>

        )
    }
}