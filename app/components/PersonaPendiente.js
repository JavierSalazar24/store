import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  Alert,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Card } from "react-native-elements";

import axios from "axios";

const baseUrl = "http://192.168.0.106:4000/";

const PersonaPendientes = (props) => {
  useEffect(() => {
    pendientesPago();
  }, []);

  const [pendientes, setPendientes] = useState([]);

  const pendientesPago = async () => {
    const persona = props.route.params.pendienteNombre;
    const response = await axios.get(baseUrl + "ventasPendientes/" + persona);
    const { data } = response;
    if (data.length == 0) {
      props.navigation.reset({
        routes: [
          { name: "Home" },
          {
            name: "Pendientes",
          },
        ],
      });
    }
    setPendientes(data);
  };

  const confirmarEliminarcion = (id, persona) => {
    Alert.alert(
      "¿Estás seguro que deseas eliminar los pendientes de?",
      persona,
      [
        { text: "Sí", onPress: () => eliminarPendientes(id, persona) },
        { text: "No", onPress: () => console.log("Cancelado") },
      ],
      {
        cancelable: true,
      }
    );
  };

  const eliminarPendientes = async (id, persona) => {
    const response = await axios.put(baseUrl + "eliminarPendientes/" + id, {
      persona: persona,
    });
    pendientesPago();
  };

  return (
    <ScrollView style={styles.container}>
      <Card>
        <Card.Title style={styles.textPendientesTitulo}>
          {props.route.params.pendienteNombre}
        </Card.Title>
        <Card.Divider />
        {pendientes.map((pendiente) => (
          <View key={pendiente.id_producto} style={styles.cardText}>
            <TouchableOpacity
              onPress={() =>
                confirmarEliminarcion(
                  pendiente.id_producto,
                  pendiente.pendientes
                )
              }
              style={styles.btnEliminar}
            >
              <Text style={styles.textPendientes}>
                {pendiente.cantidad} {pendiente.nombre}
              </Text>
              <Text style={styles.btnText}>X</Text>
            </TouchableOpacity>
          </View>
        ))}
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 10,
  },
  cardText: {
    marginHorizontal: 10,
    marginVertical: 10,
  },
  textPendientesTitulo: {
    fontSize: 27,
  },
  textPendientes: {
    fontSize: 18,
  },
  btnEliminar: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  btnText: {
    color: "#f00",
    fontSize: 25,
  },
});

export default PersonaPendientes;
