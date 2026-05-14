import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { RootStackParamList } from "../types/navigation";

type Props = NativeStackScreenProps<RootStackParamList, "OngDetalhes">;

export default function DetalhesOng({ route, navigation }: Props) {
  const { ongId, nomeOng, ongCausa, ongCidade, ongDescricao, ongEmoji } =
    route.params;

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.emoji}>{ongEmoji}</Text>
        <Text style={styles.title}>
          {nomeOng} | ID: {ongId} | {ongCidade}
        </Text>
        <Text style={styles.subtitle}>Causa: {ongCausa}</Text>
        <Text style={styles.text}>{ongDescricao}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FDF8",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 24,
    width: "100%",
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  emoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 12,
    color: "#888",
    marginTop: 4,
    marginBottom: 16,
  },
  text: {
    fontSize: 15,
    color: "#555",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 24,
  },
});
