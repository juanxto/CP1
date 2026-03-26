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

export default function HomeScreen({navigation}) {
    const [notas, setNotas] = useState([]);

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

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate("Note")}>
                <View style={styles.botaoNota}>
                    <Text>Nova nota</Text>
                </View>
            </TouchableOpacity>
            <View style={styles.containerLista}>
                <FlatList
                    data={notas}
                    keyExtractor={(item) => item.id}
                    ListEmptyComponent={<Text>Nenhuma nota encontrada</Text>}
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
                                        <Text style={{color: "white", fontWeight: 500}}>Editar</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => deletarNota(item.id)}>
                                    <View style={{backgroundColor: "red", alignItems: "center", marginBottom: 5, padding: 12}}>
                                        <Text style={{color: "white", fontWeight: 500}}>Excluir</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                />
            </View>
            <Button title="Realizar logoff" onPress={realizarLogoff}/>
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
