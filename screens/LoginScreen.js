import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState, useLayoutEffect, useEffect } from 'react'
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from '@react-navigation/native';
import { ChevronDownIcon, HomeIcon } from "react-native-heroicons/outline"
import {SafeAreaView} from 'react-native-safe-area-context';
import auth from '@react-native-firebase/auth';
import { setStatusBarNetworkActivityIndicatorVisible } from 'expo-status-bar';
import { Button, Input, Image } from '@rneui/themed';



const SignIn = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, [])
  const [user, setUser] = useState();
  const [initializing, setInitializing] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const handleSubmit = async () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(userCredential => {
        const user = userCredential.user;
        console.log('Logged in with user:', user.email);
      })
      .catch(error => alert(error.message));
      if(user){
        navigation.navigate('Home')
      }
    }

  function onAuthStateChanged(user){
    setUser(user);
    console.log('Stated changed with user:', user?.email);

    if(initializing) setInitializing(false)
  }
  useEffect(() => {
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
    
      <KeyboardAwareScrollView contentCotainerStyle={{flex: 1, justifyContent:'center'}} >
        <View style={{ marginVertical: 100 }}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png" }} style={styles.imageStyles} />
          </View>
          <Text style={styles.signupText}>Sign Up</Text>
          <View style={{ marginHorizontal: 24 }}>
            <Text style={{ fontSize: 16, color: '#8e93a1' }}>EMAIL</Text>
            <Input style={styles.signupInput} value={email} onChangeText={text => setEmail(text)} autoCompleteType="email" keyboardType="email-address" />
          </View>
          <View style={{ marginHorizontal: 24 }}>
            <Text style={{ fontSize: 16, color: '#8e93a1' }}>PASSWORD</Text>
            <Input style={styles.signupInput} value={password} onChangeText={text => setPassword(text)} secureTextEntry={true} autoComplteType="password" />
          </View>
          <Button  title="Sign In" onPress={handleSubmit} style={styles.buttonStyle} />          
          <Text style={{ fontSize: 12, textAlign: 'center' }} onPress={() => navigation.navigate('Sign')}>Not yet registered? Sign Up</Text>
          <Text style={{ fontSize: 12, textAlign: 'center', marginTop: 10 }} onPress={() => navigation.navigate('')}>Forgot Password?</Text>
        </View>
    
              </KeyboardAwareScrollView >
          </SafeAreaView >
          )
      }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  signupText: {
    fontSize: 30,
    textAlign: 'center'
  },
  signupInput: {
    borderBottomWidth: 0,
    height: 48,
    borderBottomColor: "#8e93a1",
    marginBottom: 5,
  },
  buttonStyle: {
    height: 100,
    width: 390,
    justifyContent: 'center',
    borderRadius: 15,
    marginBottom: 15,
    marginHorizontal: 20
  
  },
  buttonRegister:{

    height: 100,
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    marginBottom: 15,
    marginHorizontal: 10
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

export default SignIn