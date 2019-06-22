import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity, StyleSheet } from 'react-native'
import { Navigation } from 'react-native-navigation';
import { color, values, images } from '../../../config';
const screenType = {
  item: { id: 'ItemScreen', title: 'Mặt hàng', },
  group: { id: 'GroupItemScreen', title: 'Nhóm hàng' },
  sale: { id: 'SaleScreen', title: 'Giảm giá' }
}
import { inject, observer } from 'mobx-react'
import { toJS } from 'mobx';
// import Loading from '../../component/Loading';

@inject('OnApp', 'Product')
export default class ProductScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {

    }
    Navigation.events().bindComponent(this); // <== Will be automatically unregistered when unmounted
  }
  componentWillMount() {
  }

  navigationButtonPressed({ buttonId }) {
    if (buttonId == 'back') {
      Navigation.pop('ProductScreen')
    }
  }

  clickItem = (screen, rightButton) => {
    Navigation.push('ProductScreen', {
      component: {
        id: screen.id,
        name: screen.id,
        passProps: {
          type: { status: 'product', title: 'Mặt hàng' }
        },
        options: {
          topBar: {
            leftButtons: [
              {
                id: 'back',
                color: '#fff',
                icon: images.ic_back
              }
            ],
            title: {
              text: screen.title || '',
              color: '#fff',
              alignment: 'center',
              fontSize: values.nav.fontSize
            },
            rightButtons: rightButton,
            visible: true,
            background: { color: color.mainColor }
          },
          statusBar: {
            style: 'light',
          }
        }
      }
    });
  }

  render() {
    let { OnApp } = this.props;
    return (
      <View style={{ width: '100%', flex: 1, paddingHorizontal: 15, backgroundColor: color.HOME.bgColorHome }}>
        <TouchableOpacity
          onPress={() => this.clickItem(screenType.item, OnApp.isShowScanQR ? [{
            id: 'scan',
            color: '#fff',
            icon: images.ic_scanner
          }] : []

          )}
          activeOpacity={0.7} style={[styles.buttonParent, styles.shadow]}>
          <View style={styles.viewGreen}>
            <Image style={{ height: 16, resizeMode: 'contain' }} source={images.ic_product_} />
          </View>
          <Text style={styles.text}>{'Mặt hàng'}</Text>
          <Image style={{ height: 20, width: 10, resizeMode: 'contain' }} source={images.ic_left} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.clickItem(screenType.group, [])}
          activeOpacity={0.7} style={[styles.buttonParent, styles.shadow]}>
          <View style={styles.viewGreen}>
            <Image style={{ height: 16, resizeMode: 'contain' }} source={images.ic_groupProduct} />
          </View>
          <Text style={styles.text}>{'Nhóm hàng'}</Text>
          <Image style={{ height: 20, width: 10, resizeMode: 'contain' }} source={images.ic_left} />
        </TouchableOpacity>
        {/* <TouchableOpacity
          onPress={() => this.clickItem(screenType.sale, [])}
          activeOpacity={0.7} style={[styles.buttonParent, styles.shadow]}>
          <View style={styles.viewGreen}>
            <Image style={{ height: 16, resizeMode: 'contain' }} source={images.ic_sale} />
          </View>
          <Text style={styles.text}>{'Giảm giá'}</Text>
          <Image style={{ height: 20, width: 10, resizeMode: 'contain' }} source={images.ic_left} />
        </TouchableOpacity> */}
      </View >
    )
  }
}
const styles = StyleSheet.create({
  text: { flex: 1, paddingHorizontal: 10, fontSize: values.fontSizeTitle, color: '#000' },
  viewGreen: {
    width: 40, height: 40, justifyContent: 'center',
    alignItems: 'center', borderRadius: 20, backgroundColor: color.mainColor
  },
  buttonParent: {
    flexDirection: 'row', alignItems: 'center', padding: 15,
    backgroundColor: '#fff', borderRadius: 8, marginTop: 15,
  },
  shadow: values.platform == 'ios' ? {
    shadowColor: '#000000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  }
    :
    { elevation: 5, }
  ,
})