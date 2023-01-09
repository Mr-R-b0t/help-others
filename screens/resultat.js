import { View, Text, Image } from "react-native";
import React, { useLayoutEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronDownIcon, HomeIcon, MapIcon } from "react-native-heroicons/outline";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TouchableWithoutFeedback } from "react-native-web";

const sos = () => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const navigation = useNavigation();
  return (
    <View className="flex-1 bg-white">
      <SafeAreaView className="bg-white pt-5">
        <View className="flex-row pb-3 items-center mx-4 space-x-2 px-1">
          <TouchableOpacity>
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
            size={35}
            className="ml-2"
            onPress={() => navigation.navigate("Home")}
          />
        </View>

        <View className="flex-row justify-center  pt-12">
          <Text className="text-3xl">Faire un garrot !</Text>
        </View>
        <View className="flex-row justify-center  pt-12">
          <Text className="text-3xl">
            L'Hôpital le plus près est l'Hôpital du Scorff à Lorient.
          </Text>
        </View>
        <View className="flex-row justify-center  pt-12">
          <Text className="text-3xl">Taux d'occupation : 60%.</Text>
        </View>
        <View className="flex-row justify-center pt-20 py-10">
          <TouchableOpacity className="bg-blue-500 rounded-3xl py-2 px-10 text-white text-center">
            <Text className="font-bold mx-2 py-2  items-center text-3xl">
              Appuyez pour appeller les urgences
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default sos;
