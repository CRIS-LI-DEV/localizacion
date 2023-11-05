import { Image, View,StyleSheet } from "react-native";

import React from "react";

const MapPreview = ({ location }) => {
  const my_api = "AIzaSyDvTGU-peYIh5q0OFktvNhn8jCFlTz4G3E";

 
  const mapPreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${location.coords.latitude},${location.coords.longitude}&zoom=13&size=600x300&maptype=roadmap&markers=color:blue%7Clabel:S%7C${location.coords.latitude},${location.coords.longitude}&key=${my_api}`;

  return (
    <View style={styles.mapPreview}>
      <Image style={styles.mapImage} source={{ uri: mapPreviewUrl }} />
    </View>
  );
};

const styles = StyleSheet.create({
  mapPreview: {
    // justifyContent: "center",
    // alignItems: "center",
    width:'100%'
  },
  mapImage: {
    width: '100%',
    height: 200,
  },
});

export default MapPreview;
