import {Navigation} from "react-native-navigation";
import App from './App';
import Creatingdevice from './screens/creatingdevice';


Navigation.registerComponent(`App`, () => App);
Navigation.registerComponent(`Creatingdevice`, () => Creatingdevice);


Navigation.events().registerAppLaunchedListener(() => {

  Navigation.setRoot({
      root: {
        sideMenu: {
          center: {
            stack: {
              id: 'MAIN_STACK',
              children: [
                {
                  component: {
                    name: 'App',
                    options: {
                      topBar: {
                        title: {
                          text: "Home Page"
                        }
                      }
                    }
                  }
                },
              ]
            }
          }
        },
      }
  });

});
