import React, { Component } from 'react'
import { Text, View, FlatList, TouchableOpacity } from 'react-native'
import FlatlistItem from './FlatlistItem';
import { values, config } from '../../config';

import { inject, observer } from 'mobx-react'
import { toJS } from 'mobx';
@inject('Sell')
@observer
export default class ExtraInfoView extends Component {
    constructor(props) {
        super(props)

        this.state = {
        }
    }

    renderItem = ({ item }) => {
        return (<FlatlistItem
            item={item}
            clickItem={this.props.clickItem}
            isClick={this.props.Sell.listCart.length > 0 ? true : false}
        />)
    }

    render() {
        let { data, isShow, dismiss, Sell } = this.props;
        return (
            Sell.isShowExtraInfo
                ?
                <TouchableOpacity
                    onPress={() => Sell.dismissisExtraInfo()}
                    activeOpacity={1}
                    style={{
                        height: '100%', width: '100%', position: 'absolute',
                        alignItems: 'flex-end', backgroundColor: '#00000040'
                    }}>
                    <View style={[{ width: 185, marginHorizontal: 8, backgroundColor: 'white', borderRadius: 10, },
                    values.platform == 'ios' ? {
                        shadowColor: '#000000',
                        shadowOffset: { width: 2, height: 4 },
                        shadowOpacity: 0.3,
                        shadowRadius: 6,
                    }
                        :
                        { elevation: 5, }
                    ]}>
                        <FlatList
                            ListEmptyComponent={<Text style={{ fontSize: values.fontSizeNormal, color: '#00000090', textAlign: 'center', padding: 15 }}>{'Không có dữ liệu!'}</Text>}
                            style={[{
                                width: '100%', marginTop: 8, overflow: 'hidden'
                            },
                            ]}
                            data={
                                Sell.infoCart.customer
                                    ?
                                    config.extraInfoWithCustomer
                                    :
                                    config.extraInfo}
                            renderItem={this.renderItem}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                </TouchableOpacity >
                :
                null
        )
    }
}