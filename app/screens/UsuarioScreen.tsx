import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Animated,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { RootStackParamList, TabParamList } from "../types/navigation";

type Props = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, "Usuário">,
  NativeStackScreenProps<RootStackParamList>
>;

const MENU_ITEMS = [
  {
    emoji: "🤝",
    label: "Minhas Inscrições",
    sub: "3 ONGs apoiadas",
    action: "inscricoes",
  },
  {
    emoji: "📋",
    label: "Ações Voluntárias",
    sub: "1 em andamento",
    action: "acoes",
  },
  {
    emoji: "🔔",
    label: "Notificações",
    sub: "Ativadas",
    action: "notificacoes",
  },
  {
    emoji: "🌱",
    label: "Causas de Interesse",
    sub: "Gerenciar preferências",
    action: "causas",
  },
  {
    emoji: "📖",
    label: "Manual do Voluntário",
    sub: "Dicas e diretrizes",
    action: "manual",
  },
  {
    emoji: "⚙️",
    label: "Configurações",
    sub: "Conta e privacidade",
    action: "config",
  },
];

export default function Perfil({ route, navigation }: Props) {
  const usuario = route.params?.userName || "Visitante";
  const voluntarioId = route.params?.voluntarioId || "";

  const [modalAtivo, setModalAtivo] = useState(false);
  const [causaSelecionada, setCausaSelecionada] = useState("Educação");

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const avatarScale = useRef(new Animated.Value(0.7)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 50,
        friction: 8,
        useNativeDriver: true,
      }),
      Animated.spring(avatarScale, {
        toValue: 1,
        tension: 60,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleLogout = () => {
    Alert.alert("Sair", "Tem certeza que deseja sair da sua conta?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Sair",
        style: "destructive",
        onPress: () => {
          navigation.reset({
            index: 0,
            routes: [{ name: "Login" }],
          });
        },
      },
    ]);
  };

  const handleMenuItem = (action: string) => {
    if (action === "causas") {
      setModalAtivo(true);
    } else {
      Alert.alert(
        "Em breve!",
        `A funcionalidade de "${action}" estará disponível em breve. 🌱`,
      );
    }
  };

  const handleEscolhaCausa = (causa: string) => {
    setCausaSelecionada(causa);
    setModalAtivo(false);
    Alert.alert("Sucesso", `Sua causa principal agora é: ${causa}`);
  };

  const inicial = usuario.charAt(0).toUpperCase();

  return (
    <View style={styles.root}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.headerBg}>
          <View style={styles.blobHeader1} />
          <View style={styles.blobHeader2} />
        </View>

        <Animated.View
          style={[
            styles.container,
            { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
          ]}
        >
          <Animated.View
            style={[styles.avatarArea, { transform: [{ scale: avatarScale }] }]}
          >
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarText}>{inicial}</Text>
            </View>
          </Animated.View>

          <Text style={styles.userName}>{usuario}</Text>
          <Text style={styles.userSub}>Voluntário Ativo</Text>

          <View style={styles.statsCard}>
            {[
              { val: "3", label: "Apoiadas", emoji: "🤝" },
              { val: "1", label: "Ações", emoji: "📋" },
              { val: "12h", label: "Horas", emoji: "⏱️" },
            ].map((s, i) => (
              <React.Fragment key={i}>
                {i > 0 && <View style={styles.statDivider} />}
                <View style={styles.stat}>
                  <Text style={styles.statEmoji}>{s.emoji}</Text>
                  <Text style={styles.statVal}>{s.val}</Text>
                  <Text style={styles.statLabel}>{s.label}</Text>
                </View>
              </React.Fragment>
            ))}
          </View>

          <View style={styles.tipCard}>
            <Text style={styles.tipEmoji}>💡</Text>
            <View style={styles.tipContent}>
              <Text style={styles.tipTitle}>
                Causa Atual: {causaSelecionada}
              </Text>
              <Text style={styles.tipText}>
                Dedicar algumas horas da sua semana para uma ONG transforma
                comunidades locais.
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.botaoInteresse}
            activeOpacity={0.85}
            onPress={() => setModalAtivo(true)}
          >
            <Text style={styles.textoBotaoInteresse}>Editar interesses</Text>
          </TouchableOpacity>

          <Text style={styles.menuTitle}>Minha conta</Text>
          <View style={styles.menuCard}>
            {MENU_ITEMS.map((item, i) => (
              <TouchableOpacity
                key={i}
                style={[
                  styles.menuItem,
                  i < MENU_ITEMS.length - 1 && styles.menuItemBorder,
                ]}
                onPress={() => handleMenuItem(item.action)}
                activeOpacity={0.7}
              >
                <Text style={styles.menuEmoji}>{item.emoji}</Text>
                <View style={styles.menuText}>
                  <Text style={styles.menuLabel}>{item.label}</Text>
                  <Text style={styles.menuSub}>{item.sub}</Text>
                </View>
                <Text style={styles.menuArrow}>›</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            style={styles.logoutBtn}
            onPress={handleLogout}
            activeOpacity={0.85}
          >
            <Text style={styles.logoutText}>Sair da conta</Text>
          </TouchableOpacity>

          <Text style={styles.version}>GovONGs v1.0.0 · Feito com 🌱</Text>
        </Animated.View>
      </ScrollView>

      <Modal
        visible={modalAtivo}
        transparent
        animationType="fade"
        onRequestClose={() => setModalAtivo(false)}
      >
        <View style={styles.dialogoSombra}>
          <View style={styles.dialogoContainer}>
            <Text style={styles.dialogoTitulo}>Preferências do Voluntário</Text>
            <Text style={styles.dialogoSubtitulo}>
              Qual causa você prefere apoiar?
            </Text>

            <TouchableOpacity
              style={styles.dialogoOpcao}
              onPress={() => handleEscolhaCausa("Educação")}
            >
              <Text style={styles.dialogoOpcaoTexto}>📚 Educação</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.dialogoOpcao}
              onPress={() => handleEscolhaCausa("Meio Ambiente")}
            >
              <Text style={styles.dialogoOpcaoTexto}>🌱 Meio Ambiente</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.dialogoOpcao}
              onPress={() => handleEscolhaCausa("Saúde")}
            >
              <Text style={styles.dialogoOpcaoTexto}>🏥 Saúde Comunitária</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.dialogoOpcao,
                { backgroundColor: "#f5f5f5", marginTop: 10 },
              ]}
              onPress={() => setModalAtivo(false)}
            >
              <Text style={[styles.dialogoOpcaoTexto, { color: "#666" }]}>
                Fechar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#FAFAFA" },
  container: { flex: 1, paddingHorizontal: 20, paddingTop: 60 },
  headerBg: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 180,
    backgroundColor: "#48a165",
    overflow: "hidden",
  },
  blobHeader1: {
    position: "absolute",
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "#5cb37a",
    top: -50,
    right: -30,
  },
  blobHeader2: {
    position: "absolute",
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#3d8c55",
    top: 40,
    left: -20,
  },
  avatarArea: { alignItems: "center", marginBottom: 12 },
  avatarCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  avatarText: { fontSize: 40, fontWeight: "bold", color: "#48a165" },
  avatarBadge: {
    position: "absolute",
    bottom: 0,
    right: "38%",
    backgroundColor: "#FFF",
    borderRadius: 15,
    padding: 4,
    elevation: 2,
  },
  avatarBadgeText: { fontSize: 16 },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
  },
  userSub: { fontSize: 14, color: "#666", textAlign: "center", marginTop: 2 },
  statsCard: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 16,
    marginTop: 24,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  stat: { flex: 1, alignItems: "center" },
  statEmoji: { fontSize: 18, marginBottom: 4 },
  statVal: { fontSize: 18, fontWeight: "bold", color: "#333" },
  statLabel: { fontSize: 12, color: "#888", marginTop: 2 },
  statDivider: {
    width: 1,
    backgroundColor: "#EEE",
    height: "80%",
    alignSelf: "center",
  },
  tipCard: {
    flexDirection: "row",
    backgroundColor: "#EBF7EE",
    borderRadius: 12,
    padding: 14,
    marginTop: 16,
    alignItems: "center",
  },
  tipEmoji: { fontSize: 24, marginRight: 12 },
  tipContent: { flex: 1 },
  tipTitle: { fontSize: 14, fontWeight: "bold", color: "#2E6641" },
  tipText: { fontSize: 13, color: "#487356", marginTop: 2, lineHeight: 18 },
  botaoInteresse: {
    backgroundColor: "#48a165",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 16,
  },
  textoBotaoInteresse: { color: "#FFF", fontWeight: "bold", fontSize: 15 },
  menuTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#444",
    marginTop: 28,
    marginBottom: 10,
  },
  menuCard: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    overflow: "hidden",
    elevation: 2,
  },
  menuItem: { flexDirection: "row", padding: 16, alignItems: "center" },
  menuItemBorder: { borderBottomWidth: 1, borderBottomColor: "#F0F0F0" },
  menuEmoji: { fontSize: 22, marginRight: 16 },
  menuText: { flex: 1 },
  menuLabel: { fontSize: 15, fontWeight: "600", color: "#333" },
  menuSub: { fontSize: 12, color: "#888", marginTop: 2 },
  menuArrow: { fontSize: 20, color: "#CCC", marginLeft: 8 },
  logoutBtn: {
    borderWidth: 1.5,
    borderColor: "#D9534F",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 24,
    marginBottom: 16,
  },
  logoutText: { color: "#D9534F", fontWeight: "bold", fontSize: 15 },
  version: {
    fontSize: 12,
    color: "#AAA",
    textAlign: "center",
    marginBottom: 30,
  },
  dialogoSombra: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  dialogoContainer: {
    backgroundColor: "#FFF",
    width: "85%",
    borderRadius: 16,
    padding: 20,
    elevation: 5,
  },
  dialogoTitulo: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  dialogoSubtitulo: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginTop: 4,
    marginBottom: 16,
  },
  dialogoOpcao: {
    padding: 14,
    borderRadius: 10,
    backgroundColor: "#F0F9F4",
    marginBottom: 8,
    alignItems: "center",
  },
  dialogoOpcaoTexto: { fontSize: 15, fontWeight: "600", color: "#2E6641" },
});
