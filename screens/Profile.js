import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { ChevronDownIcon, HomeIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";

const ProfileScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const [image, setImage] = React.useState(null);
  const [userdata, setUserdata] = React.useState(null);
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [user, setUser] = React.useState();
  const [initializing, setInitializing] = React.useState(true);

  function onAuthStateChanged(user) {
    setUser(user);

    if (initializing) setInitializing(false);
  }
  React.useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) return null;

  const uid = user?.uid;
  console.log(uid);

  const getUserProfile = async (uid) => {
    if (!userdata) {
      const userProfile = await firestore().collection("users").doc(uid).get();
      console.log(userProfile.data());
      setUserdata(userProfile.data());
      try {
        const url = await storage().ref(`${uid}.jpg`).getDownloadURL();
        setImage(url);
        console.log(url);
        return url;
      } catch (e) {
        console.log(e);
      }
    } else {
      console.log("user connected already");
    }
  };

  getUserProfile(uid);

  const handleSubmit = async () => {
    auth()
      .signOut()
      .then(() => console.log("User signed out!"));
    navigation.navigate("Login");
  };
  return (
    <SafeAreaView>
      <View className="flex-row pb-3 items-center mx-4 space-x-2 px-1">
        <Image
          source={{
            uri: "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png",
          }}
          className=" h-7 w-7 bg-gray-300 p-4 rounded-full"
        />
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
        <Image source={{ uri: image }} className="h-40 w-40 rounded-full" />
      </View>
      <View className="flex items-center justify-center py-10">
        <Text className="text-xl font-bold">Email : {user?.email} </Text>
      </View>
      <View className="flex  items-center justify-center py-0">
        <Text className="text-xl font-bold">
          Last name : {userdata?.lastName}
        </Text>
      </View>
      <View className="flex  items-center justify-center py-0">
        <Text className="text-xl font-bold">
          First name : {userdata?.firstName}
        </Text>
      </View>
      <View className="flex  items-center justify-center py-0">
        <Text className="text-xl font-bold">
          First name : {userdata?.status}
        </Text>
      </View>
      <View className="flex-1 items-center justify-center py-20">
        <TouchableOpacity
          onPress={handleSubmit}
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
