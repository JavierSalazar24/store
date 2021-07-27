import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  Alert,
  Text,
  StyleSheet,
  Button,
} from "react-native";

import axios from "axios";

const baseUrl = "http://192.168.0.106:4000/";

const DetallesVenta = (props) => {
  useEffect(() => {
    obtenerVentas();
    obtenerNumPendientes();
  }, []);

  const initialState = {
    nombre: "",
    ventas: 0,
  };

  const [producto, setProducto] = useState(initialState);
  const [pendientes, setPendientes] = useState([]);

  const obtenerVentas = async () => {
    const id = props.route.params.productoId;
    const response = await axios.get(
      baseUrl + "obtenerVentasTotalSinPendientes/" + id
    );
    const { data } = response;
    if (data[0].id == null) {
      const nombreProducto = props.route.params.productoNombre;
      setProducto({ nombre: nombreProducto, ventas: 0 });
    } else {
      setProducto({ ...data[0] });
    }
  };

  const obtenerNumPendientes = async () => {
    const id = props.route.params.productoId;
    const response = await axios.get(baseUrl + "obtenerNumPendientes/" + id);
    const { data } = response;
    setPendientes(data[0]);
  };

  const eliminarVenta = async () => {
    const id = props.route.params.productoId;
    const response = await axios.delete(baseUrl + "eliminarVenta/" + id);
    props.navigation.reset({
      routes: [
        { name: "Home" },
        {
          name: "ListarVentas",
        },
      ],
    });
  };

  const confirmarEliminarcion = () => {
    Alert.alert(
      "Eliminar Producto",
      "¿Estás seguro?",
      [
        { text: "Sí", onPress: () => eliminarVenta() },
        { text: "No", onPress: () => console.log("Cancelado") },
      ],
      {
        cancelable: true,
      }
    );
  };

  const actualizarVenta = async () => {
    const id = props.route.params.productoId;
    // const response = await axios.put(baseUrl + "actualizarProducto/" + id);

    // const response2 = await axios.put(baseUrl + "actualizarVenta/" + id);

    props.navigation.reset({
      routes: [
        { name: "Home" },
        {
          name: "ListarProductos",
        },
      ],
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View>
        <Text style={styles.input}>{producto.nombre}</Text>
      </View>
      <View>
        <Text style={styles.textInput}>Total: {producto.ventas}</Text>
      </View>
      <View>
        <Text style={styles.textInput}>
          Pendientes: {pendientes.pendientes}
        </Text>
      </View>
      <View style={styles.btn}>
        <Button
          title="Eliminar"
          onPress={() => confirmarEliminarcion()}
          color="#E37399"
        />
      </View>
      <View>
        <Button
          title="Actualizar"
          onPress={() => actualizarVenta()}
          color="#19AC52"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
  },
  input: {
    marginBottom: 30,
    padding: 0,
    borderBottomColor: "#393e4628",
    borderBottomWidth: 2,
    fontSize: 25,
    color: "#000",
  },
  textInput: {
    color: "#000",
    fontSize: 25,
    paddingBottom: 10,
  },
  btn: {
    marginTop: 50,
    marginBottom: 7,
  },
});

export default DetallesVenta;
