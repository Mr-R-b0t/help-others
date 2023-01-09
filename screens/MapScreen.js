import { View, Text, Image, StyleSheet } from "react-native";
import { Marker } from "react-native-maps";
import React, { useLayoutEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronDownIcon, HomeIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import MapView, { UrlTile } from "react-native-maps";
import { render } from "react-dom";

const MapScreen = () => {

  

  const navigation = useNavigation();
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  const [mapRegion, setmapRegion] = useState({
    latitude: 47.7552,
    longitude: -3.36392,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });


      /* const mapMarkers = async () => {
        await fetch(
          "https://www.data.gouv.fr/fr/datasets/r/86ea48a0-dd94-4a23-b71c-80d3041d7db2"
        )
          .then((res) => res.json())
          .then((data) => {
            setReports({ reports: data.features });
            console.log(reports);
            return reports.map((data) => (
              <Marker
                key={data.id}
                coordinate={{
                  latitude: data.properties.c_lat_coor1,
                  longitude: data.c_long_coor1,
                }}
                title={report.properties.c_nom}
                description={data.properties.c_etat_valide}
              ></Marker>
            ));
          })
          .catch((err) => console.log(err)); 
          console.log("Success !");} */



/* const mapMarkers = () => {
  var report = [
    {
      id: 1,
      title: "test",
      description: "test",
      latitude: 47.7552,
      longitude: -3.36392,
    },
    {
      id: 2,
      title: "test2",
      description: "test2",
      latitude: 47.75,
      longitude: -3.36392,
    },
    {
      id: 3,
      title: "test3",
      description: "test3",
      latitude: 47.7552,
      longitude: -3.36392,
    },
    {
      id: 4,
      title: "test4",
      description: "test4",
      latitude: 47.7552,
      longitude: -3.36392,
    },
  ];
      return report.map((report) => (
        <Marker
          key={report.id}
          coordinate={{
            latitude: report.latitude,
            longitude: report.longitude,
          }}
          title={report.userLocationAnnotationTitle}
          description={report.description}
        ></Marker> 
      ));
  }; */


  return (
    <SafeAreaView className="bg-white pt-5">
      <View className="flex-row pb-0 items-center mx-4 space-x-2 px-1">
        <Image
          source={{
            uri: "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png",
          }}
          className=" h-7 w-7 bg-gray-300 p-4 rounded-full"
          onPress={() => navigation.navigate("Login")}
        />
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
      <View className="flex pt-2 pd-10 space-x-2 space-y-20">
        <View className="flex pb-8  ">
          <MapView
            style={{ width: "100%", height: "100%" }}
            region={mapRegion}
            showsUserLocation={true}
            followsUserLocation={true}
            userLocationAnnotationTitle="Stalker Mode Activated"
            minZoomLevel={10}
            mapType={Platform.OS == "ios" ? "none" : "standard"}
            // can be enable to make performance better i don't give a shit about performance cacheEnabled={true}
            /*  {...mapMarkers()}  */
          >
            <Marker
              coordinate={{ latitude: 47.7552, longitude: -3.36392 }}
              title="test"
              description="test"
            />
            <Marker
              coordinate={{ latitude: 47.76, longitude: -3.36392 }}
              title="test"
              description="test"
            />

            <Marker
              coordinate={{ latitude: 47.77, longitude: -3.38 }}
              title="test"
              description="test"
            />

            <Marker
              coordinate={{ latitude: 47.78, longitude: -3.3700 }}
              title="test"
              description="test"
            />

            <UrlTile
              urlTemplate="http://magosm.magellium.com/geoserver/ows?service=wfs&version=2.0.0&request=GetCapabilities"
              maximumZ={19}
            />
          </MapView>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default MapScreen;



