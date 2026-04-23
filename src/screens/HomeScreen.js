import {useEffect, useState} from "react";
import {View, Text, Button, FlatList, StyleSheet, TouchableOpacity, TextInput} from "react-native";
import {auth, db} from "../services/firebaseConfig";
import {
    collection,
    query,
    onSnapshot,
    deleteDoc,
    doc,
    orderBy,
} from "firebase/firestore";
import {signOut} from "firebase/auth";
import { useTranslation } from "react-i18next";

export default function HomeScreen({navigation}) {
    const [notas, setNotas] = useState([]);
    const { t, i18n } = useTranslation();

    //Listar notas
    useEffect(() => {
        const user = auth.currentUser;
        if (!user) return;

        const q = query(
            collection(db, "usuarios", user.uid, "notas"),
            orderBy("criadoEm", "desc")
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const lista = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            setNotas(lista);
        });

        return unsubscribe;
    }, []);

    //Deletar Nota
    const deletarNota = async (id) => {
        const user = auth.currentUser;
        if (!user) return;

        await deleteDoc(doc(db, "usuarios", user.uid, "notas", id));
    };


    //LogOff
    const realizarLogoff = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Erro ao fazer logoff:", error);
        }
    };

    //Alterar idioma
    const alternarIdioma = () => {
        i18n.changeLanguage(i18n.language === "pt" ? "en" : "pt");
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>{t("home.title")}</Text>
                <TouchableOpacity onPress={alternarIdioma} style={styles.botaoIdioma}>
                    <Text style={styles.textoBotaoIdioma}>
                        {t(`language.${i18n.language}`)}
                    </Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={() => navigation.navigate("Note")}>
                <View style={styles.botaoNota}>
                    <Text>{t("home.new_note")}</Text>
                </View>
            </TouchableOpacity>
            <View style={styles.containerLista}>
                <FlatList
                    data={notas}
                    keyExtractor={(item) => item.id}
                    ListEmptyComponent={<Text>{t("home.empty")}</Text>}
                    renderItem={({item}) => (
                        <View style={{flex:1, flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
                            <Text style={{fontSize: 30, fontWeight: 700}}>{item.titulo}</Text>
                            <View style={{
                                flex: 1,
                                flexDirection: "row",
                                justifyContent: "space-between",
                                marginBottom: 12
                            }}>

                                <TouchableOpacity onPress={() => navigation.navigate("Note", {nota: item})}>
                                    <View style={{backgroundColor: "skyblue", alignItems: "center", marginBottom: 5, padding: 12}}>
                                        <Text style={{ color: "white", fontWeight: 500 }}>{t("home.edit")}</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => deletarNota(item.id)}>
                                    <View style={{backgroundColor: "red", alignItems: "center", marginBottom: 5, padding: 12}}>
                                        <Text style={{ color: "white", fontWeight: 500 }}>{t("home.delete")}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                />
            </View>
            <TouchableOpacity onPress={realizarLogoff} style={styles.botaoLogoff}>
                <Text>{t("home.logout")}</Text>
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#E8DFDF",
        justifyContent: "center",
        alignItems: "center",
    },
     header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        paddingHorizontal: 20,
        marginTop: 50,
        marginBottom: 12,
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: "700",
    },
    botaoIdioma: {
        backgroundColor: "white",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "#ccc",
    },
    textoBotaoIdioma: {
        fontSize: 14,
        fontWeight: "600",
    },
    botaoNota: {
        marginTop: 50,
        backgroundColor: "skyblue",
        padding: 12,
        marginBottom: 12
    },
    botaoLogoff: {
        marginBottom: 50,
    },
    containerLista: {
        flex: 1,
        flexDirection: "column",
        alignItems: "space-between",
    }
})
