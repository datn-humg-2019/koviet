import SplashScreen from './splashScreen/SplashScreen'

import AuthScreen from './account';
import FogotPasswordScreen from './account/forgotpass';
import ProfileScreen from './account/profile/ProfileScreen';
import MainScreen from './MainScreen';

import HomeScreen from './home/index';

import MenuScreen from './drawer/MenuScreen';
import InfoButton from './info';

import SellScreen from './home/sell';
import SellTabletScreen from './home/sell_tablet';
import BillScreen from './home/bill';
import ProductScreen from './home/product';
import SettingScreen from './home/setting';
import LeftButton from '../component/LeftButton';
import CartScreen from './home/sell/cart';
import ScanQRScreen from './../component/scanQR/ScanQRScreen';
import CameraButton from './../component/scanQR/CameraButton';
import ItemCartDetail from './home/sell/cart/detail';
import AddCustomerScreeen from './home/sell/addCustomer';
import CalendarScreen from './home/bill/CalendarScreen';
import BillDetail from './home/bill/detail';
import RefundScreen from './home/bill/detail/refund/';

import PrinterScreen from './home/setting/printer';
import CreatePrinter from './home/setting/printer/createPrinter/';
import EditPrinter from './home/setting/printer/editPrinter';

import SaleScreen from './home/product/sales';
import CreateSaleItem from './home/product/sales/create';

import ItemScreen from './home/product/items';
import CreateItem from './home/product/items/create/';

import GroupItemScreen from './home/product/groupItems';
import CreateGroupItem from './home/product/groupItems/create';
import SetProductScreen from './home/product/groupItems/setProduct';
import GroupDetail from './home/product/groupItems/detail';
import CreateDetailItem from './home/product/items/detail';
import CreateCustomer from '../component/customer/CreateCustomer';
import CustomerInfo from '../component/customer/CustomerInfo';
import SaleDetail from './home/product/sales/detail';
import App2 from '../../App2';

export {
    SplashScreen,

    AuthScreen,
    FogotPasswordScreen,
    ProfileScreen,

    MainScreen,

    HomeScreen,
    InfoButton,
    SellTabletScreen,
    SellScreen,
    CartScreen,
    ProductScreen,
    BillScreen,
    SettingScreen,
    LeftButton,
    ScanQRScreen,
    CameraButton,
    ItemCartDetail,
    AddCustomerScreeen,
    CalendarScreen,
    BillDetail,
    RefundScreen,

    PrinterScreen,
    CreatePrinter,
    EditPrinter,

    SaleScreen, CreateSaleItem, SaleDetail,
    ItemScreen, CreateItem, CreateDetailItem,
    GroupItemScreen, CreateGroupItem, SetProductScreen, GroupDetail,
    CreateCustomer, CustomerInfo,

    MenuScreen,
    App2
}