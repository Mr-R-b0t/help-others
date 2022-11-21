import { View, Text } from 'react-native'
import React from 'react'

const customHeaderHomeButton = () => {
  return (

      <View className="flex-row pb-3 items-center mx-4 space-x-2 px-1">
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Image source={{ uri: "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png" }} className=" h-7 w-7 bg-gray-300 p-4 rounded-full" />
        </TouchableOpacity>
        <View className="flex-1 mx-1">
          <Text className="font-bold text-3xl">Help Others<ChevronDownIcon size={20} className="ml-2" /></Text>
        </View>
        <HomeIcon className="ml-2" size={35} onPress={() => navigation.navigate('Home')} />
      </View>

  )
}

export default customHeaderHomeButton