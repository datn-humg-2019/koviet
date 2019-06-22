import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity } from 'react-native'
import { Navigation } from 'react-native-navigation';
import { values, color, screenId } from '../config';

export default class LeftButton extends Component {

    constructor(props) {
        super(props)

        this.state = {

        }
    }


    render() {
        let { User } = this.props;
        return (
            <View style={{ width: 40, height: 40, justifyContent: 'center', alignItems: 'center', }}>
                <TouchableOpacity activeOpacity={1}
                    // onPress={this.showInfo}
                    style={{
                        width: 28, height: 28, borderRadius: 14, overflow: 'hidden',
                        justifyContent: 'center', alignItems: 'center',
                    }}>
                </TouchableOpacity>
            </View>

        )
    }
}