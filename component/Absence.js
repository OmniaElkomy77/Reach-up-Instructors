import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  Image,
  StyleSheet,
  Dimensions,
  Modal,
  TouchableWithoutFeedback,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Checkbox } from 'react-native-paper';
import { ScrollView } from 'react-navigation';
import Constants from '../constants/Constants';
import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';
const { width, height } = Dimensions.get('window');
export default class Student_list extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      group_id: this.props.navigation.getParam('group_id'),
      teacher_id: this.props.navigation.getParam('teacher_id'),
      data: [],
      modalVisible: false,
      text_wrong: '',
      connection_Status: '',
      loading: true,
      day_to_edit: this.props.navigation.getParam("day_to_edit")
    };
  }

  componentDidMount() {
    // alert(JSON.stringify( this.state.day_to_edit))
    const unsubscripe = NetInfo.addEventListener(state => {
      // console.log(state.isConnected)
      this.setState({
        connection_Status: state.isConnected ? 'Online' : 'Offline',
      });
      if (!state.isConnected) {
      }

      this.student_data();
    });
    return unsubscripe;
  }

  student_data() {
    let DataToSend = {
      collection_id: this.state.group_id,
      day_to_edit: this.state.day_to_edit
    };
    axios
      .post(Constants.Domain + 'new_way/select_group_students.php', DataToSend)
      .then(res => {
        if (res.status == 200) {
          if (Array.isArray(res.data)) {
            this.setState({ data: res.data, loading: false });
          } else {
            ToastAndroid.showWithGravityAndOffset(
              'Something Error',
              ToastAndroid.SHORT,
              ToastAndroid.BOTTOM,
              20,
              20,
            );
            this.setState({ loading: false });
          }
        }
      });
  }

  pass_fun() {
    let DataToSend = {
      collection_id: this.state.group_id,
      day_to_edit: this.state.day_to_edit
    };

    axios
      .post(Constants.Domain + 'new_way/select_group_students.php', DataToSend)
      .then(res => {
        if (res.status == 200) {
          // alert(JSON.stringify(res.data))
          if (Array.isArray(res.data)) {
            this.setState({ data: res.data });
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

  design() {
    let data = this.state.data;
    for (let i = 0; i < data.length; i++) {
      if (data[i].student_attendance == 'yes') {
        return true;
      } else {
        // return false
      }
    }
  }

  render() {
    return (
      <>
        {this.state.connection_Status == 'Online' ? (
          <>
            {this.state.loading == true ? (
              <View
                style={{
                  flex: 1,
                  height: height,
                  width: width,
                  backgroundColor: '#fff',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <ActivityIndicator color="#3c2365"></ActivityIndicator>
              </View>
            ) : this.design() == true ? (
              <>
                <ScrollView>
                  <View>
                    {this.state.data.map((item, index) => (
                      <>
                        {item.student_attendance == 'yes' ? (
                          <TouchableOpacity
                            onPress={() => {
                              this.props.navigation.navigate(
                                'Assess',
                                this.student_report == ''
                                  ? {
                                    student_report: {
                                      qs_1_grammer: '',
                                      qs_2_dictation: '',
                                      qs_3_homework: '',
                                      note: '',
                                      h_w: '',
                                      r_sh: '',
                                      dic: '',
                                      bo: '',
                                      participate: '',
                                      points: '',
                                      unit: '',
                                    },
                                    student_id: item.student_id,
                                    teacher_id: this.state.teacher_id,
                                    day_to_edit: this.state.day_to_edit,
                                    refirsh: this.pass_fun.bind(this),
                                  }
                                  : {
                                    student_report: item.student_report,
                                    student_id: item.student_id,
                                    teacher_id: this.state.teacher_id,
                                    day_to_edit: this.state.day_to_edit,
                                    refirsh: this.pass_fun.bind(this),
                                  },
                              );
                            }}
                            style={styles.StudentView}>
                            <View
                              style={{
                                alignItems: 'center',
                                flexDirection: 'row',
                              }}>
                              <Image
                                style={{
                                  width: 100,
                                  height: 100,
                                }}
                                source={require('../photo/students_Vector.png')}
                              />
                              <View
                                style={{
                                  flex: 1,
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                }}>
                                <Text
                                  style={{
                                    textAlign: 'center',
                                    alignSelf: 'center',
                                    fontSize: 18,
                                    fontWeight: '600',

                                    color: '#000',
                                  }}>
                                  {item.student_name}
                                </Text>
                                {item.student_report != '' ? (
                                  <Icon
                                    name="check-circle"
                                    style={{
                                      fontSize: 20,
                                      fontWeight: '500',
                                      color: '#357606',
                                    }}
                                  />
                                ) : null}
                              </View>
                            </View>
                          </TouchableOpacity>
                        ) : null}
                      </>
                    ))}
                  </View>
                </ScrollView>
              </>
            ) : (
              <>
                <View
                  style={{
                    height: height,
                    width: width,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={{ color: '#999', fontSize: 20 }}>
                    Absence Must be set First{' '}
                  </Text>
                </View>
              </>
            )}
          </>
        ) : (
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
        )}
      </>
    );
  }
}

const styles = StyleSheet.create({
  StudentView: {
    marginVertical: 10,
    width: '90%',
    alignSelf: 'center',
    backgroundColor: 'white',
    borderTopEndRadius: 20,
    borderBottomLeftRadius: 20,
    // marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    padding: 10,
  },
});
