import React, { Component } from 'react'
import { Text, View, FlatList, Image, TouchableOpacity } from 'react-native'
import FlatlistItem from './FlatlistItem';
import { color, values, images } from '../../../../../config';

import { inject, observer } from 'mobx-react'
import { toJS } from 'mobx';
@inject('Setting')
@observer
export default class ListItemView extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    renderItem = ({ item }) => {
        return (<FlatlistItem item={item} clickItem={this.props.clickItem} />)
    }

    render() {
        let { data, isShow } = this.props;
        //phai co dong log nay moi render lai
        console.log('data render: ' + JSON.stringify(data))
        return (

            < View style={{ flex: 1, width: '100%', paddingHorizontal: 10, }}>
                <FlatList
                    ListEmptyComponent={
                        <View style={{ width: '100%', alignItems: 'center', paddingVertical: 30, paddingHorizontal: 10 }}>
                            <View style={{
                                width: 80, height: 80, borderRadius: 40,
                                backgroundColor: color.HOME.bgColorHome,
                                justifyContent: 'center', alignItems: 'center',
                            }}>
                                <Image style={{ height: 32, width: 32, resizeMode: 'contain', tintColor: '#fff' }}
                                    source={images.ic_printer_white} />
                            </View>
                            <Text numberOfLines={1} style={{ textAlign: 'center', fontSize: 15, marginTop: 10, marginBottom: 5 }}>Bạn chưa có máy in nào.</Text>
                            <Text numberOfLines={1} style={{ fontSize: values.fontSizeTitle, color: '#000', textAlign: 'center' }}>
                                <Text>Nhấn vào nút </Text>
                                <Text style={{ color: color.mainColor }}>+</Text>
                                <Text> để thêm một máy in</Text>
                            </Text>
                        </View>
                    }
                    data={data}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View >
        )
    }
}