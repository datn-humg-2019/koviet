import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity, Dimensions } from 'react-native'
import numeral from 'numeral'
import { values, color } from '../../../../config';
export default class FlatlistItem extends Component {
    constructor(props) {
        super(props)
        let { width, height } = Dimensions.get('window')
        this.state = {
            width, height
        }
    }

    onLayout = () => {
        let { width, height } = Dimensions.get('window')
        this.setState({
            width, height
        })
    }

    render() {
        let { item, clickItem } = this.props;
        // let width = this.state.width
        // let width = '100%'
        return (
            // <View style={[{
            //     width: '100%', alignItems: 'center', justifyContent: 'center'
            // },
            //     // values.platform == 'ios' ? {
            //     //     shadowColor: '#000000',
            //     //     shadowOffset: { width: 2, height: 4 },
            //     //     shadowOpacity: 0.2,
            //     //     shadowRadius: 10,

            //     // }
            //     //     :
            //     //     { elevation: 10 }
            // ]} >
            <TouchableOpacity
                onLayout={this.onLayout}
                onPress={() => clickItem(item)}
                style={[{
                    width: (this.state.width - 15 * 7) / 6, paddingTop: 10,
                    marginBottom: 10, marginRight: 15,
                    backgroundColor: 'white',
                    borderRadius: 10,
                    overflow: 'hidden', alignItems: 'center'
                },
                ]}>
                <View style={{
                    width: (this.state.width - 15 * 7) / 6 - 20, height: (this.state.width - 15 * 7) / 6 - 20,
                    borderRadius: 10,
                    overflow: 'hidden',
                }}>
                    {
                        item.image
                            ?
                            <Image style={{ width: '100%', height: '100%', }}
                                source={{ uri: item.image }} />
                            :
                            <View style={{ width: '100%', height: '100%', backgroundColor: item.color || color.mainColor }} />
                    }
                </View>
                <View style={{ flex: 1, padding: 10, justifyContent: 'space-between', backgroundColor: 'transparent' }}>
                    <Text
                        numberOfLines={2}
                        style={{ fontSize: values.fontSizeNormal, marginBottom: 3, color: color.HOME.nolected, flex: 1, backgroundColor: 'transparent' }} >{item.title || ''}</Text>
                    <Text
                        style={{ color: color.mainColor, fontWeight: '500', flex: 1 }}
                    >{(item.price ? numeral(item.price).format('0,0') : '') + ' ' + (item.unit || '')}</Text>
                </View>

            </TouchableOpacity>
            // </View >
        )
    }
}