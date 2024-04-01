import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ActivityIndicator,
  StatusBar,
  Dimensions,
  ScrollView,
  Modal,
  AsyncStorage,
  ToastAndroid,
} from 'react-native';
const { width, height } = Dimensions.get('window');
import Constants from '../constants/Constants';
import NetInfo from '@react-native-community/netinfo';
import axios from 'axios';
import { RadioButton } from 'react-native-paper';
export default class Assess extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collection_id: '',
      teacher_id: '',
      question1: '',
      question2: '',
      question3: '',

      text_wrong: '',
      connection_Status: '',
    };
  }

  componentDidMount() {
    let report = this.props.navigation.getParam('report');
    this.state.question1 = report.qs_1_grammer;
    this.state.question2 = report.qs_2_dictation;
    this.state.question3 = report.qs_3_homework;

    const unsubscripe = NetInfo.addEventListener(state => {
      this.setState({
        connection_Status: state.isConnected ? 'Online' : 'Offline',
      });
      if (!state.isConnected) {
      }
    });
    return unsubscripe;
  }

  sumbit_Assess() {
    if (
      this.state.question1 == '' ||
      this.state.question2 == '' ||
      this.state.question3 == ''
    ) {
      ToastAndroid.showWithGravityAndOffset(
        'You must Fill in All The Questions',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        20,
        20,
      );
    } else {
      let DataToSend = {
        qs_1_grammer: this.state.question1,
        qs_2_dictation: this.state.question2,
        qs_3_homework: this.state.question3,
        teacher_id: this.props.navigation.getParam('teacher_id'),
        collection_id: this.props.navigation.getParam('group_id'),
      };
      axios
        .post(Constants.Domain + 'save_collection_report.php', DataToSend)
        .then(res => {
          if (res.status == 200) {
            // alert(res.data)
            if (res.data == 'success') {
              ToastAndroid.showWithGravityAndOffset(
                'The Group Has Been Evaluated',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                20,
                20,
              );
            } else {
              ToastAndroid.showWithGravityAndOffset(
                'Something Error',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                20,
                20,
              );
            }
          }
        });
    }
  }

  render() {
    return (
      <View style={{ backgroundColor: '#eee', flex: 1 }}>
        <ScrollView>
          <StatusBar
            backgroundColor="#3c2365"
            barStyle="light-content"></StatusBar>
          <View
            style={{
              height: 100,
              backgroundColor: '#3c2365',
              alignItems: 'center',
              justifyContent: 'center',
              paddingTop: 10
            }}>
            <Text style={{ color: '#fff', fontSize: 20, fontWeight: '700' }}>
              Group Rating
            </Text>
          </View>

          {this.state.connection_Status == 'Offline' ? (
            <View
              style={{
                height: height,
                backgroundColor: '#fff',
                alignItems: 'center',
                justifyContent: 'center',
                width: width,
              }}>
              <Text style={{ color: '#777' }}>No Internet Connection</Text>
            </View>
          ) : (
            <>
              <View
                style={{
                  backgroundColor: '#eee',
                }}>
                <View
                  style={{
                    backgroundColor: '#eee',
                    padding: 15,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderStyle: 'dashed',
                    borderBottomWidth: 1,
                  }}>
                  <Text
                    style={{ color: '#000', fontSize: 15, marginVertical: 10 }}>
                    Grammer is needed to classified once again ?
                  </Text>
                  <TextInput
                    style={{
                      // height: 50,
                      backgroundColor: '#fff',
                      width: '95%',
                      alignSelf: 'center',
                      borderRadius: 10,
                      color: '#000',

                      padding: 10,
                    }}
                    placeholder="Enter Your Answer"
                    multiline={true}
                    placeholderTextColor={'#999'}
                    value={this.state.question1}
                    onChangeText={value => {
                      this.setState({ question1: value });
                    }}></TextInput>
                </View>

                <View
                  style={{
                    backgroundColor: '#eee',
                    padding: 15,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderStyle: 'dashed',
                    borderBottomWidth: 1,
                  }}>
                  <Text
                    style={{ color: '#000', fontSize: 15, marginVertical: 10 }}>
                    students dictation comments ?
                  </Text>
                  <TextInput
                    style={{
                      backgroundColor: '#fff',
                      width: '95%',
                      alignSelf: 'center',
                      borderRadius: 10,
                      color: '#000',
                      padding: 10,
                    }}
                    multiline={true}
                    placeholder="Enter Your Answer"
                    placeholderTextColor={'#999'}
                    value={this.state.question2}
                    onChangeText={value => {
                      this.setState({ question2: value });
                    }}></TextInput>
                </View>

                <View
                  style={{
                    backgroundColor: '#eee',
                    padding: 15,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderStyle: 'dashed',
                    borderBottomWidth: 1,
                  }}>
                  <Text
                    style={{ color: '#000', fontSize: 15, marginVertical: 10 }}>
                    students homework comment ?
                  </Text>
                  <TextInput
                    style={{
                      // height: 50,
                      backgroundColor: '#fff',
                      width: '95%',
                      alignSelf: 'center',
                      borderRadius: 10,
                      color: '#000',
                      padding: 10,
                    }}
                    placeholder="Enter Your Answer"
                    multiline={true}
                    placeholderTextColor={'#999'}
                    value={this.state.question3}
                    onChangeText={value => {
                      this.setState({ question3: value });
                    }}></TextInput>
                </View>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-around',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    this.sumbit_Assess();
                  }}
                  style={{
                    backgroundColor: '#3c2365',
                    height: 70,
                    width: 140,
                    alignSelf: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 20,
                    marginVertical: 20,
                  }}>
                  <Text style={{ color: '#fff', fontSize: 18 }}>sumbit</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </ScrollView>
      </View>
    );
  }
}
