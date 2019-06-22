import { Navigation } from "react-native-navigation";
import { AppRegistry } from 'react-native';
import { registerScreens } from "./src/screen/RegisterScreens";
import store from "./src/store";
import Provider from './src/utils/MobxRnnProvider'
import { color } from "./src/config";
registerScreens(store, Provider)
console.disableYellowBox=true
export const goHome = () => Navigation.setRoot({
  root: {
    stack: {
      children: [
        {
          component: {
            id: 'MainScreen',
            name: 'MainScreen',
            options: {
              statusBar: {
                style: 'light',
                visible: true
              }
            }
          },

        }
      ],
    }
  }
})

export const goAuth = () =>
  Navigation.setRoot({
    root: {
      component: {
        name: "AuthScreen",
        id: 'AuthScreen',
        options: {
          statusBar: {
            style: 'dark',
            visible: true
          }
        }
      },

    }
  });
export const goApp2 = () =>
  Navigation.setRoot({
    root: {
      component: {
        name: "App2",
        id: 'App2',
        options: {
          statusBar: {
            style: 'dark',
            visible: true
          }
        }
      },

    }
  });

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      component: {
        id: 'SplashScreen',
        name: "SplashScreen",
        // name:'AuthScreen'
        // name: "HomeScreen",

      }

    }
  });
});