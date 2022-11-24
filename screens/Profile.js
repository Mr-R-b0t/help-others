import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
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

  const handleSubmit = async () => {
  auth()
    .signOut()
    .then(() => 
    console.log('User signed out!'));
    navigation.navigate('Login')
  }


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
      <View className="flex  items-center justify-center py-20">
        <Image source={{ uri: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" }} className="h-40 w-40 rounded-full" />
        </View>
      <View className="flex-1 items-center justify-center py-10">

          <TouchableOpacity onPress={handleSubmit} style={styles.buttonStyle}>
            <Text style={styles.buttonText}>Log of</Text>

          </TouchableOpacity>
        </View>

    </SafeAreaView>
  )
}

export default ProfileScreen

styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  signupText: {
    fontSize: 30,
    textAlign: 'center'
  },
  signupInput: {
    borderBottomWidth: 0.5,
    height: 48,
    borderBottomColor: "#8e93a1",
    marginBottom: 30,
  },
  buttonStyle: {
    backgroundColor: "darkmagenta",
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    marginHorizontal: 15,
    borderRadius: 15,
  },
  buttonText: {
    fontSize: 20,
    textAlign: 'center',
    color: '#fff',
    textTransform: 'uppercase',
    fontWeight: 'bold'
  },
  imageContainer: { justifyContent: "center", alignItems: "center" },
  imageStyles: { width: 100, height: 100, marginVertical: 20 }
})