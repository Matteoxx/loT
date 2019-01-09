import React, {Component} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import _ from 'lodash';
import {Navigation} from 'react-native-navigation';
import { ColorPicker } from 'react-native-color-picker'
import SQLite from 'react-native-sqlite-storage';
 
var db = SQLite.openDatabase({name: 'database.db', createFromLocation: '~www/database.db'});

export default class Creatingdevice extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      place: '',
      command: '',
      colorOfTile: this.props.colorOfTile,
    }

  }

  goToScreen = (screenName) => {
    Navigation.push(this.props.componentId, {
      component: {
        name: screenName,
        options: {
          topBar: {
            title: {
              text: screenName
            }
          }
        }
      }
    })
  }


  addDeviceToDatabase(name, place, command, colorOfTile){

    if(this.state.name === '' ||
      this.state.place === '' ||
      this.state.command === '' 
    ){

      alert("Uzupełnij wszystkie pola!")
      
    } else {

      db.transaction((tx) => {

        let query = `INSERT INTO devices (name, place, command, colorOfTile) 
                  VALUES ('${name}','${place}','${command}','${colorOfTile}'`;
        
        query = query + ")"  

        db.executeSql(query);

      });

      this.goToScreen('Devices')

    }
  }

  closeModal(){
    Navigation.dismissModal(this.props.componentId);
  }

  goToModalScreen = (componentName, title) => {
    Navigation.showModal({
      stack: {
        children: [{
          component: {
            name: componentName,
            options: {
              topBar: {
                title: {
                  text: title
                }
              }
            }
          }
        }]
      }
    });
  }

  render() {

    return (
      <LinearGradient colors={['#4c8ce6','#4B7284']} style={styles.linearGradient}>

        <View style={styles.container}>

          <View style={styles.inputs}>

            <TextInput style={styles.textInput} placeholder="Name"
                onChangeText={(text) => {
                  this.setState({
                      name: text  
                  })
                }
                }           
            />

            <TextInput style={styles.textInput} placeholder="Place"
                onChangeText={(text) => {
                  this.setState({
                      place: text  
                  })
                }
                }           
            />

            <TextInput style={styles.textInput} placeholder="Command"
                onChangeText={(text) => {
                  this.setState({
                      command: text  
                  })
                }
                }           
            />  

            {/* <TouchableOpacity style={[{backgroundColor: '#fa8072'}, styles.inputColor ]} 
                              onPress={()=>this.goToModalScreen('Pickingcolor','Color picking')}> */}
                               <TouchableOpacity style={[{backgroundColor: this.state.colorOfTile}, styles.inputColor ]} 
                              onPress={()=>this.goToModalScreen('Pickingcolor','Color picking')}>
              <Text></Text>
            </TouchableOpacity>


          </View>

          <View style={styles.menu}>

            <TouchableOpacity style={styles.btn} onPress={()=> this.closeModal()}>
              <Text style={styles.btnTxt}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btn} 
                              onPress={()=> this.addDeviceToDatabase(this.state.name, this.state.place, this.state.command, this.state.colorOfTile)} >
              <Text style={styles.btnTxt}>Save</Text>
            </TouchableOpacity>
          </View>

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
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  inputs: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    padding: 10,
    marginTop: '10%',
    width: '75%',
    borderWidth: 1,
    fontSize: 18,
    textAlign: 'left',
    borderRadius: 5
  },
  inputColor: {
    padding: 10,
    marginTop: '10%',
    width: '75%',
    height: '25%',
    borderWidth: 1,
    fontSize: 18,
    textAlign: 'left',
    borderRadius: 5
  },
  btn: {
    borderWidth: 1,
    width: '35%',
    padding: 5,
    marginTop: '5%',
    borderRadius: 5
  },
  btnTxt: {
    fontSize: 20,
    textAlign: 'center'
  },
  menu: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-around'
  },

});
