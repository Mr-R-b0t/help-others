import { View, Text, Image } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {ChevronDownIcon, Cog6ToothIcon, HomeIcon, MagnifyingGlassIcon, UserIcon } from 'react-native-heroicons/outline'
import { useNavigation } from '@react-navigation/native'


const LoginScreen = () => {
 
    const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, [])
  return (
  <SafeAreaView className="bg-white pt-5">
    <View className="flex-row pb-0 items-center mx-4 space-x-2 px-1">
        <Image source={{uri:  "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png"}} className=" h-7 w-7 bg-gray-300 p-4 rounded-full" onPress={() => navigation.navigate('Login')}/>
        <View className="flex-1 mx-1">
        <Text className="font-bold text-3xl">Help Others<ChevronDownIcon size={20} className="ml-2"/></Text>    
        </View>
        <HomeIcon size={35} className="ml-2" onPress={() => navigation.navigate('Home')}/>
    </View>
    </SafeAreaView>
  )
}

export default LoginScreen