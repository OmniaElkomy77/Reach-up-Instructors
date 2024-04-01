
import React, { useState, useEffect } from 'react'
import {
    View, Text, StatusBar, TouchableOpacity, ScrollView, TextInput, Alert,
    Modal, Image, Pressable, ActivityIndicator, UIManager, Platform, LayoutAnimation, FlatList
} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import moment from "moment";

if (
    Platform.OS === "android" &&
    UIManager.setLayoutAnimationEnabledExperimental
) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}


export default class AllActivatis extends React.Component {




    constructor() {
        super()
        this.state = {
            data: [

            ],
            name: {},
            count: 0,
            loading: false,
            loading: false,
            id: -1,
            loadingbutt: [false],
            modalconfirm: false,
            activity_id: -1,
            currentindex: -1

        }
    }

    componentDidMount() {
        this.getdata()
        // console.log(this.props.navigation.getParam("group_id"))
        // console.log(this.props.navigation.getParam("level_id"))

        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }



    getdata() {
        this.setState({ loading: true })
        let data_to_send = {
            group_id: this.props.navigation.getParam("group_id"),
            level_id: this.props.navigation.getParam("level_id"),
        }
        axios.post("https://camp-coding.org/reachUpAcademy/teacher/selectAndInsertActivety.php", data_to_send).then(res => {
            if (res.status == 200) {
                // console.log(JSON.stringify(res.data))
                if ((res.data) == "activity_created") {
                    this.getdata()
                }
                else {
                    let new_in = res.data

                    for (var i = 0; i < new_in.length; i++) {
                        new_in[i].open = false
                    }
                    this.setState({ data: new_in })

                }
            } else {

                alert("No Internet Connection")

            }

            this.setState({ loading: false })




        });
    }












