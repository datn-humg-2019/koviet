import React, { Component } from "react";
import {
    AsyncStorage,
} from "react-native";
import { observable, action } from "mobx";
import {
    config,
    values,
    api,
} from "../config";
import _ from 'lodash'
import moment from 'moment'
import { GetNoToken } from "../config/request";
import SimpleToast from 'react-native-simple-toast';

import BluetoothSerial from 'react-native-bluetooth-serial'
import { Buffer } from 'buffer'

import { EscPos } from 'escpos-xml';

global.Buffer = Buffer
const iconv = require('iconv-lite')

const xml = `
  <?xml version="1.0" encoding="UTF-8"?>
  <document>
      <line-feed />
      <align mode="center">
          <bold>
              <text-line size="1:1">{{title}}</text-line>
          </bold>
          <line-feed />
          <small>
              <text-line>{{subtitle}}</text-line>
          </small>
      </align>
      <small>
          <text-line>Date: {{moment date format="DD/MM/YYYY HH:mm:ss"}}</text-line>
          <text-line size="1:0">{{numeral price format="$ 0,0.00"}}</text-line>
      </small>
      <line-feed />
      <underline>
        <text-line>{{underline}}</text-line>
      </underline>
      <line-feed />
      <align mode="center">
          <white-mode>
              <text-line size="1:1">{{description}}</text-line>
          </white-mode>
          <line-feed />
          <bold>
              {{#if condictionA}}
              <text-line size="1:0">True A</text-line>
              {{else if condictionB}}
              <text-line size="1:0">True B</text-line>
              {{else}}
              <text-line size="1:0">False</text-line>
              {{/if}}
          </bold>
      </align>
      <line-feed />
      <align mode="center">
          <barcode system="CODE_128" width="DOT_250">{{barcode}}</barcode>
      </align>
      <line-feed />
      <align mode="center">
          <qrcode ecl="M">{{qrcode}}</qrcode>
      </align>
  </document>
`;

const data = {
    title: 'In kiểm tra',
    subtitle: 'Subtitle',
    description: 'This is a description',
    date: new Date(),
    price: 1.99,
    condictionA: false,
    condictionB: true,
    barcode: '12345678',
    qrcode: 'hello qrcode',
    underline: 'underline'
}

const buffer = EscPos.getBufferFromTemplate(xml, data);

class Setting {

    @observable token = '';
    @observable listPrinter = [
        { id: 0, model: 'Star SM-T300i(Bluetooth)', name: 'Phòng kinh doanh', status: true, auto: true },
        { id: 1, model: 'Epson SM-T301i(Bluetooth)', name: 'Phòng kĩ thuật', status: true, auto: true },
        { id: 2, model: 'Star SM-T302i(Ethenet)', name: 'Phòng vật tư', status: true, auto: true },
        { id: 3, model: 'Epson SM-T303i(Bluetooth)', name: 'Phòng marketing', status: true, auto: true },
    ]

    @observable listPrinterScaner = []

    @observable isEnabled = false;
    @observable discovering = false;
    @observable devices = [];
    @observable unpairedDevices = [];
    @observable connected = false;
    @observable section = 0;


    @action
    getUserInfo() {
        console.log(JSON.stringify(this.userInfo))
    }

    @action
    addPrinter(model, name, status, auto) {
        let item = {
            id: 'printer' + moment(new Date()).format('YYYYMMDDHHmmss'),
            name, model, status: status, auto: auto
        }
        this.listPrinter.push(item)
        console.log('item: ' + JSON.stringify(item))
        console.log('listPrinter: ' + this.listPrinter)
    }

    @action
    updatePrinter(id, model, name, status, auto) {
        console.log('id: ' + id + ' model: ' + model + ' name: ' + name + '  status: ' + status + ' auto: ' + auto)
        indexItem = _.findIndex(this.listPrinter, function (o) {
            return o.id == id;
        })
        if ((indexItem + '') != '-1') {
            this.listPrinter[indexItem].model = model != undefined ? model : this.listPrinter[indexItem].model
            this.listPrinter[indexItem].name = name != undefined ? name : this.listPrinter[indexItem].name
            this.listPrinter[indexItem].status = status != undefined ? status : this.listPrinter[indexItem].status
            this.listPrinter[indexItem].auto = auto != undefined ? auto : this.listPrinter[indexItem].auto
        }
        console.log('du lieu luc saU: ' + JSON.stringify(this.listPrinter))
    }

    @action
    deletePrinter(id) {
        indexItem = _.remove(this.listPrinter, function (o) {
            return o.id == id;
        })
        console.log('du lieu luc saU: ' + JSON.stringify(this.listPrinter))
    }

    @action
    getListPrinter(callback = null) {
        Promise.all([
            BluetoothSerial.isEnabled(),
            BluetoothSerial.list()
        ])
            .then((values) => {
                console.log('values: ' + JSON.stringify(values))
                const [isEnabled, devices] = values
                this.isEnabled = isEnabled;
                if (isEnabled) {
                    callback && callback(true)
                } else {
                    callback && callback(false)
                }
                this.devices = devices
                console.log('devices: ' + JSON.stringify(devices))
                this.listPrinterScaner = devices;
            })
        BluetoothSerial.on('bluetoothEnabled', () =>
            SimpleToast.show('Bluetooth được kích hoạt')
            // SimpleToast.show('Bluetooth enabled')
        )
        BluetoothSerial.on('bluetoothDisabled', () =>
            SimpleToast.show('Bluetooth bị vô hiệu hoá')
            // SimpleToast.show('Bluetooth disabled')
        )
        BluetoothSerial.on('error', (err) => console.log(`Error: ${err.message}`))
        BluetoothSerial.on('connectionLost', () => {
            if (this.devices) {
                SimpleToast.show(`Connection to device ${this.devices.name} has been lost`)
            }
            this.disconnect_printer()
        })
    }


