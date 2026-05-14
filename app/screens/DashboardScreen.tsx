import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { RootStackParamList, TabParamList } from "../types/navigation";

type Props = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, "Dashboard">,
  NativeStackScreenProps<RootStackParamList>
>;

const ONGS = [
  {
    id: "1",
    emoji: "🌱",
    logo: require("../assets/images/logo-institutoVerdeVivo.png"),
    nome: "Instituto Verde Vivo",
    cidade: "São Paulo, SP",
    cor: "#E8F5E9",
    causa: "Meio Ambiente",
    emojiContato: "📞 ",
    contato: "(11) 98765-4321",
    descricao:
      "Atuamos no reflorestamento urbano e na conscientização ecológica de comunidades locais. Junte-se aos mutirões de plantio!",
  },
  {
    id: "2",
    emoji: "📖",
    logo: require("../assets/images/logo-educarTransforma.png"),
    nome: "Educar Transforma",
    cidade: "Rio de Janeiro, RJ",
    cor: "#E3F2FD",
    causa: "Educação Infantil",
    emojiContato: "📱 ",
    contato: "@educartransforma",
    descricao:
      "Oferecemos reforço escolar, aulas de informática e atividades culturais para crianças de comunidades carentes no RJ.",
  },
  {
    id: "3",
    emoji: "😁",
    logo: require("../assets/images/logo-sorrisoSolidario.png"),
    nome: "Sorriso Solidário",
    cidade: "Belo Horizonte, MG",
    cor: "#FFF3E0",
    causa: "Saúde Comunitária",
    emojiContato: "📧 ",
    contato: "contato@sorrisosolidario.org",
    descricao:
      "Profissionais voluntários da saúde prestando atendimento médico e odontológico gratuito a populações vulneráveis.",
  },
  {
    id: "4",
    emoji: "🍲",
    logo: require("../assets/images/logo-bancoAlimentos.png"),
    nome: "Banco de Alimentos",
    cidade: "Curitiba, PR",
    cor: "#FCE4EC",
    causa: "Combate à Fome",
    emojiContato: "📞 ",
    contato: "(41) 3214-5678",
    descricao:
      "Arrecadação e distribuição de refeições e cestas básicas para famílias e abrigos da região metropolitana.",
  },
];

export default function DashboardScreen({ route, navigation }: Props) {
  const userName = route.params?.userName || "Voluntário";

  const handleSair = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };

  const [mostrarProjetos, setMostrarProjetos] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.mensagem}>
        Olá, {userName}, que bom ter você aqui para ajudar! 🌱 Navegue no nosso
        <br />
        app através do menu inferior.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "#F5FDF8",
  },
  mensagem: {
    fontSize: 26,
    textAlign: "center",
    marginBottom: 40,
    fontWeight: "700",
    color: "#2E6641",
    lineHeight: 34,
  },
  listaContainer: {
    width: "100%",
    maxHeight: 300,
    marginBottom: 20,
  },
  tituloLista: {
    fontSize: 16,
    fontWeight: "600",
    color: "#555",
    marginBottom: 12,
  },
  ongCard: {
    backgroundColor: "#FFF",
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  ongNome: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  ongCausa: {
    fontSize: 13,
    color: "#48a165",
    marginTop: 2,
  },
  buttonProjects: {
    backgroundColor: "#48a165",
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 32,
    width: "100%",
    alignItems: "center",
    elevation: 3,
    shadowColor: "#48a165",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    marginBottom: 30,
  },
  buttonTextProjects: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonVoltar: {
    alignSelf: "center",
    marginTop: 10,
    padding: 10,
  },
  buttonTextVoltar: {
    color: "#666",
    fontSize: 14,
    fontWeight: "600",
  },
});
