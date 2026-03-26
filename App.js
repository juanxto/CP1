import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { auth } from "./src/services/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

// Telas
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import HomeScreen from "./src/screens/HomeScreen";
import NoteScreen from "./src/screens/NoteScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (usuario) => {
      setUser(usuario);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Loading enquanto verifica login
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ title: "Minhas Notas",
                headerShown: false,}}
            />
            <Stack.Screen
              name="Note"
              component={NoteScreen}
              options={{ title: "Nota" ,
                headerShown: false,}}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ title: "Login",
                headerShown: false }}

            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{ title: "Cadastro" ,
                headerShown: false,}}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
