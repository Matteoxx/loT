import React, {Component} from 'react';
import {AsyncStorage, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { Navigation} from 'react-native-navigation';
import LinearGradient from 'react-native-linear-gradient';
import _ from 'lodash';
import SQLite from 'react-native-sqlite-storage'
 
var db = SQLite.openDatabase({name: 'md.db', createFromLocation: '~www/md.db'});

export default class Creatingdevice extends Component {
  
  constructor() {
    super();

    this.state = {
    
    }

  }

  render() {

    return (
      <LinearGradient colors={['#4c8ce6','#4B7284']} style={styles.linearGradient}>

        <View style={styles.container}>
          <Text style={styles.title}>Device </Text>

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
  }

});
