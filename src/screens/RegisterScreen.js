import { useState } from "react";
import { View, TextInput,TouchableOpacity , Alert, StyleSheet, Text} from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebaseConfig";
import { useTranslation } from "react-i18next";

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const { t } = useTranslation();

  const register = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, senha);
      Alert.alert(t("register.success_title"), t("register.success"));
      navigation.navigate("Login");
    } catch (error) {
      Alert.alert("Erro", error.message);
    }
  };
  return (
    <View style={styles.container}>
      <TextInput style={styles.textInput} placeholder={t("register.email")} onChangeText={setEmail} />
      <TextInput style={styles.textInput} placeholder={t("register.password")} secureTextEntry onChangeText={setSenha} />
      <TouchableOpacity onPress={register}>
        <View style={styles.botao}>
          <Text style={styles.textoBotao}>{t("register.button")}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E8DFDF",

  },
  textInput: {
    backgroundColor: "white",
    paddingHorizontal: 120,
    borderColor: "black",
    borderRadius: 20,
    marginBottom: 5,
  },
  botao: {
    borderRadius: 30,
    marginTop: 5,
    backgroundColor: "blue",
    paddingWidth: 20,
    paddingHorizontal: 40,
    marginBottom: 10,

  },
  textoBotao:{
    color: "white",
    fontSize: 25
  },
})
