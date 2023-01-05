import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState, useLayoutEffect } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";
import { ChevronDownIcon, HomeIcon } from "react-native-heroicons/outline";
import { SafeAreaView } from "react-native-safe-area-context";


import { appwriteClient } from "../src/actions";
import { Account, ID } from "appwrite";

import LottieView from "lottie-react-native";

const SignUp = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [user, setUser] = React.useState();
  const [inlineValidations, setInlineValidations] = useState(false);
  const account = new Account(appwriteClient);

  const handleSubmit = async () => {
    const emailLowerCase = email.toLowerCase();

    if (
      firstName === "" ||
      lastName === "" ||
      emailLowerCase === "" ||
      password === "" ||
      status === "" || !validateIsEmail(email) || password.length < 8)
    {
      alert("All fields are required");
    }
     else{
    const account = new Account(appwriteClient);
    account
      .create(ID.unique(), email, password, firstName + " " + lastName)
      .then(
        (response) => {
          console.log(response);
          account.updatePrefs({ status: { status } });
          account.createEmailSession(email, password).then(
             (response) => {
               console.log(response);
               navigation.navigate("accountCreated");
             },
             (error) => {
               console.log(error);
             }
           );
        },
        (error) => {
          console.log(error);
        }
      );
    } 
  };


 /*  const handleSubmit = async () => {
    const account = new Account(appwriteClient);
    const promise = account.createEmailSession('toxicsed@gmail.com', 'Laurent159753');


promise.then(function (response) {
    console.log(response);
}, function (error) {
    console.log(error);
});
  }; */

  function validateIsEmail(email) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
  }

  if (!user) {
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
                source={require("../assets/lottie/create_account.json")}
                autoPlay
                loop
                style={{ width: 175, height: 175, alignSelf: "center" }}
              />
            </View>
            <Text style={styles.signupText}>Register</Text>
            <View style={{ marginHorizontal: 24 }}>
              <Text style={{ fontSize: 16, color: "#8e93a1" }}>First name</Text>
              <TextInput
                style={styles.signupInput}
                value={firstName}
                onChangeText={(text) => setfirstName(text)}
              />
            </View>
            <View style={{ marginHorizontal: 24 }}>
              <Text style={{ fontSize: 16, color: "#8e93a1" }}>Last name</Text>
              <TextInput
                style={styles.signupInput}
                value={lastName}
                onChangeText={(text) => setlastName(text)}
              />
            </View>
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
            <View style={{ marginHorizontal: 24 }}>
              <Text style={{ fontSize: 16, color: "#8e93a1" }}>STATUS</Text>
              <TextInput
                style={styles.signupInput}
                value={status}
                onChangeText={(text) => setStatus(text)}
              />
            </View>
            <TouchableOpacity onPress={handleSubmit} style={styles.buttonStyle}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }

  if (user) {
    return (
      <SafeAreaView>
        <View>
          <Text className="text-center pt-72">Account Created</Text>
          <Text className="text-center">{user}</Text>
        </View>
      </SafeAreaView>
    );
  }
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

export default SignUp;
