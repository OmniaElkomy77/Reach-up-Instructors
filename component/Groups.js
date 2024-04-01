import React from 'react';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  FlatList,
  Image,
  ActivityIndicator,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
const { width, height } = Dimensions.get('window');
import { RadioButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import NetInfo from '@react-native-community/netinfo';
// import axios from "axios";
import ModalHome from 'react-native-modalbox';
export default class Groups extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: [],
      connection_Status: '',
      modalVisible: false,
      teacher_id: '',
      modalVisible: false,
      modal2Visible: false,
      collection_id: '',
      level_id: "",
      report: {
        qs_1_grammer: '',
        qs_2_dictation: '',
        qs_3_homework: '',
      },
      date: '',
      textwrong: false
    };
  }

  componentDidMount() {
    const unsubscripe = NetInfo.addEventListener(state => {
      this.setState({
        connection_Status: state.isConnected ? 'Online' : 'Offline',
      });
      if (!state.isConnected) {
      }
      let groups = this.props.navigation.getParam('group');
      let generation_id = this.props.navigation.getParam("level_id")
      // alert(JSON.stringify( groups))
      // console.log(generation_id)
      let teacher_id = this.props.navigation.getParam('teacher_id');
      this.setState({ groups: groups, teacher_id: teacher_id, level_id: generation_id });
    });
    return unsubscripe;
  }

  render() {
    return (
      <View style={{ backgroundColor: '#fff', flex: 1 }}>
        <StatusBar
          backgroundColor="transparent"
          translucent={true}
          barStyle="light-content"></StatusBar>
        <View
          style={{
            height: 100,
            backgroundColor: '#3c2365',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: 10,
          }}>
          <Text style={{ color: '#fff', fontSize: 20, fontWeight: '700' }}>
            Groups
          </Text>
        </View>
        {this.state.connection_Status == 'Online' ? (
          this.state.groups == '' ? (
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
          ) : (
            <>
              {this.state.groups.length == 0 ? (
                <View
                  style={{
                    height: height,
                    backgroundColor: '#fff',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: width,
                  }}>
                  <Text style={{ color: '#777' }}>There are No Groups Now</Text>
                </View>
              ) : (
                <ScrollView>
                  {this.state.groups.map((item, index) => {
                    return (
                      <>
                        <TouchableOpacity
                          style={{
                            width: '90%',
                            marginVertical: 15,
                            height: 150,
                            padding: 10,
                            borderWidth: 1,
                            borderColor: '#ddd',
                            borderRadius: 40,
                            flexDirection: 'row',
                            alignSelf: 'center',
                          }}
                          onPress={() => {
                            this.setState({
                              modalVisible: true,
                              collection_id: item.collection_id,
                              report: item.report,
                              // level_id: item.generation_id
                            });
                            // console.log(item)
                          }}>
                          <View
                            style={{
                              flex: 1,
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                            <Text
                              style={{
                                fontSize: 20,
                                color: '#000',
                                fontWeight: 'bold',
                              }}>
                              {item.collection_name}
                            </Text>
                            <Text style={{ color: '#777', textAlign: 'justify' }}>
                              {item.collection_time_table}
                            </Text>
                          </View>
                          <View
                            style={{
                              flex: 1,
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                            <Image
                              source={require('../photo/group.png')}
                              resizeMode="contain"
                              style={{ flex: 1, width: '100%', height: '100%' }}
                            />
                          </View>
                        </TouchableOpacity>
                      </>
                    );
                  })}
                </ScrollView>
              )}
            </>
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

        <ModalHome
          onRequestClose={() => {
            this.setState({
              modalVisible: false,
            });
          }}
          style={{
            height: (height * 1.5) / 4,
            // paddingLeft: 15,
            // maxHeight: height / 1.2,
            // borderTopRightRadius: 15,
            // borderTopLeftRadius: 15,
            backgroundColor: '#fff',
            // zIndex: 1235200000000566788899,
          }}
          backButtonClose={true}
          backdropPressToClose={true}
          isOpen={this.state.modalVisible}
          backdrop={true}
          // entry='bottom'
          onClosed={() => {
            this.setState({
              modalVisible: false,
            });
          }}
          swipeArea={50}
          // swipeThreshold={50}
          position="bottom"
          useNativeDriver={true}>
          <TouchableOpacity
            style={{
              //   flexDirection: 'row',
              //   flexDirection: 'row',
              height: 100,
              // backgroundColor: "#205",
              alignItems: 'flex-end',
              justifyContent: 'center',
              borderBottomWidth: 1,
              borderColor: '#777',
              paddingRight: 15,
            }}
            onPress={() => {
              this.setState({ modalVisible: false });
              this.props.navigation.navigate('Month_assess', {
                group_id: this.state.collection_id,
                teacher_id: this.state.teacher_id,
                report: this.state.report,
              });
            }}>
            <Text style={{ fontSize: 20, color: '#000' }}>Group Rating</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              //   flexDirection: 'row',
              height: 100,
              // backgroundColor: "#285",
              alignItems: 'flex-end',
              justifyContent: 'center',
              paddingRight: 15,
              borderBottomWidth: 1,
              borderColor: '#777',
            }}
            onPress={() => {
              this.setState({ modalVisible: false, modal2Visible: true });
            }}>
            <Text style={{ fontSize: 20, color: '#000' }}>Students</Text>
          </TouchableOpacity>




          <TouchableOpacity
            style={{
              //   flexDirection: 'row',
              height: 100,
              // backgroundColor: "#285",
              // alignItems: 'flex-end',
              justifyContent: 'center',
              paddingRight: 15,

            }}
            onPress={() => {
              this.setState({ modalVisible: false });
              this.props.navigation.navigate("AllActivetys", {
                group_id: this.state.collection_id,
                level_id: this.state.level_id
              })
            }}>
            <Text style={{ fontSize: 20, color: '#000' }}>Activity</Text>
          </TouchableOpacity>










        </ModalHome>

        <Modal
          visible={this.state.modal2Visible}
          onRequestClose={() => {
            this.setState({ modal2Visible: false });
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
                this.setState({ modal2Visible: false });
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
                <View>
                  <Text
                    style={{
                      height: 30,
                      // width: "85%",
                      // backgroundColor: "#eee",
                      alignSelf: 'center',
                      // borderRadius: 10,
                      // padding: 10,
                      marginVertical: 5,
                      color: '#000',
                      fontWeight: 'bold',
                      fontSize: 18,
                      // borderWidth: 1,
                      // borderColor: "#ddd"s
                    }}>
                    Choose the date you want
                  </Text>
                </View>

                <RadioButton.Group
                  onValueChange={value => {
                    this.setState({ date: value });
                  }}
                  value={this.state.date}>
                  <View
                    style={{
                      width: '100%',
                      flexDirection: 'row',
                      // backgroundColor: '#ff0',
                      alignSelf: 'center',
                      alignItems: 'center',
                      // paddingLeft: '5%',
                      justifyContent: 'space-around',
                      // alignContent:"center"
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        // justifyContent: 'flex-end',
                        //   alignSelf:"flex-end",
                        // width: '88%',
                        // marginLeft: 30,
                        //   backgroundColor: '#854',
                      }}>
                      <Text style={{ fontSize: 15 }}>tomorrow</Text>
                      <RadioButton value="tomorrow" />
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        // padding: 5,
                      }}>
                      <Text style={{ fontSize: 15 }}>today</Text>
                      <RadioButton value="today" />
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        // backgroundColor: "#ff0"
                        // padding: 5,
                      }}>
                      <Text style={{ fontSize: 15 }}>yesterday</Text>
                      <RadioButton value="yesterday" />
                    </View>
                  </View>
                </RadioButton.Group>
                {this.state.textwrong == true ? (
                  <View style={{ alignSelf: 'center', justifyContent: 'center' }}>
                    <Text style={{ color: "#f00" }}>choose the date</Text>
                  </View>
                ) : null}

                <View
                  style={{
                    flexDirection: 'row',
                    height: 50,
                    width: '95%',
                    // backgroundColor: "#412",
                    alignSelf: 'center',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    marginVertical: 10,
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      {
                        this.state.date != ''
                          ? (this.props.navigation.navigate('Movepages', {
                            group_id: this.state.collection_id,
                            teacher_id: this.state.teacher_id,
                            day_to_edit: this.state.date,
                          }),

                            this.setState({ modal2Visible: false, textwrong: false, date: "" }))
                          : this.setState({ textwrong: true });
                      }
                      // alert(this.state.date)
                    }}
                    style={{
                      padding: 10,
                      width: '40%',
                      backgroundColor: '#3c2365',
                      // elevation: 5,
                      borderRadius: 7,
                      alignItems: 'center',
                      justifyContent: 'center',
                      // borderWidth:1,

                      // borderColor:"#000"
                    }}>
                    <Text style={{ color: '#fff' }}>Ok</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <TouchableWithoutFeedback
              style={{ flex: 1 }}
              onPress={() => {
                this.setState({ modal2Visible: false });
              }}>
              <View
                style={{
                  width: '100%',
                }}
              />
            </TouchableWithoutFeedback>
          </View>
        </Modal>
      </View>
    );
  }
}
