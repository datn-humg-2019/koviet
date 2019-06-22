import React, { Component } from 'react'
import { Text, View, FlatList } from 'react-native'
import FlatlistItem from './FlatlistItem';
import { color, values } from '../../../../../config';

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
        return (<FlatlistItem item={item} clickItem={this.props.clickItem} changeValue={this.props.changeValue} />)
    }

    render() {
        let { data, isShow } = this.props;
        console.log('du lieu chi tiet: ' + JSON.stringify(data))
        return (
            < View style={{ flex: 1, width: '100%', paddingHorizontal: 10, }}>
                <FlatList
                    ListEmptyComponent={<Text style={{ fontSize: values.fontSizeNormal, color: '#00000090', textAlign: 'center', padding: 15 }}>{'Danh sách trống'}</Text>}
                    style={{ paddingTop: 10 }}
                    data={data}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View >
        )
    }
}