import React from "react"
import {
    View, Text, StatusBar, TouchableOpacity, Dimensions,
    PermissionsAndroid, FlatList, ActivityIndicator, ToastAndroid, AsyncStorage
} from "react-native"
import LinearGradient from 'react-native-linear-gradient';
import { ScrollView } from "react-navigation";
import NetInfo from '@react-native-community/netinfo';
import axios from "axios";
import Constants from "../constants/Constants"
const { width, height } = Dimensions.get('window');
export default class Classes extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            classes: [],
            connection_Status: '',
            teacher_id: this.props.navigation.getParam("teacher_id"),
            loading: false
        }
    }

    componentDidMount() {

        const unsubscripe = NetInfo.addEventListener(state => {
            this.setState({
                connection_Status: state.isConnected ? "Online" : "Offline"
            })
            if (!state.isConnected) {

            }
            this.setState({ loading: true })
            this.Select_generation()


        })
        return unsubscripe





    }
    Select_generation() {
        let DataToSend = {
            teacher_id: this.props.navigation.getParam("teacher_id")
        }

        axios.post(Constants.Domain + "select_generations_and_collections.php",
            DataToSend).then(res => {
                if (res.status == 200) {
                    if (Array.isArray(res.data)) {

                        this.setState({
                            classes: res.data,
                            loading: false
                        })


                        // console.log(JSON.stringify(res.data))
                    } else if (res.data == 'logout') {
                        this.logOut()

                    }

                    else {

                        ToastAndroid.showWithGravityAndOffset(
                            "Something Error",
                            ToastAndroid.SHORT,
                            ToastAndroid.BOTTOM,
                            20,
                            20
                        );
                    }
                    this.setState({ loading: false })
                } else {

                    ToastAndroid.showWithGravityAndOffset(
                        "Something Error",
                        ToastAndroid.SHORT,
                        ToastAndroid.BOTTOM,
                        20,
                        20
                    );
                    this.setState({ loading: false })

                }


            })




    }





    async logOut() {
        await AsyncStorage.setItem('switch', 'Auth')
        this.props.navigation.navigate('AppSwitch')
    }



    render() {
        return (
            <View>
                <StatusBar
                    backgroundColor='transparent' translucent={true} barStyle='light-content'></StatusBar>
                <View style={{
                    height: 100, backgroundColor: "#3c2365",
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingTop: 10


                }}>

                    <Text style={{ color: '#fff', fontSize: 20, fontWeight: "700" }}>Classes</Text>

                </View>




                {this.state.connection_Status == "Online" ? (

                    this.state.loading ? (
                        <View style={{
                            height: height,
                            backgroundColor: '#fff',
                            alignItems: 'center',
                            justifyContent: "center",
                            width: width

                        }}>


                            <ActivityIndicator color="#3c2365" size={30}>

                            </ActivityIndicator>


                        </View>
                    ) : (

                        this.state.classes.length == 0 ? (
                            <View style={{
                                height: height,
                                backgroundColor: '#fff',
                                alignItems: 'center',
                                justifyContent: "center",
                                width: width

                            }}>
                                <Text style={{ color: "#777" }}>
                                    There are No Classes Now
                                </Text>


                            </View>
                        ) : (
                            <ScrollView>
                                {
                                    this.state.classes.map((item, index) => {
                                        return (
                                            <>
                                                <TouchableOpacity

                                                    onPress={() => {
                                                        this.props.navigation.navigate("Groups", {
                                                            group: item.collections,
                                                            teacher_id: this.state.teacher_id,
                                                            level_id: item.generation_id
                                                        })
                                                        // console.log(item.generation_id)
                                                    }}

                                                    style={{
                                                        width: '90%',
                                                        alignSelf: 'center',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        marginVertical: 15,
                                                        height: 100,
                                                        borderTopLeftRadius: 50,
                                                        borderBottomRightRadius: 50
                                                    }}
                                                >
                                                    <LinearGradient
                                                        colors={['#3c2365', '#9b8db1',]}
                                                        start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }}
                                                        style={{
                                                            width: '100%',
                                                            height: "100%",
                                                            justifyContent: 'center',
                                                            alignItems: 'center',
                                                            borderTopLeftRadius: 50,
                                                            borderBottomRightRadius: 50
                                                        }}
                                                    >

                                                        <Text style={{ color: "#fff", fontSize: 18 }}>{item.generation_name}</Text>

                                                    </LinearGradient>
                                                </TouchableOpacity>
                                            </>
                                        )
                                    }
                                    )
                                }
                            </ScrollView>
                        )

                    ))
                    : (
                        <View style={{
                            height: height,
                            backgroundColor: '#fff',
                            alignItems: 'center',
                            justifyContent: "center",
                            width: width

                        }}>

                            <Text style={{ color: "#777" }}>
                                No Internet Connection
                            </Text>


                        </View>
                    )
                }





            </View>
        )
    }
}