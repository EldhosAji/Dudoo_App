/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableHighlight,
  ScrollView,
} from 'react-native';
import Voice from 'react-native-voice';
import Button from './component/Button';
import Tts from 'react-native-tts';
class App extends Component {
  state = {
    error: '',
    started: '',
    results: '',
    resp: '',
    rep: false,
  };

  constructor(props) {
    super(props);
    //Setting callbacks for the process status
    Voice.onSpeechStart = this.onSpeechStart;
    Voice.onSpeechError = this.onSpeechError;
    Voice.onSpeechResults = this.onSpeechResults;
  }

  _talkAi = async (res) => {
    Tts.setDefaultPitch(1);
    Tts.setDefaultRate(0.5);
    Tts.speak(res, {
      androidParams: {
        KEY_PARAM_PAN: -1,
        KEY_PARAM_VOLUME: 1,
        KEY_PARAM_STREAM: 'STREAM_MUSIC',
      },
    });

    await Tts.addEventListener('tts-finish', (event) =>
      this.setState({results: '', resp: ''}),
    );
    await Tts.addEventListener('tts-cancel', (event) =>
      this.setState({results: '', resp: ''}),
    );
  };

  _getAiResponse = async (q) => {
    console.log(q);
    let qu = q.toString().replace(' ', '+');
    let json = '';
    try {
      let response = await fetch('http://192.168.42.75:8000/ai/?q=' + qu);
      json = await response.json();
    } catch (error) {
      console.error(error);
    }
    this.setState({resp: json});
    this._talkAi(json);
  };

  componentWillUnmount() {
    //destroy the process after switching the screen
    Voice.destroy().then(Voice.removeAllListeners);
  }

  onSpeechStart = (e) => {
    //Invoked when .start() is called without error
    console.log('onSpeechStart: ', e);
    this.setState({
      results: 'Listening...',
    });
  };

  onSpeechError = (e) => {
    //Invoked when an error occurs.
    console.log('onSpeechError: ', e);
    this.setState({
      error: JSON.stringify(e),
    });
    this.setState({
      results: 'My apologies, I am not available now',
    });
  };

  onSpeechResults = (e) => {
    //Invoked when SpeechRecognizer is finished recognizing
    console.log('onSpeechResults: 1', e);
    this.setState({
      results: e.value[0],
    });
    this.state.rep ? this._getAiResponse(e.value[0]) : '';
    this.setState({rep: !this.state.rep});
  };

  _startRecognizing = async () => {
    Tts.stop();
    this.setState({
      error: '',
      started: '',
      results: [],
      end: '',
    });

    try {
      await Voice.start('en-US');
      this.setState({rep: !this.state.rep});
    } catch (e) {
      console.error(e);
    }
  };

  render() {
    const color = !this.state.results
      ? 'rgba(255,223,0,0.9)'
      : 'rgba(0,223,0,0.9)';
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
          <Text style={styles.stat}>
            {this.state.results
              ? this.state.results
              : 'Tap mic to ask questions'}
          </Text>
          <ScrollView>
            <Text style={styles.res}>{this.state.resp}</Text>
          </ScrollView>
          <View style={{position: 'absolute', bottom: 0}}>
            <View
              style={{
                width: 200,
                height: 200,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                bottom: 0,
              }}>
              <Button color={color} />
              <TouchableHighlight
                onPress={this._startRecognizing}
                underlayColor={color}
                style={[
                  styles.btn,
                  {
                    borderColor: color,
                    backgroundColor: color,
                  },
                ]}>
                <Image
                  style={styles.button}
                  source={require('./assets/png/2x/outline_mic_none_black_24dp.png')}
                />
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </SafeAreaView>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 40,
    height: 40,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  stat: {
    textAlign: 'center',
    color: '#222222',
    fontSize: 22,
    marginBottom: 1,
    marginTop: 30,
  },
  res: {
    textAlign: 'center',
    color: '#222222',
    fontSize: 16,
    marginBottom: 1,
    marginTop: 30,
    margin: 10,
  },
});
export default App;
