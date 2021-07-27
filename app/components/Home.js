import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  RefreshControl,
} from "react-native";

import axios from "axios";

const baseUrl = "http://192.168.0.106:4000/";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const Home = (props) => {
  useEffect(() => {
    obtenerPersonasPendientes();
  }, []);

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    wait(1500).then(() => {
      setRefreshing(false);
      obtenerPersonasPendientes();
    });
  };

  const [personas, setPersonas] = useState([]);

  const obtenerPersonasPendientes = async () => {
    const response = await axios.get(baseUrl + "personasPendientes");
    const { data } = response;
    setPersonas(data);
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <TouchableOpacity
        style={styles.btnListarProductos}
        onPress={() => props.navigation.navigate("ListarProductos")}
      >
        <Text style={styles.btnText}>Productos</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btnListarVentas}
        onPress={() => props.navigation.navigate("ListarVentas")}
      >
        <Text style={styles.btnText}>Ventas</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btnNuevaVenta}
        onPress={() => props.navigation.navigate("AgregarVenta")}
      >
        <Text style={styles.btnText}>Nueva Venta</Text>
      </TouchableOpacity>
      {personas.length != 0 ? (
        <TouchableOpacity
          style={styles.btnPendientes}
          onPress={() => props.navigation.navigate("Pendientes")}
        >
          <Text style={styles.btnText}>Pendientes de pago</Text>
        </TouchableOpacity>
      ) : (
        <View></View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  btnListarProductos: {
    margin: 7,
    fontSize: 20,
    backgroundColor: "#1e6f5c",
    padding: 20,
    borderRadius: 10,
  },
  btnListarVentas: {
    margin: 7,
    fontSize: 20,
    backgroundColor: "#289672",
    padding: 20,
    borderRadius: 10,
  },
  btnNuevaVenta: {
    margin: 7,
    fontSize: 20,
    backgroundColor: "#29bb89",
    padding: 20,
    borderRadius: 10,
  },
  btnPendientes: {
    margin: 7,
    fontSize: 20,
    backgroundColor: "#7eca9c",
    padding: 20,
    borderRadius: 10,
  },
  btnText: {
    fontSize: 20,
  },
});

export default Home;
