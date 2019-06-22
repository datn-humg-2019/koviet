import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Image, StyleSheet, Switch } from 'react-native'
import { Navigation } from 'react-native-navigation';
import { color, values, images } from '../../../config';

import { inject, observer } from 'mobx-react'
import { toJS } from 'mobx';
// import Loading from '../../component/Loading';

@inject('OnApp')
export default class SettingScreen extends Component {
    constructor(props) {
        super(props)
        let { OnApp } = this.props;
        this.state = {
            showGeneral: false,
            value: OnApp.isShowScanQR
        }
        Navigation.events().bindComponent(this); // <== Will be automatically unregistered when unmounted
    }
    componentWillMount() {
    }

    navigationButtonPressed({ buttonId }) {
        if (buttonId == 'back') {
            Navigation.pop('SettingScreen')
        }
    }

    clickPrinter = () => {
        Navigation.push('SettingScreen', {
            component: {
                id: 'PrinterScreen',
                name: 'PrinterScreen',
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
                            text: 'Máy in',
                            color: '#fff',
                            alignment: 'center',
                            fontSize: values.nav.fontSize
                        },
                        rightButtons: [],
                        visible: true,
                        background: { color: color.mainColor }
                    },
                    statusBar: {
                        style: 'light',
                    }
                }
            }
        });
    };

    clickGeneral = () => {
        this.setState({ showGeneral: !this.state.showGeneral })
    };

    changeValue = (value) => {
        let { OnApp } = this.props;
        this.setState({ value })
        if (value == true) {
            OnApp.showScanQR()
        } else {
            OnApp.hiddenScanQR()
        }
    }

    render() {
        return (
            <View style={{ width: '100%', flex: 1, paddingHorizontal: 15, backgroundColor: color.HOME.bgColorHome }}>
                <TouchableOpacity
                    onPress={this.clickPrinter}
                    activeOpacity={0.7} style={[styles.buttonParent, styles.shadow]}>
                    <View style={styles.viewGreen}>
                        <Image style={{ height: 16, resizeMode: 'contain' }}
                            source={images.ic_printer} />
                    </View>
                    <Text style={styles.text}>{'Máy in'}</Text>
                    <Image style={{ height: 20, width: 10, resizeMode: 'contain' }} source={images.ic_left} />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={this.clickGeneral}
                    activeOpacity={0.7} style={[styles.buttonParent, styles.shadow, { flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }]}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <View style={styles.viewGreen}>
                            <Image style={{ height: 16, resizeMode: 'contain' }} source={images.ic_setting_2} />
                        </View>
                        <Text style={styles.text}>{'Cài đặt chung'}</Text>
                        {
                            this.state.showGeneral
                                ?
                                <Image style={{ height: 10, width: 20, resizeMode: 'contain' }} source={images.ic_down} />
                                :
                                <Image style={{ height: 20, width: 10, resizeMode: 'contain' }} source={images.ic_left} />
                        }
                    </View>
                    {
                        this.state.showGeneral &&
                        <View style={{ marginTop: 10, alignItems: 'center', flexDirection: 'row', backgroundColor: 'transparent' }}>
                            <Text numberOfLines={2} style={{ flex: 1, color: '#000', fontSize: values.fontSizeTitle }}>{'Dùng camera quét mã vạch'}</Text>
                            <Switch
                                style={{}}
                                onValueChange={(value) => this.changeValue(value)}
                                value={this.state.value} />
                        </View>
                    }
                </TouchableOpacity>
            </View >
        )
    }
}

const styles = StyleSheet.create({
    text: { flex: 1, paddingHorizontal: 10, fontSize: values.fontSizeTitle, color: '#000' },
    viewGreen: {
        width: 40, height: 40, justifyContent: 'center',
        alignItems: 'center', borderRadius: 20, backgroundColor: color.mainColor
    },
    buttonParent: {
        flexDirection: 'row', alignItems: 'center', padding: 15,
        backgroundColor: '#fff', borderRadius: 8, marginTop: 15,
    },
    shadow: values.platform == 'ios' ? {
        shadowColor: '#000000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    }
        :
        { elevation: 5, }
    ,
})