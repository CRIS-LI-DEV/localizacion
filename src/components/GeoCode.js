import { StatusBar } from "expo-status-bar";
import {
  Button,
  StyleSheet,
  TextInput,
  View,
  Text,
  FlatList,
} from "react-native";
import { useState, useEffect } from "react";
import * as Location from "expo-location";
import MapPreview from "./MapsPreview/MapPreview";
export default function Geocode() {
  const [location, setLocation] = useState({
    coords: {
      latitude: 0,
      longitude: 0,
    },
  });
  const [address, setAddress] = useState();
  const [reverseGeocodedData, setReverseGeocodedData] = useState([]);



  useEffect(() => {
    const getPermissions = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Please grant location permissions");
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
      console.log("Location:");
      console.log(currentLocation);
    };
    getPermissions();
  }, []);

  const geocode = async () => {
    const geocodedLocation = await Location.geocodeAsync(address);
    console.log("Geocoded Address:");
    console.log(geocodedLocation);
  };

  const reverseGeocode = async () => {
    const reverseGeocodedAddress = await Location.reverseGeocodeAsync({
      longitude: location.coords.longitude,
      latitude: location.coords.latitude,
    });

    console.log("Reverse Geocoded:");
    console.log(reverseGeocodedAddress);

    setReverseGeocodedData(reverseGeocodedAddress);
  };

 const renderItem = ({ item }) => (
   <View style={styles.item}>
     {Object.keys(item).map((key, index) => (
       <View key={index}>
         <Text style={styles.title}>{key}: </Text>
         <Text>{JSON.stringify(item[key])}</Text>
       </View>
     ))}
   </View>
 );

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
      />
      <Button title="Geocode Address" onPress={geocode} />
      <Button
        title="Reverse Geocode Current Location"
        onPress={reverseGeocode}
      />
      <FlatList
        data={reverseGeocodedData}
        renderItem={renderItem}
        keyExtractor={(item) => item.postalCode}
      />
      <MapPreview location={location}/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",

    justifyContent: "center",
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
