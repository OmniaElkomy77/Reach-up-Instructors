import React from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  AsyncStorage,
  Image,
  StatusBar,
  Dimensions,
  Modal,
  TouchableWithoutFeedback,
  ToastAndroid,
} from 'react-native';
import axios from 'axios';
// import Icon from "react-native-vector-icons/FontAwesome5"
import Constants from '../constants/Constants';
import NetInfo from '@react-native-community/netinfo';
const { width, height } = Dimensions.get('window');
export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hours: '',
      min: '',
      data: [],
      teacher_id: this.props.navigation.getParam('teacher_id'),
      modalVisible: false,
      modal2Visible: false,
      text_wrong: '',
      connection_Status: '',
      loading: true,
    };
  }

  componentDidMount() {
    const unsubscripe = NetInfo.addEventListener(state => {
      this.setState({
        connection_Status: state.isConnected ? 'Online' : 'Offline',
      });
      if (!state.isConnected) {
      }
      this.selecthours();
    });
    return unsubscripe;
  }

  selecthours() {
    let DataToSend = {
      teacher_id: this.state.teacher_id,
    };
    axios
      .post(Constants.Domain + 'select_month_work_hours.php', DataToSend)
      .then(res => {
        if (res.status == 200) {
          if (Array.isArray(res.data)) {
            this.setState({ data: res.data, loading: false });
            this.computeTotal_hours();
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

  computeTotal_hours() {
    let data = this.state.data;
    let sum = 0;
    for (let i = 0; i < data.length; i++) {
      sum += parseInt(data[i].work_hours_in_minutes);
      //  console.log(sum)
    }
    return this.show_hours(sum);
  }

  save_work_hours() {
    let hours = this.state.hours;
    let min = this.state.min;
    let work_hours_in_min = 0;

    if (hours == '' && min == '') {
      ToastAndroid.showWithGravityAndOffset(
        'No Working Time Set',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        20,
        20,
      );
      this.setState({ modalVisible: false });
    } else {
      hours = parseInt(hours * 60);
      work_hours_in_min = hours + parseInt(min);

      let DataToSend = {
        work_hours_in_min: work_hours_in_min,
        teacher_id: this.state.teacher_id,
      };

      axios
        .post(Constants.Domain + 'save_work_hours.php', DataToSend)
        .then(res => {
          if (res.status == 200) {
            if (res.data == 'success')
              this.setState({ modalVisible: false, hours: '', min: '' });
            this.selecthours();
            ToastAndroid.showWithGravityAndOffset(
              'Working Time has been Set',
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
        });
    }
  }

  show_hours(time) {
    var hours = parseInt(time / 60);
    var mins = time % 60;
    return hours + ' : ' + mins;
  }

  render() {
    return (
      <View style={{ backgroundColor: '#fff', flex: 1 }}>
        <StatusBar
          backgroundColor="#3c2365"
          barStyle="light-content"></StatusBar>
        <View
          style={{
            height: 70,
            backgroundColor: '#3c2365',
            alignItems: 'flex-end',
            justifyContent: 'center',
            paddingTop: 10,
            // flexDirection: 'row',
            // width:"50%"
          }}>
          <View
            style={{
              // height: 70,
              // backgroundColor: '#3c5',
              alignItems: 'center',
              justifyContent: 'space-around',
              // marginleft:100,
              flexDirection: 'row',
              width: '80%',
            }}>
            <Text style={{ color: '#fff', fontSize: 20, fontWeight: '700', marginLeft: 15 }}>
              Working Time
            </Text>

            <View
              style={{
                width: 90,
                height: 45,
                backgroundColor: '#eee',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10
              }}>
              <Text style={{ color: "#666" }}>{this.computeTotal_hours()}</Text>
            </View>
          </View>
        </View>

        {this.state.connection_Status == 'Online' ? (
          this.state.loading == true ? (
            <View
              style={{
                height: height,
                backgroundColor: '#fff',
                alignItems: 'center',
                justifyContent: 'center',
                width: width,
              }}>
              <ActivityIndicator color="#3c2365" size={30}></ActivityIndicator>
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
              <TouchableOpacity
                style={{
                  height: 50,
                  backgroundColor: '#3c2365',
                  width: 220,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 15,
                  alignSelf: 'center',
                  marginBottom: 10,
                }}
                onPress={() => {
                  this.setState({ modalVisible: true });
                }}>
                <Text style={{ color: '#fff' }}>Determine The Working Time</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <ScrollView>
              {this.state.data.map((item, index) => (
                <View
                  key={index}
                  style={{
                    height: 150,
                    width: '90%',
                    backgroundColor: '#fff',
                    alignSelf: 'center',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    borderRadius: 10,
                    marginVertical: 20,
                    borderWidth: 1,
                    borderColor: '#999',
                  }}>
                  <View style={{}}>
                    <Text style={{ color: '#000', fontSize: 18 }}>
                      Your Work Time
                    </Text>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <View
                      style={{
                        height: 50,
                        width: 100,
                        backgroundColor: '#ddd',

                        borderRadius: 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Text>{this.show_hours(item.work_hours_in_minutes)}</Text>
                    </View>

                    <View style={{ width: '50%', justifyContent: 'center' }}>
                      <Text style={{ fontSize: 18, color: '#000' }}>
                        {item.date}
                      </Text>
                    </View>
                  </View>
                </View>
              ))}

              <TouchableOpacity
                style={{
                  height: 50,
                  backgroundColor: '#3c2365',
                  width: 300,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 15,
                  alignSelf: 'center',
                  marginBottom: 10,
                }}
                onPress={() => {
                  this.setState({ modalVisible: true });
                }}>
                <Text style={{ color: '#fff' }}>
                  Determine The Working Time of The Day
                </Text>
              </TouchableOpacity>
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
            <Text style={{ color: '#777' }}>No Internet Connection</Text>
          </View>
        )}

        <Modal
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setState({ modalVisible: false });
          }}
          animationType="slide"
          // presentationStyle="formSheet"s
          transparent={true}>
          <View
            style={{
              // opacity:0.7,
              backgroundColor: 'rgba(0,0,0,0.6)',
              flex: 1,
              justifyContent: 'flex-end',
            }}>
            <TouchableWithoutFeedback
              style={{ flex: 1 }}
              onPress={() => {
                this.setState({ modalVisible: false });
              }}>
              <View
                style={{
                  position: 'absolute',
                  height: '100%',
                  width: '100%',
                }}
              />
            </TouchableWithoutFeedback>
            <View
              style={{
                height: height,
                // width: width,
                flex: 1,
                // alignContent: 'center',
                justifyContent: 'space-around',
              }}>
              <View
                style={{
                  // height:height,
                  alignSelf: 'center',
                  justifyContent: 'space-around',
                  width: '90%',
                  backgroundColor: '#fff',
                  borderRadius: 10,
                  elevation: 5,
                  paddingVertical: 15,
                  marginBottom: 10,
                }}>
                <View
                  style={{
                    height: 150,
                    width: '95%',
                    backgroundColor: '#fff',
                    alignSelf: 'center',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    borderRadius: 10,
                    marginVertical: 20,
                    borderWidth: 1,
                    borderColor: '#999',
                  }}>
                  <View style={{}}>
                    <Text style={{ color: '#000', fontSize: 18 }}>
                      {' '}
                      Enter Your Work Time{' '}
                    </Text>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <TextInput
                      style={{
                        height: 50,
                        width: 100,
                        backgroundColor: '#ddd',
                        borderBottomRightRadius: 10,
                        borderTopRightRadius: 10,

                        textAlign: 'center',
                      }}
                      value={this.state.min}
                      onChangeText={value => {
                        this.setState({ min: value });
                      }}
                      keyboardType="number-pad"
                      placeholder="Minutes"
                      placeholderTextColor={'#999'}
                    />
                    <View
                      style={{
                        backgroundColor: '#ddd',
                        justifyContent: 'center',
                        height: 50,
                      }}>
                      <Text style={{ fontSize: 20 }}>:</Text>
                    </View>
                    <TextInput
                      style={{
                        height: 50,
                        width: 100,
                        backgroundColor: '#ddd',
                        borderTopLeftRadius: 10,
                        borderBottomLeftRadius: 10,
                        textAlign: 'center',
                      }}
                      value={this.state.hours}
                      onChangeText={value => {
                        this.setState({ hours: value });
                      }}
                      keyboardType="number-pad"
                      placeholder="Hours"
                      placeholderTextColor={'#999'}
                    />
                  </View>
                </View>

                <TouchableOpacity
                  style={{
                    height: 50,
                    backgroundColor: '#3c2365',
                    width: 100,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 15,
                    alignSelf: 'center',
                  }}
                  onPress={() => {
                    // this.storeData()
                    this.save_work_hours();
                  }}>
                  <Text style={{ color: '#fff' }}>Done</Text>
                </TouchableOpacity>
              </View>
            </View>
            <TouchableWithoutFeedback
              style={{ flex: 1 }}
              onPress={() => {
                this.setState({ modalVisible: false });
              }}>
              <View
                style={{
                  width: '100%',
                }}
              />
            </TouchableWithoutFeedback>
          </View>
        </Modal>

        {/* <Modal
                    visible={this.state.modal2Visible}
                    onRequestClose={
                        () => {
                            this.setState({ modal2Visible: false })
                        }
                    }
                    animationType="slide"
                    // presentationStyle="formSheet"s
                    transparent={true}

                >
                    <View style={{
                        // opacity:0.7,
                        backgroundColor: 'rgba(0,0,0,0.6)',
                        flex: 1,
                        justifyContent: "flex-end"
                    }}>
                        <TouchableWithoutFeedback
                            style={{ flex: 1 }}
                            onPress={() => {
                                this.setState({ modal2Visible: false })
                            }} >
                            <View style={{
                                position: "absolute",
                                height: '100%',
                                width: "100%"
                            }} />
                        </TouchableWithoutFeedback>
                        <View
                            style={{
                                height: height,
                                // width: width,
                                flex: 1,
                                // alignContent: 'center',
                                justifyContent: 'space-around',

                            }}>
                            <View
                                style={{
                                    // height:height,
                                    alignSelf: 'center',
                                    justifyContent: 'space-around',
                                    width: '90%',
                                    backgroundColor: '#fff',
                                    borderRadius: 10,
                                    elevation: 5,
                                    paddingVertical: 15,
                                    marginBottom: 10,

                                }}>

                                <View >
                                    <Text
                                        style={{
                                            height: 30,
                                            // width: "85%",
                                            // backgroundColor: "#eee",
                                            alignSelf: "center",
                                            // borderRadius: 10,
                                            // padding: 10,
                                            // marginVertical: 10,
                                            color: "#f00",
                                            // borderWidth: 1,
                                            // borderColor: "#ddd"s
                                        }}



                                    >{this.state.text_wrong}</Text>
                                </View>

                                <View style={{
                                    flexDirection: 'row',
                                    height: 50,
                                    width: "95%",
                                    // backgroundColor: "#412",
                                    alignSelf: "center",
                                    justifyContent: "space-around",
                                    alignItems: "center"
                                }}>




                                    <TouchableOpacity
                                        onPress={() => {
                                            this.setState({ modal2Visible: false })
                                        }}

                                        style={{
                                            padding: 10,
                                            width: "40%",
                                            backgroundColor: "#3c2365",
                                            // elevation: 5,
                                            borderRadius: 7,
                                            alignItems: 'center',
                                            justifyContent: "center",
                                            // borderWidth:1,
                                            // borderColor:"#000"
                                        }}>

                                        <Text style={{ color: "#fff" }} >حسنا</Text>
                                    </TouchableOpacity>

                                </View>


                            </View>


                        </View>
                        <TouchableWithoutFeedback
                            style={{ flex: 1 }}
                            onPress={() => {
                                this.setState({ modal2Visible: false })
                            }} >
                            <View style={{
                                width: "100%",
                            }} />
                        </TouchableWithoutFeedback>
                    </View>



                </Modal>

 */}
      </View>
    );
  }
}
