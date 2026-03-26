import { useEffect, useState } from "react";
import { View, Text, Button, FlatList } from "react-native";
import { auth, db } from "../services/firebaseConfig";
import {
  collection,
  query,
  onSnapshot,
  deleteDoc,
  doc,
  orderBy,
} from "firebase/firestore";
import { signOut } from "firebase/auth";

export default function HomeScreen({ navigation }) {
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
    <View>
      <Button title="Nova Nota" onPress={() => navigation.navigate("Note")} />
      <Button title="Realizar logoff" onPress={realizarLogoff} />

      <FlatList
        data={notas}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text>Nenhuma nota encontrada</Text>}
        renderItem={({ item }) => (
          <View>
            <Text>{item.titulo}</Text>
            <Button
              title="Editar"
              onPress={() => navigation.navigate("Note", { nota: item })}
            />
            <Button title="Excluir" onPress={() => deletarNota(item.id)} />
          </View>
        )}
      />
    </View>
  );
}
