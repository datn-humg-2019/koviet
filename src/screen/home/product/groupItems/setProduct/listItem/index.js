import React, { Component } from 'react'
import { Text, View, FlatList } from 'react-native'
import FlatlistItem from './FlatlistItem';
import { color, values } from '../../../../../../config';
import _ from 'lodash'
import { inject, observer } from 'mobx-react'
import { toJS } from 'mobx';
@inject('Product')
@observer
export default class ListItemView extends Component {
    constructor(props) {
        super(props)

        this.state = {
        }
    }

    checkValue = (item) => {
        let check = false
        // console.log('item so sanh: ' + JSON.stringify(item) + ' this.props.Product.listItemSetProduct: ' + JSON.stringify(this.props.Product.listItemSetProduct))
        let indexItem = _.findIndex(this.props.Product.listItemSetProduct, function (o) {
            return o.id == item.id;
        })
        // console.log('indexItem: ' + indexItem)
        if ((indexItem + '') != '-1') {
            check = true
        }
        return check

    }

    renderItem = ({ item }) => {
        return (<FlatlistItem item={item} clickItem={this.props.clickItem}
            groupTitle={this.props.Product.checkGroup(item.groupId)}
            isCheck={this.checkValue(item)}

        />)
    }

    render() {
        let { data } = this.props;
        return (

            < View style={{ flex: 1, width: '100%', paddingHorizontal: 10, }}>
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