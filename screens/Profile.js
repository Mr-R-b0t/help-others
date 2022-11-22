import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import { ChevronDownIcon, HomeIcon } from 'react-native-heroicons/outline'
import { useNavigation } from '@react-navigation/native'
import auth from '@react-native-firebase/auth';



const ProfileScreen = () => {

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, [])

  const [user, setUser] = React.useState();
  const [initializing, setInitializing] = React.useState(true);

  function onAuthStateChanged(user) {
    setUser(user);


    if (initializing) setInitializing(false)
  }
  React.useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) return null;

  return (
    <SafeAreaView>
      <View className="flex-row pb-3 items-center mx-4 space-x-2 px-1">
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Image source={{ uri: "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png" }} className=" h-7 w-7 bg-gray-300 p-4 rounded-full" />
        </TouchableOpacity>
        <View className="flex-1 mx-1">
          <Text className="font-bold text-3xl">Help Others<ChevronDownIcon size={20} className="ml-2" /></Text>
        </View>
        <HomeIcon className="ml-2" size={35} onPress={() => navigation.navigate('Home')} />
      </View> 

      <View className="flex-1 items-center justify-center">
        <View className="flex-row items-center justify-center">
          
        </View>
        </View>
    </SafeAreaView>
  )
}

export default ProfileScreen