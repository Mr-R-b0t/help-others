import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronDownIcon, HomeIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import { appwriteClient } from "../src/actions";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../redux/actions";
import { Store } from "../redux/store";
import { Account, Avatars, Storage } from "appwrite";
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
      const user = await account.get();
      storage.createFile("63a5b1c005c9ab4aa883", user.$id, image);
    }
  };


  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const [userdata, setUserdata] = React.useState(null);

  const getAccount = () => {
    if (!userdata) {
      account.get().then(
        (response) => {
          console.log(response);
          setUserdata(response);
        },
        (error) => {
          console.log(error);
        }
      );
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



  function sendXmlHttpRequest(data) {
    const xhr = new XMLHttpRequest();

    return new Promise((resolve, reject) => {
      xhr.onreadystatechange = (e) => {
        if (xhr.readyState !== 4) {
          return;
        }
        console.log("xhr.status", xhr);

        if (xhr.status === 201) {
          resolve(JSON.parse(xhr.response));
        } else {
          reject("Request Failed");
        }
      };

      xhr.open("POST", `${API_URL}/v1/storage/buckets/${BUCKET_ID}/files/`);
      xhr.withCredentials = true;
      // xhr.setRequestHeader("content-type", "multipart/form-data");
      xhr.setRequestHeader("X-Appwrite-Project", PROJECT_ID);
      xhr.setRequestHeader("X-Appwrite-Response-Format", "0.15.0");
      xhr.setRequestHeader("x-sdk-version", "appwrite:web:9.0.1");
      xhr.send(data);
    });
  }

  const uploadImage = async () => {
    let filename = image.split("/").pop();

    // Infer the type of the image
    let match = /\.(\w+)$/.exec(image);
    let type = match ? `image/${match[1]}` : `image`;

    console.log("_--------------------------------------_");
    let formData = new FormData();
    formData.append("fileId", "unique()");
    formData.append("file", {
      uri: image,
      name: filename,
      type,
    });
    // formData.append("read", "");
    // formData.append("write", "");

    console.log("formData", formData);
    await sendXmlHttpRequest(formData).then(
      function (response) {
        console.log("response", response); // Success
        setSucc(true);
      },
      function (error) {
        console.log("error", error); // Failure
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
                uri: image?image:userdata?.avatar
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
            onPress={() => navigation.navigate("account")}
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
