import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, TextInput} from 'react-native';
import _ from 'lodash';
import {Navigation} from 'react-native-navigation';
import LinearGradient from 'react-native-linear-gradient';
import SQLite from 'react-native-sqlite-storage';

var db = SQLite.openDatabase({name: 'database.db', createFromLocation: '~www/database.db'});

export default class EditDevice extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: this.props.deviceName,
      place: this.props.devicePlace,
      command: this.props.deviceCommand,
      colorOfTile: this.props.deviceColorOfTile
    }

  }

  componentDidMount(){
    if( (this.props.colorOfTile!=this.props.deviceColorOfTile) && this.props.colorOfTile != undefined){
      this.setState({
        colorOfTile: this.props.colorOfTile,
        name: this.props.name,
        place: this.props.place,
        command: this.props.command
      })
    } 
  
  }

  _updateDevice(){
    let query = `UPDATE devices SET name = '${this.state.name}', place = '${this.state.place}', command = '${this.state.command}', colorOfTile = '${this.state.colorOfTile}'
                  WHERE name = '${this.props.deviceToChange}'`;
    db.executeSql(query);
    this.closeModal();
  }

  _deleteDevice(){

    let query = `DELETE FROM devices WHERE name = '${this.props.deviceToChange}'`;
    db.executeSql(query);
    this.closeModal();

  }

  closeModal(){
    Navigation.dismissAllModals();
  }

  goToColorPicking = () => {
    Navigation.showModal({
      stack: {
        children: [{
          component: {
            name: 'PickColor',
            passProps: {
              componentName: 'EditDevice',
              componentTitle: 'Edit device',
              name: this.state.name,
              place: this.state.place,
              command: this.state.command
            },
            options: {
              topBar: {
                title: {
                  text: 'Pick color'
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
      <LinearGradient colors={['#A6fcd2','#Afd5f6']} style={styles.linearGradient}>

        <View style={styles.container}>

          <TextInput style={styles.textInput} placeholder="Name"
              onChangeText={(text) => {
                this.setState({
                    name: text
                })
              }}
              value={this.state.name}
          />

          <TextInput style={styles.textInput} placeholder="Place"
              onChangeText={(text) => {
                this.setState({
                    place: text
                })
              }
              }
              value={this.state.place}
          />

          <TextInput style={styles.textInput} placeholder="Command"
              onChangeText={(text) => {
                this.setState({
                    command: text
                })
              }
              }
              value={this.state.command}
          />

          <TouchableOpacity style={[{backgroundColor: this.state.colorOfTile}, styles.inputColor ]}
                            onPress={()=>this.goToColorPicking()}>
            <Text></Text>
          </TouchableOpacity>


          <TouchableOpacity style={styles.btn} onPress={()=> this.closeModal()}>
            <Text style={styles.btnTxt}>Cancel</Text>
          </TouchableOpacity>

          <View
          style={styles.menu}
            >

            <TouchableOpacity style={styles.btn} onPress={()=> this._deleteDevice()}>

              <Text style={styles.btnTxt}>Delete device</Text>

            </TouchableOpacity>

            <TouchableOpacity style={styles.btn}
              onPress={() => this._updateDevice()}
              >
              <Text style={styles.btnTxt}>Update device</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    padding: 10,
    marginTop: '5%',
    width: '75%',
    borderWidth: 1,
    fontSize: 18,
    textAlign: 'left',
    borderRadius: 5
  },
  inputColor: {
    padding: 10,
    marginTop: '5%',
    width: '75%',
    height: '25%',
    borderWidth: 1,
    fontSize: 18,
    textAlign: 'left',
    borderRadius: 5
  },
  btn: {
    borderWidth: 1,
    width: '45%',
    padding: '2%',
    marginTop: '5%',
    marginLeft: '1%',
    marginRight: '1%',
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
  },
});