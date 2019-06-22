import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity } from 'react-native'
import { Navigation } from 'react-native-navigation';
import { values, color, screenId, images } from '../../config';

import { inject, observer } from 'mobx-react'
@inject('User')
@observer
export default class InfoButton extends Component {

    constructor(props) {
        super(props)

        this.state = {

        }
    }

    showInfo = () => {
        Navigation.showModal({
            stack: {
                children: [{
                    component: {
                        id: 'ProfileScreen',
                        name: 'ProfileScreen',
                        passProps: {
                            text: 'stack with one child'
                        },
                    }
                }]
            }
        })

        // Navigation.showModal({
        //     component: {
        //         name: 'ProfileScreen',
        //         options: {
        //             topBar: {
        //                 leftButtons: [
        //                     {
        //                         id: 'back',
        //                         color: '#fff',
        //                         icon: require('../../assets/images/ic_back.png')
        //                     }
        //                 ],

        //                 title: {
        //                     text: screenId.INFO.title,
        //                     color: '#fff',
        //                     fontSize: values.nav.fontSize
        //                 },
        //                 rightButtons: [
        //                     {
        //                         id: 'info',
        //                         component: {
        //                             name: 'InfoButton'
        //                         }
        //                     }
        //                 ],
        //                 visible: true,
        //                 background: { color: color.mainColor }
        //             }
        //         }
        //     }
        // });
    }

    render() {
        let { User } = this.props;
        return (
            <TouchableOpacity activeOpacity={0.7}
                onPress={this.showInfo}
                style={{
                    height: '100%',
                    justifyContent: 'center',
                    paddingRight: values.platform == 'android' ? 10 : 0,
                    backgroundColor: 'transparent'
                }}>
                <View
                    style={{
                        width: 28, height: 28, borderRadius: 14, overflow: 'hidden',
                        justifyContent: 'center', alignItems: 'center',
                    }}>
                    <Image style={{ width: '100%', height: '100%' }}
                        source={
                            User.userInfo && User.userInfo.avatar
                                ?
                                { uri: User.userInfo.avatar }
                                :
                                images.ic_user_info} />
                </View>
            </TouchableOpacity>
        )
    }
}