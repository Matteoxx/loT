import {Navigation} from 'react-native-navigation';

import Connect from './Connect';
import Devices from './Devices';
import NewDevice from './NewDevice';
import PickColor from './PickColor';
import EditDevice from './EditDevice';


export function registerScreens() {
    Navigation.registerComponent(`Connect`, () => Connect);
    Navigation.registerComponent(`Devices`, () => Devices);
    Navigation.registerComponent(`NewDevice`, () => NewDevice);
    Navigation.registerComponent(`PickColor`, () => PickColor);
    Navigation.registerComponent(`EditDevice`, () => EditDevice);

}
