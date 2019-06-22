import React, { Component } from 'react'
import { Text, View, TextInput, Image, TouchableOpacity, Keyboard } from 'react-native'
import { values, color, images } from '../config';

export default class SearchView extends Component {
    constructor(props) {
        super(props)

        this.state = {
        }
    }



    render() {
        let { placeholder, onChangeText, value, isShowCancel, onFocus, clickCancel } = this.props;
        return (
            <View style={{ flex: 1, height: 40, backgroundColor: 'transparent', flexDirection: 'row' }}>
                <View style={[{
                    flex: 1, borderRadius: 20, backgroundColor: 'white',
                    flexDirection: 'row', alignItems: 'center'
                }, values.platform == 'ios' ? {
                    shadowColor: '#000000',
                    shadowOffset: { width: 2, height: 2 },
                    shadowOpacity: 0.2,
                    shadowRadius: 2,
                }
                    :
                    { elevation: 5, }
                ]}>
                    <TextInput
                        ref={(ref) => this.refs = ref}
                        underlineColorAndroid={'transparent'}
                        placeholder={placeholder || ''}
                        placeholderTextColor={color.colorText_nolected}
                        style={{
                            color: '#000', height: 40, paddingLeft: 10,
                            fontSize: values.fontSizeNormal, flex: 1, backgroundColor: 'transparent'
                        }}
                        onChangeText={(text) => onChangeText(text)}
                        onFocus={onFocus}
                        value={value}
                    />
                    <TouchableOpacity
                        activeOpacity={1}
                        style={{ width: 40, height: 40, alignItems: 'center', justifyContent: 'center', }}>
                        <Image style={{ width: 15, height: 15, resizeMode: 'contain' }}
                            source={images.ic_search} />
                    </TouchableOpacity>
                </View>
                {
                    isShowCancel
                        ?
                        <TouchableOpacity
                            onPress={clickCancel}
                            activeOpacity={1}
                            style={{ height: 40, alignItems: 'center', justifyContent: 'center', }}>
                            <Text style={{ fontSize: values.fontSizeTitle, paddingHorizontal: 10, }}>{'Huỷ'}</Text>
                        </TouchableOpacity>
                        :
                        null
                }

            </View>
        )
    }
}