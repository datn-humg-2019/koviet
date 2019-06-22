import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity } from 'react-native'

import { inject, observer } from 'mobx-react'
import { images } from '../../config';
@inject('Cam')
@observer
export default class CameraButton extends Component {
    constructor(props) {
        super(props)

        this.state = {}
    }

    changeFlashType = () => {
        let { Cam } = this.props;
        Cam.changeTypeFlash()
    }
    changeCameraType = () => {
        let { Cam } = this.props;
        Cam.changeTypeCamera()
    }

    render() {
        let { Cam } = this.props;
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', backgroundColor: 'transparent' }}>
                <TouchableOpacity activeOpacity={0.7}
                    onPress={this.changeCameraType}
                    style={{
                        width: 40, height: 40,
                        justifyContent: 'center', alignItems: 'center',
                    }}>
                    <Image style={{ width: 24, height: 24, resizeMode: 'contain', tintColor: '#fff' }}
                        source={images.ic_changeCamera} />
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.7}
                    onPress={this.changeFlashType}
                    style={{
                        width: 40, height: 40,
                        justifyContent: 'center', alignItems: 'center',
                    }}>
                    <Image
                        style={{ width: 24, height: 24, resizeMode: 'contain', tintColor: '#fff' }}
                        source={
                            Cam.isFlash ?
                                images.ic_flash_off
                                :
                                images.ic_fash_on
                        } />
                </TouchableOpacity>
            </View>

        )
    }
}
