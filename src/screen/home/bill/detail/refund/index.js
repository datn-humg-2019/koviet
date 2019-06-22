import React, { Component } from 'react'
import { Text, View, ScrollView } from 'react-native'
import { Navigation } from 'react-native-navigation';
import ListItemView from './listItem';
import { color, values } from '../../../../../config';
import numeral from 'numeral'
import ButtonGradient from '../../../../../component/ButtonGradient';

import _ from 'lodash'
import { inject, observer } from 'mobx-react'
@inject('Bill', 'OnApp')
@observer
export default class RefundScreen extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: []

        }
        Navigation.events().bindComponent(this); // <== Will be automatically unregistered when unmounted
    }
    componentWillMount() {
        let { Bill, id } = this.props;
        if (Bill.listBill.length > 0) {
            let data = _.find(Bill.listBill, function (o) { return o.id == id });
            if (data) {
                console.log('data: ' + JSON.stringify(data))
                this.setState({ data: data })
            }
        }
    }

    navigationButtonPressed({ buttonId }) {
        if (buttonId == 'back') {
            Navigation.pop('RefundScreen')
        }
    }

    clickListItem = item => {
        console.log(item)
    }

    clickRefund = () => {

    }

    changeValue = (type, item) => {
        //them   
    }

    render() {
        let { data } = this.state
        return (
            <View style={{ flex: 1, width: '100%', paddingHorizontal: 10 }}>
                <ScrollView style={{ flex: 1, width: '100%' }}>
                    <ListItemView
                        data={data.listCart}
                        clickItem={this.clickListItem}
                        changeValue={this.changeValue}
                    />
                    <View style={{ width: '100%', alignItems: 'flex-end', paddingVertical: 10, backgroundColor: 'transparent' }}>
                        <Text style={{ fontSize: values.fontSizeNormal, fontWeight: '500' }}>
                            <Text style={{ color: color.HOME.nolected, }}>{'Tổng tiền: '}</Text>
                            <Text style={{ color: color.mainColor, }} >{numeral(data.total).format('0,0') + 'đ'}</Text>
                        </Text>
                    </View>
                </ScrollView>
                <View style={{ width: '100%', paddingHorizontal: 15, paddingTop: 10 }}>
                    <ButtonGradient
                        onPress={this.clickRefund}
                        containStyle={{ marginBottom: values.bottomIphoneX + 15, }}
                        title={'Hoàn lại tiền'}
                    />
                </View>
            </View>
        )
    }
}