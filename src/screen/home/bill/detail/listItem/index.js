import React, { Component } from 'react'
import { Text, View, FlatList } from 'react-native'
import FlatlistItem from './FlatlistItem';
import { color, values } from '../../../../../config';

export default class ListItemView extends Component {
    constructor(props) {
        super(props)

        this.state = {
        }
    }

    renderItem = ({ item, index }) => {
        return (<FlatlistItem item={item} clickItem={this.props.clickItem} />)
    }

    render() {
        let { data, isShow } = this.props;
        return (
            < View style={{ width: '100%', }}>
                <FlatList
                    ListEmptyComponent={<Text style={{ fontSize: values.fontSizeNormal, color: '#00000090', textAlign: 'center', padding: 15 }}>{'Không có kết quả tìm kiếm!'}</Text>}
                    // style={{ paddingTop: 10 }}
                    data={data}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View >
        )
    }
}