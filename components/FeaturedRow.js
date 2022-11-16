import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { ArrowRightIcon } from 'react-native-heroicons/outline'
import MovieCard from './MovieCard'

const FeaturedRow = ({id, title, description}) => {
  return (
    <View>
    <View className="mt-4 flex-row items-center justify-between px-4">
      <Text className="font-bold text-lg">{title}</Text>
      <ArrowRightIcon  />
    </View>
    <Text className="text-xs text-gray-500 px-4">{description}</Text>
    <ScrollView
    horizontal 
    contentContainerStyle={{
        paddingHorizontal: 15,
    }}
    showsHorizontalScrollIndicator={false}
    className="pt-4"
    >
        <MovieCard 
        id={123}
        imgUrl  = 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/5mi3aRl16yKmfpQJMzvqN5TXkdA.jpg'
        title = "Testing 1"
        description = "Testing"
        rating = {5}
        releaseDate = "2021-01-01"
        genre = "Action"
        duration = "1H30"/>
        
        <MovieCard 
        id={123}
        imgUrl  = 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/lPmLrzVy5uGz7nNOtruirVz0Q38.jpg'
        title = "Testing 1"
        description = "Testing"
        rating = {5}
        releaseDate = "2021-01-01"
        genre = "Action"
        duration = "1H30"/>

        <MovieCard 
        id={123}
        imgUrl  = 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/6dK9T9qx1lp64sKoOkncDyy4Uhg.jpg'
        title = "Testing 1"
        description = "Testing"
        rating = {5}
        releaseDate = "2021-01-01"
        genre = "Action"
        duration = "1H30"/>
        
        <MovieCard 
        id={123}
        imgUrl  = 'https://links.papareact.com/4u4'
        title = "Testing 1"
        description = "Testing"
        rating = {5}
        releaseDate = "2021-01-01"
        genre = "Action"
        duration = "1H30"/>

    </ScrollView>
    </View>
  )
}

export default FeaturedRow