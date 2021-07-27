import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView, Text } from "react-native";
import { ListItem } from "react-native-elements";
import axios from "axios";

const baseUrl = "http://192.168.0.106:4000/";

const Listarventas = (props) => {
  useEffect(() => {
    obtenerVentas();
  }, []);

  const [productos, setProductos] = useState([]);

  const obtenerVentas = async () => {
    const response = await axios.get(baseUrl + "obtenerVentas");
    const { data } = response;
    setProductos(data);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {productos.length != 0 ? (
          <View style={{ flex: 1 }}>
            {productos.map((producto) => (
              <ListItem
                style={styles.content}
                key={producto.id}
                bottomDivider
                onPress={() =>
                  props.navigation.navigate("DetallesVenta", {
                    idVenta: producto.id,
                    productoId: producto.id_producto,
                    productoNombre: producto.nombre,
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
        ) : (
          <View style={styles.containerVacio}>
            <Text style={styles.containerVacioText}>Sin productos!</Text>
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

export default Listarventas;
