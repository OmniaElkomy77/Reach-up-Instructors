import React from 'react'
import {
    Text, View, TextInput, TouchableOpacity,
    ScrollView,
    AsyncStorage, Image,
    StatusBar, Dimensions,
} from 'react-native'
import Constants from "../constants/Constants"
import Icon from "react-native-vector-icons/FontAwesome5"
import NetInfo from '@react-native-community/netinfo';
const { width, height } = Dimensions.get('window');
import axios from 'axios';
export default class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            teacher_data: [],
            data: [],
            text_wrong: "",
            connection_Status: '',
            modalVisible: false
        }
    }
    async componentDidMount() {
        let data = JSON.parse(await AsyncStorage.getItem("AllData"))
        // alert(data.pay_type)
        this.setState({ teacher_data: data })



    }
    async logOut() {

        await AsyncStorage.setItem('switch', 'Auth')

        this.props.navigation.navigate('AppSwitch')
    }


    render() {
        return (
            <View style={{ backgroundColor: '#fff', flex: 1 }}>
                <ScrollView>
                    <StatusBar
                        backgroundColor='#3c2365' barStyle='light-content'></StatusBar>

                    <View style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        // backgroundColor: '#255'
                    }}>

                        <View style={{
                            backgroundColor: '#fff',
                            height: height / 3,
                            alignSelf: 'center',
                            width: "95%",
                            alignItems: 'center',
                            flexDirection: 'row',
                            justifyContent: 'space-around'
                        }}>
                            <Image source={require("../photo/AppLogoPurple.png")}
                                style={{ height: height, width: "90%", resizeMode: 'contain' }} />
                        </View>





                    </View>


                    <View style={{
                        height: this.state.teacher_data.pay_type == "hours" ? 500 : null,
                        alignItems: 'center',

                        paddingBottom: 35,
                    }}>


                        <TouchableOpacity style={{
                            width: '90%',
                            marginVertical: "10%",
                            height: 150,
                            padding: 10,
                            borderWidth: 1,
                            borderColor: '#ddd',
                            borderRadius: 40,
                            flexDirection: 'row'
                        }}
                            onPress={() => {
                                // this.Select_generation()
                                // alert("1")
                                this.props.navigation.navigate("Classes",
                                    {
                                        // generation_collection: this.state.data,
                                        teacher_id: this.state.teacher_data.teacher_id
                                    })
                            }}>

                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
                                <Text style={{ fontSize: 20, color: '#000', fontWeight: 'bold' }}>Classes</Text>
                            </View>
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
                                <Image
                                    source={require('../photo/classes.png')}
                                    resizeMode='contain'
                                    style={{ flex: 1, width: '100%', height: '100%' }}


                                />

                            </View>

                        </TouchableOpacity>
                        {/************************************************************************************************************ */}

                        <TouchableOpacity
                            onPress={() => {
                                this.props.navigation.navigate("Qr_absence", {
                                    teacher_id: this.state.teacher_data.teacher_id
                                })
                            }}
                            style={{ width: '90%', height: 150, padding: 10, borderWidth: 1, borderColor: '#ddd', borderRadius: 40, flexDirection: 'row' }} >

                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
                                <Image
                                    source={require('../photo/Qr.png')}
                                    resizeMode='contain'
                                    style={{ flex: 1, width: '100%', height: '100%' }}
                                />

                            </View>

                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
                                <Text style={{ fontSize: 20, color: '#000', fontWeight: 'bold' }}>Attendance</Text>
                            </View>


                        </TouchableOpacity>
                        <View style={{
                            // backgroundColor: "#525",
                            flexDirection: 'row', width: "90%",
                            justifyContent: "space-around"
                        }}>

                            {this.state.teacher_data.pay_type == "hours" ? (
                                <TouchableOpacity
                                    onPress={() => {
                                        this.props.navigation.navigate("Hours", {
                                            teacher_id: this.state.teacher_data.teacher_id
                                        })
                                    }}


                                    style={{
                                        height: 70,
                                        width: 150,
                                        borderRadius: 25,
                                        backgroundColor: '#3c2365',
                                        marginVertical: 35,
                                        alignItems: "center",
                                        justifyContent: "center"
                                    }}>
                                    <Text style={{ color: "#fff" }}>Hours</Text>
                                </TouchableOpacity>
                            ) : (null)}


                            <TouchableOpacity
                                onPress={() => {
                                    this.logOut()
                                }}


                                style={{
                                    height: 70,
                                    width: 150,
                                    borderRadius: 25,
                                    backgroundColor: '#3c2365',
                                    marginVertical: 35,
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}>
                                <Text style={{ color: "#fff" }}>LogOut</Text>
                            </TouchableOpacity>


                        </View>













                    </View>
                </ScrollView>




                {/* <Modal
                    visible={this.state.modalVisible}
                    onRequestClose={
                        () => {
                            this.setState({ modalVisible: false })
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
                                this.setState({ modalVisible: false })
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
                                            this.setState({ modalVisible: false })
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
                                this.setState({ modalVisible: false })
                            }} >
                            <View style={{
                                width: "100%",
                            }} />
                        </TouchableWithoutFeedback>
                    </View>



                </Modal> */}


            </View>
        )
    }







}