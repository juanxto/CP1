import { useEffect, useState } from "react";
import { View, Text, Button, FlatList } from "react-native";
import { auth, db } from "../services/firebaseConfig";
import { collection, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";

export default function HomeScreen({ navigation }) {
  const [notas, setNotas] = useState([]);

  const carregarNotas = async () => {
    const q = query(
      collection(db, "notas"),
      where("userId", "==", auth.currentUser.uid)
    );

    const snapshot = await getDocs(q);
    const lista = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    setNotas(lista);
  };

  useEffect(() => {
    carregarNotas();
  }, []);

  const deletarNota = async (id) => {
    await deleteDoc(doc(db, "notas", id));
    carregarNotas();
  };

  return (
    <View>
      <Button title="Nova Nota" onPress={() => navigation.navigate("Note")} />

      <FlatList
        data={notas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>{item.titulo}</Text>
            <Button title="Editar" onPress={() => navigation.navigate("Note", { nota: item })} />
            <Button title="Excluir" onPress={() => deletarNota(item.id)} />
          </View>
        )}
      />
    </View>
  );
}
