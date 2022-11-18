import { View, Text, Image, StyleSheet } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ChevronDownIcon, HomeIcon } from 'react-native-heroicons/outline'
import { useNavigation } from '@react-navigation/native'
import MapView from 'react-native-maps';


const MapScreen = () => {
    const navigation = useNavigation();

    useLayoutEffect(() => {
      navigation.setOptions({
        headerShown: false,
      })
    }, [])
    const [mapRegion, setmapRegion] = useState({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });

  return (

    <SafeAreaView className="bg-white pt-5">
    <View className="flex-row pb-0 items-center mx-4 space-x-2 px-1">
        <Image source={{uri:  "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png"}} className=" h-7 w-7 bg-gray-300 p-4 rounded-full" onPress={() => navigation.navigate('Login')}/>
        <View className="flex-1 mx-1">
        <Text className="font-bold text-3xl">Help Others<ChevronDownIcon size={20} className="ml-2"/></Text>    
        </View>
        <HomeIcon size={35} className="ml-2" onPress={() => navigation.navigate('Home')}/>
    </View>
    <View className="flex pt-2 pd-10 space-x-2 space-y-20">
    <View className="flex pb-8  ">
    <MapView
    style={{width: '100%', height: '100%'}}
        region={mapRegion}
      />
    </View>
    </View>

 
    </SafeAreaView>
  )
}




export default MapScreen