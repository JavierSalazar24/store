import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Button,
  View,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";

import axios from "axios";

const baseUrl = "http://192.168.0.106:4000/";

const DetallesProducto = (props) => {
  useEffect(() => {
    obtenerProducto();
  }, []);

  const initialState = {
    id: "",
    nombre: "",
    cantidad: "",
  };

  const [producto, setProducto] = useState(initialState);

  const handleChangeText = (nom, nombre, cant, cantidad) => {
    setProducto({ ...producto, [nombre]: nom, [cantidad]: cant });
  };

  const eliminarProducto = async () => {
    setLoading(true);
    const id = props.route.params.productoId;
    const response = await axios.delete(baseUrl + "eliminarProducto/" + id);
    setLoading(false);
    props.navigation.reset({
      routes: [
        { name: "Home" },
        {
          name: "ListarProductos",
        },
      ],
    });
  };

  const confirmarAlerta = () => {
    Alert.alert(
      "Eliminar Producto",
      "¿Estás seguro?",
      [
        { text: "Sí", onPress: () => eliminarProducto() },
        { text: "No", onPress: () => console.log("Cancelado") },
      ],
      {
        cancelable: true,
      }
    );
  };

  const actualizarProducto = async () => {
    if (producto.nombre === "") {
      Alert.alert("Por favor ingresa un nombre");
    } else if (producto.cantidad === "") {
      Alert.alert("Por favor ingresa una cantidad");
    } else if (producto.cantidad == "0") {
      Alert.alert("Por favor ingresa una cantidad diferente de 0");
    } else {
      const id = props.route.params.productoId;
      const nombre = producto.nombre;
      const cantidad = producto.cantidad;
      console.log(cantidad);
      const response = await axios.put(baseUrl + "actualizarProducto/" + id, {
        nombre,
        cantidad,
      });

      props.navigation.reset({
        routes: [
          { name: "Home" },
          {
            name: "ListarProductos",
          },
        ],
      });
    }
  };

  const obtenerProducto = async () => {
    const id = props.route.params.productoId;
    const response = await axios.get(baseUrl + "ObtenerProducto/" + id);
    const { data } = response;
    setProducto({ ...data[0] });
    setLoading(false);
  };

  const [loading, setLoading] = useState(true);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#9E9E9E" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View>
        <TextInput
          style={styles.input}
          placeholder="Producto"
          onChangeText={(nom) => handleChangeText(nom, "nombre")}
          value={producto.nombre}
        />
        <TextInput
          style={styles.input}
          placeholder="Cantidad"
          keyboardType="numeric"
          onChangeText={(cant) => handleChangeText(cant, "cantidad")}
          value={producto.cantidad.toString()}
        />
      </View>
      <View style={styles.btn}>
        <Button
          title="Eliminar"
          onPress={() => confirmarAlerta()}
          color="#E37399"
        />
      </View>
      <View>
        <Button
          title="Actualizar"
          onPress={() => actualizarProducto()}
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
  loader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    marginTop: 0,
    marginBottom: 25,
    padding: 0,
    borderBottomColor: "#393e4628",
    borderBottomWidth: 2,
    fontSize: 18,
    color: "#000",
  },
  btn: {
    marginBottom: 7,
  },
});

export default DetallesProducto;
