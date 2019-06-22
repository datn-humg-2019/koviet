import React, { Component } from 'react'
import { Text, View, TextInput, TouchableOpacity, Keyboard, } from 'react-native'
import { color, values } from '../../../../config';
import SearchView from '../../../../component/SearchView';
import EmailnputView from '../../../../component/EmailnputView';
import ButtonGradient from '../../../../component/ButtonGradient';
import _ from 'lodash'
export default class Step02View extends Component {
    constructor(props) {
        super(props)

        this.state = {
            text: ''
        }
    }

    onChangeText = (text) => {
        this.setState({ text })
    }

    send = () => {

    }

    render() {
        let { goBack, goToNewCart } = this.props;
        return (
            <TouchableOpacity
                onPress={() => Keyboard.dismiss()}
                activeOpacity={1}
                style={{ width: '100%', flex: 1, backgroundColor: color.HOME.bgColorHome, }}>
                <View style={{ width: '100%', backgroundColor: 'transparent', marginTop: 20, flex: 1, paddingHorizontal: 15, }}>
                    <Text style={{ fontSize: values.fontSizeTitle, color: '#000', marginBottom: 10, }}>{'Nhập địa chỉ email'}</Text>
                    <EmailnputView
                        placeholder='Email'
                        onChangeText={this.onChangeText}
                        value={this.state.text}
                        onPress={this.send}
                    />
                </View>
                <View style={{ width: '100%', paddingHorizontal: 15 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flex: 1, paddingRight: 10, }}>
                            <ButtonGradient
                                onPress={goBack}
                                colors={['gray', '#ccc']}
                                styleText={{ color: '#ffffff' }}
                                title={'Quay lại'}
                            />
                        </View>
                        <View style={{ flex: 1, paddingLeft: 10 }}>
                            <ButtonGradient
                                onPress={() => this.setState({})}
                                colors={['#1492E6', '#1492E6']}
                                title={'In hoá đơn'}
                            />
                        </View>

                    </View>
                    <ButtonGradient
                        containStyle={{ marginTop: 10, marginBottom: 10 + values.bottomIphoneX, }}
                        onPress={goToNewCart}
                        title={'Đơn hàng mới'}
                    />
                </View>
            </TouchableOpacity >
        )
    }
}