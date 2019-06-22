import React, { Component } from 'react'
import { Text, View, FlatList } from 'react-native'
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

    renderItem = ({ item, index }) => {
        return (<FlatlistItem item={item} clickItem={this.props.clickItem} index={index}
            changeValue={this.props.changeValue}
            length={this.props.data && this.props.data.length || 0} />)
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