import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { View, Text, Image } from 'react-native'
import { ChevronDownIcon, HomeIcon } from 'react-native-heroicons/outline';
import { SafeAreaView } from 'react-native-safe-area-context'




const SettingsScreen = () => {

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, [])


  
    return (
    
      <SafeAreaView >
      <View className="flex-row pb-3 items-center mx-4 space-x-2 px-1">
          <Image source={{ uri: "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png" }} className=" h-7 w-7 bg-gray-300 p-4 rounded-full" />
        <View className="flex-1 mx-1">
          <Text className="font-bold text-3xl">Help Others<ChevronDownIcon size={20} className="ml-2" /></Text>
        </View>
        <HomeIcon className="ml-2" size={35} onPress={() => navigation.navigate('Home')} />
      </View> 

      <View className="flex  items-center justify-center py-20">
        <Text className="text-3xl font-bold">Settings</Text>
        </View>
    </SafeAreaView>
  )
}

export default SettingsScreen