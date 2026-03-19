import { useState } from "react";
import { View, TextInput, Button } from "react-native";
import { db, auth } from "../services/firebaseConfig";
import { addDoc, collection, updateDoc, doc } from "firebase/firestore";

export default function NoteScreen({ route, navigation }) {
  const nota = route.params?.nota;

  const [titulo, setTitulo] = useState(nota?.titulo || "");

  const salvar = async () => {
    if (nota) {
      await updateDoc(doc(db, "notas", nota.id), {
        titulo
      });
    } else {
      await addDoc(collection(db, "notas"), {
        titulo,
        userId: auth.currentUser.uid
      });
    }

    navigation.navigate("Home");
  };

  return (
    <View>
      <TextInput value={titulo} onChangeText={setTitulo} placeholder="Título" />
      <Button title="Salvar" onPress={salvar} />
    </View>
  );
}
