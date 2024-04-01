import axios from 'axios';
import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  Image,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import Constants from '../constants/Constants';
import Icon from 'react-native-vector-icons/FontAwesome5';
import NetInfo from '@react-native-community/netinfo';
const {width, height} = Dimensions.get('window');
export default class Student_list extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      group_id: '',
      data: [],
      submit_button: 0,
      modalVisible: false,
      text_wrong: '',
      connection_Status: '',
      teacher_id: '',
      loading: false,
      day_to_edit:this.props.navigation.getParam("day_to_edit")
    };
  }

  componentDidMount() {
    const unsubscripe = NetInfo.addEventListener(state => {
      this.setState({
        connection_Status: state.isConnected ? 'Online' : 'Offline',
      });
      if (!state.isConnected) {
      } else {
        this.setState({loading: true});

        this.student_data();
        let teacher_id = this.props.navigation.getParam('teacher_id');
        this.setState({teacher_id: teacher_id});
      }
    });
    return unsubscripe;
  }

  student_data() {
    let DataToSend = {
      collection_id: this.props.navigation.getParam('group_id'),
      day_to_edit:this.state.day_to_edit
    };
    // alert(JSON.stringify(DataToSend))
    axios
      .post(Constants.Domain + 'new_way/select_group_students.php', DataToSend)
      .then(res => {
        if (res.status == 200) {
          if (Array.isArray(res.data)) {
            this.setState({
              data: res.data,
              loading: false,
            });
          } else {
            ToastAndroid.showWithGravityAndOffset(
              'Something Error',
              ToastAndroid.SHORT,
              ToastAndroid.BOTTOM,
              20,
              20,
            );
            this.setState({loading: false});
          }
        }
      });
  }

  Submit_Button() {
    let data = this.state.data;
    let str = '';
    for (let i = 0; i < data.length; i++) {
      str += data[i].student_id + '**camp**' + data[i].student_attendance;
      if (i < data.length - 1) {
        str = str + '//camp//';
      }
    }
    let DataToSend = {
      teacher_id: this.state.teacher_id,
      collection_id: this.props.navigation.getParam('group_id'),
      attendance_data: str,
      day_to_edit:this.state.day_to_edit
    };
    axios
      .post(Constants.Domain + 'new_way/save_group_attendance.php', DataToSend)
      .then(res => {
        if (res.status == 200) {
          if (res.data == 'success') {
            ToastAndroid.showWithGravityAndOffset(
              'Absence of Students has been set',
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

  checkbox_fun(index) {
    let arr = this.state.data;
    for (let i = 0; i < arr.length; i++) {
      if (i == index) {
        if (arr[i].student_attendance == 'yes') {
          arr[i].student_attendance = 'No';
        } else {
          arr[i].student_attendance = 'yes';
        }

        break;
      }
    }
    this.setState({data: arr});
  }

  render() {
    return (
      <>
        {this.state.connection_Status == 'Online' ? (
          this.state.loading ? (
            <View
              style={{
                // flex: 1,
                height: height,
                width: width,
                backgroundColor: '#fff',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <ActivityIndicator color="#3c2365"></ActivityIndicator>
            </View>
          ) : this.state.data.length == 0 ? (
            <View
              style={{
                height: height,
                backgroundColor: '#fff',
                alignItems: 'center',
                justifyContent: 'center',
                width: width,
              }}>
              <Text style={{color:"#777"}}>There are No Students Now</Text>
            </View>
          ) : (
            <ScrollView>
              <View>
                {this.state.data.map((item, index) => (
                  <>
                    <View style={styles.StudentView}>
                      <View
                        style={{
                          alignItems: 'flex-start',
                          flexDirection: 'row',
                          // marginBottom: 10,
                        }}>
                        <Image
                          style={{
                            width: 100,
                            height: 100,
                            // marginLeft: 20,
                            // marginRight: 20,
                            // borderRadius: 5,
                            // backgroundColor:'#525'
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

                          <View
                            style={{
                              alignItems: 'center',
                              width: 100,
                              justifyContent: 'center',
                              height: 50,
                              // backgroundColor: "#525"
                            }}>
                            <TouchableOpacity
                              onPress={() => {
                                this.checkbox_fun(index);
                              }}>
                              <View
                                style={{
                                  height: 30,
                                  width: 30,
                                  borderRadius: 15,
                                  borderWidth: 1,
                                  borderColor:
                                    item.student_attendance == 'yes'
                                      ? '#357606'
                                      : '#000',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                }}>
                                {item.student_attendance == 'yes' ? (
                                  <Icon
                                    name="check"
                                    style={{
                                      fontSize: 20,
                                      fontWeight: '500',
                                      color: '#357606',
                                    }}
                                  />
                                ) : (
                                  <></>
                                )}
                              </View>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    </View>
                  </>
                ))}

                <TouchableOpacity
                  onPress={() => {
                    this.Submit_Button();
                  }}
                  style={{
                    height: 70,
                    width: '50%',
                    alignSelf: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#3c2365',
                    borderRadius: 20,
                    marginBottom: 15,
                  }}>
                  <Text style={{color: '#fff', fontSize: 18}}>Submit</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          )
        ) : (
          <View
            style={{
              height: height,
              backgroundColor: '#fff',
              alignItems: 'center',
              justifyContent: 'center',
              width: width,
            }}>
            <Text style={{color: '#777'}}>No Internet Connection</Text>
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
