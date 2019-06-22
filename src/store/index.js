import User from "./User";
import OnApp from "./OnApp";
import Home from "./Home";
import Sell from "./Sell";
import Bill from "./Bill";
import Product from "./Product";
import Setting from "./Setting";
import Cam from "./Cam";

const stores = {
  User,
  OnApp,
  Home,
  Cam,
  Sell,
  Bill,
  Product,
  Setting
};

export default {
  ...stores
};
