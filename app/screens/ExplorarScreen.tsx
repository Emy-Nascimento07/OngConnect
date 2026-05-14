import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { RootStackParamList, TabParamList } from "../types/navigation";

type Props = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, "Explorar">,
  NativeStackScreenProps<RootStackParamList>
>;

export default function Explorar({ route, navigation }: Props) {
  const [loading, setLoading] = useState(true);
  const userName = route.params?.userName || "Visitante";
  const voluntarioId = route.params?.voluntarioId || "";

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const ONGcard = ({ item }: { item: (typeof ONGS)[0] }) => (
    <TouchableOpacity
      style={styles.ongCard}
      activeOpacity={0.85}
      onPress={() =>
        navigation.navigate("OngDetalhes", {
          ongId: item.id,
          nomeOng: item.nome,
          ongCausa: item.causa,
          ongDescricao: item.descricao,
          ongCidade: item.cidade,
          ongEmoji: item.emoji,
        })
      }
    >
      <View style={[styles.headerCard, { backgroundColor: item.cor }]}>
        <Image source={item.logo} style={styles.logoImage} />

        <View style={styles.headerInformacoes}>
          <Text style={styles.ongNome}>{item.nome}</Text>
          <Text style={styles.fundacaoText}>Causa: {item.causa}</Text>
        </View>
      </View>

      <View style={styles.descricaoCard}>
        <Text style={styles.descricaoText}>{item.descricao}</Text>

        <View style={styles.fimCard}>
          <Text style={styles.ongCity}>📍 {item.cidade}</Text>

          <View style={styles.contatoBanner}>
            <Text style={styles.contatoText}>
              {item.emojiContato}
              {item.contato}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#48a165" />
        <Text style={styles.renderizando}>Carregando instituições...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <Text style={styles.title}>Instituições Parceiras</Text>
        <Text style={styles.subtitle}>
          Descubra causas que precisam do seu apoio
        </Text>
      </View>

      <FlatList
        data={ONGS}
        keyExtractor={(item) => item.id}
        renderItem={ONGcard}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FDF8",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FDF8",
  },
  renderizando: {
    paddingTop: 14,
    fontSize: 18,
    fontWeight: "600",
    color: "#2E6641",
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 60,
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#2E6641",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  listContent: {
    padding: 24,
    paddingTop: 12,
  },
  ongCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    marginBottom: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  headerCard: {
    flexDirection: "row",
    padding: 16,
    alignItems: "center",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  logoImage: {
    width: 48,
    height: 48,
    borderRadius: 12,
    resizeMode: "cover",
    backgroundColor: "#FFF",
  },
  headerInformacoes: {
    marginLeft: 12,
  },
  ongNome: {
    fontSize: 17,
    fontWeight: "700",
    color: "#333",
  },
  fundacaoText: {
    fontSize: 12,
    color: "#555",
    fontWeight: "500",
    marginTop: 2,
  },
  descricaoCard: {
    padding: 16,
  },
  descricaoText: {
    fontSize: 14,
    color: "#555",
    lineHeight: 20,
    marginBottom: 14,
  },
  fimCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  ongCity: {
    fontSize: 12,
    color: "#666",
    fontWeight: "600",
  },
  contatoBanner: {
    backgroundColor: "#F0F9F4",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#D3EDE0",
  },
  contatoText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#2E6641",
  },
});

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
