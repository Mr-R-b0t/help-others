import { View, Text, Image, TouchableOpacity} from 'react-native'
import React from 'react'
import { StarIcon } from 'react-native-heroicons/outline'

const MovieCard = ({
    id,
    imgUrl,
    title,
    description,
    rating,
    releaseDate,
    genre,
    duration,
}) => {
  return (
    <TouchableOpacity className="flex relative mr-3 shadow">
      <Image source={{uri: imgUrl}} className="shadow-lg rounded w-56 h-96 align-middle border-none"/>
      <View className="px-4 pb-8 flex-1 ">
      <Text className="absolute  bottom-1 self-center  text-black align-middle text-lg font-bold">{title}</Text>
      <View className="flex-row items-center space-x-1 ">
        <StarIcon color="blue" opacity={0.5} size={22} />
        <Text className="flex text-xs text-gray-500 p-0 align-middle">{rating}</Text>
        <Text className="flex text-base text-gray-800 px-7 slef-center align-middle">{genre}</Text>
        <Text className="flex text-base text-red-500 px-1 align-middle">{duration}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default MovieCard