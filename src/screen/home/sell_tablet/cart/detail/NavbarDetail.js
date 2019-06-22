import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Image } from 'react-native'
import { images, values } from '../../../../../config';

export default class NavbarDetail extends Component {
  render() {
    let { title, onPress } = this.props;
    return (
      <View style={[{
        width: '100%', height: 44, flexDirection: 'row',
        alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#fff'
      },
      values.platform == 'ios' ? {
        shadowColor: '#000000',
        shadowOffset: { width: 2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
      }
        :
        { elevation: 10 }
      ]}>
        <View style={{ width: 40, height: 40, }} />
        <View style={{ flex: 1, height: 40, justifyContent: 'center', alignItems: 'center', }}>
          <Text numberOfLines={1} style={{ textAlign: 'center', width: '100%', backgroundColor: 'transparent' }}>{title || ''}</Text>
        </View>
        <TouchableOpacity
          onPress={onPress}
          activeOpacity={0.7}
          style={{ width: 40, height: 40, justifyContent: 'center', alignItems: 'center', }}>
          <Image style={{ width: 24, resizeMode: 'contain', tintColor: '#000' }} source={images.ic_close} />
        </TouchableOpacity>
      </View>
    )
  }
}