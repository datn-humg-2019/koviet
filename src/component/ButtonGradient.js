import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Image } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { color, values } from '../config';
export default class ButtonGradient extends Component {
    render() {
        let { containStyle, colors, title, image, colorTitle, onPress,
            styleButtonContent, styleImage, styleText,
        } = this.props;
        return (
            <View style={[{ width: '100%' }, containStyle]}>
                <LinearGradient
                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                    colors={colors || color.colors_gradient}
                    style={{ borderRadius: 20, }}>
                    <TouchableOpacity
                        onPress={onPress}
                        activeOpacity={0.7}
                        style={[{ width: '100%', height: 40, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }, styleButtonContent]}>
                        {
                            image
                                ?
                                <Image style={[{ width: 15, height: 15, marginRight: 7, resizeMode: 'contain' }, styleImage]} source={image} />
                                :
                                null
                        }
                        <Text style={[{ textAlign: 'center', fontSize: values.fontSizeTitle, color: colorTitle || 'white', }, styleText]}>{title || ""}</Text>
                    </TouchableOpacity>
                </LinearGradient>
            </View>
        )
    }
}