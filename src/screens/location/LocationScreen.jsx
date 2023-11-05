import { StatusBar } from "expo-status-bar";
import {
  Button,
  StyleSheet,
  TextInput,
  View,
  Text,
  FlatList,TouchableOpacity
} from "react-native";
import { useState, useEffect } from "react";
import * as Location from "expo-location";
import MapPreview from "../../components/MapsPreview/MapPreview";
import Header from "../../components/Header/Header";


export default function LocationScreen() {
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
      <Header text="Te encuentras aquí" />

      <MapPreview location={location} />

      <View></View>
      <View style={styles.container_cordenadas}>
        <Text style={styles.text_cordenadas}>
          Latitud: {location.coords.latitude}, Longitud:{" "}
          {location.coords.longitude}
        </Text>
      </View>

      <View style={styles.button_container}>
        <Text>Presiona y obtén más información sobre tu ubicación</Text>
        <TouchableOpacity style={styles.button} onPress={reverseGeocode}>
          <Text style={styles.buttonText}>PRESIONA</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={reverseGeocodedData}
        renderItem={renderItem}
        keyExtractor={(item) => item.postalCode}
      />

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
    backgroundColor: "#28D4B5",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 25,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  button_container: {
    padding: 6,
    alignItems: "center",
  },
  button: {
    backgroundColor: "#1F636D",
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },

  header: {
    paddingTop: 30,
    alignItems: "center",
  },
  container_cordenadas: {
    backgroundColor: "#28D4B5",
    alignItems: "center",
    padding: 10,
  },
  text_cordenadas: {
    fontWeight: "bold",
  },
});
