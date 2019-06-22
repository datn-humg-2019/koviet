import React, { Component } from 'react'
import { Text, View, Image, TextInput, TouchableOpacity } from 'react-native'
import { color, values, images } from '../../../../config';
import SearchView from '../../../../component/SearchView';

export default class TopView extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        return (
            <View style={{ width: '100%', height: 40, marginVertical: 10, paddingHorizontal: 10, flexDirection: 'row' }}>
                <SearchView />
                <TouchableOpacity style={{ height: 40, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                    <Text numberOfLines={1} style={{ fontSize: values.fontSizeNormal, color: '#000', paddingHorizontal: 10, }}>{'Thiết bị điện tử'}</Text>
                    <Image style={{ width: 12, tintColor: '#000', resizeMode: 'contain' }}
                        source={images.ic_down} />
                </TouchableOpacity>
            </View>
        )
    }
}