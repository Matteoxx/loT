import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { BleManager, Characteristic } from 'react-native-ble-plx';
import LinearGradient from 'react-native-linear-gradient';



export default class Connect extends Component{

  constructor(props) {
    super(props);
    this.manager = new BleManager();
    this.state = {
      value: 'green'
    }
  }

  componentWillMount(){
    const subscription = this.manager.onStateChange( (state)=>{
      if (state === 'PoweredOn'){
        this.scanAndConnect();
        subscription.remove();
      }
    }, true)
  }

  changeState(command) {

    const device = {
      id: 'A8:1B:6A:75:96:65',
      serviceUUID: 'FFE0',
      characteristicUUID: 'FFE1'
    }

    return this.manager.writeCharacteristicWithResponseForDevice(
      device.id, device.serviceUUID, device.characteristicUUID, btoa(command)

    ).then(response => {
      console.log(response)
    })
  }

  scanAndConnect() {
    this.manager.startDeviceScan(null, null, (error, device) => {
        if (error) {
            // Handle error (scanning will be stopped automatically)
            console.log(error)
            return
        }
        console.log(device)
        //Check if it is a device you are looking for based on advertisement data
        //or other criteria.
        if (device.name === 'MLT-BT05') {
            
            //Stop scanning as it's not necessary if you are scanning for one device.
            this.manager.stopDeviceScan();

            return device.connect()
            .then((device) => {
              return device.discoverAllServicesAndCharacteristics();
            }).then((characteristic) => {

            }).catch((error)=>{
              console.log(error);
            })

            //Proceed with connection.
        }
    });
}



  render() {
    return (
      <LinearGradient colors={['#A6fcd2','#Afd5f6']} style={styles.linearGradient}>

      <View style={styles.container}>
   
        <TouchableOpacity style={styles.btn} 
          onPress={() => this.changeState('red')}>
          <Text style={styles.btnTxt}>red</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} 
          onPress={() => this.changeState('green')}>
          <Text style={styles.btnTxt}>green</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} 
          onPress={() => this.changeState('blue')}>
          <Text style={styles.btnTxt}>blue</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} 
          onPress={() => this.changeState('off')}>
          <Text style={styles.btnTxt}>off</Text>
        </TouchableOpacity>
      </View>
      </LinearGradient>
    );
  }

}

const styles = StyleSheet.create({
    linearGradient: {
        flex: 1,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btn: {
        borderWidth: 1,
        width: '35%',
        padding: 5,
        marginTop: '5%',
        marginLeft: '1%',
        marginRight: '1%',
        borderRadius: 5
    },
    btnTxt: {
        fontSize: 20,
        textAlign: 'center'
    },
});
