import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  DeviceEventEmitter
} from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { color, values } from "../../../config";
import { Navigation } from "react-native-navigation";
var moment = require("moment");
import "moment/locale/vi"; // without this line it didn't work
moment.locale("vi");
var dateCurent = moment(new Date()).format("YYYY-MM-DD");
LocaleConfig.locales["vi"] = {
  monthNames: [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12"
  ],
  monthNamesShort: [
    "Th.1",
    "Th.2",
    "Th.3",
    "Th.4",
    "Th.5",
    "Th.6",
    "Th.7",
    "Th.8",
    "Th.9",
    "Th.10",
    "Th.11",
    "Th.12"
  ],
  dayNames: ["Chủ nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"],
  dayNamesShort: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"]
};

LocaleConfig.defaultLocale = "vi";

import { inject, observer } from "mobx-react";
@inject("Bill", "OnApp")
@observer
export default class CalendarScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      daySelected:
        this.props.Bill.dayFilter || moment(new Date()).format("YYYY-MM-DD")
    };
    Navigation.events().bindComponent(this); // <== Will be automatically unregistered when unmounted
  }
  componentWillMount() {}

  navigationButtonPressed({ buttonId }) {
    if (buttonId == "back") {
      this.goBack();
    }
  }

  goBack = () => {
    Navigation.pop("CalendarScreen");
  };
  componentDidMount() {}

  pressDay = day => {
    // this.goBack()
    console.log("daySelected: " + JSON.stringify(day));
    this.setState({ daySelected: day.dateString });
  };

  clickCancel = () => {
    this.goBack();
  };

  clickReset = () => {
    let { Bill } = this.props;
    this.setState({ daySelected: moment(new Date()).format("YYYY-MM-DD") });
    Bill.setDayFilter("");
    this.goBack();
  };

  clickOk = () => {
    let { Bill } = this.props;
    Bill.setDayFilter(this.state.daySelected);
    this.goBack();
    DeviceEventEmitter.emit("searchDateBill");
  };

  render() {
    let markedDates = { [this.state.daySelected]: { selected: true } };
    return (
      <View style={{ width: "100%", flex: 1 }}>
        <View
          style={{ width: "100%", backgroundColor: "#E7F2E9", padding: 15 }}
        >
          <Text
            style={{ fontSize: values.fontSizeNormal, color: color.mainColor }}
          >
            {"Hôm nay"}
          </Text>
          <Text
            style={{
              fontSize: values.fontSizeTitle,
              fontWeight: "bold",
              color: "#000",
              width: "100%"
            }}
          >
            {moment(new Date()).format("dddd LL")}
          </Text>
        </View>
        <View style={{ width: "100%", backgroundColor: "red" }}>
          <Calendar
            minDate={"1990-01-01"}
            maxDate={moment(new Date()).format("YYYY-MM-DD")}
            onDayPress={day => this.pressDay(day)}
            onMonthChange={month => {
              console.log("month changed", month);
            }}
            firstDay={1}
            markedDates={markedDates}
            // markedDates={{
            //     '2019-01-23': {selected: true}
            //     // '2019-01-24': {selected: true, marked: true, dotColor: 'green'},
            //     // '2019-01-25': {marked: true, dotColor: 'red'},
            //     // '2019-01-26': {marked: true},
            //     // '2019-01-27': {disabled: true, activeOpacity: 0}
            //   }}
            theme={{
              selectedDayBackgroundColor: color.mainColor,
              selectedDayTextColor: "#fff",

              todayTextColor: "#00adf5",
              dayTextColor: "#2d4150",
              // selectedColor: 'blue',
              dotColor: "#00adf5",
              arrowColor: "#000",
              textDayFontSize: 13,
              textMonthFontSize: 16,
              textDayHeaderFontSize: 13
            }}
          />
        </View>
        <View
          style={{ width: "100%", alignItems: "flex-end", marginBottom: 100 }}
        >
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              onPress={this.clickCancel}
              style={{
                height: 44,
                paddingHorizontal: 20,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "400",
                  color: color.mainColor
                }}
              >
                Huỷ
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this.clickReset}
              style={{
                height: 44,
                paddingHorizontal: 20,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "400",
                  color: color.mainColor
                }}
              >
                Reset
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this.clickOk}
              style={{
                height: 44,
                paddingHorizontal: 20,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "400",
                  color: color.mainColor
                }}
              >
                OK
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
