

import * as React from 'react';
import { View, StyleSheet, Dimensions, StatusBar, Text, TouchableOpacity } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Absence from "./Absence"
import Student_list from "./Student_list"

import {SIZES} from '../constants'







const initialLayout = { width: SIZES.width };


export default function TabViewExample({ navigation }) {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: '1', title: 'Student' },
    { key: '2', title: 'Attendance' },

  ]);
  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: '#f8bb08' }}
      style={{ backgroundColor: '#3c2365' }}
    />
  );


  const FirstRoute = () => (
    <Student_list navigation={navigation} />


  );

  const SecondRoute = () => (
    < Absence navigation={navigation} />

  );


  

  const renderScene = SceneMap({
    1: FirstRoute,
    2: SecondRoute,

  });

  return (
    <>

      <StatusBar
        backgroundColor='#3c2365' barStyle='light-content'></StatusBar>
      <View style={{
        height: 90,
        width: '100%',
        backgroundColor: '#3c2365',
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 30,
        justifyContent: "center"
      }}>

        <Text style={{
          fontSize: 25,
          fontWeight: 'bold',
          // color: '#fff',
          color: "#f8bb08"
        }}>Reach Up</Text>
      </View>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        style={{ backgroundColor: "#FFF" }}


      />


    </>
  );
}






