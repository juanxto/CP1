import { useState } from "react";
import { View, TextInput, Button, Alert } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebaseConfig";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, senha);
      navigation.navigate("Home");
    } catch (error) {
      Alert.alert("Erro", "Login inválido");
    }
  };

  return (
    <View>
      <TextInput placeholder="Email" onChangeText={setEmail} />
      <TextInput placeholder="Senha" secureTextEntry onChangeText={setSenha} />
      <Button title="Entrar" onPress={login} />
      <Button title="Cadastrar" onPress={() => navigation.navigate("Register")} />
    </View>
  );
}