import {useState} from "react";
import {View, TextInput, Button, Alert, StyleSheet, TouchableOpacity, Text} from "react-native";
import {signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "../services/firebaseConfig";
import { useTranslation } from "react-i18next";

export default function LoginScreen({navigation}) {
    const { t } = useTranslation();
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const login = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, senha);

        } catch (error) {
            Alert.alert("Erro", t("login.error"));
        }
    };

    return (
        <View style={styles.container}>
            <TextInput style={styles.textInput} placeholder={t("login.email")} onChangeText={setEmail} />
            <TextInput style={styles.textInput} placeholder={t("login.password")} secureTextEntry={true} onChangeText={setSenha} />
            <TouchableOpacity onPress={login}>
                <View style={styles.botao}>
                    <Text style={styles.textoBotao}>{t("login.button")}</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                <View style={styles.botao}>
                    <Text style={styles.textoBotao}>{t("login.register")}</Text>
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
        marginBottom: 10
    },
    textoBotao:{
        color: "white",
        fontSize: 25
    },

})