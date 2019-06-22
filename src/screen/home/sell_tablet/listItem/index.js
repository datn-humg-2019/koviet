import React, { Component } from 'react'
import { Text, View, FlatList } from 'react-native'
import FlatlistItem from './FlatlistItem';
import { color, values } from '../../../../config';

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
        return (<FlatlistItem item={item}
            // width={numColumns}
            clickItem={this.props.clickItem} />)
    }

    render() {
        let { data, isShow, numColumns } = this.props;
        return (

            < View style={{ flex: 1, width: '100%', }}>
                <FlatList
                    style={{ marginLeft: 15 }}
                    ListEmptyComponent={<Text style={{ fontSize: values.fontSizeNormal, color: '#00000090', textAlign: 'center', padding: 15 }}>{'Không có kết quả tìm kiếm!'}</Text>}
                    // style={{ paddingTop: 10 }}
                    data={data}
                    key={numColumns}
                    numColumns={numColumns}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View >
        )
    }
}