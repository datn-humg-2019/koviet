import React, { Component } from 'react'
import { Text, View, FlatList, Image, TouchableOpacity } from 'react-native'
import FlatlistItem from './FlatlistItem';
import { color, values } from '../../../../../../config';

// import { inject, observer } from 'mobx-react'
// import { toJS } from 'mobx';
// @inject('Sell')
// @observer
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
        return (

            < View style={{ backgroundColor: '#fff', width: '100%', borderRadius: 8, alignItems: 'center', }}>
                <View style={{ width: '100%', borderBottomColor: '#ccc', borderBottomWidth: 0.5, backgroundColor: 'transparent', }}>
                    <Text style={{ fontSize: values.fontSizeTitle, width: '100%', fontWeight: 'bold', color: '#000', textAlign: 'center', paddingVertical: 7 }}>DANH SÁCH NHÓM HÀNG</Text>
                </View>
                <FlatList
                    style={{ width: '100%', paddingHorizontal: 10 }}
                    ListEmptyComponent={<Text style={{ fontSize: values.fontSizeNormal, color: "#00000090", textAlign: "center", padding: 15 }}>{"Không có dữ liệu!"}</Text>}
                    data={data}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View >
        )
    }
}