import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    AppRegistry,
    TouchableOpacity,
    Linking,

    ToastAndroid
} from 'react-native'
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import axios from 'axios';
import Constants from "../constants/Constants"
export default class QR_absence extends React.Component {
    constructor() {
        super();
        this.state = {
            qr_data: "",
            teacher_id: ""
        }
    }
    componentDidMount() {
        let teacher_id = this.props.navigation.getParam("teacher_id")
        this.setState({ teacher_id: teacher_id })
    }
    ifScaned = e => {
        // console.log(e.data)
        let DataToSend = {
            teacher_id: this.state.teacher_id,
            qr_data: e.data
        }
        console.log(DataToSend.qr_data)
        axios.post(Constants.Domain + "save_teacher_attendance.php", DataToSend).then(res => {
            if (res.status == 200) {
                console.log(res.data)
                if (res.data == "success")
                    // alert("Done")
                    // start_befor

                    ToastAndroid.showWithGravityAndOffset(
                        'Done',
                        ToastAndroid.SHORT,
                        ToastAndroid.BOTTOM,
                        20,
                        20,
                    );

            } else {
                // alert("error")
                ToastAndroid.showWithGravityAndOffset(
                    'Something Error',
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                    20,
                    20,
                );
            }
        })



    }





    render() {
        return (
            <View style={{ flex: 1 }} >
                <StatusBar
                    backgroundColor='#3c2365' barStyle='light-content'></StatusBar>

                <QRCodeScanner
                    containerStyle={{ backgroundColor: '#fff' }}
                    onRead={this.ifScaned}
                    reactivate={true}
                    permissionDialogMessage="take Absence"
                    reactivateTimeout={10}
                    showMarker={true}
                    markerStyle={{ backgroundColor: 'transparent', borderRadius: 30, }}
                    bottomContent={
                        <TouchableOpacity style={{
                            height: 70, width: 170,
                            backgroundColor: "#3c2365", marginTop: 20, borderRadius: 10,
                            justifyContent: 'center', alignItems: 'center'
                        }}>
                            <Text style={{ fontSize: 20, color: '#fff' }} >Scan QR Code</Text>
                        </TouchableOpacity>
                    }
                />





            </View>
        );
    }
}

// const styles = StyleSheet.create({
//     centerText: {
//         flex: 1,
//         fontSize: 18,
//         padding: 32,
//         color: '#777'
//     },
//     textBold: {
//         fontWeight: '500',
//         color: '#000'
//     },
//     buttonText: {
//         fontSize: 21,
//         color: 'rgb(0,122,255)'
//     },
//     buttonTouchable: {
//         padding: 16
//     }
// });

