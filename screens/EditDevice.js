import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, TextInput} from 'react-native';
import _ from 'lodash';
import {Navigation} from 'react-native-navigation';
import LinearGradient from 'react-native-linear-gradient';
import SQLite from 'react-native-sqlite-storage';

export default class EditDevice extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: this.props.deviceInfo.name,
      place: this.props.deviceInfo.place,
      command: this.props.deviceInfo.command,
      colorOfTile: this.props.colorOfTile,
      // deviceInfo: this.props.deviceInfo
    }

  }

  _updateDevice(){

  }

  _deleteDevice(){

  }

  closeModal(){
    Navigation.dismissModal(this.props.componentId);
  }

  goToColorPicking = (componentName, title) => {
    Navigation.showModal({
      stack: {
        children: [{
          component: {
            name: componentName,
            passProps: {
              name: this.state.name,
              place: this.state.place,
              command: this.state.command
            },
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
                            onPress={()=>this.goToColorPicking('Pickingcolor','Color picking')}>
            <Text></Text>
          </TouchableOpacity>
          
          
          <TouchableOpacity style={styles.btn} onPress={()=> this.closeModal()}>
            <Text style={styles.btnTxt}>Cancel</Text>
          </TouchableOpacity>
          
          <View 
          style={styles.menu}
            >
      
            <TouchableOpacity style={styles.btn} 
              onPress={() => this._updateDevice()}
              >
              <Text style={styles.btnTxt}>Update tile</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btn} onPress={()=> this._deleteDevice()}>

              <Text style={styles.btnTxt}>Delete tile</Text>

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
