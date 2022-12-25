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




 

const ProfileScreen = () => {
  const account = new Account(appwriteClient);
  const storage = new Storage(appwriteClient);
  const avatars = new Avatars(appwriteClient);

  const [image, setImage] = React.useState(null);
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    console.log(result);
    if (!result.canceled) {
      setImage(result.assets[0].uri);
      console.log(result.assets[0].uri)
      console.log(result)
      const user = await account.get();
      storage.createFile(
        "63a5b1c005c9ab4aa883",
        user.$id,
        InputFile.fromPath(result.assets[0].uri)
      );
    }
  };


  const navigation = useNavigation();
  const sotrage = new Storage(appwriteClient);

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const BUCKET_ID = "63a5b1c005c9ab4aa883";
  const [userdata, setUserdata] = React.useState(null);
  const [avatar, setAvatar] = React.useState(null);
  const [avatarUrl, setAvatarUrl] = React.useState(null);

  const getAccount = async () => {
    if (!userdata) {
      await account.get().then( 
        async (response) =>  {
          console.log(response);
          setUserdata(response);
          setAvatar(response.prefs.avatar);
          const url =  sotrage.getFilePreview(BUCKET_ID, avatar, 100, 100)
          setAvatarUrl(url)
        },
        (error) => {
          console.log(error);
        }
      ) 
      

    }
  };

  console.log(avatarUrl)

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

  return (
    getAccount(),
    (
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
          <TouchableWithoutFeedback onPress={pickImage}>
            <Image
              source={{
                uri: "http://localhost/v1/storage/buckets/63a5b1c005c9ab4aa883/files/63a7101651fe1d656a6f/view?project=639cd795da4ad37458f2&mode=admin",
              }}
              className="h-40 w-40 rounded-full"
            />
          </TouchableWithoutFeedback>
        </View>
        <View className="flex items-center justify-center py-10">
          <Text className="text-xl font-bold">Email : {userdata?.email} </Text>
        </View>
        <View className="flex  items-center justify-center py-0">
          <Text className="text-xl font-bold">
            Last name : {userdata?.name}
          </Text>
        </View>
        <View className="flex  items-center justify-center py-0">
          <Text className="text-xl font-bold">
            First name : {userdata?.tName}
          </Text>
        </View>
        <View className="flex  items-center justify-center py-0">
          <Text className="text-xl font-bold">
            First name : {userdata?.prefs.status}
          </Text>
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
    )
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
