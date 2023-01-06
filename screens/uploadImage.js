import {
  Animated,
  Button,
  Easing,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityBase,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Client, Account } from "appwrite";
import { appwriteClient } from "../src/actions/index";
import { SafeAreaView } from "react-native-safe-area-context";

import LottieView from "lottie-react-native";
import { ChevronDownIcon, Cog6ToothIcon, MapIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";

const API_URL = "https://appwrite.le-app.dev/v1";
const PROJECT_ID = "63b6a0ca89fafa3f0baa";
const BUCKET_ID = "63b6f85cc0a36c6d525c";

const account = new Account(appwriteClient);

export default function UploadImage() {
  const [image, setImage] = useState(null);
  const [succ, setSucc] = useState(false);
  const login = () => {
    const promise = account.get();

    promise.then(
      function (response) {
        console.log(response); // Success
      },
      function (error) {
        console.log(error); // Failure
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

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const uploadImage = async () => {
    let filename = (await account.get()).$id.split("/").pop();
    console.log("filename", filename);

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
    formData.append("read", "");
    formData.append("write", "");

    console.log("formData", formData);
    await sendXmlHttpRequest(formData).then(
      function (response) {
        console.log("response", response); // Success
        account.updatePrefs({ avatar: response.$id });
        setSucc(true);
      },
      function (error) {
        console.log("error", error); // Failure
      }
    );
  };

  const random = async () => {
    login();
    pickImage();
  };

   const animationProgress = useRef(new Animated.Value(0));

   useEffect(() => {
     Animated.timing(animationProgress.current, {
       toValue: 1,
       duration: 5000,
       easing: Easing.linear,
       useNativeDriver: false,
     }).start();
   }, []);

     const navigation = useNavigation();


  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);



const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: "darkmagenta",
    height: 50,
    width: 200,
    marginBottom: 20,
    justifyContent: "center",
    marginHorizontal: 15,
    borderRadius: 15,
    marginTop: 20,
  },
}); 
   if(!image){
    return (
      <SafeAreaView className="flex items-center">
        <View className="flex-row pb-3 items-center mx-4 space-x-2 px-1">
          <TouchableOpacity onPress={"Profile"}>
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
          <MapIcon
            className="ml-2 py-5"
            size={35}
            onPress={() => navigation.navigate("Map")}
          />
          <Cog6ToothIcon
            size={35}
            className="ml-2"
            onPress={() => navigation.navigate("Settings")}
          />
        </View>

        <View className="flex">
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <TouchableOpacity onPress={random}>
                <Image
                  className="h-40 w-40 rounded-full"
                  source={{
                    uri: image ? image : "https://picsum.photos/200/200",
                  }}
                  style={{ width: 200, height: 200 }}
                />
              </TouchableOpacity>
              <LottieView
                source={require("../assets/lottie/click_here.json")}
                autoPlay
                loop
                style={{
                  width: 175,
                  height: 175,
                  alignSelf: "center",
                  marginTop: -15,
                }}
              />
            </View>
          </View>
        </View>
      </SafeAreaView>
    );}
          if(image){
            return (
          <SafeAreaView className="flex items-center">
          <View className="flex">
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            {image && (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  paddingTop: 10,
                }}
              >
                <TouchableOpacity onPress={random}>
                  <Image
                    className="h-40 w-40 rounded-full"
                    source={{
                      uri: image ? image : "https://picsum.photos/200/200",
                    }}
                    style={{ width: 200, height: 200 }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.buttonStyle}
                  onPress={uploadImage}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 20,
                      textAlign: "center",
                    }}
                  >
                    Upload
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </SafeAreaView>
    );
  }

  if (succ) {
    return (
      <SafeAreaView className="flex items-center">
        <View className="flex">
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <LottieView
              source={require("../assets/lottie/success.json")}
              progress={animationProgress.current}
              style={{
                width: 175,
                height: 175,
                alignSelf: "center",
                marginTop: -15,
              }}
            />
        </View>
      </View>
    </SafeAreaView>
  );
}

}
