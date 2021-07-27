import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { ListItem } from "react-native-elements";
import axios from "axios";

const baseUrl = "http://192.168.0.106:4000/";

const ListarProductos = (props) => {
  useEffect(() => {
    obtenerProductos();
  }, []);

  const initalState = {
    nombre: "",
    cantidad: "",
  };

  const [state, setState] = useState(initalState);

  const handleChangeText = (nom, nombre, cant, cantidad) => {
    setState({ ...state, [nombre]: nom, [cantidad]: cant });
  };

  const agregarProducto = async () => {
    if (state.nombre === "") {
      Alert.alert("Por favor ingresa un nombre");
    } else if (state.cantidad === "") {
      Alert.alert("Por favor ingresa una cantidad");
    } else if (state.cantidad == "0") {
      Alert.alert("Por favor ingresa una cantidad diferente de 0");
    } else {
      const nombre = state.nombre;
      const cantidad = state.cantidad;
      const response = await axios.post(baseUrl + "insertarProductos", {
        nombre,
        cantidad,
      });
      setState({ nombre: "", cantidad: "" });
      obtenerProductos();
    }
  };

  const [productos, setProductos] = useState([]);

  const obtenerProductos = async () => {
    const response = await axios.get(baseUrl + "obtenerProductos");
    const { data } = response;
    setProductos(data);
  };

  return (
    <ScrollView>
      <View>
        <TextInput
          style={styles.input}
          placeholder="Producto"
          onChangeText={(nom) => handleChangeText(nom, "nombre")}
          value={state.nombre}
        />
        <TextInput
          style={styles.input}
          placeholder="Cantidad"
          keyboardType="numeric"
          onChangeText={(cant) => handleChangeText(cant, "cantidad")}
          value={state.cantidad}
        />
        <TouchableOpacity
          style={styles.btnGuardar}
          onPress={() => agregarProducto()}
        >
          <Text style={styles.btnText}>Guardar</Text>
        </TouchableOpacity>
      </View>
      {productos.length != 0 ? (
        <View style={styles.container}>
          <View style={{ flex: 1 }}>
            {productos.map((producto) => (
              <ListItem
                style={styles.content}
                key={producto.id}
                bottomDivider
                onPress={() =>
                  props.navigation.navigate("DetallesProducto", {
                    productoId: producto.id,
                  })
                }
              >
                <ListItem.Chevron />
                <ListItem.Content>
                  <ListItem.Title>{producto.nombre}</ListItem.Title>
                </ListItem.Content>
              </ListItem>
            ))}
          </View>
        </View>
      ) : (
        <View style={styles.containerVacio}>
          <Text style={styles.containerVacioText}>Sin productos!</Text>
        </View>
      )}
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

export default ListarProductos;
