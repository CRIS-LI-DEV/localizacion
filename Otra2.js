import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, TextInput, View, Text } from "react-native";
import { useState, useEffect } from "react";
import * as Location from "expo-location";
import MapPreview from "../../MapPreview";
export default function Xde() {
  const [location, setLocation] = useState({
    coords: { longitude: 0, latitude: 0 },
  }); // Agregamos un valor inicial

  const [datosLugar, setDatosLugar] = useState({
    ciudad: "",
    pais: "",
    numero: "",
    calle: "",
  }); // Agregamos un valor inicial

  const [geoCodeState, setGeoCodeState] = useState();
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

    const obtenerDatos = async () => {
      console.log("obtener datos");
      const reverseGeocodedAddress = await Location.reverseGeocodeAsync({
        longitude: location.coords.longitude,
        latitude: location.coords.latitude,
      });

      setDatosLugar({
        pais: reverseGeocodedAddress[0].country,
        region: reverseGeocodedAddress[0].region,
        ciudad: reverseGeocodedAddress[0].city,
        calle: reverseGeocodedAddress[0].street,
        numero: reverseGeocodedAddress[0].streetNumber,
      });
      console.log(JSON.stringify(reverseGeocodedAddress[0].city, null, 2));
    };

    obtenerDatos();
  }, []);

  const geocode = async () => {
    const geocodedLocation = await Location.geocodeAsync(address);
    console.log("Geocoded Address:");
    console.log(geocodedLocation);
  };

  const reverseGeocode = async () => {
    if (location && location.coords) {
      // Verificamos que location y location.coords no sean undefined
      const reverseGeocodedAddress = await Location.reverseGeocodeAsync({
        longitude: location.coords.longitude,
        latitude: location.coords.latitude,
      });
      setGeoCodeState(reverseGeocodedAddress)();
      console.log("Reverse Geocoded:");
      console.log(reverseGeocodedAddress);
    }
  };

  console.log("----------------------------------------");
  console.log("City: " + JSON.stringify(geoCodeState, null, 2));
  console.log("----------------------------------------");
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.header_text}>Tu encuentras en</Text>
        <Text style={styles.header_text}>{datosLugar.ciudad}</Text>
      </View>
      <View style={styles.container_map}>
        <MapPreview location={location} />
      </View>
      <Button title="Geocode Address" onPress={geocode} />
      <View style={styles.table}>
        <View style={styles.row}>
          <Text style={styles.label}>Longitude:</Text>
          <Text style={styles.value}>{location.coords.longitude}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Latitude:</Text>
          <Text style={styles.value}>{location.coords.latitude}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Altitude:</Text>
          <Text style={styles.value}>{location.coords.altitude}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Accuracy:</Text>
          <Text style={styles.value}>{location.coords.accuracy}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Altitude Accuracy:</Text>
          <Text style={styles.value}>{location.coords.altitudeAccuracy}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Country:</Text>
          <Text style={styles.value}>{datosLugar.pais}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Region:</Text>
          <Text style={styles.value}>{datosLugar.region}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>City:</Text>
          <Text style={styles.value}>{datosLugar.ciudad}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Street:</Text>
          <Text style={styles.value}>{datosLugar.calle}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Number:</Text>
          <Text style={styles.value}>{datosLugar.numero}</Text>
        </View>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  textInput: {
    color: "#0f0",
  },
  text: {
    color: "#0f0",
  },
  table: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#0f0",
    padding: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  label: {
    color: "#0f0",
  },
  value: {
    color: "#0f0",
  },
  container_map: {
    borderColor: "#0f0",
    borderWidth: 4,
  },
  header: {
    paddingTop: 30,
    backgroundColor: "#0f0",
    width: "100%",
    marginBottom: 5,
  },
  header_text: {
    fontSize: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  img_map: {
    width: "100%",
  },
});
