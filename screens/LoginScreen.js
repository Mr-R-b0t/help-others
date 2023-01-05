import { StyleSheet, Text, View, TouchableOpacity, TextInput } from "react-native";
import React, { useState, useLayoutEffect, useEffect } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";
import { ChevronDownIcon, HomeIcon } from "react-native-heroicons/outline";
import { SafeAreaView } from "react-native-safe-area-context";

import { setStatusBarNetworkActivityIndicatorVisible } from "expo-status-bar";
import { Button, Input, Image } from "@rneui/themed";
import { appwriteClient } from "../src/actions";
import { Account } from "appwrite";
import LottieView from "lottie-react-native";

const SignIn = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  const [user, setUser] = useState();
  const [initializing, setInitializing] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    const account = new Account(appwriteClient)
    const promise = account.createEmailSession(email, password)
  
    promise.then(
      (response) => {
        console.log(response);
        navigation.navigate("Home");
      }, promise.catch(
        (error) => {
          console.log(error);
          if (error.code == 401) {
            alert("Invalid Credentials")
        }
      })
      
    )   
  };



  return (
    <SafeAreaView>
      <View className="flex-row pb-3 items-center mx-4 space-x-2 px-1">
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Image
            source={{
              uri: "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png",
            }}
            className=" h-7 w-7 bg-gray-300 p-4 rounded-full"
          />
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

      <KeyboardAwareScrollView
        contentCotainerStyle={styles.container}
        className="pt-6"
      >
        <View style={{ marginVertical: 20 }}>
          <View style={styles.imageContainer}>
            <LottieView
              source={require("../assets/lottie/login.json")}
              autoPlay
              loop
              style={{ width: 175, height: 175, alignSelf: "center" }}
            />
          </View>
          <Text style={styles.signupText}>Log In</Text>
          <View style={{ marginHorizontal: 24 }}>
            <Text style={{ fontSize: 16, color: "#8e93a1" }}>EMAIL</Text>
            <TextInput
              style={styles.signupInput}
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                setInlineValidations({
                  ...inlineValidations,
                  emailNotValid: !validateIsEmail(text),
                });
              }}
              autoCompleteType="email"
              keyboardType="email-address"
            />
          </View>
          <View style={{ marginHorizontal: 24 }}>
            <Text style={{ fontSize: 16, color: "#8e93a1" }}>PASSWORD</Text>
            <TextInput
              style={styles.signupInput}
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
              autoComplteType="password"
            />
          </View>
          <TouchableOpacity onPress={handleSubmit} style={styles.buttonStyle}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  signupText: {
    fontSize: 30,
    textAlign: "center",
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
    textAlign: "center",
    color: "#fff",
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  imageContainer: { justifyContent: "center", alignItems: "center" },
  imageStyles: { width: 100, height: 100, marginVertical: 20 },
});

export default SignIn;
