/*Example of react native orientation*/

import React, { Component } from 'react';

import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import Orientation from 'react-native-orientation';


export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentOrientation: '',
      currentSpecificOrientation: '',
    };
  }

  componentDidMount() {
    // The getOrientation method is async. It happens sometimes that
    // you need the orientation at the moment the JS runtime starts running on device.
    // `getInitialOrientation` returns directly because its a constant set at the
    // beginning of the JS runtime.
    const initial = Orientation.getInitialOrientation();
    this.setState({
      currentOrientation: 'Current Device Orientation: ' + initial,
    });

    //Listner for general orientation LANDSCAPE / PORTRAIT
    Orientation.addOrientationListener(this._orientationChange);

    //Listner for more Specific Orientation
    //LANDSCAPE-LEFT / LANDSCAPE-RIGHT / PORTRAIT / PORTRAITUPSIDEDOWN / UNKNOWN
    Orientation.addSpecificOrientationListener(this._specificOrientationChange);
  }

  _orientationChange = orientation => {
    this.setState({
      currentOrientation: 'Current Device Orientation: ' + orientation,
    });
  };

  _specificOrientationChange = specificOrientation => {
    this.setState({
      currentSpecificOrientation:
        'Current Device Specific Orientation: ' + specificOrientation,
    });
  };

  componentWillUnmount() {
    // Remember to remove listener
    Orientation.removeOrientationListener(this._orientationChange);
    Orientation.removeSpecificOrientationListener(
      this._specificOrientationChange
    );
  }

  _getCurrentOrientation() {
    Orientation.getOrientation((err, orientation) => {
      alert('Orientation: ' + orientation);
    });
  }
  _getCurrentSpecificOrientation() {
    Orientation.getSpecificOrientation((err, specificOrientation) => {
      alert('Specific Orientation: ' + specificOrientation);
    });
  }

  render() {
    return (
      <View style={{ flex: 1, marginTop: 30, padding: 20 }}>
        <ScrollView>
          <View style={styles.container}>
            <Text style={styles.textLarge}>
              Example of React Native Orientation
            </Text>
            <Text style={styles.textSmall}>
              {this.state.currentOrientation}
            </Text>
            <Text style={styles.textSmall}>
              {this.state.currentSpecificOrientation}
            </Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this._getCurrentOrientation()}>
              <Text>get Current Orientation</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this._getCurrentSpecificOrientation()}>
              <Text>get Current Specific Orientation</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => Orientation.lockToPortrait()}>
              <Text>Locks the View to Portrait Mode</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => Orientation.lockToLandscape()}>
              <Text>Locks the View to Landscape Mode</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => Orientation.lockToLandscapeLeft()}>
              <Text>Locks the View to Right Landscape Mode</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => Orientation.lockToLandscapeRight()}>
              <Text>Locks the View to Left Landscape Mode</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => Orientation.unlockAllOrientations()}>
              <Text>Unlocks any Previous Locked Orientations</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  textLarge: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },

  textSmall: {
    fontSize: 16,
    textAlign: 'center',
    margin: 10,
  },

  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: 300,
    marginTop: 16,
  },
  
});