import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  Alert,
  Text,
  StyleSheet,
  TouchableOpacity,
  Picker,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";

import axios from "axios";

const baseUrl = "http://192.168.0.106:4000/";

const ComprarProducto = (props) => {
  const initialState = {
    id: "",
    nombre: "",
    cantidad: "",
    pendientes: "",
  };

  const [producto, setProducto] = useState(initialState);

  const [persona, setPersona] = useState("NINGUNO");

  const handleTextChange = (value, cantidad) => {
    setProducto({ ...producto, [cantidad]: value });
  };

  const obtenerProducto = async (id) => {
    const response = await axios.get(baseUrl + "obtenerProducto/" + id);
    const { data } = response;
    setProducto({ ...data[0], cantidad: "" });
  };

  const agregarVenta = async () => {
    if (!producto.cantidad) {
      Alert.alert("Por favor ingresa una cantidad");
    } else {
      const id = props.route.params.productoId;
      const cantidad = producto.cantidad;
      const pendientes = persona;
      const response = await axios.post(baseUrl + "insertarVentas", {
        id,
        cantidad,
        pendientes,
      });
      setProducto({ ...producto, cantidad: "", pendientes: "" });
      setPersona("NINGUNO");
      Alert.alert("Producto comprado");
    }
  };

  useEffect(() => {
    obtenerProducto(props.route.params.productoId);
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View>
        <Text style={styles.input}>{producto.nombre}</Text>

        <TextInput
          keyboardType="numeric"
          placeholder="Cantidad"
          style={styles.input}
          value={producto.cantidad.toString()}
          onChangeText={(value) => handleTextChange(value, "cantidad")}
        />

        <Picker
          selectedValue={persona}
          style={{ height: 50, width: 150 }}
          onValueChange={(itemValue, itemIndex) => setPersona(itemValue)}
        >
          <Picker.Item label="Ninguno" value="NINGUNO" />
          <Picker.Item label="Rocío" value="ROCÍO" />
          <Picker.Item label="Javier" value="JAVIER" />
          <Picker.Item label="Mamá" value="MAMÁ" />
          <Picker.Item label="Paulina" value="PAULINA" />
          <Picker.Item label="Luis" value="LUIS" />
          <Picker.Item label="Rayo" value="RAYO" />
          <Picker.Item label="Natalia" value="NATALIA" />
          <Picker.Item label="Chuy" value="CHUY" />
        </Picker>

        <TouchableOpacity
          style={styles.btnGuardar}
          onPress={() => agregarVenta()}
        >
          <Text style={styles.btnText}>Guardar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
  },
  select: {
    marginBottom: 20,
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
  btnGuardar: {
    backgroundColor: "#0a7",
    padding: 12,
    marginHorizontal: 15,
    marginTop: 10,
    marginBottom: 40,
    borderRadius: 10,
  },
  btnText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 20,
  },
});

export default ComprarProducto;
