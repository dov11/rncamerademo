// @flow
import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import { RNCamera } from 'react-native-camera';
import Svg, { Rect, G, Text as SVGText } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

type Props = {};

type State = {
  isFrontFacing: boolean,
  canDetectText: boolean,
  canDetectFaces: boolean,
};

export default class App extends Component<Props, State> {
  state = {
    isFrontFacing: true,
    canDetectText: false,
    canDetectFaces: false,
    textBlocks: [],
  };

  facesDetected = face => {
    console.log(face);
  };

  textRecognized = object => {
    const { textBlocks } = object;
    this.setState({ textBlocks });
  };

  toggle = value => () => this.setState(prevState => ({ [value]: !prevState[value] }));

  setRef = ref => () => (this.camera = ref);

  renderBlock = textBlock => (
    <G key={textBlock.value + textBlock.bounds.origin.x}>
      <Rect
        x={textBlock.bounds.origin.x}
        y={textBlock.bounds.origin.y}
        width={textBlock.bounds.size.width}
        height={textBlock.bounds.size.height}
        fill="rgba(0,0,0,0)"
        strokeWidth="1"
        stroke="rgb(255,0,0)"
      />
      <SVGText fill="red" x={textBlock.bounds.origin.x} y={textBlock.bounds.origin.y}>
        {textBlock.value}
      </SVGText>
    </G>
  );

  render() {
    const { isFrontFacing, canDetectFaces, canDetectText, textBlocks = [] } = this.state;
    return (
      <View style={styles.container}>
        <RNCamera
          ref={this.setRef}
          style={{ flex: 1, width, justifyContent: 'flex-end' }}
          type={isFrontFacing ? RNCamera.Constants.Type.front : RNCamera.Constants.Type.back}
          // faceDetectionLandmarks={RNCamera.Constants.FaceDetection.Landmarks.all}
          onFacesDetected={canDetectFaces ? this.facesDetected : null}
          onTextRecognized={canDetectText ? this.textRecognized : null}
        >
          <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
            <TouchableOpacity onPress={this.toggle('isFrontFacing')} style={styles.capture}>
              <Text style={{ fontSize: 14 }}> Flip Camera </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.toggle('canDetectFaces')} style={styles.capture}>
              <Text style={{ fontSize: 14 }}>
                {!canDetectFaces ? 'Detect Faces' : 'Detecting Faces'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.toggle('canDetectText')} style={styles.capture}>
              <Text style={{ fontSize: 14 }}>
                {!canDetectText ? 'Detect Text' : 'Detecting Text'}
              </Text>
            </TouchableOpacity>
          </View>
        </RNCamera>
        <Svg style={{ position: 'absolute', height: height - 40, width, top: 0, left: 0 }}>
          {textBlocks.map(block => this.renderBlock(block))}
        </Svg>
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
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    alignSelf: 'center',
  },
});
