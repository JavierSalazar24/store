import React from "react";

// Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Components
import Home from "./components/Home";
import ListaProductos from "./components/ListarProductos";
import DetallesProducto from "./components/DetallesProducto";
import ListarVentas from "./components/ListarVentas";
import DetallesVenta from "./components/DetallesVenta";
import AgregarVenta from "./components/AgregarVenta";
import ComprarProducto from "./components/ComprarProducto";
import PersonaPendiente from "./components/PersonaPendiente";
import Pendientes from "./components/Pendientes";

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#02475e",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ title: "Two Salazar's" }}
      />
      <Stack.Screen
        name="ListarProductos"
        component={ListaProductos}
        options={{ title: "Productos" }}
      />
      <Stack.Screen
        name="DetallesProducto"
        component={DetallesProducto}
        options={{ title: "Detalles del producto" }}
      />
      <Stack.Screen
        name="ListarVentas"
        component={ListarVentas}
        options={{ title: "Ventas" }}
      />
      <Stack.Screen
        name="DetallesVenta"
        component={DetallesVenta}
        options={{ title: "Detalles de la venta" }}
      />
      <Stack.Screen
        name="AgregarVenta"
        component={AgregarVenta}
        options={{ title: "Selecciona un producto" }}
      />
      <Stack.Screen
        name="ComprarProducto"
        component={ComprarProducto}
        options={{ title: "Comprar" }}
      />
      <Stack.Screen
        name="PersonaPendiente"
        component={PersonaPendiente}
        options={{ title: "Personas pendientes de pago" }}
      />
      <Stack.Screen
        name="Pendientes"
        component={Pendientes}
        options={{ title: "Pendientes" }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
