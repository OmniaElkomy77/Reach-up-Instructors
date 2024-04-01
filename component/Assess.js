import React from "react"
import {
    View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback,
    ActivityIndicator, StatusBar, Dimensions, ScrollView, Modal, AsyncStorage, ToastAndroid
} from "react-native"
const { width, height } = Dimensions.get('window');
import Constants from "../constants/Constants"
import NetInfo from '@react-native-community/netinfo';
import axios from "axios";
import { RadioButton } from 'react-native-paper';
export default class Assess extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            student_report: this.props.navigation.getParam("student_report"),
            student_id: this.props.navigation.getParam("student_id"),
            question1: "",
            question2: "",
            question3: "",
            note: "",
            HW: "",
            DIC: "",
            RH: "",
            BO: "",
            Participate: "",
            points: "",
            units: "",
            test: "",
            modalVisible: false,
            text_wrong: "",
            connection_Status: '',
            day_to_edit: this.props.navigation.getParam("day_to_edit")
        }
    }

    componentDidMount() {
        // alert(JSON.stringify(this.state.day_to_edit))
        let student_report = this.state.student_report
        this.state.HW = student_report.h_w
        this.state.DIC = student_report.dic
        this.state.RH = student_report.r_sh
        this.state.BO = student_report.bo
        this.state.Participate = student_report.participate
        this.state.points = student_report.points
        this.state.units = student_report.unit
        this.state.note = student_report.note
        this.state.test = student_report.test
        // this.state.question1 = student_report.qs_1_grammer
        // this.state.question2 = student_report.qs_2_dictation
        // this.state.question3 = student_report.qs_3_homework

        const unsubscripe = NetInfo.addEventListener(state => {
            this.setState({
                connection_Status: state.isConnected ? "Online" : "Offline"
            })
            if (!state.isConnected) {

            }
        })
        return unsubscripe








    }
    componentWillUnmount() {
        let refirsh = this.props.navigation.getParam("refirsh")
        refirsh()
    }


    sumbit_Assess() {
        if (this.state.HW == "" || this.state.DIC == "" || this.state.RH == "" || this.state.BO == "" || this.state.Participate == "" ||
            this.state.points == "" || this.state.units == "") {
            ToastAndroid.showWithGravityAndOffset(
                "You Must Fill in The Questions",
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                20,
                20
            )
        } else {


            let DataToSend = {
                h_w: this.state.HW,
                dic: this.state.DIC,
                r_sh: this.state.RH,
                bo: this.state.BO,
                participate: this.state.Participate,
                points: this.state.points,
                unit: this.state.units,
                note: this.state.note,
                test: this.state.test,
                teacher_id: this.props.navigation.getParam("teacher_id"),
                student_id: this.state.student_id,
                day_to_edit: this.state.day_to_edit
            }
            // console.log(JSON.stringify(DataToSend.day_to_edit))
            axios.post(Constants.Domain + "new_way/save_student_report.php", DataToSend).then(res => {
                if (res.status == 200) {
                    alert(res.data)
                    if (res.data == "success") {

                        ToastAndroid.showWithGravityAndOffset(
                            "The Student Has Been Successfully Evaluated",
                            ToastAndroid.SHORT,
                            ToastAndroid.BOTTOM,
                            20,
                            20
                        );
                    } else {
                        ToastAndroid.showWithGravityAndOffset(
                            "Something Error",
                            ToastAndroid.SHORT,
                            ToastAndroid.BOTTOM,
                            20,
                            20
                        );
                    }
                }
            })
        }


    }



    render() {
        return (
            <View style={{ backgroundColor: "#eee", flex: 1 }}>
                <ScrollView>
                    <StatusBar
                        backgroundColor='#3c2365' barStyle='light-content'></StatusBar>
                    <View style={{
                        height: 100, backgroundColor: "#3c2365",
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingTop: 10


                    }}>

                        <Text style={{ color: '#fff', fontSize: 20, fontWeight: "700" }}>Rating</Text>

                    </View>

                    {this.state.connection_Status == "Online" ? (
                        <>

                            <View style={{
                                backgroundColor: "#eee",
                                height: 80,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: "space-around",
                                marginTop: 10,
                                paddingBottom: 10,
                                borderBottomWidth: 1,
                                borderColor: "#000",
                                borderStyle: 'dashed'
                            }}>
                                <View style={{
                                    justifyContent: "space-around",
                                    alignItems: "center",
                                    height: 70,
                                    width: 140,
                                    // backgroundColor: "#857"
                                }}>
                                    <Text style={{ color: "#000" }}>Revision sheet</Text>
                                    <TextInput style={{
                                        height: 50,
                                        backgroundColor: "#fff",
                                        width: 100,
                                        borderRadius: 25,
                                        textAlign: 'center',
                                        color: "#000"
                                    }}
                                        // keyboardType="number-pad"
                                        value={this.state.RH}
                                        onChangeText={(value) => {
                                            this.setState({ RH: value })
                                        }}
                                    />


                                </View>
                                <View style={{
                                    justifyContent: "space-around",
                                    alignItems: "center",
                                    height: 70,
                                    width: 140,
                                    // backgroundColor: "#857"
                                }}>
                                    <Text style={{ color: "#000" }}>Dictation</Text>
                                    <TextInput style={{
                                        height: 50,
                                        backgroundColor: "#fff",
                                        width: 100,
                                        borderRadius: 25,
                                        textAlign: 'center',
                                        color: "#000"
                                    }}
                                        // keyboardType="number-pad"
                                        value={this.state.DIC}
                                        onChangeText={(value) => {
                                            this.setState({ DIC: value })
                                        }}
                                    />


                                </View>

                                <View style={{
                                    justifyContent: "space-around",
                                    alignItems: "center",
                                    height: 70,
                                    width: 140,

                                    // backgroundColor: "#857"
                                }}>
                                    <Text style={{ color: "#000" }}>Homework</Text>
                                    <TextInput style={{
                                        height: 50,
                                        backgroundColor: "#fff",
                                        width: 100,
                                        borderRadius: 25,
                                        textAlign: 'center',
                                        color: "#000"
                                    }}
                                        // keyboardType="number-pad"
                                        value={this.state.HW}
                                        onChangeText={(value) => {
                                            this.setState({ HW: value })
                                        }}
                                    />


                                </View>

                            </View>


                            <View style={{
                                backgroundColor: "#eee",
                                height: 80,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: "space-around",
                                marginTop: 10,
                                paddingBottom: 10,
                                borderBottomWidth: 1,
                                borderColor: "#000",
                                borderStyle: 'dashed'
                            }}>
                                <View style={{
                                    justifyContent: "space-around",
                                    alignItems: "center",
                                    height: 70,
                                    width: 140,
                                    // backgroundColor: "#857"
                                }}>
                                    <Text style={{ color: "#000" }}>Points</Text>
                                    <TextInput style={{
                                        height: 50,
                                        backgroundColor: "#fff",
                                        width: 100,
                                        borderRadius: 25,
                                        textAlign: 'center',
                                        color: "#000"
                                    }}
                                        // keyboardType="number-pad"
                                        value={this.state.points}
                                        onChangeText={(value) => {
                                            this.setState({ points: value })
                                        }}
                                    />


                                </View>
                                <View style={{
                                    justifyContent: "space-around",
                                    alignItems: "center",
                                    height: 70,
                                    width: 140,
                                    // backgroundColor: "#857"
                                }}>
                                    <Text style={{ color: "#000" }}>Participate</Text>
                                    <TextInput style={{
                                        height: 50, backgroundColor: "#fff",
                                        width: 100,
                                        borderRadius: 25,
                                        textAlign: 'center',
                                        color: "#000"
                                    }}
                                        // keyboardType="number-pad"
                                        value={this.state.Participate}
                                        onChangeText={(value) => {
                                            this.setState({ Participate: value })
                                        }}
                                    />


                                </View>


                                <View style={{
                                    justifyContent: "space-around",
                                    alignItems: "center",
                                    height: 70,
                                    width: 140,
                                    marginRight: 10
                                    // backgroundColor: "#857"
                                }}>
                                    <Text style={{ color: "#000" }}>Units</Text>
                                    <TextInput style={{
                                        height: 50,
                                        backgroundColor: "#fff",
                                        width: 120,
                                        borderRadius: 25,
                                        textAlign: 'center',
                                        color: "#000"
                                    }}
                                        // keyboardType="number-pad"
                                        // multiline={true}
                                        value={this.state.units}
                                        onChangeText={(value) => {
                                            this.setState({ units: value })
                                        }}
                                    />



                                </View>

                            </View>



                            <View style={{
                                backgroundColor: "#eee",
                                height: 80,
                                flexDirection: 'row',
                                // alignItems: "flex-end",

                                justifyContent: "flex-end",
                                marginTop: 10,
                                paddingBottom: 10,
                                borderBottomWidth: 1,
                                borderColor: "#000",
                                borderStyle: 'dashed',
                                // justifyContent: "center"
                            }}>
                                {/* <Text>Bo</Text> */}


                                <View style={{ alignItems: "center", justifyContent: "center" }}>
                                    <Text style={{ color: "#000" }}>Booklet</Text>


                                    <View style={{ flexDirection: "row", borderRadius: 20, }}>

                                        <View style={{
                                            backgroundColor: "#fff", width: 70,
                                            alignSelf: "center", alignItems: "center",
                                            flexDirection: "row",


                                        }}>
                                            <RadioButton
                                                value={this.state.BO}
                                                status={this.state.BO === "Y" ? 'checked' : 'unchecked'}
                                                onPress={() => this.setState({ BO: "Y" })}

                                            />
                                            <Text style={{ color: "#000" }}>Y</Text>
                                        </View>
                                        {/*  */}
                                        <View style={{
                                            backgroundColor: "#fff", width: 70,
                                            alignSelf: "center", alignItems: "center",
                                            flexDirection: "row",
                                            marginRight: 10
                                        }}>
                                            <RadioButton
                                                value={this.state.BO}
                                                status={this.state.BO === "N" ? 'checked' : 'unchecked'}
                                                onPress={() => this.setState({ BO: "N" })}
                                            // background={"#777"}
                                            />
                                            <Text style={{ color: "#000" }}>N</Text>
                                        </View>

                                        {/*  */}

                                    </View>
                                </View>
                            </View>


                            <View style={{
                                backgroundColor: '#eee', padding: 15, justifyContent: 'center',
                                alignItems: 'center', borderStyle: "dashed", borderBottomWidth: 1
                            }}>
                                <Text style={{ color: "#000", fontSize: 15, marginVertical: 10 }}>
                                    Enter your Note here ,please
                                </Text>
                                <TextInput
                                    style={{
                                        backgroundColor: '#fff',
                                        alignSelf: 'center',
                                        borderRadius: 10,
                                        color: "#000",
                                        padding: 10,

                                        width: "95%"
                                    }}
                                    placeholder="Your Note"
                                    multiline={true}
                                    placeholderTextColor={"#999"}
                                    value={this.state.note}
                                    onChangeText={(value) => {
                                        this.setState({ note: value })
                                    }}>

                                </TextInput>
                            </View>



                            <View style={{
                                backgroundColor: '#eee', padding: 15, justifyContent: 'center',
                                alignItems: 'center', borderStyle: "dashed", borderBottomWidth: 1
                            }}>
                                <Text style={{ color: "#000", fontSize: 15, marginVertical: 10 }}>
                                    Test
                                </Text>
                                <TextInput
                                    style={{
                                        backgroundColor: '#fff',
                                        alignSelf: 'center',
                                        borderRadius: 10,
                                        color: "#000",
                                        padding: 10,

                                        width: "95%"
                                    }}
                                    placeholder="Test"
                                    multiline={true}
                                    placeholderTextColor={"#999"}
                                    value={this.state.test}
                                    onChangeText={(value) => {
                                        this.setState({ test: value })
                                    }}>

                                </TextInput>
                            </View>











                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>

                                <TouchableOpacity
                                    onPress={() => {
                                        this.sumbit_Assess()

                                    }} style={{
                                        backgroundColor: "#3c2365",
                                        height: 70, width: 140,
                                        alignSelf: 'center',
                                        justifyContent: 'center',
                                        alignItems: "center",
                                        borderRadius: 20,
                                        marginVertical: 20

                                    }}>
                                    <Text style={{ color: "#fff", fontSize: 18 }}>Submit</Text>

                                </TouchableOpacity>
                            </View>



                        </>

                    ) : (
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





                </ScrollView>



            </View>
        )
    }
}