    @action
    setListPrinter(isEnabled, devices) {
        this.isEnabled = isEnabled;
        this.devices = devices
    }

    @action
    disconnect_printer() {
        this.connected = false
    }
    @action
    connect_printer() {
        this.connected = true
    }

    @action
    requestEnable() {
        BluetoothSerial.requestEnable()
            .then((res) => this.isEnabled = true
            )
            .catch((err) => SimpleToast.show(err.message + ''))
    }

    /**
     * [android]
     * enable bluetooth on device
     */
    @action
    enable() {
        BluetoothSerial.enable()
            .then((res) => this.isEnabled = true
            )
            .catch((err) => SimpleToast.show(err.message + ''))
    }

    /**
     * [android]
     * disable bluetooth on device
     */
    @action
    disable() {
        BluetoothSerial.disable()
            .then((res) => this.isEnabled = false)
            .catch((err) => SimpleToast.show(err.message + ''))
    }

    /**
     * [android]
     * toggle bluetooth
     */
    @action
    toggleBluetooth(value) {
        if (value === true) {
            this.enable()
        } else {
            this.disable()
        }
    }

    /**
     * [android]
     * Discover unpaired devices, works only in android
     */
    @action
    discoverUnpaired() {
        if (this.state.discovering) {
            return false
        } else {
            this.setState({ discovering: true })
            BluetoothSerial.discoverUnpairedDevices()
                .then((unpairedDevices) => {
                    this.unpairedDevices = unpairedDevices;
                    this.discovering = false;
                })
                .catch((err) => SimpleToast.show(err.message + ''))
        }
    }

    /**
     * [android]
     * Discover unpaired devices, works only in android
     */
    @action
    cancelDiscovery() {
        if (this.state.discovering) {
            BluetoothSerial.cancelDiscovery()
                .then(() => {
                    this.discovering = false;
                })
                .catch((err) => SimpleToast.show(err.message + ''))
        }
    }

    /**
     * [android]
     * Pair device
     */
    @action
    pairDevice(device) {
        BluetoothSerial.pairDevice(device.id)
            .then((paired) => {
                if (paired) {
                    SimpleToast.show(`Device ${device.name} paired successfully`)
                    const devices = this.devices
                    devices.push(device)
                    this.devices = devices;
                    this.unpairedDevices = this.state.unpairedDevices.filter((d) => d.id !== device.id);
                } else {
                    SimpleToast.show(`Device ${device.name} pairing failed`)
                }
            })
            .catch((err) => SimpleToast.show(err.message + ''))
    }

    /**
     * Connect to bluetooth device by id
     * @param  {Object} device
     */
    @action
    connect(device) {
        // this.setState({ connecting: true })
        this.connect_printer()
        console.log('in: device.id + ' + device.id)
        if (device && device.id && (device.id + '').length != 17) {
            BluetoothSerial.connect(device.id + '')
                .then((res) => {
                    console.log('res connect: ' + JSON.stringify(res))
                    BluetoothSerial.write(buffer)
                        // BluetoothSerial.write('Ket noi thanh cong. atran in thu ' + moment(new Date()).format('HH:mm DD/MM/YYYY'))
                        .then((res) => {
                            console.log('res in: ' + JSON.stringify(res))
                        })
                        .catch((err) => {
                            console.log('err BluetoothSerial.write: ')
                            console.log(err)
                        })
                    this.device = device
                    this.connected = true
                    this.connecting = false;
                })
                .catch((err) => {
                    console.log('err connect: ')
                    console.log(err)
                    SimpleToast.show(err.message + '')
                })
        } else {
            SimpleToast.show('Máy in không tồn tại.Vui lòng kiểm tra lại')
        }
    }

    /**
     * Disconnect from bluetooth device
     */
    @action
    disconnect() {
        BluetoothSerial.disconnect()
            .then(() => this.disconnect_printer())

            .catch((err) => SimpleToast.show(err.message + ''))
    }

    /**
     * Toggle connection when we have active device
     * @param  {Boolean} value
     */
    @action
    toggleConnect(device) {
        if (this.isEnabled === true) {
            this.connect(device)
        } else {
            this.disconnect()
        }
    }

    /**
     * Write message to device
     * @param  {String} message
     */
    @action
    write(message) {
        if (!this.state.connected) {
            SimpleToast.show('You must connect to device first')
        }

        BluetoothSerial.write(message)
            .then((res) => {
                SimpleToast.show('Successfuly wrote to device')
                this.connected = true;
            })
            .catch((err) => SimpleToast.show(err.message + ''))
    }

    @action
    onDevicePress(device) {
        if (this.state.section === 0) {
            console.log('this.connect(device): ' + JSON.stringify(device))
            this.connect(device)
        } else {
            console.log('this.pairDevice(device)')
            this.pairDevice(device)
        }
    }

    @action
    writePackets(message, packetSize = 64) {
        const toWrite = iconv.encode(message, 'cp852')
        const writePromises = []
        const packetCount = Math.ceil(toWrite.length / packetSize)

        for (var i = 0; i < packetCount; i++) {
            const packet = new Buffer(packetSize)
            packet.fill(' ')
            toWrite.copy(packet, 0, i * packetSize, (i + 1) * packetSize)
            writePromises.push(BluetoothSerial.write(packet))
        }

        Promise.all(writePromises)
            .then((result) => {
            })
    }

}

export default new Setting();
