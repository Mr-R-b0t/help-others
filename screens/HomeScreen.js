import { View, Image, TextInput,  TouchableOpacity,  Text } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {UserIcon, ChevronDownIcon, MagnifyingGlassIcon,  Cog6ToothIcon, MapIcon} from "react-native-heroicons/outline"





const HomeSceen = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, [])

  return (
    <View className="flex-1 bg-white">
    <SafeAreaView className="bg-white pt-5">
      <View className="flex-row pb-3 items-center mx-4 space-x-2 px-1">
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Image source={{uri: "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png"}} className=" h-7 w-7 bg-gray-300 p-4 rounded-full" />
        </TouchableOpacity>
        <View className="flex-1 mx-1">
        <Text className="font-bold text-3xl">Help Others<ChevronDownIcon size={20} className="ml-2"/></Text>
        </View>
        <MapIcon className="ml-2" size={35} onPress={() => navigation.navigate('Map')}/>
      </View>
      <View className="flex-row items-center space-x-2 pb-2 mx-4 px-1" >
        <View className="flex-row flex-1 space-x-2 bg-gray-200 p-3">
        <MagnifyingGlassIcon size={20} className="ml-2"/>
        <TextInput placeholder="Search" keyboardType='default' className="text-base flex-1"/>
        </View>
        <Cog6ToothIcon size={35} className="ml-2" onPress={() => navigation.navigate('Settings')}/>
      </View>

      <View className="flex-row justify-center pd-10 py-10">
        <TouchableOpacity  className="bg-blue-500 rounded-3xl py-2 px-4 text-white text-center">
        <Text className="font-bold mx-2 py-2  items-center text-7xl">S O S</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
    </View>
  
  );
};

export default HomeSceen