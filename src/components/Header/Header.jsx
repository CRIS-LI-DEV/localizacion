import React from "react";
import { Text, StyleSheet, View } from "react-native";

const Header = ({ text }) => {
  return (
    <View style={{ alignItems: "center" }}>
      <Text style={styles.header}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 30,
  },
});

export default Header;
