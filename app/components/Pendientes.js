import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView, Text } from "react-native";
import { ListItem } from "react-native-elements";
import axios from "axios";

const baseUrl = "http://192.168.0.106:4000/";

const Pendientes = (props) => {
  useEffect(() => {
    obtenerPersonasPendientes();
  }, []);

  const [personas, setPersonas] = useState([]);

  const obtenerPersonasPendientes = async () => {
    const response = await axios.get(baseUrl + "personasPendientes");
    const { data } = response;
    setPersonas(data);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {personas.length != 0 ? (
          <View style={{ flex: 1 }}>
            {personas.map((persona, index) => (
              <ListItem
                style={styles.content}
                key={index}
                bottomDivider
                onPress={() =>
                  props.navigation.navigate("PersonaPendiente", {
                    pendienteNombre: persona.pendientes,
                  })
                }
              >
                <ListItem.Chevron />
                <ListItem.Content>
                  <ListItem.Title>{persona.pendientes}</ListItem.Title>
                </ListItem.Content>
              </ListItem>
            ))}
          </View>
        ) : (
          <View style={styles.containerVacio}>
            <Text style={styles.containerVacioText}>
              Sin pendientes de pago!
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    marginHorizontal: 10,
    marginVertical: 5,
    padding: 10,
    borderBottomColor: "#393e4628",
    borderBottomWidth: 2,
    fontSize: 18,
    color: "#000",
  },
  content: {
    marginVertical: 5,
    marginHorizontal: 12,
    borderRadius: 5,
    elevation: 4,
  },
  btnGuardar: {
    backgroundColor: "#00adb5",
    padding: 20,
    marginHorizontal: 15,
    marginTop: 10,
    marginBottom: 40,
    borderRadius: 17,
  },
  btnText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 20,
  },
  containerVacio: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  containerVacioText: {
    fontSize: 30,
    fontWeight: "bold",
  },
});

export default Pendientes;
