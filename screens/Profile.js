import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronDownIcon, HomeIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import { appwriteClient } from "../src/actions";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../redux/actions";
import { Store } from "../redux/store";
import { Account, Avatars, Storage, InputFile } from "appwrite";
import { TouchableWithoutFeedback } from "react-native";
import * as ImagePicker from "expo-image-picker";




 const API_URL = "https://appwrite.le-app.dev/v1";
 const PROJECT_ID = "63b6a0ca89fafa3f0baa";




const ProfileScreen =  () => {
  const account = new Account(appwriteClient);
  const storage = new Storage(appwriteClient);
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const BUCKET_ID = "63b6f85cc0a36c6d525c";
  const [userdata, setUserdata] = React.useState(null);
  const [avatarUrl, setAvatarUrl] = React.useState(null);
  const [userStatus, setUserStatus] = React.useState(null);


  const getAccount = async () => {
    if (!userdata) {
      await account.get().then( 
        async (response) =>  {
          console.log(response);
          setUserdata(response);
          setUserStatus(response.prefs.status);
        },
        (error) => {
          console.log(error);
        }
      ) 
    }
  };

  const logOut = () => {
    const account = new Account(appwriteClient);
    account.deleteSession("current").then(
      (response) => {
        console.log(response);
        navigation.navigate("Login");
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const getAvatar = async () => { 
    if(!avatarUrl){
       const promise = storage.getFilePreview(
         BUCKET_ID,
         "63b715b4c671c92fc608"
       );
      console.log("promise : "+promise)
      setAvatarUrl(promise)}
  };


console.log("avatarUrl "+avatarUrl)
getAccount();
getAvatar();
  return (
    <SafeAreaView>
      <View className="flex-row pb-3 items-center mx-4 space-x-2 px-1">
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
      <View className="flex  items-center justify-center py-16">
        <TouchableWithoutFeedback onPress={() => navigation.navigate("upload")}>
          <Image
            source={{
              uri: avatarUrl
                ? avatarUrl
                : "https://png.pngtree.com/png-clipart/20210915/ourmid/pngtree-user-avatar-login-interface-abstract-blue-icon-png-image_3917504.jpg",
            }}
            className="h-40 w-40 rounded-full"
          />
        </TouchableWithoutFeedback>
      </View>
      <View className="flex items-center justify-center py-10">
        <Text className="text-xl font-bold">Email : {userdata?.email} </Text>
      </View>
      <View className="flex  items-center justify-center py-0">
        <Text className="text-xl font-bold">User info : {userdata?.name}</Text>
      </View>
      <View className="flex  items-center justify-center py-0">
        <Text className="text-xl font-bold">Status : {userStatus}</Text>
      </View>
      <View className="flex-1 items-center justify-center py-20">
        <TouchableOpacity
          onPress={logOut}
          className="bg-blue-700 rounded-md h-10 w-96"
        >
          <Text className="text-3xl text-center font-bold">Log of</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );

};

export default ProfileScreen;

styles = StyleSheet.create({
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
