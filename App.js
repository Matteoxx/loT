import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, ScrollView} from 'react-native';
import {Navigation} from 'react-native-navigation';
import SplashScreen from 'react-native-splash-screen';
import LinearGradient from 'react-native-linear-gradient';
import _ from 'lodash';
import SQLite from 'react-native-sqlite-storage';
 
var db = SQLite.openDatabase({name: 'database.db', createFromLocation: '~www/database.db'});

export default class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      devices: []
    }

  }
  _selectData(){
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM devices',[], (tx, results) => {
          var len = results.rows.length;
          // if(len > 0) {
              // exists owner name John
              var row = results.rows.item(3);
              console.log(row)
              // this.setState({name: row.name});
          // }
      });
  });
  }


  _downloadDataFromDatabase() {
    db.transaction((tx) => {
        tx.executeSql('SELECT * FROM devices;', [], (tx, results) => {
            var devices = [];
            for (let i = 0; i < results.rows.length; i++) {
                devices[i] = results.rows.item(i);
            }
            this.setState({devices: devices});

        });
    });
  };

  async componentDidMount() {

    SplashScreen.hide();
    this._selectData();
    this._downloadDataFromDatabase();

  }

  goToScreenModal = () => {
    Navigation.showModal({
      stack: {
        children: [{
          component: {
            name: 'Creatingdevice',
            passProps: {
              componentId: 'Creatingdevice'
            },
            options: {
              topBar: {
                title: {
                  text: 'New device'
                }
              }
            }
          }
        }]
      }
    });
  }

  

  
  render() {


    let rows = [];

    for(let i=0; i < this.state.devices.length; i++) {
      rows.push(
        // <View key={i} >
         

          <TouchableOpacity style={[styles.tile, {backgroundColor: this.state.devices[i].colorOfTile}]} key={i}>

            <Text style={styles.tileTextName}>{this.state.devices[i].name}</Text>
            <Text style={styles.tileTextPlace}>{this.state.devices[i].place}</Text>

          </TouchableOpacity>
        // </View> 
      )
    }

  

    return (

      <LinearGradient colors={['#A6fcd2','#Afd5f6']} style={styles.linearGradient}>

        

          <View style={styles.container}>
             
            {rows}
                  
            <TouchableOpacity style={styles.tile} onPress={() => this.goToScreenModal()}>

              <Text style={styles.tileTextPlus}>+</Text>

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
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  tile: {
    width: '45%',
    height: '30%',
    marginTop: '5%',
    padding: 15,
    borderWidth: 1,
    borderColor: 'black',
    borderStyle: 'solid',
    justifyContent: 'center'
  },

  tileTextName: {
    fontSize: 28,
    textAlign: 'center'
  },
  tileTextPlace: {
    fontSize: 20,
    textAlign: 'center'
  },
  tileTextPlus: {
    fontSize: 96,
    textAlign: 'center'
  }
});
