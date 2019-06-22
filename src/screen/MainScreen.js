import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Image } from 'react-native'
import HomeScreen from './home/index';
import ProfileScreen from './account/profile/ProfileScreen';
import { values, color, config, screenId } from '../config';
import { Navigation } from 'react-native-navigation';


class MainScreen extends Component {

    constructor(props) {
        super(props)
        Navigation.mergeOptions('MainScreen', {
            topBar: {
                leftButtons: [
                    // {
                    //     id: 'left',
                    //     component: {
                    //         name: 'LeftButton',

                    //     }
                    // }
                ],
                title: {
                    text: screenId.HOME.title,
                    color: '#fff',
                    alignment: 'center',

                    fontSize: values.nav.fontSize
                },
                rightButtons: [
                    {
                        id: 'info',
                        component: {
                            name: 'InfoButton',

                        }
                    }
                ],
                visible: true, background: { color: color.mainColor }
            },
            statusBar: {
                style: 'light',
                visible: true
            }
        })
        this.state = {

        }
        Navigation.events().bindComponent(this); // <== Will be automatically unregistered when unmounted
    }
    componentWillMount() {
    }

    navigationButtonPressed({ buttonId }) {
    }

    render() {
        return (
            <View style={{ width: '100%', flex: 1 }}>
                <HomeScreen  {...this.props} />
            </View>
        )
    }
}
export default MainScreen