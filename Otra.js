import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, TextInput, View, Text } from "react-native";
import { useState, useEffect } from "react";
import * as Location from "expo-location";
import MapPreview from "./src/components/MapsPreview/MapPreview";
export default function App() {
  const [location, setLocation] = useState();
   const [maplocation, setMapLocation] = useState();
  const [address, setAddress] = useState();



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
  };


  console.log(location.coords.latitude);
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
      />
{/*       
      <MapPreview location={location}/> */}
      <Text>{ }</Text>
      
      <Button title="Geocode Address" onPress={geocode} />
      <Button
        title="Reverse Geocode Current Location"
        onPress={reverseGeocode}
      />
      <Text>
      
      </Text>
      <StatusBar style="auto" />
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
