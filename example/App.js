/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Fragment } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Slider,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import Brightness from 'react-native-brightness';

const ValueView = (props) => {
  const { title, value, changeVal, refFunc, btn } = props
  return (
      <View style={styles.card}>
          <View style={styles.row}>
              <Text style={styles.title}>{title}</Text>
              {btn && <TouchableOpacity onPress={btn.onPress}>
                  <Text style={styles.btn}>{btn.title}</Text>
              </TouchableOpacity>}
              <Text style={styles.value}>{value}</Text>
          </View>
          <Slider
              ref={refFunc}
              style={styles.slider}
              value={value}
              onValueChange={changeVal} />
      </View>
  );
}

class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      brightness: 0,
    };
    this.sliderBri = undefined;
  }

  componentDidMount() {
    console.log('Brightness', Brightness);
    Brightness.getBrightness().then(level => {
      console.log('getBrightness level', level);
      this.setState({ brightness: level });
    });
    Brightness.hasPermission().then((hasPermission) => {
      console.log('hasPermission', hasPermission);
      if (!hasPermission) {
        Brightness.requestPermission();
      }
    });
  }

  _changeBrightness = async (value) => {
    const result = await Brightness.setBrightness(value);
    this.setState({
        brightness: value,
    })
  }

  render() {
    const { brightness } = this.state;
    return (
      <Fragment>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <View style={styles.body}>
              <View style={styles.sectionContainer}>
                <ValueView
                    title='Brightness'
                    value={brightness}
                    changeVal={(val) => this._changeBrightness(val)}
                    refFunc={(sliderBri) => this.sliderBri = sliderBri}
                />
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },

  card: {
    padding: 8,
    backgroundColor: '#fff',
    marginVertical: 4
  },
  row: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 8
  },
  title: {
      fontSize: 16,
      color: '#6F6F6F'
  },
  value: {
      fontSize: 14,
      flex: 1,
      textAlign: 'right',
      color: '#904ED9'
  },
  split: {
      marginVertical: 16,
      height: 1,
      backgroundColor: '#ccc',
  },
  btn: {
      fontSize: 16,
      padding: 8,
      paddingVertical: 8,
      color: '#405EFF'
  }
});

export default App;
