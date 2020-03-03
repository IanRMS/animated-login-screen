import React, {Component} from 'react';
import {StyleSheet, View, StatusBar, Dimensions} from 'react-native';
import Animated, {Easing} from 'react-native-reanimated';
import {TapGestureHandler, State} from 'react-native-gesture-handler';

import {
  Background,
  ButtonContainer,
  Container,
  TextButton,
  style,
} from './styles';

const {height} = Dimensions.get('window');

const {
  Value,
  event,
  block,
  cond,
  eq,
  set,
  Clock,
  startClock,
  stopClock,
  debug,
  timing,
  clockRunning,
  interpolate,
  Extrapolate,
} = Animated;

function runTiming(clock, value, dest) {
  const state = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    frameTime: new Value(0),
  };

  const config = {
    duration: 1000,
    toValue: new Value(0),
    easing: Easing.inOut(Easing.ease),
  };

  return block([
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.time, 0),
      set(state.position, value),
      set(state.frameTime, 0),
      set(config.toValue, dest),
      startClock(clock),
    ]),
    timing(clock, state, config),
    cond(state.finished, debug('stop clock', stopClock(clock))),
    state.position,
  ]);
}

class App extends Component {
  constructor() {
    super();
    this.buttonOpacity = new Value(1);
    this.onStateChange = event([
      {
        nativeEvent: state =>
          block([
            cond(
              eq(state, State.END),
              set(this.buttonOpacity, runTiming(new Clock(), 1, 0)),
            ),
          ]),
      },
    ]);

    this.buttonY = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [100, 0],
    });

    this.bgY = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [-height / 3, 0],
      extrapolate: Extrapolate.CLAMP,
    });
  }
  render() {
    return (
      <>
        <StatusBar
          barStyle="light-content"
          translucent={true}
          backgroundColor={'transparent'}
        />
        <Container>
          <Animated.View
            style={{
              ...StyleSheet.absoluteFill,
              transform: [{translateY: this.bgY}],
            }}>
            <Background source={require('./src/assets/background.jpeg')} />
          </Animated.View>
          <ButtonContainer height={height / 3}>
            <TapGestureHandler onHandlerStateChange={this.onStateChange}>
              <Animated.View
                style={[
                  style.button,
                  style.whitebg,
                  {
                    opacity: this.buttonOpacity,
                    transform: [{translateY: this.buttonY}],
                  },
                ]}>
                <TextButton>Sign In</TextButton>
              </Animated.View>
            </TapGestureHandler>
            <Animated.View
              style={[
                style.button,
                style.bluebg,
                {
                  opacity: this.buttonOpacity,
                  transform: [{translateY: this.buttonY}],
                },
              ]}>
              <TextButton color="#fafafa">Sign in with facebook</TextButton>
            </Animated.View>
          </ButtonContainer>
        </Container>
      </>
    );
  }
}
export default App;
