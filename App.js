import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Navigation} from 'react-native-navigation';
import SplashScreen from 'react-native-splash-screen';
import LinearGradient from 'react-native-linear-gradient';
import _ from 'lodash';
import SQLite from 'react-native-sqlite-storage';
 
var db = SQLite.openDatabase({name: 'md.db', createFromLocation: '~www/md.db'});

export default class App extends Component {

  constructor(props){
    super(props);

    this.state = {
    
    }

  }

  async componentDidMount() {

    SplashScreen.hide();

  }

  goToTestScreen = (screenName, testName, testId, numberOfTasks) => {
    Navigation.push(this.props.componentId, {
      component: {
        name: screenName,
        options: {
          topBar: {
            title: {
              text: screenName
            }
          }
        },
        passProps: {
          testToSolveName: testName,
          testToSolveId: testId,
          numberOfTasks: numberOfTasks 
        }
      }
    })
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

  
  render() {

  

    return (

      <LinearGradient colors={['#A6fcd2','#Afd5f6']} style={styles.linearGradient}>

        <View style={styles.container}>
    
         <Text>Start</Text>
          
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
 }
});
