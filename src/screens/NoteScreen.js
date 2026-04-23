import { useState } from "react";
import { View, TextInput, Button, StyleSheet, Text} from "react-native";
import { db, auth } from "../services/firebaseConfig";
import { addDoc, collection, updateDoc, doc } from "firebase/firestore";
import { useTranslation } from "react-i18next";

export default function NoteScreen({ route, navigation }) {
  const nota = route.params?.nota;
  const { t } = useTranslation();

  const [titulo, setTitulo] = useState(nota?.titulo || "");

  const salvar = async () => {
    const user = auth.currentUser;
    if (!user) return;

    if (!titulo.trim()) return;

    try {
      if (nota) {
        //Editar nota
        await updateDoc(
          doc(db, "usuarios", user.uid, "notas", nota.id),
          {
            titulo,
          }
        );
      } else {
        //Criar nota
        await addDoc(
          collection(db, "usuarios", user.uid, "notas"),
          {
            titulo,
            criadoEm: new Date(),
          }
        );
      }

    navigation.goBack();
    } catch (error) {
      console.error("Erro ao salvar nota:", error);
    }
  };

  return (
    <View style={{flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#E8DFDF"}}>
       <Text style={{ fontWeight: 800, fontSize: 30, marginBottom: 20 }}>{t("note.title")}</Text>
       <TextInput style={styles.textInput} value={titulo} onChangeText={setTitulo} placeholder={t("note.placeholder")} />
      <Button title={t("note.save")} onPress={salvar} />
    </View>
  );
}
const styles = StyleSheet.create({
  textInput: {
    backgroundColor: "white",
    paddingHorizontal: 80,
    borderRadius: 20
  }
})
