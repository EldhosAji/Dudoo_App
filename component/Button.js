import React, {Component} from 'react';
import {Text, Animated, View, StyleSheet} from 'react-native';

export default class Button extends Component {
  state = {
    animated: new Animated.Value(0),
    opacity: new Animated.Value(1),
    animatedA: new Animated.Value(0),
    opacityA: new Animated.Value(1),
    animatedB: new Animated.Value(0),
    opacityB: new Animated.Value(1),
  };

  componentDidMount() {
    const {
      animated,
      opacity,
      animatedA,
      opacityA,
      animatedB,
      opacityB,
    } = this.state;

    Animated.stagger(100, [
      Animated.loop(
        Animated.parallel([
          Animated.timing(opacity, {
            toValue: 0,
            duration: 1500,
            useNativeDriver: false,
          }),
          Animated.timing(animated, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: false,
          }),
        ]),
      ),
      Animated.loop(
        Animated.parallel([
          Animated.timing(opacityA, {
            toValue: 0,
            duration: 1500,
            useNativeDriver: false,
          }),
          Animated.timing(animatedA, {
            toValue: 2,
            duration: 1500,
            useNativeDriver: false,
          }),
        ]),
      ),
      Animated.loop(
        Animated.parallel([
          Animated.timing(opacityB, {
            toValue: 0,
            duration: 1500,
            useNativeDriver: false,
          }),
          Animated.timing(animatedB, {
            toValue: 2,
            duration: 1500,
            useNativeDriver: false,
          }),
        ]),
      ),
    ]).start();
  }

  render() {
    return (
      <Animated.View
        style={{
          width: 200,
          height: 200,
          borderRadius: 100,
          backgroundColor: 'rgba(255,223,0,0.5)',
          opacity: this.state.opacity,
          transform: [{scale: this.state.animated}],
        }}>
        <Animated.View
          style={{
            width: 200,
            height: 200,
            borderRadius: 100,
            backgroundColor: 'rgba(255,223,0,0.5)',
            opacity: this.state.opacityA,
            transform: [{scale: this.state.animatedA}],
          }}>
          <Animated.View
            style={{
              width: 200,
              height: 200,
              borderRadius: 100,
              backgroundColor: 'rgb(255,223,0)',
              opacity: this.state.opacityB,
              transform: [{scale: this.state.animatedB}],
            }}></Animated.View>
        </Animated.View>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  circle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    position: 'absolute',
  },
  btn: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 50,
    borderWidth: 10,
    borderColor: 'rgba(255,223,0,0.9)',
    backgroundColor: 'rgba(255,223,0,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 50,
    height: 50,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  action: {
    width: '100%',
    textAlign: 'center',
    color: 'white',
    paddingVertical: 8,
    marginVertical: 5,
    fontWeight: 'bold',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  stat: {
    textAlign: 'center',
    color: '#B0171F',
    marginBottom: 1,
    marginTop: 30,
  },
});
