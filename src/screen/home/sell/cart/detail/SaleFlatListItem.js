import React, { Component } from 'react'
import { Text, View, Switch } from 'react-native'
import { values, color } from '../../../../../config';
import numeral from 'numeral'
import _ from 'lodash'

export default class SaleFlatListItem extends Component {
    constructor(props) {
        super(props)
        let self = this;
        let indexSales = _.findIndex(props.sales, function (o) { return o.id == props.item.id });
        this.state = {
            isSale: ((indexSales + '') != '-1') ? true : false,
        }
    }

    changeValue = (isSale) => {
        this.setState({ isSale })
        this.props.changeValueSale(isSale, this.props.item)
    }

    render() {
        let { item } = this.props;
        return (
            <View style={{
                width: '100%',
                marginVertical: 10,
                flexDirection: 'row',
                backgroundColor: '#fff',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}>
                <Text style={{
                    fontSize: values.fontSizeNormal,
                    flex: 1,
                }}>
                    <Text style={{ color: '#000' }}>{(item.name + ' ') || ''}</Text>
                    <Text style={{ color: color.mainColor }}>{
                        // (item.type == 0)
                        //     ?
                        //     item.value + '%'
                        //     :
                            numeral(item.giatri).format('0,0') + ' đ'}
                    </Text>
                </Text>
                <Switch
                    style={{ marginLeft: 5, }}
                    onValueChange={(isSale) => this.changeValue(isSale)}
                    value={this.state.isSale} />
            </View>
        )
    }
}