import React, { Component } from 'react'
import { Text, View, Image, Switch, TouchableOpacity, TextInput, StyleSheet, Keyboard, ScrollView, Alert, AppState } from 'react-native'
import { Navigation } from 'react-native-navigation';
import { color, values, images } from '../../../../../config';
import ListItemView from './listItem';
import ButtonGradient from '../../../../../component/ButtonGradient';
const noprinter = { id: 'noprinter', name: 'Không có máy in' };
import Permissions from 'react-native-permissions'
import { inject, observer } from 'mobx-react'
import { toJS } from 'mobx';
import SimpleToast from 'react-native-simple-toast';
import AndroidOpenSettings from 'react-native-android-open-settings'

import { _alertForBluetoothPermission } from '../../../../../utils/Func';
@inject('Setting')
@observer
export default class CreatePrinter extends Component {
    constructor(props) {
        super(props)

        this.state = {
            text: '',
            item: noprinter,
            value: false,
            valueAuto: false,
            showModal: false,
        }
        Navigation.events().bindComponent(this); // <== Will be automatically unregistered when unmounted
    }

    componentWillMount() {
        console.log('componentWillMount: CreatePrinter')
        this.getListPrinter()
    }

    getListPrinter = () => {
        let { Setting } = this.props;
        Setting.getListPrinter((status) => {
            if (!status) {
                _alertForBluetoothPermission()
            }
        })
    };

    componentDidMount() {
        AppState.addEventListener('change', this._handleAppStateChange);
    }
    _handleAppStateChange = (nextAppState) => {
        let { Setting } = this.props;
        console.log('nextAppState: CreatePrinter ' + nextAppState)
        if (nextAppState === "background") {

        }
        if (nextAppState === "active") {
            if (!Setting.isEnabled) {
                this.getListPrinter()
            } else {

            }
        }
    }

    componentWillUnmount() {
        AppState.removeEventListener('change', this._handleAppStateChange);
    }

    navigationButtonPressed({ buttonId }) {
        if (buttonId == 'back') {
            this.goBack()
        } else if (buttonId == 'save') {
            this.save()
        }
    }

    goBack = () => {

        Navigation.pop('CreatePrinter')

    }

    save = () => {
        let { Setting } = this.props;
        Setting.addPrinter(this.state.item.name, this.state.text, this.state.value, this.state.valueAuto)
        this.goBack()

    }

    chooseModel = () => {
        this.showModal()
    }

    changeValue = (value) => {
        this.setState({ value })
    }

    changeValueAuto = (valueAuto) => {
        this.setState({ valueAuto })
    }

    dismissModal = () => {
        this.setState({ showModal: false })
    }

    showModal = () => {
        Keyboard.dismiss()
        this.setState({ showModal: true })
    }

    printerTest = () => {
        let { Setting } = this.props;
        if (this.state.item && this.state.item != noprinter) {
            Setting.toggleConnect(this.state.item)
        } else {
            SimpleToast.show('Bạn cần chọn máy in')
        }
    }

    clickItem = (item) => {
        this.setState({ item })
        console.log('item: ' + JSON.stringify(item))
        this.dismissModal()
    }

    checkDone = () => {
        let check = false;
        // if (this.state.item.id != noprinter.id) {
        //     check = true
        // }
        return check;
    }

    noClick = () => {

    }

    render() {
        let { Setting } = this.props;
        return (
            <View style={{ flex: 1, width: '100%', backgroundColor: '#fff' }}>
                <ScrollView style={{ flex: 1, width: '100%', }}>
                    <View style={{ flex: 1, width: '100%', padding: 15, }}>
                        <View style={{ width: '100%', marginTop: 15 }}>
                            <Text style={{ fontSize: values.fontSizeTitle, color: '#000', marginBottom: 5 }}>{'Tên'}</Text>
                            <TextInput
                                underlineColorAndroid={'transparent'}
                                placeholder='Nhập'
                                value={this.state.text}
                                onChangeText={text => this.setState({ text })}
                                placeholderTextColor='#00000034'
                                style={[{ width: '100%', height: 40, fontSize: values.fontSizeNormal, paddingHorizontal: 10, color: '#000', backgroundColor: '#fff', borderRadius: 7 },
                                styles.shadow
                                ]} />
                        </View>
                        <View style={{ width: '100%', marginTop: 15 }}>
                            <Text style={{ fontSize: values.fontSizeTitle, color: '#000', marginBottom: 5 }}>{'Model máy'}</Text>
                            <TouchableOpacity
                                onPress={this.chooseModel}
                                activeOpacity={0.7}
                                style={[{
                                    width: '100%', height: 40, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, backgroundColor: '#fff', borderRadius: 7
                                },
                                styles.shadow
                                ]} >
                                <Text style={{ flex: 1, fontSize: values.fontSizeNormal, color: this.state.item.id == noprinter.id ? '#00000034' : '#000' }}>{this.state.item && this.state.item.name || ''}</Text>
                                <Image style={{ height: 10, width: 20, resizeMode: 'contain' }}
                                    source={images.ic_down} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginTop: 15, alignItems: 'center', flexDirection: 'row', backgroundColor: 'transparent' }}>
                            <Text numberOfLines={2} style={{ flex: 1, color: '#000', fontSize: values.fontSizeTitle }}>{'In hóa đơn'}</Text>
                            <Switch
                                // style={{}}
                                onValueChange={(value) => this.changeValue(value)}
                                value={this.state.value} />
                        </View>
                        {
                            this.state.value
                            &&
                            <View style={{ marginTop: 15, alignItems: 'center', flexDirection: 'row', backgroundColor: 'transparent' }}>
                                <Text numberOfLines={2} style={{ flex: 1, color: '#000', fontSize: values.fontSizeTitle }}>{'Tự động in hóa đơn'}</Text>
                                <Switch
                                    // style={{}}
                                    onValueChange={(value) => this.changeValueAuto(value)}
                                    value={this.state.valueAuto} />
                            </View>
                        }

                    </View>

                </ScrollView>
                <View style={{ width: '100%', paddingHorizontal: 15, paddingTop: 10 }}>
                    <ButtonGradient
                        onPress={this.checkDone ? this.printerTest : this.noClick}
                        colors={this.checkDone ? color.colors_gradient : ['#DFDFDF', '#DFDFDF']}
                        containStyle={{ marginBottom: values.bottomIphoneX + 15, }}
                        title={'In kiểm tra'}
                        styleText={{ color: this.checkDone ? '#fff' : '#000' }}
                    />
                </View>
                {
                    this.state.showModal
                    &&
                    <TouchableOpacity onPress={this.dismissModal} activeOpacity={1} style={{
                        width: '100%', height: '100%', position: 'absolute', paddingHorizontal: 20, paddingVertical: 40,
                        backgroundColor: '#00000080', justifyContent: 'center', alignItems: 'center',
                    }}>
                        <View style={{ borderRadius: 8, maxHeight: values.deviceHeight / 2 }}>
                            <ListItemView data={Setting.listPrinterScaner} clickItem={this.clickItem} />
                        </View>
                    </TouchableOpacity>
                }
            </View>
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
        shadowOpacity: 0.1,
        shadowRadius: 4,
    }
        :
        { elevation: 5, }
    ,
})