import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Image } from 'react-native'
import { values } from '../../config';
export default class ButtonTab extends Component {
  render() {
    let { image, title, typeCurrent, typeClick, changeTypeScreen } = this.props;
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => { changeTypeScreen(typeClick) }}
        style={{ paddingHorizontal: 10, justifyContent: 'center', alignItems: 'center' }}>
        <Image
          style={{
            height: 20, marginBottom: 3, resizeMode: 'contain',
            tintColor: typeCurrent == typeClick ? '#fff' : '#ffffff90'
          }}
          source={image} />
        <Text style={{ fontSize: values.fontSizeNormal, color: typeCurrent == typeClick ? '#fff' : '#ffffff90' }}>{title || ''}</Text>
      </TouchableOpacity>
    )
  }
}