import React, {Component} from 'react';
import {StyleSheet, Text, View, AsyncStorage, TouchableOpacity} from 'react-native';
import { BleManager } from 'react-native-ble-plx';
import { Navigation } from 'react-native-navigation';
 
export default class Connect extends Component {
 
    constructor(props) {
        super(props);
        this.manager = new BleManager();
    }
 
    checkBluetoothState() {
        const subscription = this.manager.onStateChange((state) => {
            if (state === 'PoweredOn') {
                this.scanAndConnect();
                subscription.remove();
            }
 
        }, true)
    }
 
    sendAndConnect() {
        this.manager.startDeviceScan(null, null, (error, device) => {
            if (error) {
                console.log(error);
                return null;
            }
 
            if(device.name === 'MLT-BT05'){
                this.manager.stopDeviceScan();
                return device.connect()
                    .then((device) => {
                        return device.discoverAllServicesAndCharacteristics();
                    }).then((characteristic) =>{
                        const device = {
                            id: characteristic.id,
                            service: 'FFE0',
                            char: 'FFE1',
 
                        };
                        return this.manager.writeCharacteristicWithResponseForDevice(device.id, device.service, device.char, btoa('green'))
                            .then(response => {
                                console.log(response);
                        })
                    }).catch((error) => {
                        console.log('Error', error);
                    });
 
 
            }
            console.log(device)
            // return AsyncStorage.setItem('device', JSON.stringify(device)).then(()=> {
            //   Navigation.mergeOptions('DEV', {
            //     bottomTab: {
            //       badge: '+'
            //     },
            //     bottomTabs: {
            //       currentTabId: 'DEV'
            //     }
            //   });
            // });
        });
    }
 
    render() {
        return (
            <View style={styles.container}>
                  <TouchableOpacity onPress={() => this.sendAndConnect()}>
                      <Text style={styles.default}>Connect screen!</Text>
                  </TouchableOpacity>
 
            </View>
        );
    }
 
}
 
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    default: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    }
});