    opendetils(index) {
        let new_in = this.state.data
        if (new_in[index].open == true) {
            new_in[index].open = false
        } else {
            for (var i = 0; i < new_in.length; i++) {
                new_in[i].open = false
            }
            new_in[index].open = true

        }


        this.setState({ data: new_in })
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);

    }



    update_check(id) {
        let index = this.state.currentindex
        let load = this.state.loadingbutt;
        load[index] = true;
        this.setState({ loadingbutt: load, modalconfirm: false })
        let data_to_send = {
            table_id: this.state.activity_id
        }
        axios.post("https://camp-coding.org/reachUpAcademy/teacher/update_activitey.php", data_to_send).then(res => {
            if (res.status == 200) {
                // alert(JSON.stringify(res.data))
                if ((res.data) == "success") {
                    let new_in = this.state.data
                    new_in[index].update_check = 1
                    this.setState({ data: new_in })


                }
                else
                    // alert("حدث خطأ اثناء الإضافة")
                    alert("something wrong")
            } else {

                // alert("حدث خطأ تأكد من الإتصال بالانترنت")
                alert("No Internet Connection")

            }
            let load = this.state.loadingbutt;
            load[index] = false;
            this.setState({ loadingbutt: true })




        });
    }



    render() {
        return (
            <>
                <StatusBar
                    backgroundColor={'#3c2365'}
                />
                <View
                    style={{
                        flex: 1,
                        opacity: this.state.modalconfirm ? .5 : null
                    }}
                >

                    <View style={{
                        width: '100%',
                        height: 100,
                        backgroundColor: '#3c2365',
                        alignItems: "center",
                        justifyContent: "center"

                    }}>

                        <Text
                            style={{
                                fontSize: 25,
                                color: "#fff"
                            }}
                        >
                            Activity
                        </Text>


                    </View>
                    {this.state.loading == true ? (
                        <View
                            style={{
                                flex: 1,
                                justifyContent: "center",
                                alignItems: "center"
                            }}
                        >
                            <ActivityIndicator
                                size={40}
                                color={'#3c2365'}
                            />
                        </View>
                    ) : (
                        this.state.data.length == 0 ? (
                            <View
                                style={{
                                    flex: 1,
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}
                            >
                                <Text style={{
                                    fontSize: 22,
                                    color: "#3c2365",
                                    // textAlign: 'left',

                                }}>{'No Activity Yet'}</Text>
                            </View>
                        ) : (
                            <FlatList
                                data={this.state.data}

                                renderItem={({ item, index }) =>


                                    <TouchableOpacity
                                        disabled={item.activity != null || item.review != null ? false : true}
                                        onPress={() => {
                                            this.opendetils(index)
                                        }}
                                        style={{
                                            marginTop: index == 0 ? 10 : 0,
                                            width: "90%",
                                            alignSelf: "center",
                                            borderColor: '#ddd',
                                            borderBottomWidth: 1,
                                            borderLeftWidth: 0.3,
                                            borderRightWidth: 0.7,
                                            borderTopWidth: 0.5,
                                            borderRadius: 10,

                                            marginBottom: 10,
                                            backgroundColor: "#fff"
                                        }}

                                    >

                                        <View
                                            key={index}
                                            style={{

                                                width: "100%",
                                                alignSelf: 'center',
                                                // flexDirection:'row',
                                                // backgroundColor: '#FFEFCA',
                                                borderTopLeftRadius: 10,
                                                borderBottomLeftRadius: 10,
                                                borderLeftColor: '#3c2365',
                                                borderLeftWidth: 6,
                                                paddingVertical: 5,
                                                alignItems: "center",
                                                justifyContent: "center"


                                                // paddingLeft: 10,
                                            }}>


                                            <View style={{
                                                flexDirection: 'row',
                                                justifyContent: 'space-between',
                                                alignContent: "center",
                                                alignItems: "center",
                                                width: '100%',
                                                padding: 5
                                                // marginTop: 15
                                            }}>



                                                <View
                                                    style={{
                                                        marginLeft: 10,
                                                        // backgroundColor: "red",
                                                        // width: "20%", 
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        alignSelf: "center"
                                                    }}
                                                >
                                                    {item.update_check == '0' ? (
                                                        <TouchableOpacity
                                                            style={{ marginLeft: 10 }}
                                                            onPress={() => {
                                                                // this.update_check(item.table_id, index)
                                                                this.setState({
                                                                    currentindex: index,
                                                                    activity_id: item.table_id,
                                                                    modalconfirm: true
                                                                })

                                                            }}>
                                                            {this.state.loadingbutt[index] ? (
                                                                <ActivityIndicator
                                                                    color={'#3c2365'}
                                                                    size={30}
                                                                />
                                                            ) : (
                                                                <Image
                                                                    source={require('../photo/Checklist.png')}
                                                                    style={{ width: 30, height: 30, marginTop: 0 }}
                                                                />
                                                            )}

                                                        </TouchableOpacity>
                                                    ) : (
                                                        <View
                                                            style={{ marginLeft: 10 }}
                                                        >
                                                            <Image
                                                                source={require('../photo/Done.png')}
                                                                style={{ width: 30, height: 30, marginTop: 0 }}
                                                            />
                                                        </View>
                                                    )}
                                                </View>
                                                <View
                                                    style={{
                                                        marginRight: 15,
                                                        width: '80%',
                                                        paddingRight: 5,
                                                    }}
                                                >
                                                    <Text>{item.content}</Text>
                                                </View>


                                            </View>
                                            {item.update_check == '1' ? (

                                                <Text style={{
                                                    fontSize: 15,
                                                    color: "#b9b6b6",
                                                    // textAlign: 'left',
                                                    marginLeft: 30,
                                                    marginVertical: 10
                                                }}>
                                                    {moment(item.date, "YYYYMMDD").fromNow()}
                                                </Text>
                                            ) : null}
                                            {item.open ?



                                                <View style={{
                                                    width: '100%',
                                                    paddingRight: 15
                                                }}>
                                                    {item.activity != null ? (
                                                        <Text style={{
                                                            fontSize: 15,
                                                            color: "#b9b6b6",
                                                            // textAlign: 'left',
                                                            marginLeft: 30,
                                                            marginVertical: 10
                                                        }}>{item.activity}</Text>
                                                    ) : null}

                                                    {item.review != null ? (
                                                        <Text style={{
                                                            fontSize: 15,
                                                            color: "#b9b6b6",
                                                            // textAlign: 'left',
                                                            marginLeft: 30,
                                                            marginVertical: 10
                                                        }}>{'review :- ' + item.review}</Text>
                                                    ) : null}

                                                </View>


                                                : null}
                                            {item.activity != null || item.review != null ? (
                                                <Icon name={item.open ? "chevron-up" : "chevron-down"}
                                                    size={15}
                                                    color={"#000"}
                                                    style={{
                                                        marginBottom: 5
                                                    }}
                                                />
                                            ) : null}


                                        </View>
                                    </TouchableOpacity>




                                }

                            />
                        )

                    )}














                </View>


                {/*  */}

                <Modal
                    visible={this.state.modalconfirm}
                    animationType={'slide'}
                    onRequestClose={() => {
                        this.setState({ modalconfirm: false });
                    }}
                    transparent={true}>
                    <View
                        style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <View
                            style={{
                                width: '90%',
                                padding: 10,
                                backgroundColor: '#fff',
                                elevation: 22,
                                borderRadius: 15,
                            }}>
                            <View
                                style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: 10,
                                }}>
                                <Text
                                    style={{
                                        fontFamily: 'Janna LT Bold',
                                        color: "#3c2365",
                                        fontSize: 22,
                                    }}>
                                    {'reachUpAcademy'}
                                </Text>
                            </View>
                            <View
                                style={{
                                    alignSelf: 'center',
                                    width: '90%',
                                    borderWidth: 1.5,
                                    borderColor: '#ddd',
                                }}
                            />


                            <TouchableOpacity
                                onPress={() => {

                                }}
                                style={{ paddingHorizontal: 20, paddingVertical: 12 }}>
                                <Text
                                    style={{
                                        fontFamily: 'Janna LT Bold',
                                        color: '#000',
                                        fontSize: 17,
                                        textAlign: 'center',
                                    }}>
                                    Are you sure to confirm the activity..?
                                </Text>
                            </TouchableOpacity>


                            <View
                                style={{
                                    alignSelf: 'center',
                                    width: '90%',
                                    borderWidth: 1.5,
                                    borderColor: '#ddd',
                                }}
                            />

                            <View
                                style={{
                                    alignItems: 'center',
                                    justifyContent: "space-around",
                                    marginTop: 7,
                                    flexDirection: "row"
                                }}>
                                <TouchableOpacity
                                    style={{
                                        alignItems: 'center', justifyContent: 'center'
                                    }}
                                    onPress={() => {
                                        this.update_check()

                                    }}>
                                    <Text
                                        style={{
                                            fontFamily: 'Janna LT Bold',
                                            color: '#00cd7b',
                                            fontSize: 20,
                                        }}>
                                        Confirm
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{
                                        alignItems: 'center', justifyContent: 'center'
                                    }}
                                    onPress={() => {
                                        this.setState({ modalconfirm: false })

                                    }}>
                                    <Text
                                        style={{
                                            fontFamily: 'Janna LT Bold',
                                            color: '#f00',
                                            fontSize: 20,
                                        }}>
                                        Cancle
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>













            </>

        )
    }
}
