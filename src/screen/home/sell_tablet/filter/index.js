import React, { Component } from 'react'
import { Text, View, FlatList, TouchableOpacity } from 'react-native'
import FlatlistItem from './FlatlistItem';
import { values } from '../../../../config';

// import { inject, observer } from 'mobx-react'
// import { toJS } from 'mobx';
// @inject('Sell')
// @observer
export default class FilterView extends Component {
    constructor(props) {
        super(props)

        this.state = {
        }
    }

    renderItem = ({ item }) => {
        return (<FlatlistItem item={item}
            clickItem={this.props.clickItem}
            itemSelected={this.props.itemSelected} />)
    }

    render() {
        let { data, isShow, dismiss } = this.props;
        return (
            isShow
                ?
                <TouchableOpacity
                    onPress={dismiss}
                    style={{
                        height: '100%', width: '100%', position: 'absolute',
                        alignItems: 'flex-end',
                    }}>
                    <View style={[{ width: '50%', marginHorizontal: 8, marginTop: 8, backgroundColor: 'white', borderRadius: 10, },
                    values.platform == 'ios' ? {
                        shadowColor: '#000000',
                        shadowOffset: { width: 2, height: 4, },
                        shadowOpacity: 0.3,
                        shadowRadius: 6,
                    }
                        :
                        { elevation: 7, }
                    ]}>
                        <FlatList
                            ListEmptyComponent={<Text style={{ fontSize: values.fontSizeNormal, color: '#00000090', textAlign: 'center', padding: 15 }}>{'Không có kết quả tìm kiếm!'}</Text>}
                            style={[{
                                backgroundColor: 'white', borderRadius: 10,
                                width: '100%', marginTop: 15
                            },

                            ]}
                            data={data}
                            renderItem={this.renderItem}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                </TouchableOpacity>
                :
                null
        )
    }
}