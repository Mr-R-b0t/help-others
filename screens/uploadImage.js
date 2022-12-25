import { Button, Image, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Client, Account } from "appwrite";
import { appwriteClient } from "../src/actions/index";



const client = new Client();
const API_URL = "http://localhost/v1";
const PROJECT_ID = "639cd795da4ad37458f2";
const BUCKET_ID = "63a5b1c005c9ab4aa883";


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

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Button onPress={login} title="login" />
        <Button title="Pick an image from camera roll" onPress={pickImage} />
      </View>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        {image && (
          <>
            <Image
              source={{ uri: image }}
              style={{ width: 200, height: 200 }}
            />
            <Button onPress={uploadImage} title="uploadImage" />
          </>
        )}
        {succ && <Text style={{ fontSize: 32 }}>UPLOADED</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});