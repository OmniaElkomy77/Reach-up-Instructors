import React from 'react'
import {
    Text, View, TextInput, TouchableOpacity, ScrollView, AsyncStorage, StatusBar, Dimensions, Image,
    Modal, TouchableWithoutFeedback, ToastAndroid
} from 'react-native'
import axios from "axios";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import NetInfo from '@react-native-community/netinfo';
import { constants, images, SIZES } from '../constants';
export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            teacher_id: "",
            Password: '',
            borderteacher_id: '#bdc1c6',
            borderpassword: '#bdc1c6',
            secure: true,
            // modalVisible: false,
            // text_wrong: "",
            connection_Status: ""
        }
    }

    componentDidMount() {

        const unsubscripe = NetInfo.addEventListener(state => {
            // console.log(state.isConnected)
            this.setState({
                connection_Status: state.isConnected ? "Online" : "Offline"
            })
            if (!state.isConnected) {
                ToastAndroid.showWithGravityAndOffset(
                    "No Internet Connection",
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                    20,
                    20
                );
            }
        })
        return unsubscripe

    }



    function_password(pass) {
        if (this.state.Password.length <= 4 && pass.length < 4) {
            this.setState({ borderpassword: 'red' })
            if (pass == "") {
                this.setState({ borderpassword: '#bdc1c6' })
            }
        } else {
            this.setState({ borderpassword: '#bdc1c6' })
        }
    }
    function_teacher_id(text_teacher_id) {
        if (this.state.teacher_id <= 5 && text_teacher_id != "") {
            this.setState({ borderteacher_id: 'red' })
            if (text_teacher_id == "") {
                this.setState({ borderteacher_id: '#bdc1c6' })
            }
        } else {
            this.setState({ borderteacher_id: '#bdc1c6' })
        }
    }


    async setDate(data) {
        await AsyncStorage.setItem('AllData', JSON.stringify(data));
        await AsyncStorage.setItem("switch", "Home")
        this.props.navigation.navigate('AppSwitch')

    }


    check() {
        let DataToSend = {
            teacher_id: this.state.teacher_id,
            teacher_pass: this.state.Password,
        }
        if (this.state.connection_Status == "Online") {
            axios.post(constants.Domain + 'signin.php', DataToSend).then(res => {
                if (res.status == 200) {
                    if (res.data == "data_is_not_correct") {
                        ToastAndroid.showWithGravityAndOffset(
                            "You Must Enter Correct Data",
                            ToastAndroid.SHORT,
                            ToastAndroid.BOTTOM,
                            20,
                            20
                        );
                    } else if (res.data == "can_not_login") {
                        ToastAndroid.showWithGravityAndOffset(
                            "You Can't Login Now",
                            ToastAndroid.SHORT,
                            ToastAndroid.BOTTOM,
                            20,
                            20
                        );
                    } else if (res.data == "error") {
                        // this.setState({ text_wrong: "حدث خطأ ما ", modalVisible: true })
                        ToastAndroid.showWithGravityAndOffset(
                            "Something Error",
                            ToastAndroid.SHORT,
                            ToastAndroid.BOTTOM,
                            20,
                            20
                        );
                    } else {
                        this.setDate(res.data)

                    }
                }

            }).catch(function (error) {
                console.log(error);
            })
        } else {
            ToastAndroid.showWithGravityAndOffset(
                "No Internet Connection",
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                20,
                20
            );

        }

    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: "#fff" }}>
                <StatusBar
                    backgroundColor='#3c2365' barStyle='light-content'></StatusBar>

                <View style={{
                    alignItems: 'center', justifyContent: 'center',
                    // backgroundColor: '#255'
                }}>

                    <View style={{ backgroundColor: '#fff', height: SIZES.height / 3, alignSelf: 'center', width: "95%", alignItems: 'center', flexDirection: 'row', justifyContent: 'space-around' }}>
                        <Image source={images.AppLogoPurple}
                            style={{ height: SIZES.height, width: "90%", resizeMode: 'contain' }} />
                    </View>



                    <View style={{
                        height: SIZES.height / 3, width: '100%',
                        // backgroundColor:'#528'
                    }}>
                        <TextInput style={{
                            backgroundColor: "#fff", height: 70,
                            width: '90%',
                            alignSelf: "center",
                            borderRadius: 10,
                            margin: 10,
                            padding: 10,
                            borderWidth: 1,
                            borderColor: this.state.borderteacher_id,
                            color: "#000"
                        }} placeholder="ID"
                            placeholderTextColor="#777"
                            keyboardType='number-pad'
                            value={this.state.teacher_id}
                            onChangeText={(value) => {
                                this.setState({ teacher_id: value.trim() })
                                this.function_teacher_id(value)
                            }} />


                        <View style={{
                            backgroundColor: "#fff",
                            height: 70,
                            width: '90%',
                            alignSelf: "center",
                            borderRadius: 10,
                            margin: 10,
                            padding: 10,
                            borderColor: this.state.borderpassword,
                            borderWidth: 1,
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>

                            {this.state.secure ? (
                                <TouchableOpacity style={{ width: "10%", alignItems: 'center', justifyContent: 'center' }}
                                    onPress={() => {
                                        this.setState({ secure: false })
                                    }}>
                                    <FontAwesome5 name="eye-slash" style={{ fontSize: 20 ,color:"#777"}} />
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity
                                    style={{ width: "10%", alignItems: 'center', justifyContent: 'center' }}
                                    onPress={() => {
                                        this.setState({ secure: true })
                                    }}>

                                    <FontAwesome5 name="eye" style={{ fontSize: 20,color:"#777" }} />
                                </TouchableOpacity>
                            )
                            }

                            <TextInput style={{
                                backgroundColor: "#fff",
                                height: "100%",
                                width: '90%',
                                borderRadius: 10,
                                // alignItems: "flex-end",
                                color: "#000"
                            }}
                                placeholder="Password"
                                placeholderTextColor="#777"
                                keyboardType='number-pad'
                                secureTextEntry={this.state.secure ? true : false}
                                // keyboardType="number-pad"
                                value={this.state.Password}
                                onChangeText={(value) => {
                                    this.setState({ Password: value })
                                    this.function_password(value)
                                }} />



                        </View>

                        <View style={{
                            height: 100,
                            //    backgroundColor:"#ff1",
                            width: "95%",
                            justifyContent: "center",
                            alignItems: 'center'

                        }}>
                            <TouchableOpacity onPress={() => {
                                this.check()
                            }}
                                style={{
                                    backgroundColor: "#3c2365",
                                    height: 70,
                                    width: "40%",
                                    // alignSelf: 'flex-end',
                                    borderRadius: 10,
                                    justifyContent: "center",
                                    alignItems: 'center'
                                }}>
                                <Text style={{ fontSize: 18, fontWeight: "500", color: "#fff" }}>Submit</Text>
                            </TouchableOpacity>


                        </View>
                    </View>






                </View>



                {/* 
                <Modal
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