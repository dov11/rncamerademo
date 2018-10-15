/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Dimensions, TouchableOpacity} from 'react-native';
import { RNCamera } from 'react-native-camera';

const { width } = Dimensions.get('window');

type Props = {};

type State = {
  isFrontFacing: boolean,
  canDetectText: boolean,
  canDetectFaces: boolean,
}

export default class App extends Component<Props, State> {
  state = {
    isFrontFacing: true,
    canDetectText: false,
    canDetectFaces: false,
  }

  facesDetected = face => {
    console.log(face);
  };

  textRecognized = text => {
    console.log(text);
  };

  toggle = value => this.setState((prevState) => ({[value]: !prevState[value]}));

  render() {
    const { isFrontFacing, canDetectFaces, canDetectText } = this.state;
    return (
      <View style={styles.container}>
        <RNCamera
            ref={ref => {
              this.camera = ref;
            }}
            style={{ flex: 1, width, justifyContent: 'flex-end', }}
            type={isFrontFacing ? RNCamera.Constants.Type.front : RNCamera.Constants.Type.back}
            // faceDetectionLandmarks={RNCamera.Constants.FaceDetection.Landmarks.all}
            onFacesDetected={canDetectFaces ? this.facesDetected : null}
            onTextRecognized={canDetectText ? this.textRecognized : null}
        >
        <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity onPress={() => this.toggle('isFrontFacing')} style={styles.capture}>
            <Text style={{ fontSize: 14 }}> Flip Camera </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.toggle('canDetectFaces')} style={styles.capture}>
            <Text style={{ fontSize: 14 }}>{!canDetectFaces ? 'Detect Faces' : 'Detecting Faces'}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.toggle('canDetectText')} style={styles.capture}>
            <Text style={{ fontSize: 14 }}>{!canDetectText ? 'Detect Text' : 'Detecting Text'}</Text>
          </TouchableOpacity>
        </View>
        </RNCamera>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    // paddingHorizontal: 20,
    alignSelf: 'center',
    // margin: 20,
  },
});
