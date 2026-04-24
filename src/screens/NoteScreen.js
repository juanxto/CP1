import { useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  Modal,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { db, auth } from "../services/firebaseConfig";
import { WebView } from "react-native-webview";
import * as Location from "expo-location";
import { addDoc, collection, updateDoc, doc } from "firebase/firestore";
import { useTranslation } from "react-i18next";
import {
  enviarNotificacaoNotaCriada,
  enviarNotificacaoNotaAtualizada,
} from "../services/notificacoes";

const gerarHTMLMapa = (latitude, longitude, titulo) => `
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body, #map { width: 100%; height: 100%; }
  </style>
</head>
<body>
  <div id="map"></div>
  <script>
    const map = L.map('map').setView([${latitude}, ${longitude}], 15);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map);
    L.marker([${latitude}, ${longitude}])
      .addTo(map)
      .bindPopup(${JSON.stringify(titulo || "Nota")})
      .openPopup();
  </script>
</body>
</html>
`;

export default function NoteScreen({ route, navigation }) {
  const nota = route.params?.nota;
  const { t } = useTranslation();

  const [titulo, setTitulo] = useState(nota?.titulo || "");

  const [mapaVisivel, setMapaVisivel] = useState(false);

  const coordenadasSalvas = nota?.localizacao ?? null;

  const capturarLocalizacao = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        t("permissions.location_denied_title"),
        t("permissions.location_denied_msg")
      );
      return null;
    }
    const pos = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced,
    });
    return {
      latitude: pos.coords.latitude,
      longitude: pos.coords.longitude,
    };
  };

  const salvar = async () => {
    const user = auth.currentUser;
    if (!user) return;

    if (!titulo.trim()) return;

    try {

      const coords = await capturarLocalizacao();

      if (nota) {
        //Editar nota
        await updateDoc(
          doc(db, "usuarios", user.uid, "notas", nota.id),
          {
            titulo,
            ...(coords && { localizacao: coords }),
          }
        );
        await enviarNotificacaoNotaAtualizada(titulo, t);
      } else {
        //Criar nota
        await addDoc(
          collection(db, "usuarios", user.uid, "notas"),
          {
            titulo,
            criadoEm: new Date(),
            localizacao: coords ?? null
          }
        );
        await enviarNotificacaoNotaCriada(titulo, t);
      }

    navigation.goBack();
    } catch (error) {
      console.error("Erro ao salvar nota:", error);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.titulo}>{nota ? t("note.title_edit") : t("note.title_new")}</Text>
 
      <TextInput
        style={styles.textInput}
        value={titulo}
        onChangeText={setTitulo}
        placeholder={t("note.placeholder")}
      />
 
      <Button title={t("note.save")} onPress={salvar} />

      {coordenadasSalvas && (
        <View style={styles.secaoMapa}>
          <Text style={styles.labelMapa}>{t("note.map_title")}</Text>
 
          <WebView
            style={styles.mapa}
            originWhitelist={["*"]}
            source={{
              html: gerarHTMLMapa(
                coordenadasSalvas.latitude,
                coordenadasSalvas.longitude,
                titulo
              ),
            }}
            scrollEnabled={false}
            javaScriptEnabled
          />
 
          <TouchableOpacity
            onPress={() => setMapaVisivel(true)}
            style={styles.botaoMapaCompleto}
          >
            <Text style={styles.textoBotaoMapaCompleto}>⛶ Ver mapa completo</Text>
          </TouchableOpacity>
        </View>
      )}
 
      <Modal visible={mapaVisivel} animationType="slide">
        <View style={{ flex: 1 }}>
          {coordenadasSalvas && (
            <WebView
              style={{ flex: 1 }}
              originWhitelist={["*"]}
              source={{
                html: gerarHTMLMapa(
                  coordenadasSalvas.latitude,
                  coordenadasSalvas.longitude,
                  titulo
                ),
              }}
              javaScriptEnabled
            />
          )}
          <TouchableOpacity
            onPress={() => setMapaVisivel(false)}
            style={styles.botaoFecharModal}
          >
            <Text style={styles.textoBotaoFechar}>✕ Fechar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  textInput: {
    backgroundColor: "white",
    paddingHorizontal: 80,
    borderRadius: 20,
    width: "100%",
    marginBottom: 16,
    paddingVertical: 10,
  },
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E8DFDF",
    padding: 24,
    paddingTop: 60,
  },
  titulo: {
    fontWeight: "800",
    fontSize: 30,
    marginBottom: 20,
  },
  secaoMapa: {
    width: "100%",
    marginTop: 24,
  },
  labelMapa: {
    fontSize: 14,
    fontWeight: "600",
    color: "#555",
    marginBottom: 8,
  },
  mapa: {
    width: "100%",
    height: 220,
    borderRadius: 12,
    overflow: "hidden",
  },
  botaoMapaCompleto: {
    marginTop: 8,
    alignItems: "center",
    padding: 8,
  },
  textoBotaoMapaCompleto: {
    color: "blue",
    fontSize: 14,
  },
  botaoFecharModal: {
    position: "absolute",
    top: 50,
    right: 20,
    backgroundColor: "rgba(0,0,0,0.65)",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
  },
  textoBotaoFechar: {
    color: "white",
    fontWeight: "600",
    fontSize: 15,
  }
})
