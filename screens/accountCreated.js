import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useLayoutEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import LottieView from 'lottie-react-native'
import { useNavigation } from '@react-navigation/native'
import { ChevronDownIcon, HomeIcon } from 'react-native-heroicons/outline'

const AccountCreated = () => {

    const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  return (
    <SafeAreaView className="bg-white">
      <View className="flex-row pb-3 items-center mx-4 space-x-2 px-1 bg-white">
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
         
        </TouchableOpacity>
        <View className="flex-1 mx-1">
          <Text className="font-bold text-3xl">
            Help Others
            <ChevronDownIcon size={20} className="ml-2" />
          </Text>
        </View>
        <HomeIcon
          className="ml-2"
          size={35}
          onPress={() => navigation.navigate("Home")}
        />
      </View>
        <View className="flex  items-center justify-center pt-20">
      <LottieView 
        source={require("../assets/lottie/account-created.json")}
        autoPlay
        style={{ width: 300, height: 300, alignSelf: "center" }}
      />
        </View>
      <View  className="py-80">
        <TouchableOpacity
          onPress={() => navigation.navigate("Profile")}
          style={styles.buttonStyle}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
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
    textAlign: "center",
    color: "#fff",
    textTransform: "uppercase",
    fontWeight: "bold",
  },
})

export default AccountCreated